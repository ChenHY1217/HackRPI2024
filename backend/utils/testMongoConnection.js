
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://haoyuan2004:BXDyhjXIANz7A2yd@hackrpi2024.vzusc.mongodb.net/'; // Replace with your MongoDB connection string
const dbName = 'HackRPI2024'; // Replace with your database name
const collectionName = 'users'; // Replace with your collection name

async function testMongoConnection() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const documents = await collection.find({}).limit(5).toArray(); // Retrieve first 5 documents
        console.log('Documents:', documents);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }
}

export default testMongoConnection();