import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const SettingsForm = () => {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            const docRef = doc(db, 'settings', 'general');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                reset(docSnap.data());
            }
            setLoading(false);
        };
        fetchSettings();
    }, [reset]);

    const onSubmit = async (data) => {
        try {
            const docRef = doc(db, 'settings', 'general');
            await setDoc(docRef, data, { merge: true });
            toast.success('Settings saved successfully!');
        } catch (error) {
            toast.error('Failed to save settings.');
            console.error(error);
        }
    };

    if (loading) return <p>Loading settings...</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800">Store Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input {...register('storeName')} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                        <input type="email" {...register('contactEmail')} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>
            </div>

            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800">Currency Settings</h3>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Currency Symbol</label>
                    <input {...register('currencySymbol')} defaultValue="$" className="mt-1 block w-full md:w-1/3 shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                    {isSubmitting ? 'Saving...' : 'Save Settings'}
                </button>
            </div>
        </form>
    );
};

export default SettingsForm;
