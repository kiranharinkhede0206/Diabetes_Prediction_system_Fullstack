import { useState } from 'react';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import ModelInfo from '@/components/ModelInfo';
import HowItWorks from '@/components/HowItWorks';
import Assessment from '@/components/Assessment';
import PredictionHistory from '@/components/PredictionHistory';
import Footer from '@/components/Footer';

export default function App() {
  const [historyRefresh, setHistoryRefresh] = useState(0);

  function handlePredictionCreated() {
    setHistoryRefresh((prev) => prev + 1);
  }

  return (
    <div className="min-h-screen bg-ink text-paper">
      <Navigation />

      <main>
        <Hero />
        <Introduction />
        <ModelInfo />
        <HowItWorks />

        <Assessment onPredictionCreated={handlePredictionCreated} />

        <PredictionHistory refreshTrigger={historyRefresh} />
      </main>

      <Footer />
    </div>
  );
}
