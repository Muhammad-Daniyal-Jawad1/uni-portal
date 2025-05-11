import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { instructorId, instructorName, courseCode } = req.body;

    if (!instructorId || !instructorName || !courseCode) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        await client.connect();
        const db = client.db('UniPortal');
        const coursesCollection = db.collection('courses');
        const regCollection = db.collection('instructor_course_registration');

        
        const course = await coursesCollection.findOne({ CourseCode: courseCode });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const existing = await regCollection.findOne({ instructorId, courseCode });
        if (existing) {
            return res.status(409).json({ message: 'Instructor already registered for this course' });
        }

        const result = await regCollection.insertOne({
            instructorId,
            instructorName,
            courseCode: course.CourseCode,
            courseName: course.CourseName,
            creditHours: course.CreditHours,
            registeredAt: new Date()
        });

        return res.status(200).json({ message: 'Instructor enrolled successfully', data: result });
    } catch (error) {
        console.error('Error enrolling instructor:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
}
