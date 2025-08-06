import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db, storage } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';
import { FiUser, FiPhone, FiMapPin, FiCamera, FiArrowLeft, FiArrowRight, FiUpload, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import Image from 'next/image';

const steps = [
    { id: 'personal', title: 'Personal Details' },
    { id: 'selfie', title: 'Live Selfie' },
    { id: 'document', title: 'ID Document' },
    { id: 'address', title: 'Address Information' },
];

const CaptainSignupPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const webcamRef = useRef(null);
    const fileInputRef = useRef(null);
    
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({ name: '', phone: '', alternatePhone: '', address: '' });
    const [selfie, setSelfie] = useState(null);
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) setFormData(prev => ({ ...prev, name: user.displayName || user.email || '' }));
    }, [user]);

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.phone === formData.alternatePhone) {
            toast.error("Primary and alternate phone numbers cannot be the same.");
            return;
        }
        if (!user || !selfie || !document) {
            toast.error("A real-time selfie and ID document are required to complete verification.");
            return;
        }
        setLoading(true);

        try {
            const selfieRef = ref(storage, `captain_verification/${user.uid}/selfie.jpg`);
            await uploadString(selfieRef, selfie, 'data_url');
            const selfieUrl = await getDownloadURL(selfieRef);

            const documentRef = ref(storage, `captain_verification/${user.uid}/${document.name}`);
            await uploadString(documentRef, document.data, 'data_url');
            const documentUrl = await getDownloadURL(documentRef);

            const captainProfile = {
                captainId: user.uid,
                email: user.email,
                name: formData.name,
                phone: formData.phone,
                alternatePhone: formData.alternatePhone,
                address: formData.address,
                selfieUrl,
                documentUrl,
                isOnline: false,
                isProfileComplete: true,
                verificationStatus: 'pending', // pending, approved, rejected
                createdAt: new Date(),
            };

            await setDoc(doc(db, 'captains', user.uid), captainProfile, { merge: true });
            toast.success("Welcome aboard! Your profile is under review.");
            router.push('/captain/dashboard');

        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" style={{backgroundImage: "url('/auth-bg.jpg')", backgroundSize: 'cover'}}>
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{steps[currentStep].title}</h1>
                        <p className="text-gray-500 mb-6">Step {currentStep + 1} of {steps.length}</p>
                        
                        {currentStep === 0 && <PersonalDetailsForm formData={formData} setFormData={setFormData} />}
                        {currentStep === 1 && <SelfieStep selfie={selfie} setSelfie={setSelfie} webcamRef={webcamRef} />}
                        {currentStep === 2 && <DocumentStep document={document} setDocument={setDocument} fileInputRef={fileInputRef} />}
                        {currentStep === 3 && <AddressForm formData={formData} setFormData={setFormData} />}
                        
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between items-center pt-6">
                    <button onClick={handlePrev} disabled={currentStep === 0} className="flex items-center px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        <FiArrowLeft className="mr-2"/> Back
                    </button>
                    {currentStep < steps.length - 1 ? (
                        <button onClick={handleNext} className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                           Next <FiArrowRight className="ml-2"/>
                        </button>
                    ) : (
                        <button onClick={handleSubmit} disabled={loading} className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-400">
                            {loading ? 'Submitting...' : 'Complete Signup'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Sub-components for each step
const PersonalDetailsForm = ({ formData, setFormData }) => (
    <div className="space-y-4">
        <InputField icon={<FiUser/>} name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name" required/>
        <InputField icon={<FiPhone/>} name="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Primary Phone" type="tel" required/>
        <InputField icon={<FiPhone/>} name="alternatePhone" value={formData.alternatePhone} onChange={(e) => setFormData({...formData, alternatePhone: e.target.value})} placeholder="Alternate Phone" type="tel"/>
    </div>
);

const SelfieStep = ({ selfie, setSelfie, webcamRef }) => (
    <div className="flex flex-col items-center">
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-200 mb-4 border relative">
            {selfie ? <Image src={selfie} alt="Your Selfie" layout="fill" objectFit="contain" /> : <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ facingMode: 'user' }} className="w-full h-full"/>}
        </div>
        <button onClick={() => setSelfie(webcamRef.current.getScreenshot())} className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <FiCamera className="mr-2"/>{selfie ? 'Retake Selfie' : 'Capture Selfie'}
        </button>
    </div>
);

const DocumentStep = ({ document, setDocument, fileInputRef }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setDocument({ name: file.name, data: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="flex flex-col items-center">
            <input type="file" accept="image/png, image/jpeg, application/pdf" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-200 mb-4 border flex items-center justify-center text-center p-4 relative">
                {document ? <Image src={document.data} alt="ID Document" layout="fill" objectFit="contain" /> : <p className="text-gray-500">Tap to upload your ID <br/>(Aadhar, PAN, etc.)</p>}
            </div>
             <button onClick={() => fileInputRef.current.click()} className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                <FiUpload className="mr-2"/>{document ? 'Change Document' : 'Upload Document'}
            </button>
        </div>
    )
};


const AddressForm = ({ formData, setFormData }) => (
    <div className="space-y-4">
        <InputField icon={<FiMapPin/>} name="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Full Residential Address" required/>
    </div>
);

const InputField = ({ icon, ...props }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</span>
        <input {...props} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
    </div>
);

export default CaptainSignupPage;
