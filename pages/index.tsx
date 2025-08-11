import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import ProductShowcase from '../components/home/ProductShowcase';
import Features from '../components/home/Features';
import JoinCaptain from '../components/home/JoinCaptain';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <CategoryGrid />
      <ProductShowcase />
      <Features />
      <JoinCaptain />
    </Layout>
  );
}

export default HomePage;
