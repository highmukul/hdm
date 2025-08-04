import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';

const UserProfile = () => {
    const { user, loading: authLoading } = useAuth();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setPhone(user.phone || '');
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!user || !name.trim()) {
            toast.error("Name cannot be empty.");
            return;
        }
        setFormLoading(true);

        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { displayName: name, phone });
            // Ideally, the AuthContext would listen for user doc changes
            // or we'd force a reload of the user state here.
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile.');
            console.error("Profile update error: ", error);
        } finally {
            setFormLoading(false);
        }
    };

    if (authLoading) return <p>Loading profile...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Information</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
                <ProfileField 
                    label="Full Name" 
                    icon={<FiUser />}
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    isEditing={isEditing} 
                />
                <ProfileField 
                    label="Email Address" 
                    icon={<FiMail />}
                    value={user.email} 
                    isEditing={false} // Email is not editable
                />
                <ProfileField 
                    label="Mobile Number" 
                    icon={<FiPhone />}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Add your phone number"
                    isEditing={isEditing} 
                />
                
                <div className="pt-4">
                    {isEditing ? (
                        <div className="flex space-x-4">
                            <button type="submit" className="btn-primary" disabled={formLoading}>
                                {formLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
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

const ProfileField = ({ label, icon, value, isEditing, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                {icon}
            </span>
            <input
                type="text"
                value={value}
                disabled={!isEditing}
                {...props}
                className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-gray-50 read-only:bg-gray-100 read-only:cursor-not-allowed border-gray-200 focus:ring-2 focus:ring-blue-400"
                readOnly={!isEditing}
            />
        </div>
    </div>
);

export default UserProfile;
