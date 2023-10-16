import {model, Schema} from 'mongoose';

interface IDiscordAuthentication {
  oauthToken: string;
  oauthTokenSecret: string;
  userId: string;
  screenName: string;
}

const schema = new Schema<IDiscordAuthentication>({
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

const DiscordAuthentication = model<IDiscordAuthentication>('DiscordAuthentication', schema);

export type {IDiscordAuthentication};
export {DiscordAuthentication};
