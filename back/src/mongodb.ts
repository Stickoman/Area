import mongoose, {ConnectOptions} from 'mongoose';
import {refreshActions} from './service/area/actionService';

let connected = false;

async function connect() {
  if (connected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    await refreshActions();
    connected = true;
  } catch (error) {
    connected = false;
    return Promise.reject(error);
  }
}

async function clearDatabase(): Promise<boolean> {
  return await mongoose.connection.db.dropDatabase();
}

function isConnected(): boolean {
  return connected;
}

export {connect, isConnected, clearDatabase};
