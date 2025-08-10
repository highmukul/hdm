import AuthForm from "../components/auth/AuthForm"
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';


const SignupPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Create an Account</h1>
                    <p className="text-lg text-gray-500">Join us and start shopping!</p>
                </div>
                <AuthForm 
                    mode="signup" 
                    fields={[
                        { name: 'name', type: 'text', placeholder: 'Full Name', icon: <FiIcons.FiUser /> },
                        { name: 'email', type: 'email', placeholder: 'Email Address', icon: <FiIcons.FiMail /> },
                        { name: 'password', type: 'password', placeholder: 'Password', icon: <FiIcons.FiLock /> }
                    ]}
                    socialButtons={[
                        { provider: 'google', label: 'Sign up with Google', icon: <FaIcons.FaGoogle /> }
                    ]}
                />
            </div>
        </div>
    )
}

export default SignupPage
