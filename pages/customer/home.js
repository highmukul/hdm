import Layout from '../../components/layout/Layout';
import { HeroCarousel } from '../../components/store/HeroCarousel';
import { CategoryNav } from '../../components/store/CategoryNav';
import ProductGrid from '../../components/store/ProductGrid';
import BottomNav from '../../components/layout/BottomNav';

const CustomerHomePage = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <HeroCarousel />
                <CategoryNav />
                <ProductGrid />
            </div>
            <BottomNav />
        </Layout>
    );
};

export default CustomerHomePage;
