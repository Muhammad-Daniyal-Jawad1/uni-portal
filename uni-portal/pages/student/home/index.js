import { useState, useEffect } from 'react';
import NavbarSidebarStudent from "@/components/SidebarStudent";
import 'bootstrap/dist/css/bootstrap.min.css';

function calculateAge(dobString) {
    const [day, month, year] = dobString.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function InfoField({ label, value }) {
    return (
        <div style={{
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#f7fafc',
            border: '1px solid #e2e8f0'
        }}>
            <div style={{ fontWeight: 'bold', color: '#4a5568', marginBottom: '5px' }}>{label}:</div>
            <div>{value || 'N/A'}</div>
        </div>
    );
}

export default function StudentHome() {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            const studentId = localStorage.getItem('studentId');
            const password = localStorage.getItem('password');

            if (!studentId || !password) {
                console.error('Student ID or password not found in localStorage.');
                return;
            }

            try {
                const res = await fetch('/api/student/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ studentId, password })
                });

                const data = await res.json();
                console.log("Fetched student data:", data);

                if (res.ok) {
                    setStudentData(data);
                } else {
                    alert(data.message || 'Failed to fetch student data');
                }
            } catch (err) {
                console.error('Error:', err);
                alert('Something went wrong while fetching student data');
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
            <div style={{ width: '130px', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 10 }}>
                <NavbarSidebarStudent />
            </div>

            <div style={{
                marginLeft: '130px',
                flex: 1,
                height: '100vh',
                overflowY: 'auto',
                backgroundColor: '#f5f5f5',
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: '#2c5282',
                    color: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{ margin: 0 }}>Student Dashboard</h1>
                    <div>Hello, {studentData?.name || 'Student'}</div>
                </div>

                {loading ? (
                    <div>Loading student information...</div>
                ) : (
                    <div style={{ marginBottom: '20px' }}>
                        {/* Personal Info */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{
                                backgroundColor: '#4a5568',
                                color: 'white',
                                padding: '15px',
                                borderRadius: '8px 8px 0 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <h3 style={{ margin: 0 }}>Personal Information</h3>
                            </div>

                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <InfoField label="Name" value={studentData?.name} />
                                    <InfoField label="Student ID" value={studentData?.studentId} />
                                    <InfoField label="Age" value={studentData?.['dob'] ? calculateAge(studentData['dob']) : "N/A"} />
                                    <InfoField label="Gender" value={studentData?.gender} />
                                    <InfoField label="Email" value={studentData?.email} />
                                    <InfoField label="Date of Birth" value={studentData?.['dob']} />
                                </div>
                            </div>
                        </div>

                        {/* Academic Info */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{
                                backgroundColor: '#4a5568',
                                color: 'white',
                                padding: '15px',
                                borderRadius: '8px 8px 0 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <h3 style={{ margin: 0 }}>Academic Information</h3>
                            </div>

                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <InfoField label="Batch" value={studentData?.batch} />
                                    <InfoField label="Discipline" value={studentData?.discipline} />
                                    <InfoField label="Section" value={studentData?.section} />
                                    <InfoField label="Status" value={studentData?.status} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
