// Additional premium sections for AI Hub page
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaBrain, FaEye, FaHome, FaLightbulb, FaArrowRight } from 'react-icons/fa';
import { HiSparkles, HiCube, HiLightningBolt } from 'react-icons/hi';
import { useRef } from 'react';
import Link from 'next/link';

// Intelligence Section - Core capabilities
export const IntelligenceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const capabilities = [
    {
      icon: FaBrain,
      title: "Adaptive Intelligence",
      description: "AI that learns your preferences and behaviors to create personalized environments.",
      gradient: "from-[#54bb74] to-[#93cfa2]"
    },
    {
      icon: FaEye,
      title: "Predictive Awareness",
      description: "Anticipate needs before you realize them with intelligent automation.",
      gradient: "from-[#93cfa2] to-[#54bb74]"
    },
    {
      icon: HiLightningBolt,
      title: "Seamless Integration",
      description: "Connect with existing ecosystems while maintaining premium experience.",
      gradient: "from-[#292929] to-[#54bb74]"
    }
  ];

  return (
    <section className="relative py-32 px-6 lg:px-12 bg-white/60">
      {/* Section Divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#292929]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#93cfa2]/10 rounded-full border border-[#93cfa2]/20 mb-8">
            <div className="w-2 h-2 bg-[#93cfa2] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#292929]/80 tracking-wide">INTELLIGENCE</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-[Amenti] text-[#292929] leading-[1.1] tracking-tight mb-6">
            <span className="font-[Amenti] italic">Core</span> capabilities
          </h2>
          
          <p className="text-xl text-[#292929]/60 max-w-3xl mx-auto font-light leading-relaxed">
            Discover the foundational technologies that power truly intelligent environments.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
              className="group relative"
            >
              <div className="relative p-8 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/30 hover:bg-white/60 transition-all duration-700 hover:scale-[1.02]">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${capability.gradient} rounded-2xl mb-8 shadow-xl`}
                >
                  <capability.icon className="text-2xl text-white" />
                </motion.div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-[Amenti] font-bold text-[#292929] leading-tight">
                    {capability.title}
                  </h3>
                  <p className="text-[#292929]/60 leading-relaxed font-light">
                    {capability.description}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#54bb74]/5 to-[#93cfa2]/5 rounded-[2rem] -z-10"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section - Use cases
export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: "Morning Awakening",
      description: "Gentle light transitions that sync with your circadian rhythm for natural wake-up experiences.",
      tags: ["Circadian Health", "Gradual Lighting", "Sleep Science"]
    },
    {
      title: "Focused Work",
      description: "Dynamic environments that adapt to enhance concentration and reduce eye strain during work.",
      tags: ["Productivity", "Eye Care", "Focus Modes"]
    },
    {
      title: "Evening Relaxation",
      description: "Warm, calming ambiances that prepare your mind and body for restful sleep.",
      tags: ["Relaxation", "Mood Lighting", "Wellness"]
    },
    {
      title: "Entertainment",
      description: "Immersive lighting that responds to your content for cinema-quality experiences.",
      tags: ["Content Sync", "Immersion", "Entertainment"]
    }
  ];

  return (
    <section className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-white/60 to-[#f3ebe2]/80">
      {/* Section Divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#292929]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#292929]/10 rounded-full border border-[#292929]/20 mb-8">
            <div className="w-2 h-2 bg-[#292929] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#292929]/80 tracking-wide">EXPERIENCES</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-[Amenti] text-[#292929] leading-[1.1] tracking-tight mb-6">
            <span className="font-[Amenti] italic">Transformative</span> moments
          </h2>
          
          <p className="text-xl text-[#292929]/60 max-w-3xl mx-auto font-light leading-relaxed">
            Every interaction becomes an opportunity for your space to enhance your well-being.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
              className="group relative cursor-pointer"
            >
              <div className="relative p-8 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/30 hover:bg-white/60 transition-all duration-700 hover:scale-[1.02] overflow-hidden">
                {/* Visual Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-[#54bb74]/10 to-[#93cfa2]/10 rounded-2xl mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-xl flex items-center justify-center"
                    >
                      <FaLightbulb className="text-2xl text-white" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-[Amenti] font-bold text-[#292929] group-hover:text-[#54bb74] transition-colors duration-300">
                    {experience.title}
                  </h3>
                  <p className="text-[#292929]/60 leading-relaxed font-light">
                    {experience.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {experience.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-[#54bb74]/10 text-[#54bb74] text-sm rounded-full border border-[#54bb74]/20 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Future Section - Final CTA
export const FutureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 lg:px-12 bg-gradient-to-br from-[#f3ebe2] via-[#54bb74]/5 to-[#93cfa2]/5">
      {/* Section Divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#292929]/20 to-transparent" />
      
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-12"
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#54bb74]/10 rounded-full border border-[#54bb74]/20">
              <div className="w-2 h-2 bg-[#54bb74] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#292929]/80 tracking-wide">THE FUTURE</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-light text-[#292929] leading-[1.1] tracking-tight">
              <span className="font-serif italic">Ready to</span>
              <br />
              <span className="font-medium">experience tomorrow?</span>
            </h2>
            
            <p className="text-xl text-[#292929]/60 max-w-3xl mx-auto font-light leading-relaxed">
              Join the waitlist to be among the first to experience LIMI's AI Hub. 
              The future of intelligent living spaces is closer than you think.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-5 bg-[#292929] text-white rounded-2xl font-medium text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-3 z-10">
                Join the Waitlist
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.div>
              </span>
            </motion.button>
            
            <Link href="/contact-us">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-white/40 backdrop-blur-xl text-[#292929] rounded-2xl font-medium text-lg border border-[#292929]/10 hover:bg-white/60 transition-all duration-500"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>
        
        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 relative"
        >
          <div className="flex justify-center space-x-12">
            {[FaBrain, HiSparkles, FaLightbulb].map((Icon, index) => (
              <motion.div
                key={index}
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4 + index, 
                  repeat: Infinity, 
                  delay: index * 0.7 
                }}
                className="w-20 h-20 bg-gradient-to-br from-[#54bb74]/20 to-[#93cfa2]/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30"
              >
                <Icon className="text-2xl text-[#54bb74]" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
