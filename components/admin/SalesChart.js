import { Line } from 'react-chartjs-2';
import useAdminStats from '../../hooks/useAdminStats';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
    const { stats, loading, error } = useAdminStats();

    const data = {
        labels: stats.salesByDay?.map(s => s.date) || [],
        datasets: [
            {
                label: 'Daily Sales',
                data: stats.salesByDay?.map(s => s.total) || [],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.3,
            },
        ],
    };
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Over Time',
            },
        },
    };

    if (loading) return <p>Loading chart...</p>;
    if (error) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <Line data={data} options={options} />
        </div>
    );
};

export default SalesChart;
