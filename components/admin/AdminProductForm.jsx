import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import DiscountRulesEditor from './DiscountRulesEditor'; // Import the new component

const AdminProductForm = ({ product, storeId, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        mrp: '',
        stock: '',
        category: '',
        tags: [],
        platformFeePercent: 0,
        discountRules: [],
        crossSellIds: [],
        bundleIds: [],
        images: [],
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            setImageFiles(Array.from(e.target.files));
        }
    };

    const handleDiscountChange = (rules) => {
        setFormData(prev => ({ ...prev, discountRules: rules }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const imageUrls = await Promise.all(
                imageFiles.map(async (file) => {
                    const storageRef = ref(storage, `products/${storeId}/${Date.now()}_${file.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);
                    await uploadTask;
                    return getDownloadURL(uploadTask.snapshot.ref);
                })
            );

            const productData = { ...formData, images: [...formData.images, ...imageUrls] };

            if (product) {
                await updateDoc(doc(db, 'stores', storeId, 'products', product.id), productData);
                toast.success('Product updated successfully');
            } else {
                await addDoc(collection(db, 'stores', storeId, 'products'), productData);
                toast.success('Product added successfully');
            }
            onSave();
        } catch (error) {
            toast.error('Failed to save product');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full p-3 border rounded-lg" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description" className="w-full p-3 border rounded-lg" />
                <div className="grid grid-cols-2 gap-4">
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-3 border rounded-lg" required />
                    <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} placeholder="MRP" className="w-full p-3 border rounded-lg" />
                </div>
                {/* ... other fields ... */}

                <DiscountRulesEditor rules={formData.discountRules} onChange={handleDiscountChange} />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex flex-col items-center justify-center pt-7">
                                <FiUploadCloud className="w-8 h-8 text-gray-400" />
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                    Attach files</p>
                            </div>
                            <input type="file" multiple onChange={handleImageChange} className="opacity-0" />
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="py-2 px-5 bg-gray-200 rounded-lg">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="py-2 px-5 bg-blue-600 text-white rounded-lg">
                        {isSubmitting ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AdminProductForm;
