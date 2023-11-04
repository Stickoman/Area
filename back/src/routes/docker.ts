import express, {Request, Response} from 'express';
import axios from 'axios';
import {DockerPushAction} from '../model/action/dockerPushAction';
import {callReaction} from '../service/area/reactionService';

const router = express.Router();

interface IDockerData {
  callback_url: string;
  push_data: {
    pushed_at: number;
    pusher: string;
    tag: string;
  },
  repository: {
    date_created: number;
    description: string;
    is_private: boolean;
    owner: string;
    repo_name: string;
    repo_url: string;
  },
}

router.post('/api/docker', [], async (req: Request, res: Response) => {
  const data: IDockerData = req.body as IDockerData;
  const callbackUrl = data.callback_url;

  try {
    const actions = await DockerPushAction.find({repositoryName: data.repository.repo_name}).exec();

    console.log(`Catch push from DockerHub, matching ${actions.length} actions`);
    for (const action of actions)
      await callReaction(action.id, data);
    await axios.post(callbackUrl, {state: 'success'});
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export {IDockerData};
export {router as dockerRouter};
