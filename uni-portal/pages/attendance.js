import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const courses = [
  'Programming Fundamentals',
  'Calculus I',
  'Pak Studies',
  'Applied Physics',
  'Islamiyat'
];

const students = [
  { id: '23S-1234', name: 'Bilal Arshad' },
  { id: '23S-5678', name: 'Ayesha Ahmed' }
];

export default function AttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchedAttendance, setFetchedAttendance] = useState(null);

  const handleToggle = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = async () => {
    if (!selectedCourse || !selectedDate) {
      alert('Please select both course and date');
      return;
    }

    const studentStatuses = students.map(student => ({
      studentId: student.id,
      status: attendance[student.id] || 'Absent'
    }));

    try {
      const response = await fetch('/api/attendance/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course: selectedCourse,
          date: selectedDate,
          students: studentStatuses
        })
      });

      if (response.ok) {
        alert('Attendance submitted successfully!');
      } else {
        const err = await response.json();
        alert(err.message || 'Failed to submit');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  const handleFetch = async () => {
    if (!selectedCourse || !selectedDate) {
      alert('Select course and date first.');
      return;
    }
    try {
      const res = await fetch(`/api/attendance/get?course=${encodeURIComponent(selectedCourse)}&date=${selectedDate}`);
      const data = await res.json();

      if (res.ok) {
        setFetchedAttendance(data.data);
      } else {
        alert(data.message || 'No record found');
        setFetchedAttendance(null);
      }
    } catch (err) {
      alert('Error fetching attendance');
      console.error(err);
      setFetchedAttendance(null);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/student.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="p-4 border rounded shadow-lg"
        style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'rgba(0, 19, 32, 0.9)',
          color: 'white'
        }}
      >
        <h2 className="text-center mb-4">Attendance Panel</h2>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label className="form-label">Course</label>
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

          <div className="col-md-6 mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              style={{ backgroundColor: '#6c757d', color: 'white' }}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-dark text-center align-middle">
            <thead className="table-secondary text-dark">
              <tr>
                <th>Student</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td className="text-start">{student.name}</td>
                  <td>
                    <input
                      type="radio"
                      name={student.id}
                      checked={attendance[student.id] === 'Present'}
                      onChange={() => handleToggle(student.id, 'Present')}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={student.id}
                      checked={attendance[student.id] === 'Absent'}
                      onChange={() => handleToggle(student.id, 'Absent')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '200px' }}
          >
            {loading ? 'Submitting...' : 'Submit Attendance'}
          </button>
        </div>

        <hr className="my-4" />

        <div className="mt-4 p-3 rounded" style={{ backgroundColor: '#1c1c1c' }}>
          <h4 className="text-center mb-3">View Submitted Attendance</h4>

          <div className="text-center mb-3">
            <button
              className="btn btn-outline-light"
              onClick={handleFetch}
            >
              View Attendance
            </button>
          </div>

          {fetchedAttendance && (
            <div className="mt-3">
              <h5 className="text-center mb-3">
                Attendance for {fetchedAttendance.course} on{' '}
                {new Date(fetchedAttendance.date).toLocaleDateString()}
              </h5>
              <table className="table table-bordered table-dark text-center align-middle">
                <thead className="table-secondary text-dark">
                  <tr>
                    <th>Student ID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchedAttendance.students.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.studentId}</td>
                      <td>{entry.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
