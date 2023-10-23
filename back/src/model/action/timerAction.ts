import {model, Schema} from 'mongoose';

type IntervalValue = number | '*';
type DayInterval = `${IntervalValue} ${IntervalValue} ${IntervalValue} ${IntervalValue} ${IntervalValue} ${IntervalValue}`;
// second minute hour day month dayofweek
// 0-59 0-59 0-23 1-31 1-12 0-7

interface ITimerData {
  each?: DayInterval;
}

interface ITimerAction extends ITimerData {
  userId: string;
}

const schema = new Schema<ITimerAction>({
  userId: {
    type: String,
    required: false,
  },
  each: {
    type: String,
    required: false,
  },
});

const TimerAction = model<ITimerAction>('TimerAction', schema);

export type {ITimerData, ITimerAction};
export {TimerAction};
