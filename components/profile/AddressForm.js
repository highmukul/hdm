import { useState } from 'react';

const AddressForm = ({ address = {}, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: address.name || '',
        addressLine1: address.addressLine1 || '',
        addressLine2: address.addressLine2 || '',
        city: address.city || '',
        state: address.state || '',
        pincode: address.pincode || '',
        mobile: address.mobile || '',
        isPrimary: address.isPrimary || false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" required />
            <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" className="w-full p-2 border rounded" required />
            <input name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" className="w-full p-2 border rounded" />
            <div className="grid grid-cols-2 gap-4">
                <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="p-2 border rounded" required />
                <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="p-2 border rounded" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="p-2 border rounded" required />
                 <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" className="p-2 border rounded" required />
            </div>
            <div className="flex items-center">
                <input type="checkbox" name="isPrimary" checked={formData.isPrimary} onChange={handleChange} id="isPrimary" className="h-4 w-4" />
                <label htmlFor="isPrimary" className="ml-2">Set as primary address</label>
            </div>
            <div className="flex justify-end space-x-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Save Address</button>
            </div>
        </form>
    );
};

export default AddressForm;
