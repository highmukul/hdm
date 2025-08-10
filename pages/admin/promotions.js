import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase/config';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import * as FaIcons from 'react-icons/fa';
import toast from 'react-hot-toast';
import PromotionForm from '../../components/admin/PromotionForm';

const PromotionsPage = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'promotions'), (snapshot) => {
            setPromotions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleOpenModal = (promotion = null) => {
        setSelectedPromotion(promotion);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPromotion(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this promotion?')) {
            try {
                await deleteDoc(doc(db, 'promotions', id));
                toast.success('Promotion deleted!');
            } catch (error) {
                toast.error('Error deleting promotion.');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Manage Promotions</h1>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <FaIcons.FaPlus className="mr-2" />
                        Create Promotion
                    </button>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Link</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {promotions.map(promo => (
                                <tr key={promo.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4"><img src={promo.imageUrl} alt={promo.title} className="h-12 w-24 object-cover rounded-md" /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{promo.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promo.link}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleOpenModal(promo)} className="text-blue-600 hover:text-blue-800 mr-4"><FaIcons.FaEdit size={18} /></button>
                                        <button onClick={() => handleDelete(promo.id)} className="text-red-600 hover:text-red-800"><FaIcons.FaTrash size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            {isModalOpen && <PromotionForm promotion={selectedPromotion} onSave={handleCloseModal} onCancel={handleCloseModal} />}
        </AdminLayout>
    );
};

export default PromotionsPage;
