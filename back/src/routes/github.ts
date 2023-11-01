import {Request, Response, Router} from 'express';
import {GithubAuthentication, IGithubAuthentication} from '../model/githubAuth';
import {callReaction} from '../service/area/reactionService';
import {GitHubWebHookAction, IIssueWebhookAction} from '../model/action/gitHubWebHookAction';

const router = Router();

interface IIssueWebhook {
  action: string;
  issue: {
    title: string;
    html_url: string;
    user: {
      login: string;
      avatar_url: string;
      html_url: string;
    },
  },
  repository: {
    html_url: string;
  },
  sender: {
    login: string;
  }
}

router.post(`/api/github/webhook/issues/`, async (req: Request, res: Response) => {
  const data: IIssueWebhook = req.body;
  const githubUser = await GithubAuthentication.findOne({ screenName: data.sender.login }).exec();

  console.log(`Received data for ${data.issue.user.login}: ${data.action}`);
  if (!githubUser) {
    res.sendStatus(403);
  } else {
    const actions = await GitHubWebHookAction.find({repositoryUrl: data.repository.html_url});

    console.log(`Find ${actions.length} actions matching with this webhook`);
    for (const action of actions) {

      await callReaction(action.id, data);
    }
    res.sendStatus(200);
  }
});

router.post(`/api/github/webhook/branches/`, async (req: Request, res: Response) => {
  const data: IIssueWebhook = req.body;
  const githubUser = await GithubAuthentication.findOne({ screenName: data.sender.login }).exec();

  console.log(`Received data for ${data.issue.user.login}: ${data.action}`);
  if (!githubUser) {
    res.sendStatus(403);
  } else {
    const actions = await GitHubWebHookAction.find({repositoryUrl: data.repository.html_url});

    console.log(`Find ${actions.length} actions matching with this webhook`);
    for (const action of actions) {

      await callReaction(action.id, data);
    }
    res.sendStatus(200);
  }
});

router.post(`/api/github/webhook/pushes/`, async (req: Request, res: Response) => {
  const data: IIssueWebhook = req.body;
  const githubUser = await GithubAuthentication.findOne({ screenName: data.sender.login }).exec();

  console.log(`Received data for ${data.issue.user.login}: ${data.action}`);
  if (!githubUser) {
    res.sendStatus(403);
  } else {
    const actions = await GitHubWebHookAction.find({repositoryUrl: data.repository.html_url});

    console.log(`Find ${actions.length} actions matching with this webhook`);
    for (const action of actions) {

      await callReaction(action.id, data);
    }
    res.sendStatus(200);
  }
});

export type {IIssueWebhook};
export {router as githubRouter};
