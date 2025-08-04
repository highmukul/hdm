import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaMapMarkerAlt, FaShieldAlt, FaQuestionCircle, FaSignOutAlt, FaBox } from 'react-icons/fa';
import UserProfile from '../components/profile/UserProfile';
import ManageAddresses from '../components/profile/ManageAddresses';
import OrderHistory from '../components/profile/OrderHistory';
import StaticContent from '../components/profile/StaticContent';
import ProtectedRoute from '../components/ui/ProtectedRoute';
import { MobileRestriction } from '../components/hoc/withMobileRestriction';

const ProfilePage = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = {
        profile: { label: 'My Profile', icon: <FaUser />, component: <UserProfile /> },
        orders: { label: 'Order History', icon: <FaBox />, component: <OrderHistory /> },
        addresses: { label: 'Manage Addresses', icon: <FaMapMarkerAlt />, component: <ManageAddresses /> },
        support: { label: 'Help & Support', icon: <FaQuestionCircle />, component: <StaticContent page="support" /> },
        refund: { label: 'Return & Refund Policy', icon: <FaShieldAlt />, component: <StaticContent page="refund" /> },
    };

    return (
        <ProtectedRoute>
            <MobileRestriction pageName="Profile">
                <Layout>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <aside className="md:col-span-1">
                                <div className="bg-white p-4 rounded-lg shadow-md">
                                    <ul className="space-y-2">
                                        {Object.keys(tabs).map(key => (
                                            <li key={key}>
                                                <button onClick={() => setActiveTab(key)} className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${activeTab === key ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-gray-100'}`}>
                                                    <span className="mr-3">{tabs[key].icon}</span>
                                                    {tabs[key].label}
                                                </button>
                                            </li>
                                        ))}
                                        <li>
                                            <button onClick={logout} className="w-full flex items-center p-3 rounded-lg text-left text-red-500 hover:bg-red-50">
                                                <FaSignOutAlt className="mr-3" />
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                            <main className="md:col-span-3">
                                <div className="bg-white p-8 rounded-lg shadow-md">
                                    {tabs[activeTab].component}
                                </div>
                            </main>
                        </div>
                    </div>
                </Layout>
            </MobileRestriction>
        </ProtectedRoute>
    );
};

export default ProfilePage;