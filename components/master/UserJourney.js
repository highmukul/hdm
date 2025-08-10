import { googleSignIn } from '../../context/AuthContext';
import * as FaIcons from 'react-icons/fa';

const UserJourney = () => {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold mb-4">Join as a Customer</h2>
      <p className="mb-6">Start ordering from your favorite local stores today.</p>
      <button 
        onClick={() => googleSignIn()} 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center mx-auto"
      >
        <FaIcons.FaGoogle className="mr-2" /> Sign Up with Google
      </button>
    </div>
  );
};

export default UserJourney;
