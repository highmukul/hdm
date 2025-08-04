import AdminLayout from '../../components/admin/AdminLayout';
import SettingsForm from '../../components/admin/SettingsForm';

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Application Settings</h1>
        <SettingsForm />
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;