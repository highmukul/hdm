import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { db, storage } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiPhone, FiUpload } from 'react-icons/fi';

export const AuthForm = ({ role }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        vehicleType: 'scooter',
        license: null,
        rc: null,
    });
    const { login, signup } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                toast.success('Logged in successfully!');
                router.push(role === 'customer' ? '/customer/home' : '/captain/home');
            } else {
                const { user } = await signup(formData.email, formData.password, formData.name);
                let additionalData = { role };

                if (role === 'captain') {
                    const licenseUrl = await uploadFile(formData.license, `captain-docs/${user.uid}/license`);
                    const rcUrl = await uploadFile(formData.rc, `captain-docs/${user.uid}/rc`);
                    additionalData = { ...additionalData, vehicleType: formData.vehicleType, licenseUrl, rcUrl };
                }

                await setDoc(doc(db, 'users', user.uid), {
                    ...additionalData,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                });

                toast.success('Account created successfully!');
                router.push(role === 'customer' ? '/customer/home' : '/captain/home');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const uploadFile = async (file, path) => {
        if (!file) return null;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'} as a {role}</h2>

            <InputField icon={<FiMail />} type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <InputField icon={<FiLock />} type="password" name="password" placeholder="Password" onChange={handleChange} required />

            {!isLogin && (
                <>
                    <InputField icon={<FiUser />} type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                    <InputField icon={<FiPhone />} type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                </>
            )}

            {!isLogin && role === 'captain' && (
                <>
                    <select name="vehicleType" onChange={handleChange} className="w-full p-3 border rounded-lg">
                        <option value="scooter">Scooter</option>
                        <option value="bike">Motorcycle</option>
                    </select>
                    <FileInput label="Driver's License" name="license" onChange={handleChange} required />
                    <FileInput label="Vehicle RC" name="rc" onChange={handleChange} required />
                </>
            )}

            <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>

            <p className="text-center text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-600 font-semibold">
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>
        </form>
    );
};

const InputField = ({ icon, ...props }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</span>
        <input {...props} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
);

const FileInput = ({ label, ...props }) => (
    <div className="relative border border-gray-300 rounded-lg p-3 flex items-center">
        <FiUpload className="text-gray-400 mr-2" />
        <span className="text-gray-700">{label}</span>
        <input type="file" {...props} className="absolute inset-0 opacity-0 cursor-pointer" />
    </div>
);
