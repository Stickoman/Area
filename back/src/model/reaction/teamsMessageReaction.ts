import {Schema, model} from 'mongoose';

interface ITeamsMessageData {
  subject: string;
  message: string;
}

interface ITeamsMessageReaction extends ITeamsMessageData {
  userId: string;
}

const schema = new Schema<ITeamsMessageReaction>({
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

const TeamsMessageReaction = model<ITeamsMessageReaction>('TeamsMessageReaction', schema);

export type {ITeamsMessageData, ITeamsMessageReaction};
export {TeamsMessageReaction};
