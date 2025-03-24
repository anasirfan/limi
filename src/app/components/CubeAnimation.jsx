'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './CubeAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const interpolate = (start, end, progress) => {
    return start + (end - start) * progress;
};


function PendantScene({ scrollProgress }) {
    const { gl } = useThree();
    const modelRef = useRef();
    const [modelParts, setModelParts] = useState({
        main_base_with_wires: null,
        bases: null,
        small_wires: null,
        pendants: null,
        wire_holders: null,
        light_holders: null
    });
    

    useEffect(() => {
        gl.setClearColor(0x000000, 0);
    }, [gl, scrollProgress]);
    
    // Load the model
    useEffect(() => {
        
        const loadModel = () => {
            try {
                const loader = new GLTFLoader();
                
                loader.load(
                    '/models/chandler.glb',
                    (gltf) => {
                        const clonedScene = gltf.scene.clone();
                        console.log(clonedScene);
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
                            }
                        });
                        
                        clonedScene.traverse((child) => {
                            if (child.isMesh) {
                                // Map the mesh names to our state object keys
                                if (child.name === 'main_base_with_wires') {
                                    // console.log('Found main_base_with_wires part');
                                    parts.main_base_with_wires = child;
                                } else if (child.name === '3_bases') {
                                    // console.log('Found 3_bases part');
                                    parts.bases = child;
                                } else if (child.name === 'small_wires') {
                                    // console.log('Found small_wires part');
                                    parts.small_wires = child;
                                } else if (child.name === 'Pendants') {
                                    // console.log('Found Pendants part');
                                    parts.pendants = child;
                                } else if (child.name === 'wire_holders') {
                                    // console.log('Found wire_holders part');
                                    parts.wire_holders = child;
                                } else if (child.name === 'light_holders') {
                                    // console.log('Found light_holders part');
                                    parts.light_holders = child;
                                }
                                
                                // Set initial opacity to 0 for all parts
                                if (child.material) {
                                    // Clone the material to avoid affecting other instances
                                    child.material = child.material.clone();
                                    
                                    // Enable transparency
                                    child.material.transparent = true;
                                    child.material.opacity = 0;
                                    // console.log(`Set ${child.name} opacity to 0`);
                                }
                            }
                        });
                        
                        // console.log('Final parts object:', parts);
                        setModelParts(parts);
                        
                        // Set the model to the ref
                        modelRef.current = clonedScene;
                        // console.log('Model reference set to modelRef');
                    },
                    (progress) => {
                        // console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%');
                    },
                    (error) => {
                        // console.error('Error loading model:', error);
                    }
                );
            } catch (error) {
                console.error('Error in model loading process:', error);
            }
        };
        
        loadModel();
    }, []);
    
    // Animate parts based on scroll progress
    useEffect(() => {
        // console.log('Scroll progress update:', scrollProgress);
        // console.log('Current model parts state:', modelParts);
        
        if (!modelParts.main_base_with_wires && 
            !modelParts.bases && 
            !modelParts.small_wires && 
            !modelParts.pendants &&
            !modelParts.wire_holders &&
            !modelParts.light_holders) {
            // console.log('Model parts not loaded yet, skipping animation');
            return;
        }
        
        // Define the animation sequence with scroll progress ranges
        // Each part will fade in at a specific scroll progress range
        
        // Main base with wires (40% - 50%)
        if (modelParts.main_base_with_wires && modelParts.main_base_with_wires.material) {
            const mainBaseProgress = scrollProgress < 0.4 ? 0 : Math.min((scrollProgress - 0.4) / 0.1, 1); // 0.4 to 0.5 mapped to 0-1
            modelParts.main_base_with_wires.material.opacity = mainBaseProgress;
            // console.log('main_base_with_wires opacity:', mainBaseProgress);
        } else {
            // console.log('main_base_with_wires part or material missing');
        }
        
        // 3 bases (50% - 55%)
        if (modelParts.bases && modelParts.bases.material) {
            const basesProgress = scrollProgress < 0.5 ? 0 : Math.min((scrollProgress - 0.5) / 0.05, 1); // 0.5 to 0.55 mapped to 0-1
            modelParts.bases.material.opacity = basesProgress;
            // console.log('3_bases opacity:', basesProgress);
        } else {
            // console.log('3_bases part or material missing');
        }
        
        // Wire holders (55% - 60%)
        if (modelParts.wire_holders && modelParts.wire_holders.material) {
            const wireHoldersProgress = scrollProgress < 0.55 ? 0 : Math.min((scrollProgress - 0.55) / 0.05, 1); // 0.55 to 0.6 mapped to 0-1
            modelParts.wire_holders.material.opacity = wireHoldersProgress;
            // console.log('wire_holders opacity:', wireHoldersProgress);
        } else {
            // console.log('wire_holders part or material missing');
        }
        
        // Small wires (60% - 65%)
        if (modelParts.small_wires && modelParts.small_wires.material) {
            const smallWiresProgress = scrollProgress < 0.6 ? 0 : Math.min((scrollProgress - 0.6) / 0.05, 1); // 0.6 to 0.65 mapped to 0-1
            modelParts.small_wires.material.opacity = smallWiresProgress;
            // console.log('small_wires opacity:', smallWiresProgress);
        } else {
            // console.log('small_wires part or material missing');
        }
        
        // Light holders (65% - 70%)
        if (modelParts.light_holders && modelParts.light_holders.material) {
            const lightHoldersProgress = scrollProgress < 0.65 ? 0 : Math.min((scrollProgress - 0.65) / 0.05, 1); // 0.65 to 0.7 mapped to 0-1
            modelParts.light_holders.material.opacity = lightHoldersProgress;
            // console.log('light_holders opacity:', lightHoldersProgress);
        } else {
            // console.log('light_holders part or material missing');
        }
        
        // Pendants (70% - 75%)
        if (modelParts.pendants && modelParts.pendants.material) {
            const pendantsProgress = scrollProgress < 0.7 ? 0 : Math.min((scrollProgress - 0.7) / 0.05, 1); // 0.7 to 0.75 mapped to 0-1
            modelParts.pendants.material.opacity = pendantsProgress;
            // console.log('Pendants opacity:', pendantsProgress);
        } else {
            // console.log('Pendants part or material missing');
        }
        
        // Add rotation animation after all parts are visible (75%+)
        // if (modelRef.current && scrollProgress >= 0.75) {
        //     // Calculate rotation speed based on scroll progress beyond 75%
        //     const rotationProgress = Math.min((scrollProgress - 0.75) / 0.25, 1); // 0.75 to 1.0 mapped to 0-1
        //     const rotationSpeed = rotationProgress * 0.05; // Adjust this value to control rotation speed
            
        //     // Apply rotation to the entire model
        //     modelRef.current.rotation.y += rotationSpeed;
            
        //     // Optional: Add some vertical bobbing motion
        //     const time = Date.now() * 0.001; // Get current time in seconds
        //     modelRef.current.position.y = -1 + Math.sin(time * 2) * 0.05 * rotationProgress; // Subtle up/down motion
        // }
    }, [scrollProgress, modelParts]);
    
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            
            {/* Render the model */}
            {modelRef.current && (
                <>
                    <primitive 
                        object={modelRef.current} 
                        scale={0.02} 
                        position={[5., -1, 0.6]} 
                    />
                </>
            )}
            
            <Environment preset="apartment" />
        </>
    );
}

