import PredictionHistory from "./components/PredictionHistory";
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import ModelInfo from '@/components/ModelInfo';
import HowItWorks from '@/components/HowItWorks';
import Assessment from '@/components/Assessment';
import Footer from '@/components/Footer';


export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <Navigation />
      <main>
        <Hero />
        <Introduction />
        <ModelInfo />
        <HowItWorks />
        <Assessment />
        <PredictionHistory />
      </main>
      <Footer />
    </div>
  );
}
