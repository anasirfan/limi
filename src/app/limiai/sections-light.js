import { motion, useInView } from 'framer-motion';
import { FaShieldAlt, FaBrain, FaCloud, FaArrowRight, FaTimes, FaLightbulb, FaMicrochip, FaStore, FaWifi, FaHome, FaBuilding } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import { buildApi1Url, API_CONFIG } from '../config/api.config';
import Link from 'next/link';

// What We're Really Building Section
export const TractionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-6">
            What We're <span className="font-[Amenti] italic text-[#54bb74]">Really</span> Building
          </h2>
          <h3 className="text-2xl md:text-3xl font-[Amenti] text-[#292929]/80 mb-8">
            From Light to Ubiquity
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <p className="text-xl md:text-2xl text-[#292929]/70 leading-relaxed text-center">
            LIMI reimagines lighting as a modular, upgradable platform.
          </p>
          <p className="text-xl md:text-2xl text-[#292929]/70 leading-relaxed text-center">
            Customers buy it for elegance and function—but what they're really installing is a plug-and-play AI port for the future.
          </p>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 mt-12">
            <h4 className="text-xl font-[Amenti] text-[#292929] mb-6 text-center">
              With LIMI installed, upgrading a space becomes as simple as:
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#54bb74] rounded-full"></div>
                <p className="text-lg text-[#292929]/80">Clicking in swappable sensors, cameras, mics, or speakers</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#54bb74] rounded-full"></div>
                <p className="text-lg text-[#292929]/80">Running local AI on embedded edge processors</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#54bb74] rounded-full"></div>
                <p className="text-lg text-[#292929]/80">Maintaining complete privacy and modular control</p>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center pt-8"
          >
            <p className="text-2xl font-[Amenti] text-[#54bb74] leading-relaxed">
              Zero rewiring. Zero disruption. Just seamless intelligence.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Why Now? Why LIMI? Section
