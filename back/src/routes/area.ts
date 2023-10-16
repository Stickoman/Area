import express, {Response} from 'express';
import {AuthenticatedRequest, authenticateMiddleware} from '../middleware/auth';
import {retrieveAreas, saveArea} from '../service/area/areaService';

const router = express.Router();

router.get('/api/areas', [authenticateMiddleware], async (req: AuthenticatedRequest, res: Response) => {
  const areas = await retrieveAreas(req.user._id);

  if (areas.length > 0)
    res.status(200).send({areas});
  else res.sendStatus(204);
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
