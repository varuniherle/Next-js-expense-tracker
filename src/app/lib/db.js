import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

export const connectToDatabase = async () => {
  const db = client.db('expenseDB')
  return db;
};
