import express, {json} from 'express';
import {connect} from './mongodb';
import cors from 'cors';
import {areasRouter} from './routes/area';
import {authRouter} from './routes/auth';
import {profileRouter} from './routes/profile';
import {servicesRouter} from './routes/services';
import dotenv from 'dotenv';

const APP = express();
const PORT = 8080;

APP.get('/api/ping', (_req, res) => {
  res.status(200)
    .send('Pong');
});

APP.use(cors());
APP.use(json());
APP.use(areasRouter);
APP.use(authRouter);
APP.use(profileRouter);
APP.use(servicesRouter);

APP.listen(PORT, () => {
  dotenv.config();

  connect()
    .then(() => console.log(`Express is listening at http://localhost:${PORT}`))
    .catch(reason => console.error('Unable to connect to database: ' + reason));
});

