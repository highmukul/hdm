import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductShowcase from '../components/home/ProductShowcase';
import Features from '../components/home/Features';
import JoinCaptain from '../components/home/JoinCaptain';
import { getDocs, collection, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function HomePage({ featuredProducts }) {
  return (
    <Layout>
      <Hero />
      <CategoryGrid />
      <ProductShowcase products={featuredProducts} />
      <Features />
      <JoinCaptain />
    </Layout>
  );
}

export async function getStaticProps() {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('isFeatured', '==', true), limit(10));
  const querySnapshot = await getDocs(q);
  const featuredProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return {
    props: {
      featuredProducts,
    },
    revalidate: 60, // Re-generate the page every 60 seconds
  };
}
