import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PromotionForm from '../../components/admin/PromotionForm.jsx';
import { db } from '../../firebase/config';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const PromotionsPage = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'promotions'), (snapshot) => {
            const promotionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPromotions(promotionsData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAddNew = () => {
        setEditingPromotion(null);
        setIsModalOpen(true);
    };

    const handleEdit = (promotion) => {
        setEditingPromotion(promotion);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this promotion?')) {
            try {
                await deleteDoc(doc(db, 'promotions', id));
                toast.success('Promotion deleted successfully!');
            } catch (error) {
                toast.error('Failed to delete promotion.');
            }
        }
    };

    const handleSave = () => {
        setIsModalOpen(false);
        setEditingPromotion(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingPromotion(null);
    };

    if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Promotions</h1>
                    <button onClick={handleAddNew} className="btn-primary">
                        <FaPlus className="mr-2" /> Add New Promotion
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Current Promotions</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="th">Title</th>
                                    <th className="th">Description</th>
                                    <th className="th">Discount</th>
                                    <th className="th">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promotions.map((promo) => (
                                    <tr key={promo.id}>
                                        <td className="td">{promo.title}</td>
                                        <td className="td">{promo.description}</td>
                                        <td className="td">{promo.discount}%</td>
                                        <td className="td">
                                            <button onClick={() => handleEdit(promo)} className="text-indigo-600 hover:text-indigo-900 mr-4"><FaEdit /></button>
                                            <button onClick={() => handleDelete(promo.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalOpen && (
                    <PromotionForm
                        promotion={editingPromotion}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default PromotionsPage;
