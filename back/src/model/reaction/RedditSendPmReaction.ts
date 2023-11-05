import { model, Schema } from 'mongoose';

interface IRedditSendPmData {
  to: string;
  subject: string;
  text: string;
}

interface IRedditSendPmReaction extends IRedditSendPmData {
  userId: string;
}

const schema = new Schema<IRedditSendPmReaction>({
  userId: {
    type: String,
    required: false,
  },
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const RedditSendPmReaction = model<IRedditSendPmReaction>('RedditSendPmReaction', schema);

export type { IRedditSendPmData, IRedditSendPmReaction };
export { RedditSendPmReaction };