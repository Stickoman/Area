import {ActionType} from '../../common/action.interface';
import {ITimerData, TimerAction} from '../../model/action/timerAction';
import {createTimerAction, refreshTimers} from './timerService';
import {createRssPoll, refreshRedditRss} from './redditRssService';
import {IRedditRssData, RedditRssAction} from '../../model/action/redditRssAction';
import {GitHubWebHookAction, IGitHubWebhookData} from '../../model/action/gitHubWebHookAction';
import {createBranchesPoll, createIssuesPoll, createPullPoll, createPushesPoll} from '../github/gitHubWebHook';
import {Model} from 'mongoose';
import {reject} from '../authService';

type ActionFactory = (userId: string, data: object) => Promise<string>;

const actionAssociations = new Map<ActionType, ActionFactory>();

actionAssociations.set('timer:scheduled_task', createTimerAction);
actionAssociations.set('reddit:poll_rss', createRssPoll);
actionAssociations.set('github:issues', createIssuesPoll);
actionAssociations.set('github:branches', createBranchesPoll);
actionAssociations.set('github:pushes', createPushesPoll);
actionAssociations.set('github:pull', createPullPoll);

async function refreshActions() {
  let count: number = 0;

  count += await refreshTimers();
  count += await refreshRedditRss();
  console.log(`Loaded ${count} actions`);
}

async function createAction(userId: string, type: ActionType, data: object): Promise<string> {
  for (const [key, value] of actionAssociations) {
    if (key == type) {
      return value(userId, data);
    }
  }
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
    model = GitHubWebHookAction;
    break;
  case 'reddit:poll_rss':
    model = RedditRssAction;
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
