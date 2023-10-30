import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faFacebook,
  faGithub,
  faGoogle,
  faInstagram,
  faMeta,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';

type ServiceType = 'google' | 'microsoft' | 'discord' | 'github' | 'facebook' | 'meta' | 'instagram' | 'timer';

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

SERVICE_ITEMS.set('meta', {
  name: 'meta',
  color: '#1877f2',
  icon: faMeta,
  actions: [
    {name: '', description: '', dataFields: []},
  ],
  reactions: [
    {name: '', description: '', dataFields: []},
  ],
} as IService);

SERVICE_ITEMS.set('instagram', {
  name: 'instagram',
  color: 'linear-gradient(45deg, rgb(240, 148, 51) 0%, rgb(230, 104, 60) 25%, rgb(220, 39, 67) 50%, rgb(204, 35, 102) 75%, rgb(188, 24, 136) 100%)',
  icon: faInstagram,
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

export type {ServiceType, IServiceItem, IService};
export {SERVICE_ITEMS};
