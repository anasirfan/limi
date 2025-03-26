'use client';
import CubeAnimation from './components/CubeAnimation';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InteractiveStory from './components/InteractiveStory';
// import LightingCarousel from './components/LightingCarousel';
import LightingScene from './components/LightingScene';
import ModelSection from './components/ModelSection';
import MotiveSection from './components/MotiveSection';
import MouseTrail from './components/MouseTrail';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import { useEffect, useState } from 'react';

/**
 * The main entry point of the application, which renders the main sections:
 * Hero, Lighting Controls, Motive, Interactive Story, and more.
 *
 * @returns {JSX.Element} The main app component.
 */
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // Initial check
    checkMobile();
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <main>
      <SplashScreen />
      <Header />
      <HeroSection />
      {/* <LightingCarousel /> */}
      {/* <MotiveSection /> */}
      {/* <InteractiveStory /> */}
      {/* <CubeAnimation /> */}
      {/* <ModelSection /> */}
      {/* <LightingScene /> */}
      {/* {!isMobile && <MouseTrail />} */}
      <Footer />
      <ScrollToTop />
    </main>
  );
}
