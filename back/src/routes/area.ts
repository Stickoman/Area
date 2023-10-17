import express, {Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {retrieveAreas, saveArea} from '../service/area/areaService';
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

router.get('/api/areas', [authenticateMiddleware], async (req: AuthenticatedRequest, res: Response) => {
  const areas = await retrieveAreas(req.user._id);

  if (areas.length > 0)
    res.status(200).send({areas});
  else res.sendStatus(204);
});

router.get('/api/areas/:id', [authenticateMiddleware], async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id;

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
    res.status(400).send({message: 'Missing actionType/actionData/reactionType/reactionData in body'});
  }
});

export {router as areasRouter};
