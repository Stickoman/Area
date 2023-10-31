import {model, Schema} from 'mongoose';

interface IIssueWebhookData {
  repository: {
    html_url: string;
  }
}

interface IIssueWebhookAction extends IIssueWebhookData {
  userId?: string;
  issue: {
    title: string;
    user: {
     login: string;
    }
  }
  action: string;
}

const schema = new Schema<IIssueWebhookAction>({
  action: String,
  issue: {
    title: String,
    html_url: String,
    user: {
      login: String,
      avatar_url: String,
      html_url: String,
    },
  },
  repository: {
    html_url: String,
  },
});

const GitHubIssuesAction = model<IIssueWebhookAction>('GitHubIssuesAction', schema);

export type {IIssueWebhookData, IIssueWebhookAction};
export {GitHubIssuesAction};
