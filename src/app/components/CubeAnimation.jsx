'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, useHelper } from '@react-three/drei';
import { PointLightHelper, SpotLightHelper } from 'three';
import * as THREE from 'three';
import { cubesData } from './CubesData';
import './CubeAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const interpolate = (start, end, progress) => {
    return start + (end - start) * progress;
};

// Component for the Pendant model with assembly animation
function PendantModel({ position, scrollProgress, pendantPath, isLeft }) {
    const { scene } = useGLTF(pendantPath);
    const hubRef = useRef();
    const cablesRef = useRef();
    const p1Ref = useRef();
    const p2Ref = useRef();
    const p3Ref = useRef();
    const pendantGroupRef = useRef();
    const modelRotationRef = useRef();
    const pointLightRef = useRef();

    // Clone the scene to avoid manipulating the cached original
    const [model, setModel] = useState(null);
    const [initialPositions, setInitialPositions] = useState({
        p1: null,
        p2: null,
        p3: null
    });
    
    useEffect(() => {
        if (scene) {
            const clonedScene = scene.clone();
            
            // Find hub, cables, and pendant parts in the model
            const hub = clonedScene.getObjectByName('Hub');
            const cables = clonedScene.getObjectByName('Cables');
            const p1 = clonedScene.getObjectByName('P1');
            const p2 = clonedScene.getObjectByName('P2');
            const p3 = clonedScene.getObjectByName('P3');

            // Store initial positions for animation
            if (p1 && p2 && p3) {
                setInitialPositions({
                    p1: p1.position.clone(),
                    p2: p2.position.clone(),
                    p3: p3.position.clone()
                });
            }

            // If parts are found, set initial visibility and position
            if (hub) {
                hubRef.current = hub;
                hub.visible = false;
                // Store original position for sliding animation
                hub.userData.originalY = hub.position.y;
                // Start position is above the original position
                hub.position.y = hub.position.y + 5;
            }

            if (cables) {
                cablesRef.current = cables;
                cables.visible = false;
                cables.material = cables.material.clone();
                cables.material.transparent = true;
                cables.material.opacity = 0;
            }

            if (p1) {
                p1Ref.current = p1;
                p1.visible = false;
                // Store original position for animation from bottom
                p1.userData.originalY = p1.position.y;
                // Start position is below the original position
                p1.position.y = p1.position.y - 5;
            }

            if (p2) {
                p2Ref.current = p2;
                p2.visible = false;
                p2.userData.originalY = p2.position.y;
                p2.position.y = p2.position.y - 3;
            }

            if (p3) {
                p3Ref.current = p3;
                p3.visible = false;
                p3.userData.originalY = p3.position.y;
                p3.position.y = p3.position.y - 1;
            }

            setModel(clonedScene);
        }
    }, [scene]);
    
    // Create light for emission effect
    useEffect(() => {
        if (pointLightRef.current) {
            pointLightRef.current.intensity = 0;
            pointLightRef.current.distance = 10;
            pointLightRef.current.decay = 2;
        }
    }, []);
    
    useFrame(() => {
        // Use scrollProgress to drive animations
        if (hubRef.current && cablesRef.current && p1Ref.current && p2Ref.current && p3Ref.current && pointLightRef.current && model && modelRotationRef.current) {
            // Allocate 50% of animation time to pendant transition (0.5-1.0)
            // Phase 1 (0.5-0.6): Hub appears and slides down
            const hubPhase = Math.max(0, Math.min((scrollProgress - 0.5) * 10, 1));
            hubRef.current.visible = hubPhase > 0;
            
            // Slide hub from top to its original position
            if (hubPhase > 0) {
                const originalY = hubRef.current.userData.originalY;
                hubRef.current.position.y = interpolate(originalY + 5, originalY, hubPhase);
            }

            // Phase 2 (0.6-0.7): Cables fade in
            const cablesPhase = Math.max(0, Math.min((scrollProgress - 0.6) * 10, 1));
            cablesRef.current.visible = cablesPhase > 0;
            
            // Fade in cables with opacity transition
            if (cablesPhase > 0) {
                cablesRef.current.material.opacity = cablesPhase;
            }

            // Phase 3 (0.7-0.8): P1 appears and moves up from bottom
            const p1Phase = Math.max(0, Math.min((scrollProgress - 0.7) * 10, 1));
            p1Ref.current.visible = p1Phase > 0;
            
            // Move P1 from bottom to its original position
            if (p1Phase > 0) {
                const originalY = p1Ref.current.userData.originalY;
                p1Ref.current.position.y = interpolate(originalY - 5, originalY, p1Phase);
            }
            
            // Phase 4 (0.8-0.9): P2 appears and moves up from bottom
            const p2Phase = Math.max(0, Math.min((scrollProgress - 0.8) * 10, 1));
            p2Ref.current.visible = p2Phase > 0;
            
            // Move P2 from bottom to its original position
            if (p2Phase > 0) {
                const originalY = p2Ref.current.userData.originalY;
                p2Ref.current.position.y = interpolate(originalY - 3, originalY, p2Phase);
            }
            
            // Phase 5 (0.9-0.95): P3 appears and moves up from bottom
            const p3Phase = Math.max(0, Math.min((scrollProgress - 0.9) * 20, 1));
            p3Ref.current.visible = p3Phase > 0;
            
            // Move P3 from bottom to its original position
            if (p3Phase > 0) {
                const originalY = p3Ref.current.userData.originalY;
                p3Ref.current.position.y = interpolate(originalY - 1, originalY, p3Phase);
            }

            // Phase 6 (0.95-1.0): Final spin and glow effect
            const spinPhase = Math.max(0, Math.min((scrollProgress - 0.95) * 20, 1));
            
            if (spinPhase > 0 && modelRotationRef.current) {
                // Calculate incremental rotation based on spinPhase
                // const spinAmount = interpolate(0, Math.PI * 2, spinPhase);
                
                // // Apply the rotation
                // modelRotationRef.current.rotation.y += spinAmount * 0.02; 
                // Increase light intensity for glow effect
                pointLightRef.current.intensity = interpolate(5, 15, spinPhase);
                pointLightRef.current.distance = interpolate(10, 20, spinPhase);
            } else {
                // Base light intensity before spin
                pointLightRef.current.intensity = p3Phase * 5;
            }

            // Position light inside the pendant
            if (p3Ref.current.visible) {
                const lampPosition = new THREE.Vector3();
                p3Ref.current.getWorldPosition(lampPosition);
                pointLightRef.current.position.copy(lampPosition);
            }
        }
    });
    
    // Return the assembled model and light
    return (
        <group position={position} rotation={[0, isLeft ? Math.PI/4 : -Math.PI/4, 0]} ref={pendantGroupRef}>
            <group ref={modelRotationRef}>
                {model && <primitive object={model} scale={4} />}
            </group>
            <pointLight
                ref={pointLightRef}
                color={isLeft ? "#FFC107" : "#54bb74"} 
                intensity={0}
                distance={15}
                decay={2}
            />
        </group>
    );
}

