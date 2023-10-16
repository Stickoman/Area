import {ReactionType} from '../../common/reaction.interface';
import {DiscordWebhookReaction, IDiscordWebhookData} from '../../model/reaction/discordWebhookReaction';

type ActionFactory = (userId: string, data: object) => Promise<string>;

const reactionAssociations = new Map<ReactionType, ActionFactory>();

reactionAssociations.set('discord-webhook', createDiscordWebhookReaction);

async function createDiscordWebhookReaction(userId: string, data: IDiscordWebhookData): Promise<string> {
  const webhook = await new DiscordWebhookReaction({userId, ...data}).save();

  return webhook.id;
}

async function createReaction(userId: string, type: ReactionType, data: object): Promise<string> {
  for (const [key, value] of reactionAssociations) {
    if (key == type) {
      return value(userId, data);
    }
  }
}

export {createReaction};
