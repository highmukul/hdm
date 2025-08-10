import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useCaptainAuth } from '../../hooks/useCaptainAuth';
import { db, storage } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Webcam from 'react-webcam';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import { motion } from 'framer-motion';
import VehicleForm from '../../components/captain/VehicleForm';
import Image from 'next/image';

const CaptainSignup = () => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const router = isClient ? useRouter() : null;
    const { captain, loading } = useCaptainAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [photo, setPhoto] = useState(null);
    const webcamRef = useRef(null);

    if (loading) return <div>Loading...</div>;
    if (!captain) {
        if (isClient) {
            router.push('/captain/auth');
        }
        return null;
    }

    const onPersonalInfoSubmit = (data) => {
        setFormData({ ...formData, ...data });
        setStep(2);
    };
    
    const onVehicleInfoSubmit = (data) => {
        setFormData({ ...formData, ...data });
        setStep(3);
    };

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPhoto(imageSrc);
    };

    const handleFinalSubmit = async () => {
        if (!photo) {
            toast.error("Please take a selfie.");
            return;
        }

        const toastId = toast.loading('Submitting application...');

        try {
            const photoRef = ref(storage, `captains/${captain.uid}/selfie.jpg`);
            await uploadString(photoRef, photo, 'data_url');
            const photoURL = await getDownloadURL(photoRef);
            
            const finalData = { 
                ...formData, 
                photoURL, 
                uid: captain.uid, 
                email: captain.email,
                status: 'pending',
                createdAt: new Date()
            };
            
            await setDoc(doc(db, 'captains', captain.uid), finalData);
            
            toast.success("Application submitted successfully!", { id: toastId });
            
            if (isClient) {
                router.push('/captain/pending');
            }
        } catch (err) {
            toast.error("Failed to submit application.", { id: toastId });
        }
    };
    
    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Become a Delivery Captain</h1>

            <ol className="flex items-center justify-center w-full mb-8">
                <li className={`flex items-center ${step >= 1 ? 'text-green-500' : 'text-gray-500'}`}>
                    <span className="mr-2">Personal</span>
                    <FiIcons.FiChevronRight />
                </li>
                <li className={`flex items-center ${step >= 2 ? 'text-green-500' : 'text-gray-500'}`}>
                    <span className="ml-2">Vehicle</span>
                    <FiIcons.FiChevronRight />
                </li>
                <li className={`flex items-center ${step >= 3 ? 'text-green-500' : 'text-gray-500'}`}>
                    <span className="ml-2">Selfie</span>
                </li>
            </ol>

            {step === 1 && (
                <motion.form 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleSubmit(onPersonalInfoSubmit)} 
                    className="space-y-4"
                >
                    <h2 className="text-xl font-semibold mb-4 text-center">Step 1: Your Information</h2>
                    <div>
                        <label className="block mb-1 font-medium">Full Name</label>
                        <input {...register("fullName", { required: "Full name is required" })} placeholder="Enter your full name" className="input w-full" />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Phone Number</label>
                        <input {...register("phone", { required: "Phone number is required" })} placeholder="Enter your phone number" className="input w-full" />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center">
                        Next <FiIcons.FiArrowRight className="ml-2" />
                    </button>
                </motion.form>
            )}

            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <VehicleForm onSave={onVehicleInfoSubmit} />
                </motion.div>
            )}

            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }} 
                    className="flex flex-col items-center space-y-4"
                >
                    <h2 className="text-xl font-semibold mb-4 text-center">Step 3: Take a Selfie</h2>
                    <div className="w-full max-w-xs bg-gray-200 rounded-lg overflow-hidden">
                        {photo ? (
                            <Image src={photo} alt="Captain's selfie" width={400} height={300} />
                        ) : (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-auto"
                            />
                        )}
                    </div>
                    
                    <div className="flex space-x-4">
                        {photo ? (
                            <button onClick={() => setPhoto(null)} className="btn-secondary flex items-center">
                                <FiIcons.FiRefreshCw className="mr-2" /> Retake
                            </button>
                        ) : (
                            <button onClick={capturePhoto} className="btn-primary flex items-center">
                                <FiIcons.FiCamera className="mr-2" /> Capture
                            </button>
                        )}
                    </div>

                    <div className="flex w-full space-x-4 mt-8">
                        <button onClick={() => setStep(2)} className="btn-secondary flex-1 flex items-center justify-center">
                            <FiIcons.FiArrowLeft className="mr-2" /> Back
                        </button>
                        <button 
                            onClick={handleFinalSubmit} 
                            disabled={!photo}
                            className="btn-primary flex-1 flex items-center justify-center disabled:bg-gray-400"
                        >
                            <FiIcons.FiCheckCircle className="mr-2" /> Submit
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default CaptainSignup;
