import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/config';
import { collection, addDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductFormModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({ name: '', description: '', mrp: '', price: '', category: '', stock: '' });
  const [categories, setCategories] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        mrp: product.mrp || '',
        price: product.price || '',
        category: product.category || '',
        stock: product.stock || '',
      });
      setExistingImageUrls(product.imageUrls || []);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setNewImageFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveNewImage = (fileIndex) => {
    setNewImageFiles(prev => prev.filter((_, index) => index !== fileIndex));
  };

  const handleRemoveExistingImage = (url) => {
    setExistingImageUrls(prev => prev.filter(u => u !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let finalImageUrls = [...existingImageUrls];

    try {
      if (newImageFiles.length > 0) {
        const uploadPromises = newImageFiles.map(file => {
          const imageRef = ref(storage, `products/${Date.now()}_${file.name}`);
          const uploadTask = uploadBytesResumable(imageRef, file);
          return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
              (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
              (error) => reject(error),
              () => getDownloadURL(uploadTask.snapshot.ref).then(resolve)
            );
          });
        });
        const uploadedUrls = await Promise.all(uploadPromises);
        finalImageUrls = [...finalImageUrls, ...uploadedUrls];
      }

      const productData = {
        ...formData,
        mrp: Number(formData.mrp),
        price: Number(formData.price),
        stock: Number(formData.stock),
        imageUrls: finalImageUrls,
      };

      if (product) {
        await updateDoc(doc(db, 'products', product.id), productData);
        toast.success('Product updated successfully!');
      } else {
        await addDoc(collection(db, 'products'), productData);
        toast.success('Product added successfully!');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save product. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div className="grid grid-cols-4 gap-4">
              {existingImageUrls.map((url, i) => (
                <div key={i} className="relative group">
                  <Image src={url} alt="Product" width={100} height={100} className="rounded-lg object-cover" />
                  <button type="button" onClick={() => handleRemoveExistingImage(url)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><FiTrash2 size={12}/></button>
                </div>
              ))}
              {newImageFiles.map((file, i) => (
                <div key={i} className="relative group">
                  <Image src={URL.createObjectURL(file)} alt="Preview" width={100} height={100} className="rounded-lg object-cover" />
                  <button type="button" onClick={() => handleRemoveNewImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><FiTrash2 size={12}/></button>
                </div>
              ))}
              <label className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <FiUploadCloud className="text-gray-400 text-2xl"/>
                <span className="text-xs text-gray-500 mt-1">Upload</span>
                <input type="file" multiple onChange={handleImageChange} className="hidden" accept="image/*"/>
              </label>
            </div>
          </div>
          
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" rows="3"></textarea>
          
          <div className="grid md:grid-cols-3 gap-4">
            <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} placeholder="MRP (₹)" className="w-full p-3 border rounded-lg" required />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Selling Price (₹)" className="w-full p-3 border rounded-lg" required />
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="w-full p-3 border rounded-lg" required />
          </div>

          <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded-lg" required>
            <option value="">Select a Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          
          {isSubmitting && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
