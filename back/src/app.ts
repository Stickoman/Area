import {isConnected} from './mongodb';
import express, {json} from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { swagger } from './swagger';

import {areasRouter} from './routes/area';
import {basicAuthRouter} from './routes/auth/basic';
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
const SWAGGER_SPECS = swaggerJsdoc(swagger);

APP.get('/api/ping', (_req, res) => {
  res.status(200)
    .send('Pong');
});

APP.get('/api/status', (_req, res) => {
  res.sendStatus(isConnected() ? 200 : 500);
});

APP.get('/api/mobile', (req, res) => {
  const file = '/usr/src/app/shared/client.apk';

  res.download(file);
});

APP.use('/api/docs', swaggerUi.serve, swaggerUi.setup(SWAGGER_SPECS));

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
