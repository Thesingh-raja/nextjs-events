import {MongoClient} from 'mongodb';
export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://Thesingh:qwertyuiop@cluster0.v136z.mongodb.net/events?retryWrites=true&w=majority'
  );
  return client;
};
export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const res = await db.collection(collection).insertOne(document);
  return res;
};
export const getAllDocuments = async (client, collection) => {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find()
    .sort({_id: -1})
    .toArray();
  return documents;
};
