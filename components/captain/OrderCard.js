import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const OrderCard = ({ order }) => {
    const handleAccept = async () => {
        const orderRef = doc(db, 'orders', order.id);
        await updateDoc(orderRef, { status: 'accepted' });
        toast.success('Order accepted!');
    };

    const handleReject = async () => {
        const orderRef = doc(db, 'orders', order.id);
        await updateDoc(orderRef, { status: 'rejected' });
        toast.error('Order rejected!');
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between">
                <h3 className="font-bold">Order #{order.id.substring(0, 6)}...</h3>
                <p className="font-bold">₹{order.total.toFixed(2)}</p>
            </div>
            <p className="text-sm text-gray-500">{order.items.length} items</p>
            <div className="mt-4 flex justify-end space-x-2">
                <button onClick={handleReject} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Reject</button>
                <button onClick={handleAccept} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Accept</button>
            </div>
        </div>
    );
};

export default OrderCard;
