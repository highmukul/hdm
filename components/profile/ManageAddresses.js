import { useState } from 'react';
import { useUserAddresses } from '../../hooks/useUserAddresses';
import { useAuth } from '../../context/AuthContext';
import AddressForm from './AddressForm';
import * as FaIcons from 'react-icons/fa';

const ManageAddresses = () => {
    const { user } = useAuth();
    const { addresses, loading, addAddress, updateAddress, deleteAddress } = useUserAddresses(user?.uid);
    const [editingAddress, setEditingAddress] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleSave = async (addressData) => {
        if (editingAddress) {
            await updateAddress(editingAddress.id, addressData);
        } else {
            await addAddress(addressData);
        }
        setEditingAddress(null);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setEditingAddress(null);
        setIsAdding(false);
    };

    if (loading) return <p>Loading addresses...</p>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Manage Addresses</h2>
            {isAdding || editingAddress ? (
                <AddressForm 
                    address={editingAddress} 
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <button onClick={() => setIsAdding(true)} className="px-4 py-2 rounded bg-blue-600 text-white">
                    Add New Address
                </button>
            )}

            <div className="space-y-4">
                {addresses.map(address => (
                    <div key={address.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-start">
                        <div>
                             <p className="font-bold">{address.name} {address.isPrimary && <span className="text-xs text-green-500">(Primary)</span>}</p>
                             <p>{address.addressLine1}, {address.addressLine2}</p>
                             <p>{address.city}, {address.state} - {address.pincode}</p>
                             <p>Mobile: {address.mobile}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => setEditingAddress(address)}><FaIcons.FaEdit className="text-blue-500"/></button>
                            <button onClick={() => deleteAddress(address.id)}><FaIcons.FaTrash className="text-red-500"/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageAddresses;
