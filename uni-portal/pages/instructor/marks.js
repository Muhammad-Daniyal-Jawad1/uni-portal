import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MarksPage({ courses = [], students = [] }) {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [marksData, setMarksData] = useState({});
  const [newAssessment, setNewAssessment] = useState({
    title: '',
    total: '',
    weight: ''
  });
  const [assessments, setAssessments] = useState([]);

  const handleAddAssessment = () => {
    const { title, total, weight } = newAssessment;
    if (!title || !total || !weight) {
      alert('Please fill in all assessment fields');
      return;
    }

    const newEntry = {
      title,
      total,
      weight,
      obtainedByStudent: {}
    };

    students.forEach(student => {
      newEntry.obtainedByStudent[student.id] = 0;
    });

    setAssessments(prev => [...prev, newEntry]);
    setNewAssessment({ title: '', total: '', weight: '' });
  };

  const handleObtainedChange = (studentId, assessmentIndex, value) => {
    const updatedAssessments = [...assessments];
    updatedAssessments[assessmentIndex].obtainedByStudent[studentId] = Number(value);
    setAssessments(updatedAssessments);
  };

  const handleSubmit = async () => {
    if (!selectedCourse) {
      alert('Please select a course');
      return;
    }

    for (const assessment of assessments) {
      const payload = {
        course: selectedCourse,
        title: assessment.title,
        type: 'manual',
        totalMarks: assessment.total,
        weightage: assessment.weight,
        students: students.map(student => ({
          studentId: student.id,
          obtainedMarks: assessment.obtainedByStudent[student.id] || 0
        }))
      };

      try {
        const res = await fetch('/api/marks/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.message || 'Submission failed');
          return;
        }
      } catch (error) {
        console.error(error);
        alert('Server error while submitting marks');
        return;
      }
    }

    alert('All assessments submitted successfully!');
    setAssessments([]);
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
          maxWidth: '1000px',
          backgroundColor: 'rgba(0, 19, 32, 0.9)',
          color: 'white'
        }}
      >
        <h2 className="text-center mb-4">Marks Entry Panel</h2>

        <div className="mb-4">
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

        <div className="mb-4 p-3 border rounded bg-secondary">
          <h5 className="text-white mb-3">Add New Assessment</h5>
          <div className="row g-2">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Title"
                value={newAssessment.title}
                onChange={e => setNewAssessment({ ...newAssessment, title: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Total Marks"
                value={newAssessment.total}
                onChange={e => setNewAssessment({ ...newAssessment, total: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Weightage (%)"
                value={newAssessment.weight}
                onChange={e => setNewAssessment({ ...newAssessment, weight: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-light w-100" onClick={handleAddAssessment}>
                + Add
              </button>
            </div>
          </div>
        </div>

        {assessments.map((assessment, index) => (
          <div key={index} className="mb-4">
            <h5 className="text-info">Assessment {index + 1}: {assessment.title}</h5>
            {students.map(student => (
              <div className="row mb-2" key={student.id}>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    value={student.name}
                    disabled
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    value={assessment.total}
                    disabled
                  />
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    value={assessment.weight}
                    disabled
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Obtained Marks"
                    value={assessment.obtainedByStudent[student.id]}
                    onChange={e => handleObtainedChange(student.id, index, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="text-center">
          <button className="btn btn-primary mt-4" onClick={handleSubmit}>
            Submit Marks
          </button>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps() {
  const courses = [
    'Programming Fundamentals',
    'Calculus I',
    'Pak Studies',
    'Applied Physics',
    'Islamiyat'
  ];

  const students = [
    { id: '23S-1234', name: 'Bilal Arshad' },
    { id: '23S-5678', name: 'Ayesha Ahmed' },
    { id: '22S-5368', name: 'Hamza Amer' }
  ];

  return {
    props: {
      courses,
      students
    }
  };
}
