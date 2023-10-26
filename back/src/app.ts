import {connect, isConnected} from './mongodb';
import express, {json} from 'express';

import {areasRouter} from './routes/area';
import {basicAuthRouter} from './routes/auth/basic';
import cors from 'cors';
import {discordAuthRouter} from './routes/auth/discord';
import {facebookAuthRouter} from './routes/auth/facebook';
import {githubAuthRouter} from './routes/auth/github';
import {googleAuthRouter} from './routes/auth/google';
import {microsoftAuthRouter} from './routes/auth/microsoft';
import {oauthRouter} from './routes/auth/oauth';
import {profileRouter} from './routes/profile';
import {redditAuthRouter} from './routes/auth/reddit';
import {servicesRouter} from './routes/services';
import {twitterAuthRouter} from './routes/auth/twitter';

const APP = express();

APP.get('/api/ping', (_req, res) => {
  res.status(200)
    .send('Pong');
});

APP.get('/api/status', (_req, res) => {
  res.sendStatus(isConnected() ? 200 : 500);
});

APP.get('/api/mobile', (req, res) => {
  const file = `/usr/src/app/shared/client.apk`;

  res.download(file);
});

APP.use(cors());
APP.use(json());
APP.use(areasRouter);
APP.use(basicAuthRouter);
APP.use(twitterAuthRouter);
APP.use(facebookAuthRouter);
APP.use(redditAuthRouter);
APP.use(discordAuthRouter);
APP.use(githubAuthRouter);
APP.use(microsoftAuthRouter);
APP.use(googleAuthRouter);
APP.use(profileRouter);
APP.use(servicesRouter);
APP.use(oauthRouter);

export default APP;
