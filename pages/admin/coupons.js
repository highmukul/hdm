import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import CouponForm from '../../components/admin/CouponForm';
import { db } from '../../firebase/config';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const CouponsPage = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'coupons'), (snapshot) => {
            const couponsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCoupons(couponsData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAddNew = () => {
        setEditingCoupon(null);
        setIsModalOpen(true);
    };

    const handleEdit = (coupon) => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            try {
                await deleteDoc(doc(db, 'coupons', id));
                toast.success('Coupon deleted successfully!');
            } catch (error) {
                toast.error('Failed to delete coupon.');
            }
        }
    };

    const handleSave = () => {
        setIsModalOpen(false);
        setEditingCoupon(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingCoupon(null);
    };

    if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Coupons</h1>
                    <button onClick={handleAddNew} className="btn-primary">
                        <FaPlus className="mr-2" /> Add New Coupon
                    </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Existing Coupons</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="th">Code</th>
                                    <th className="th">Discount</th>
                                    <th className="th">Expiry Date</th>
                                    <th className="th">Status</th>
                                    <th className="th">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((coupon) => (
                                    <tr key={coupon.id}>
                                        <td className="td">{coupon.code}</td>
                                        <td className="td">{coupon.discount}%</td>
                                        <td className="td">{new Date(coupon.expiryDate.seconds * 1000).toLocaleDateString()}</td>
                                        <td className="td">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {coupon.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="td">
                                            <button onClick={() => handleEdit(coupon)} className="text-indigo-600 hover:text-indigo-900 mr-4"><FaEdit /></button>
                                            <button onClick={() => handleDelete(coupon.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalOpen && (
                    <CouponForm
                        coupon={editingCoupon}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default CouponsPage;
