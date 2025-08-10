import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const ProfileForm = () => {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const docRef = doc(db, 'captains', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    reset(docSnap.data());
                }
                setLoading(false);
            };
            fetchProfile();
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        try {
            const docRef = doc(db, 'captains', user.uid);
            await setDoc(docRef, data, { merge: true });
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Failed to update profile.');
            console.error(error);
        }
    };

    if (loading) return <p>Loading profile...</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input {...register('name')} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" {...register('email')} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" disabled />
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                    {isSubmitting ? 'Saving...' : 'Save Profile'}
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
