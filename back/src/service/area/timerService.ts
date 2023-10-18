import {IUser, User} from '../../model/user';
import {ITimerData, TimerAction} from '../../model/action/timerAction';
import {cancelJob, Job, scheduleJob} from 'node-schedule';
import {sendWebhook} from '../discord/webhookService';
import {Area, IArea} from '../../model/area';
import {ObjectId} from 'mongodb';

let jobs: Job[] = [];

async function isOrphan(actionId: ObjectId, userId: string): Promise<boolean> {
  const area: IArea = await Area.findOne({actionType: 'timer', actionId, userId}).exec();

  return (area === null);
}

async function refreshTimers(): Promise<number> {
  const timers = await TimerAction.find({}).exec();
  let count: number = 0;

  jobs.forEach(job => cancelJob(job));
  jobs = [];

  for (const timer of timers) {
    const user: IUser = await User.findById(timer.userId).exec();

    if (await isOrphan(timer._id, user._id)) {
      await TimerAction.deleteOne({_id: timer._id}).exec();
    } else {
      scheduleTimer(user, timer);
      count++;
    }
  }
  return count;
}

function scheduleTimer(user: IUser, data: ITimerData) {
  if (!data.each) return;
  const url = 'https://discord.com/api/webhooks/1163551447682666607/KqGyMOyJDqZwtzssmGMZ6YFlb8FQFUL3H3PSvATmoGqPaOQKDc-Q2BW39o5o5tf-XiMp';
  const fullName = `${user.firstName} ${user.lastName}`;
  const job = scheduleJob(data.each, async () => {
    await sendWebhook(url, fullName, 'This is a scheduled message!');
  });

  jobs.push(job);
}

async function createTimerAction(userId: string, data: ITimerData): Promise<string> {
  const timer = await new TimerAction({userId, ...data}).save();
  const user: IUser = await User.findById(userId).exec();

  scheduleTimer(user, data);
  return timer.id;
}

export {refreshTimers, createTimerAction};
