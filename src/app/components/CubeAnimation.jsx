'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { cubesData } from './CubesData';
import './CubeAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const interpolate = (start, end, progress) => {
    return start + (end - start) * progress;
};


// Main component for 3D scene
function PendantScene({ scrollProgress }) {
    const { gl } = useThree();
    const modelRef = useRef();
    const [modelParts, setModelParts] = useState({
        main_base_with_wires: null,
        bases: null,
        small_wires: null,
        pendants: null
    });
    
    // Make renderer background transparent
    useEffect(() => {
        gl.setClearColor(0x000000, 0);
        console.log('PendantScene initialized, scroll progress:', scrollProgress);
    }, [gl, scrollProgress]);
    
    // Load the model
    useEffect(() => {
        console.log('Starting model loading...');
        
        const loadModel = () => {
            try {
                console.log('Loading model from /models/chandler.glb');
                
                // Use the GLTFLoader from three.js directly
                const loader = new GLTFLoader();
                
                loader.load(
                    '/models/chandler.glb',
                    (gltf) => {
                        console.log('Model loaded successfully:', gltf.scene);
                        
                        // Clone the scene to avoid manipulating the cached original
                        const clonedScene = gltf.scene.clone();
                        console.log('Scene cloned');
                        
                        // Find and store references to all required parts
                        const parts = {
                            main_base_with_wires: null,
                            bases: null,
                            small_wires: null,
                            pendants: null
                        };
                        
                        // Log all mesh names in the scene to help with debugging
                        console.log('Searching for model parts. All meshes in scene:');
                        clonedScene.traverse((child) => {
                            if (child.isMesh) {
                                console.log('Found mesh:', child.name, child);
                            }
                        });
                        
                        clonedScene.traverse((child) => {
                            if (child.isMesh) {
                                // Map the mesh names to our state object keys
                                if (child.name === 'main_base_with_wires') {
                                    console.log('Found main_base_with_wires part');
                                    parts.main_base_with_wires = child;
                                } else if (child.name === '3_bases') {
                                    console.log('Found 3_bases part');
                                    parts.bases = child;
                                } else if (child.name === 'small_wires') {
                                    console.log('Found small_wires part');
                                    parts.small_wires = child;
                                } else if (child.name === 'Pendants') {
                                    console.log('Found Pendants part');
                                    parts.pendants = child;
                                }
                                
                                // Set initial opacity to 0 for all parts
                                if (child.material) {
                                    // Clone the material to avoid affecting other instances
                                    child.material = child.material.clone();
                                    
                                    // Enable transparency
                                    child.material.transparent = true;
                                    child.material.opacity = 0;
                                    console.log(`Set ${child.name} opacity to 0`);
                                }
                            }
                        });
                        
                        console.log('Final parts object:', parts);
                        setModelParts(parts);
                        
                        // Set the model to the ref
                        modelRef.current = clonedScene;
                        console.log('Model reference set to modelRef');
                    },
                    (progress) => {
                        console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%');
                    },
                    (error) => {
                        console.error('Error loading model:', error);
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
        console.log('Scroll progress update:', scrollProgress);
        console.log('Current model parts state:', modelParts);
        
        if (!modelParts.main_base_with_wires && 
            !modelParts.bases && 
            !modelParts.small_wires && 
            !modelParts.pendants) {
            console.log('Model parts not loaded yet, skipping animation');
            return;
        }
        
        // Define the animation sequence with scroll progress ranges
        // Each part will fade in at a specific scroll progress range
        
        // Main base with wires (0% - 35%)
        if (modelParts.main_base_with_wires && modelParts.main_base_with_wires.material) {
            const mainBaseProgress = Math.min(scrollProgress / 0.55, 1); // 0 to 0.35 mapped to 0-1
            modelParts.main_base_with_wires.material.opacity = mainBaseProgress;
            console.log('main_base_with_wires opacity:', mainBaseProgress);
        } else {
            console.log('main_base_with_wires part or material missing');
        }
        
        // 3 bases (50% - 60%)
        if (modelParts.bases && modelParts.bases.material) {
            const basesProgress = scrollProgress < 0.6 ? 0 : Math.min((scrollProgress - 0.35) / 0.1, 1); // 0.5 to 0.6 mapped to 0-1
            modelParts.bases.material.opacity = basesProgress;
            console.log('3_bases opacity:', basesProgress);
        } else {
            console.log('3_bases part or material missing');
        }
        
        // Small wires (70% - 80%)
        if (modelParts.small_wires && modelParts.small_wires.material) {
            const smallWiresProgress = scrollProgress < 0.7 ? 0 : Math.min((scrollProgress - 0.7) / 0.1, 1); // 0.7 to 0.8 mapped to 0-1
            modelParts.small_wires.material.opacity = smallWiresProgress;
            console.log('small_wires opacity:', smallWiresProgress);
        } else {
            console.log('small_wires part or material missing');
        }
        
        // Pendants (85% - 90%)
        if (modelParts.pendants && modelParts.pendants.material) {
            const pendantsProgress = scrollProgress < 0.85 ? 0 : Math.min((scrollProgress - 0.85) / 0.05, 1); // 0.85 to 0.9 mapped to 0-1
            modelParts.pendants.material.opacity = pendantsProgress;
            console.log('Pendants opacity:', pendantsProgress);
        } else {
            console.log('Pendants part or material missing');
        }
    }, [scrollProgress, modelParts]);
    
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            
            {/* Render the model */}
            {modelRef.current && (
                <>
                    <primitive object={modelRef.current} scale={0.02} position={[5.3, -1, 1.3]} />
                    {console.log('Rendering model')}
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
        const stickyHeight = window.innerHeight * 6;

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
                const bgImageProgress = Math.max(0, Math.min((self.progress - 0.5) * (1/0.1), 1)); // Start at 0.5, fully visible at 0.6
                bgImageRef.current.style.opacity = bgImageProgress;

                // 3D scene opacity - sync with background image
                if (threeSceneRef.current) {
                    threeSceneRef.current.style.opacity = bgImageProgress;
                }

                const header1Progress = Math.min(self.progress * 2.5, 1);
                header1Ref.current.style.transform = `translate(-50%, -50%) scale(${interpolate(1, 1.5, header1Progress)})`;
                header1Ref.current.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
                header1Ref.current.style.opacity = 1 - header1Progress;

                // Modify header2 to appear after cubes start fading (at 0.7 progress)
                const header2StartProgress = (self.progress - 0.7) * (1/0.3); // Start at 0.7, fully visible at 1.0
                const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
                const header2Scale = interpolate(0.75, 1, header2Progress);
                const header2Blur = interpolate(10, 0, header2Progress);

                header2Ref.current.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
                header2Ref.current.style.filter = `blur(${header2Blur}px)`;
                header2Ref.current.style.opacity = header2Progress;

                // Animation for cube positions and rotations continues until the end
                // This means cubes will continue moving even as they fade out
                const firstPhaseProgress = Math.min(self.progress * 1.25, 1); // Complete movement by 80% of scroll
                const secondPhaseProgress = self.progress >= 0.5 ? (self.progress - 0.5) * 2 : 0;

                // Object.entries(cubesData).forEach(([cubeClass, data]) => {
                //     const cube = document.querySelector(`.${cubeClass}`);
                //     const { initial, final } = data;

                //     const currentTop = interpolate(initial.top, final.top, firstPhaseProgress);
                //     const currentLeft = interpolate(initial.left, final.left, firstPhaseProgress);
                //     const currentRotateX = interpolate(initial.rotateX, final.rotateX, firstPhaseProgress);
                //     const currentRotateY = interpolate(initial.rotateY, final.rotateY, firstPhaseProgress);
                //     const currentRotateZ = interpolate(initial.rotateZ, final.rotateZ, firstPhaseProgress);
                //     const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);

                //     let additionalRotation = 0;

                //     if (cubeClass === "cube-2") {
                //         additionalRotation = interpolate(0, 180, secondPhaseProgress);
                //     } else if (cubeClass === "cube-4") {
                //         additionalRotation = interpolate(0, -180, secondPhaseProgress);
                //     }

                //     cube.style.top = `${currentTop}%`;
                //     cube.style.left = `${currentLeft}%`;
                //     cube.style.transform = `
                //         translate3d(-50%,-50%,${currentZ}px)            
                //         rotateX(${currentRotateX}deg)
                //         rotateY(${currentRotateY + additionalRotation}deg) 
                //         rotateZ(${currentRotateZ}deg)
                //     `;
                // });
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
        <>
            <section className="sticky" ref={stickyRef}>
                {/* Background image overlay */}
                <div 
                    ref={bgImageRef} 
                    className="absolute inset-0 z-0 mt-28 mx-40" 
                    style={{
                        backgroundImage: 'url(/images/configImages/new-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0,
                        transition: 'opacity 0.5s ease'
                    }}
                />
                
                {/* 3D scene container */}
                <div 
                    ref={threeSceneRef}
                    className="absolute inset-0 z-10 mt-28 mx-40"
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
                    <h1>Illuminating the Path of Innovation in Lighting Design</h1>
                </div>

                <div className="header-2 " ref={header2Ref}>
                    <h2>Crafting Tomorrow's Lighting Solutions</h2>
                    <p className="!text-[#0c0c0c]">
                        At LIMI, we're revolutionizing the lighting industry through cutting-edge 
                        3D visualization technology. Our journey began with a vision to transform 
                        how lighting solutions are designed, experienced, and implemented in the 
                        modern world.
                    </p>
                </div>
            </section>
        </>
    );
}