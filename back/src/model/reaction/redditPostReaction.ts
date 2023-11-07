import { model, Schema } from 'mongoose';

interface IRedditPostData {
  subreddit: string;
  title: string;
  content: string;
}

interface IRedditPostReaction extends IRedditPostData {
  userId: string;
}

const schema = new Schema<IRedditPostReaction>({
  userId: {
    type: String,
    required: false,
  },
  subreddit: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const RedditPostReaction = model<IRedditPostReaction>('RedditPostReaction', schema);

export type { IRedditPostData, IRedditPostReaction };
export { RedditPostReaction };