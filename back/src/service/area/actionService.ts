import {ActionType} from '../../common/action.interface';
import {ITimerAction, ITimerData, TimerAction} from '../../model/action/timerAction';
import {scheduleJob, cancelJob, Job} from 'node-schedule';
import axios from 'axios';
import {IUser, User} from '../../model/user';

type ActionFactory = (userId: string, data: object) => Promise<string>;

let jobs: Job[] = [];
const actionAssociations = new Map<ActionType, ActionFactory>();

actionAssociations.set('timer', createTimerAction);

async function sendWebhook(username: string, message: string) {
  return axios
    .post('https://discord.com/api/webhooks/1163551447682666607/KqGyMOyJDqZwtzssmGMZ6YFlb8FQFUL3H3PSvATmoGqPaOQKDc-Q2BW39o5o5tf-XiMp', {content: message, username: username})
    .then(() => Promise.resolve())
    .catch(reason => {
      console.warn('Failed to contact Discord webhook: ' + reason);
      return Promise.reject(new Error('Failed to contact Discord webhook'));
    });
}

async function refreshActions() {
  const timers = await TimerAction.find({}).exec();
  let count = 0;

  jobs.forEach(job => cancelJob(job));
  jobs = [];

  for (const timer of timers) {
    const user: IUser = await User.findById(timer.userId).exec();

    scheduleTimer(user, timer);
    count++;
  }

  console.log(`Loaded ${count} actions`);
}

function scheduleTimer(user: IUser, data: ITimerData) {
  if (!data.each) return;
  const job = scheduleJob(data.each, async () => {
    await sendWebhook(user.firstName + ' ' + user.lastName, 'This is a scheduled message!');
  });

  console.log(`Scheduled Job #${jobs.length} => Init`);
  jobs.push(job);
}

async function createTimerAction(userId: string, data: ITimerData): Promise<string> {
  const timer = await new TimerAction({userId, ...data}).save();
  const user: IUser = await User.findById(userId).exec();

  scheduleTimer(user, data);
  return timer.id;
}

async function createAction(userId: string, type: ActionType, data: object): Promise<string> {
  for (const [key, value] of actionAssociations) {
    if (key == type) {
      return value(userId, data);
    }
  }
}

async function retrieveActionData(id: string, type: ActionType): Promise<object> {
  let data: object = {};

  switch (type) {
  case 'timer':
    data = (await TimerAction.findById(id).exec()) as ITimerData;
    break;
  }

  return data;
}

export {refreshActions, createAction, retrieveActionData};
