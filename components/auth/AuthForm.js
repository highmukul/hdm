import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AuthForm = ({ mode, fields, socialButtons }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, login, signInWithGoogle } = useAuth(); // Correctly destructure signInWithGoogle
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            if (mode === 'signup') {
                await signup(data.email, data.password, data.name);
                toast.success('Signed up successfully!');
            } else {
                await login(data.email, data.password);
                toast.success('Logged in successfully!');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            if (provider === 'google') {
                await signInWithGoogle(); // Correctly call signInWithGoogle
            }
        } catch (error) {
            toast.error('Failed to sign in.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {fields.map(field => (
                    <div key={field.name} className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            {field.icon}
                        </span>
                        <input
                            type={field.type === 'password' && showPassword ? 'text' : field.type}
                            {...register(field.name, { required: `${field.placeholder} is required` })}
                            placeholder={field.placeholder}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        {field.type === 'password' && (
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                {showPassword ? <FaIcons.FaEyeSlash /> : <FaIcons.FaEye />}
                            </button>
                        )}
                    </div>
                ))}
                <button type="submit" className="w-full btn-primary py-3">
                    {mode === 'signup' ? 'Create Account' : 'Login'}
                </button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
            </div>

            <div className="space-y-4">
                {socialButtons.map(button => (
                    <button key={button.provider} onClick={() => handleSocialLogin(button.provider)} className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span className="mr-3">{button.icon}</span>
                        {button.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AuthForm;
