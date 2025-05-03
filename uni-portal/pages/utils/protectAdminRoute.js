import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function withAdminProtection(Component) {
    return function ProtectedComponent(props) {
        const router = useRouter();
        useEffect(() => {
            if (typeof window !== 'undefined' && localStorage.getItem('adminLoggedIn') !== 'true') {
                router.push('/admin/login');
            }
        }, []);

        return <Component {...props} />;
    };
}
