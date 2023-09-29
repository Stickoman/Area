import express from 'express';
import { connect } from './mongodb';
import { areasRouter } from './routes/area'
import { authRouter } from './routes/auth'
import { meRouter } from './routes/me'
import { servicesRouter } from './routes/services'

const APP = express();
const PORT = 8080;

APP.get('/', (req, res) => {
  res.send('Hello World!');
});

APP.use(areasRouter)
APP.use(authRouter)
APP.use(meRouter)
APP.use(servicesRouter)

APP.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

connect().catch(console.dir);
