'use client';
import dynamic from 'next/dynamic';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InteractiveStory from './components/InteractiveStory';
import LightingCarousel from './components/LightingCarousel';
import LightingScene from './components/LightingScene';
import ModelSection from './components/ModelSection';
// import MotiveSection from './components/MotiveSection';
// import MouseTrail from './components/MouseTrail';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import AnalyticsInsights from './components/AnalyticsInsights';
import DistributorHub from './components/DistributorHub';
// import UserSelectionPopup from './components/UserSelectionPopup';
// import VideoHighlightsCarousel from './components/VideoHighlightsCarousel';
import { useEffect, useState, Suspense } from 'react';

// Dynamically import CubeAnimation with SSR disabled
const CubeAnimation = dynamic(() => import('./components/CubeAnimation'), { 
  ssr: false,
  loading: () => <div className="h-screen bg-[#292929]"></div>
});

/**
 * The main entry point of the application, which renders the main sections:
 * Hero, Lighting Controls, Motive, Interactive Story, and more.
 *
 * @returns {JSX.Element} The main app component.
 */
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [userType, setUserType] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showUserSelection, setShowUserSelection] = useState(false);
  
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

  // Custom hook to handle splash screen completion
  useEffect(() => {
    // Listen for splash screen completion
    const handleSplashComplete = () => {
      setShowSplash(false);
      setShowUserSelection(true);
    };

    // Create a custom event for splash screen completion
    window.addEventListener('splashComplete', handleSplashComplete);

    return () => {
      window.removeEventListener('splashComplete', handleSplashComplete);
    };
  }, []);

  // Handle user selection
  // const handleUserTypeSelect = (type) => {
  //   setUserType(type);
  //   setShowUserSelection(false);
  // };

  return (
    <main>
      <SplashScreen onComplete={() => window.dispatchEvent(new Event('splashComplete'))} />
      {/* <UserSelectionPopup isVisible={showUserSelection} onSelect={handleUserTypeSelect} /> */}
      <Header  />
      <HeroSection  />
      {/* <VideoHighlightsCarousel /> */}
      {/* <MotiveSection  /> */}
      <InteractiveStory  />
      <LightingCarousel  />
      <ModelSection  />
      
      <LightingScene  />
      <AnalyticsInsights  />
      <DistributorHub  />
      {/* {!isMobile && <MouseTrail />} */}
      <Footer  />
      <ScrollToTop />
    </main>
  );
}
