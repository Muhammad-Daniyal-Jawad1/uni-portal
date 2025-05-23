import clientPromise from '@/pages/lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { instructorId, password } = req.body;

    if (!instructorId || !password) {
        return res.status(400).json({ message: 'Missing credentials' });
    }

    try {
        const client = await clientPromise;
        const db = client.db('UniPortal'); // changed by Dani
        const collection = db.collection('Instructors');

        
        const instructor = await collection.findOne({ ID: instructorId });

        if (!instructor) {
            return res.status(404).json({ message: 'Incorrect ID' });
        }

        if(password === instructor.Password){
            return res.status(200).json({
            instructorId: instructor.ID,
            name: instructor.Name,
            email: instructor.Email,
            position: instructor.Position,
            facultyStatus: instructor.FacultyStatus,
            officeNo: instructor.OfficeNo,
            picture: instructor.Picture,
            qualification: instructor.Qualification,
            dob: instructor.DoB,
            gender: instructor.Gender
        });
        }
        else{
            return res.status(401).json({ message: 'Incorrect password' });
        }

    
        
    } catch (error) {
        console.error('Login API Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
