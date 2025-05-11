import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        await client.connect();
        const db = client.db('UniPortal');
        const coursesCollection = db.collection('courses');

        const courses = await coursesCollection.find({}).toArray();

        return res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
}
