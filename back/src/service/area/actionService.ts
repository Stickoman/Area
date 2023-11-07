import {ActionType} from '../../common/action.interface';
import {ITimerData, TimerAction} from '../../model/action/timerAction';
import {createTimerAction, refreshTimers} from './timerService';
import {createRssPoll, refreshRedditRss} from './redditRssService';
import {IRedditRssData, RedditRssAction} from '../../model/action/redditRssAction';
import {GitHubWebHookAction, IGitHubWebhookData} from '../../model/action/gitHubWebHookAction';
import {createGithubWebhook} from '../github/gitHubWebHook';
import {Model} from 'mongoose';
import {reject} from '../authService';
import {createEmailsPoll, refreshGoogleEmails} from './googleEmailsService';
import {GoogleEmailsAction, IGoogleEmailsData} from '../../model/action/googleEmailsAction';
import {DockerPushAction, IDockerPushData} from '../../model/action/dockerPushAction';
import {createDockerPushAction} from './dockerService';

type ActionFactory = (userId: string, data: object) => Promise<string>;

const actionAssociations = new Map<ActionType, ActionFactory>();

actionAssociations.set('timer:scheduled_task', createTimerAction);
actionAssociations.set('reddit:poll_rss', createRssPoll);
actionAssociations.set('github:issues', createGithubWebhook);
actionAssociations.set('github:branches', createGithubWebhook);
actionAssociations.set('github:pushes', createGithubWebhook);
actionAssociations.set('github:pull', createGithubWebhook);
actionAssociations.set('google:poll_mailbox', createEmailsPoll);
actionAssociations.set('google:search_emails', createEmailsPoll);
actionAssociations.set('docker:watch_webhook', createDockerPushAction);

async function refreshActions() {
  let count: number = 0;

  count += await refreshTimers();
  count += await refreshRedditRss();
  count += await refreshGoogleEmails();
  console.log(`Loaded ${count} actions`);
}

async function createAction(userId: string, type: ActionType, data: object): Promise<string> {
  for (const [key, value] of actionAssociations) {
    if (key == type) {
      return value(userId, data);
    }
  }
  return reject(`Unknown action type ${type}`);
}

async function retrieveActionData(id: string, type: ActionType): Promise<object> {
  let data: object = {};

  switch (type) {
    case 'timer:scheduled_task':
      data = (await TimerAction.findById(id).exec()) as ITimerData;
      break;
    case 'github:issues':
    case 'github:branches':
    case 'github:pushes':
    case 'github:pull':
      data = (await GitHubWebHookAction.findById(id).exec()) as IGitHubWebhookData;
      break;
    case 'reddit:poll_rss':
      data = (await RedditRssAction.findById(id).exec()) as IRedditRssData;
      break;
    case 'google:search_emails':
    case 'google:poll_mailbox':
      data = (await GoogleEmailsAction.findById(id).exec()) as IGoogleEmailsData;
      break;
    case 'docker:watch_webhook':
      data = (await DockerPushAction.findById(id).exec()) as IDockerPushData;
      break;
  }
  return data;
}

async function deleteAction(id: string, type: ActionType) {
  let model: Model<unknown> = null;

  switch (type) {
    case 'timer:scheduled_task':
      model = TimerAction;
      break;
    case 'github:issues':
    case 'github:branches':
    case 'github:pushes':
    case 'github:pull':
      model = GitHubWebHookAction;
      break;
    case 'reddit:poll_rss':
      model = RedditRssAction;
      break;
    case 'google:poll_mailbox':
      model = GoogleEmailsAction;
      break;
    case 'google:search_emails':
      model = GoogleEmailsAction;
      break;
    case 'docker:watch_webhook':
      model = DockerPushAction;
      break;
  }

  if (model) {
    const document = await model.findById(id).exec();
    await document.deleteOne();
  } else {
    return reject('Unable to find reaction model');
  }
}

export {refreshActions, createAction, retrieveActionData, deleteAction};
