import Layout from '../components/layout/Layout';
import { HeroCarousel } from '../components/store/HeroCarousel';
import { SocialCommerceWidget } from '../components/store/SocialCommerceWidget';
import ProductGrid from '../components/store/ProductGrid';
import { CategoryNav } from '../components/store/CategoryNav';

const StorePage = () => {
    return (
        <Layout>
            <CategoryNav />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <HeroCarousel />
                <SocialCommerceWidget />
                <ProductGrid />
            </div>
        </Layout>
    );
};

export default StorePage;
