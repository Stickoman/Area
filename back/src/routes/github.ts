import {Request, Response, Router} from 'express';
import {GithubAuthentication, IGithubAuthentication} from '../model/githubAuth';
import {IUser, User} from '../model/user';
import {Area, IArea} from '../model/area';
import {callReaction} from '../service/area/reactionService';
import {GitHubIssuesAction, IIssueWebhookAction} from '../model/action/gitHubIssuesAction';

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
}

router.post(`/api/github/webhook/issues/`, async (req: Request, res: Response) => {
  const data: IIssueWebhook = req.body;
  const githubUser = await GithubAuthentication.findOne({ screenName: data.issue.user.login }).exec();

  console.log(`Received data for ${data.issue.user.login}: ${data.action}`);
  if (!githubUser) {
    res.sendStatus(403);
  } else {
    const actions = await GitHubIssuesAction.find({repositoryUrl: data.repository.html_url});

    console.log(`Find ${actions.length} actions matching with this webhook`);
    for (const action of actions) {
      const area: IArea = await Area.findOne({
        actionType: 'github:issues',
        actionId: action._id,
        userId: action.userId,
      }).exec();

      await callReaction(area.actionId, data);
    }
    res.sendStatus(200);
  }
});

export type {IIssueWebhook};
export {router as githubRouter};
