import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../../firebase/config';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Uploader from '../common/Uploader';

const BannerForm = ({ banner, onSave, onCancel }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (banner) {
            setValue('location', banner.location);
            setValue('title', banner.title);
            setValue('linkUrl', banner.linkUrl);
            setImageUrl(banner.imageUrl);
        }
    }, [banner, setValue]);

    const handleUploadStart = () => setIsUploading(true);
    const handleUploadComplete = (url) => {
        setImageUrl(url);
        setIsUploading(false);
    };

    const onSubmit = async (data) => {
        if (!imageUrl) {
            toast.error("An image is required.");
            return;
        }

        const toastId = toast.loading(banner ? "Updating banner..." : "Saving banner...");
        const bannerData = {
            ...data,
            imageUrl,
            updatedAt: serverTimestamp(),
        };

        try {
            let savedBanner;
            if (banner) {
                const docRef = doc(db, 'banners', banner.id);
                await updateDoc(docRef, bannerData);
                savedBanner = { ...banner, ...bannerData };
            } else {
                bannerData.createdAt = serverTimestamp();
                const docRef = await addDoc(collection(db, 'banners'), bannerData);
                savedBanner = { id: docRef.id, ...bannerData };
            }
            toast.success(`Banner ${banner ? 'updated' : 'saved'}!`, { id: toastId });
            onSave(savedBanner);
            reset();
            setImageUrl('');
        } catch (error) {
            toast.error("Failed to save banner.", { id: toastId });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium">Banner Location</label>
                    <select {...register('location', { required: true })} className="input w-full">
                        <option value="">Select a location</option>
                        <option value="hero-carousel">Hero Carousel (Store Page)</option>
                        <option value="shop-ad-top">Shop Page Ad (Top)</option>
                    </select>
                    {errors.location && <p className="text-red-500 text-sm mt-1">Location is required.</p>}
                </div>
                <div>
                    <label className="block font-medium">Title / Alt Text</label>
                    <input {...register('title')} placeholder="e.g., 'Summer Sale'" className="input w-full" />
                </div>
            </div>
            
            <div>
                <label className="block font-medium">Link URL (Optional)</label>
                <input {...register('linkUrl')} placeholder="e.g., '/products/some-product'" className="input w-full" />
            </div>

            <div>
                <label className="block font-medium">Upload Image</label>
                <Uploader 
                    onUploadStart={handleUploadStart} 
                    onUploadComplete={handleUploadComplete} 
                    multiple={false} 
                />
                {imageUrl && <img src={imageUrl} alt="Uploaded banner" className="mt-4 w-1/3 rounded-lg shadow-md" />}
            </div>

            <div className="flex justify-end space-x-4">
                {banner && <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>}
                <button type="submit" className="btn-primary" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Save Banner'}
                </button>
            </div>
        </form>
    );
};

export default BannerForm;
