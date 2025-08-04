import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';
import Image from 'next/image';

const CaptainAuthPage = () => {
    const { signInWithGoogle } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCaptainGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithGoogle('captain');
            toast.success("Successfully signed in!");
            // The withCaptainProfile HOC on the dashboard will handle redirection
            // to signup if the profile is incomplete.
            router.push('/captain/dashboard');
        } catch (error) {
            toast.error("Sign-in failed. Please try again.");
            console.error("Captain Google Sign-In Error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left side: Image and branding */}
            <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image src="/delivery-partner.svg" alt="Delivery Partner" width={400} height={400} />
                    <h1 className="text-4xl font-bold mt-8">Join Our Delivery Team</h1>
                    <p className="mt-4 text-blue-200 max-w-sm mx-auto">
                        Be your own boss. Earn flexibly and get paid weekly.
                    </p>
                </motion.div>
            </div>

            {/* Right side: Auth form */}
            <div className="flex flex-col items-center justify-center bg-white p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-sm text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Captain Portal</h2>
                    <p className="text-gray-500 mb-10">Sign in to start your journey.</p>
                    
                    <button
                        onClick={handleCaptainGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all disabled:opacity-60"
                    >
                        <FaGoogle className="mr-3" />
                        {loading ? 'Redirecting...' : 'Sign In with Google'}
                    </button>
                    
                    <p className="text-xs text-gray-400 mt-8">
                        By continuing, you agree to our Partner Terms of Service and Privacy Policy.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default CaptainAuthPage;
