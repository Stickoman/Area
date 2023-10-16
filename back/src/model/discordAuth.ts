import {model, Schema} from 'mongoose';

interface IDiscordAuthentication {
  token_type: string;
  access_token: string;
  expires_in: string;
  id: string;
  screenName: string;
}

const schema = new Schema<IDiscordAuthentication>({
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

const DiscordAuthentication = model<IDiscordAuthentication>('DiscordAuthentication', schema);

export type {IDiscordAuthentication};
export {DiscordAuthentication};
