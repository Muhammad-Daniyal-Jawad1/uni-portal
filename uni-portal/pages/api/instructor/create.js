import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const {
        ID,
        Email,
        FacultyStatus,
        Gender,
        Name,
        OfficeNo,
        Password,
        Picture,
        Position,
        Qualification,
        DoB
    } = req.body;

    if (
        !ID || !Email || !FacultyStatus || !Gender || !Name || !OfficeNo || !Password ||
        !Picture || !Position || !Qualification || !DoB
    ) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        await client.connect();
        const db = client.db('UniPortal');
        const instructors = db.collection('Instructors');

        
        const existing = await instructors.findOne({ ID });
        if (existing) {
            return res.status(409).json({ message: 'Instructor with this ID already exists' });
        }

        const result = await instructors.insertOne({
            ID,
            Email,
            FacultyStatus,
            Gender,
            Name,
            OfficeNo,
            Password,
            Picture,
            Position,
            Qualification,
            DoB,
            createdAt: new Date()
        });

        return res.status(201).json({ message: 'Instructor created successfully', data: result });
    } catch (error) {
        console.error('Error creating instructor:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
}
