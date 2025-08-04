import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase/config';
import { collection, onSnapshot, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { FiTrash2, FiPlus, FiTag, FiPercent, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';

const DiscountsPage = () => {
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({ code: '', type: 'percentage', value: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'promocodes'), (snapshot) => {
            setCoupons(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (error) => {
            toast.error("Failed to fetch coupons.");
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleAddCoupon = async (e) => {
        e.preventDefault();
        if (!newCoupon.code || !newCoupon.value) {
            toast.error("Please fill in all fields.");
            return;
        }
        
        const couponRef = doc(db, 'promocodes', newCoupon.code.toUpperCase());
        await setDoc(couponRef, {
            code: newCoupon.code.toUpperCase(),
            type: newCoupon.type,
            value: Number(newCoupon.value)
        });
        
        setNewCoupon({ code: '', type: 'percentage', value: '' });
        toast.success(`Coupon "${newCoupon.code.toUpperCase()}" added successfully!`);
    };

    const handleDeleteCoupon = async (id) => {
        if (window.confirm("Are you sure you want to delete this coupon?")) {
            await deleteDoc(doc(db, 'promocodes', id));
            toast.success("Coupon removed.");
        }
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Manage Discounts</h1>
                <p className="text-gray-500 mt-1">Create and manage discount coupons for your store.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Coupon Form */}
                <div className="lg:col-span-1">
                    <form onSubmit={handleAddCoupon} className="bg-white p-6 rounded-2xl shadow-sm space-y-5">
                        <h2 className="text-lg font-semibold text-gray-800">Add New Coupon</h2>
                        <input 
                            type="text" 
                            value={newCoupon.code} 
                            onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} 
                            placeholder="Coupon Code (e.g., SAVE10)" 
                            className="w-full p-3 border rounded-lg" 
                            required 
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <select 
                                value={newCoupon.type} 
                                onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})} 
                                className="w-full p-3 border rounded-lg"
                            >
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed Amount</option>
                            </select>
                            <input 
                                type="number" 
                                value={newCoupon.value} 
                                onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})} 
                                placeholder="Value" 
                                className="w-full p-3 border rounded-lg" 
                                required 
                            />
                        </div>
                        <button type="submit" className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            <FiPlus className="mr-2"/>Add Coupon
                        </button>
                    </form>
                </div>

                {/* Coupon List */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Coupons</h2>
                        {loading ? (
                            <p>Loading coupons...</p>
                        ) : coupons.length === 0 ? (
                            <p className="text-gray-500">No active coupons found.</p>
                        ) : (
                            <div className="space-y-3">
                                {coupons.map(coupon => (
                                    <div key={coupon.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                       <div className="flex items-center">
                                            <div className="mr-4 text-blue-500">
                                                {coupon.type === 'percentage' ? <FiPercent size={20} /> : <FiDollarSign size={20} />}
                                            </div>
                                            <div>
                                                <span className="font-mono text-gray-800 font-bold text-base">{coupon.code}</span>
                                                <p className="text-sm text-gray-500">{coupon.type === 'percentage' ? `${coupon.value}% Discount` : `₹${coupon.value} Off`}</p>
                                           </div>
                                       </div>
                                       <button onClick={() => handleDeleteCoupon(coupon.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100">
                                            <FiTrash2 size={18} />
                                       </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DiscountsPage;
