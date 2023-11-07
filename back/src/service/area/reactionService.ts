import {Area, IArea} from '../../model/area';
import {
  DiscordWebhookEmbedReaction,
  IDiscordWebhookEmbedData,
} from '../../model/reaction/discordWebhookEmbedReaction';
import {DiscordWebhookReaction, IDiscordWebhookData} from '../../model/reaction/discordWebhookReaction';
import {GoogleEmailReaction, IGoogleEmailData} from '../../model/reaction/googleEmailReaction';
import sendEmail from '../google/emailService';
import {
  IBranchWebhook,
  IBranchWebhookHeader,
  IIssueWebhook,
  IPullWebhook,
  IPushWebhook, IReleaseWebhook,
  IStarWebhook,
} from '../../routes/github';
import {IMicrosoftEmailData, MicrosoftEmailReaction} from '../../model/reaction/microsoftEmailReaction';
import {ITaskDeletionData, ITaskDeletionReaction, TaskDeletionReaction} from '../../model/reaction/taskDeleteReaction';
import {ITeamsMessageData, TeamsMessageReaction} from '../../model/reaction/teamsMessageReaction';
import {IUser, User} from '../../model/user';
import {sendEmbedWebhook, sendWebhook} from '../discord/webhookService';

import {Model} from 'mongoose';
import {IDockerData} from '../../routes/docker';
import {IRedditPostData, RedditPostReaction} from '../../model/reaction/redditPostReaction';
import postRedditContent from '../reddit/postMessage';
import {IRedditSendPmData, RedditSendPmReaction} from '../../model/reaction/RedditSendPmReaction';
import {sendRedditPrivateMessage} from '../reddit/sendPm';
import {IRedditPostCommentData, RedditPostCommentReaction} from '../../model/reaction/redditPostComment';
import {postRedditComment} from '../reddit/postComment';
import {GithubOpenIssueReaction, IGithubOpenIssueData} from '../../model/reaction/githubOpenIssueReaction';
import {createGitHubIssue} from '../github/openIssue';
import {GithubCloseIssueReaction, IGithubCloseIssueData} from '../../model/reaction/githubCloseIssueReaction';
import {closeGitHubIssue} from '../github/closeIssue';
import {GithubPostCommentReaction, IGithubPostCommentData} from '../../model/reaction/githubPostCommentReaction';
import {postGithubComment} from '../github/postComment';

import sendMicrosoftEmailToMyself from '../microsoft/microsoftEmailService';
import teamsMessageService from '../microsoft/teamsMessageService';
import {reject} from '../authService';
import sendEmailToMyself from '../google/emailService';
import deleteAllTasksService from '../microsoft/deleteAllTasksService';
import {ReactionType} from '../../common/reaction.interface';

type ReactionFactory = (userId: string, data: object) => Promise<string>;

const reactionAssociations = new Map<ReactionType, ReactionFactory>();

reactionAssociations.set('discord:send_webhook', createDiscordWebhookReaction);
reactionAssociations.set('discord:send_embedded_webhook', createDiscordWebhookEmbedReaction);
reactionAssociations.set('google:send_email_to_myself', createGoogleEmailReaction);
reactionAssociations.set('google:send_email', createGoogleEmailReaction);
reactionAssociations.set('reddit:post_message', createRedditPostReaction);
reactionAssociations.set('reddit:send_pm', createRedditSendPmReaction);
reactionAssociations.set('reddit:post_comment', createRedditPostCommentReaction);
reactionAssociations.set('github:open_issue', createGithubOpenIssueReaction);
reactionAssociations.set('github:close_issue', createGithubCloseIssueReaction);
reactionAssociations.set('github:post_comment', createGithubPostCommentReaction);
reactionAssociations.set('microsoft:send_email_microsoft', createMicrosoftEmailReaction);
reactionAssociations.set('microsoft:send_teams_message', createTeamsMessageReaction);
reactionAssociations.set('microsoft:delete_all_tasks', deleteAllTasksReaction);

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

async function createMicrosoftEmailReaction(userId: string, data: IMicrosoftEmailData): Promise<string> {
  const email = await new MicrosoftEmailReaction({userId, ...data}).save();

  return email.id;
}

async function createRedditPostReaction(userId: string, data: IRedditPostData): Promise<string> {
  const redditPost = await new RedditPostReaction({userId, ...data}).save();

  return redditPost.id;
}

async function createRedditSendPmReaction(userId: string, data: IRedditSendPmData): Promise<string> {
  const redditPost = await new RedditSendPmReaction({userId, ...data}).save();

  return redditPost.id;
}

