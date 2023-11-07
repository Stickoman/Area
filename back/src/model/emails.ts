import {model, Schema} from 'mongoose';

interface IEmailsUpdate {
  userId: string;
  searchCriteria?: string;
  lastUpdate: Date;
}

const schema = new Schema<IEmailsUpdate>({
  userId: {
    type: String,
    required: false,
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
  searchCriteria: {
    type: String,
    required: false,
  },
});

const EmailsUpdate = model<IEmailsUpdate>('EmailsUpdate', schema);

export type {IEmailsUpdate};
export {EmailsUpdate};
