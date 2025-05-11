import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { course, date, students } = req.body;

    console.log('▶️ /api/attendance/create called');
    console.log('Payload received:', { course, date, students });

    if (!course || !date || !Array.isArray(students)) {
      return res.status(400).json({ message: 'Invalid request format' });
    }

    const client = await clientPromise;
    const db = client.db('UniDB'); // ✅ MUST match Compass
    const collection = db.collection('Attendance');

    const existing = await collection.findOne({
      course,
      date: {
        $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(date).setHours(23, 59, 59, 999))
      }
    });

    if (existing) {
      return res.status(409).json({ message: 'Attendance already exists for this course and date' });
    }

    const record = {
      course,
      date: new Date(date),
      students // ✅ bulk array
    };

    const result = await collection.insertOne(record);

    console.log('✔️ Inserted grouped record:', result.insertedId);

    return res.status(201).json({ message: 'Attendance recorded', id: result.insertedId });
  } catch (err) {
    console.error('❌ Insert failed:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
