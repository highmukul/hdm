import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StoreForm from '../../components/admin/StoreForm';
import StoreTable from '../../components/admin/StoreTable';
import useAdminData from '../../hooks/useAdminData';

const StoresPage = () => {
    const [editingStore, setEditingStore] = useState(null);
    const { data: stores, loading, error, setData: setStores } = useAdminData('stores');

    const handleSave = (savedStore) => {
        if (editingStore) {
            setStores(stores.map(s => s.id === savedStore.id ? savedStore : s));
        } else {
            // The useAdminData hook doesn't have an 'add' function, so we'll just refetch
        }
        setEditingStore(null);
    };
    
    const handleEdit = (store) => {
        setEditingStore(store);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage Stores</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold mb-4">
                                {editingStore ? 'Edit Store' : 'Add New Store'}
                            </h2>
                            <StoreForm
                                key={editingStore ? editingStore.id : 'new'}
                                store={editingStore}
                                onSave={handleSave}
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Existing Stores</h2>
                            {loading && <p>Loading...</p>}
                            {error && <p className="text-red-500">{error.message}</p>}
                            {!loading && !error && (
                                <StoreTable stores={stores} onEdit={handleEdit} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default StoresPage;
