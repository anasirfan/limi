'use client';
import dynamic from 'next/dynamic';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductShowcase from './components/ProductShowcase';
import HowItWorks from './components/HowItWorks';
import InteractiveConfigurator from './components/InteractiveConfigurator';
import OurStory from './components/OurStory';
import TimelineAchievements from './components/TimelineAchievements';
import TransitionLayout from './components/TransitionLayout';
import SectionNavigation from './components/SectionNavigation';

// Commented out sections as requested
// import InteractiveStory from './components/InteractiveStory';
// import LightingCarousel from './components/LightingCarousel';
// import LightingScene from './components/LightingScene';
// import ModelSection from './components/ModelSection';
// import MotiveSection from './components/MotiveSection';
// import MouseTrail from './components/MouseTrail';
// import AnalyticsInsights from './components/AnalyticsInsights';
// import DistributorHub from './components/DistributorHub';
// import LightingStyleCompare from './components/LightingStyleCompare';
// import ProductCategories from './components/ProductCategories';
// import PortalCTA from './components/PortalCTA';
// import ConfiguratorPreview from './components/ConfiguratorPreview';
// import VideoHighlightsCarousel from './components/VideoHighlightsCarousel';

import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import CookieConsent from './components/CookieConsent';
import { useEffect, useState, Suspense } from 'react';
import { initTracking, sendTrackingData, cleanupTracking } from './services/trackingService';
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
  const [hideNavFooter, setHideNavFooter] = useState(false);

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
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (urlToken) {
      setHideNavFooter(true);
    }
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

  // Handle tracking consent
  const handleTrackingConsent = () => {
    initTracking();
  };

  // Check if consent was previously given and initialize tracking if needed
  useEffect(() => {
    const consentStatus = localStorage.getItem('cookieConsent');
    if (consentStatus === 'true') {
      initTracking();
      
    }
    
    // Cleanup tracking on component unmount
    return () => {
      cleanupTracking();
    };
  }, []);

  return (
    <main>
      <SplashScreen onComplete={() => window.dispatchEvent(new Event('splashComplete'))} />
      {/* <UserSelectionPopup isVisible={showUserSelection} onSelect={handleUserTypeSelect} /> */}
      { !hideNavFooter && <Header /> }
      
        <HeroSection />
        <ProductShowcase />
        <HowItWorks  />
        <InteractiveConfigurator />
        <OurStory />
        <TimelineAchievements />
        {/* Commented out sections as requested
        <InteractiveStory />
        <LightingCarousel />
        <ModelSection />
        <VideoHighlightsCarousel />
        <LightingScene />
        <ProductCategories />
        <PortalCTA />
        <ConfiguratorPreview />
        <AnalyticsInsights />
        <DistributorHub />
        */}
  
      {/* {!isMobile && <MouseTrail />} */}
      { !hideNavFooter && <Footer /> }
      <SectionNavigation />
      {/* <ScrollToTop /> */}
      <CookieConsent onAccept={handleTrackingConsent} onDecline={() => {}} />
    </main>
  );
}
