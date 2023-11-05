import {Schema, model} from 'mongoose';

interface IMicrosoftEmailData {
  subject: string;
  message: string;
}

interface IMicrosoftEmailReaction extends IMicrosoftEmailData {
  userId: string;
}

const schema = new Schema<IMicrosoftEmailReaction>({
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

const MicrosoftEmailReaction = model<IMicrosoftEmailReaction>('MicrosoftEmailReaction', schema);

export type {IMicrosoftEmailData, IMicrosoftEmailReaction};
export {MicrosoftEmailReaction};
