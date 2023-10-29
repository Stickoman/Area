import {model, Schema} from 'mongoose';

interface IRedditRssData {
  url: string;
}

interface IRedditRssAction extends IRedditRssData {
  userId?: string;
}

const schema = new Schema<IRedditRssAction>({
  userId: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
});

const RedditRssAction = model<IRedditRssAction>('RedditRssAction', schema);

export type {IRedditRssData, IRedditRssAction};
export {RedditRssAction};
