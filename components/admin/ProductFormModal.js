import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/config';
import { collection, addDoc, updateDoc, doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { FiUploadCloud, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useStores } from '../../hooks/useStores';

// Image validation settings
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const ProductFormModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({ name: '', description: '', mrp: '', price: '', category: '', stock: '', storeId: '' });
  const [categories, setCategories] = useState([]);
  const { stores, loading: storesLoading, error: storesError } = useStores();
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
        storeId: product.storeId || '',
      });
      // We will now only store the main image URL. The resized versions will be handled by a convention.
      setExistingImageUrls(product.imageUrls ? [product.imageUrls[0]] : []);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      let validFiles = [];
      for (const file of files) {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          toast.error(`File "${file.name}" is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
          continue;
        }
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          toast.error(`File type for "${file.name}" is not supported.`);
          continue;
        }
        validFiles.push(file);
      }
      setNewImageFiles(prev => [...prev, ...validFiles]);
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

    if (!formData.storeId) {
      toast.error('Please select a store.');
      return;
    }

    if (newImageFiles.length === 0 && existingImageUrls.length === 0) {
      toast.error('Please upload at least one product image.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let productRef;
      if (product) {
        productRef = doc(db, 'stores', product.storeId, 'products', product.id);
      } else {
        productRef = doc(collection(db, 'stores', formData.storeId, 'products'));
      }

      let finalImageUrl = existingImageUrls[0] || null;

      if (newImageFiles.length > 0) {
        // We only upload the first new image for now.
        const fileToUpload = newImageFiles[0];
        // The path will be to the original, un-resized image.
        const imageRef = ref(storage, `products/${productRef.id}/original_${fileToUpload.name}`);
        const uploadTask = uploadBytesResumable(imageRef, fileToUpload);

        finalImageUrl = await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            (error) => reject(error),
            () => getDownloadURL(uploadTask.snapshot.ref).then(resolve)
          );
        });
      }

      const productData = {
        ...formData,
        mrp: Number(formData.mrp),
        price: Number(formData.price),
        stock: Number(formData.stock),
        // We now store a single, main image URL.
        imageUrl: finalImageUrl, 
        updatedAt: serverTimestamp(),
      };
      
      // Remove the old imageUrls field if it exists.
      delete productData.imageUrls;

      if (product) {
        await updateDoc(productRef, productData);
        toast.success('Product updated successfully!');
      } else {
        productData.createdAt = serverTimestamp();
        await setDoc(productRef, productData);
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
                <input type="file" multiple onChange={handleImageChange} className="hidden" accept={ALLOWED_IMAGE_TYPES.join(',')}/>
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

          <select
            name="storeId"
            value={formData.storeId}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
            disabled={storesLoading}
          >
            <option value="">
              {storesLoading ? 'Loading stores...' : storesError ? 'Error loading stores' : 'Select a Store'}
            </option>
            {!storesLoading && !storesError && stores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>

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
            <button type="submit" disabled={isSubmitting || storesLoading} className="py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
