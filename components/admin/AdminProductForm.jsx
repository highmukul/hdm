import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { db } from '../../firebase/config';
import { collection, addDoc, doc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Uploader from '../common/Uploader';

const AdminProductForm = ({ product, onSave, onCancel }) => {
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            mrp: 0,
            stock: 0,
            category: '',
            imageUrls: [],
        }
    });
    const [imageUrls, setImageUrls] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (product) {
            reset({ ...product });
            setImageUrls(product.imageUrls || []);
        }
    }, [product, reset]);

    const handleUploadComplete = (urls) => {
        const newImageUrls = [...imageUrls, ...urls];
        setImageUrls(newImageUrls);
        setValue('imageUrls', newImageUrls);
        toast.success("Images ready to be saved with the product.");
    };

    const onSubmit = async (data) => {
        const toastId = toast.loading(product ? 'Updating product...' : 'Creating product...');

        try {
            const productData = {
                ...data,
                imageUrls,
                updatedAt: serverTimestamp(),
            };

            if (product) {
                await updateDoc(doc(db, 'products', product.id), productData);
            } else {
                productData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'products'), productData);
            }
            
            toast.success(`Product ${product ? 'updated' : 'created'}!`, { id: toastId });
            onSave();
        } catch (error) {
            toast.error('Failed to save product.', { id: toastId });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
                <h2 className="text-xl font-bold mb-6">{product ? 'Edit Product' : 'Create Product'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input {...register("name", { required: true })} placeholder="Name" className="input" />
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <select {...field} className="input">
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            )}
                        />
                        <input type="number" {...register("price", { required: true, valueAsNumber: true })} placeholder="Price" className="input" />
                        <input type="number" {...register("mrp", { required: true, valueAsNumber: true })} placeholder="MRP" className="input" />
                        <input type="number" {...register("stock", { required: true, valueAsNumber: true })} placeholder="Stock" className="input" />
                    </div>
                    <textarea {...register("description")} placeholder="Description" className="input mt-6 w-full h-24" />
                    
                    <h3 className="font-semibold mt-6 mb-2">Upload Images</h3>
                    <Uploader onUploadComplete={handleUploadComplete} />

                    {imageUrls.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {imageUrls.map((url, index) => (
                                <div key={index} className="relative aspect-square">
                                    <img src={url} alt={`Product image ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-end mt-8">
                        <button type="button" onClick={onCancel} className="btn-secondary mr-4">Cancel</button>
                        <button type="submit" className="btn-primary">Save Product</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default AdminProductForm;
