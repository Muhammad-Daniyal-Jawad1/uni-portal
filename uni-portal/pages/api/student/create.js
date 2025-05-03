// pages/api/student/create.js
import dbConnect from '@/pages/lib/dbConnect';
import Student from '@/pages/models/Student';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const student = new Student(req.body);
      await student.save();
      return res.status(201).json({ message: 'Student created successfully' });
    } catch (error) {
      console.error('Error creating student:', error);
      return res.status(500).json({ message: 'Failed to create student', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
