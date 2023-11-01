import {GitHubWebHookAction, IGitHubWebhookData} from '../../model/action/gitHubWebHookAction';

const createIssuesPoll = async (userId: string, data: IGitHubWebhookData): Promise<string> => {
  const gitHubIssues = await new GitHubWebHookAction({ userId, ...data }).save();

  return gitHubIssues.id;
}

const createBranchesPoll = async (userId: string, data: IGitHubWebhookData): Promise<string> => {
  const gitHubBranches = await new GitHubWebHookAction({ userId, ...data }).save();

  return gitHubBranches.id;
}

const createPushesPoll = async (userId: string, data: IGitHubWebhookData): Promise<string> => {
  const gitHubPushes = await new GitHubWebHookAction({ userId, ...data }).save();

  return gitHubPushes.id;
}

export { createIssuesPoll, createBranchesPoll, createPushesPoll };
