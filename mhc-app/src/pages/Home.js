import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Services from '../components/Services/Services';
import About from '../components/About/About';
import DarkFeature from '../components/DarkFeature/DarkFeature';
import Partners from '../components/Partners/Partners';
import ToolReviews from '../components/ToolReviews/ToolReviews';
import CTABanner from '../components/CTABanner/CTABanner';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <About />
        <DarkFeature />
        <Partners />
        <ToolReviews />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
