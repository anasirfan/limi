'use client';
import CubeAnimation from './components/CubeAnimation';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InteractiveStory from './components/InteractiveStory';
import LightingCarousel from './components/LightingCarousel';
import LightingScene from './components/LightingScene';
import ModelSection from './components/ModelSection';
import MotiveSection from './components/MotiveSection';
import MouseTrail from './components/MouseTrail';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';

/**
 * The main entry point of the application, which renders the main sections:
 * a header, a hero section, a journey section, a model section, and a 3D scene.
 *
 * @returns {JSX.Element} The main app component.
 */
export default function Home() {
  return (
    <main>
      <SplashScreen />
      <Header />
      <HeroSection />
      <LightingCarousel />
      <MotiveSection />
      <InteractiveStory />
      <CubeAnimation />
      <ModelSection />
      <LightingScene />
      <Footer />
      <MouseTrail />
      <ScrollToTop />
    </main>
  );
}
