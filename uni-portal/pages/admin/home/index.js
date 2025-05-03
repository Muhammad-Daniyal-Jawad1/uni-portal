import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminHome() {
  const router = useRouter();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-white"
      style={{ backgroundColor: '#2c2c2c' }}
    >
      <h1 className="mb-5">Admin Dashboard</h1>

      <div className="d-flex flex-column gap-3">
        <button
          onClick={() => router.push('/admin/createStudent')}
          className="btn btn-success btn-lg"
        >
          Create Student
        </button>

        <button
          onClick={() => router.push('/admin/createInstructor')}
          className="btn btn-primary btn-lg"
        >
          Create Instructor
        </button>
      </div>
    </div>
  );
}
