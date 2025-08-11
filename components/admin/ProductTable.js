import { useState, useMemo } from 'react';
import useAdminData from '../../hooks/useAdminData';

const ProductTable = () => {
    const { data: products, loading, error } = useAdminData('products');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredProducts = useMemo(() => {
        return products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const sortedProducts = useMemo(() => {
        let sortableProducts = [...filteredProducts];
        if (sortConfig.key) {
            sortableProducts.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableProducts;
    }, [filteredProducts, sortConfig]);
    
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedProducts, currentPage]);
    
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const calculateDiscount = (mrp, salePrice) => {
        if (!mrp || !salePrice) return 0;
        return Math.round(((mrp - salePrice) / mrp) * 100);
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
             <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th onClick={() => requestSort('name')} className="cursor-pointer p-2">Name</th>
                        <th onClick={() => requestSort('mrp')} className="cursor-pointer p-2">MRP</th>
                        <th onClick={() => requestSort('salePrice')} className="cursor-pointer p-2">Sale Price</th>
                        <th className="p-2">Discount</th>
                        <th onClick={() => requestSort('stock')} className="cursor-pointer p-2">Stock</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts.map(product => (
                        <tr key={product.id} className="border-b">
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">₹{product.mrp?.toFixed(2)}</td>
                            <td className="p-2">₹{product.salePrice?.toFixed(2)}</td>
                            <td className="p-2">{calculateDiscount(product.mrp, product.salePrice)}%</td>
                            <td className="p-2">{product.stock}</td>
                            <td className="p-2">
                                <button className="text-blue-500">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
