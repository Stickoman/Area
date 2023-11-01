import {GitHubWebHookAction, IGitHubWebhookData} from '../../model/action/gitHubWebHookAction';

const createGithubWebhook = async (userId: string, data: IGitHubWebhookData): Promise<string> => {
  const document = await new GitHubWebHookAction({userId, ...data}).save();

  return document.id;
};

export {createGithubWebhook};
