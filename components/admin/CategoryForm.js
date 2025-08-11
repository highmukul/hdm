import { useForm } from 'react-hook-form';
import { db } from '../../firebase/config';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

const CategoryForm = ({ category, onSave }) => {
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        if (category) {
            setValue('name', category.name);
        }
    }, [category, setValue]);

    const onSubmit = async (data) => {
        const toastId = toast.loading(category ? 'Updating category...' : 'Creating category...');
        
        const categoryData = {
            ...data,
            updatedAt: serverTimestamp(),
        };

        try {
            let savedCategory;
            if (category) {
                const docRef = doc(db, 'categories', category.id);
                await updateDoc(docRef, categoryData);
                savedCategory = { ...category, ...categoryData };
            } else {
                categoryData.createdAt = serverTimestamp();
                const docRef = await addDoc(collection(db, 'categories'), categoryData);
                savedCategory = { id: docRef.id, ...categoryData };
            }
            toast.success(`Category ${category ? 'updated' : 'created'}!`, { id: toastId });
            onSave(savedCategory);
            reset();
        } catch (error) {
            toast.error('Failed to save category.', { id: toastId });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block font-medium">Category Name</label>
                <input {...register('name', { required: true })} className="input w-full" />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="btn-primary">Save Category</button>
            </div>
        </form>
    );
};

export default CategoryForm;
