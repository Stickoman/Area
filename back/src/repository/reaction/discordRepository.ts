import {IDiscordWebhookReaction, DiscordWebhookReaction} from '../../model/reaction/discordWebhookReaction';

async function createDiscordWebhook(userId: string, url: string, text: string) {
  await new DiscordWebhookReaction({userId, webhookUrl: url, text}).save();
}

async function retrieveDiscordWebhooks(userId: string): Promise<IDiscordWebhookReaction[]> {
  return DiscordWebhookReaction.find({userId}).exec();
}

export {createDiscordWebhook, retrieveDiscordWebhooks};
