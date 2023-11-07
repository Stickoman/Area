import {Schema, model} from 'mongoose';

interface ITaskDeletionData {
  subject: string;
  message: string;
}

interface ITaskDeletionReaction extends ITaskDeletionData {
  userId: string;
}

const schema = new Schema<ITaskDeletionReaction>({
  userId: {
    type: String,
    required: false,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const TaskDeletionReaction = model<ITaskDeletionReaction>('TaskDeletionReaction', schema);

export type {ITaskDeletionData, ITaskDeletionReaction};
export {TaskDeletionReaction};
