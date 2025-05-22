'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineMilestone from './TimelineMilestone';
import { FiAward, FiBox, FiCpu, FiGlobe, FiHome, FiLayers, FiMap, FiMapPin, FiStar, FiTrendingUp, FiZap } from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { BsBuilding, BsHandshake } from 'react-icons/bs';
import { MdOutlineScience } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';

// Timeline data with milestones
const timelineMilestones = [
  {
    id: 1,
    year: '2019',
    title: 'Idea Sparked',
    description: 'Founder envisions a smarter, modular lighting system after a personal experience.',
    icon: HiOutlineLightBulb,
    position: 'left',
    color: '#50C878', // Emerald
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?q=80&w=800&h=600&auto=format&fit=crop'
  },
  {
    id: 2,
    year: '2020',
    title: 'R&D Begins',
    description: 'Built early prototypes — proved feasibility of modular control.',
    icon: MdOutlineScience,
    position: 'right',
    color: '#87CEAB', // Eton Blue
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=800&h=600&auto=format&fit=crop'
  },
  {
    id: 3,
    year: '2021',
    title: 'LIMI Founded',
    description: 'Headquartered in London. Mission: Make lighting intelligent, accessible, elegant.',
    icon: BsBuilding,
    position: 'left',
    color: '#50C878', // Emerald
    image: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=800&h=600&auto=format&fit=crop'
  },
  {
    id: 4,
    year: '2022',
    title: 'First Showroom Success',
    description: 'Launched pilot showroom. First-gen units sold out in weeks.',
    icon: FiHome,
    position: 'right',
    color: '#87CEAB', // Eton Blue
    image: '/images/timeline/2022.jpg',
    highlight: 'First-gen units sold out in weeks'
  },
  {
    id: 5,
    year: '2023',
    title: 'Manufacturing Scaled',
    description: 'Opened self-owned factory in Guzhen, China. 500m² showroom now active.',
    icon: FiLayers,
    position: 'left',
    color: '#50C878', // Emerald
    image: '/images/timeline/2023.jpg',
    highlight: '500m² showroom'
  },
  {
    id: 6,
    year: '2024',
    title: 'Global Tech Team',
    description: 'Opened R&D software office in Pakistan. 24/7 product development begins.',
    icon: FiGlobe,
    position: 'right',
    color: '#87CEAB', // Eton Blue
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&h=600&auto=format&fit=crop',
    highlight: '24/7 product development'
  },
  {
    id: 7,
    year: 'Apr 2025',
    title: 'Trade Fair Debut',
    description: "Featured at Hong Kong Lighting Fair. Earned 'Innovator to Watch' award.",
    icon: FiAward,
    position: 'left',
    color: '#50C878', // Emerald
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&h=600&auto=format&fit=crop',
    highlight: "'Innovator to Watch' award"
  },
  {
    id: 8,
    year: 'Apr 2025',
    title: 'First Major Deal',
    description: 'Secured partnership with X Lighting Co. — large-scale distribution begins.',
    icon: BsHandshake,
    position: 'right',
    color: '#87CEAB', // Eton Blue
    image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=800&h=600&auto=format&fit=crop',
    highlight: 'large-scale distribution'
  },
  {
    id: 9,
    year: 'Mid 2025',
    title: 'Product Launch',
    description: 'First-gen LIMI Smart System now shipping to early adopters.',
    icon: TbTruckDelivery,
    position: 'left',
    color: '#50C878', // Emerald
    image: '/images/timeline/mid-2025.jpg',
    highlight: 'shipping to early adopters'
  },
  {
    id: 10,
    year: 'Late 2025',
    title: "What's Next",
    description: 'Rolling out across Europe & North America. AI lighting features in the lab.',
    icon: FiMap,
    position: 'right',
    color: '#87CEAB', // Eton Blue
    image: '/images/timeline/late-2025.jpg',
    highlight: 'AI lighting features'
  },
  {
    id: 11,
    year: '2026',
    title: 'Coming Soon...',
    description: 'More experiences. More control. More LIMI.',
    icon: FiStar,
    position: 'left',
    color: '#50C878', // Emerald with reduced opacity
    image: '/images/timeline/2026.jpg',
    isFuture: true
  }
];

export default function TimelineAchievements() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Draw timeline line as user scrolls
    const timeline = timelineRef.current;
    if (!timeline) return;
    
    // Set initial state - line hidden
    gsap.set(timeline, { 
      height: 0,
      opacity: 0.2
    });
    
    // Animate line drawing as user scrolls
    gsap.to(timeline, {
      height: '100%',
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 80%',
        scrub: 0.5,
      }
    });
    
    // Animate milestone entries
    const milestones = document.querySelectorAll('.timeline-milestone');
    milestones.forEach((milestone) => {
      const position = milestone.dataset.position;
      
      gsap.fromTo(milestone, 
        { 
          opacity: 0,
          x: position === 'left' ? -50 : 50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: milestone,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    // Animate dots on the timeline
    const dots = document.querySelectorAll('.timeline-dot');
    dots.forEach((dot) => {
      gsap.fromTo(dot,
        { 
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          scrollTrigger: {
            trigger: dot.parentElement,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);
  
  return (
    <section 
      ref={sectionRef}
      id="timeline" 
      className="py-24 bg-[#1F1F1F] relative overflow-hidden TimelineAchievements"
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 25px 25px, #50C878 2px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Our Journey of <span className="text-[#50C878]">Innovation</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            From a bold idea to a global lighting revolution — follow LIMI's path of relentless innovation and growth.
          </motion.p>
        </div>
        
        {/* Timeline container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-[#50C878]/20 via-[#50C878] to-[#50C878]/20 z-0">
            <div 
              ref={timelineRef}
              className="absolute top-0 left-0 w-full bg-[#50C878]"
            ></div>
          </div>
          
          {/* Timeline milestones */}
          <div className="relative z-10">
            {timelineMilestones.map((milestone) => (
              <TimelineMilestone 
                key={milestone.id}
                milestone={milestone}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
        
        {/* Closing statement */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mt-20 pt-10 border-t border-[#50C878]/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xl text-white font-light italic mb-8">
            "Today, LIMI lights are illuminating homes across continents — and we're just getting started."
          </p>
          <a 
            href="/collaborate" 
            className="inline-flex items-center gap-2 text-[#50C878] hover:text-white transition-colors duration-300 group"
          >
            <span>Collaborate with us</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
