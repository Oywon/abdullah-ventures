import SEO from '../components/SEO';
import FounderSection from '../components/home/FounderSection';
import HeroSection from '../components/home/HeroSection';
import ContactSection from '../components/home/ContactSection';
import CompanySetup from '../components/home/CompanySetup';
import RegionalHubs from '../components/home/RegionalHubs';
import TradingSections from '../components/home/TradingSections';
import InteractiveMap from '../components/home/InteractiveMap';

const Home = () => (
  <div className="font-sans bg-white animate-fadeIn">
    <SEO title="Abdullah Ventures | Digital B2B Trade Hub | Kazi Abdullah Al Mamun" />
    <HeroSection />
    <CompanySetup />
    <RegionalHubs />
    <InteractiveMap />
    <FounderSection />
    <TradingSections />
    <ContactSection />
  </div>
);

export default Home;
