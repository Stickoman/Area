import {model, Schema} from 'mongoose';

interface IFacebookAuthentication {
    token_type: string;
    access_token: string;
    expires_in: string;
    userId: string;
    screenName: string;
}

const schema = new Schema<IFacebookAuthentication>({
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
      userId: {
        type: String,
        required: true,
      },
      screenName: {
        type: String,
        required: true,
      },
});

const FacebookAuthentication = model<IFacebookAuthentication>('FacebookAuthentication', schema);

export type {IFacebookAuthentication};
export {FacebookAuthentication};
