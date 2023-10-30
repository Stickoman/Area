
type ReactionType = 'discord:send_webhook' | 'google-email';

interface Reaction {
  discordWebhookId?: string;
}

export type {Reaction, ReactionType};
