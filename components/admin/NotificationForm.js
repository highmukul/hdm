import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { getFunctions, httpsCallable } from 'firebase/functions';

const NotificationForm = () => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const [target, setTarget] = useState('all');

    const onSubmit = async (data) => {
        const functions = getFunctions();
        const sendPushNotification = httpsCallable(functions, 'sendPushNotification');

        try {
            await sendPushNotification({ ...data, target });
            toast.success('Push notification sent successfully!');
        } catch (error) {
            toast.error('Failed to send push notification.');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800">Notification Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input {...register('title', { required: true })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Body</label>
                        <input {...register('body', { required: true })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Target</label>
                    <select value={target} onChange={(e) => setTarget(e.target.value)} className="mt-1 block w-full md:w-1/3 shadow-sm sm:text-sm border-gray-300 rounded-md">
                        <option value="all">All Users</option>
                        <option value="customers">Customers</option>
                        <option value="captains">Captains</option>
                    </select>
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                    {isSubmitting ? 'Sending...' : 'Send Notification'}
                </button>
            </div>
        </form>
    );
};

export default NotificationForm;
