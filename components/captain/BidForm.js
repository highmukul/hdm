import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../../firebase/config';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const BidForm = ({ order, onClose }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { user } = useAuth();

    const onSubmit = async (data) => {
        const bidData = {
            ...data,
            orderId: order.id,
            captainId: user.uid,
            status: 'pending',
            createdAt: serverTimestamp(),
        };

        try {
            await addDoc(collection(db, 'bids'), bidData);
            toast.success('Bid placed successfully!');
            onClose();
        } catch (error) {
            toast.error('Failed to place bid.');
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-8">
            <h3 className="text-lg font-semibold mb-4">Place Bid</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Bid Amount (₹)</label>
                    <input type="number" {...register('amount', { required: 'Amount is required', valueAsNumber: true })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Place Bid</button>
                </div>
            </form>
        </div>
    );
};

export default BidForm;