// Main component for 3D scene
function PendantScene({ scrollProgress }) {
    const { gl } = useThree();
    
    // Make renderer background transparent
    useEffect(() => {
        gl.setClearColor(0x000000, 0);
    }, [gl]);
    
    return (
        <>
            <ambientLight intensity={0.5} />
            <PendantModel 
                position={[-3, -1, 4]} 
                scrollProgress={scrollProgress} 
                pendantPath="/models/pendant1.glb" 
                isLeft={true} 
            />
            <PendantModel 
                position={[3, -1, 3]} 
                scrollProgress={scrollProgress} 
                pendantPath="/models/pandent2.glb" 
                isLeft={false} 
            />
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

                Object.entries(cubesData).forEach(([cubeClass, data]) => {
                    const cube = document.querySelector(`.${cubeClass}`);
                    const { initial, final } = data;

                    const currentTop = interpolate(initial.top, final.top, firstPhaseProgress);
                    const currentLeft = interpolate(initial.left, final.left, firstPhaseProgress);
                    const currentRotateX = interpolate(initial.rotateX, final.rotateX, firstPhaseProgress);
                    const currentRotateY = interpolate(initial.rotateY, final.rotateY, firstPhaseProgress);
                    const currentRotateZ = interpolate(initial.rotateZ, final.rotateZ, firstPhaseProgress);
                    const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);

                    let additionalRotation = 0;

                    if (cubeClass === "cube-2") {
                        additionalRotation = interpolate(0, 180, secondPhaseProgress);
                    } else if (cubeClass === "cube-4") {
                        additionalRotation = interpolate(0, -180, secondPhaseProgress);
                    }

                    cube.style.top = `${currentTop}%`;
                    cube.style.left = `${currentLeft}%`;
                    cube.style.transform = `
                        translate3d(-50%,-50%,${currentZ}px)            
                        rotateX(${currentRotateX}deg)
                        rotateY(${currentRotateY + additionalRotation}deg) 
                        rotateZ(${currentRotateZ}deg)
                    `;
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Preload the 3D models
    useEffect(() => {
        const modelPaths = ['/models/pendant1.glb', '/models/pandent2.glb', '/models/hub.glb'];
        modelPaths.forEach(path => {
            useGLTF.preload(path);
        });
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
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} className={`cube cube-${num}`}>
                            <div className="front"></div>
                            <div className="back"></div>
                            <div className="right"></div>
                            <div className="left"></div>
                            <div className="top"></div>
                            <div className="bottom"></div>
                        </div>
                    ))}
                </div>

                <div className="header-1" ref={header1Ref}>
                    <h1>Illuminating the Path of Innovation in Lighting Design</h1>
                </div>

                <div className="header-2" ref={header2Ref}>
                    <h2>Crafting Tomorrow's Lighting Solutions</h2>
                    <p className="!text-[#292929]">
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
