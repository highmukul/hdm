import Layout from '../components/layout/Layout';
import LandingHero from '../components/landing/LandingHero';
import FeatureSection from '../components/landing/FeatureSection';
import HowItWorks from '../components/landing/HowItWorks';
import JoinCaptain from '../components/landing/JoinCaptain';
import Testimonials from '../components/landing/Testimonials';
import CtaSection from '../components/landing/CtaSection';

export default function LandingPage() {
  return (
    <Layout homepage>
      <LandingHero />
      <FeatureSection />
      <HowItWorks />
      <JoinCaptain />
      <Testimonials />
      <CtaSection />
    </Layout>
  );
}