import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import DetectionPage from './pages/DetectionPage';

export default function App() {
  const [page, setPage] = useState('landing');

  return (
    <AnimatePresence mode="wait">
      {page === 'landing' ? (
        <LandingPage key="landing" onLaunch={() => setPage('app')} />
      ) : (
        <DetectionPage key="app" onBack={() => setPage('landing')} />
      )}
    </AnimatePresence>
  );
}
