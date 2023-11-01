import { model, Schema } from 'mongoose';

interface IIssueWebhookData {
  repositoryUrl: string;
}

interface IIssueWebhookAction extends IIssueWebhookData {
  userId?: string;
}

const schema = new Schema<IIssueWebhookAction>({
  userId: {
    type: String,
    required: false,
  },
  repositoryUrl: {
    type: String,
    required: true,
  },
});

const GitHubWebHookAction = model<IIssueWebhookAction>('GitHubWebHookAction', schema);

export type { IIssueWebhookData, IIssueWebhookAction };
export { GitHubWebHookAction };
