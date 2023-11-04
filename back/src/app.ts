import express, {json} from 'express';
import cors from 'cors';

import {globalRouter} from './routes/global';
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
import {githubRouter} from './routes/github';
import {dockerRouter} from './routes/docker';

const APP = express();

APP.use(cors());
APP.use(json());
APP.use(globalRouter);
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
APP.use(githubRouter);
APP.use(dockerRouter);

export default APP;
