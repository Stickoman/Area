import {model, Schema} from 'mongoose';

interface IRssFeedUpdate {
  userId: string;
  feedUrl: string;
  lastUpdate: Date;
}

const schema = new Schema<IRssFeedUpdate>({
  userId: {
    type: String,
    required: false,
  },
  feedUrl: {
    type: String,
    required: false,
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
});

const RssFeedUpdate = model<IRssFeedUpdate>('RssFeedUpdate', schema);

export type {IRssFeedUpdate};
export {RssFeedUpdate};
