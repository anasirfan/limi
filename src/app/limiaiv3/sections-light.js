import { motion, useInView } from 'framer-motion';
import { FaShieldAlt, FaBrain, FaCloud, FaArrowRight } from 'react-icons/fa';
import { useRef } from 'react';
import Link from 'next/link';

// Traction Section Component - Light Theme
export const TractionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-[#f3ebe2] to-white/80"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-6 max-w-4xl mx-auto">
            An <span className="font-[Amenti] italic text-[#54bb74]">Unprecedented</span> Foundation
            <br className="hidden sm:block" />
            <span className="font-[Amenti] font-normal text-[#292929]/80">for a Series A</span>
          </h2>
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
              <div className="relative p-8 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/30 hover:bg-white/80 transition-all duration-700 shadow-lg hover:shadow-xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2, type: "spring", stiffness: 100 }}
                  className="text-6xl md:text-7xl font-[Amenti] font-bold text-[#54bb74] mb-4"
                >
                  {metric.number}
                </motion.div>
                
                <h3 className="text-2xl font-[Amenti] font-bold text-[#292929] mb-6">
                  {metric.label}
                </h3>
                
                <p className="text-[#292929]/70 leading-relaxed font-normal">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Strategy Section Component - Light Theme
export const StrategySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-white/80 to-[#f3ebe2]/60"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-6 max-w-4xl mx-auto">
            Our <span className="font-[Amenti] italic text-[#54bb74]">Multi-Layered</span>
            <br className="hidden sm:block" />
            <span className="font-[Amenti] font-normal text-[#292929]/80">AI & Infrastructure Moat</span>
          </h2>
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
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#54bb74]/10 rounded-full border border-[#54bb74]/20">
                    <div className="w-2 h-2 bg-[#54bb74] rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-[#292929]/80 tracking-wide">{layer.subtitle.toUpperCase()}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-[Amenti] text-[#292929] leading-tight">
                    {layer.title}
                  </h3>
                </div>
                
                <p className="text-xl text-[#292929]/70 leading-relaxed font-normal max-w-3xl">
                  {layer.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Opportunity Section Component - Light Theme
export const OpportunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-[#f3ebe2]/60 to-white/80"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight max-w-4xl mx-auto">
            <span className="font-[Amenti] italic text-[#54bb74]">Consolidating</span> a Fragmented,
            <br className="hidden sm:block" />
            <span className="font-[Amenti] font-normal text-[#292929]/80">Multi-Hundred-Billion-Dollar Market</span>
          </h2>
          
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
              className="text-xl text-[#292929]/70 leading-relaxed font-normal"
            >
              The smart home and lighting markets are a mess of incompatible products and frustrating experiences. 
              This fragmentation is not a weakness; <span className="text-[#54bb74] font-medium">it is our greatest opportunity.</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xl text-[#292929]/70 leading-relaxed font-normal"
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

// Team Section Component - Light Theme
export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-white/80 to-[#f3ebe2]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-6 max-w-4xl mx-auto">
            A Team <span className="font-[Amenti] italic text-[#54bb74]">Forged</span>
            <br className="hidden sm:block" />
            <span className="font-[Amenti] font-normal text-[#292929]/80">for This Mission</span>
          </h2>
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
              <div className="relative p-8 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/30 hover:bg-white/80 transition-all duration-700 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                {/* Photo Placeholder */}
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[#54bb74]/20 to-[#93cfa2]/20 rounded-3xl flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-2xl mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl font-[Amenti] font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <p className="text-xs text-[#292929]/40">Professional Photo</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#54bb74]/10 rounded-full border border-[#54bb74]/20">
                      <span className="text-xs font-medium text-[#54bb74] tracking-wide">{member.subtitle.toUpperCase()}</span>
                    </div>
                    
                    <h3 className="text-2xl font-[Amenti] font-bold text-[#292929]">
                      {member.name}
                    </h3>
                    
                    <p className="text-lg font-medium text-[#54bb74]">
                      {member.title}
                    </p>
                  </div>
                  
                  <p className="text-[#292929]/70 leading-relaxed font-normal">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Final CTA Section Component - Light Theme
export const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-[#f3ebe2] to-white/80"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-12"
        >
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight max-w-4xl mx-auto">
              We are raising a <span className="text-[#54bb74] font-[Amenti] font-bold">$20M Series A</span>
              <br className="hidden sm:block" />
              <span className="font-[Amenti] font-normal text-[#292929]/80">to build the OS for the Physical World</span>
            </h2>
            
            <p className="text-xl text-[#292929]/70 leading-relaxed font-normal max-w-4xl mx-auto">
              This is not just an investment in a product; it's an investment in the foundational infrastructure 
              for the next era of computing.
            </p>
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
                className="px-12 py-5 bg-white/60 backdrop-blur-xl text-[#292929] rounded-2xl font-medium text-lg border border-[#292929]/20 hover:bg-white/80 transition-all duration-300"
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
