import { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentLogin() {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Send login request to MongoDB API
            const response = await fetch('/api/student/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login Successful!');
                localStorage.setItem('studentId', studentId);
                localStorage.setItem('password', password);
                router.push('/student/home');
            } else {
                alert(data.message || 'Incorrect credentials!');
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
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
                style={{ width: '100%', maxWidth: '400px', backgroundColor: 'rgba(0, 19, 32, 0.88)', color: 'white' }}
            >
                <h2 className="text-center mb-4">UniPortal - Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="studentId" className="form-label">
                            Student ID
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="studentId"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="12S-3456"
                            required
                            style={{ backgroundColor: '#6c757d', color: 'white' }}
                        />
                        <div className="form-text" style={{ color: '#adb5bd' }}>
                            Enter your student ID (XXS-XXXX)
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ backgroundColor: '#6c757d', color: 'white' }}
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '140px' }}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>

                    <div className="mt-3 text-center">
                        <button
                            type="button"
                            className="btn btn-link"
                            style={{ color: '#adb5bd' }}
                            onClick={() => alert('Redirect to forgot password page')}
                        >
                            Forgot Password?
                        </button>
                        <button
                            type="button"
                            className="btn btn-link"
                            style={{ color: '#adb5bd' }}
                            onClick={() => router.replace('/instructor')}
                        >
                            Log In As Instructor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
