import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentMarks() {
    const [studentId, setStudentId] = useState('');
    const [marksRecords, setMarksRecords] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = localStorage.getItem('studentId');
        if (!id) return;

        setStudentId(id);
        fetchStudentMarks(id);
    }, []);

    const fetchStudentMarks = async (id) => {
        try {
            const res = await fetch(`/api/marks/student-full?id=${id}`);
            const data = await res.json();

            if (res.ok) {
                setMarksRecords(data.records);
                const uniqueCourses = data.records.map(r => r.course);
                setCourses(uniqueCourses);
            } else {
                alert(data.message || 'Error loading marks');
            }
        } catch (err) {
            console.error('Error fetching marks:', err);
        } finally {
            setLoading(false);
        }
    };

    const selectedCourseData = marksRecords.find(r => r.course === selectedCourse);

    return (
        <div className="container mt-5 text-white" style={{ backgroundColor: 'rgba(0, 19, 32, 0.9)', padding: '2rem', borderRadius: '8px' }}>
            <h3 className="text-center mb-4">My Marks</h3>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    <div className="mb-4">
                        <label className="form-label">Select Course</label>
                        <select
                            className="form-select"
                            value={selectedCourse}
                            onChange={e => setSelectedCourse(e.target.value)}
                            style={{ backgroundColor: '#6c757d', color: 'white' }}
                        >
                            <option value="">-- Select Course --</option>
                            {courses.map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </div>

                    {selectedCourse && selectedCourseData ? (
                        <table className="table table-bordered table-dark text-center align-middle">
                            <thead className="table-secondary text-dark">
                                <tr>
                                    <th>Assessment Title</th>
                                    <th>Total Marks</th>
                                    <th>Weightage (%)</th>
                                    <th>Obtained Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedCourseData.assessments.map((a, i) => (
                                    <tr key={i}>
                                        <td>{a.title}</td>
                                        <td>{a.totalMarks}</td>
                                        <td>{a.weightage}</td>
                                        <td>{a.obtainedMarks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : selectedCourse ? (
                        <p>No marks found for {selectedCourse}</p>
                    ) : null}
                </>
            )}
        </div>
    );
}
