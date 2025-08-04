import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const SettingsForm = () => {
  const [settings, setSettings] = useState({
    deliveryCharge: '',
    taxRate: '',
    storeOpen: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'app-settings');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      }
      setLoading(false);
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

  if (loading) return <p>Loading settings...</p>;

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">General Settings</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="deliveryCharge" className="block text-sm font-medium text-gray-700">Delivery Charge (₹)</label>
              <input type="number" name="deliveryCharge" id="deliveryCharge" value={settings.deliveryCharge} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
              <input type="number" name="taxRate" id="taxRate" value={settings.taxRate} onChange={handleChange} className="input-field" />
            </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="text-sm font-medium text-gray-700">Store Open</span>
          <label htmlFor="storeOpen" className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" name="storeOpen" id="storeOpen" checked={settings.storeOpen} onChange={handleChange} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button onClick={handleSave} className="btn-primary">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsForm;