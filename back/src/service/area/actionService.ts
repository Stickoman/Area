import {ActionType} from '../../common/action.interface';
import {ITimerData, TimerAction} from '../../model/action/timerAction';
import {RecurrenceRule, scheduleJob} from 'node-schedule';
import axios from 'axios';
import {IUser, User} from '../../model/user';

type ActionFactory = (userId: string, data: object) => Promise<string>;

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

async function createTimerAction(userId: string, data: ITimerData): Promise<string> {
  const timer = await new TimerAction({userId, ...data}).save();
  const rule = new RecurrenceRule();
  const user: IUser = await User.findById(userId).exec();

  rule.second = 0;

  scheduleJob(rule, async () => {
    await sendWebhook(user.firstName + ' ' + user.lastName, 'This is a scheduled message!');
  });

  return timer.id;
}

async function createAction(userId: string, type: ActionType, data: object): Promise<string> {
  for (const [key, value] of actionAssociations) {
    if (key == type) {
      return value(userId, data);
    }
  }
}

export {createAction};
