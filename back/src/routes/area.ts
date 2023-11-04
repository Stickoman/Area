import express, {Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {deleteArea, retrieveAreas, saveArea} from '../service/area/areaService';
import {Area, IArea} from '../model/area';
import {ActionType} from '../common/action.interface';
import {ReactionType} from '../common/reaction.interface';
import {retrieveActionData} from '../service/area/actionService';
import {retrieveReactionData} from '../service/area/reactionService';

const router = express.Router();

interface IAreaDetails {
  actionType: ActionType,
  actionData: object,
  reactionType: ReactionType,
  reactionData: object,
}

async function populateDetails(area: IArea): Promise<IAreaDetails> {
  const {actionType, actionId, reactionType, reactionId} = area;
  const actionData: object = await retrieveActionData(actionId, actionType);
  const reactionData: object = await retrieveReactionData(reactionId, reactionType);

  return {
    actionType,
    actionData,
    reactionType,
    reactionData,
  } as IAreaDetails;
}

/**
 * @swagger
 * /api/areas:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: List all areas for the authenticated user.
 *     tags:
 *       - Areas
 *     responses:
 *       200:
 *         description: Successfully returns a list of areas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 areas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Area'
 *       204:
 *         description: No areas found.
 *       401:
 *         description: Unauthorized.
 */
router.get('/api/areas', [authenticateMiddleware], async (req: AuthenticatedRequest, res: Response) => {
  const areas: IArea[] = await retrieveAreas(req.user._id);

  if (areas.length > 0)
    res.status(200).send({areas});
  else res.sendStatus(204);
});

/**
 * @swagger
 * /api/areas/{id}:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get details of a specific area by ID.
 *     tags:
 *       - Areas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the area to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully returns the area details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   $ref: '#/components/schemas/AreaDetails'
 *       404:
 *         description: Area not found.
 *       500:
 *         description: Internal server error.
 *       401:
 *         description: Unauthorized.
 */
router.get('/api/areas/:id', [authenticateMiddleware], async (req: AuthenticatedRequest, res: Response) => {
  const id: string = req.params.id;

  try {
    const area: IArea = await Area.findById(id).exec();

    if (area) {
      const details: IAreaDetails = await populateDetails(area);

      res.status(200).send({details});
    } else res.sendStatus(404);
  } catch (error) {
    res.status(500).send({error});
  }
});

/**
 * @swagger
 * /api/areas/{id}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     summary: Delete a specific area by ID.
 *     tags:
 *       - Areas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the area to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the area.
 *       404:
 *         description: Area not found.
 *       500:
 *         description: Internal server error.
 *       401:
 *         description: Unauthorized.
 */
router.delete('/api/areas/:id', [authenticateMiddleware], async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id;

  try {
    const area: IArea = await Area.findById(id).exec();

    if (area && area.userId === req.user._id.toString()) {
      await deleteArea(id);

      res.sendStatus(200);
    } else res.sendStatus(404);
  } catch (error) {
    res.status(500).send({error});
  }
});

/**
 * @swagger
 * /api/areas:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Create a new area.
 *     tags:
 *       - Areas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               actionType:
 *                 type: string
 *               actionData:
 *                 type: object
 *               reactionType:
 *                 type: string
 *               reactionData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Successfully created a new area.
 *       400:
 *         description: Missing required parameters in request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *       401:
 *         description: Unauthorized.
 */
router.post('/api/areas', [authenticateMiddleware], async (req: AuthenticatedRequest, res: Response) => {
  if (req.body?.actionType && req.body?.actionData && req.body?.reactionType && req.body?.reactionData) {
    const {actionType, actionData, reactionType, reactionData} = req.body;

    try {
      await saveArea(req.user._id, {actionType, actionData, reactionType, reactionData});
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    const missingProperties = ['actionType', 'actionData', 'reactionType',  'reactionData']
      .filter(prop => !req.body[prop])
      .join(', ');

    res.status(400).send({message: `Missing ${missingProperties} in body`});
  }
});

export {router as areasRouter};
