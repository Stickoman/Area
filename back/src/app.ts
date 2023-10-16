import express, {json} from 'express';
import {connect, isConnected} from './mongodb';
import cors from 'cors';
import {areasRouter} from './routes/area';
import {basicAuthRouter} from './routes/auth/basic';
import {profileRouter} from './routes/profile';
import {servicesRouter} from './routes/services';
import {twitterAuthRouter} from './routes/auth/twitter';
import {discordAuthRouter} from './routes/auth/discord';
import {oauthRouter} from './routes/auth/oauth';
import {DiscordAuthentication} from './model/discordAuth';

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
APP.use(discordAuthRouter);
APP.use(profileRouter);
APP.use(servicesRouter);
APP.use(oauthRouter);

export default APP;
