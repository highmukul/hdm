import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useProducts } from '/hooks/useProducts';

import Link from 'next/link';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const { products } = useProducts();

    useEffect(() => {
        if (searchTerm.length > 2) {
            const searchResults = products.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 5); // Limit to top 5 results for dropdown
            setResults(searchResults);
        } else {
            setResults([]);
        }
    }, [searchTerm, products]);

    return (
        <div className="relative w-full max-w-lg">
            <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
            </div>

            {results.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                    <ul>
                        {results.map(product => (
                            <li key={product.id}>
                                <Link href={`/products/${product.id}`}>
                                    <a className="block px-4 py-3 hover:bg-gray-100">{product.name}</a>
                                </Link>
                            </li>
                        ))}
                         <li >
                            <Link href={`/search?q=${searchTerm}`}>
                                <a className="block px-4 py-3 text-center bg-gray-50 hover:bg-gray-200 font-semibold text-indigo-600">View all results</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Search;