export const StrategySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    {
      title: "£50M+ signed LOI with a national distributor",
      description: "Multi-year partnership validation"
    },
    {
      title: "5-year profit-sharing model secured",
      description: "Sustainable revenue framework"
    },
    {
      title: "0% customer churn from live beta installs",
      description: "Proven product-market fit"
    },
    {
      title: "55%+ gross margins from launch",
      description: "Software-like economics"
    }
  ];

  const advantages = [
    {
      title: "Factory, firmware, and platform fully owned",
      description: "Complete vertical integration"
    },
    {
      title: "Patent-backed modular infrastructure",
      description: "Defensible IP position"
    },
    {
      title: "On-device AI with privacy-by-design",
      description: "No cloud dependency"
    },
    {
      title: "Traction across both residential and commercial markets",
      description: "Dual market validation"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-white/60"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-6">
            Why Now? <span className="font-[Amenti] italic text-[#54bb74]">Why LIMI?</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-6"
          >
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl">
                <div className="w-2 h-2 bg-[#54bb74] rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-medium text-[#292929] mb-1">{metric.title}</h4>
                  <p className="text-[#292929]/60 text-sm">{metric.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-6"
          >
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl">
                <div className="w-2 h-2 bg-[#54bb74] rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h4 className="text-lg font-medium text-[#292929] mb-1">{advantage.title}</h4>
                  <p className="text-[#292929]/60 text-sm">{advantage.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Our Three-Layered Moat Section
export const OpportunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const layers = [
    {
      icon: FaLightbulb,
      title: "Physical Layer — Modular Hardware",
      description: "Patent-backed, elegant fixtures that retrofit into existing sockets—no rewiring required.",
      gradient: "from-[#54bb74] to-[#93cfa2]"
    },
    {
      icon: FaMicrochip,
      title: "Intelligence Layer — On-Device AI",
      description: "Localized edge AI built into every unit. Reflex-fast, private, and always-on—no cloud dependency.",
      gradient: "from-[#93cfa2] to-[#54bb74]"
    },
    {
      icon: FaStore,
      title: "Platform Layer — AI Distribution Gateway",
      description: "A model-agnostic runtime for 3rd-party LLMs and assistants. LIMI becomes the ambient App Store.",
      gradient: "from-[#54bb74] to-[#93cfa2]"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-white/60 to-[#f3ebe2]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-6">
            Our <span className="font-[Amenti] italic text-[#54bb74]">Three-Layered</span> Moat
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
                    <span className="text-sm font-medium text-[#292929]/80 tracking-wide">{layer.title.split(' — ')[0].toUpperCase()}</span>
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

// The Market Opportunity Section  
export const MarketSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const markets = [
    {
      title: "Smart Lighting",
      size: "£100B+ TAM",
      icon: FaLightbulb
    },
    {
      title: "IoT + Sensors", 
      size: "£400B+ TAM",
      icon: FaWifi
    },
    {
      title: "Built Environment Infrastructure",
      size: "£300T global asset base",
      icon: FaBuilding
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-white/80"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-8">
            The <span className="font-[Amenti] italic text-[#54bb74]">Market</span> Opportunity
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-gradient-to-r from-[#54bb74]/10 to-[#93cfa2]/10 rounded-3xl p-8">
              <h3 className="text-2xl font-[Amenti] text-[#292929] mb-4">Why lighting?</h3>
              <p className="text-xl text-[#292929]/80 leading-relaxed">
                Because it's the only thing every space must have.
              </p>
            </div>
            
            <p className="text-xl text-[#292929]/70 leading-relaxed">
              You can live without furniture—but not without light.
            </p>
            
            <p className="text-xl text-[#292929]/70 leading-relaxed">
              LIMI uses lighting as a Trojan Horse to install ambient AI infrastructure.
            </p>
            
            <p className="text-xl text-[#292929]/70 leading-relaxed">
              Just like routers enabled WiFi, LIMI enables real-time intelligence at the edge.
            </p>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8">
              <p className="text-xl font-[Amenti] text-[#292929] mb-4">
                We're not playing in the smart lighting category.
              </p>
              <p className="text-xl text-[#54bb74] font-medium">
                We're absorbing it—and scaling far beyond it:
              </p>
            </div>
          </div>
        </motion.div>

        {/* Market Visualization with Moving LIMI Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="relative py-16 mb-16"
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
            <div className="absolute inset-16 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-2xl font-[Amenti] font-bold text-white">LIMI</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {markets.map((market, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1, delay: 1 + index * 0.2 }}
              className="text-center p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/30 hover:bg-white/80 transition-all duration-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <market.icon className="text-3xl text-white" />
              </div>
              <h4 className="text-xl font-[Amenti] font-bold text-[#292929] mb-3">{market.title}</h4>
              <p className="text-2xl font-bold text-[#54bb74]">{market.size}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// Team Section Component - Light Theme
export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const founders = [
    {
      name: "Umer Asif",
      title: "CEO & Founder",
      description: "A first-principles engineer who took the company from idea to a £50M+ LOI by mastering the entire stack. Built our factory and modular IP stack from scratch."
    },
    {
      name: "Dr. Karen Law",
      title: "Co-Founder & COO", 
      description: "PhD and manufacturing lead who de-risks our entire China operation and scaled our manufacturing discipline."
    },
    {
      name: "Shahrukh Ahmed",
      title: "Co-Founder & CTO",
      description: "Proven architect of national-scale, mission-critical software. Ensures our platform is robust, secure, and ready for global deployment."
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-6">
            Meet the <span className="font-[Amenti] italic text-[#54bb74]">Founders</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
              className="group text-center"
            >
              <div className="relative p-8 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/30 hover:bg-white/80 transition-all duration-700 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                {/* Professional Avatar */}
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[#54bb74]/20 to-[#93cfa2]/20 rounded-3xl flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-2xl mx-auto mb-2 flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-[Amenti] font-bold text-white">
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-[Amenti] font-bold text-[#292929]">
                      {founder.name}
                    </h3>
                    
                    <p className="text-lg font-medium text-[#54bb74]">
                      {founder.title}
                    </p>
                  </div>
                  
                  <p className="text-[#292929]/70 leading-relaxed font-normal">
                    {founder.description}
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

// Raising Now Section
export const RaisingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="relative py-32 px-6 lg:px-12 bg-white/60"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-8">
            <span className="font-[Amenti] italic text-[#54bb74]">Raising</span> Now
          </h2>
          
          <div className="space-y-8">
            <p className="text-2xl font-[Amenti] text-[#292929] leading-relaxed">
              We're raising a $20M Series A to scale LIMI into the OS layer of the real world.
            </p>
            
            <p className="text-xl text-[#292929]/70 leading-relaxed">
              This isn't just a lighting product.
            </p>
            
            <p className="text-xl text-[#54bb74] font-medium leading-relaxed">
              It's a defensible, modular platform for ambient AI.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Final CTA Section Component - Light Theme
export const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', organization: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    try {
      const response = await fetch(buildApi1Url(API_CONFIG.ENDPOINTS.INVESTOR_DETAILS), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organization: form.organization,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      setSubmitStatus('success');
      setShowToast(true);
      setModalOpen(false);
      setForm({ name: '', email: '', organization: '' });
    } catch (error) {
      setSubmitStatus('error');
      setModalOpen(false);
    }
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
        setSubmitStatus(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  return (
    <>
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Amenti] text-[#292929] leading-[1.2] tracking-tight mb-8">
                Want to <span className="font-[Amenti] italic text-[#54bb74]">explore</span> further?
              </h2>
              
              <p className="text-xl text-[#292929]/70 leading-relaxed mb-12">
                Our full Data Room includes detailed financials, technical architecture, product demos, and commercial traction.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleModalOpen}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-2xl font-medium text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl"
              >
                <span className="relative flex items-center gap-3 z-10">
                  Request Access to Data Room
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleModalOpen}
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-[#54bb74]/30 text-[#292929] rounded-2xl font-medium text-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:bg-white/20"
              >
                <span className="relative flex items-center gap-3 z-10">
                  Book a Meeting With the Founders
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
      {modalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleModalClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative gradient background */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#54bb74] to-[#93cfa2]"></div>
            
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleModalClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all duration-200"
              aria-label="Close"
            >
              <FaTimes className="text-sm" />
            </motion.button>
            
            {/* Header */}
            <div className="text-center mb-8 pt-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] rounded-2xl flex items-center justify-center"
              >
                <FaArrowRight className="text-white text-xl" />
              </motion.div>
              <h3 className="text-3xl font-[Amenti] font-bold text-[#292929] mb-2">
                Request Access to Data Room
              </h3>
              <p className="text-[#292929]/60 text-sm">
                Get exclusive access to our investor materials
              </p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-[#292929] font-semibold mb-2 text-sm uppercase tracking-wide" htmlFor="name">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#54bb74] focus:ring-4 focus:ring-[#54bb74]/10 transition-all duration-200 text-[#292929] placeholder-gray-400"
                />
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-[#292929] font-semibold mb-2 text-sm uppercase tracking-wide" htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#54bb74] focus:ring-4 focus:ring-[#54bb74]/10 transition-all duration-200 text-[#292929] placeholder-gray-400"
                />
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-[#292929] font-semibold mb-2 text-sm uppercase tracking-wide" htmlFor="organization">
                  Organization <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={form.organization}
                  onChange={handleInputChange}
                  placeholder="Company, fund, or institution"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#54bb74] focus:ring-4 focus:ring-[#54bb74]/10 transition-all duration-200 text-[#292929] placeholder-gray-400"
                />
              </motion.div>
              
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-[#54bb74]/90 hover:to-[#93cfa2]/90 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Submit Request
                <FaArrowRight className="text-sm" />
              </motion.button>
            </form>
            
            {/* Footer note */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-xs text-[#292929]/50 mt-6"
            >
              Your information will be kept confidential and used solely for investor communications.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
      {/* Toast notification */}
      {showToast && submitStatus === 'success' && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 px-6 py-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white rounded-2xl shadow-lg flex items-center gap-3 text-lg font-semibold"
          style={{ pointerEvents: 'none' }}
        >
          <FaArrowRight className="text-white text-xl" />
          Request submitted! We will contact you soon.
        </motion.div>
      )}
    </>
  );
};
