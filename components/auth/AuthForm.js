import { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AuthForm = ({ view, setView, onLogin, onSignup, onGoogleSignIn, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = view === 'LOGIN';
  const title = isLogin ? 'Welcome Back' : 'Create an Account';
  const buttonText = isLogin ? 'Log In' : 'Sign Up';
  const switchText = isLogin ? "Don't have an account?" : 'Already have an account?';
  const switchActionText = isLogin ? 'Sign Up' : 'Log In';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onSignup(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4">
        <div className="hidden md:block md:w-1/2">
          <img src="/hero-image-blinkit.png" alt="Welcome" className="max-w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
          >
            <h2 className="text-4xl font-bold text-center text-gray-800">{title}</h2>
            <p className="text-center text-gray-500">
              {isLogin ? 'Log in to continue to your account.' : 'Sign up to get started.'}
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark disabled:bg-indigo-300 transition-all duration-300 ease-in-out"
              >
                {loading ? 'Processing...' : buttonText}
              </motion.button>
            </form>

            <div className="text-center text-sm text-gray-500">OR</div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGoogleSignIn}
              className="w-full flex items-center justify-center py-3 px-4 text-sm font-medium rounded-lg border hover:bg-gray-50 transition-all duration-300 ease-in-out"
            >
              <FaGoogle className="w-5 h-5 mr-3" />
              Continue with Google
            </motion.button>

            <p className="text-sm text-center text-gray-600">
              {switchText}{' '}
              <button
                onClick={() => setView(isLogin ? 'SIGNUP' : 'LOGIN')}
                className="font-semibold text-primary hover:text-primary-dark"
              >
                {switchActionText}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;