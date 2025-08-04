import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductFormModal from './ProductFormModal';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Image from 'next/image';

const ProductTable = () => {
  const { products, loading, error } = useProducts();
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

  const handleDelete = (productId) => {
    console.log("Deleting product:", productId);
    // Add firebase delete logic here
  };

  if (loading) return <p className="text-text-secondary">Loading products...</p>;
  if (error) return <p className="text-red-500">Error loading products.</p>;

  return (
    <div className="card">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-text-primary">Product List</h2>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center">
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-background">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <Image src={product.imageUrls?.[0] || '/placeholder.png'} alt={product.name} width={40} height={40} className="rounded-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text-primary">{product.name}</div>
                      <div className="text-sm text-text-secondary">{product.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">₹{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleOpenModal(product)} className="text-primary hover:opacity-80 mr-4"><FaEdit /></button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <ProductFormModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductTable;
