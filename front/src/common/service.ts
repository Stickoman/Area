import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faDocker,
  faFacebook,
  faGithub,
  faGoogle,
  faMicrosoft,
  faReddit,
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
  | 'reddit'
  | 'docker';

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
    {
      name: 'poll_mailbox', description: 'Get last emails', dataFields: [], variables: ['SUBJECT', 'FROM', 'SNIPPET'],
    },
    {
      name: 'search_emails', description: 'Search in emails ', dataFields: [
        {name: 'searchCriteria', hint: 'Search in emails'},
      ], variables: ['SUBJECT', 'FROM', 'SNIPPET'],
    },
  ],
  reactions: [
    {
      name: 'send_email', description: 'Send an email at Gmail', dataFields: [
        {name: 'subject', hint: 'Google Email Subject'},
        {name: 'message', hint: 'Google Email Message'},
        {name: 'email', hint: 'Send Email To'},
      ],
    },
    {
      name: 'send_email_to_myself', description: 'Send an email to myself at Gmail', dataFields: [
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
  ],
  reactions: [
    {
      name: 'send_email_microsoft', description: 'Send an email at microsoft', dataFields: [
        {name: 'subject', hint: 'microsoft Email Subject'},
        {name: 'message', hint: 'microsoft Email Message'},
      ],
    },
    {
      name: 'send_teams_message', description: 'Send a at teams', dataFields: [
        {name: 'subject', hint: 'teams message Subject'},
        {name: 'message', hint: 'teams Message'},
      ],
    },
    {
      name: 'delete_all_tasks', description: 'Delete all tasks', dataFields: [
        {name: 'subject', hint: 'teams message Subject'},
        {name: 'message', hint: 'teams Message'},
      ],
    }
  ],
} as IService);

SERVICE_ITEMS.set('discord', {
  name: 'discord',
  color: '#7289da',
  icon: faDiscord,
  actions: [
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
      variables: ['GITHUB_ISSUE_ACTION', 'GITHUB_ISSUE_NAME', 'GITHUB_ISSUE_LINK', 'GITHUB_ISSUE_OWNER', 'GITHUB_ISSUE_USER', 'GITHUB_ISSUE_REPOSITORY'],
    },
    {
      name: 'branches',
      description: 'Watch Branches updates on repository ',
      dataFields: [{name: 'repositoryUrl', hint: ' '}],
      variables: ['GITHUB_BRANCH_ACTION', 'GITHUB_BRANCH_NAME', 'GITHUB_BRANCH_REPOSITORY', 'GITHUB_BRANCH_USER', 'GITHUB_BRANCH_LINK'],
    },
    {
      name: 'pushes',
      description: 'Pushes alerts on repository ',
      dataFields: [{name: 'repositoryUrl', hint: ' '}],
      variables: ['GITHUB_COMMITS_MESSAGE', 'GITHUB_COMMITS_AUTHOR', 'GITHUB_PUSH_REPOSITORY', 'GITHUB_PUSH_USER', 'GITHUB_PUSH_LINK'],
    },
    {
      name: 'pulls',
      description: 'Pulls request alerts on repository ',
      dataFields: [{name: 'repositoryUrl', hint: ' '}],
      variables: ['GITHUB_PULL_ACTION', 'GITHUB_PULL_MESSAGE', 'GITHUB_PULL_AUTHOR', 'GITHUB_PULL_REPOSITORY', 'GITHUB_PULL_LINK']
    },
    {
      name: 'stars',
      description: 'Stars alerts on repository ',
      dataFields: [{name: 'repositoryUrl', hint: ' '}],
      variables: ['GITHUB_STAR_ACTION', 'GITHUB_STAR_AT', 'GITHUB_STAR_AUTHOR', 'GITHUB_STAR_REPOSITORY', 'GITHUB_STAR_LINK']
    },
    {
      name: 'releases',
      description: 'Releases alerts on repository ',
      dataFields: [{name: 'repositoryUrl', hint: ' '}],
      variables: ['GITHUB_RELEASE_ACTION', 'GITHUB_RELEASE_AUTHOR', 'GITHUB_RELEASE_REPOSITORY', 'GITHUB_RELEASE_LINK', 'GITHUB_RELEASE_NAME', 'GITHUB_RELEASE_TAG_NAME']
    },
  ],
  reactions: [
    {
      name: 'open_issue', description: 'Open issue on a repository', dataFields: [
        {name: 'repository', hint: 'Repository'},
        {name: 'title', hint: 'Title of the issue'},
        {name: 'body', hint: 'Body of the issue'},
      ],
    },
    {
      name: 'close_issue', description: 'Close issue on a repository', dataFields: [
        {name: 'repository', hint: 'Repository'},
        {name: 'issueId', hint: 'Id of the issue'},
      ],
    },
    {
      name: 'post_comment', description: 'Post comment on a repository', dataFields: [
        {name: 'repository', hint: 'Repository'},
        {name: 'issueId', hint: 'Id of the issue'},
        {name: 'comment', hint: 'Comment'},
      ],
    },
  ],
} as IService);

SERVICE_ITEMS.set('facebook', {
  name: 'facebook',
  color: '#1877f2',
  icon: faFacebook,
  actions: [
  ],
  reactions: [
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
  reactions: [
    {
      name: 'post_message', description: 'Post message on a subreddit', dataFields: [
        {name: 'subreddit', hint: 'subreddit name'},
        {name: 'title', hint: 'title of the message'},
        {name: 'content', hint: 'content of the message'},
      ],
    },
    {
      name: 'send_pm', description: 'Send a private message', dataFields: [
        {name: 'to', hint: 'recipient'},
        {name: 'subject', hint: 'subject of the message'},
        {name: 'text', hint: 'content of the message'},
      ],
    },
    {
      name: 'post_comment', description: 'Post comment on a reddit message', dataFields: [
        {name: 'postId', hint: 'id of the post'},
        {name: 'text', hint: 'content of the message'},
      ],
    },
  ],
} as IService);

SERVICE_ITEMS.set('docker', {
  name: 'docker',
  color: '#0db7ed',
  icon: faDocker,
  actions: [
    {
      name: 'watch_webhook',
      description: 'Image Push on DockerHub',
      dataFields: [
        {name: 'repositoryName', hint: 'Repository Name (owner/repository)'},
      ],
      variables: ['DOCKER_TAG', 'DOCKER_PUSHER', 'DOCKER_DESCRIPTION', 'DOCKER_NAME', 'DOCKER_URL'],
    },
  ],
  reactions: [],
} as IService);

export type {ServiceType, IServiceItem, IService, IFieldData};
export {SERVICE_ITEMS, GLOBAL_VARIABLES};
