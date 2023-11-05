type ServiceType =
  'twitter'
  | 'google'
  | 'microsoft'
  | 'discord'
  | 'github'
  | 'facebook'
  | 'meta'
  | 'instagram'
  | 'timer'
  | 'reddit';

interface IServiceItem {
  name: string;
  description: string;
}

interface IService {
  name: ServiceType;
  actions: IServiceItem[];
  reactions: IServiceItem[];
}

const SERVICE_ITEMS: Map<ServiceType, IService> = new Map<ServiceType, IService>();

SERVICE_ITEMS.set('google', {
  name: 'google',
  actions: [
    {name: 'google:poll_mailbox', description: 'Get last emails'},
  ],
  reactions: [
    {
      name: 'send_email_to_myself', description: 'Send an email to myself at Gmail'},
    {
      name: 'send_email', description: 'Send an email at Gmail'},
  ],
} as IService);

SERVICE_ITEMS.set('microsoft', {
  name: 'microsoft',
  actions: [
    {name: '', description: ''},
  ],
  reactions: [
    {name: '', description: ''},
  ],
} as IService);

SERVICE_ITEMS.set('discord', {
  name: 'discord',
  actions: [
    {name: '', description: ''},
  ],
  reactions: [
    {name: 'send_webhook', description: 'Send a message to a Webhook'},
    {name: 'send_embedded_webhook', description: 'Send a embedded message to a Webhook'},
  ],
} as IService);

SERVICE_ITEMS.set('github', {
  name: 'github',
  actions: [
    {name: 'issues', description: 'Watch Issues updates on repository '},
  ],
  reactions: [
    {name: '', description: ''},
  ],
} as IService);

SERVICE_ITEMS.set('facebook', {
  name: 'facebook',
  actions: [
    {name: '', description: ''},
  ],
  reactions: [
    {name: '', description: ''},
  ],
} as IService);

SERVICE_ITEMS.set('timer', {
  name: 'timer',
  actions: [
    {name: 'scheduled_task', description: 'Setup a scheduled task'},
    {name: 'reminder', description: 'Setup a reminder'},
  ],
  reactions: [],
} as IService);

SERVICE_ITEMS.set('reddit', {
  name: 'reddit',
  actions: [
    {name: 'poll_rss', description: 'Poll news from Reddit Feed'},
  ],
  reactions: [],
} as IService);

export type {ServiceType, IServiceItem, IService};
export {SERVICE_ITEMS};
