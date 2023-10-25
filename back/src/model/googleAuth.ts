import {model, Schema} from 'mongoose';

interface IGoogleAuthentication {
  token_type: string;
  access_token: string;
  scope: string;
  id: string;
  screenName: string;
  email: string;
}

const schema = new Schema<IGoogleAuthentication>({
  token_type: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  screenName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const GoogleAuthentication = model<IGoogleAuthentication>('GoogleAuthentication', schema);

export type {IGoogleAuthentication};
export {GoogleAuthentication};
