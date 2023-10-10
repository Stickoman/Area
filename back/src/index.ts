import express, {json} from 'express';
import {connect} from './mongodb';
import cors from 'cors';
import {areasRouter} from './routes/area';
import {basicAuthRouter} from './routes/auth/basic';
import {profileRouter} from './routes/profile';
import {servicesRouter} from './routes/services';
import dotenv from 'dotenv';
import {twitterAuthRouter} from './routes/auth/twitter';
import {oauthRouter} from './routes/auth/oauth';

const APP = express();
const PORT = 8080;

APP.get('/api/ping', (_req, res) => {
  res.status(200)
    .send('Pong');
});

APP.use(cors());
APP.use(json());
APP.use(areasRouter);
APP.use(basicAuthRouter);
APP.use(twitterAuthRouter);
APP.use(profileRouter);
APP.use(servicesRouter);
APP.use(oauthRouter);

APP.listen(PORT, () => {
  dotenv.config();

  connect()
    .then(() => console.log(`Express is listening at http://localhost:${PORT}`))
    .catch(reason => console.error('Unable to connect to database: ' + reason));
});

