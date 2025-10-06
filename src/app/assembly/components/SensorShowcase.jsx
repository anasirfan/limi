"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SensorShowcase = ({ onVisible }) => {
  const sensorData = [
    {
      id: 1,
      title: "Audio Output",
      description: "High-quality speakers deliver voice feedback, notifications, and ambient audio to enhance your smart lighting experience.",
      icon: "/assemblyImages/sens4.png",
      gradient: "from-[#017E7C] to-[#016060]",
      delay: 0
    },
    {
      id: 2,
      title: "Temperature Control",
      description: "Smart temperature sensors monitor ambient conditions and automatically adjust lighting warmth to create optimal comfort zones.",
      icon: "/assemblyImages/sens3.png",
      gradient: "from-[#098C53] to-[#0E736B]",
      delay: 0.1
    },
    {
      id: 3,
      title: "Computer Vision",
      description: "AI-powered cameras recognize gestures, faces, and activities to provide intelligent contextual responses and visual automation.",
      icon: "/assemblyImages/sens1.png",
      gradient: "from-[#016060] to-[#017E7C]",
      delay: 0.2
    },
    {
      id: 4,
      title: "Motion Detection",
      description: "Advanced radar sensors detect movement and presence with precision accuracy for intelligent lighting automation and occupancy sensing.",
      icon: "/assemblyImages/sens2.png",
      gradient: "from-[#0E736B] to-[#098C53]",
      delay: 0.3
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <section className="relative py-20 bg-[#0D0F0F] overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(1, 126, 124, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(1, 126, 124, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#017E7C] rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          onViewportEnter={onVisible}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            INTELLIGENT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#017E7C] to-[#098C53]">
              SENSORS
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-[#C8D1D1] max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Advanced sensor technology that transforms your environment into an intelligent ecosystem, 
            responding to your presence and preferences with unprecedented precision.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {/* First Row */}
          <motion.div
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="lg:col-span-1"
          >
            <div className={`
              relative h-[320px] rounded-2xl p-6 overflow-hidden
              bg-[rgba(31,31,31,1)]
              shadow-[0px_8px_20px_rgba(0,0,0,0.25)]
              border border-white/10
              group cursor-pointer
            `}>
              {/* Top Border Gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3 font-['Poppins']">
                    {sensorData[0].title}
                  </h3>
                  <p className="text-[#C8D1D1] text-sm leading-relaxed font-['Inter']">
                    {sensorData[0].description}
                  </p>
                </div>
              </div>
              
              {/* Absolutely Positioned Image */}
              <div className="absolute -top-4 -right-16 w-[500px] h-[500px] z-20">
                <Image
                  src={sensorData[0].icon}
                  alt={sensorData[0].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative Elements */}
              </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="lg:col-span-2"
          >
            <div className={`
              relative h-[320px] rounded-2xl p-6 overflow-hidden
              bg-[rgba(31,31,31,1)]
              shadow-[0px_8px_20px_rgba(0,0,0,0.25)]
              border border-white/10
              group cursor-pointer
            `}>
              {/* Top Border Gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3 font-['Poppins']">
                    {sensorData[1].title}
                  </h3>
                  <p className="text-[#C8D1D1] text-sm leading-relaxed font-['Inter']">
                    {sensorData[1].description}
                  </p>
                </div>
              </div>
              
              {/* Absolutely Positioned Image */}
              <div 
                className="absolute top-4 right-8 w-[500px] h-[500px] z-20"
                style={{ transform: 'rotate(180deg) rotate(-12deg)' }}
              >
                <Image
                  src={sensorData[1].icon}
                  alt={sensorData[1].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative Elements */}
                </div>
          </motion.div>

          {/* Second Row */}
          <motion.div
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="lg:col-span-2"
          >
            <div className={`
              relative h-[320px] rounded-2xl p-6 overflow-hidden
              bg-[rgba(31,31,31,1)]
              shadow-[0px_8px_20px_rgba(0,0,0,0.25)]
              border border-white/10
              group cursor-pointer
            `}>
              {/* Top Border Gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3 font-['Poppins']">
                    {sensorData[2].title}
                  </h3>
                  <p className="text-[#C8D1D1] text-sm leading-relaxed font-['Inter']">
                    {sensorData[2].description}
                  </p>
                </div>
              </div>
              
              {/* Absolutely Positioned Image */}
              <div className="absolute top-4 right-4 w-[500px] h-[500px] z-20"
                     style={{ transform: 'rotate(180deg) rotate(-12deg)' }}>
                <Image
                  src={sensorData[2].icon}
                  alt={sensorData[2].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative Elements */}
                </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="lg:col-span-1"
          >
            <div className={`
              relative h-[320px] rounded-2xl p-6 overflow-hidden
              bg-[rgba(31,31,31,1)]
              shadow-[0px_8px_20px_rgba(0,0,0,0.25)]
              border border-white/10
              group cursor-pointer
            `}>
              {/* Top Border Gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-3 font-['Poppins']">
                    {sensorData[3].title}
                  </h3>
                  <p className="text-[#C8D1D1] text-sm leading-relaxed font-['Inter']">
                    {sensorData[3].description}
                  </p>
                </div>
              </div>
              
              {/* Absolutely Positioned Image */}
              <div className="absolute -top-4 -right-2 w-[500px] h-[500px] z-20"
                     style={{ transform: 'rotate(180deg) rotate(40deg)' }}>
                <Image
                  src={sensorData[3].icon}
                  alt={sensorData[3].title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative Elements */}
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SensorShowcase;
