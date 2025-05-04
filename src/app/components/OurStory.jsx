'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import GSAP to avoid hydration errors
const gsapWithPlugins = dynamic(() => {
  const gsapModule = import('gsap');
  import('gsap/ScrollTrigger').then(module => {
    const gsap = gsapModule.default;
    gsap.registerPlugin(module.ScrollTrigger);
    return gsap;
  });
  return gsapModule;
}, { ssr: false });

// GSAP will be registered in the dynamic import

// Team member data
const teamMembers = [
  {
    name: 'Emma Chen',
    title: 'Founder & Lead Designer',
    fact: 'Ex-Philips Hue Design Lead',
    image: '/images/team/team-1.jpg',
    linkedin: 'https://linkedin.com/in/emmalimi',
    bio: 'Emma founded LIMI after 8 years revolutionizing smart lighting at Philips. She believes beautiful design and cutting-edge technology should be inseparable.',
    achievement: 'Led the design of our flagship pendant series in just 6 weeks'
  },
  {
    name: 'Marcus Patel',
    title: 'CTO',
    fact: 'Built 3 IoT products before LIMI',
    image: '/images/team/team-2.jpg',
    linkedin: 'https://linkedin.com/in/marcuslimi',
    bio: 'With a background in electrical engineering and IoT development, Marcus oversees all technical aspects of LIMI products and ecosystem.',
    achievement: 'Developed our proprietary light control algorithm with 40% better energy efficiency'
  },
  {
    name: 'Sofia Rodriguez',
    title: 'Head of Product',
    fact: 'Smart Home Innovation Award Winner',
    image: '/images/team/team-3.jpg',
    linkedin: 'https://linkedin.com/in/sofialimi',
    bio: 'Sofia brings her expertise in product management and user experience to ensure LIMI products are both intuitive and revolutionary.',
    achievement: 'Created our user testing program across 3 countries'
  },
  {
    name: 'David Kim',
    title: 'Lead Engineer',
    fact: 'Former Tesla Energy Systems Engineer',
    image: '/images/team/team-4.jpg',
    linkedin: 'https://linkedin.com/in/davidlimi',
    bio: 'David brings his background in energy systems and hardware engineering to help LIMI create efficient, sustainable lighting solutions.',
    achievement: 'Built our 500m² prototype showroom in under 30 days'
  }
];

// Advisor and partner logos
const partners = [
  { name: 'TechStars', logo: '/images/partners/techstars.svg' },
  { name: 'Smart Home Alliance', logo: '/images/partners/sha.svg' },
  { name: 'Design Institute', logo: '/images/partners/design-institute.svg' }
];

// Stats data
const stats = [
  { label: 'Team members', value: 12 },
  { label: 'Countries', value: 3 },
  { label: 'Development', value: '24/7' },
  { label: 'Prototypes', value: 47 },
  { label: 'Patents pending', value: 5 }
];

// Community options
const communityOptions = [
  { name: 'LIMI Club', description: 'Join our community for exclusive updates and early access' },
  { name: 'The Luminaries', description: 'Be part of our enlightened group of early adopters' },
  { name: 'LIMI Collective', description: 'Connect with like-minded design & tech enthusiasts' }
];

