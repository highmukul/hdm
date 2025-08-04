import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const SettingsForm = () => {
  const [settings, setSettings] = useState({
    deliveryCharge: '',
    taxRate: '',
    storeOpen: true,
    minOrderValue: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'app-settings');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        toast.error('Could not fetch settings.');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'settings', 'app-settings');
      await setDoc(docRef, settings, { merge: true });
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings.');
      console.error("Error saving settings:", error);
    }
  };

  if (loading) return <p className="text-gray-500">Loading settings...</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Delivery Charge (₹)" type="number" name="deliveryCharge" value={settings.deliveryCharge} onChange={handleChange} />
          <InputField label="Tax Rate (%)" type="number" name="taxRate" value={settings.taxRate} onChange={handleChange} />
          <InputField label="Minimum Order Value (₹)" type="number" name="minOrderValue" value={settings.minOrderValue} onChange={handleChange} />
        </div>

        <ToggleSwitch label="Store Open" name="storeOpen" checked={settings.storeOpen} onChange={handleChange} />
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 text-right">
        <button onClick={handleSave} className="bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
};

const InputField = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input {...props} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
    </div>
);

const ToggleSwitch = ({ label, name, checked, onChange }) => (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <span className="text-sm font-medium text-gray-800">{label}</span>
        <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
    </div>
);

export default SettingsForm;
