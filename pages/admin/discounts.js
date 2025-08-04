import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { db } from '../../firebase/config';
import { collection, onSnapshot, deleteDoc, doc, setDoc } from 'firebase/firestore'; // Import setDoc
import { FaTrash, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DiscountsPage = () => {
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({ code: '', type: 'percentage', value: '' });

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'promocodes'), (snapshot) => {
            setCoupons(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, []);

    const handleAddCoupon = async (e) => {
        e.preventDefault();
        if (!newCoupon.code || !newCoupon.value) {
            toast.error("Please fill in all fields.");
            return;
        }
        // Use the coupon code as the document ID for easy lookup and to prevent duplicates
        const couponRef = doc(db, 'promocodes', newCoupon.code);
        await setDoc(couponRef, { 
            code: newCoupon.code,
            type: newCoupon.type,
            value: Number(newCoupon.value) 
        });
        setNewCoupon({ code: '', type: 'percentage', value: '' });
        toast.success(`Coupon "${newCoupon.code}" added!`);
    };

    const handleDeleteCoupon = async (id) => {
        await deleteDoc(doc(db, 'promocodes', id));
        toast.error("Coupon removed.");
    };

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">Manage Discount Coupons</h1>
            <div className="card max-w-lg mx-auto mb-10">
                <form onSubmit={handleAddCoupon} className="space-y-4">
                    <h2 className="text-xl font-semibold">Add New Coupon</h2>
                    <input type="text" value={newCoupon.code} onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} placeholder="Coupon Code (e.g., SAVE10)" className="input-field" required />
                    <div className="grid grid-cols-2 gap-4">
                        <select value={newCoupon.type} onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})} className="input-field">
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed (₹)</option>
                        </select>
                        <input type="number" value={newCoupon.value} onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})} placeholder="Value" className="input-field" required />
                    </div>
                    <button type="submit" className="btn-primary w-full"><FaPlus className="inline mr-2"/>Add Coupon</button>
                </form>
            </div>
            <div className="card">
                <h2 className="text-xl font-semibold mb-4">Active Coupons</h2>
                <div className="space-y-3">
                    {coupons.map(coupon => (
                        <div key={coupon.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                           <div>
                                <span className="font-mono text-indigo-600 font-bold">{coupon.code}</span>
                                <span className="text-sm text-gray-600 ml-4">{coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}</span>
                           </div>
                           <button onClick={() => handleDeleteCoupon(coupon.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default DiscountsPage;
