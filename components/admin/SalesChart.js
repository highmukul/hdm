import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = ({ salesData }) => {
    const [dateRange, setDateRange] = useState('all');

    const filteredSalesData = salesData.filter(d => {
        if (dateRange === 'all') return true;
        const date = new Date(d.date);
        const today = new Date();
        if (dateRange === '7') return date > new Date(today.setDate(today.getDate() - 7));
        if (dateRange === '30') return date > new Date(today.setDate(today.getDate() - 30));
        return true;
    });

    const data = {
        labels: filteredSalesData.map(d => d.date),
        datasets: [
            {
                label: 'Sales (₹)',
                data: filteredSalesData.map(d => d.total),
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.3
            }
        ]
    };
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales',
                font: { size: 18 }
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg h-96"
        >
            <div className="flex justify-end mb-4">
                <select onChange={(e) => setDateRange(e.target.value)} className="p-2 border rounded">
                    <option value="all">All Time</option>
                    <option value="30">Last 30 Days</option>
                    <option value="7">Last 7 Days</option>
                </select>
            </div>
            <Line data={data} options={options} />
        </motion.div>
    );
};

export default SalesChart;
