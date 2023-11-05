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
    {name: '', description: ''},
  ],
  reactions: [
    {name: '', description: ''},
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
    {name: 'open_issue', description: 'Open issue on a repository'},
    {name: 'close_issue', description: 'Close issue on a repository'},
    {name: 'post_comment', description: 'Post a comment on a repository'},
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
  reactions: [
    {name: 'post_message', description: 'Post a message on a subreddit'},
    {name: 'send_pm', description: 'Send a private message to a user'},
    {name: 'post_comment', description: 'Post a comment on a post'}
  ],
} as IService);

export type {ServiceType, IServiceItem, IService};
export {SERVICE_ITEMS};
