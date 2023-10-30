import JobScheduler from '../../common/jobScheduler';
import {IUser, User} from '../../model/user';
import {IRedditRssAction, IRedditRssData, RedditRssAction} from '../../model/action/redditRssAction';
import {isOrphanAction} from '../../common/action.interface';
import {callReaction} from './reactionService';
import {RedditFeed, retrieveFeedUpdates} from '../../adapter/redditRssAdapter';

const redditRssScheduler: JobScheduler = new JobScheduler();

function scheduleAction(actionId: string, action: IRedditRssAction) {
  redditRssScheduler.schedule('/10 * * * * *', async () => {
    const feed: RedditFeed = await retrieveFeedUpdates(action.userId, action.url);

    console.log(`Poll feed ${feed.title}`);
    for (const feedItem of feed.items) {
      await callReaction(actionId, feedItem)
        .catch(reason => console.error(reason));
    }
  });
}

async function refreshRedditRss(): Promise<number> {
  const actions = await RedditRssAction.find({}).exec();
  let count: number = 0;

  redditRssScheduler.destroyJobs();
  for (const action of actions) {
    const user: IUser = await User.findById(action.userId).exec();

    if (await isOrphanAction('reddit:poll_rss', action._id, user._id)) {
      await RedditRssAction.deleteOne({_id: action._id}).exec();
    } else {
      scheduleAction(action.id, action);
      count++;
    }
  }
  return count;
}

async function createRssPoll(userId: string, data: IRedditRssData): Promise<string> {
  const redditRss = await new RedditRssAction({userId, ...data}).save();

  scheduleAction(redditRss.id, redditRss);
  return redditRss.id;
}

export {createRssPoll, refreshRedditRss};
