import {IUser, User} from '../../model/user';
import {ITimerData, TimerAction} from '../../model/action/timerAction';
import {cancelJob, Job, scheduleJob} from 'node-schedule';
import {Area, IArea} from '../../model/area';
import {ObjectId} from 'mongodb';
import {callReaction} from './reactionService';

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
      const area: IArea = await Area.findOne({actionType: 'timer', actionId: timer._id, userId: user._id}).exec();

      scheduleTimer(area.reactionId, user, timer);
      count++;
    }
  }
  return count;
}

function scheduleTimer(actionId: string, user: IUser, data: ITimerData) {
  if (!data.each) return;

  const job = scheduleJob(data.each, async () => {
    await callReaction(actionId);
  });

  jobs.push(job);
}

async function createTimerAction(userId: string, data: ITimerData): Promise<string> {
  const timer = await new TimerAction({userId, ...data}).save();
  const user: IUser = await User.findById(userId).exec();

  scheduleTimer(timer.id, user, data);
  return timer.id;
}

export {refreshTimers, createTimerAction};
