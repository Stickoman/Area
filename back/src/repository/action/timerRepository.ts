import {ITimerAction, TimerAction} from '../../model/action/timerAction';

interface TimerConfiguration {
  each?: string;
  on?: string;
}

async function createTimerAction(userId: string, config: TimerConfiguration) {
  if (!config.each && !config.on)
    return Promise.reject(new Error('Missing recurrence parameter'));
  await new TimerAction({userId, ...config}).save();
}

async function retrieveUserTimers(userId: string): Promise<ITimerAction[]> {
  return TimerAction.find({userId}).exec();
}

export type {TimerConfiguration};
export {createTimerAction, retrieveUserTimers};
