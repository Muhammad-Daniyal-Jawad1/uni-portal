import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InstructorCourseRegistration() {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const instructor = {
        id: 'INS001',
        name: 'Dr. Ahmed',
        email: 'ahmed@uni.edu',
        gender: 'Male',
        position: 'Assistant Professor'
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('/api/courses');
                setCourses(res.data);
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
                await axios.post('/api/instructor/course_registration', {
                    instructorId: instructor.id,
                    instructorName: instructor.name,
                    courseCode: course.CourseCode,
                });

                setEnrolledCourses([...enrolledCourses, course.CourseCode]);
            } catch (error) {
                console.error(error);
                alert('Enrollment failed');
            }
        }
    };

    return (
        <div
            className="container-fluid py-5"
            style={{
                backgroundImage: 'url("/instructor.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh'
            }}
        >
            <div className="container bg-white bg-opacity-75 p-4 rounded shadow">
                <h2 className="text-center mb-4">Instructor Course Registration</h2>

                
                <div className="card p-4 mb-5 shadow-sm">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <p className="form-control-plaintext">{instructor.name}</p>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <p className="form-control-plaintext">{instructor.email}</p>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Gender</label>
                            <p className="form-control-plaintext">{instructor.gender}</p>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Position</label>
                            <p className="form-control-plaintext">{instructor.position}</p>
                        </div>
                    </div>
                </div>

                {/* Courses List */}
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
