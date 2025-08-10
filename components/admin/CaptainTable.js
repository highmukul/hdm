import React from 'react';
import * as FaIcons from 'react-icons/fa';

const CaptainTable = ({ captains, onApprove, onReject }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {captains.map(captain => (
                        <tr key={captain.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{captain.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{captain.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    captain.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    captain.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {captain.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {captain.status === 'pending' && (
                                    <>
                                        <button onClick={() => onApprove(captain.id)} className="text-green-600 hover:text-green-900 mr-3"><FaIcons.FaCheck /></button>
                                        <button onClick={() => onReject(captain.id)} className="text-red-600 hover:text-red-900"><FaIcons.FaTimes /></button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CaptainTable;
