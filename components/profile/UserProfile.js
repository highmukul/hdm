import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db, auth } from '../../firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { user } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [otpSent, setOtpSent] = useState(false);

    useEffect(() => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            getDoc(userRef).then(docSnap => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setDisplayName(userData.displayName || '');
                    setPhoneNumber(userData.phoneNumber || '');
                }
            });
        }
    }, [user]);

    const generateRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            });
        }
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        generateRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+${phoneNumber}`, appVerifier)
            .then(confirmation => {
                setConfirmationResult(confirmation);
                setOtpSent(true);
                toast.success('OTP sent successfully!');
            }).catch(error => {
                console.error("SMS not sent", error);
                toast.error('Failed to send OTP. Make sure the phone number is correct.');
            });
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (confirmationResult) {
            try {
                await confirmationResult.confirm(otp);
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, { phoneNumber });
                toast.success('Phone number verified and updated!');
                setOtpSent(false);
            } catch (error) {
                 toast.error('Invalid OTP. Please try again.');
            }
        }
    };
    
    const handleProfileUpdate = async (e) => {
         e.preventDefault();
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            try {
                await updateDoc(userRef, { displayName });
                toast.success('Display name updated successfully!');
            } catch (error) {
                toast.error('Failed to update display name.');
            }
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Profile</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div>
                    <label className="block mb-2">Email Address</label>
                    <input type="email" value={user?.email || ''} disabled className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700" />
                </div>
                 <div>
                    <label className="block mb-2">Display Name</label>
                    <input 
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Update Name</button>
            </form>

             <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Verify Phone Number</h3>
                {!otpSent ? (
                     <form onSubmit={handleSendOtp} className="flex items-end space-x-2">
                        <div className="flex-grow">
                             <label className="block mb-2">Phone Number (e.g., 919876543210)</label>
                             <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="919876543210"
                            />
                        </div>
                        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Send OTP</button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="flex items-end space-x-2">
                         <div className="flex-grow">
                            <label className="block mb-2">Enter OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="123456"
                            />
                        </div>
                        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Verify OTP</button>
                    </form>
                )}
            </div>
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default UserProfile;
