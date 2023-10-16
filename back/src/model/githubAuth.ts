import {model, Schema} from 'mongoose';

interface IGithubAuthentication {
  token_type: string;
  access_token: string;
  scope: string;
  id: string;
  screenName: string;
}

const schema = new Schema<IGithubAuthentication>({
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
});

const GithubAuthentication = model<IGithubAuthentication>('GithubAuthentication', schema);

export type {IGithubAuthentication};
export {GithubAuthentication};
