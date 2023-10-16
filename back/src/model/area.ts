import {model, Schema} from 'mongoose';
import {ActionType} from '../common/action.interface';
import {ReactionType} from '../common/reaction.interface';

interface IArea {
  userId: string;
  actionType: ActionType;
  actionId: string;
  reactionType: ReactionType;
  reactionId: string;
}

const schema = new Schema<IArea>({
  userId: {
    type: String,
    required: false,
  },
  actionType: {
    type: String,
    required: true,
  },
  actionId: {
    type: String,
    required: true,
  },
  reactionType: {
    type: String,
    required: true,
  },
  reactionId: {
    type: String,
    required: true,
  },
});

const Area = model<IArea>('Area', schema);

export type {IArea};
export {Area};