async function createRedditPostCommentReaction(userId: string, data: IRedditPostCommentData): Promise<string> {
  const redditPost = await new RedditPostCommentReaction({userId, ...data}).save();

  return redditPost.id;
}

async function createGithubOpenIssueReaction(userId: string, data: IGithubOpenIssueData): Promise<string> {
  const redditPost = await new GithubOpenIssueReaction({userId, ...data}).save();

  return redditPost.id;
}

async function createGithubCloseIssueReaction(userId: string, data: IGithubCloseIssueData): Promise<string> {
  const redditPost = await new GithubCloseIssueReaction({userId, ...data}).save();

  return redditPost.id;
}

async function createGithubPostCommentReaction(userId: string, data: IGithubPostCommentData): Promise<string> {
  const redditPost = await new GithubPostCommentReaction({userId, ...data}).save();

  return redditPost.id;
}


async function createTeamsMessageReaction(userId: string, data: IMicrosoftEmailData): Promise<string> {
  const email = await new TeamsMessageReaction({userId, ...data}).save();

  return email.id;
}

async function deleteAllTasksReaction(userId: string, data: IMicrosoftEmailData): Promise<string> {
  const email = await new TaskDeletionReaction({userId, ...data}).save();

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
    case 'google:send_email':
      data = (await GoogleEmailReaction.findById(id).exec()) as IGoogleEmailData;
      break;
    case 'google:send_email_to_myself':
      data = (await GoogleEmailReaction.findById(id).exec()) as IGoogleEmailData;
      break;
  case 'discord:send_webhook':
    data = (await DiscordWebhookReaction.findById(id).exec()) as IDiscordWebhookData;
    break;
  case 'discord:send_embedded_webhook':
    data = (await DiscordWebhookEmbedReaction.findById(id).exec()) as IDiscordWebhookEmbedData;
    break;
  case 'reddit:post_message':
    data = (await RedditPostReaction.findById(id).exec()) as IRedditPostData;
    break;
  case 'reddit:send_pm':
    data = (await RedditSendPmReaction.findById(id).exec()) as IRedditSendPmData;
    break;
  case 'reddit:post_comment':
    data = (await RedditPostCommentReaction.findById(id).exec()) as IRedditPostCommentData;
    break;
  case 'github:open_issue':
    data = (await GithubOpenIssueReaction.findById(id).exec()) as IGithubOpenIssueData;
    break;
  case 'github:close_issue':
    data = (await GithubCloseIssueReaction.findById(id).exec()) as IGithubCloseIssueData;
    break;
  case 'github:post_comment':
    data = (await GithubPostCommentReaction.findById(id).exec()) as IGithubPostCommentData;
    break;
  case 'microsoft:send_email_microsoft':
    data = (await MicrosoftEmailReaction.findById(id).exec()) as IMicrosoftEmailData;
    break;
  case 'microsoft:send_teams_message':
    data = (await TeamsMessageReaction.findById(id).exec()) as ITeamsMessageData;
    break;
  case 'microsoft:delete_all_tasks':
    data = (await TaskDeletionReaction.findById(id).exec()) as ITaskDeletionData;
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
  const isValidRedditPostData = (data: object): data is IRedditPostData => {
    return !!(data as IRedditPostData);
  };
  const isValidRedditSendPmData = (data: object): data is IRedditSendPmData => {
    return !!(data as IRedditSendPmData);
  };
  const isValidRedditPostCommentData = (data: object): data is IRedditPostCommentData => {
    return !!(data as IRedditPostCommentData);
  };
  const isValidGithubOpenIssueData = (data: object): data is IGithubOpenIssueData => {
    return !!(data as IGithubOpenIssueData);
  };
  const isValidGithubCloseIssueData = (data: object): data is IGithubCloseIssueData => {
    return !!(data as IGithubCloseIssueData);
  };
  const isValidGithubPostCommentData = (data: object): data is IGithubPostCommentData => {
    return !!(data as IGithubPostCommentData);
  };
  const isValidMicrosoftEmailData = (data: object): data is IMicrosoftEmailData => {
    return !!(data as IMicrosoftEmailData);
  };
  const isValidTeamsMessageData = (data: object): data is ITeamsMessageData => {
    return !!(data as ITeamsMessageData);
  };
  const isValidTaskDeletionData = (data: object): data is ITaskDeletionData => {
    return !!(data as ITaskDeletionReaction);
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
      .replace('${GITHUB_STAR_ACTION}', (data as IStarWebhook)?.action)
      .replace('${GITHUB_STAR_AUTHOR}', (data as IStarWebhook)?.sender?.login)
      .replace('${GITHUB_STAR_REPOSITORY}', (data as IStarWebhook)?.repository?.name)
      .replace('${GITHUB_STAR_AT}', (data as IStarWebhook)?.starred_at)
      .replace('${GITHUB_STAR_LINK}', (data as IStarWebhook)?.repository?.html_url)
      .replace('${GITHUB_RELEASE_ACTION}', (data as IReleaseWebhook)?.action)
      .replace('${GITHUB_RELEASE_AUTHOR}', (data as IReleaseWebhook)?.release?.author?.login)
      .replace('${GITHUB_RELEASE_REPOSITORY}', (data as IReleaseWebhook)?.repository?.name)
      .replace('${GITHUB_RELEASE_NAME}', (data as IReleaseWebhook)?.release?.name)
      .replace('${GITHUB_RELEASE_TAG_NAME}', (data as IReleaseWebhook)?.release?.tag_name)
      .replace('${GITHUB_RELEASE_LINK}', (data as IReleaseWebhook)?.release?.html_url)
      .replace('${DOCKER_TAG}', (data as IDockerData)?.push_data?.tag)
      .replace('${DOCKER_PUSHER}', (data as IDockerData)?.push_data?.pusher)
      .replace('${DOCKER_DESCRIPTION}', (data as IDockerData)?.repository?.description)
      .replace('${DOCKER_NAME}', (data as IDockerData)?.repository?.repo_name)
      .replace('${DOCKER_URL}', (data as IDockerData)?.repository?.repo_url)
      .replace('${RSS_TITLE}', (data as { title: string })?.title)
      .replace('${RSS_CONTENT}', (data as { content: string })?.content)
      .replace('${RSS_LINK}', (data as { link: string })?.link)
      .replace('${SUBJECT}', (data as { subject: string })?.subject)
      .replace('${FROM}', (data as { from: string })?.from)
      .replace('${SNIPPET}', (data as { snippet: string })?.snippet)
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
  case 'reddit:post_message':
    if (isValidRedditPostData(reactionData))
      await postRedditContent(reactionData.subreddit, reactionData.title, reactionData.content, user.redditId);
    break;
  case 'reddit:send_pm':
    if (isValidRedditSendPmData(reactionData))
      await sendRedditPrivateMessage(reactionData.to, reactionData.subject, reactionData.text, user.redditId);
    break;
  case 'reddit:post_comment':
    if (isValidRedditPostCommentData(reactionData))
      await postRedditComment(user.redditId, reactionData.postId, reactionData.text);
    break;
  case 'github:open_issue':
    if (isValidGithubOpenIssueData(reactionData))
      await createGitHubIssue(user.githubId, reactionData.repository, reactionData.title, reactionData.body);
    break;
  case 'github:close_issue':
    if (isValidGithubCloseIssueData(reactionData))
      await closeGitHubIssue(user.githubId, reactionData.repository, reactionData.issueId);
    break;
  case 'github:post_comment':
    if (isValidGithubPostCommentData(reactionData))
      await postGithubComment(user.githubId, reactionData.repository, reactionData.issueId, reactionData.comment);
    break;
  case 'microsoft:send_email_microsoft':
    if (isValidMicrosoftEmailData(reactionData))
      await sendMicrosoftEmailToMyself(replaceVariables(reactionData.subject), replaceVariables(reactionData.message), user.microsoftId);
    break;
  case 'microsoft:send_teams_message':
    if (isValidTeamsMessageData(reactionData))
      await teamsMessageService(replaceVariables(reactionData.subject), replaceVariables(reactionData.message), user.microsoftId);
    break;
  case 'microsoft:delete_all_tasks':
    if (isValidTaskDeletionData(reactionData))
      await deleteAllTasksService(replaceVariables(reactionData.subject), replaceVariables(reactionData.message), user.microsoftId);
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
  case 'reddit:post_message':
    model = RedditPostReaction;
    break;
  case 'reddit:send_pm':
    model = RedditSendPmReaction;
    break;
  case 'reddit:post_comment':
    model = RedditPostCommentReaction;
    break;
  case 'github:open_issue':
    model = GithubOpenIssueReaction;
    break;
  case 'github:close_issue':
    model = GithubCloseIssueReaction;
    break;
  case 'github:post_comment':
    model = GithubPostCommentReaction;
    break;
  case 'microsoft:send_email_microsoft':
    model = MicrosoftEmailReaction;
    break;
  case 'microsoft:send_teams_message':
    model = TeamsMessageReaction;
    break;
  case 'microsoft:delete_all_tasks':
    model = TaskDeletionReaction;
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
