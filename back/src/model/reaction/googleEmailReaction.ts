import {model, Schema} from 'mongoose';

interface IGoogleEmailData {
  subject: string;
  message: string;
  email?: string;
}

interface IGoogleEmailReaction extends IGoogleEmailData {
  userId: string;
}

const schema = new Schema<IGoogleEmailReaction>({
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
  email: {
    type: String,
    required: false,
  },
});

const GoogleEmailReaction = model<IGoogleEmailReaction>('GoogleEmailReaction', schema);

export type {IGoogleEmailData, IGoogleEmailReaction};
export {GoogleEmailReaction};
