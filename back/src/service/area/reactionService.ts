import {ReactionType} from '../../common/reaction.interface';
import {DiscordWebhookReaction, IDiscordWebhookData} from '../../model/reaction/discordWebhookReaction';
import {Area, IArea} from '../../model/area';
import {sendEmbedWebhook, sendWebhook} from '../discord/webhookService';
import {IUser, User} from '../../model/user';
import {reject} from '../authService';
import {
  DiscordWebhookEmbedReaction,
  IDiscordWebhookEmbedData,
} from '../../model/reaction/discordWebhookEmbedReaction';
import {GoogleEmailReaction, IGoogleEmailData} from '../../model/reaction/googleEmailReaction';
import sendEmail from '../google/emailService';
import {IBranchWebhook, IIssueWebhook, IPullWebhook, IPushWebhook} from '../../routes/github';
import {Model} from 'mongoose';

type ReactionFactory = (userId: string, data: object) => Promise<string>;

const reactionAssociations = new Map<ReactionType, ReactionFactory>();

reactionAssociations.set('discord:send_webhook', createDiscordWebhookReaction);
reactionAssociations.set('discord:send_embedded_webhook', createDiscordWebhookEmbedReaction);
reactionAssociations.set('google:send_email_to_myself', createGoogleEmailReaction);
reactionAssociations.set('google:send_email', createGoogleEmailReaction);

async function createDiscordWebhookReaction(userId: string, data: IDiscordWebhookData): Promise<string> {
  const webhook = await new DiscordWebhookReaction({userId, ...data}).save();

  return webhook.id;
}

async function createDiscordWebhookEmbedReaction(userId: string, data: IDiscordWebhookEmbedData): Promise<string> {
  const webhook = await new DiscordWebhookEmbedReaction({userId, ...data}).save();

  return webhook.id;
}
async function createGoogleEmailReaction(userId: string, data: IGoogleEmailData): Promise<string> {
  const email = await new GoogleEmailReaction({userId, ...data}).save();

  return email.id;
}

async function createReaction(userId: string, type: ReactionType, data: object): Promise<string> {
  for (const [key, value] of reactionAssociations) {
    if (key == type) {
      return value(userId, data);
    }
  }
}

async function retrieveReactionData(id: string, type: ReactionType): Promise<object> {
  let data: object = {};

  switch (type) {
    case 'discord:send_webhook':
      data = (await DiscordWebhookReaction.findById(id).exec()) as IDiscordWebhookData;
      break;
    case 'discord:send_embedded_webhook':
      data = (await DiscordWebhookEmbedReaction.findById(id).exec()) as IDiscordWebhookEmbedData;
      break;
    case 'google:send_email':
      data = (await GoogleEmailReaction.findById(id).exec()) as IGoogleEmailData;
      break;
    case 'google:send_email_to_myself':
      data = (await GoogleEmailReaction.findById(id).exec()) as IGoogleEmailData;
      break;
  }

  return data;
}

