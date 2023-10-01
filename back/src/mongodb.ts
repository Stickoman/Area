import mongoose from 'mongoose';

let isConnected = false;

function reject(reason: string): Promise<never> {
  return Promise.reject(new Error(reason));
}

async function connect() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,
    });

    isConnected = true;
  } catch (error) {
    isConnected = false;
    return Promise.reject(error);
  }
}

export {connect};
