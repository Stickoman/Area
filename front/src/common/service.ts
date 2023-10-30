import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faFacebook,
  faGithub,
  faGoogle,
  faInstagram,
  faMeta,
  faMicrosoft, faReddit,
} from '@fortawesome/free-brands-svg-icons';

type ServiceType = 'google' | 'microsoft' | 'discord' | 'github' | 'facebook' | 'meta' | 'instagram' | 'timer' | 'reddit';

interface IServiceItem {
  name: string;
  description: string;
  dataFields: string[];
}

interface IService {
  name: ServiceType;
  color: string;
  icon: IconProp;
  actions: IServiceItem[];
  reactions: IServiceItem[];
}

const SERVICE_ITEMS: Map<ServiceType, IService> = new Map<ServiceType, IService>();

SERVICE_ITEMS.set('google', {
  name: 'google',
  color: '#db4a39ff',
  icon: faGoogle,
  actions: [
    {name: '', description: '', dataFields: []},
  ],
  reactions: [
    {name: '', description: '', dataFields: []},
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
    {name: 'send_webhook', description: 'Send a message to a Webhook', dataFields: ['webhookUrl', 'text']},
  ],
} as IService);

SERVICE_ITEMS.set('github', {
  name: 'github',
  color: '#333333',
  icon: faGithub,
  actions: [
    {name: '', description: '', dataFields: []},
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
    {name: 'scheduled_task', description: 'Setup a scheduled task', dataFields: ['each']},
    {name: 'reminder', description: 'Setup a reminder', dataFields: []},
  ],
  reactions: [],
} as IService);

SERVICE_ITEMS.set('reddit', {
  name: 'reddit',
  color: '#FF5700',
  icon: faReddit,
  actions: [
    {name: 'poll_rss', description: 'Poll news from Reddit Feed', dataFields: ['url']},
  ],
  reactions: [],
} as IService);

export type {ServiceType, IServiceItem, IService};
export {SERVICE_ITEMS};
