import { useCaptainAuth } from '../../hooks/useCaptainAuth'; // Correct path
import { useRouter } from 'next/router';
import * as FaIcons from 'react-icons/fa';
import Spinner from '../../components/ui/Spinner';
import { useEffect, useState } from 'react';

const CaptainAuthPage = () => {
    const { captain, loading, signInWithGoogle } = useCaptainAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || loading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }

    // If captain profile exists and is approved, redirect to dashboard
    if (captain?.status === 'approved') {
        router.push('/captain/dashboard');
        return null;
    }

    // If captain profile exists but is pending, redirect to pending page
    if (captain?.status === 'pending') {
        router.push('/captain/pending');
        return null;
    }

    // If user is authenticated but has no captain profile, redirect to signup
    if (captain) {
        router.push('/captain/signup');
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="max-w-md w-full text-center p-8 bg-white shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Captain Portal</h1>
                <p className="text-gray-500 mb-6">Login or Sign Up to start earning.</p>
                <button 
                    onClick={signInWithGoogle} 
                    className="w-full flex items-center justify-center py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                    <FaIcons.FaGoogle className="mr-3" /> Continue with Google
                </button>
            </div>
        </div>
    );
};

export default CaptainAuthPage;
