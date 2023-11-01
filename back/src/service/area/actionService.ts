import {ActionType} from '../../common/action.interface';
import {ITimerData, TimerAction} from '../../model/action/timerAction';
import {createTimerAction, refreshTimers} from './timerService';
import {createRssPoll, refreshRedditRss} from './redditRssService';
import {IRedditRssData, RedditRssAction} from '../../model/action/redditRssAction';
import {GitHubWebHookAction, IGitHubWebhookData} from '../../model/action/gitHubWebHookAction';
import {createBranchesPoll, createIssuesPoll, createPushesPoll} from '../github/gitHubWebHook';

type ActionFactory = (userId: string, data: object) => Promise<string>;

const actionAssociations = new Map<ActionType, ActionFactory>();

actionAssociations.set('timer:scheduled_task', createTimerAction);
actionAssociations.set('reddit:poll_rss', createRssPoll);
actionAssociations.set('github:issues', createIssuesPoll);
actionAssociations.set('github:branches', createBranchesPoll);
actionAssociations.set('github:pushes', createPushesPoll);

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
      data = (await GitHubWebHookAction.findById(id).exec()) as IGitHubWebhookData;
      break;
    case 'github:branches':
      data = (await GitHubWebHookAction.findById(id).exec()) as IGitHubWebhookData;
      break;
    case 'github:pushes':
      data = (await GitHubWebHookAction.findById(id).exec()) as IGitHubWebhookData;
      break;
  case 'reddit:poll_rss':
    data = (await RedditRssAction.findById(id).exec()) as IRedditRssData;
  }

  return data;
}

export {refreshActions, createAction, retrieveActionData};
