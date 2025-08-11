import { useState, useMemo } from 'react';
import useAdminData from '../../hooks/useAdminData';
import Link from 'next/link';

const CaptainTable = () => {
    const { data: captains, loading, error } = useAdminData('captains');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const filteredCaptains = useMemo(() => {
        return captains.filter(captain => 
            captain.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [captains, searchTerm]);

    const sortedCaptains = useMemo(() => {
        let sortableCaptains = [...filteredCaptains];
        if (sortConfig.key) {
            sortableCaptains.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableCaptains;
    }, [filteredCaptains, sortConfig]);
    
    const paginatedCaptains = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedCaptains.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedCaptains, currentPage]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    if (loading) return <p>Loading captains...</p>;
    if (error) return <p className="text-red-500">{error.message}</p>;

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
                        <th onClick={() => requestSort('fullName')} className="cursor-pointer p-2">Name</th>
                        <th onClick={() => requestSort('status')} className="cursor-pointer p-2">Status</th>
                        <th onClick={() => requestSort('totalEarnings')} className="cursor-pointer p-2">Total Earned</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCaptains.map(captain => (
                        <tr key={captain.id} className="border-b">
                            <td className="p-2">{captain.fullName}</td>
                            <td className="p-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    captain.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    captain.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {captain.status}
                                </span>
                            </td>
                            <td className="p-2">₹{captain.totalEarnings?.toFixed(2) || 0}</td>
                            <td className="p-2">
                                <Link href={`/admin/captains/${captain.id}`} legacyBehavior>
                                    <a className="text-indigo-600 hover:underline">Review</a>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CaptainTable;
