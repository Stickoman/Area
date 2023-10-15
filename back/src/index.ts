import APP from './app';
import dotenv from 'dotenv';
import {connect} from './mongodb';

const PORT = 8080;

APP.listen(PORT, () => {
  console.log('Starting Express Application...');
  dotenv.config();

  connect()
    .then(() => console.log(`Express is listening at http://localhost:${PORT}`))
    .catch(reason => console.error('Unable to connect to database: ' + reason));
});
