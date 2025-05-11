import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentAttendance() {
  const [studentId, setStudentId] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('studentId');
    if (!id) return;

    setStudentId(id);
    fetchStudentAttendance(id);
  }, []);

  const fetchStudentAttendance = async (id) => {
    try {
      const res = await fetch(`/api/attendance/student-full?id=${id}`);
      const data = await res.json();

      if (res.ok) {
        setAttendanceRecords(data.records);

        const uniqueCourses = [...new Set(data.records.map(r => r.course))];
        setCourses(uniqueCourses);
      } else {
        alert(data.message || 'Error loading attendance');
      }
    } catch (err) {
      console.error('Error fetching student attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = attendanceRecords.filter(r => r.course === selectedCourse);

  return (
    <div className="container mt-5 text-white" style={{ backgroundColor: 'rgba(0, 19, 32, 0.9)', padding: '2rem', borderRadius: '8px' }}>
      <h3 className="text-center mb-4">My Attendance</h3>

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

          {selectedCourse && filteredRecords.length > 0 ? (
            <table className="table table-bordered table-dark text-center align-middle">
              <thead className="table-secondary text-dark">
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((record, index) => (
                    <tr key={index}>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                      <td>{record.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : selectedCourse ? (
            <p>No attendance found for {selectedCourse}</p>
          ) : null}
        </>
      )}
    </div>
  );
}
