import APP from './app';
import dotenv from 'dotenv';
import {connect} from './mongodb';
import mongoose from 'mongoose';

const PORT = 8080;

APP.listen(PORT, () => {
  console.log('Starting Express Application...');
  dotenv.config();

  connect()
    .then(() => console.log(`Express is listening at http://localhost:${PORT}`))
    .catch(reason => console.error('Unable to connect to database: ' + reason));
});

APP.on('close', async () => {
  await mongoose.disconnect();
});
