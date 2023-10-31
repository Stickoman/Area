import {GitHubIssuesAction, IIssueWebhookData} from '../../model/action/gitHubIssuesAction';

const createIssuesPoll = async (userId: string, data: IIssueWebhookData): Promise<string> => {
  const gitHubIssues = await new GitHubIssuesAction({ userId, ...data }).save();

  return gitHubIssues.id;
}

export { createIssuesPoll };
