import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {AutomaticAuth} from 'mongodb-memory-server-core/lib/MongoMemoryServer';
import {clearDatabase, connect} from './src/mongodb';
import dotenv from 'dotenv';

let memoryServer: MongoMemoryServer;

async function startMemoryServer(): Promise<string> {
  memoryServer = await MongoMemoryServer.create({
    auth: {
      disable: false,
    } as AutomaticAuth,
  });

  return memoryServer.getUri();
}

async function closeMemoryServer() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await memoryServer.stop();
}

beforeAll(async () => {
  dotenv.config();
  process.env.MONGODB_URI = await startMemoryServer();

  await connect();
});

beforeEach(clearDatabase);

afterAll(closeMemoryServer);
