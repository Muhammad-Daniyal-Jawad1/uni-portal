import { useState, useEffect } from 'react';
import NavbarSidebarInstructor from "@/components/SidebarInstructor";
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

export default function InstructorHome() {
    const [instructorData, setInstructorData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructorData = async () => {
            const instructorId = localStorage.getItem('instructorId');
            const password = localStorage.getItem('password');

            if (!instructorId || !password) {
                console.error('Instructor ID or password not found in localStorage.');
                return;
            }

            try {
                const res = await fetch('/api/instructor/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ instructorId, password }) 
                });

                try {
                    const res = await fetch('/api/instructor/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ instructorId, password })
                    });

                    const data = await res.json(); 
                    console.log("Fetched instructor data:", data);

                    if (res.ok) {
                        setInstructorData(data);
                    } else {
                        alert(data.message || 'Failed to fetch instructor data');
                    }
                } catch (err) {
                    console.error('Error:', err);
                    alert('Something went wrong while fetching instructor data');
                }

            } catch (err) {
                console.error('Error:', err);
                alert('Something went wrong while fetching instructor data');
            } finally {
                setLoading(false); 
            }
        };

        fetchInstructorData();
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
            <div style={{ width: '130px', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 10 }}>
                <NavbarSidebarInstructor />
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
                    <h1 style={{ margin: 0 }}>Instructor Dashboard</h1>
                    <div>Hello, {instructorData?.name || 'Instructor'}</div>
                </div>

                {loading ? (
                    <div>Loading instructor information...</div>
                ) : (
                    <div style={{ marginBottom: '20px' }}>
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
                                    <InfoField label="Name" value={instructorData?.name} />
                                    <InfoField label="Instructor ID" value={instructorData?.instructorId} />
                                    <InfoField label="Age" value={instructorData?.dob ? calculateAge(instructorData.dob) : 'N/A'} />
                                    <InfoField label="Gender" value={instructorData?.gender} />
                                    <InfoField label="Email" value={instructorData?.email} />
                                    <InfoField label="Date of Birth" value={instructorData?.dob} />
                                </div>
                            </div>
                        </div>

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
                                <h3 style={{ margin: 0 }}>Professional Information</h3>
                            </div>

                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    <InfoField label="Qualification" value={instructorData?.qualification} />
                                    <InfoField label="Position" value={instructorData?.position} />
                                    <InfoField label="Faculty Status" value={instructorData?.facultyStatus} />
                                    <InfoField label="Office No." value={instructorData?.officeNo} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
