import {IUser, User} from '../../model/user';
import {ITimerData, TimerAction} from '../../model/action/timerAction';
import {Area, IArea} from '../../model/area';
import {callReaction} from './reactionService';
import JobScheduler from '../../common/jobScheduler';
import {isOrphanAction} from '../../common/action.interface';

const timerScheduler: JobScheduler = new JobScheduler();

async function refreshTimers(): Promise<number> {
  const timers = await TimerAction.find({}).exec();
  let count: number = 0;

  timerScheduler.destroyJobs();
  for (const timer of timers) {
    try {
      const user: IUser = await User.findById(timer.userId).exec();

      if (await isOrphanAction('timer:scheduled_task', timer._id, user._id)) {
        await TimerAction.deleteOne({_id: timer._id}).exec();
      } else {
        const area: IArea = await Area.findOne({
          actionType: 'timer:scheduled_task',
          actionId: timer._id,
          userId: user._id,
        }).exec();

        scheduleTimer(area.actionId, timer);
        count++;
      }
    } catch (e) {
      console.error('Unable to retrieve timer from database', e);
    }
  }
  return count;
}

function scheduleTimer(actionId: string, data: ITimerData) {
  if (!data.each) return;

  const job = timerScheduler.schedule(data.each, async () => {
    await callReaction(actionId)
      .catch(reason => {
        if (reason.message.includes('Orphan action')) {
          console.log(`Cancel pending orphan timer #${actionId}`);
          job.cancel(false);
        }
      });
  });
}

async function createTimerAction(userId: string, data: ITimerData): Promise<string> {
  const timer = await new TimerAction({userId, ...data}).save();

  scheduleTimer(timer.id, data);
  return timer.id;
}

export {refreshTimers, createTimerAction};
