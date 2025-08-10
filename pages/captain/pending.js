import Layout from '../../components/layout/Layout';
import * as FiIcons from 'react-icons/fi';

const PendingPage = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center text-center p-10">
                <FiIcons.FiClock size={70} className="text-yellow-500 mb-6" />
                <h1 className="text-4xl font-bold mb-3">Your Application is Under Review</h1>
                <p className="text-lg text-gray-600 mb-8">
                    We've received your application and are currently reviewing it. 
                    This usually takes 24-48 hours. We'll notify you via email once it's approved.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
                    <div className="card text-left p-6">
                        <FiIcons.FiDollarSign className="text-2xl text-primary mb-3" />
                        <h3 className="font-bold text-lg">Earn Good Money</h3>
                        <p className="text-sm text-text-secondary">Make competitive earnings with flexible hours.</p>
                    </div>
                    <div className="card text-left p-6">
                        <FiIcons.FiZap className="text-2xl text-primary mb-3" />
                        <h3 className="font-bold text-lg">Deliver with Pride</h3>
                        <p className="text-sm text-text-secondary">Be a vital part of your community, delivering essentials.</p>
                    </div>
                    <div className="card text-left p-6">
                        <FiIcons.FiShield className="text-2xl text-primary mb-3" />
                        <h3 className="font-bold text-lg">Safety First</h3>
                        <p className="text-sm text-text-secondary">We provide support and resources to keep you safe on the road.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PendingPage;
