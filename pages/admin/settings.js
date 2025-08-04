import AdminLayout from '../../components/admin/AdminLayout';
import SettingsForm from '../../components/admin/SettingsForm';

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Application Settings</h1>
            <p className="text-gray-500 mt-1">Manage general settings for the application.</p>
        </div>
        <div className="max-w-4xl">
            <SettingsForm />
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
