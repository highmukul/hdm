import { db } from '../../firebase/config';
import { collection, onSnapshot, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const StoreTable = ({ stores: initialStores, onEdit }) => {

    const handleDelete = async (storeId) => {
        if (window.confirm("Are you sure you want to delete this store?")) {
            await deleteDoc(doc(db, "stores", storeId));
            toast.success("Store deleted successfully.");
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {initialStores.map(store => (
                        <tr key={store.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${store.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {store.isOpen ? 'Open' : 'Closed'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => onEdit(store)} className="text-indigo-600 hover:text-indigo-900 mr-4"><FiIcons.FiEdit /></button>
                                <button onClick={() => handleDelete(store.id)} className="text-red-600 hover:text-red-900"><FiIcons.FiTrash2 /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StoreTable;
