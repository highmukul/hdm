import AdminLayout from '../../components/admin/AdminLayout';
import NotificationForm from '../../components/admin/NotificationForm';

const NotificationsPage = () => {
    return (
        <AdminLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">Send Push Notifications</h1>
                <NotificationForm />
            </div>
        </AdminLayout>
    );
};

export default NotificationsPage;
