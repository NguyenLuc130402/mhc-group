import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Intro from '../components/Intro/Intro';
import Stats from '../components/Stats/Stats';
import Services from '../components/Services/Services';
import About from '../components/About/About';
import DarkFeature from '../components/DarkFeature/DarkFeature';
import Partners from '../components/Partners/Partners';
import Team from '../components/Team/Team';
import CTABanner from '../components/CTABanner/CTABanner';
import Footer from '../components/Footer/Footer';
import ChatBubble from '../components/ChatBubble/ChatBubble';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Stats />
        <Services />
        <About />
        <DarkFeature />
        <Partners />
        <Team />
        <CTABanner />
      </main>
      <Footer />
      <ChatBubble />
    </>
  );
}
