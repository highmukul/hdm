import { useForm } from 'react-hook-form';
import { db } from '../../firebase/config';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const PromotionForm = ({ promotion, onSave, onCancel }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: promotion?.title || '',
            description: promotion?.description || '',
            discount: promotion?.discount || '',
        }
    });

    const onSubmit = async (data) => {
        const toastId = toast.loading(promotion ? 'Updating promotion...' : 'Creating promotion...');
        
        try {
            const promotionData = {
                ...data,
                discount: Number(data.discount),
                updatedAt: serverTimestamp(),
            };

            if (promotion) {
                await updateDoc(doc(db, 'promotions', promotion.id), promotionData);
            } else {
                promotionData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'promotions'), promotionData);
            }

            toast.success(`Promotion ${promotion ? 'updated' : 'created'} successfully!`, { id: toastId });
            onSave();
        } catch (error) {
            toast.error(`Error: ${error.message}`, { id: toastId });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-6">{promotion ? 'Edit Promotion' : 'Create New Promotion'}</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                id="title"
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                className={`input ${errors.title ? 'border-red-500' : ''}`}
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                {...register('description', { required: 'Description is required' })}
                                className={`input w-full h-24 ${errors.description ? 'border-red-500' : ''}`}
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
                            <input
                                id="discount"
                                type="number"
                                {...register('discount', { required: 'Discount is required', min: { value: 1, message: 'Discount must be positive' } })}
                                className={`input ${errors.discount ? 'border-red-500' : ''}`}
                            />
                            {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <button type="button" onClick={onCancel} className="btn-secondary mr-4">Cancel</button>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Promotion'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default PromotionForm;
