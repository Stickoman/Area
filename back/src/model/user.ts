import {model, Schema} from 'mongoose';

interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  twitterId?: string,
  facebookId?: string,
  discordId?: string,
  githubId?: string,
  googleId?: string,
}

const schema = new Schema<IUser>({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  twitterId: {
    type: String,
    required: false,
  },
  facebookId: {
    type: String,
    required: false,
  },
  discordId: {
    type: String,
    required: false,
  },
  githubId: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
});

const User = model<IUser>('User', schema);

export type {IUser};
export {User};
