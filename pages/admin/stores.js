import AdminLayout from '../../components/admin/AdminLayout';
import StoreForm from '../../components/admin/StoreForm';
import StoreTable from '../../components/admin/StoreTable';

const StoresPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Manage Stores</h1>
        <StoreForm />
        <StoreTable />
      </div>
    </AdminLayout>
  );
};

export default StoresPage;
