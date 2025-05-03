import { useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#2c2c2c' }}>
      <div className="card p-4 shadow-lg" style={{ minWidth: '350px', backgroundColor: '#3a3a3a', color: 'white' }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label text-white">Username</label>
          <input
            id="username"
            className="form-control bg-dark text-white border-secondary"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password" className="form-label text-white">Password</label>
          <input
            id="password"
            type="password"
            className="form-control bg-dark text-white border-secondary"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="btn btn-light w-100">
          Login
        </button>
      </div>
    </div>
  );
}
