import { useForm, Controller } from 'react-hook-form';
import { db } from '../../firebase/config';
import { collection, addDoc, doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const CouponForm = ({ coupon, onSave, onCancel }) => {
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            code: coupon?.code || '',
            discount: coupon?.discount || '',
            expiryDate: coupon?.expiryDate ? new Date(coupon.expiryDate.seconds * 1000).toISOString().split('T')[0] : '',
            isActive: coupon?.isActive ?? true,
        }
    });

    const onSubmit = async (data) => {
        const toastId = toast.loading(coupon ? 'Updating coupon...' : 'Creating coupon...');
        
        try {
            const couponData = {
                ...data,
                discount: Number(data.discount),
                expiryDate: Timestamp.fromDate(new Date(data.expiryDate)),
                updatedAt: serverTimestamp(),
            };

            if (coupon) {
                await updateDoc(doc(db, 'coupons', coupon.id), couponData);
            } else {
                couponData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'coupons'), couponData);
            }

            toast.success(`Coupon ${coupon ? 'updated' : 'created'} successfully!`, { id: toastId });
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
                <h2 className="text-xl font-bold mb-6">{coupon ? 'Edit Coupon' : 'Create New Coupon'}</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Coupon Code</label>
                            <input
                                id="code"
                                type="text"
                                {...register('code', { required: 'Coupon code is required' })}
                                className={`input ${errors.code ? 'border-red-500' : ''}`}
                            />
                            {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
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

                        <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input
                                id="expiryDate"
                                type="date"
                                {...register('expiryDate', { required: 'Expiry date is required' })}
                                className={`input ${errors.expiryDate ? 'border-red-500' : ''}`}
                            />
                            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate.message}</p>}
                        </div>

                        <div className="flex items-center">
                            <Controller
                                name="isActive"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={e => onChange(e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                )}
                            />
                            <label className="ml-2 block text-sm text-gray-900">Active</label>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <button type="button" onClick={onCancel} className="btn-secondary mr-4">Cancel</button>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Coupon'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default CouponForm;
