import { model, Schema } from 'mongoose';

interface IGithubCloseIssueData {
  repository: string;
  issueId: string;
}

interface IGithubCloseIssueReaction extends IGithubCloseIssueData {
  userId: string;
}

const schema = new Schema<IGithubCloseIssueReaction>({
  issueId: {
    type: String,
    required: true,
  },
  repository: {
    type: String,
    required: true,
  },
});

const GithubCloseIssueReaction = model<IGithubCloseIssueReaction>('GithubCloseIssueReaction', schema);

export type { IGithubCloseIssueData, IGithubCloseIssueReaction };
export { GithubCloseIssueReaction };