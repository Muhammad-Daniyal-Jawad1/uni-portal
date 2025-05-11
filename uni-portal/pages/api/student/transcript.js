import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { studentId } = req.body;

    if (!studentId) {
        return res.status(400).json({ message: 'Missing studentId' });
    }

    try {
        await client.connect();
        const db = client.db('UniPortal');
        const collection = db.collection('course_registration');

        const registeredCourses = await collection.find({ studentId }).toArray();

        
        const transcript = registeredCourses.map(course => ({
            id: course.courseId,
            title: course.courseTitle,
            creditHours: 3, 
            grade: 'A',     
            status: 'Passed'
        }));

        res.status(200).json({ transcript });
    } catch (error) {
        console.error('Transcript Fetch Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
}
