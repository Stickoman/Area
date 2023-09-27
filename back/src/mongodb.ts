import {MongoClient, ServerApiVersion} from 'mongodb';

const uri = 'mongodb+srv://area:SfWUBc8O4sQCEkG3@cluster0.djoggy6.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    await client.db('admin').command({ping: 1});

    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

export {connect};
