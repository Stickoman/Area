import {IRssFeedUpdate, RssFeedUpdate} from '../model/rss';

async function retrieveFeedUpdate(userId: string, feedUrl: string): Promise<IRssFeedUpdate> {
  const feedUpdate = await RssFeedUpdate.findOne({userId: userId, feedUrl: feedUrl}).exec();

  if (feedUpdate === null)
      return Promise.reject(new Error('Unable to find feed update for this user'));
  return feedUpdate as IRssFeedUpdate;
}

async function updateFeed(userId: string, feedUrl: string): Promise<void> {
  let feedUpdate = await RssFeedUpdate.findOne({userId: userId, feedUrl: feedUrl}).exec();

  if (feedUpdate === null)
    feedUpdate = new RssFeedUpdate({userId: userId, feedUrl: feedUrl, lastUpdate: new Date()});
  feedUpdate.lastUpdate = new Date();
  await feedUpdate.save();
}

export {retrieveFeedUpdate, updateFeed};
