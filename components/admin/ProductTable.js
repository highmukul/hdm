import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { db, storage } from '../../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, listAll, deleteObject } from 'firebase/storage';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import Image from 'next/image';

const ProductTable = ({ onEdit }) => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      // 1. Delete the product document from Firestore
      await deleteDoc(doc(db, 'stores', product.storeId, 'products', product.id));

      // 2. Delete the associated image folder from Firebase Storage
      const imageFolderRef = ref(storage, `products/${product.id}`);
      const imageList = await listAll(imageFolderRef);
      
      const deletePromises = imageList.items.map((itemRef) => deleteObject(itemRef));
      await Promise.all(deletePromises);

      toast.success('Product and its images deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete product.');
      console.error('Error deleting product:', err);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-gray-500 text-center py-10">Loading products...</p>;
  if (error) return <p className="text-red-500 text-center py-10">Error loading products.</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="p-4 flex justify-between items-center">
        <div className="relative">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <Image
                        src={product.imageUrls?.[0] || '/placeholder.png'}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                    product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onEdit(product)} className="text-blue-600 hover:text-blue-800 mr-4"><FiEdit size={18} /></button>
                  <button onClick={() => handleDelete(product)} className="text-red-600 hover:text-red-800"><FiTrash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
