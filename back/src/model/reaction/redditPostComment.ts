import { model, Schema } from 'mongoose';

interface IRedditPostCommentData {
  postId: string;
  text: string;
}

interface IRedditPostCommentReaction extends IRedditPostCommentData {
  userId: string;
}

const schema = new Schema<IRedditPostCommentReaction>({
  postId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const RedditPostCommentReaction = model<IRedditPostCommentReaction>('RedditPostCommentReaction', schema);

export type { IRedditPostCommentData, IRedditPostCommentReaction };
export { RedditPostCommentReaction };