import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setPhone(user.phone || '');
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);

        const userRef = doc(db, 'users', user.uid);
        try {
            await updateDoc(userRef, { name, phone });
            toast.success('Profile updated successfully!');
            setIsEditing(false);
            // The AuthContext should ideally re-fetch the user data or update it locally.
        } catch (error) {
            toast.error('Failed to update profile.');
            console.error("Profile update error: ", error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <p>Loading profile...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="input-field"
                            disabled={!isEditing}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            value={user.email} 
                            className="input-field bg-gray-100"
                            disabled 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                        <input 
                            type="tel" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            className="input-field"
                            placeholder="e.g., 9876543210"
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    {isEditing ? (
                        <div className="flex space-x-4">
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button type="button" onClick={() => setIsEditing(true)} className="btn-primary">
                            Edit Profile
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UserProfile;