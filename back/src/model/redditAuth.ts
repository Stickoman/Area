import {model, Schema} from 'mongoose';

interface IRedditAuthentication {
    token_type: string;
    access_token: string;
    expires_in: string;
    id: string;
    screenName: string;
}

const schema = new Schema<IRedditAuthentication>({
    token_type: {
        type: String,
        required: true,
      },
      access_token: {
        type: String,
        required: true,
      },
      expires_in: {
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

const RedditAuthentication = model<IRedditAuthentication>('RedditAuthentication', schema);

export type {IRedditAuthentication};
export {RedditAuthentication};
