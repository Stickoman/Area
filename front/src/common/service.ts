import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faFacebook,
  faGithub,
  faGoogle,
  faMicrosoft, faReddit,
} from '@fortawesome/free-brands-svg-icons';

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

interface IFieldData {
  name: string;
  hint: string;
}

interface IServiceItem {
  name: string;
  description: string;
  dataFields: IFieldData[];
  variables?: string[];
}

interface IService {
  name: ServiceType;
  color: string;
  icon: IconProp;
  actions: IServiceItem[];
  reactions: IServiceItem[];
}

const GLOBAL_VARIABLES = ['FULL_NAME', 'FIRST_NAME', 'LAST_NAME'];

const SERVICE_ITEMS: Map<ServiceType, IService> = new Map<ServiceType, IService>();

SERVICE_ITEMS.set('google', {
  name: 'google',
  color: '#db4a39ff',
  icon: faGoogle,
  actions: [
    {name: '', description: '', dataFields: []},
  ],
  reactions: [
    {
      name: 'send_email', description: 'Send an email at Gmail', dataFields: [
        {name: 'subject', hint: 'Google Email Subject'},
        {name: 'message', hint: 'Google Email Message'},
      ],
    },
  ],
} as IService);

SERVICE_ITEMS.set('microsoft', {
  name: 'microsoft',
  color: '#ea4300',
  icon: faMicrosoft,
  actions: [
    {name: '', description: '', dataFields: []},
  ],
  reactions: [
    {name: '', description: '', dataFields: []},
  ],
} as IService);

SERVICE_ITEMS.set('discord', {
  name: 'discord',
  color: '#7289da',
  icon: faDiscord,
  actions: [
    {name: '', description: '', dataFields: []},
  ],
  reactions: [
    {
      name: 'send_webhook', description: 'Send a message to a Webhook', dataFields: [
        {name: 'webhookUrl', hint: 'Discord Webhook URL'},
        {name: 'text', hint: 'Message send to webhook'},
      ],
    },
    {
      name: 'send_embedded_webhook', description: 'Send a embedded message to a Webhook', dataFields: [
        {name: 'webhookUrl', hint: 'Discord Webhook URL'},
        {name: 'title', hint: 'Embed title'},
        {name: 'description', hint: 'Embed description'},
        {name: 'color', hint: 'Embed color (as decimal)'},
      ],
    },
  ],
} as IService);

SERVICE_ITEMS.set('github', {
  name: 'github',
  color: '#333333',
  icon: faGithub,
  actions: [
    {
      name: 'issues',
      description: 'Watch Issues updates on repository ',
      dataFields: [{name: 'repositoryUrl', hint: ' '}],
      variables: ['GITHUB_ISSUE_ACTION', 'GITHUB_ISSUE_NAME', 'GITHUB_ISSUE_LINK', 'GITHUB_ISSUE_OWNER', 'GITHUB_ISSUE_USER', 'GITHUB_ISSUE_REPOSITORY']
    },
    {
      name: 'branches',
      description: 'Watch Branches updates on repository ',
      dataFields: [{name: 'repositoryUrl', hint: ' '}],
      variables: ['GITHUB_BRANCH_NAME', 'GITHUB_BRANCH_REPOSITORY', 'GITHUB_BRANCH_USER', 'GITHUB_BRANCH_LINK']
    },
    {
      name: 'pushes',
      description: 'Pushes alert on repository ',
      dataFields: [{name: 'repositoryUrl', hint: ' '}],
      variables: ['GITHUB_COMMITS_MESSAGE', 'GITHUB_COMMITS_AUTHOR', 'GITHUB_PUSH_REPOSITORY', 'GITHUB_PUSH_USER', 'GITHUB_PUSH_LINK']
    },
    {
      name: 'pull',
      description: 'Pull request alert on repository ',
      dataFields: [{name: 'repositoryUrl', hint: ' '}],
      variables: ['GITHUB_PULL_ACTION', 'GITHUB_PULL_MESSAGE', 'GITHUB_PULL_AUTHOR', 'GITHUB_PULL_REPOSITORY', 'GITHUB_PULL_LINK']
    },
  ],
  reactions: [
    {name: '', description: '', dataFields: []},
  ],
} as IService);

SERVICE_ITEMS.set('facebook', {
  name: 'facebook',
  color: '#1877f2',
  icon: faFacebook,
  actions: [
    {name: '', description: '', dataFields: []},
  ],
  reactions: [
    {name: '', description: '', dataFields: []},
  ],
} as IService);

SERVICE_ITEMS.set('timer', {
  name: 'timer',
  color: '#000000',
  icon: faClock,
  actions: [
    {
      name: 'scheduled_task', description: 'Setup a scheduled task', dataFields: [
        {name: 'each', hint: 'second minute hour day month dayofweek'},
      ],
    },
    {name: 'reminder', description: 'Setup a reminder', dataFields: []},
  ],
  reactions: [],
} as IService);

SERVICE_ITEMS.set('reddit', {
  name: 'reddit',
  color: '#FF5700',
  icon: faReddit,
  actions: [
    {
      name: 'poll_rss',
      description: 'Poll news from Reddit Feed',
      dataFields: [
        {name: 'url', hint: 'Reddit Feed URL'},
      ],
      variables: ['RSS_TITLE', 'RSS_LINK', 'RSS_CONTENT'],
    },
  ],
  reactions: [],
} as IService);

export type {ServiceType, IServiceItem, IService, IFieldData};
export {SERVICE_ITEMS, GLOBAL_VARIABLES};
