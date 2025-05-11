import clientPromise from '../../lib/mongodb'; // ✅ Adjusted import

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { course, date } = req.query;

    if (!course || !date) {
      return res.status(400).json({ message: 'Missing course or date' });
    }

    const client = await clientPromise;
    const db = client.db('UniDB');
    const collection = db.collection('Attendance');

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const result = await collection.findOne({
      course,
      date: { $gte: start, $lte: end }
    });

    if (!result) {
      return res.status(404).json({ message: 'No record found' });
    }

    return res.status(200).json({ data: result });
  } catch (err) {
    console.error('Get error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
