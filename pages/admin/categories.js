import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import CategoryForm from '../../components/admin/CategoryForm';
import { db } from '../../firebase/config';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import * as FaIcons from 'react-icons/fa';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleSave = (savedCategory) => {
        if (editingCategory) {
            setCategories(categories.map(c => c.id === savedCategory.id ? savedCategory : c));
        } else {
            setCategories([...categories, savedCategory]);
        }
        setEditingCategory(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            await deleteDoc(doc(db, 'categories', id));
            toast.success('Category deleted.');
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage Categories</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-xl shadow-md">
                             <h2 className="text-xl font-semibold mb-4">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>
                            <CategoryForm 
                                key={editingCategory ? editingCategory.id : 'new'}
                                category={editingCategory}
                                onSave={handleSave} 
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Existing Categories</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="p-2">Name</th>
                                            <th className="p-2 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(category => (
                                            <tr key={category.id} className="border-b">
                                                <td className="p-2">{category.name}</td>
                                                <td className="p-2 text-right space-x-2">
                                                    <button onClick={() => setEditingCategory(category)} className="btn-secondary btn-sm">
                                                        <FaIcons.FaEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(category.id)} className="btn-danger btn-sm">
                                                        <FaIcons.FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CategoriesPage;
