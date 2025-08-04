import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase/config';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
            setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleAddOrUpdateCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) {
            toast.error("Category name cannot be empty.");
            return;
        }

        try {
            if (editingCategory) {
                await updateDoc(doc(db, 'categories', editingCategory.id), { name: newCategoryName });
                toast.success('Category updated!');
            } else {
                await addDoc(collection(db, 'categories'), { name: newCategoryName });
                toast.success('Category added!');
            }
            setIsModalOpen(false);
            setNewCategoryName('');
            setEditingCategory(null);
        } catch (error) {
            toast.error('An error occurred.');
            console.error(error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            await deleteDoc(doc(db, 'categories', categoryId));
            toast.success('Category deleted.');
        }
    };

    const openModalForEdit = (category) => {
        setEditingCategory(category);
        setNewCategoryName(category.name);
        setIsModalOpen(true);
    };

    const openModalForAdd = () => {
        setEditingCategory(null);
        setNewCategoryName('');
        setIsModalOpen(true);
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Manage Categories</h1>
                <button onClick={openModalForAdd} className="btn-primary flex items-center">
                    <FaPlus className="mr-2" /> Add Category
                </button>
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="bg-white rounded-2xl shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category Name</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.map(category => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => openModalForEdit(category)} className="text-blue-600 hover:text-blue-800 mr-4"><FaEdit size={18} /></button>
                                        <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-800"><FaTrash size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-6">{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
                        <form onSubmit={handleAddOrUpdateCategory}>
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Category Name"
                                className="w-full p-3 border rounded-lg"
                                required
                            />
                            <div className="flex justify-end gap-4 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="py-2 px-5 bg-gray-200 rounded-lg">Cancel</button>
                                <button type="submit" className="py-2 px-5 btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default CategoriesPage;
