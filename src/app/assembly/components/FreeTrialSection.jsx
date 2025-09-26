"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
import { FaArrowRight } from "react-icons/fa";

// 3D Robot Model Component - Loads FBX model
const RobotModel = ({ ...props }) => {
  // Load the FBX model - useFBX handles errors internally
  const model = useFBX('/models/robotModel.fbx');
  
  console.log('FBX Model loaded:', model);

  if (model) {
    return (
      <primitive 
        object={model} 
        scale={0.005} 
        position={[0, -1, 0]} 
        rotation={[0, 0, 0]}
        {...props} 
      />
    );
  }

  // Fallback procedural robot model
  return (
    <group scale={1.5} position={[0, -0.5, 0]} rotation={[0, Math.PI / 6, 0]} {...props}>
      {/* Robot Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial color="#0066FF" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Robot Head */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#4D9FFF" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Robot Eyes */}
      <mesh position={[-0.15, 0.85, 0.35]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#0066FF" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.15, 0.85, 0.35]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#0066FF" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Robot Arms */}
      <mesh position={[-0.6, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8]} />
        <meshStandardMaterial color="#0066FF" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.6, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8]} />
        <meshStandardMaterial color="#0066FF" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Megaphone in right hand */}
      <mesh position={[0.8, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Robot Legs */}
      <mesh position={[-0.25, -0.8, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8]} />
        <meshStandardMaterial color="#0066FF" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.25, -0.8, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8]} />
        <meshStandardMaterial color="#0066FF" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#0066FF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#0066FF" emissive="#0066FF" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

// Fallback 3D Model (simple geometric shape) - Static
const FallbackModel = () => {
  return (
    <mesh position={[0, 0, 0]} scale={1.5}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#0066FF"
        metalness={0.8}
        roughness={0.2}
        emissive="#4D9FFF"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Loading component
const ModelLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
  </div>
);

const FreeTrialSection = ({ onGetStarted }) => {
  const [mounted, setMounted] = useState(false);
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStartJourney = () => {
    setShowJourneyModal(true);
  };

  const handleGetBrochure = () => {
    setShowBrochureModal(true);
  };

  const closeModals = () => {
    setShowJourneyModal(false);
    setShowBrochureModal(false);
  };

  if (!mounted) return null;

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#FEFEFE]">
      <div className="max-w-7xl mx-auto">
        <div

          className="relative overflow-visible"
        >
          {/* Main Container - Bright Blue Background */}
          <div 
            className={`flex ${isMobile ? 'flex-col' : 'flex-col lg:flex-row'} items-center justify-between px-10 py-10 rounded-2xl shadow-2xl overflow-visible relative`}
            style={{
              backgroundColor: '#54BB74',
              height: isMobile ? 'auto' : '311px',
              minHeight: isMobile ? '400px' : '311px',
              borderRadius: '16px'
            }}
          >
            
            {/* Left Content - Text Area */}
            <div className={`flex-1 text-white z-10 ${isMobile ? 'mb-6 text-center' : 'mb-8 lg:mb-0'}`}>
              <motion.h2
                initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? -20 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="font-bold text-white mb-2"
                style={{ fontSize: isMobile ? '24px' : '28px' }}
              >
                Ready to Transform Your Space?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? -20 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-5 leading-relaxed"
                style={{ 
                  fontSize: isMobile ? '14px' : '16px', 
                  color: '#E6E6E6',
                  lineHeight: '1.5'
                }}
              >
                Join thousands of satisfied customers who have revolutionized their lighting with our modular system. Experience the future today.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                className={`flex ${isMobile ? 'flex-col items-center' : 'flex-col sm:flex-row'} gap-3`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.7,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0px 8px 25px rgba(0,0,0,0.25)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  onClick={handleStartJourney}
                  className="inline-flex items-center gap-2 font-semibold transition-all duration-300 group"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    padding: '14px 28px',
                    borderRadius: '30px',
                    boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    width: 'fit-content',
                    fontWeight: '600',
                    border: 'none'
                  }}
                >
                  Start your journey
                  <motion.div
                    className="text-sm"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.9,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.8)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  onClick={handleGetBrochure}
                  className="inline-flex items-center gap-2 font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    padding: '14px 28px',
                    borderRadius: '30px',
                    border: '2px solid rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    width: 'fit-content',
                    fontWeight: '600'
                  }}
                >
                  Get brochure
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - 3D Model Area */}
            <div 
              className="flex-1 flex items-center justify-center relative"
              style={{
                height: isMobile ? '250px' : '311px',
                overflow: 'visible',
                marginLeft: isMobile ? '0' : '40px',
                marginTop: isMobile ? '20px' : '0'
              }}
            >
              <div
                className="w-full relative overflow-visible pointer-events-auto"
                style={{
                  height: isMobile ? '250px' : '400px',
                  maxWidth: isMobile ? '280px' : '350px'
                }}
              >
                <Canvas
                  camera={{ 
                    position: [0, 0, isMobile ? 4.2 : 3.8], 
                    fov: isMobile ? 45 : 50,
                    near: 0.1,
                    far: 1000
                  }}
                  style={{ 
                    width: '100%', 
                    height: isMobile ? '250px' : '400px',
                    background: 'transparent'
                  }}
                >
                  {/* Lighting */}
                  <ambientLight intensity={0.7} />
                  <directionalLight 
                    position={[5, 5, 5]} 
                    intensity={1.2}
                    castShadow
                  />
                  <pointLight position={[-5, -5, -5]} intensity={0.4} />
                  
                  {/* 3D Robot Model with Suspense for loading */}
                  <Suspense fallback={null}>
                    <RobotModel />
                  </Suspense>
                  
                  {/* OrbitControls - rotation only, no zoom */}
                  <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    enableRotate={true}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 6}
                    autoRotate={false}
                  />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Modal */}
      {showJourneyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModals}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModals}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Start Your Journey</h3>
            <p className="text-gray-600 mb-6">
              Ready to transform your space with our innovative modular lighting system? Let's get started!
            </p>
            <div className="flex flex-col gap-3">
              <button className="bg-[#54BB74] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4a9f65] transition-colors">
                Get Started Now
              </button>
              <button 
                onClick={closeModals}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Brochure Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModals}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModals}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Download Brochure</h3>
            <p className="text-gray-600 mb-6">
              Get detailed information about our modular lighting system, specifications, and installation guide.
            </p>
            <div className="flex flex-col gap-3">
              <button className="bg-[#54BB74] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4a9f65] transition-colors">
                Download PDF
              </button>
              <button 
                onClick={closeModals}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

// Preload the FBX model
useFBX.preload('/models/robotModel.fbx');

export default FreeTrialSection;
