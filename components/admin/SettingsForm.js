import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const SettingsForm = () => {
    const [settings, setSettings] = useState({
        platformFee: false,
        deliveryFee: false,
        minOrderForFreeDelivery: 0,
        taxRate: 0,
    });

    useEffect(() => {
        const fetchSettings = async () => {
            const docRef = doc(db, 'settings', 'platform');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSettings(docSnap.data());
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : Number(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, 'settings', 'platform'), settings);
            toast.success('Settings updated successfully!');
        } catch (error) {
            toast.error('Error updating settings: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Enable Platform Fee</label>
                    <input type="checkbox" name="platformFee" checked={settings.platformFee} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Enable Delivery Fee</label>
                    <input type="checkbox" name="deliveryFee" checked={settings.deliveryFee} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Minimum Order for Free Delivery</label>
                    <input type="number" name="minOrderForFreeDelivery" value={settings.minOrderForFreeDelivery} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
                    <input type="number" name="taxRate" value={settings.taxRate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
            </div>
            <div className="mt-6">
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md">
                    Save Settings
                </button>
            </div>
        </form>
    );
};

export default SettingsForm;
