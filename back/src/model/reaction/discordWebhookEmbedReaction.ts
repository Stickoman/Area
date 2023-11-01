import {model, Schema} from 'mongoose';

interface IDiscordWebhookEmbedData {
  webhookUrl: string;
  title: string;
  description: string;
  color: string;
}

interface IDiscordWebhookEmbedReaction extends IDiscordWebhookEmbedData {
  userId: string;
}

const schema = new Schema<IDiscordWebhookEmbedReaction>({
  userId: {
    type: String,
    required: false,
  },
  webhookUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const DiscordWebhookEmbedReaction = model<IDiscordWebhookEmbedReaction>('DiscordWebhookEmbedReaction', schema);

export type {IDiscordWebhookEmbedData, IDiscordWebhookEmbedReaction};
export {DiscordWebhookEmbedReaction};
