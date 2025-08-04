import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

export default function OrderCard({ order, onAccept }) {
    const [isAccepting, setIsAccepting] = useState(false);
    
    const handleAccept = async () => {
        setIsAccepting(true);
        await onAccept(order.id);
        // The parent will handle the re-render, so we don't need to setIsAccepting(false)
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold">Order for {order.customerName}</h3>
                    <div className="flex items-center text-gray-600 mt-2">
                        <MapPinIcon className="w-5 h-5 mr-2" />
                        <span>Delivery to: {order.deliveryAddress.city}, {order.deliveryAddress.zipCode}</span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-2xl">${order.subtotal.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{order.items.length} items</p>
                </div>
            </div>
            <div className="mt-4 border-t pt-4">
                <p><strong>Scheduled for:</strong> {order.deliverySlot.day}, {order.deliverySlot.range}</p>
                <button onClick={handleAccept} disabled={isAccepting}
                        className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400">
                    {isAccepting ? 'Accepting...' : 'Accept Order'}
                </button>
            </div>
        </div>
    );
}