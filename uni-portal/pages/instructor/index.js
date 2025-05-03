import { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InstructorLogin() {
    const [instructorId, setInstructorId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Initialize router for redirection  

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true); // Show loading state

            // Send login request to MongoDB API
            const response = await fetch('/api/instructor/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ instructorId, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login Successful!');
                localStorage.setItem('instructorId', instructorId); // Store instructor ID in localStorage
                localStorage.setItem('password', password); // Store instructor ID in localStorage
                router.push('/instructor/home'); // Redirect to the instructor dashboard page
            } else {
                alert(data.message || 'Incorrect credentials!'); // Display error message from API
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: '100vh',
                backgroundImage: "url('/instructor.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                className="p-4 border rounded shadow-lg"
                style={{ width: '100%', maxWidth: '400px', backgroundColor: 'rgba(0, 19, 32, 0.88)', color: 'white' }}
            >
                <h2 className="text-center mb-4">UniPortal - Instructor</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="instructorId" className="form-label">
                            Instructor ID
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="instructorId"
                            value={instructorId}
                            onChange={(e) => setInstructorId(e.target.value)}
                            placeholder="12I-3456"
                            required
                            style={{ backgroundColor: '#6c757d', color: 'white' }}
                        />
                        <div className="form-text" style={{ color: '#adb5bd' }}>
                            Enter your instructor ID (XXI-XXXX)
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
                            disabled={loading} // Disable the button while loading
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
                            onClick={() => router.replace('/student')} // Navigate to student login page
                        >
                            Log In As Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
