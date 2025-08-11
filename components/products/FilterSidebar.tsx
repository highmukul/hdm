import { useState, useEffect, ChangeEvent } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import React from 'react';

interface Category extends DocumentData {
    id: string;
    name: string;
}

interface Filters {
    storeId?: string;
    category: string;
    sortBy: string;
    search: string;
    priceRange: number[];
}

interface FilterSidebarProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            const snapshot = await getDocs(collection(db, 'categories'));
            setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category)));
        };
        fetchCategories();
    }, []);

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value, 10)] }));
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

            <div className="mb-6">
                <label htmlFor="price" className="font-semibold block mb-2 text-on-surface-light dark:text-on-surface-dark">
                    Price Range: ₹{filters.priceRange[1]}
                </label>
                <input
                    type="range"
                    id="price"
                    name="price"
                    min="0"
                    max="10000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
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
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSidebar;
