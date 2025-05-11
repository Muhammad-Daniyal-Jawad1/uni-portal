import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function TranscriptPage() {
    const [transcript, setTranscript] = useState([]);
    const student = {
        id: '21L-3423',
        name: 'Ali Khan',
        email: 'ali.khan@uni.edu',
        gender: 'Male',
        section: 'CS-B'
    };

    useEffect(() => {
        const fetchTranscript = async () => {
            try {
                const response = await axios.post('/api/student/transcript', {
                    studentId: student.id
                });
                setTranscript(response.data.transcript);
            } catch (error) {
                console.error('Error fetching transcript:', error);
            }
        };

        fetchTranscript();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Student Transcript</h2>

            
            <div className="card p-4 mb-5 shadow-sm">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <p className="form-control-plaintext">{student.name}</p>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <p className="form-control-plaintext">{student.email}</p>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Gender</label>
                        <p className="form-control-plaintext">{student.gender}</p>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Section</label>
                        <p className="form-control-plaintext">{student.section}</p>
                    </div>
                </div>
            </div>

            {/* Transcript Table */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-3">Course Transcript</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>Course Code</th>
                                    <th>Course Title</th>
                                    <th>Credit Hours</th>
                                    <th>Grade</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transcript.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.title}</td>
                                        <td>{course.creditHours}</td>
                                        <td>{course.grade}</td>
                                        <td>
                                            <span className={`badge ${course.status === 'Passed' ? 'bg-success' : 'bg-danger'}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
