import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { RiImageAddLine, RiCloseCircleFill } from 'react-icons/ri';
import { createProduct, updateProduct, uploadImage } from '../../api/products';
import toast from 'react-hot-toast';

const AdminProductForm = ({ product, onSave, onCancel }) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm();
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const existingImages = watch('images', product?.images || []);

  useEffect(() => {
    if (product) {
      // Set form values from the product prop
      Object.keys(product).forEach(key => {
        setValue(key, product[key]);
      });
      setImagePreviews(product.images.map(img => img.src) || []);
    } else {
      // Reset form for a new product
      reset();
      setImagePreviews([]);
      setImageFiles([]);
    }
  }, [product, reset, setValue]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (imagePreviews.length + files.length > 5) {
      toast.error('You can upload a maximum of 5 images.');
      return;
    }
    setImageFiles(prev => [...prev, ...files]);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (indexToRemove) => {
    // This handles both new file previews and existing image URLs
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));

    // If the removed image was an existing one, update the form value
    const updatedImages = existingImages.filter((_, index) => index !== indexToRemove);
    setValue('images', updatedImages);
  };

  const processSubmit = async (data) => {
    try {
      const uploadedImageUrls = [...(product?.images || [])];

      // Upload new images
      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map(file => uploadImage(file));
        const newUrls = await Promise.all(uploadPromises);
        uploadedImageUrls.push(...newUrls);
      }
      
      const productData = { ...data, images: uploadedImageUrls };

      if (product?.id) {
        await updateProduct(product.id, productData);
        toast.success('Product updated successfully!');
      } else {
        await createProduct(productData);
        toast.success('Product created successfully!');
      }
      onSave(); // This will close the modal and refresh data
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.error(error.message || 'Failed to save product.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl m-4">
        <div className="p-8 max-h-[90vh] overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{product ? 'Edit Product' : 'Create New Product'}</h2>
          <form onSubmit={handleSubmit(processSubmit)} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input {...register('name', { required: 'Product name is required' })} id="name" type="text" className="w-full p-3 border rounded-lg" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Product Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea {...register('description')} id="description" rows="4" className="w-full p-3 border rounded-lg"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input {...register('price', { required: 'Price is required', valueAsNumber: true })} id="price" type="number" step="0.01" className="w-full p-3 border rounded-lg" />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input {...register('stock', { required: 'Stock is required', valueAsNumber: true })} id="stock" type="number" className="w-full p-3 border rounded-lg" />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
              </div>
            </div>

            {/* Image Uploader */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <img src={preview} alt="Product preview" className="w-full h-full object-cover rounded-lg shadow-md" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-white rounded-full text-red-500 hover:text-red-700">
                      <RiCloseCircleFill size={24} />
                    </button>
                  </div>
                ))}
                {imagePreviews.length < 5 && (
                  <label htmlFor="image-upload" className="cursor-pointer aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg text-gray-400 hover:text-primary hover:border-primary">
                    <RiImageAddLine size={40} />
                    <span className="text-xs mt-1">Add Image</span>
                  </label>
                )}
              </div>
              <input id="image-upload" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={onCancel} className="py-2 px-6 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="py-2 px-6 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center justify-center disabled:bg-indigo-300">
                {isSubmitting && <CgSpinner className="animate-spin mr-2" />}
                {product ? 'Update Product' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
