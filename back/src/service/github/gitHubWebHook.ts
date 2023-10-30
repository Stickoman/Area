import {Request, Response, Router} from 'express';
import {GithubAuthentication} from '../../model/githubAuth';
import {IUser, User} from '../../model/user';

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

// GITHUB ISSUES ACTION

/*
 - id
 - userId
 - action (created)
 - areaId (id action/reaction)
 */

router.post('/api/github/webhook/issues', [], async (req: Request, res: Response) => {
  const data: IIssueWebhook = req.body as IIssueWebhook;
  const githubUser = await GithubAuthentication.findOne({screenName: data.issue.user.login}).exec();
  const user: IUser = await User.findOne({githubId: githubUser?.id}).exec();

  if (!githubUser || !user) {
    res.sendStatus(403);
    return;
  }
  // const actions = githubIssuesAction.find({userId: user.id, action: data.action, repositoryUrl: data.repository.html_url});
  // actions.forEach(action => callReaction(action.id, ));

  console.log(`Receive data for user ${user.email}: ${data.action}`);
  res.sendStatus(200);
});

export {router as gitHubRouter};
