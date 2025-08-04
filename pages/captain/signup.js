import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { db, storage } from '../../firebase/config';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Webcam from 'react-webcam';
import toast from 'react-hot-toast';
import { FaCamera, FaUser, FaPhone, FaMapPin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CaptainSignupPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const webcamRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', phone: '', alternatePhone: '', address: '' });
    const [selfie, setSelfie] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) setFormData(prev => ({ ...prev, name: user.displayName || '' }));
    }, [user]);

    const captureSelfie = () => setSelfie(webcamRef.current.getScreenshot());

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !selfie) { toast.error("A real-time selfie is required."); return; }
        if (formData.phone === formData.alternatePhone) { toast.error("Alternate mobile number must be different."); return; }
        setLoading(true);

        try {
            const selfieRef = ref(storage, `captain_selfies/${user.uid}`);
            await uploadString(selfieRef, selfie, 'data_url');
            const selfieUrl = await getDownloadURL(selfieRef);

            await updateDoc(doc(db, 'users', user.uid), { name: formData.name, phone: formData.phone, selfieUrl, isProfileComplete: true });
            await setDoc(doc(db, 'captains', user.uid), { captainId: user.uid, name: formData.name, phone: formData.phone, alternatePhone: formData.alternatePhone, address: formData.address, isOnline: true, activeOrderId: null });
            
            toast.success("Profile complete! You are now online.");
            router.push('/captain/dashboard');
        } catch (error) {
            toast.error("Failed to update profile.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
            <motion.div className="w-full max-w-lg bg-card-background rounded-xl shadow-lg p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-center text-text-primary mb-2">One Last Step</h1>
                <p className="text-center text-text-secondary mb-8">Let&apos;s get your verification details.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full overflow-hidden bg-background border-4 border-card-background shadow-md mb-4 flex items-center justify-center">
                            {selfie ? <Image src={selfie} alt="Your Selfie" width={192} height={192} className="object-cover" /> : <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-full object-cover" />}
                        </div>
                        <button type="button" onClick={captureSelfie} className="flex items-center bg-indigo-100 text-indigo-700 py-2 px-4 rounded-full font-semibold transition-transform transform hover:scale-105"><FaCamera className="mr-2" /> {selfie ? 'Retake Selfie' : 'Take Selfie'}</button>
                    </div>
                    <div className="relative"><FaUser className="absolute top-3 left-4 text-text-secondary" /><input type="text" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="input-field pl-12" required /></div>
                    <div className="relative"><FaPhone className="absolute top-3 left-4 text-text-secondary" /><input type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Mobile Number" className="input-field pl-12" required /></div>
                    <div className="relative"><FaPhone className="absolute top-3 left-4 text-text-secondary" /><input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={(e) => setFormData({...formData, alternatePhone: e.target.value})} placeholder="Alternate Mobile Number" className="input-field pl-12" required /></div>
                    <div className="relative"><FaMapPin className="absolute top-3 left-4 text-text-secondary" /><input type="text" name="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Permanent Address" className="input-field pl-12" required /></div>
                    <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-3">{loading ? 'Saving...' : 'Go Online & Start Earning'}</button>
                </form>
            </motion.div>
        </div>
    );
};

export default CaptainSignupPage;
