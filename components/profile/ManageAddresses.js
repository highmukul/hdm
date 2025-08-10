import { useState } from 'react';
import { useUserAddresses } from '../../hooks/useUserAddresses';
import AddressForm from './AddressForm';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const ManageAddresses = () => {
    const { addresses, addAddress, deleteAddress, loading } = useUserAddresses();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleAddAddress = async (addressData) => {
        try {
            await addAddress(addressData);
            toast.success("Address added!");
            setIsFormOpen(false);
        } catch (error) {
            toast.error("Failed to add address.");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Addresses</h2>
                <button onClick={() => setIsFormOpen(true)} className="btn-primary flex items-center">
                    <FiIcons.FiPlus className="mr-2"/> Add New Address
                </button>
            </div>

            {isFormOpen && (
                <div className="mb-6">
                    <AddressForm onSave={handleAddAddress} onCancel={() => setIsFormOpen(false)} />
                </div>
            )}

            {loading ? (
                <p>Loading addresses...</p>
            ) : (
                <div className="space-y-4">
                    {addresses.map(address => (
                        <div key={address.id} className="p-4 border rounded-lg flex justify-between items-start">
                           <div>
                                <p className="font-semibold flex items-center"><FiIcons.FiMapPin className="mr-2 text-gray-400"/> {address.type}</p>
                                <p className="text-gray-600 ml-6">{address.line1}, {address.city}, {address.state} - {address.zip}</p>
                           </div>
                            <button onClick={() => deleteAddress(address.id)} className="text-red-500 hover:text-red-700">
                                <FiIcons.FiTrash2 />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageAddresses;
