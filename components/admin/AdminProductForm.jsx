import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { db } from '../../firebase/config';
import { collection, addDoc, doc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Uploader from '../common/Uploader';

const InputField = ({ label, name, register, errors, type = 'text', required = true, placeholder, helperText }) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input 
            id={name}
            type={type} 
            {...register(name, { required, valueAsNumber: type === 'number' })} 
            placeholder={placeholder}
            className={`input ${errors[name] ? 'border-red-500' : ''}`} 
        />
        {errors[name] && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
        {helperText && <p className="text-gray-500 text-xs mt-1">{helperText}</p>}
    </div>
);

const AdminProductForm = ({ product, onSave, onCancel }) => {
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: product || {
            name: '',
            description: '',
            salePrice: 0,
            mrp: 0,
            stock: 0,
            category: '',
            imageUrls: [],
        }
    });
    const [imageUrls, setImageUrls] = useState(product?.imageUrls || []);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (product) {
            reset(product);
            setImageUrls(product.imageUrls || []);
        } else {
            reset({
                name: '',
                description: '',
                salePrice: 0,
                mrp: 0,
                stock: 0,
                category: '',
                imageUrls: [],
            });
            setImageUrls([]);
        }
    }, [product, reset]);

    const handleUploadComplete = (urls) => {
        const newImageUrls = [...imageUrls, ...urls];
        setImageUrls(newImageUrls);
        setValue('imageUrls', newImageUrls, { shouldValidate: true });
        toast.success("Images uploaded. Save the product to apply changes.");
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
            console.error(error);
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
                <h2 className="text-xl font-bold mb-6">{product ? 'Edit Product' : 'Create New Product'}</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Product Name" name="name" register={register} errors={errors} placeholder="e.g., Organic Bananas"/>
                        
                        <div className="flex flex-col">
                            <label htmlFor="category" className="mb-1 text-sm font-medium text-gray-700">Category</label>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <select {...field} id="category" className={`input ${errors.category ? 'border-red-500' : ''}`}>
                                        <option value="">Select Category</option>
                                        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                                    </select>
                                )}
                            />
                            {errors.category && <p className="text-red-500 text-xs mt-1">Please select a category.</p>}
                        </div>

                        <InputField label="MRP (₹)" name="mrp" type="number" register={register} errors={errors} placeholder="e.g., 100" helperText="Maximum Retail Price (MRP) of the product."/>
                        <InputField label="Sale Price (₹)" name="salePrice" type="number" register={register} errors={errors} placeholder="e.g., 80" helperText="The price at which the product will be sold."/>
                        <InputField label="Stock" name="stock" type="number" register={register} errors={errors} placeholder="e.g., 50" helperText="Available quantity of the product."/>
                    </div>
                    
                    <div className="mt-6">
                        <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" {...register("description")} placeholder="e.g., Fresh, directly from the farm." className="input w-full h-24" />
                    </div>
                    
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2 text-sm text-gray-700">Product Images</h3>
                        <Uploader onUploadComplete={handleUploadComplete} />
                        {errors.imageUrls && <p className="text-red-500 text-xs mt-1">At least one image is required.</p>}
                    </div>

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
