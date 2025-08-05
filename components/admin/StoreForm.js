import { useState } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const StoreForm = ({ onStoreCreated }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Store name cannot be empty.');
      return;
    }
    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, 'stores'), {
        name: name,
        createdAt: new Date(),
      });
      toast.success('Store created successfully!');
      setName('');
      if (onStoreCreated) {
        onStoreCreated({ id: docRef.id, name });
      }
    } catch (error) {
      toast.error('Failed to create store.');
      console.error('Error creating store:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Store</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter store name"
            className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreForm;
