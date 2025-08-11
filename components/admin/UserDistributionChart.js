import { Doughnut } from 'react-chartjs-2';
import useAdminStats from '../../hooks/useAdminStats';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserDistributionChart = () => {
    const { stats, loading, error } = useAdminStats();

    const data = {
        labels: ['Admin', 'Captain', 'Customer'],
        datasets: [
            {
                data: [stats.userRoles?.admin, stats.userRoles?.captain, stats.userRoles?.customer],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'User Role Distribution',
            },
        },
    };
    
    if (loading) return <p>Loading chart...</p>;
    if (error) return null;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default UserDistributionChart;
