import {Request, Response, Router} from 'express';
import {GithubAuthentication} from '../model/githubAuth';
import {callReaction} from '../service/area/reactionService';
import {GitHubWebHookAction} from '../model/action/gitHubWebHookAction';

const router = Router();

interface IIssueWebhook {
  action: string;
  issue: {
    title: string;
    html_url: string;
    user: {
      login: string;
      avatar_url: string;
      html_url: string;
    },
  },
  repository: {
    name: string;
    html_url: string;
  },
  sender: {
    login: string;
  }
}

interface IBranchWebhook {
  ref: string;
  repository: {
    name: string;
    owner: {
      login: string;
    },
    html_url: string;
  },
  sender: {
    login: string;
  }
}

interface IBranchWebhookHeader {
  'x-github-event'?: string;
}

interface IPushWebhook {
  repository: {
    name: string;
    owner: {
      login: string;
    },
    html_url: string;
  },
  pusher: {
    name: string;
  },
  commits: {
    message: string;
  }[],
  head_commit: {
    message: string;
    author: {
      username: string;
      },
      },
}

interface IPullWebhook {
  action: string;
  pull_request: {
    title: string;
    user: {
      login: string;
    }
  }
  repository: {
    name: string;
    owner: {
      login: string;
    },
    html_url: string;
  },
  sender: {
    login: string;
  }
}

router.post(`/api/github/webhook/issues/`, async (req: Request, res: Response) => {
  const data: IIssueWebhook = req.body;
  const githubUser = await GithubAuthentication.findOne({ screenName: data.sender.login }).exec();

  console.log(`Received data for ${data.issue.user.login}: ${data.action}`);
  if (!githubUser) {
    res.sendStatus(403);
  } else {
    const actions = await GitHubWebHookAction.find({repositoryUrl: data.repository.html_url});

    console.log(`Find ${actions.length} actions matching with this webhook`);
    for (const action of actions) {

      await callReaction(action.id, data);
    }
    res.sendStatus(200);
  }
});

router.post(`/api/github/webhook/branches/`, async (req: Request, res: Response) => {
  const data: IBranchWebhook = req.body;
  const dataHeader: IBranchWebhookHeader = req.headers as IBranchWebhookHeader;
  const githubUser = await GithubAuthentication.findOne({ screenName: data.sender.login }).exec();

  if (!githubUser || data.ref.length === 0) {
    res.sendStatus(403);
  } else {
    const actions = await GitHubWebHookAction.find({repositoryUrl: data.repository.html_url});
    console.log(`Received data for ${data.repository.owner.login}: repo "${data.repository.name}" branch named "${data.ref}" ${dataHeader['x-github-event']} by ${data.sender.login}`);
    console.log(`Find ${actions.length} actions matching with this webhook`);
    for (const action of actions) {

      await callReaction(action.id, data, dataHeader);
    }
    res.sendStatus(200);
  }
});

router.post(`/api/github/webhook/pushes/`, async (req: Request, res: Response) => {
  const data: IPushWebhook = req.body;
  const githubUser = await GithubAuthentication.findOne({ screenName: data.pusher.name }).exec();

  if (!githubUser || (data.commits && data.commits.length === 0)) {
    res.sendStatus(403);
  } else {
    const actions = await GitHubWebHookAction.find({repositoryUrl: data.repository.html_url});
    console.log(`Received push on ${data.repository.name} for ${data.repository.owner.login}: by ${data.pusher.name}`);
    console.log(`Find ${actions.length} actions matching with this webhook`);
    for (const action of actions) {

      await callReaction(action.id, data);
    }
    res.sendStatus(200);
  }
});

router.post(`/api/github/webhook/pull/`, async (req: Request, res: Response) => {
  const data: IPullWebhook = req.body;
  const githubUser = await GithubAuthentication.findOne({ screenName: data.sender.login }).exec();

  console.log(`Received data for ${data.repository.owner.login}: repo "${data.repository.name}" pull request "${data.pull_request.title}" ${data.action} by ${data.pull_request.user.login}`);
  if (!githubUser) {
    res.sendStatus(403);
  } else {
    const actions = await GitHubWebHookAction.find({repositoryUrl: data.repository.html_url});

    console.log(`Find ${actions.length} actions matching with this webhook`);
    for (const action of actions) {

      await callReaction(action.id, data);
    }
    res.sendStatus(200);
  }
});

export type {IIssueWebhook, IBranchWebhook, IPushWebhook, IPullWebhook, IBranchWebhookHeader};
export {router as githubRouter};
