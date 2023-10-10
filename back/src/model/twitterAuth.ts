import {model, Schema} from 'mongoose';

interface ITwitterAuthentication {
  oauthToken: string;
  oauthTokenSecret: string;
  userId: string;
  screenName: string;
}

const schema = new Schema<ITwitterAuthentication>({
  oauthToken: {
    type: String,
    required: true,
  },
  oauthTokenSecret: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  screenName: {
    type: String,
    required: true,
  },
});

const TwitterAuthentication = model<ITwitterAuthentication>('TwitterAuthentication', schema);

export type {ITwitterAuthentication};
export {TwitterAuthentication};
