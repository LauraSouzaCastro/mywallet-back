
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
  await mongoClient.connect();
  console.log('MongoDB Connected!');
  db = mongoClient.db();
} catch (error) {
  console.log('Erro no servidor');
  console.log(error.message);
}

export default db;