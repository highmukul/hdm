import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductTable from '../../components/admin/ProductTable';
import AdminProductForm from '../../components/admin/AdminProductForm.jsx';
import * as FiIcons from 'react-icons/fi';
import { db } from '../../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        try {
            await deleteDoc(doc(db, 'products', id));
            toast.success('Product deleted!');
        } catch (error) {
            toast.error('Error deleting product.');
        }
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiIcons.FiPlus className="mr-2" />
            Create Product
          </button>
        </div>
        <ProductTable onEdit={handleOpenModal} onDelete={handleDelete} />
      </div>
      {isModalOpen && <AdminProductForm product={selectedProduct} onSave={handleCloseModal} onCancel={handleCloseModal} />}
    </AdminLayout>
  );
};

export default ProductsPage;
