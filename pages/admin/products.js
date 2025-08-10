import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductTable from '../../components/admin/ProductTable';
import AdminProductForm from '../../components/admin/AdminProductForm.jsx';
import { FiPlus } from 'react-icons/fi';

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

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiPlus className="mr-2" />
            Create Product
          </button>
        </div>
        <ProductTable onEdit={handleOpenModal} />
      </div>
      {isModalOpen && <AdminProductForm product={selectedProduct} onSave={handleCloseModal} onCancel={handleCloseModal} />}
    </AdminLayout>
  );
};

export default ProductsPage;
