
type ReactionType = 'discord:send_webhook';

interface Reaction {
  discordWebhookId?: string;
}

export type {Reaction, ReactionType};
