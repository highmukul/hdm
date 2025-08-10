import { useState } from 'react';
import AuthForm from '../../components/auth/AuthForm';

const AuthPage = () => {
    const [role, setRole] = useState('customer'); // 'customer' or 'captain'

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
                <div className="flex justify-center mb-8">
                    <div className="flex bg-gray-200 rounded-full p-1">
                        <button
                            onClick={() => setRole('customer')}
                            className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${role === 'customer' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                        >
                            Customer
                        </button>
                        <button
                            onClick={() => setRole('captain')}
                            className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${role === 'captain' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                        >
                            Captain
                        </button>
                    </div>
                </div>
                <AuthForm role={role} />
            </div>
        </div>
    );
};

export default AuthPage;
