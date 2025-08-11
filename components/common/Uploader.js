import { useState } from 'react';
import { storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const Uploader = ({ onUploadComplete, multiple = false }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState({});

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (!multiple && selectedFiles.length > 1) {
            toast.error("Please select only one file.");
            setFiles([selectedFiles[0]]);
        } else {
            setFiles(selectedFiles);
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) return;
        
        setUploading(true);
        const promises = files.map(file => {
            const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            return new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setProgress(prev => ({ ...prev, [file.name]: prog }));
                    },
                    (error) => {
                        toast.error(`Failed to upload ${file.name}`);
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve({ name: file.name, url: downloadURL });
                    }
                );
            });
        });

        try {
            const uploadedFiles = await Promise.all(promises);
            const urls = uploadedFiles.map(f => f.url);
            onUploadComplete(multiple ? urls : urls[0]);
            toast.success(multiple ? "All images uploaded successfully!" : "Image uploaded successfully!");
        } catch (error) {
            console.error("Error during upload: ", error);
        } finally {
            setUploading(false);
            setFiles([]);
            setProgress({});
        }
    };

    return (
        <div className="my-4 p-4 border-dashed border-2 border-gray-300 rounded-lg">
            <div className="flex items-center space-x-4">
                <input 
                    type="file" 
                    multiple={multiple} 
                    onChange={handleFileChange} 
                    className="flex-grow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                <button 
                    onClick={handleUpload} 
                    disabled={uploading || files.length === 0} 
                    className="btn-primary flex items-center disabled:bg-gray-400"
                >
                    {uploading ? <FiIcons.FiLoader className="animate-spin mr-2" /> : <FiIcons.FiUploadCloud className="mr-2" />}
                    Upload
                </button>
            </div>
            {files.length > 0 && !uploading && (
                <ul className="mt-2 text-sm text-gray-600">
                    {files.map(f => <li key={f.name}>{f.name} ({Math.round(f.size / 1024)} KB)</li>)}
                </ul>
            )}
            {uploading && (
                <div className="mt-4 space-y-2">
                    {Object.keys(progress).map(fileName => (
                        <div key={fileName}>
                            <p className="text-sm font-medium">{fileName}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <motion.div 
                                    className="bg-green-500 h-2.5 rounded-full" 
                                    style={{ width: `${progress[fileName]}%` }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress[fileName]}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Uploader;
