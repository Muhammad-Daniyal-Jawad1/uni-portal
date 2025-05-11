import clientPromise from '@/pages/lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { studentId, password } = req.body;

    if (!studentId || !password) {
        return res.status(400).json({ message: 'Missing credentials' });
    }

    try {
        const client = await clientPromise;
        const db = client.db('UniPortal'); //changed by Dani
        const collection = db.collection('students');

       
        const student = await collection.findOne({ ID: studentId });

        console.log(student.ID);
        console.log(student.Password);
        console.log("sdsd")

        if (!student) {
            return res.status(404).json({ message: 'Incorrect ID' });
        }

        if(password === student.Password){
            return res.status(200).json({
            studentId: student.ID,
            name: student.Name,
            email: student.Email,
            dob: student.DoB,
            gender: student.Gender,
            discipline: student.Discipline,
            semester: student.Semester,
            picture: student.Picture,
            batch: student.Batch,
            section: student.Section,
            status: student.Status
        });
        }
        else{
            return res.status(401).json({ message: 'Incorrect password' });
        }

        

        // // Success – return student data
        // return res.status(200).json({
        //     studentId: student.ID,
        //     name: student.Name,
        //     email: student.Email,
        //     dob: student.DoB,
        //     gender: student.Gender,
        //     discipline: student.Discipline,
        //     semester: student.Semester,
        //     picture: student.Picture,
        //     batch: student.Batch,
        //     section: student.Section,
        //     status: student.Status
        // });

    } catch (error) {
        console.error('Student Login API Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
