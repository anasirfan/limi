"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const visualsRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Steps data with enhanced descriptions focusing on ease and benefits
  const steps = [
    {
      id: 1,
      title: "Install the Base",
      description: "Mount the smart base on your ceiling – no re-wiring needed, ready in minutes.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      animation: "base-install",
      highlight: "Zero-config installation",
      benefit: "No electrician required"
    },
    {
      id: 2,
      title: "Attach a Pendant",
      description: "Simply snap in your chosen light module – the LIMI connector does the rest.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M12 2V6" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 18V22" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.93 4.93L7.76 7.76" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.24 16.24L19.07 19.07" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12H6" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 12H22" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.93 19.07L7.76 16.24" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.24 7.76L19.07 4.93" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      animation: "pendant-attach",
      highlight: "Plug-and-play setup",
      benefit: "Swap pendants anytime for a new look"
    },
    {
      id: 3,
      title: "Connect & Setup",
      description: "Open the LIMI app and scan the code – instant pairing, no complicated setup.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <rect x="5" y="2" width="14" height="20" rx="2" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 18H12.01" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      animation: "app-connect",
      highlight: "One-tap connection",
      benefit: "Everything works seamlessly via one app"
    },
    {
      id: 4,
      title: "Personalize & Enjoy",
      description: "Adjust brightness and color in the app, or let it auto-adapt to your routine.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#54BB74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      animation: "light-personalize",
      highlight: "Smart adaptation",
      benefit: "Your light, your way – with zero hassle"
    }
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Create refs array for steps
    stepsRef.current = stepsRef.current.slice(0, steps.length);
    
    // Basic scroll trigger for step transitions
    if (sectionRef.current && typeof window !== 'undefined') {
      // Set up scroll-based animations for steps
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        
        // Create ScrollTrigger for each step
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 30%",
          onEnter: () => setCurrentStep(index),
          onEnterBack: () => setCurrentStep(index),
          markers: false
        });
      });
    }
    
    return () => {
      // Clean up ScrollTrigger instances
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [steps.length]);

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="min-h-screen bg-[#292929] text-white py-20 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#54BB74] blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#54BB74] blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            LIMI is designed for simplicity. Set up your smart lighting in minutes, not hours.
            No electrician required, no complicated wiring, just plug-and-play smart lighting.
          </p>
        </div>
        
        {/* Scrollytelling content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-16">
          {/* Left side: Steps */}
          <div className="lg:col-span-2 space-y-24 md:space-y-32 py-8">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                ref={el => stepsRef.current[index] = el}
                className={`step-item transition-all duration-500 ${currentStep === index ? 'scale-105' : 'scale-100 opacity-70'}`}
              >
                <div className="flex items-start mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#54BB74] flex items-center justify-center mr-4 text-xl font-bold shadow-lg">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{step.title}</h3>
                    <p className="text-lg text-gray-300">{step.description}</p>
                  </div>
                </div>
                
                <div className="ml-18 pl-4 border-l-2 border-[#54BB74] mt-4">
                  <div className="bg-[#54BB74]/10 rounded-lg px-4 py-2 mb-2 inline-block">
                    <span className="font-medium text-[#54BB74]">{step.highlight}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{step.benefit}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side: Visuals */}
          <div ref={visualsRef} className="lg:col-span-3 relative h-[500px] md:h-[700px] sticky top-20">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  currentStep === index 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
                }`}
              >
                <div className="relative h-full w-full rounded-xl overflow-hidden shadow-2xl bg-[#232323]">
                  {/* Animated illustration for each step */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#292929] z-10"></div>
                  
                  {/* Step 1: Base Installation Animation */}
                  {index === 0 && (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="relative w-full max-w-md aspect-square">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-48 rounded-full bg-[#1a1a1a] shadow-inner flex items-center justify-center">
                            <div className="w-32 h-8 bg-[#333] rounded-lg relative">
                              {/* Base mounting animation */}
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-24 flex items-center justify-center">
                                <div className="w-16 h-16 bg-[#54BB74] rounded-full animate-pulse shadow-lg shadow-[#54BB74]/30"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center w-full">
                          <p className="text-lg font-medium text-[#54BB74]">No re-wiring needed</p>
                          <p className="text-sm text-gray-400 mt-1">Ready in minutes</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Pendant Attachment Animation */}
                  {index === 1 && (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="relative w-full max-w-md aspect-square">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-16 h-16 bg-[#54BB74] rounded-full mb-2"></div>
                            <div className="w-2 h-24 bg-[#444] mx-auto relative">
                              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#666] rounded-full animate-bounce shadow-lg"></div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center w-full">
                          <p className="text-lg font-medium text-[#54BB74]">Snap-in connection</p>
                          <p className="text-sm text-gray-400 mt-1">Swap anytime for a new look</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: App Connection Animation */}
                  {index === 2 && (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="relative w-full max-w-md aspect-square">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-48 h-80 bg-[#333] rounded-3xl border-4 border-[#444] p-3 relative">
                              <div className="w-full h-full bg-[#222] rounded-2xl flex flex-col items-center justify-center p-4">
                                <div className="w-24 h-24 bg-[#54BB74] rounded-full mb-4 animate-pulse"></div>
                                <div className="w-32 h-2 bg-[#54BB74] rounded-full mb-2"></div>
                                <div className="w-24 h-2 bg-[#444] rounded-full mb-6"></div>
                                <div className="w-32 h-8 bg-[#54BB74] rounded-full flex items-center justify-center">
                                  <span className="text-xs">CONNECT</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center w-full">
                          <p className="text-lg font-medium text-[#54BB74]">One-tap connection</p>
                          <p className="text-sm text-gray-400 mt-1">No complicated setup</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Personalization Animation */}
                  {index === 3 && (
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <div className="relative w-full max-w-md aspect-square">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="w-64 h-64 rounded-full bg-[#333] flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 opacity-30"></div>
                              <div className="w-48 h-48 rounded-full bg-[#222] flex items-center justify-center z-10">
                                <div className="w-32 h-32 rounded-full bg-[#54BB74] animate-pulse shadow-lg shadow-[#54BB74]/30 flex items-center justify-center">
                                  <div className="w-24 h-24 rounded-full bg-[#222] flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/80"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center w-full">
                          <p className="text-lg font-medium text-[#54BB74]">Smart adaptation</p>
                          <p className="text-sm text-gray-400 mt-1">Your light, your way</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Step indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {steps.map((step, index) => (
                <button 
                  key={step.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentStep === index ? 'bg-[#54BB74] w-6' : 'bg-gray-600'}`}
                  onClick={() => {
                    // Scroll to the corresponding step
                    if (stepsRef.current[index]) {
                      stepsRef.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  aria-label={`Go to step ${step.id}: ${step.title}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="text-center mt-20">
          <p className="text-xl text-gray-300 mb-6">Ready to experience the future of lighting?</p>
          <a 
            href="#interactive-configurator" 
            className="inline-block px-8 py-3 bg-[#54BB74] text-white rounded-full hover:bg-[#3a8351] transition-colors text-lg font-medium"
          >
            Design Your Light
          </a>
        </div>
      </div>
    </section>
  );
}
