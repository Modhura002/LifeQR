import Hero from '../sections/Hero';
import Problem from '../sections/Problem';
import HowItWorks from '../sections/HowItWorks';
import Features from '../sections/Features';
import DemoProfile from '../sections/DemoProfile';
import ScanPreview from '../sections/ScanPreview';
import Benefits from '../sections/Benefits';
import Trust from '../sections/Trust';
import CallToAction from '../sections/CallToAction';

const Home = () => {
  return (
    <main>
      <Hero />
      <div id="problem"><Problem /></div>
      <div id="how-it-works"><HowItWorks /></div>
      <div id="features"><Features /></div>
      <div id="demo"><DemoProfile /></div>
      <ScanPreview />
      <Benefits />
      <Trust />
      <CallToAction />
    </main>
  );
};

export default Home;
