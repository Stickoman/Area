import { Request, Response, Router } from 'express';
import { GithubAuthentication } from '../../model/githubAuth';
import { IUser, User } from '../../model/user';
import { GitHubIssuesAction, IIssueWebhookAction } from '../../model/action/gitHubIssuesAction';
import { callReaction } from '../area/reactionService';

const router = Router();

const createIssuesPoll = async (userId: string, data: IIssueWebhookAction): Promise<string> => {
  const gitHubIssues = new GitHubIssuesAction({ userId, ...data });
  router.post(`/api/github/webhook/issues/`, async (req: Request, res: Response) => {
    data = req.body as IIssueWebhookAction;
    console.log(`Received data for user ${userId}: ${data.action}`);
    const githubUser = await GithubAuthentication.findOne({ screenName: data.issue.user.login }).exec();
    const user: IUser = await User.findOne({ githubId: githubUser?.id }).exec();

    if (!githubUser || !user) {
      res.sendStatus(403);
    } else {
      await gitHubIssues.save();
      await callReaction(gitHubIssues.id, gitHubIssues);

      res.sendStatus(200);
    }
  });

  return gitHubIssues.id;
}

export { router as gitHubRouter };
export { createIssuesPoll };
// await sendWebhook('https://discordapp.com/api/webhooks/1168609681640526016/SRmLuBaW-mAOEuXQnGb77KMBSgVzX7Yq5utQwxAbPGWIsuh3oJh5Iv7PsX5xJFKtc_I8', 'Github Updater', `:link: ${data.repository.html_url}\n ${data.issue.title} ${data.action}`);
