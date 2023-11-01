import {retrieveFeedUpdate, updateFeed} from '../repository/rssRepository';

const Parser = require('rss-parser');
const parser = new Parser();

interface RedditFeedItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  contentSnippet: string;
  id: string;
  isoDate: string;
}

interface RedditFeed {
  items: RedditFeedItem[];
  link: string;
  feedUrl: string;
  title: string;
  lastBuildDate: string;
}

async function parseRedditFeed(url: string): Promise<RedditFeed> {
  const formattedUrl = url.endsWith('/') ? url : url + '/';
  const feedUrl = (url.endsWith('/.rss') ? url : formattedUrl + '.rss');

  try {
    return await parser.parseURL(feedUrl);
  } catch (reason) {
    return Promise.reject(new Error('Unable to reed RSS feed: ' + reason));
  }
}

function filterRedditFeed(feed: RedditFeed, afterDate: Date): RedditFeed {
  return {
    ...feed,
    items: feed.items.filter(item => {
      const itemDate: Date = new Date(item.pubDate);

      return (itemDate.getTime() >= afterDate.getTime());
    }),
  };
}

async function retrieveFeedUpdates(userId: string, feedUrl: string): Promise<RedditFeed> {
  try {
    const feed = await parseRedditFeed(feedUrl);

    return retrieveFeedUpdate(userId, feedUrl)
      .then(update => {
        return filterRedditFeed(feed, update.lastUpdate);
      })
      .catch(() => {
        return feed;
      })
      .finally(async () => {
        await updateFeed(userId, feedUrl);
      });
  } catch (e) {
    console.warn('Unable to parse RSS feed', e);
  }
}

export type {RedditFeed, RedditFeedItem};
export {retrieveFeedUpdates};
