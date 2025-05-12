import clientPromise from '@/lib/mongodb'; // Adjust if your client is in a different path

export default async function handler(req, res) {
    const { id: studentId } = req.query;

    if (!studentId) {
        return res.status(400).json({ message: 'Student ID is required' });
    }

    try {
        const client = await clientPromise;
        const db = client.db('UniPortal');
        const collection = db.collection('Marks');

        const allMarks = await collection.find({
            "assessments.students.studentId": studentId
        }).toArray();

        const studentMarks = allMarks.map(course => ({
            course: course.course,
            assessments: course.assessments
                .filter(a => a.students.some(s => s.studentId === studentId))
                .map(a => ({
                    title: a.title,
                    totalMarks: a.totalMarks,
                    weightage: a.weightage,
                    obtainedMarks: a.students.find(s => s.studentId === studentId).obtainedMarks
                }))
        }));

        return res.status(200).json({ records: studentMarks });
    } catch (err) {
        console.error('Error fetching student marks:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
