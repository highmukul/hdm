import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase/config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { FaTrash, FaImage } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductFormModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({ name: '', mrp: '', price: '', category: '', stock: '' });
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const handleImageChange = (e) => {
    if (e.target.files) setNewImageFiles(prev => [...prev, ...Array.from(e.target.files)]);
  };

  const handleRemoveExistingImage = (urlToRemove) => {
    setExistingImageUrls(prev => prev.filter(url => url !== urlToRemove));
    toast.success("Image marked for deletion. Save product to confirm.");
  };

  const handleRemoveNewImage = (fileIndex) => {
    setNewImageFiles(prev => prev.filter((_, index) => index !== fileIndex));
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
      
      const productData = { ...formData, mrp: Number(formData.mrp), price: Number(formData.price), stock: Number(formData.stock), imageUrls: finalImageUrls };

      if (product) {
        await updateDoc(doc(db, 'products', product.id), productData);
        toast.success("Product updated!");
      } else {
        await addDoc(collection(db, 'products'), productData);
        toast.success("Product added!");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to save product.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-card-background p-8 rounded-lg shadow-xl w-full max-w-3xl max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-text-primary">{product ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold text-text-secondary">Images</label>
            <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-4">
              {existingImageUrls.map((url, i) => (
                <div key={i} className="relative group"><Image src={url} alt="Product" width={100} height={100} className="rounded-lg object-cover" /><button type="button" onClick={() => handleRemoveExistingImage(url)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"><FaTrash size={12}/></button></div>
              ))}
              {newImageFiles.map((file, i) => (
                <div key={i} className="relative group"><Image src={URL.createObjectURL(file)} alt="Preview" width={100} height={100} className="rounded-lg object-cover" /><button type="button" onClick={() => handleRemoveNewImage(i)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"><FaTrash size={12}/></button></div>
              ))}
              <label className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-background"><FaImage className="text-text-secondary text-2xl"/><input type="file" multiple onChange={handleImageChange} className="hidden" accept="image/*"/></label>
            </div>
          </div>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="input-field" required />
          <div className="grid md:grid-cols-3 gap-4">
            <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} placeholder="MRP (₹)" className="input-field" required />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Selling Price (₹)" className="input-field" required />
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="input-field" required />
          </div>
          {isSubmitting && <div className="w-full bg-border rounded-full h-2.5"><div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div></div>}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-text-primary rounded-lg hover:opacity-90">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">{isSubmitting ? 'Saving...' : 'Save Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
