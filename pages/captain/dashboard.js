import CaptainLayout from '../../components/captain/CaptainLayout';
import OrderMap from '../../components/captain/OrderMap';
import withCaptainProfile from '../../components/hoc/withCaptainProfile';

const CaptainDashboardPage = () => {
    return (
        <CaptainLayout>
            {/* The main component is now the interactive map */}
            <OrderMap />
        </CaptainLayout>
    );
};

// Wrap the dashboard with the HOC to enforce profile completion
export default withCaptainProfile(CaptainDashboardPage);