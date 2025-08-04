import { useState, useRef } from 'react';
import { useUserAddresses } from '../../hooks/useUserAddresses';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { FiPlus, FiTrash2, FiMapPin } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { Autocomplete } from '@react-google-maps/api';

const ManageAddresses = () => {
    const { user } = useAuth();
    const { addresses, loading, addAddress, removeAddress } = useUserAddresses(user?.uid);
    const { isLoaded } = useGoogleMaps();
    const [isAdding, setIsAdding] = useState(false);
    const autocompleteRef = useRef(null);

    const handlePlaceSelected = async () => {
        if (!autocompleteRef.current) return;
        const place = autocompleteRef.current.getPlace();
        
        if (!place.geometry) {
            toast.error("Invalid address. Please select from the dropdown.");
            return;
        }

        const newAddress = {
            id: Date.now().toString(),
            fullAddress: place.formatted_address,
            location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            },
        };

        await addAddress(newAddress);
        setIsAdding(false);
    };

    if (loading || !isLoaded) return <p>Loading addresses...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">My Addresses</h2>
            
            <div className="space-y-4">
                {addresses.map(address => (
                    <div key={address.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center bg-gray-50">
                        <div className="flex items-center">
                            <FiMapPin className="text-gray-500 mr-4" />
                            <p className="text-sm text-gray-700">{address.fullAddress}</p>
                        </div>
                        <button onClick={() => removeAddress(address.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100">
                            <FiTrash2 />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                {isAdding ? (
                    <div className="p-4 border-t border-gray-200">
                        <h3 className="font-semibold text-gray-700 mb-3">Add a New Address</h3>
                        <Autocomplete
                            onLoad={(ref) => (autocompleteRef.current = ref)}
                            onPlaceChanged={handlePlaceSelected}
                            options={{ componentRestrictions: { country: 'in' } }}
                        >
                            <input
                                type="text"
                                placeholder="Search for your address or landmark..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </Autocomplete>
                        <button onClick={() => setIsAdding(false)} className="mt-3 text-sm text-gray-600">Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setIsAdding(true)} className="w-full flex items-center justify-center py-3 px-4 font-medium rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50 text-gray-600">
                        <FiPlus className="mr-2" /> Add New Address
                    </button>
                )}
            </div>
        </div>
    );
};

export default ManageAddresses;
