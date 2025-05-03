import { useRouter } from 'next/router';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const router = useRouter();

    const handleStudentLogin = () => {
        router.push('/student');
    };

    const handleInstructorLogin = () => {
        router.push('/instructor');
    };

    const handleAdminLogin = () => {
      router.push('/admin');
  };

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#343a40' }}>
            <div className="position-relative d-flex justify-content-center align-items-center" style={{ width: '50%', overflow: 'hidden' }}>
                <Image
                    src="/13974.jpg"
                    alt="Background Texture"
                    layout="fill"
                    objectFit="cover"
                    style={{ opacity: 0.4 }} 
                />
                <div className="p-4 border rounded shadow-lg text-center" style={{ width: '100%', maxWidth: '400px', backgroundColor: 'rgba(0, 19, 32, 0.77)', color: 'white', zIndex: 1 }}>
                    <h2 className="mb-4">Welcome to UniPortal</h2>
                    <button
                        type="button"
                        className="btn btn-primary w-100 mb-3"
                        onClick={handleStudentLogin}
                    >
                        Log in as Student
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary w-100 mb-3"
                        onClick={handleInstructorLogin}
                    >
                        Log in as Instructor
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={handleAdminLogin}
                    >
                        Log in as Admin
                    </button>
                </div>
            </div>
            <div style={{ width: '50%', position: 'relative', opacity: '80%' }}>
                <Image
                    src="/unipic.jpg" 
                    alt="University"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
    );
}