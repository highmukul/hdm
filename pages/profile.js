import { useState } from 'react';
import Layout from '../components/layout/Layout';
import UserProfile from '../components/profile/UserProfile';
import ManageAddresses from '../components/profile/ManageAddresses';
import OrderHistory from '../components/profile/OrderHistory';
import StaticContent from '../components/profile/StaticContent';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import * as FiIcons from 'react-icons/fi';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: <FiIcons.FiUser /> },
        { id: 'orders', label: 'Order History', icon: <FiIcons.FiShoppingBag /> },
        { id: 'addresses', label: 'Manage Addresses', icon: <FiIcons.FiMapPin /> },
        { id: 'help', label: 'Help & Support', icon: <FiIcons.FiHelpCircle /> },
        { id: 'terms', label: 'Terms & Conditions', icon: <FiIcons.FiFileText /> }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <UserProfile />;
            case 'orders':
                return <OrderHistory />;
            case 'addresses':
                return <ManageAddresses />;
            case 'help':
                return <StaticContent title="Help & Support" content="For any help, please contact support at support@example.com." />;
            case 'terms':
                return <StaticContent title="Terms & Conditions" content="Please read our terms and conditions carefully..." />;
            default:
                return null;
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                            <ul>
                                {tabs.map(tab => (
                                    <li key={tab.id}>
                                        <button 
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full text-left flex items-center p-3 rounded-lg font-semibold my-1 transition-colors ${activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                                        >
                                            <span className="mr-3">{tab.icon}</span>
                                            {tab.label}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button onClick={handleLogout} className="w-full text-left flex items-center p-3 rounded-lg font-semibold my-1 transition-colors text-red-500 hover:bg-red-50">
                                        <FiIcons.FiLogOut className="mr-3" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilePage;
