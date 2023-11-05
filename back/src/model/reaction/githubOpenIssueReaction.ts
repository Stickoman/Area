import { model, Schema } from 'mongoose';

interface IGithubOpenIssueData {
  repository: string;
  title: string;
  body: string;
}

interface IGithubOpenIssueReaction extends IGithubOpenIssueData {
  userId: string;
}

const schema = new Schema<IGithubOpenIssueReaction>({
  userId: {
    type: String,
    required: true,
  },
  repository: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const GithubOpenIssueReaction = model<IGithubOpenIssueReaction>('GithubOpenIssueReaction', schema);

export type { IGithubOpenIssueData, IGithubOpenIssueReaction };
export { GithubOpenIssueReaction };