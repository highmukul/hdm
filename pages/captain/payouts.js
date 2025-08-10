import CaptainLayout from '../../components/captain/CaptainLayout';
import PayoutHistory from '../../components/captain/PayoutHistory';

const PayoutsPage = () => {
    return (
        <CaptainLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">My Payouts</h1>
                <PayoutHistory />
            </div>
        </CaptainLayout>
    );
};

export default PayoutsPage;
