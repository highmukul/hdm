import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const FilterSidebar = ({ filters, setFilters }) => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            const snapshot = await getDocs(collection(db, 'categories'));
            setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchCategories();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm sticky top-28">
            <h3 className="text-xl font-bold mb-4 text-on-surface-light dark:text-on-surface-dark">Filters</h3>
            
            <div className="mb-6">
                <label htmlFor="search" className="font-semibold block mb-2 text-on-surface-light dark:text-on-surface-dark">Search</label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded-md bg-background-light dark:bg-background-dark text-on-background-light dark:text-on-background-dark"
                    placeholder="Search products..."
                />
            </div>

            <div className="mb-6">
                <label htmlFor="category" className="font-semibold block mb-2 text-on-surface-light dark:text-on-surface-dark">Category</label>
                <select
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded-md bg-background-light dark:bg-background-dark text-on-background-light dark:text-on-background-dark"
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="sortBy" className="font-semibold block mb-2 text-on-surface-light dark:text-on-surface-dark">Sort By</label>
                <select
                    id="sortBy"
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded-md bg-background-light dark:bg-background-dark text-on-background-light dark:text-on-background-dark"
                >
                    <option value="createdAt-desc">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSidebar;
