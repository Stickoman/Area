import {Schema, model} from 'mongoose';

interface IMicrosoftAuthentication {
  token_type: string;
  access_token: string;
  scope: string;
  id: string;
  grant_type: string;
  screenName: string;
}

const schema = new Schema<IMicrosoftAuthentication>({
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
  grant_type: {
    type: String,
    required: true,
  },
  screenName: {
    type: String,
    required: true,
  },
});

const MicrosoftAuthentication = model<IMicrosoftAuthentication>('MicrosoftAuthentication', schema);

export type {IMicrosoftAuthentication};
export {MicrosoftAuthentication};