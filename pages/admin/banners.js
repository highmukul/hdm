import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import BannerForm from '../../components/admin/BannerForm';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const BannersPage = ({ initialBanners }) => {
    const [banners, setBanners] = useState(initialBanners);
    const [editingBanner, setEditingBanner] = useState(null);

    const handleSave = (savedBanner) => {
        if (editingBanner) {
            setBanners(banners.map(b => b.id === savedBanner.id ? savedBanner : b));
        } else {
            setBanners([...banners, savedBanner]);
        }
        setEditingBanner(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            const toastId = toast.loading("Deleting banner...");
            try {
                await deleteDoc(doc(db, 'banners', id));
                setBanners(banners.filter(b => b.id !== id));
                toast.success("Banner deleted!", { id: toastId });
            } catch (error) {
                toast.error("Failed to delete banner.", { id: toastId });
            }
        }
    };
    
    const handleEdit = (banner) => {
        setEditingBanner(banner);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <AdminLayout>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage Banners & Ads</h1>
                
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingBanner ? 'Edit Banner' : 'Upload New Banner'}
                    </h2>
                    <BannerForm 
                        key={editingBanner ? editingBanner.id : 'new'}
                        banner={editingBanner}
                        onSave={handleSave}
                        onCancel={() => setEditingBanner(null)}
                    />
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Current Banners</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {banners.map(banner => (
                            <div key={banner.id} className="border rounded-lg overflow-hidden group">
                                <img src={banner.imageUrl} alt={banner.title || 'Banner image'} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <p className="font-bold">{banner.location}</p>
                                    <p className="text-sm text-gray-600">{banner.title}</p>
                                    <div className="mt-4 space-x-2">
                                        <button onClick={() => handleEdit(banner)} className="btn-secondary btn-sm">Edit</button>
                                        <button onClick={() => handleDelete(banner.id)} className="btn-danger btn-sm">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export async function getServerSideProps() {
    const bannersCol = collection(db, 'banners');
    const snapshot = await getDocs(bannersCol);
    const initialBanners = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return {
        props: {
            initialBanners: JSON.parse(JSON.stringify(initialBanners)),
        },
    };
}

export default BannersPage;
