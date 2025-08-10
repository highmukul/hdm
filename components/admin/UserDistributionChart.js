import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserDistributionChart = ({ users }) => {
    const data = {
        labels: ['Customers', 'Captains', 'Admins'],
        datasets: [
            {
                label: 'User Roles',
                data: [
                    users.filter(u => u.role === 'customer').length,
                    users.filter(u => u.role === 'captain').length,
                    users.filter(u => u.role === 'admin').length,
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
            <Pie data={data} />
        </div>
    );
};

export default UserDistributionChart;
