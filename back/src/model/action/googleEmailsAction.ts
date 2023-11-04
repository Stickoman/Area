import {model, Schema} from 'mongoose';

interface IGoogleEmailsData {
  email: string;
  searchCriteria?: string;
}

interface IGoogleEmailsAction extends IGoogleEmailsData {
  userId?: string;
}

const schema = new Schema<IGoogleEmailsAction>({
  userId: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  searchCriteria: {
    type: String,
    required: false,
  },
});

const GoogleEmailsAction = model<IGoogleEmailsAction>('GoogleEmailsAction', schema);

export type {IGoogleEmailsData, IGoogleEmailsAction};
export {GoogleEmailsAction};
