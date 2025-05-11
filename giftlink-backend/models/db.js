// models/db.js
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const url = process.env.MONGO_URL;
let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    dbInstance = client.db(dbName);
    console.log("Connected to MongoDB:", dbName);
    return dbInstance;

  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

export default connectToDatabase;
