import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'Missing student ID' });

  try {
    const client = await clientPromise;
    const db = client.db('UniDB'); // ✅ make sure this matches Compass
    const collection = db.collection('Attendance');

    const grouped = await collection.find({}).toArray();

    const flattened = [];

    for (const record of grouped) {
      for (const s of record.students || []) {
        if (s.studentId === id) {
          flattened.push({
            course: record.course,
            date: record.date,
            status: s.status
          });
        }
      }
    }

    return res.status(200).json({ records: flattened });
  } catch (err) {
    console.error('Student attendance API error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
