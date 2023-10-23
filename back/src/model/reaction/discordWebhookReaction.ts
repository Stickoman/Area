import {model, Schema} from 'mongoose';

interface IDiscordWebhookData {
  webhookUrl: string;
  text: string;
}

interface IDiscordWebhookReaction extends IDiscordWebhookData {
  userId: string;
}

const schema = new Schema<IDiscordWebhookReaction>({
  userId: {
    type: String,
    required: false,
  },
  webhookUrl: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const DiscordWebhookReaction = model<IDiscordWebhookReaction>('DiscordWebhookReaction', schema);

export type {IDiscordWebhookData, IDiscordWebhookReaction};
export {DiscordWebhookReaction};
