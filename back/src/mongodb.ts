require('dotenv').config();
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

async function connect() {
  try {
    await mongoose.connect(uri, {
      autoIndex: true,
    });

    console.log('Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB using Mongoose:', error);
  }
}

export { connect };
