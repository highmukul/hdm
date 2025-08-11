import AdminLayout from '../../components/admin/AdminLayout';
import SettingsForm from '../../components/admin/SettingsForm';

const AdminSettingsPage = () => {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">Application Settings</h1>
            <SettingsForm />
        </AdminLayout>
    );
};

export default AdminSettingsPage;
