import { useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Stats from '../components/landing/Stats';
import TechSection from '../components/landing/TechSection';
import Footer from '../components/landing/Footer';

export default function LandingPage({ onLaunch }) {
  // Allow scrolling on the landing page
  useEffect(() => {
    document.body.classList.remove('app-page');
    return () => {};
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-base)' }}>
      <Navbar onLaunch={onLaunch} />
      <Hero onLaunch={onLaunch} />
      <Features />
      <HowItWorks />
      <Stats />
      <TechSection />
      <Footer onLaunch={onLaunch} />
    </div>
  );
}
