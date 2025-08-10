import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../../firebase/config';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

const StoreForm = ({ store, onSave, onCancel }) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: store || {},
    });

    useEffect(() => {
        reset(store || {});
    }, [store, reset]);

    const onSubmit = async (data) => {
        const storeData = {
            ...data,
            updatedAt: serverTimestamp(),
        };

        try {
            if (store?.id) {
                await setDoc(doc(db, 'stores', store.id), storeData, { merge: true });
                toast.success('Store updated!');
            } else {
                storeData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'stores'), storeData);
                toast.success('Store created!');
            }
            onSave();
        } catch (error) {
            toast.error('Failed to save store.');
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{store ? 'Edit Store' : 'Create Store'}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input {...register('name', { required: 'Name is required' })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input {...register('address', { required: 'Address is required' })} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Is Open?</label>
                        <input type="checkbox" {...register('isOpen')} className="mt-1 block" />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Save Store</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreForm;
