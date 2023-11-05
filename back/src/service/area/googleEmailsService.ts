import JobScheduler from '../../common/jobScheduler';
import {IUser, User} from '../../model/user';
import {IGoogleEmailsAction, IGoogleEmailsData, GoogleEmailsAction} from '../../model/action/googleEmailsAction';
import {isOrphanAction} from '../../common/action.interface';
import {callReaction} from './reactionService';
import {retrieveEmailsUpdates} from '../../adapter/googleEmailsAdapter';
import {GoogleEmails} from '../google/checkNewEmails';


const GoogleEmailsScheduler: JobScheduler = new JobScheduler();

function scheduleAction(actionId: string, action: IGoogleEmailsAction) {
  GoogleEmailsScheduler.schedule('0 * * * * *', async () => {
    try {
      const emails: GoogleEmails = await retrieveEmailsUpdates(action.userId, action.searchCriteria);

      console.log(`Poll emails ${action.userId}`);
      for (const emailsItem of emails.items) {
        await callReaction(actionId, emailsItem)
          .catch(reason => console.error(reason));
      }
    } catch (e) {
      console.warn('Unable to poll Emails', e);
    }
  });
}

async function refreshGoogleEmails(): Promise<number> {
  const actions = await GoogleEmailsAction.find({}).exec();
  let count: number = 0;

  GoogleEmailsScheduler.destroyJobs();
  for (const action of actions) {
    const user: IUser = await User.findById(action.userId).exec();

    if (await isOrphanAction('google:poll_mailbox', action._id, user._id)) {
      await GoogleEmailsAction.deleteOne({_id: action._id}).exec();
    } else {
      scheduleAction(action.id, action);
      count++;
    }
  }
  return count;
}

async function createEmailsPoll(userId: string, data: IGoogleEmailsData): Promise<string> {
  const GoogleEmails = await new GoogleEmailsAction({userId, ...data}).save();

  scheduleAction(GoogleEmails.id, GoogleEmails);
  return GoogleEmails.id;
}

export {createEmailsPoll, refreshGoogleEmails};
