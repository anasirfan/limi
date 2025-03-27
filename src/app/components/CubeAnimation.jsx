'use client';

import { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';
import './CubeAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const interpolate = (start, end, progress) => {
    return start + (end - start) * progress;
};

// Separate component for model loading to leverage React.memo and Suspense
const Model = ({ scrollProgress }) => {
    const { scene } = useGLTF('/models/chandler.glb');
    const modelRef = useRef();
    const { gl } = useThree();
    
    // Clone the scene once on initial load
    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        
        // Process all materials once during initialization
        clone.traverse((child) => {
            if (child.isMesh && child.material) {
                // Clone the material to avoid affecting other instances
                child.material = child.material.clone();
                child.material.transparent = true;
                child.material.opacity = 0;
                child.material.needsUpdate = true;
                child.frustumCulled = true;
            }
        });
        
        return clone;
    }, [scene]);
    
    useEffect(() => {
        gl.setClearColor(0x000000, 0);
        modelRef.current = clonedScene;
    }, [gl, clonedScene]);
    
    // Use useMemo to avoid recalculating part references on every render
    const modelParts = useMemo(() => {
        const parts = {
            main_base_with_wires: null,
            bases: null,
            small_wires: null,
            pendants: null,
            wire_holders: null,
            light_holders: null
        };
        
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                if (child.name === 'main_base_with_wires') {
                    parts.main_base_with_wires = child;
                } else if (child.name === '3_bases') {
                    parts.bases = child;
                } else if (child.name === 'small_wires') {
                    parts.small_wires = child;
                } else if (child.name === 'Pendants') {
                    parts.pendants = child;
                } else if (child.name === 'wire_holders') {
                    parts.wire_holders = child;
                } else if (child.name === 'light_holders') {
                    parts.light_holders = child;
                }
            }
        });
        
        return parts;
    }, [clonedScene]);
    
    // Update opacity based on scroll progress
    useEffect(() => {
        // Main base with wires (40% - 50%)
        if (modelParts.main_base_with_wires && modelParts.main_base_with_wires.material) {
            const mainBaseProgress = scrollProgress < 0.4 ? 0 : Math.min((scrollProgress - 0.4) / 0.1, 1);
            modelParts.main_base_with_wires.material.opacity = mainBaseProgress;
        }
        
        // 3 bases (50% - 55%)
        if (modelParts.bases && modelParts.bases.material) {
            const basesProgress = scrollProgress < 0.5 ? 0 : Math.min((scrollProgress - 0.5) / 0.05, 1);
            modelParts.bases.material.opacity = basesProgress;
        }
        
        // Wire holders (55% - 60%)
        if (modelParts.wire_holders && modelParts.wire_holders.material) {
            const wireHoldersProgress = scrollProgress < 0.55 ? 0 : Math.min((scrollProgress - 0.55) / 0.05, 1);
            modelParts.wire_holders.material.opacity = wireHoldersProgress;
        }
        
        // Small wires (60% - 65%)
        if (modelParts.small_wires && modelParts.small_wires.material) {
            const smallWiresProgress = scrollProgress < 0.6 ? 0 : Math.min((scrollProgress - 0.6) / 0.05, 1);
            modelParts.small_wires.material.opacity = smallWiresProgress;
        }
        
        // Light holders (65% - 70%)
        if (modelParts.light_holders && modelParts.light_holders.material) {
            const lightHoldersProgress = scrollProgress < 0.65 ? 0 : Math.min((scrollProgress - 0.65) / 0.05, 1);
            modelParts.light_holders.material.opacity = lightHoldersProgress;
        }
        
        // Pendants (70% - 75%)
        if (modelParts.pendants && modelParts.pendants.material) {
            const pendantsProgress = scrollProgress < 0.7 ? 0 : Math.min((scrollProgress - 0.7) / 0.05, 1);
            modelParts.pendants.material.opacity = pendantsProgress;
        }
    }, [scrollProgress, modelParts]);
    
    return modelRef.current ? (
        <primitive 
            object={modelRef.current} 
            scale={0.02} 
            position={[5, -1, 0.6]} 
        />
    ) : null;
};

