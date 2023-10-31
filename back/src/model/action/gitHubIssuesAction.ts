import { model, Schema } from 'mongoose';

interface IIssueWebhookData {
  repository: {
    html_url: string;
  };
}

interface IIssueWebhookAction extends IIssueWebhookData {
  userId?: string;
}

const schema = new Schema<IIssueWebhookAction>({
  userId: {
    type: String,
    required: false,
  },
  repository: {
    html_url: {
      type: String,
      required: true,
    },
  },
});

const GitHubIssuesAction = model<IIssueWebhookAction>('GitHubIssuesAction', schema);

export type { IIssueWebhookData, IIssueWebhookAction };
export { GitHubIssuesAction };
