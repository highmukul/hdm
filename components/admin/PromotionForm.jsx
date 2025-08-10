import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../../firebase/config';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Uploader from '../common/Uploader';

const PromotionForm = ({ promotion, onSave, onCancel }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (promotion) {
            reset({ ...promotion });
            setImageUrl(promotion.imageUrl || '');
        }
    }, [promotion, reset]);

    const handleUploadComplete = (urls) => {
        if (urls.length > 0) {
            setImageUrl(urls[0]);
            setValue('imageUrl', urls[0]);
            toast.success("Image ready to be saved with the promotion.");
        }
    };

    const onSubmit = async (data) => {
        const toastId = toast.loading(promotion ? 'Updating promotion...' : 'Creating promotion...');

        try {
            const promotionData = {
                ...data,
                imageUrl,
                updatedAt: serverTimestamp(),
            };

            if (promotion) {
                await updateDoc(doc(db, 'promotions', promotion.id), promotionData);
            } else {
                promotionData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'promotions'), promotionData);
            }
            
            toast.success(`Promotion ${promotion ? 'updated' : 'created'}!`, { id: toastId });
            onSave();
        } catch (error) {
            toast.error('Failed to save promotion.', { id: toastId });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-6">{promotion ? 'Edit Promotion' : 'Create Promotion'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("title", { required: true })} placeholder="Title" className="input w-full mb-4" />
                    <input {...register("link")} placeholder="Link (e.g., /products/some-product)" className="input w-full mb-4" />
                    
                    <h3 className="font-semibold mb-2">Upload Image</h3>
                    <Uploader onUploadComplete={handleUploadComplete} />

                    {imageUrl && (
                        <div className="mt-4">
                            <img src={imageUrl} alt="Promotion preview" className="w-full h-auto rounded-md" />
                        </div>
                    )}

                    <div className="flex justify-end mt-8">
                        <button type="button" onClick={onCancel} className="btn-secondary mr-4">Cancel</button>
                        <button type="submit" className="btn-primary">Save Promotion</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default PromotionForm;
