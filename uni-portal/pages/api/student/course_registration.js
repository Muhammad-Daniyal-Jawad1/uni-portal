import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { studentId, studentName, courseId, courseTitle } = req.body;

    console.log("StudentId:",studentId);
    console.log(courseTitle)

    if (!studentId || !studentName || !courseId || !courseTitle) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        await client.connect();
        const db = client.db('UniPortal');
        const collection = db.collection('course_registration');

        const result = await collection.insertOne({
            studentId,
            studentName,
            courseId,
            courseTitle,
            enrolledAt: new Date()
        });

        return res.status(200).json({ message: 'Enrollment successful', data: result });
    } catch (error) {
        console.error('Error enrolling student:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
}
