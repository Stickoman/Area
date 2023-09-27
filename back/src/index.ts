import express from 'express';
import {connect} from './mongodb';

const APP = express();
const PORT = 8080;

APP.get('/', (req, res) => {
  res.send('Hello World!');
});

APP.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

connect().catch(console.dir);
