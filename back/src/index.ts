import express from 'express';
import {connect} from './mongodb';
import {areasRouter} from './routes/area';
import {authRouter} from './routes/auth';
import {meRouter} from './routes/me';
import {servicesRouter} from './routes/services';
import dotenv from 'dotenv';

const APP = express();
const PORT = 8080;

APP.get('/api/ping', (_req, res) => {
  res.status(200)
    .send('Pong');
});

APP.use(areasRouter);
APP.use(authRouter);
APP.use(meRouter);
APP.use(servicesRouter);

APP.listen(PORT, () => {
  dotenv.config();

  connect()
    .then(() => console.log(`Express is listening at http://localhost:${PORT}`))
    .catch(reason => console.error('Unable to connect to database: ' + reason));
});

