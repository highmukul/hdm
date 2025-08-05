import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      // Toast and redirect are now handled in AuthContext
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle('customer');
      // Toast and redirect are now handled in AuthContext
    } catch {
      toast.error('Failed to sign in with Google.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-8">Sign in to continue to your account.</p>
          
          <form className="space-y-5" onSubmit={handleLogin}>
            <InputField icon={<FiMail/>} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
            <InputField icon={<FiLock/>} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit" disabled={loading} className="w-full py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">OR</span></div>
          </div>
          
          <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center py-3 px-4 text-sm font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            <FaGoogle className="w-5 h-5 mr-3 text-red-500" />
            Sign in with Google
          </button>
        </div>
        
        <div className="bg-gray-50 p-6 text-center border-t">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup"><a className="font-semibold text-blue-600 hover:text-blue-700">Sign up</a></Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const InputField = ({ icon, ...props }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</span>
        <input {...props} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
);

export default LoginPage;
