'use client';
import CubeAnimation from './components/CubeAnimation';
import CubeAnimation1 from './components/CubeAnimation1';
// import CursorTrailEffect from './components/CursorTrailEffect';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InteractiveStory from './components/InteractiveStory';
// import JourneySection from './components/JourneyHeading';
// import LightActivation from './components/LightActivation';
import LightingScene from './components/LightingScene';
import ModelSection from './components/ModelSection';
import MotiveSection from './components/MotiveSection';
import MouseTrail from './components/MouseTrail';
// import Scene3D from './components/Scene3D';
import ScrollToTop from './components/ScrollToTop';
// import VideoScrub from './components/VideoScrub';
// import Scene from './components/Scene';
// import Scene3D from './components/Scene3D';



/**
 * The main entry point of the application, which renders the main sections:
 * a header, a hero section, a journey section, a model section, and a 3D scene.
 *
 * @returns {JSX.Element} The main app component.
 */
export default function Home() {
  return (
    <main>
    <MouseTrail />
    {/* <CursorTrailEffect 
  color="rgba(255, 255, 255, 0.9)"
  blendMode="source-over"
/> */}
      <Header />
      <HeroSection />
      <MotiveSection />
      <InteractiveStory />
      {/* <VideoScrub /> */}
      {/* <LightActivation /> */}
      {/* <CubeAnimation/> */}
      <CubeAnimation />
      {/* <EcoSystem /> */}
      {/* <JourneySection /> */}
      <ModelSection />
      <LightingScene />
      <Footer />
      <ScrollToTop />
      {/* <Scene3D /> */}
    </main>
  );
}
