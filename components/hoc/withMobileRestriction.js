import { useDeviceDetection } from '../../hooks/useDeviceDetection';
import Image from 'next/image';
import Layout from '../layout/Layout';

export const MobileRestriction = ({ children, pageName }) => {
    const { isMobile } = useDeviceDetection();

    if (isMobile) {
        return <>{children}</>;
    }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center text-center py-20">
                <Image src="/mobile-only.svg" alt="Mobile Phone" width={200} height={200} />
                <h1 className="text-3xl font-bold mt-8 mb-4">A Mobile-First Experience</h1>
                <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
                    To access the {pageName}, please switch to your smartphone. We&apos;ve designed a seamless experience for you on the go.
                </p>
                <p className="text-sm text-gray-500">
                    You can still browse our products, but checkout is only available on mobile devices.
                </p>
            </div>
        </Layout>
    );
};
