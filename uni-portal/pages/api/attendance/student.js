import clientPromise from '../../lib/mongodb';


export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'Missing student ID' });

  try {
    const client = await clientPromise;
    const db = client.db('UniPortal'); //changed by Dani
    const collection = db.collection('Attendance');

    const records = await collection.find({ studentId: id }).toArray();
    return res.status(200).json({ records });
  } catch (err) {
    console.error('Student attendance fetch error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}
