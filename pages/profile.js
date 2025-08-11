import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import UserProfile from '../components/profile/UserProfile';
import ManageAddresses from '../components/profile/ManageAddresses';
import OrderHistory from '../components/profile/OrderHistory';
import ProtectedRoute from '../components/ui/ProtectedRoute';
import * as FaIcons from 'react-icons/fa';

const TABS = [
    { id: 'profile', label: 'Profile', icon: <FaIcons.FaUser /> },
    { id: 'addresses', label: 'Addresses', icon: <FaIcons.FaMapMarkerAlt /> },
    { id: 'orders', label: 'Orders', icon: <FaIcons.FaBoxOpen /> },
];

const ProfilePage = () => {
    const router = useRouter();
    const { section } = router.query;
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (section && TABS.some(tab => tab.id === section)) {
            setActiveTab(section);
        }
    }, [section]);
    
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        router.push(`/profile?section=${tabId}`, undefined, { shallow: true });
    };

    return (
        <ProtectedRoute>
            <Layout>
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                             <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                                <ul className="space-y-2">
                                    {TABS.map(tab => (
                                        <li key={tab.id}>
                                            <button 
                                                onClick={() => handleTabClick(tab.id)}
                                                className={`w-full flex items-center p-3 rounded-lg ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                            >
                                               {tab.icon}
                                               <span className="ml-3">{tab.label}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:col-span-3">
                            {activeTab === 'profile' && <UserProfile />}
                            {activeTab === 'addresses' && <ManageAddresses />}
                            {activeTab === 'orders' && <OrderHistory />}
                        </div>
                    </div>
                </div>
            </Layout>
        </ProtectedRoute>
    );
};

export default ProfilePage;
