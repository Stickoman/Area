import {retrieveEmailsUpdate, updateEmails} from '../repository/googleRepository';
import checkNewEmails, {GoogleEmails} from '../service/google/checkNewEmails';
import {IUser, User} from '../model/user';

async function parseGoogleEmails(userId: string, searchCriteria?: string): Promise<GoogleEmails> {
  try {
    const user: IUser = await User.findById(userId).exec();
    return await checkNewEmails(user.googleId, searchCriteria);
  } catch (reason) {
    return Promise.reject(new Error('Unable to reed emails: ' + reason));
  }
}

function filterGoogleEmails(emails: GoogleEmails, afterDate: Date): GoogleEmails {
  return {
    ...emails,
    items: emails.items.filter(item => {
      const itemDate: Date = new Date(item.internalDate);

      return (itemDate.getTime() >= afterDate.getTime());
    }),
  };
}

async function retrieveEmailsUpdates(userId: string, searchCriteria?: string): Promise<GoogleEmails> {
  try {
    const emails = await parseGoogleEmails(userId, searchCriteria);
    return retrieveEmailsUpdate(userId, searchCriteria)
      .then(update => {
        return filterGoogleEmails(emails, update.lastUpdate);
      })
      .catch(() => {
        return emails;
      })
      .finally(async () => {
        await updateEmails(userId, searchCriteria);
      });
  } catch (e) {
    console.warn('Unable to parse emails', e);
  }
}

export {retrieveEmailsUpdates};
