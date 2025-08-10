import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StoreForm from '../../components/admin/StoreForm';
import StoreTable from '../../components/admin/StoreTable';
import useAdminData from '../../hooks/useAdminData';

const StoresPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const { data: stores, loading, error } = useAdminData('stores');

  const handleOpenModal = (store = null) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStore(null);
  };

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;
  if (error) return <AdminLayout><div>Error: {error.message}</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Manage Stores</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Store
          </button>
        </div>
        <StoreTable stores={stores} onEdit={handleOpenModal} />
      </div>
      {isModalOpen && <StoreForm store={selectedStore} onSave={handleCloseModal} onCancel={handleCloseModal} />}
    </AdminLayout>
  );
};

export default StoresPage;
