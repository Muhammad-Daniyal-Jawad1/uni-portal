import { FaHome, FaFileAlt, FaClipboardList, FaCalculator, FaFileSignature, FaKey, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function NavbarSidebarStudent() {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const dropdownRef = useRef(null);

    const navItems = [
        { label: 'Home', icon: <FaHome />, path: '/student/home' },
        { label: 'Course Registration', icon: <FaFileAlt />, path: '/course-registration' },
        { label: 'Attendance', icon: <FaClipboardList />, path: '/student/attendance' },
        { label: 'Marks', icon: <FaCalculator />, path: '/marks' },
        { label: 'Transcript', icon: <FaFileSignature />, path: '/transcript' },
    ];

    const toggleDropdown = () => {
        if (showDropdown) {
            setIsVisible(false);
            setTimeout(() => {
                setShowDropdown(false);
            }, 300); // 0.3s = fade duration
        } else {
            setShowDropdown(true);
            setIsVisible(true);
        }
    };

    const handleChangePassword = () => {
        router.push('/change-password');
        setShowDropdown(false);
    };

    const handleLogout = () => {
        console.log('Logging out...');
        setShowDropdown(false);
    };

    // Handle clicks outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsVisible(false);
                setTimeout(() => {
                    setShowDropdown(false);
                }, 300); // match fade out duration
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div style={{
            width: '130px',
            height: '100vh',
            backgroundColor: 'rgba(0, 19, 32, 0.88)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '1rem 0',
            position: 'relative'
        }}>
            <div style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '130px',
                position: 'relative'
            }}>
                <div
                    style={{
                        width: '90px',
                        height: '90px',
                        borderRadius: '70%',
                        overflow: 'hidden',
                        position: 'relative',
                        padding: '20px',
                        cursor: 'pointer',
                        border: showDropdown ? '2px solid white' : '2px solid transparent',
                        transition: 'border 0.3s ease',
                    }}
                    onClick={toggleDropdown}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.border = '2px solid white';
                    }}
                    onMouseLeave={(e) => {
                        if (!showDropdown) {
                            e.currentTarget.style.border = '2px solid transparent';
                        }
                    }}
                >
                    <Image
                        src="/mypic.jpg"
                        alt="Profile Picture"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                {showDropdown && (
                    <div
                        ref={dropdownRef}
                        style={{
                            position: 'absolute',
                            top: '100px',
                            left: '80px',
                            width: '150px',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            zIndex: 10,
                            transform: 'translateX(-50%)',
                            opacity: 0,
                            animation: `${isVisible ? 'fadeIn' : 'fadeOut'} 0.3s forwards`
                        }}
                    >
                        <div
                            onClick={handleChangePassword}
                            style={{
                                padding: '10px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#333',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee'
                            }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f5f5f5', e.currentTarget.style.borderRadius = '8px')}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <FaKey style={{ marginRight: '18px' }} />
                            <span>Change Password</span>
                        </div>
                        <div
                            onClick={handleLogout}
                            style={{
                                padding: '10px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#333',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f5f5f5', e.currentTarget.style.borderRadius = '8px')}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <FaSignOutAlt style={{ marginRight: '12px' }} />
                            <span>Log Out</span>
                        </div>
                    </div>
                )}
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

            {/* Add the style jsx here */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `}</style>
        </div>
    );
}
