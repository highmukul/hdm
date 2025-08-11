import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductTable from '../../components/admin/ProductTable';
import AdminProductForm from '../../components/admin/AdminProductForm.jsx';
import useAdminData from '../../hooks/useAdminData';
import { db } from '../../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import * as FaIcons from 'react-icons/fa';

const ProductsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { data: products, loading, error, setData: setProducts } = useAdminData('products');

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, 'products', id));
                setProducts(products.filter(p => p.id !== id));
                toast.success('Product deleted!');
            } catch (error) {
                toast.error('Error deleting product.');
            }
        }
    };

    const handleSave = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        // Here you might want to refetch the data to see the changes immediately
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
                    <button onClick={handleAddNew} className="btn-primary">
                        <FaIcons.FaPlus className="mr-2" /> Add New Product
                    </button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Existing Products</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error.message}</p>}
                    {!loading && !error && (
                        <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
                    )}
                </div>

                {isModalOpen && (
                    <AdminProductForm
                        product={editingProduct}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default ProductsPage;
