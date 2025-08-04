import { useState } from 'react';
import { FaGoogle, FaMotorcycle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// This component will handle both login and signup for captains via Google
const CaptainAuthPage = () => {
    const { signInWithGoogle } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCaptainGoogleSignIn = async () => {
        setLoading(true);
        try {
            // The role assignment will happen within the AuthContext now
            await signInWithGoogle('captain'); 
            toast.success("Welcome, Captain! Let's get you set up.");
            router.push('/captain/dashboard'); // The dashboard HOC will handle profile completion redirect
        } catch (error) {
            toast.error("Captain sign-in failed. Please try again.");
            console.error("Captain Google Sign-In Error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="w-full max-w-md text-center"
            >
                <FaMotorcycle className="mx-auto text-6xl text-indigo-400 mb-6" />
                <h1 className="text-4xl font-bold mb-3">Captain Portal</h1>
                <p className="text-gray-300 mb-8">Join the Hadoti fleet. Earn on your terms.</p>
                
                <button 
                    onClick={handleCaptainGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center py-4 px-6 bg-white text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-all transform hover:scale-105 disabled:opacity-50"
                >
                    <FaGoogle className="w-5 h-5 mr-4" />
                    {loading ? 'Initializing...' : 'Sign In / Sign Up with Google'}
                </button>
                <p className="text-xs text-gray-500 mt-4">
                    By signing up, you agree to our Partner Terms of Service.
                </p>
            </motion.div>
        </div>
    );
};

export default CaptainAuthPage;
