import { useState, useEffect, useRef } from 'react';
import { useUserAddresses } from '../../hooks/useUserAddresses';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { Autocomplete } from '@react-google-maps/api';

const AddressForm = ({ onSelectAddress }) => {
    const { user } = useAuth();
    const { addresses, loading } = useUserAddresses(user?.uid);
    const { isLoaded } = useGoogleMaps();
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [phone, setPhone] = useState('');
    const autocompleteRef = useRef(null);

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId) {
            const firstAddress = addresses[0];
            setSelectedAddressId(firstAddress.id);
            onSelectAddress(firstAddress);
        } else if (addresses.length === 0) {
            setIsAddingNew(true);
        }
    }, [addresses, selectedAddressId, onSelectAddress]);
    
    const handleSelectAddress = (address) => {
        setSelectedAddressId(address.id);
        onSelectAddress(address);
        setIsAddingNew(false);
    };
    
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
        
        saveNewAddress({ ...addressComponents, location, phone });
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
    
    if (loading || !isLoaded) return <p className="text-text-secondary">Loading addresses...</p>;

    return (
        <div>
            {addresses.length > 0 && (
                 <div className="space-y-4 mb-6">
                    {addresses.map(address => (
                        <div key={address.id} onClick={() => handleSelectAddress(address)} className={`p-4 border rounded-lg cursor-pointer ${selectedAddressId === address.id ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
                            <p className="font-semibold text-text-primary">{address.street}</p>
                            <p className="text-sm text-text-secondary">{address.fullAddress}</p>
                        </div>
                    ))}
                </div>
            )}
            {isAddingNew ? (
                <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="font-semibold mb-2 text-text-primary">Add a New Address</h3>
                    <Autocomplete onLoad={(ref) => autocompleteRef.current = ref} onPlaceChanged={handlePlaceSelected} options={{ componentRestrictions: { country: 'in' } }}>
                        <input type="text" placeholder="Start typing your address..." className="input-field w-full" />
                    </Autocomplete>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="input-field w-full mt-4" required/>
                    <div className="flex justify-end space-x-4 mt-4">
                        {addresses.length > 0 && <button type="button" onClick={() => setIsAddingNew(false)} className="py-2 px-4 bg-gray-200 dark:bg-gray-700 text-text-primary rounded-lg hover:opacity-90">Cancel</button>}
                    </div>
                </div>
            ) : (
                <div className="mt-6">
                    <button onClick={() => setIsAddingNew(true)} className="w-full text-center py-3 px-4 text-sm font-medium rounded-md border-2 border-dashed border-border hover:bg-background transition-colors text-text-secondary">
                        + Add a new address
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddressForm;
