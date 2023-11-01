import { model, Schema } from 'mongoose';

interface IGitHubWebhookData {
  repositoryUrl: string;
}

interface IGitHubWebHookAction extends IGitHubWebhookData {
  userId?: string;
}

const schema = new Schema<IGitHubWebHookAction>({
  userId: {
    type: String,
    required: false,
  },
  repositoryUrl: {
    type: String,
    required: true,
  },
});

const GitHubWebHookAction = model<IGitHubWebHookAction>('GitHubWebHookAction', schema);

export type { IGitHubWebhookData, IGitHubWebHookAction };
export { GitHubWebHookAction };
