import { useState } from 'react';
import withAdminProtection from '@/pages/utils/protectAdminRoute';

function CreateInstructor() {
    const [instructorFormData, setInstructorFormData] = useState({
        ID: '',
        Email: '',
        FacultyStatus: '',
        Gender: '',
        Name: '',
        OfficeNo: '',
        Password: '',
        Picture: '',
        Position: '',
        Qualification: '',
        DoB: ''
    });

    const handleSubmit = async () => {
        const res = await fetch('/api/instructor/create', {  // Updated to the correct endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(instructorFormData)  // Use instructorFormData here
        });

        if (res.ok) {
            alert('Instructor created!');
        } else {
            alert('Error creating instructor');
        }
    };

    return (
        <div>
            <h1>Create Instructor</h1>
            {Object.entries(instructorFormData).map(([key, val]) => (  // Use instructorFormData here
                <input
                    key={key}
                    placeholder={key}
                    value={val}
                    onChange={(e) => setInstructorFormData({ ...instructorFormData, [key]: e.target.value })}
                />
            ))}
            <button onClick={handleSubmit}>Create</button>
        </div>
    );
}

export default withAdminProtection(CreateInstructor);