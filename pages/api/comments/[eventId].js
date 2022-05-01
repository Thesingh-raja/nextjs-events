import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../helpers/db-util';
const handler = async (req, res) => {
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    try {
      const {email, name, text} = req.body;
      if (
        !email.includes('@') ||
        !name ||
        name.trim === '' ||
        !text ||
        text.trim === ''
      ) {
        res.status(422).json({message: 'Invalid Input'});
        return;
      }
      const newComment = {
        id: new Date().toISOString,
        email,
        name,
        text,
      };

      let client;
      try {
        client = await connectDatabase();
      } catch (error) {
        res.status(500).json({message: 'Connection failed'});
        return;
      }
      let result;
      try {
        result = await insertDocument(client, 'comments', newComment);
        newComment.id = result.insertedId;
      } catch (error) {
        res.status(500).json({message: 'Insertion failed'});
        return;
      }
      //   const db = client.db();
      //   const result = await db.collection('comments').insertOne(newComment);

      res.json({message: 'Added Comment', comment: newComment});
    } catch (e) {
      console.log(e);
    }
  }

  if (req.method === 'GET') {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({message: 'Connection failed'});
      return;
    }
    let documents;
    try {
      documents = await getAllDocuments(client, 'comments');
    } catch (error) {
      res.status(500).json({message: 'fetching failed'});
      return;
    }
    res.status(200).json({comment: documents});
    client.close();
  }
};
export default handler;
