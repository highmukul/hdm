import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { db, storage } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';

const UserProfile = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || '',
            phone: user?.phone || '',
        }
    });
    const [isEditing, setIsEditing] = useState(false);
    const [photo, setPhoto] = useState(null);

    const onSubmit = async (data) => {
        let photoURL = user.photoURL;
        if (photo) {
            const photoRef = ref(storage, `users/${user.uid}/profile.jpg`);
            await uploadString(photoRef, photo, 'data_url');
            photoURL = await getDownloadURL(photoRef);
        }

        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { ...data, photoURL });
        toast.success('Profile updated!');
        setIsEditing(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Profile</h2>
                <button onClick={() => setIsEditing(!isEditing)} className="btn-secondary">
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" onChange={(e) => {
                        const reader = new FileReader();
                        reader.onload = (e) => setPhoto(e.target.result);
                        reader.readAsDataURL(e.target.files[0]);
                    }} />
                    <input {...register('name')} placeholder="Name" />
                    <input {...register('phone')} placeholder="Phone" />
                    <button type="submit" className="btn-primary">Save Changes</button>
                </form>
            ) : (
                <div className="space-y-4">
                    <img src={user?.photoURL || '/placeholder.png'} alt="Profile" className="w-24 h-24 rounded-full" />
                    <div className="flex items-center">
                        <FiIcons.FiUser className="text-gray-400 mr-4" />
                        <span>{user?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center">
                        <FiIcons.FiMail className="text-gray-400 mr-4" />
                        <span>{user?.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center">
                        <FiIcons.FiPhone className="text-gray-400 mr-4" />
                        <span>{user?.phone || 'Not provided'}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
