import { Request, Response, Router } from 'express';
import { GithubAuthentication } from '../../model/githubAuth';
import { IUser, User } from '../../model/user';
import {GitHubIssuesAction, IIssueWebhookData} from '../../model/action/gitHubIssuesAction';
import { callReaction } from '../area/reactionService';
import {Area, IArea} from '../../model/area';

const router = Router();

const createIssuesPoll = async (userId: string, data: IIssueWebhookData): Promise<string> => {
  const gitHubIssues = new GitHubIssuesAction({ userId, ...data });
  router.post(`/api/github/webhook/issues/`, async (req: Request, res: Response) => {
    console.log(`Received data for user ${userId}: ${req.body.action}`);
    const githubUser = await GithubAuthentication.findOne({ screenName: req.body.issue.user.login }).exec();
    const user: IUser = await User.findOne({ githubId: githubUser?.id }).exec();

    if (!githubUser || !user) {
      res.sendStatus(403);
    } else {
      await gitHubIssues.save();
      const area: IArea = await Area.findOne({actionType: 'github:poll_issues', actionId: gitHubIssues._id, userId: user._id}).exec();
      await callReaction(area.actionId, gitHubIssues);

      res.sendStatus(200);
    }
  });

  return gitHubIssues.id;
}

export { router as gitHubRouter };
export { createIssuesPoll };
// await sendWebhook('https://discordapp.com/api/webhooks/1168609681640526016/SRmLuBaW-mAOEuXQnGb77KMBSgVzX7Yq5utQwxAbPGWIsuh3oJh5Iv7PsX5xJFKtc_I8', 'Github Updater', `:link: ${data.repository.html_url}\n ${data.issue.title} ${data.action}`);
