import { useState } from 'react';
import { useCaptainAuth } from '../../hooks/useCaptainAuth';
import { useRouter } from 'next/router';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';
import Spinner from '../../components/ui/Spinner';
import ProfileForm from '../../components/captain/ProfileForm';
import VehicleForm from '../../components/captain/VehicleForm';
import Uploader from '../../components/common/Uploader'; // Assuming a generic uploader

const CaptainSignupPage = () => {
    const { captain, loading } = useCaptainAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        profile: null,
        vehicle: null,
        documents: {
            license: '',
            registration: '',
            insurance: '',
        }
    });

    const handleProfileSubmit = (data) => {
        setFormData(prev => ({ ...prev, profile: data }));
        setStep(2);
    };

    const handleVehicleSubmit = (data) => {
        setFormData(prev => ({ ...prev, vehicle: data }));
        setStep(3);
    };
    
    const handleDocumentUpload = (docName, url) => {
        setFormData(prev => ({
            ...prev,
            documents: { ...prev.documents, [docName]: url }
        }));
    };

    const handleFinalSubmit = async () => {
        if (!formData.profile || !formData.vehicle) {
            toast.error("Please complete all steps.");
            return;
        }

        const toastId = toast.loading('Finalizing your application...');

        try {
            const captainRef = doc(db, 'captains', captain.uid);
            await setDoc(captainRef, {
                ...formData.profile,
                vehicle: formData.vehicle,
                documents: formData.documents,
                email: captain.email,
                status: 'pending', // Initial status
                createdAt: serverTimestamp(),
            }, { merge: true });

            toast.success('Application submitted successfully! We will review your details.', { id: toastId });
            router.push('/captain/pending');
        } catch (error) {
            toast.error('Failed to submit application.', { id: toastId });
            console.error(error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
    }
    
    if (!captain) {
        router.push('/captain/auth');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">Captain Application</h1>
                
                {/* Stepper */}
                <div className="flex justify-center space-x-8 text-sm font-medium text-gray-500">
                    <span className={step >= 1 ? 'text-indigo-600' : ''}>1. Profile</span>
                    <span className={step >= 2 ? 'text-indigo-600' : ''}>2. Vehicle</span>
                    <span className={step >= 3 ? 'text-indigo-600' : ''}>3. Documents</span>
                </div>

                <div className="mt-8">
                    {step === 1 && <ProfileForm onSubmit={handleProfileSubmit} />}
                    {step === 2 && <VehicleForm onSubmit={handleVehicleSubmit} onBack={() => setStep(1)} />}
                    {step === 3 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-center">Upload Your Documents</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-medium mb-1">Driver's License</label>
                                    <Uploader onUploadComplete={(urls) => handleDocumentUpload('license', urls[0])} />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Vehicle Registration</label>
                                    <Uploader onUploadComplete={(urls) => handleDocumentUpload('registration', urls[0])} />
                                </div>
                                <div>
                                    <label className="block font-medium mb-1">Insurance</label>
                                    <Uploader onUploadComplete={(urls) => handleDocumentUpload('insurance', urls[0])} />
                                </div>
                            </div>
                            <div className="flex justify-between mt-8">
                                <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
                                <button onClick={handleFinalSubmit} className="btn-primary" disabled={Object.values(formData.documents).some(v => !v)}>
                                    Submit Application
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CaptainSignupPage;
