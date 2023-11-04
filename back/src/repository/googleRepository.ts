import {IEmailsUpdate, EmailsUpdate} from '../model/emails';

async function retrieveEmailsUpdate(userId: string, searchCriteria?: string): Promise<IEmailsUpdate> {
  const emailsUpdate = await EmailsUpdate.findOne({userId: userId}).exec();

  if (emailsUpdate === null)
      return Promise.reject(new Error('Unable to find emails update for this user'));
  return emailsUpdate as IEmailsUpdate;
}

async function updateEmails(userId: string, searchCriteria?: string): Promise<void> {
  let emailsUpdate = await EmailsUpdate.findOne({userId: userId, searchCriteria: searchCriteria ? searchCriteria : null}).exec();

  if (emailsUpdate === null)
    emailsUpdate = new EmailsUpdate({userId: userId, searchCriteria: searchCriteria ? searchCriteria : null, lastUpdate: new Date()});
  emailsUpdate.lastUpdate = new Date();
  await emailsUpdate.save();
}

export {retrieveEmailsUpdate, updateEmails};
