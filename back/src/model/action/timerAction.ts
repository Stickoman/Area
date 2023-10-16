import {model, Schema} from 'mongoose';

interface ITimerData {
  each?: string;
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
