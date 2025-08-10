import React from 'react';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';

const OrderDetails = ({ order, onClose }) => {

  const handleStatusChange = async (newStatus) => {
    if (!order?.id) return;
    const orderRef = doc(db, 'orders', order.id);
    try {
      await updateDoc(orderRef, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update order status.');
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-8">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Order Details</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><FiIcons.FiX /></button>
        </div>
        
        <div className="space-y-4">
            <p><strong>ID:</strong> #{order.id}</p>
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>

            <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                <ul className="space-y-2">
                    {order.items.map(item => (
                        <li key={item.id} className="flex justify-between">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>₹{item.price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Update Status:</h4>
                <div className="flex gap-2">
                    <button onClick={() => handleStatusChange('shipped')} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Mark as Shipped</button>
                    <button onClick={() => handleStatusChange('delivered')} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Mark as Delivered</button>
                    <button onClick={() => handleStatusChange('cancelled')} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">Cancel Order</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default OrderDetails;
