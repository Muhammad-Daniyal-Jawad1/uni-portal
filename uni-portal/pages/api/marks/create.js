// import clientPromise from '../../../lib/mongodb';
import clientPromise from '@/pages/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { course, title, type, totalMarks, weightage, students } = req.body;

    if (!course || !title || !type || !totalMarks || !weightage || !Array.isArray(students)) {
      return res.status(400).json({ message: 'Invalid request format' });
    }

    const client = await clientPromise;
    const db = client.db('UniPortal');
    const collection = db.collection('Marks');

    const newAssessment = {
      id: uuidv4(),
      title,
      type,
      totalMarks,
      weightage,
      students: students.map(s => ({
        studentId: s.studentId,
        obtainedMarks: s.obtainedMarks || 0
      }))
    };

    // Check if a marks document already exists for this course
    const existing = await collection.findOne({ course });

    if (existing) {
      // Update existing document
      const result = await collection.updateOne(
        { course },
        { $push: { assessments: newAssessment } }
      );
      return res.status(200).json({ message: 'Assessment added to course', result });
    } else {
      // Create new course document
      const result = await collection.insertOne({
        course,
        assessments: [newAssessment]
      });
      return res.status(201).json({ message: 'Marks record created for course', id: result.insertedId });
    }

  } catch (err) {
    console.error('Insert failed:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
