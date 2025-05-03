import { useState } from 'react';
import withAdminProtection from '@/pages/utils/protectAdminRoute';

function CreateStudent() {
    const [studentFormData, setStudentFormData] = useState({
        ID: '',
        Batch: '',
        Discipline: '',
        Email: '',
        Gender: '',
        Name: '',
        Password: '',
        Picture: '',
        Section: '',
        Status: '',
        DoB: ''
    });

    const handleSubmit = async () => {
        const res = await fetch('/api/student/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentFormData)  // Use studentFormData here
        });

        
        if (res.ok) {
            alert('Student created!');
        } else {
            alert('Error creating student');
        }
    };

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-white"
            style={{ backgroundColor: '#2c2c2c' }}
        >
            <h1 className="mb-5 mt-5">Create Student</h1>
            <div className="w-50">
                <form>
                    {Object.entries(studentFormData).map(([key, val]) => (
                        <div key={key} className="mb-3">
                            <label htmlFor={key} className="form-label">{key}</label>
                            <input
                                id={key}
                                name={key}
                                type="text"
                                className="form-control"
                                placeholder={key}
                                value={val}
                                onChange={(e) => setStudentFormData({ ...studentFormData, [key]: e.target.value })}
                            />
                        </div>
                    ))}
                    <div className="text-center mt-5 mb-5">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-success btn-lg"
                        >
                            Create Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withAdminProtection(CreateStudent);