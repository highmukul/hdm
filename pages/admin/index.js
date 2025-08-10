import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminProductForm from '../../components/admin/AdminProductForm';
import { db } from '../../firebase/config';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import * as FaIcons from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const AdminPage = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [storeId, setStoreId] = useState(null);

    useEffect(() => {
        if (user && user.storeId) {
            setStoreId(user.storeId);
        }
    }, [user]);

    useEffect(() => {
        if (!storeId) return;
        const unsubscribe = onSnapshot(collection(db, 'stores', storeId, 'products'), (snapshot) => {
            setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return unsubscribe;
    }, [storeId]);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, 'stores', storeId, 'products', productId));
                toast.success('Product deleted');
            } catch (error) {
                toast.error('Failed to delete product');
                console.error(error);
            }
        }
    };

    const handleSave = () => {
        setIsFormOpen(false);
        setSelectedProduct(null);
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Product Management</h1>
                <button onClick={() => { setSelectedProduct(null); setIsFormOpen(true); }} className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center">
                    <FaIcons.FaPlus className="mr-2" /> Add Product
                </button>
            </div>

            {isFormOpen ? (
                <AdminProductForm
                    product={selectedProduct}
                    storeId={storeId}
                    onSave={handleSave}
                    onCancel={() => setIsFormOpen(false)}
                />
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-xl">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Name</th>
                                <th className="text-left py-2">Price</th>
                                <th className="text-left py-2">Stock</th>
                                <th className="text-right py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4">Loading...</td></tr>
                            ) : (
                                products.map(product => (
                                    <tr key={product.id} className="border-b">
                                        <td className="py-2">{product.name}</td>
                                        <td className="py-2">₹{product.price}</td>
                                        <td className="py-2">{product.stock}</td>
                                        <td className="py-2 text-right">
                                            <button onClick={() => handleEdit(product)} className="text-blue-600 mr-4"><FaIcons.FaEdit /></button>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-600"><FaIcons.FaTrash /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminPage;