async function callReaction(actionId: string, data?: object, dataHeader?: object) {
  const area: IArea = await Area.findOne({actionId}).exec();
  if (area === null) return reject(`Orphan action #${actionId}`);
  const {reactionId, reactionType} = area;
  const reactionData: object = await retrieveReactionData(reactionId, reactionType);
  const user: IUser = await User.findById(area.userId).exec();
  const fullName: string = `${user.firstName} ${user.lastName}`;

  const isValidDiscordWebhookData = (data: object): data is IDiscordWebhookData => {
    return !!(data as IDiscordWebhookData);
  };
  const isValidDiscordWebhookEmbedData = (data: object): data is IDiscordWebhookEmbedData => {
    return !!(data as IDiscordWebhookEmbedData);
  };
  const isValidGoogleEmailData = (data: object): data is IGoogleEmailData => {
    return !!(data as IGoogleEmailData);
  };
  const isValidEmailData = (data: object): data is IGoogleEmailData => {
    const dataTmp = data as IGoogleEmailData;
    if (!dataTmp.email)
      return false;
    return !!(data as IGoogleEmailData);
  };

  const replaceVariables = (value: string): string => {
    return value.replace('${NAME}', fullName)
      .replace('${GITHUB_ISSUE_ACTION}', (data as IIssueWebhook)?.action)
      .replace('${GITHUB_ISSUE_NAME}', (data as IIssueWebhook)?.issue?.title)
      .replace('${GITHUB_ISSUE_LINK}', (data as IIssueWebhook)?.issue?.html_url)
      .replace('${GITHUB_ISSUE_OWNER}', (data as IIssueWebhook)?.issue?.user?.login)
      .replace('${GITHUB_ISSUE_USER}', (data as IIssueWebhook)?.sender?.login)
      .replace('${GITHUB_ISSUE_REPOSITORY}', (data as IIssueWebhook)?.repository?.name)
      .replace('${GITHUB_BRANCH_REPOSITORY}', (data as IBranchWebhook)?.repository?.name)
      .replace('${GITHUB_BRANCH_LINK}', (data as IBranchWebhook)?.repository?.html_url)
      .replace('${GITHUB_BRANCH_NAME}', (data as IBranchWebhook)?.ref)
      .replace('${GITHUB_BRANCH_USER}', (data as IBranchWebhook)?.sender?.login)
      .replace('${GITHUB_BRANCH_ACTION}', (dataHeader as IBranchWebhookHeader)?.['x-github-event'])
      .replace('${GITHUB_COMMITS_MESSAGE}', (data as IPushWebhook)?.head_commit?.message)
      .replace('${GITHUB_COMMITS_AUTHOR}', (data as IPushWebhook)?.head_commit?.author?.username)
      .replace('${GITHUB_PUSH_REPOSITORY}', (data as IPushWebhook)?.repository?.name)
      .replace('${GITHUB_PUSH_USER}', (data as IPushWebhook)?.pusher?.name)
      .replace('${GITHUB_PUSH_LINK}', (data as IPushWebhook)?.repository?.html_url)
      .replace('${GITHUB_PULL_ACTION}', (data as IPullWebhook)?.action)
      .replace('${GITHUB_PULL_AUTHOR}', (data as IPullWebhook)?.pull_request?.user?.login)
      .replace('${GITHUB_PULL_REPOSITORY}', (data as IPullWebhook)?.repository?.name)
      .replace('${GITHUB_PULL_MESSAGE}', (data as IPullWebhook)?.pull_request?.title)
      .replace('${GITHUB_PULL_LINK}', (data as IPullWebhook)?.repository?.html_url)
      .replace('${RSS_TITLE}', (data as { title: string })?.title)
      .replace('${RSS_CONTENT}', (data as { content: string })?.content)
      .replace('${RSS_LINK}', (data as { link: string })?.link)
      .replace('\\n', '\n');
  };

  switch (reactionType) {
    case 'discord:send_webhook':
      if (isValidDiscordWebhookData(reactionData))
        await sendWebhook(reactionData.webhookUrl, fullName, replaceVariables(reactionData.text));
      break;
    case 'discord:send_embedded_webhook':
      if (isValidDiscordWebhookEmbedData(reactionData))
        await sendEmbedWebhook(reactionData.webhookUrl, fullName, replaceVariables(reactionData.title), replaceVariables(reactionData.description), reactionData.color);
      break;
    case 'google:send_email_to_myself':
      if (isValidGoogleEmailData(reactionData))
        await sendEmail(replaceVariables(reactionData.subject), replaceVariables(reactionData.message), user.googleId);
      break;
    case 'google:send_email':
      if (isValidEmailData(reactionData))
        await sendEmail(replaceVariables(reactionData.subject), replaceVariables(reactionData.message), user.googleId, reactionData.email);
      break;
  }
}

async function deleteReaction(id: string, type: ReactionType) {
  let model: Model<unknown> = null;

  switch (type) {
  case 'discord:send_webhook':
    model = DiscordWebhookReaction;
    break;
  case 'discord:send_embedded_webhook':
    model = DiscordWebhookEmbedReaction;
    break;
  case 'google:send_email':
    model = GoogleEmailReaction;
    break;
  case 'google:send_email_to_myself':
    model = GoogleEmailReaction;
    break;
  }

  if (model) {
    const document = await model.findById(id).exec();
    await document.deleteOne();
  } else {
    return reject('Unable to find reaction model');
  }
}

export {createReaction, retrieveReactionData, callReaction, deleteReaction};
