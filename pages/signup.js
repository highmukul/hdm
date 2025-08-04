import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await signup(email, password, name);
      toast.success('Account created! Welcome.');
      router.push('/shop');
    } catch (error) { toast.error(error.message); } 
    finally { setLoading(false); }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle('customer');
      toast.success('Account created! Welcome.');
      router.push('/shop');
    } catch { toast.error('Failed to sign up with Google.'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full bg-card-background rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-text-primary mb-2">Create Your Account</h2>
            <p className="text-center text-text-secondary mb-8">Start your speedy delivery experience.</p>
            <form className="space-y-6" onSubmit={handleSignup}>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Full Name" required/>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="Email address" required/>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="Password" required/>
              <button type="submit" disabled={loading} className="w-full btn-primary text-lg">{loading ? 'Creating Account...' : 'Sign up'}</button>
            </form>
            <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-card-background text-text-secondary">or</span></div></div>
            <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-md border border-border hover:bg-background transition-colors text-text-primary"><FaGoogle className="w-5 h-5 mr-3 text-red-500" />Continue with Google</button>
            <p className="text-sm text-center text-text-secondary mt-8">Already have an account?{' '}<Link href="/login"><a className="font-medium text-primary hover:text-primary-hover">Sign in</a></Link></p>
        </div>
        <div className="bg-background p-6 text-center">
            <p className="font-semibold text-text-primary">Want to earn on your schedule?</p>
            <Link href="/captain/auth"><a className="text-sm text-primary hover:text-primary-hover font-medium">Become a Delivery Captain →</a></Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
