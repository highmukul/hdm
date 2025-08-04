import { useState, useRef } from 'react';
import { useUserAddresses } from '../../hooks/useUserAddresses';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { FaPlus, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { Autocomplete } from '@react-google-maps/api';

const ManageAddresses = () => {
    const { user } = useAuth();
    const { addresses, loading } = useUserAddresses(user?.uid);
    const { isLoaded } = useGoogleMaps();
    const [isAddingNew, setIsAddingNew] = useState(false);
    const autocompleteRef = useRef(null);

    const handlePlaceSelected = () => {
        const place = autocompleteRef.current.getPlace();
        if (!place.geometry) {
            toast.error("Please select a valid address.");
            return;
        }

        const location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        const addressComponents = { street: place.name, fullAddress: place.formatted_address, city: '', state: '', zip: '' };
        place.address_components.forEach(component => {
            const types = component.types;
            if (types.includes('locality')) addressComponents.city = component.long_name;
            if (types.includes('administrative_area_level_1')) addressComponents.state = component.short_name;
            if (types.includes('postal_code')) addressComponents.zip = component.long_name;
        });
        
        saveNewAddress({ ...addressComponents, location });
    };

    const saveNewAddress = async (addressData) => {
        if (!user) return;
        const addressId = Date.now().toString();
        const newAddressRef = doc(db, 'users', user.uid, 'addresses', addressId);
        try {
            await setDoc(newAddressRef, { ...addressData, id: addressId });
            toast.success('Address saved!');
            setIsAddingNew(false);
        } catch {
            toast.error('Could not save address.');
        }
    };
    
    const handleDeleteAddress = async (addressId) => {
        if(!user) return;
        const addressRef = doc(db, 'users', user.uid, 'addresses', addressId);
        try {
            await deleteDoc(addressRef);
            toast.success('Address removed.');
        } catch {
            toast.error('Could not remove address.');
        }
    }

    if (loading || !isLoaded) return <p className="text-text-secondary">Loading addresses...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Manage Addresses</h2>
            <div className="space-y-4">
                {addresses.map(address => (
                    <div key={address.id} className="p-4 border border-border rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-text-primary">{address.street}</p>
                            <p className="text-sm text-text-secondary">{address.fullAddress}</p>
                        </div>
                        <button onClick={() => handleDeleteAddress(address.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                {isAddingNew ? (
                     <div className="mt-6 p-4 border-t border-border space-y-4">
                        <h3 className="font-semibold text-text-primary">Add a New Address</h3>
                        <Autocomplete onLoad={(ref) => autocompleteRef.current = ref} onPlaceChanged={handlePlaceSelected} options={{ componentRestrictions: { country: 'in' } }}>
                           <input type="text" placeholder="Start typing your address..." className="input-field w-full" />
                        </Autocomplete>
                         <div className="flex justify-end">
                           <button type="button" onClick={() => setIsAddingNew(false)} className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-text-primary rounded-lg hover:opacity-90">Cancel</button>
                        </div>
                   </div>
                ) : (
                    <button onClick={() => setIsAddingNew(true)} className="w-full text-center py-3 px-4 font-medium rounded-md border-2 border-dashed border-border hover:bg-background transition-colors flex items-center justify-center text-text-secondary">
                        <FaPlus className="mr-2" /> Add a new address
                    </button>
                )}
            </div>
        </div>
    );
};

export default ManageAddresses;
