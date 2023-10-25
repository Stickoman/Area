
type ReactionType = 'discord-webhook' | 'google-email';
interface Reaction {
  discordWebhookId?: string;
}

export type {Reaction, ReactionType};