export default function OurStory() {
  const sectionRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const communityRef = useRef(null);
  const statsRef = useRef(null);
  const [activeTeamMember, setActiveTeamMember] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState('LIMI Club');
  const [showAchievement, setShowAchievement] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Function to handle community selection
  const handleCommunitySelect = (name) => {
    setSelectedCommunity(name);
  };
  
  // Function to toggle achievement display
  const toggleAchievement = (index) => {
    setShowAchievement(showAchievement === index ? null : index);
  };

  useEffect(() => {
    // Only run animations on the client side
    if (typeof window === 'undefined') return;
    
    // Import GSAP and ScrollTrigger dynamically
    const initAnimations = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);
      
      // Animation for mission section
      if (missionRef.current) {
        gsap.fromTo(
          missionRef.current.querySelectorAll('.animate-in'),
          { 
            y: 50, 
            opacity: 0 
          },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.2, 
            duration: 0.8, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: missionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Animation for team section
      if (teamRef.current) {
        gsap.fromTo(
          teamRef.current.querySelectorAll('.team-member'),
          { 
            y: 30, 
            opacity: 0 
          },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.15, 
            duration: 0.6, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: teamRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Animation for community section
      if (communityRef.current) {
        gsap.fromTo(
          communityRef.current,
          { 
            y: 40, 
            opacity: 0 
          },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: communityRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Animation for stats
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        
        gsap.fromTo(
          statItems,
          { scale: 0.9, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            stagger: 0.2, 
            duration: 0.6, 
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Count-up animation for stats
        statItems.forEach(item => {
          const valueElement = item.querySelector('.stat-value');
          if (valueElement) {
            const finalValue = valueElement.getAttribute('data-value');
            
            if (!isNaN(parseInt(finalValue))) {
              const value = { val: 0 };
              gsap.to(value, {
                val: parseInt(finalValue),
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: statsRef.current,
                  start: 'top 85%',
                  toggleActions: 'play none none none'
                },
                onUpdate: function() {
                  if (valueElement) {
                    valueElement.textContent = Math.round(value.val);
                  }
                }
              });
            }
          }
        });
      }

      // Return cleanup function
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    // Initialize animations
    const cleanup = initAnimations();
    
    // Clean up animations
    return () => {
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(cleanupFn => {
          if (cleanupFn && typeof cleanupFn === 'function') {
            cleanupFn();
          }
        });
      }
    };
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Simple version for server-side rendering to avoid hydration mismatch
  if (!isMounted) {
    return (
      <section className="relative bg-[#1F1F1F] text-white py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Lighting That Adapts to You</h2>
          </div>
          <div className="mb-24">
            <h3 className="text-3xl font-bold text-center mb-4">The People Behind the Light</h3>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              We're a team of designers, engineers, and dreamers who believe light should be limitless.
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  // Full version for client-side rendering
  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#1F1F1F] text-white py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#292929] to-[#1F1F1F] opacity-70"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 20px 20px, #54BB74 2px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Background video */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#292929] to-[#1F1F1F] opacity-90 z-10"></div>
          <div className="relative h-full w-full">
            {videoPlaying && (
              <video 
                className="absolute w-full h-full object-cover" 
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/videos/team-workshop.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-[url('/images/team-workshop.jpg')] bg-cover bg-center opacity-60"></div>
          </div>
        </div>
        
        {/* Mission Section */}
        <div ref={missionRef} className="max-w-4xl mx-auto text-center mb-24 relative">
          <div className="inline-block mb-6">
            <div className="w-16 h-16 bg-[#54BB74]/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-in">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#54BB74]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-in">
            Lighting That Adapts to You
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-in">
            LIMI was born from the idea that lighting should be as dynamic as life itself.
            Our founders imagined a world where anyone could shape their environment with light 
            as easily as playing music.
          </p>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-in">
            We've created a system that marries cutting-edge smart technology with timeless design principles.
            Every LIMI product is engineered to be both beautiful and intelligent, enhancing your space
            without complicating it.
          </p>
          
          <div className="relative inline-block group cursor-pointer animate-in" onClick={() => setVideoPlaying(!videoPlaying)}>
            <p className="text-2xl font-medium text-[#54BB74] group-hover:text-white transition-colors duration-300">
              We're building the future of light control
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                {videoPlaying ? '◼' : '▶'}
              </span>
            </p>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#54BB74] group-hover:w-full transition-all duration-300"></div>
          </div>
        </div>
        
        {/* Team Section */}
        <div ref={teamRef} className="mb-24">
          <h3 className="text-3xl font-bold text-center mb-4">
            The People Behind the Light
          </h3>
          
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            We're a team of designers, engineers, and dreamers who believe light should be limitless.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="team-member relative group"
                onMouseEnter={() => setActiveTeamMember(index)}
                onMouseLeave={() => setActiveTeamMember(null)}
                onClick={() => toggleAchievement(index)}
              >
                <div className="bg-[#292929] rounded-lg overflow-hidden transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-xl cursor-pointer">
                  <div className="h-64 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      {/* Placeholder for team member image */}
                      <div className="text-[#54BB74]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                    <p className="text-[#54BB74] mb-3">{member.title}</p>
                    <p className="text-gray-400 text-sm">{member.fact}</p>
                    
                    <div className={`mt-4 overflow-hidden transition-all duration-300 ${activeTeamMember === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-gray-300 text-sm mb-3">{member.bio}</p>
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#54BB74] hover:text-[#3a8351] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>LinkedIn</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  {/* Achievement popup */}
                  <div 
                    className={`absolute inset-0 bg-[#292929]/95 flex items-center justify-center p-6 transition-all duration-300 ${showAchievement === index ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#54BB74]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#54BB74]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-bold mb-2">Key Achievement</h5>
                      <p className="text-gray-300">{member.achievement}</p>
                      <button 
                        className="mt-6 px-4 py-2 bg-[#54BB74]/20 text-[#54BB74] rounded-lg hover:bg-[#54BB74]/30 transition-colors text-sm"
                        onClick={() => toggleAchievement(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Team expansion note */}
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm italic">Our full team spans 3 countries, working around the clock to revolutionize lighting.</p>
            <p className="text-gray-400 text-sm italic mt-1">Click on team members to see their key achievements.</p>
          </div>
        </div>
        
        {/* Stats Section */}
        <div ref={statsRef} className="mb-24">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center group cursor-pointer transform transition-all duration-300 hover:scale-110">
                <div className="text-3xl md:text-4xl font-bold text-[#54BB74] mb-2 group-hover:text-white transition-colors">
                  <span className="stat-value" data-value={stat.value}>{stat.value}</span>
                </div>
                <div className="text-gray-400 group-hover:text-[#54BB74] transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Partners Section */}
        <div className="mb-24 text-center">
          <p className="text-gray-400 mb-6">Supported by</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <div key={index} className="opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                {/* Partner logo placeholder */}
                <div className="h-12 flex items-center justify-center">
                  <div className="text-gray-300 font-medium">{partner.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Community Section */}
        <div 
          ref={communityRef}
          className="max-w-3xl mx-auto bg-[#292929] rounded-xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1/2 bg-[#54BB74]/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-[#54BB74]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#54BB74]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            
            {/* Community name selector */}
            <div className="mb-6 flex justify-center gap-3">
              {communityOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleCommunitySelect(option.name)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCommunity === option.name 
                    ? 'bg-[#54BB74] text-white font-medium' 
                    : 'bg-[#1F1F1F] text-gray-300 hover:bg-[#54BB74]/20'}`}
                >
                  {option.name}
                </button>
              ))}
            </div>
            
            <h3 className="text-3xl font-bold mb-4">Join the {selectedCommunity}</h3>
            
            <p className="text-xl text-gray-300 mb-8">
              {communityOptions.find(o => o.name === selectedCommunity)?.description || 'Get early access, design tips, and join the lighting revolution.'}
            </p>
            
            {submitSuccess ? (
              <div className="bg-[#54BB74]/20 text-[#54BB74] p-4 rounded-lg mb-6 inline-block">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Thank you for joining! Welcome to the {selectedCommunity}.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 pl-10 rounded-lg bg-[#1F1F1F] border border-gray-700 focus:border-[#54BB74] focus:outline-none transition-all duration-300"
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#54BB74] text-white rounded-lg hover:bg-[#3a8351] transition-all duration-300 disabled:opacity-70 transform hover:scale-105 active:scale-95"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Joining...
                      </span>
                    ) : 'Join Now'}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  By joining, you'll receive exclusive updates, early access to new features, and design tips.
                </p>
              </form>
            )}
            
            <div className="mt-8 flex justify-center gap-6">
              <a href="#" className="text-gray-400 hover:text-[#54BB74] transition-colors transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#54BB74] transition-colors transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#54BB74] transition-colors transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
