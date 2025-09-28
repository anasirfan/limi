"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Fog, Vector3 } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Mountain Range Component - Low-poly style mountains
const MountainRange = ({ scrollProgress = 0 }) => {
  const groupRef = useRef();
  const { viewport } = useThree();
  
  // Create mountain geometry
  const createMountainGeometry = (width, height, segments) => {
    const geometry = [];
    const vertices = [];
    
    // Generate mountain vertices with random heights
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments - 0.5) * width;
      const randomHeight = Math.random() * height * 0.3 + height * 0.7;
      const y = i === 0 || i === segments ? 0 : randomHeight;
      vertices.push(new Vector3(x, y, 0));
    }
    
    // Create triangular faces for low-poly look
    for (let i = 0; i < segments; i++) {
      const v1 = vertices[i];
      const v2 = vertices[i + 1];
      const base = new Vector3(v1.x, 0, 0);
      const base2 = new Vector3(v2.x, 0, 0);
      
      geometry.push([v1, v2, base]);
      geometry.push([v2, base2, base]);
    }
    
    return { vertices, geometry };
  };
  
  // Multiple mountain layers for depth
  const mountainLayers = [
    { width: 20, height: 4, segments: 12, z: -8, color: "#1a1a2e", opacity: 0.9 },
    { width: 18, height: 3.5, segments: 10, z: -6, color: "#16213e", opacity: 0.8 },
    { width: 16, height: 3, segments: 8, z: -4, color: "#0f3460", opacity: 0.7 },
    { width: 14, height: 2.5, segments: 6, z: -2, color: "#533483", opacity: 0.6 },
  ];
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle idle animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
      
      // Scroll-based parallax movement
      groupRef.current.position.z = scrollProgress * 2;
      groupRef.current.position.y = scrollProgress * -0.5;
    }
  });
  
  return (
    <group ref={groupRef}>
      {mountainLayers.map((layer, layerIndex) => {
        const { vertices } = createMountainGeometry(layer.width, layer.height, layer.segments);
        
        return (
          <group key={layerIndex} position={[0, -2, layer.z]}>
            {/* Mountain silhouette */}
            <mesh>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={vertices.length}
                  array={new Float32Array(vertices.flatMap(v => [v.x, v.y, v.z]))}
                  itemSize={3}
                />
              </bufferGeometry>
              <meshLambertMaterial 
                color={layer.color} 
                transparent 
                opacity={layer.opacity}
              />
            </mesh>
            
            {/* Mountain peaks with subtle glow */}
            {vertices.map((vertex, i) => (
              vertex.y > 1 && (
                <mesh key={i} position={[vertex.x, vertex.y, 0]}>
                  <sphereGeometry args={[0.05, 8, 8]} />
                  <meshBasicMaterial 
                    color="#ffffff" 
                    transparent 
                    opacity={0.3}
                  />
                </mesh>
              )
            ))}
          </group>
        );
      })}
    </group>
  );
};

// Sky Gradient Background
const SkyGradient = () => {
  const { scene } = useThree();
  
  useEffect(() => {
    // Add fog for atmospheric depth
    scene.fog = new Fog("#0a0a1a", 5, 15);
    
    return () => {
      scene.fog = null;
    };
  }, [scene]);
  
  return (
    <mesh scale={[100, 100, 1]} position={[0, 0, -10]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            vec3 topColor = vec3(0.02, 0.02, 0.1);    // Deep blue
            vec3 bottomColor = vec3(0.1, 0.1, 0.2);   // Lighter blue-gray
            vec3 color = mix(bottomColor, topColor, vUv.y);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};

// 3D Scene Component
const Scene = ({ scrollProgress }) => {
  return (
    <>
      {/* Atmospheric Lighting */}
      <ambientLight intensity={0.2} color="#4a5568" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffd89b"
        castShadow
      />
      <directionalLight
        position={[-10, 5, -5]}
        intensity={0.3}
        color="#667eea"
      />
      
      {/* Sky Background */}
      <SkyGradient />
      
      {/* Mountain Range */}
      <MountainRange scrollProgress={scrollProgress} />
    </>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
    <motion.div
      className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Main Hero Component
const HeroNew = () => {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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
  
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    
    // GSAP ScrollTrigger for parallax effects
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
      
      // Foreground content animations
      gsap.fromTo(".hero-content", 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5
        }
      );
      
      gsap.fromTo(".hero-subtitle", 
        { 
          opacity: 0, 
          y: 30 
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 1
        }
      );
      
      gsap.fromTo(".hero-button", 
        { 
          opacity: 0, 
          y: 20,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 1.5
        }
      );
      
    }, containerRef);
    
    return () => ctx.revert();
  }, [mounted]);
  
  if (!mounted) return null;
  
  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800"
    >
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ 
            position: [0, 2, 8], 
            fov: isMobile ? 60 : 50,
            near: 0.1,
            far: 100
          }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />
      
      {/* Foreground Content Layer */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.h1
            className="hero-content text-white font-bold leading-tight tracking-tight mb-6"
            style={{
              fontSize: isMobile ? 'clamp(2.5rem, 8vw, 4rem)' : 'clamp(4rem, 8vw, 7rem)',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em'
            }}
          >
            Transform Your Space
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            className="hero-subtitle text-white/80 text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed max-w-2xl mx-auto"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            Experience the future of modular lighting with our innovative 3D design system
          </motion.p>
          
          {/* CTA Button */}
          <motion.button
            className="hero-button inline-flex items-center gap-3 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 40px rgba(239, 68, 68, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #DB4444 0%, #B91C1C 100%)',
            }}
          >
            <span>Explore Now</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              →
            </motion.div>
          </motion.button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center text-white/60"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm mb-2 tracking-wide font-medium">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroNew;
