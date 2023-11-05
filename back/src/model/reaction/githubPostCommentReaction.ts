import { model, Schema } from 'mongoose';

interface IGithubPostCommentData {
  repository: string;
  issueId: string;
  comment: string;
}

interface IGithubPostCommentReaction extends IGithubPostCommentData {
  userId: string;
}

const schema = new Schema<IGithubPostCommentReaction>({
  issueId: {
    type: String,
    required: true,
  },
  repository: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const GithubPostCommentReaction = model<IGithubPostCommentReaction>('GithubPostCommentReaction', schema);

export type { IGithubPostCommentData, IGithubPostCommentReaction };
export { GithubPostCommentReaction };