export default function CubeAnimation() {
    const stickyRef = useRef(null);
    const logoRef = useRef(null);
    const cubesContainerRef = useRef(null);
    const header1Ref = useRef(null);
    const header2Ref = useRef(null);
    const bgImageRef = useRef(null);
    const threeSceneRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
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

        ScrollTrigger.create({
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

                // Calculate cubes opacity - fade in early, then start fading out at 60% and completely gone by 70%
                let cubesOpacity;
                if (self.progress < 0.01) {
                    cubesOpacity = 0; // Start at 0
                } else if (self.progress < 0.5) {
                    // Fade in from 0.01 to 0.2, then stay visible until 0.5
                    const fadeInProgress = Math.min((self.progress - 0.01) * (1 / 0.19), 1);
                    cubesOpacity = fadeInProgress;
                } else if (self.progress < 0.6) {
                    // Fade out from 0.5 to 0.6
                    const fadeOutProgress = (self.progress - 0.5) * 10; // 10 = 1/(0.6-0.5)
                    cubesOpacity = 1 - fadeOutProgress;
                } else {
                    // Completely gone after 60%
                    cubesOpacity = 0;
                }
                cubesContainerRef.current.style.opacity = Math.max(0, Math.min(1, cubesOpacity));

                // Background image opacity - start appearing at 50% progress
                const bgImageProgress = Math.max(0, Math.min((self.progress - 0.3) * (1/0.1), 1)); // Start at 0.5, fully visible at 0.6
                bgImageRef.current.style.opacity = bgImageProgress;

                // 3D scene opacity - sync with background image
                if (threeSceneRef.current) {
                    threeSceneRef.current.style.opacity = bgImageProgress;
                }

                const header1Progress = Math.min(self.progress * 2.5, 1);
                header1Ref.current.style.transform = `translate(-50%, -50%) scale(${interpolate(1, 1.5, header1Progress)})`;
                header1Ref.current.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
                header1Ref.current.style.opacity = 1 - header1Progress;

                // Modify header2 to appear after header1 starts fading (at 0.4 progress)
                const header2StartProgress = (self.progress - 0.4) * (1/0.6); // Start at 0.4, fully visible at 1.0
                const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
                const header2Scale = interpolate(0.75, 1, header2Progress);
                const header2Blur = interpolate(10, 0, header2Progress);

                header2Ref.current.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
                header2Ref.current.style.filter = `blur(${header2Blur}px)`;
                header2Ref.current.style.opacity = header2Progress;
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Preload the 3D models
    useEffect(() => {
        const modelPaths = ['/models/chandler.glb'];
        // No need to preload with useLoader since we're using the native loader
    }, []);

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
            
            {/* 3D scene container */}
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
                >
                    <PendantScene scrollProgress={scrollProgress} />
                </Canvas>
            </div>
            
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