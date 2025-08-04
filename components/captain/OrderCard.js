import { getDistance } from '../../utils/getDistance';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const OrderCard = ({ order, onClick }) => {
    const { user } = useAuth();
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        const getCaptainLocation = async () => {
            if (!user) return;
            const captainDoc = await getDoc(doc(db, 'captains', user.uid));
            const captainLocation = captainDoc.data()?.location;
            if (captainLocation) {
                setDistance(getDistance(captainLocation, order.shippingAddress.location));
            }
        };
        getCaptainLocation();
    }, [user, order]);

    return (
        <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50" onClick={onClick}>
            <p className="font-semibold">Order #{order.id.slice(0, 6)}</p>
            <p>Distance: {distance ? `${distance.toFixed(1)} km` : 'Calculating...'}</p>
            <p>Items: {order.items.length}</p>
            <p className="font-bold">Earn: ₹{order.total * 0.15}</p> {/* Example earning logic */}
        </div>
    );
};
