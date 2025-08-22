'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  HiCpuChip, HiShieldCheck, HiLightningBolt, HiCube, HiWifi, 
  HiLightBulb, HiCog, HiUserGroup, HiSpeakerWave, HiSun 
} from 'react-icons/hi2';

const iconMap = {
  HiCpuChip, HiShieldCheck, HiLightningBolt, HiCube, HiWifi,
  HiLightBulb, HiCog, HiUserGroup, HiSpeakerWave, HiSun
};

export default function StorySection({ 
  id, stage, height, background, content, index, mobile = false, onInteraction 
}) {
  const [selectedPendant, setSelectedPendant] = useState(null);
  const [selectedSystems, setSelectedSystems] = useState([]);
  const [activatedSensors, setActivatedSensors] = useState([]);
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      // Animate section entrance
      gsap.fromTo(sectionRef.current.children, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }
  }, [isInView]);

  const handlePendantSelect = (pendant) => {
    setSelectedPendant(pendant);
    onInteraction('pendant-select', pendant);
    
    // Visual feedback
    gsap.to(`#pendant-${pendant.id}`, {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1
    });
  };

  const handleSystemToggle = (system) => {
    const isSelected = selectedSystems.includes(system.id);
    if (isSelected) {
      setSelectedSystems(prev => prev.filter(id => id !== system.id));
    } else {
      setSelectedSystems(prev => [...prev, system.id]);
      onInteraction('system-add', system);
    }
  };

  const handleSensorActivate = (sensor) => {
    if (!activatedSensors.includes(sensor.id)) {
      setActivatedSensors(prev => [...prev, sensor.id]);
      onInteraction('sensor-activate', sensor);
      
      // Pulsing animation
      gsap.to(`#sensor-${sensor.id}`, {
        boxShadow: '0 0 30px rgba(84, 187, 116, 0.8)',
        duration: 0.5,
        yoyo: true,
        repeat: 3
      });
    }
  };

  return (
    <section 
      id={id}
      ref={sectionRef}
      className={`relative flex items-center justify-center px-8 py-16 ${mobile ? 'min-h-screen' : ''}`}
      style={{ 
        minHeight: height,
        background: '#292929',
        color: '#000000'
      }}
    >
      <div className="max-w-2xl mx-auto text-white">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm font-semibold tracking-wider mb-4"
          style={{ color: content.eyebrow === 'LIMI AI' ? '#54bb74' : '#9CA3AF' }}
        >
          {content.eyebrow}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#54bb74]"
        >
          {content.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl md:text-2xl font-light text-[#93cfa2] mb-8"
        >
          {content.subheadline}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg text-gray-300 mb-12 leading-relaxed"
        >
          {content.description}
        </motion.p>

        {/* Features */}
        {content.features && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {content.features.map((feature, idx) => {
              const Icon = iconMap[feature.icon];
              return (
                <div key={idx} className="flex items-center space-x-3 p-4 bg-white/10 rounded-lg">
                  {Icon && <Icon className="text-2xl text-[#54bb74]" />}
                  <div>
                    <div className="font-semibold text-white">{feature.text}</div>
                    {feature.desc && <div className="text-sm text-gray-400">{feature.desc}</div>}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Stats */}
        {content.stats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-3 gap-6 mb-12"
          >
            {content.stats.map((stat, idx) => (
              <div key={idx} className="text-center p-4 bg-white/10 backdrop-blur-md rounded-lg">
                <div className="text-2xl font-bold text-[#54bb74]">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Highlights */}
        {content.highlights && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-2 gap-4 mb-12"
          >
            {content.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#54bb74] rounded-full"></div>
                <span className="text-gray-300">{highlight}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Pendant Selection */}
        {content.pendants && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}

          >
            <h3 className="text-2xl font-bold mb-6 text-[#54bb74]">Select Your Pendant Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.pendants.map((pendant) => (
                <div
                  key={pendant.id}
                  id={`pendant-${pendant.id}`}
                  onClick={() => handlePendantSelect(pendant)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedPendant?.id === pendant.id
                      ? 'bg-[#54bb74]/20 border-2 border-[#54bb74]'
                      : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                  }`}
                >
                  <h4 className="text-xl font-bold mb-2 text-white">{pendant.name}</h4>
                  <div className="space-y-2">
                    {pendant.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#54bb74] rounded-full"></div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* System Selection */}
        {content.systems && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Choose System Modules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.systems.map((system) => (
                <div
                  key={system.id}
                  onClick={() => handleSystemToggle(system)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedSystems.includes(system.id)
                      ? 'bg-[#54bb74]/20 border-2 border-[#54bb74]'
                      : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold">{system.name}</h4>
                    <span className="text-sm px-3 py-1 bg-white/20 rounded-full">{system.category}</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2">Features:</h5>
                      <div className="space-y-1">
                        {system.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#54bb74] rounded-full"></div>
                            <span className="text-sm text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Benefits:</h5>
                      <div className="space-y-1">
                        {system.benefits.map((benefit, idx) => (
                          <div key={idx} className="text-sm text-[#54bb74]">• {benefit}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Sensor Activation */}
        {content.sensors && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Activate Environmental Sensors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.sensors.map((sensor) => {
                const Icon = iconMap[sensor.icon];
                const isActivated = activatedSensors.includes(sensor.id);
                return (
                  <div
                    key={sensor.id}
                    id={`sensor-${sensor.id}`}
                    onClick={() => handleSensorActivate(sensor)}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      isActivated
                        ? 'bg-[#54bb74]/20 border-2 border-[#54bb74] shadow-lg'
                        : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      {Icon && <Icon className={`text-3xl ${isActivated ? 'text-[#54bb74]' : 'text-white'}`} />}
                      <h4 className="text-xl font-bold">{sensor.name}</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold mb-2">Capabilities:</h5>
                        <div className="space-y-1">
                          {sensor.capabilities.map((capability, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-[#54bb74] rounded-full"></div>
                              <span className="text-sm text-white/80">{capability}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-white/20">
                        <div className="text-sm text-white/60">
                          <div>Technology: {sensor.technology}</div>
                          <div>Range: {sensor.range}</div>
                          <div>Privacy: {sensor.privacy}</div>
                        </div>
                      </div>
                    </div>
                    {isActivated && (
                      <div className="mt-4 text-center">
                        <span className="inline-block px-4 py-2 bg-[#54bb74] text-white rounded-full text-sm font-semibold">
                          ✓ Activated
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* CTA Buttons */}
        {content.cta && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col md:flex-row gap-4 mt-12"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
              {typeof content.cta === 'string' ? content.cta : (content.cta.primary?.text || content.cta.primary)}
            </button>
            {content.cta.secondary && (
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                {typeof content.cta.secondary === 'string' ? content.cta.secondary : (content.cta.secondary?.text || content.cta.secondary)}
              </button>
            )}
          </motion.div>
        )}

        {/* Finale Experience */}
        {content.experience && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold mb-6">{content.experience.title}</h3>
            <div className="space-y-3">
              {content.experience.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#54bb74] rounded-full mt-2"></div>
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        {content.achievements && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {content.achievements.map((achievement, idx) => (
              <div key={idx} className="text-center p-4 bg-white/10 backdrop-blur-md rounded-lg">
                <div className="text-xl font-bold text-[#54bb74]">{achievement.value}</div>
                <div className="text-sm text-white/70">{achievement.metric}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
