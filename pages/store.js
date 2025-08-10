import Layout from '../components/layout/Layout';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductGrid from '../components/store/ProductGrid';
import { HeroCarousel } from '../components/store/HeroCarousel';
import SocialCommerceWidget from '../components/store/SocialCommerceWidget';

const StorePage = ({ products, carouselItems }) => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <HeroCarousel items={carouselItems} />
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">All Products</h2>
                    <ProductGrid products={products} />
                </div>
                <div className="mt-12">
                    <SocialCommerceWidget productUrl="https://example.com" />
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticProps() {
    if (process.env.npm_lifecycle_event === 'build') {
        return {
            props: {
                products: [],
                carouselItems: [],
            },
        };
    }

    const productsRef = collection(db, 'products');
    const productSnap = await getDocs(productsRef);
    const products = productSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const featuredRef = collection(db, 'featured');
    const featuredSnap = await getDocs(featuredRef);
    const carouselItems = featuredSnap.docs.map(doc => ({
        title: doc.data().title,
        description: doc.data().description,
        imageUrl: doc.data().imageUrl
    }));

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)), // Serialize non-serializable data
            carouselItems,
        },
        revalidate: 60,
    };
}

export default StorePage;