// Simplified PendantScene component
function PendantScene({ scrollProgress }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            
            <Suspense fallback={null}>
                <Model scrollProgress={scrollProgress} />
                <Environment preset="apartment" />
            </Suspense>
        </>
    );
}

// Detect if we're on a mobile device
const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
};

export default function CubeAnimation() {
    const stickyRef = useRef(null);
    const logoRef = useRef(null);
    const cubesContainerRef = useRef(null);
    const header1Ref = useRef(null);
    const header2Ref = useRef(null);
    const bgImageRef = useRef(null);
    const threeSceneRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [deviceIsMobile, setDeviceIsMobile] = useState(false);
    
    // Set mobile detection on mount
    useEffect(() => {
        setDeviceIsMobile(isMobile());
        
        const handleResize = () => {
            setDeviceIsMobile(isMobile());
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Skip heavy processing for mobile devices
        if (deviceIsMobile) {
            // Simplified cube face setup for mobile
            const setupMobileCubes = () => {
                const cubesFaces = document.querySelectorAll(".cube > div");
                cubesFaces.forEach((face) => {
                    const img = document.createElement("img");
                    img.src = `/images/cubes/metal.jpg`;
                    img.alt = "cube-face";
                    face.appendChild(img);
                });
            };
            
            setupMobileCubes();
            
            // Simplified scroll trigger for mobile
            const mobileTrigger = ScrollTrigger.create({
                trigger: stickyRef.current,
                start: "top top",
                end: `+=${window.innerHeight * 1.5}px`, // Shorter scroll distance on mobile
                scrub: 0.5, // Faster scrub on mobile
                pin: true,
                onUpdate: (self) => {
                    // Only update essential elements on mobile
                    setScrollProgress(self.progress);
                    
                    // Simplified animations for mobile
                    logoRef.current.style.opacity = 1 - Math.min(self.progress * 5, 1);
                    
                    // Simplified header animations
                    header1Ref.current.style.opacity = 1 - Math.min(self.progress * 2.5, 1);
                    
                    const header2Progress = Math.max(0, Math.min((self.progress - 0.4) * 2, 1));
                    header2Ref.current.style.opacity = header2Progress;
                    
                    // Background image
                    bgImageRef.current.style.opacity = Math.max(0, Math.min((self.progress - 0.3) * 2, 1));
                    
                    // 3D scene
                    if (threeSceneRef.current) {
                        threeSceneRef.current.style.opacity = Math.max(0, Math.min((self.progress - 0.3) * 2, 1));
                    }
                }
            });
            
            return () => {
                mobileTrigger.kill();
            };
        } else {
            // Full desktop experience
            const stickyHeight = window.innerHeight * 2;
            
            // Add images to cube faces
            const cubesFaces = document.querySelectorAll(".cube > div");
            let imageCounter = 1;
            
            cubesFaces.forEach((face) => {
                const img = document.createElement("img");
                img.src = `/images/cubes/metal.jpg`;
                img.alt = `image-${imageCounter}`;
                face.appendChild(img);
                imageCounter++;
            });
            
            const desktopTrigger = ScrollTrigger.create({
                trigger: stickyRef.current,
                start: "top top",
                end: `+=${stickyHeight}px`,
                scrub: 1,
                pin: true,
                pinSpacing: true,
                onUpdate: (self) => {
                    // Update the scroll progress state for the 3D scene
                    setScrollProgress(self.progress);
                    
                    const initialProgress = Math.min(self.progress * 20, 1);
                    logoRef.current.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;
                    
                    const logoOpacityProgress = self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0;
                    logoRef.current.style.opacity = 1 - logoOpacityProgress;
                    
                    // Calculate cubes opacity
                    let cubesOpacity;
                    if (self.progress < 0.01) {
                        cubesOpacity = 0;
                    } else if (self.progress < 0.5) {
                        const fadeInProgress = Math.min((self.progress - 0.01) * (1 / 0.19), 1);
                        cubesOpacity = fadeInProgress;
                    } else if (self.progress < 0.6) {
                        const fadeOutProgress = (self.progress - 0.5) * 10;
                        cubesOpacity = 1 - fadeOutProgress;
                    } else {
                        cubesOpacity = 0;
                    }
                    cubesContainerRef.current.style.opacity = Math.max(0, Math.min(1, cubesOpacity));
                    
                    // Background image opacity
                    const bgImageProgress = Math.max(0, Math.min((self.progress - 0.3) * (1/0.1), 1));
                    bgImageRef.current.style.opacity = bgImageProgress;
                    
                    // 3D scene opacity
                    if (threeSceneRef.current) {
                        threeSceneRef.current.style.opacity = bgImageProgress;
                    }
                    
                    const header1Progress = Math.min(self.progress * 2.5, 1);
                    header1Ref.current.style.transform = `translate(-50%, -50%) scale(${interpolate(1, 1.5, header1Progress)})`;
                    header1Ref.current.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
                    header1Ref.current.style.opacity = 1 - header1Progress;
                    
                    // Header2 animations
                    const header2StartProgress = (self.progress - 0.4) * (1/0.6);
                    const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
                    const header2Scale = interpolate(0.75, 1, header2Progress);
                    const header2Blur = interpolate(10, 0, header2Progress);
                    
                    header2Ref.current.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
                    header2Ref.current.style.filter = `blur(${header2Blur}px)`;
                    header2Ref.current.style.opacity = header2Progress;
                }
            });
            
            return () => {
                desktopTrigger.kill();
            };
        }
    }, [deviceIsMobile]);

    // Conditionally render 3D scene based on device
    const render3DScene = !deviceIsMobile || (deviceIsMobile && scrollProgress > 0.3);

    return (
        <section 
            id="cube"
            ref={stickyRef}
            className="relative h-screen bg-[#292929] overflow-hidden"
        >
            {/* Background image overlay */}
            <div 
                ref={bgImageRef} 
                className="absolute inset-0 z-0 md:mt-28 md:mx-60 mt-16 mx-4" 
                style={{
                    backgroundImage: 'url(/images/configImages/chandler-bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0,
                    transition: 'opacity 0.5s ease'
                }}
            />
            
            {/* 3D scene container - only render when needed */}
            {render3DScene && (
                <div 
                    ref={threeSceneRef}
                    className="absolute inset-0 z-10 md:mt-28 md:mx-40 mt-16 mx-4"
                    style={{
                        opacity: 0,
                        transition: 'opacity 0.5s ease'
                    }}
                >
                    <Canvas 
                        camera={{ position: [0, 0, 10], fov: 50 }}
                        style={{ background: 'transparent' }}
                        dpr={[1, deviceIsMobile ? 1.5 : 2]} // Lower resolution on mobile
                        frameloop={deviceIsMobile ? "demand" : "always"} // Only render when needed on mobile
                        performance={{ min: 0.5 }} // Allow performance scaling
                    >
                        <PendantScene scrollProgress={scrollProgress} />
                    </Canvas>
                </div>
            )}
            
            <div className="logo" ref={logoRef}>
                <div className="col">
                    <div className="blocked block-1"></div>
                    <div className="blocked block-2"></div>
                </div>
                <div className="col">
                    <div className="blocked block-3"></div>
                    <div className="blocked block-4"></div>
                </div>
                <div className="col">
                    <div className="blocked block-5"></div>
                    <div className="blocked block-6"></div>
                </div>
            </div>

            <div className="cubes" ref={cubesContainerRef}>
              
            </div>

            <div className="header-1" ref={header1Ref}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-center px-4">Illuminating the Path of Innovation in Lighting Design</h1>
            </div>

            <div className="header-2 max-sm:!w-full max-sm:!left-[50%]" ref={header2Ref}>
                <h2 className="text-xl md:text-3xl lg:text-4xl max-sm:text-center  max-sm:px-4 mb-4 max-sm:!mb-2 max-sm:!leading-[24px] max-sm:!text-2xl">Crafting Tomorrow's Lighting Solutions</h2>
                <p className="text-sm md:text-base lg:text-lg max-w-3xl mx-auto max-sm:px-4  md:px-4 max-sm:text-center max-sm:!text-[14px] max-sm:!leading-tight max-sm:!w-[100%] ">
                At LIMI, we revolutionize lighting with cutting-edge 3D visualization, transforming design, experience, and implementation.
                </p>
            </div>
        </section>
    );
}