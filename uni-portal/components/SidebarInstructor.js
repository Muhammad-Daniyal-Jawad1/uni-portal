import { FaHome, FaFileAlt, FaClipboardList, FaCalculator, FaFileSignature } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function NavbarSidebarInstructor() {
    const router = useRouter();

    const navItems = [
        { label: 'Home', icon: <FaHome />, path: '/home' },
        { label: 'Allocated Courses', icon: <FaFileAlt />, path: '/course-registration' },
        { label: 'Attendance', icon: <FaClipboardList />, path: '/instructor/attendance' },
        { label: 'Marks', icon: <FaCalculator />, path: '/marks' },
        { label: 'Grades', icon: <FaFileSignature />, path: '/transcript' },
    ];

    return (
        <div style={{
            width: '130px',
            height: '100vh',
            backgroundColor: 'rgba(0, 19, 32, 0.88)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '1rem 0'
        }}>

            <div style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '130px',  
            }}>
                <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <Image
                        src="/mypic.jpg"
                        alt="Profile Picture"
                        layout="fill"
                        objectFit="cover" 
                    />
                </div>
            </div>


            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => router.push(item.path)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            width: '100%',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#212529'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <span style={{ fontSize: '24px', marginBottom: '2px' }}>{item.icon}</span>
                        <span style={{ fontSize: '14px', textAlign: 'center' }}>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}