'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StorySection from './components/StorySection';
import ProgressTimeline from './components/ProgressTimeline';
import InteractiveIframe from './components/InteractiveIframe';
import ParticleBackground from './components/ParticleBackground';
import SoundEffects from './components/SoundEffects';
import LazySection from './components/LazySection';
import { storyData } from './data/storyData';

gsap.registerPlugin(ScrollTrigger);

// LimiAIStoryPage: Cinematic storytelling with scroll-triggered iframe messaging
export default function LimiAIStoryPage() {
  // Memoized handler for section interactions (analytics/sound only)
  const handleInteraction = useCallback((type, data) => {
    setLastInteraction({ type, data, timestamp: Date.now() });
  }, []);
  const [currentSectionId, setCurrentSectionId] = useState('intro');
  const [currentStage, setCurrentStage] = useState('brand');
  const [iframeReady, setIframeReady] = useState(false);
  // Used for sound/analytics, not for message sending
  const [lastInteraction, setLastInteraction] = useState(null);
  const iframeRef = useRef();
  const containerRef = useRef();
  const scrollRef = useRef(); // For the right scrollable column

  // Set up scroll triggers for carousel-like experience
  useEffect(() => {
    if (!iframeReady) return;

    // Create invisible scroll sections for triggering content changes
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const triggers = storyData.sections.map((section, index) => {
      const sectionHeight = window.innerHeight; // Each section takes full viewport height
      const startPosition = index * sectionHeight;
      const endPosition = (index + 1) * sectionHeight;

      return ScrollTrigger.create({
        trigger: scrollContainer,
        start: `${startPosition}px top`,
        end: `${endPosition}px top`,
        onEnter: () => {
          setCurrentStage(section.stage);
          setCurrentSectionId(section.id);
        },
        onEnterBack: () => {
          setCurrentStage(section.stage);
          setCurrentSectionId(section.id);
        },
        onUpdate: (self) => {
          // Smooth transition based on scroll progress
          const progress = self.progress;
          const currentIndex = storyData.sections.findIndex(s => s.id === section.id);
          
          if (self.isActive) {
            setCurrentStage(section.stage);
            setCurrentSectionId(section.id);
          }
        }
      });
    });

    // Set container height to enable scrolling through all sections
    const totalHeight = storyData.sections.length * window.innerHeight;
    scrollContainer.style.height = `${totalHeight}px`;

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [iframeReady]);


  // Listen for iframe ready message
  useEffect(() => {
    function handleMessage(event) {
      if (event.data === 'app:ready1') {
        setIframeReady(true);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);


  return (
    <>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .story-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div ref={containerRef} className="story-container relative bg-[#292929]" style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {/* Particle Background */}
        <ParticleBackground currentStage={currentStage} density={30} />
        
        {/* Sound Effects */}
        <SoundEffects currentStage={currentStage} interactions={lastInteraction} />
        
        {/* Progress Timeline */}
        <ProgressTimeline currentSectionId={currentSectionId} sections={storyData.sections} iframeRef={iframeRef} />
      
      {/* Main Layout */}
      <div className="flex h-screen fixed inset-0">
        {/* Left: Fixed 3D Iframe */}
        <div className="w-1/2 h-full z-10">
          <InteractiveIframe 
            ref={iframeRef} 
            currentStage={currentStage}
            onReady={() => setIframeReady(true)}
          />
        </div>
        
        {/* Right: Fixed Story Content Carousel */}
        <div className="w-1/2 h-full relative z-20 overflow-hidden">
          <div className="absolute inset-0">
            {storyData.sections.map((section, index) => {
              const isActive = section.id === currentSectionId;
              return (
                <div
                  key={section.id}
                  className={`absolute inset-0 transition-all duration-800 ease-out ${
                    isActive 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-0 transform translate-x-full pointer-events-none'
                  }`}
                  style={{
                    transitionDelay: isActive ? '100ms' : '0ms'
                  }}
                >
                  <div className="h-full overflow-y-auto scrollbar-hide" style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}>
                    <StorySection 
                      {...section} 
                      index={index}
                      onInteraction={handleInteraction}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Responsive Layout */}
      <div className="lg:hidden">
        <div className="pt-[50vh]">
          {storyData.sections.map((section, index) => (
            <StorySection 
              key={`mobile-${section.id}`} 
              {...section} 
              index={index}
              mobile={true}
              onInteraction={handleInteraction}
            />
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
