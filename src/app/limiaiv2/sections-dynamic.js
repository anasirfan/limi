import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaShieldAlt, FaBrain, FaCloud, FaArrowRight } from 'react-icons/fa';
import { useRef } from 'react';
import Link from 'next/link';

// Dynamic Traction Section Component
export const DynamicTractionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  
  // Dynamic colors based on scroll position (section appears around 0.2)
  const sectionBg = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35],
    ['#f3ebe2', '#292929', '#f3ebe2']
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35],
    ['#292929', '#ffffff', '#292929']
  );
  
  const textColorSecondary = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35],
    ['rgba(41,41,41,0.7)', 'rgba(255,255,255,0.7)', 'rgba(41,41,41,0.7)']
  );
  
  const cardBg = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35],
    ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.6)']
  );
  
  const cardBorder = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35],
    ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.3)']
  );

  const metrics = [
    {
      number: "£50,000,000+",
      label: "5-Year Strategic LOI",
      description: "Multi-year, profit-sharing partnership with a leading UK distributor, validating our commercial model at scale."
    },
    {
      number: "0%",
      label: "Customer Churn Rate", 
      description: "Initial beta launch proved an unbreakable ecosystem lock-in. Once customers are on our platform, they stay."
    },
    {
      number: "55%+",
      label: "Gross Margin",
      description: "Our first-principles supply chain delivers software-like margins, ensuring a capital-efficient path to profitability."
    }
  ];

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: sectionBg }}
      className="relative py-32 px-6 lg:px-12 transition-colors duration-1000"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <motion.h2 
            style={{ color: textColor }}
            className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] leading-[1.2] tracking-tight mb-6 max-w-4xl mx-auto"
          >
            An <span className="font-[Amenti] italic text-[#54bb74]">Unprecedented</span> Foundation
            <br className="hidden sm:block" />
            <motion.span 
              style={{ color: textColorSecondary }}
              className="font-[Amenti] font-normal"
            >
              for a Series A
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
              className="text-center"
            >
              <motion.div 
                style={{ 
                  backgroundColor: cardBg,
                  borderColor: cardBorder
                }}
                className="relative p-8 backdrop-blur-xl rounded-[2rem] border hover:scale-[1.02] transition-all duration-700 shadow-lg hover:shadow-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2, type: "spring", stiffness: 100 }}
                  className="text-6xl md:text-7xl font-[Amenti] font-bold text-[#54bb74] mb-4"
                >
                  {metric.number}
                </motion.div>
                
                <motion.h3 
                  style={{ color: textColor }}
                  className="text-2xl font-[Amenti] font-bold mb-6"
                >
                  {metric.label}
                </motion.h3>
                
                <motion.p 
                  style={{ color: textColorSecondary }}
                  className="leading-relaxed font-normal"
                >
                  {metric.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Dynamic Strategy Section Component
export const DynamicStrategySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  
  // Dynamic colors based on scroll position (section appears around 0.4)
  const sectionBg = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55],
    ['#292929', '#f3ebe2', '#292929']
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55],
    ['#ffffff', '#292929', '#ffffff']
  );
  
  const textColorSecondary = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55],
    ['rgba(255,255,255,0.7)', 'rgba(41,41,41,0.7)', 'rgba(255,255,255,0.7)']
  );
  
  const badgeBg = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55],
    ['rgba(84,187,116,0.2)', 'rgba(84,187,116,0.1)', 'rgba(84,187,116,0.2)']
  );
  
  const badgeBorder = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55],
    ['rgba(84,187,116,0.3)', 'rgba(84,187,116,0.2)', 'rgba(84,187,116,0.3)']
  );

  const layers = [
    {
      icon: FaShieldAlt,
      title: "The Hardware Anchor",
      subtitle: "The Physical Layer",
      description: "Our patented modular system, with its ability to run on existing home wiring, creates an insurmountable physical barrier to entry. We own the \"last inch\" to the customer.",
      gradient: "from-[#54bb74] to-[#93cfa2]"
    },
    {
      icon: FaBrain,
      title: "The Edge AI OS",
      subtitle: "The Intelligence Layer", 
      description: "Our privacy-first, on-device AI acts as the \"reflexes\" of the home, providing a seamless experience. This is our proprietary operating system that creates deep intelligence lock-in.",
      gradient: "from-[#93cfa2] to-[#54bb74]"
    },
    {
      icon: FaCloud,
      title: "The Cloud Gateway",
      subtitle: "The Platform Layer",
      description: "We are the \"Switzerland of the AI Wars,\" a model-agnostic platform that acts as the essential distribution channel for any major LLM to enter the physical world.",
      gradient: "from-[#292929] to-[#54bb74]"
    }
  ];

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: sectionBg }}
      className="relative py-32 px-6 lg:px-12 transition-colors duration-1000"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <motion.h2 
            style={{ color: textColor }}
            className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] leading-[1.2] tracking-tight mb-6 max-w-4xl mx-auto"
          >
            Our <span className="font-[Amenti] italic text-[#54bb74]">Multi-Layered</span>
            <br className="hidden sm:block" />
            <motion.span 
              style={{ color: textColorSecondary }}
              className="font-[Amenti] font-normal"
            >
              AI & Infrastructure Moat
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="space-y-16">
          {layers.map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
              className={`grid lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Icon */}
              <div className={`lg:col-span-3 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br ${layer.gradient} rounded-3xl shadow-2xl`}
                >
                  <layer.icon className="text-4xl text-white" />
                </motion.div>
              </div>
              
              {/* Content */}
              <div className={`lg:col-span-9 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-3">
                  <motion.div 
                    style={{ 
                      backgroundColor: badgeBg,
                      borderColor: badgeBorder
                    }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full border"
                  >
                    <div className="w-2 h-2 bg-[#54bb74] rounded-full animate-pulse" />
                    <motion.span 
                      style={{ color: textColorSecondary }}
                      className="text-sm font-medium tracking-wide"
                    >
                      {layer.subtitle.toUpperCase()}
                    </motion.span>
                  </motion.div>
                  
                  <motion.h3 
                    style={{ color: textColor }}
                    className="text-3xl md:text-4xl font-[Amenti] leading-tight"
                  >
                    {layer.title}
                  </motion.h3>
                </div>
                
                <motion.p 
                  style={{ color: textColorSecondary }}
                  className="text-xl leading-relaxed font-normal max-w-3xl"
                >
                  {layer.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Dynamic Opportunity Section Component
export const DynamicOpportunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  
  // Dynamic colors based on scroll position (section appears around 0.6)
  const sectionBg = useTransform(
    scrollYProgress,
    [0.55, 0.65, 0.75],
    ['#f3ebe2', '#292929', '#f3ebe2']
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0.55, 0.65, 0.75],
    ['#292929', '#ffffff', '#292929']
  );
  
  const textColorSecondary = useTransform(
    scrollYProgress,
    [0.55, 0.65, 0.75],
    ['rgba(41,41,41,0.7)', 'rgba(255,255,255,0.7)', 'rgba(41,41,41,0.7)']
  );

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: sectionBg }}
      className="relative py-32 px-6 lg:px-12 transition-colors duration-1000"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-12"
        >
          <motion.h2 
            style={{ color: textColor }}
            className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] leading-[1.2] tracking-tight max-w-4xl mx-auto"
          >
            <span className="font-[Amenti] italic text-[#54bb74]">Consolidating</span> a Fragmented,
            <br className="hidden sm:block" />
            <motion.span 
              style={{ color: textColorSecondary }}
              className="font-[Amenti] font-normal"
            >
              Multi-Hundred-Billion-Dollar Market
            </motion.span>
          </motion.h2>
          
          {/* Market Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="relative py-16"
          >
            <div className="w-64 h-64 mx-auto relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-[#54bb74]/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border-2 border-[#93cfa2]/40 rounded-full"
              />
              <div className="absolute inset-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center">
                <span className="text-2xl font-[Amenti] font-bold text-white">LIMI</span>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ color: textColorSecondary }}
              className="text-xl leading-relaxed font-normal"
            >
              The smart home and lighting markets are a mess of incompatible products and frustrating experiences. 
              This fragmentation is not a weakness; <span className="text-[#54bb74] font-medium">it is our greatest opportunity.</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{ color: textColorSecondary }}
              className="text-xl leading-relaxed font-normal"
            >
              LIMI is the unifying standard. Like AWS for the cloud or Intel for the PC, we are providing the foundational 
              infrastructure upon which the entire industry will build. <span className="text-[#54bb74] font-medium">We are not just capturing market share; we are defining the category.</span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Dynamic Team Section Component
export const DynamicTeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  
  // Dynamic colors based on scroll position (section appears around 0.8)
  const sectionBg = useTransform(
    scrollYProgress,
    [0.75, 0.85, 0.95],
    ['#292929', '#f3ebe2', '#292929']
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0.75, 0.85, 0.95],
    ['#ffffff', '#292929', '#ffffff']
  );
  
  const textColorSecondary = useTransform(
    scrollYProgress,
    [0.75, 0.85, 0.95],
    ['rgba(255,255,255,0.7)', 'rgba(41,41,41,0.7)', 'rgba(255,255,255,0.7)']
  );
  
  const cardBg = useTransform(
    scrollYProgress,
    [0.75, 0.85, 0.95],
    ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.1)']
  );
  
  const cardBorder = useTransform(
    scrollYProgress,
    [0.75, 0.85, 0.95],
    ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)']
  );
  
  const badgeBg = useTransform(
    scrollYProgress,
    [0.75, 0.85, 0.95],
    ['rgba(84,187,116,0.2)', 'rgba(84,187,116,0.1)', 'rgba(84,187,116,0.2)']
  );
  
  const badgeBorder = useTransform(
    scrollYProgress,
    [0.75, 0.85, 0.95],
    ['rgba(84,187,116,0.3)', 'rgba(84,187,116,0.2)', 'rgba(84,187,116,0.3)']
  );

  const team = [
    {
      name: "Umer Asif",
      title: "Founder & CEO",
      subtitle: "The Visionary Operator",
      description: "A first-principles engineer who took the company from idea to a £50M+ LOI by mastering the entire stack, from supply chain to software."
    },
    {
      name: "Dr. Karen Law",
      title: "Co-Founder & COO", 
      subtitle: "The On-the-Ground Executor",
      description: "PhD and manufacturing lead who de-risks our entire China operation, giving us an unbeatable operational moat."
    },
    {
      name: "Shahrukh Ahmed",
      title: "Co-Founder & CTO",
      subtitle: "The Enterprise Scaler", 
      description: "Proven architect of national-scale, mission-critical software, ensuring our platform is robust, secure, and ready for global deployment."
    }
  ];

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: sectionBg }}
      className="relative py-32 px-6 lg:px-12 transition-colors duration-1000"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <motion.h2 
            style={{ color: textColor }}
            className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] leading-[1.2] tracking-tight mb-6 max-w-4xl mx-auto"
          >
            A Team <span className="font-[Amenti] italic text-[#54bb74]">Forged</span>
            <br className="hidden sm:block" />
            <motion.span 
              style={{ color: textColorSecondary }}
              className="font-[Amenti] font-normal"
            >
              for This Mission
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
              className="group text-center"
            >
              <motion.div 
                style={{ 
                  backgroundColor: cardBg,
                  borderColor: cardBorder
                }}
                className="relative p-8 backdrop-blur-xl rounded-[2rem] border hover:scale-[1.02] transition-all duration-700 shadow-lg hover:shadow-xl"
              >
                {/* Photo Placeholder */}
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[#54bb74]/20 to-[#93cfa2]/20 rounded-3xl flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-2xl mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl font-[Amenti] font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <motion.p 
                      style={{ color: textColorSecondary }}
                      className="text-xs opacity-60"
                    >
                      Professional Photo
                    </motion.p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <motion.div 
                      style={{ 
                        backgroundColor: badgeBg,
                        borderColor: badgeBorder
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border"
                    >
                      <span className="text-xs font-medium text-[#54bb74] tracking-wide">{member.subtitle.toUpperCase()}</span>
                    </motion.div>
                    
                    <motion.h3 
                      style={{ color: textColor }}
                      className="text-2xl font-[Amenti] font-bold"
                    >
                      {member.name}
                    </motion.h3>
                    
                    <p className="text-lg font-medium text-[#54bb74]">
                      {member.title}
                    </p>
                  </div>
                  
                  <motion.p 
                    style={{ color: textColorSecondary }}
                    className="leading-relaxed font-normal"
                  >
                    {member.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Dynamic Final CTA Section Component
export const DynamicFinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  
  // Dynamic colors based on scroll position (final section)
  const sectionBg = useTransform(
    scrollYProgress,
    [0.9, 1],
    ['#f3ebe2', '#292929']
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0.9, 1],
    ['#292929', '#ffffff']
  );
  
  const textColorSecondary = useTransform(
    scrollYProgress,
    [0.9, 1],
    ['rgba(41,41,41,0.7)', 'rgba(255,255,255,0.7)']
  );
  
  const secondaryButtonBg = useTransform(
    scrollYProgress,
    [0.9, 1],
    ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.1)']
  );
  
  const secondaryButtonBorder = useTransform(
    scrollYProgress,
    [0.9, 1],
    ['rgba(41,41,41,0.2)', 'rgba(255,255,255,0.2)']
  );
  
  const secondaryButtonText = useTransform(
    scrollYProgress,
    [0.9, 1],
    ['#292929', '#ffffff']
  );

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: sectionBg }}
      className="relative py-32 px-6 lg:px-12 transition-colors duration-1000"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-12"
        >
          <div className="space-y-8">
            <motion.h2 
              style={{ color: textColor }}
              className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] leading-[1.2] tracking-tight max-w-4xl mx-auto"
            >
              We are raising a <span className="text-[#54bb74] font-[Amenti] font-bold">$20M Series A</span>
              <br className="hidden sm:block" />
              <motion.span 
                style={{ color: textColorSecondary }}
                className="font-[Amenti] font-normal"
              >
                to build the OS for the Physical World
              </motion.span>
            </motion.h2>
            
            <motion.p 
              style={{ color: textColorSecondary }}
              className="text-xl leading-relaxed font-normal max-w-4xl mx-auto"
            >
              This is not just an investment in a product; it's an investment in the foundational infrastructure 
              for the next era of computing.
            </motion.p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-12 py-5 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-2xl font-medium text-lg shadow-2xl hover:shadow-[#54bb74]/20 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                Request Access to Data Room
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <Link href="https://limilighting.com" target="_blank">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  backgroundColor: secondaryButtonBg,
                  borderColor: secondaryButtonBorder,
                  color: secondaryButtonText
                }}
                className="px-12 py-5 backdrop-blur-xl rounded-2xl font-medium text-lg border transition-all duration-300"
              >
                See our consumer products in action
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
