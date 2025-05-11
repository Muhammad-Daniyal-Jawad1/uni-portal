import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function StudentCourseRegistration() {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const student = {
        id: '21L-3423',
        name: 'Isfaq Saim',
        email: 'isfaq@uni.edu',
        gender: 'Male',
        section: 'CS-B'
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('/api/courses');
                setCourses(res.data);
                console.log(res.data);
            } catch (err) {
                console.error('Failed to fetch courses', err);
                alert('Error fetching courses');
            }
        };

        fetchCourses();
    }, []);

    const handleEnroll = async (course) => {
        if (!enrolledCourses.includes(course.CourseCode)) {
            try {
                await axios.post('/api/student/course_registration', {
                    studentId: student.id,
                    studentName: student.name,
                    courseId: course.CourseCode,
                    courseTitle: `${course.CourseCode} - ${course.CourseName}`,
                    enrolledAt: new Date().toISOString()
                });
                setEnrolledCourses([...enrolledCourses, course.CourseCode]);
            } catch (error) {
                alert('Enrollment failed.');
                console.error(error);
            }
        }
    };

    return (
        <div
            className="container-fluid py-5"
            style={{
                backgroundImage: 'url("/student.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh'
            }}
        >
            <div className="container bg-white bg-opacity-75 p-4 rounded shadow">
                <h2 className="text-center mb-4">Student Course Registration</h2>

                
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

                
                <h4 className="mb-3">Available Courses</h4>
                <div className="row g-4">
                    {courses.map(course => (
                        <div key={course.CourseCode} className="col-12">
                            <div className="card d-flex flex-row align-items-center justify-content-between p-3 shadow-sm">
                                <div>
                                    <h5 className="mb-1">{course.CourseCode} - {course.CourseName}</h5>
                                    <small className="text-muted">Credit Hours: {course.CreditHours}</small>
                                </div>
                                <button
                                    className={`btn ${enrolledCourses.includes(course.CourseCode) ? 'btn-success' : 'btn-outline-primary'}`}
                                    onClick={() => handleEnroll(course)}
                                    disabled={enrolledCourses.includes(course.CourseCode)}
                                >
                                    {enrolledCourses.includes(course.CourseCode) ? 'Enrolled' : 'Enroll'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
