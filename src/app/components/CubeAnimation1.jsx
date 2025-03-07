'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cubesData } from './CubesData';
import './CubeAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const interpolate = (start, end, progress) => {
    return start + (end - start) * progress;
};

export default function CubeAnimation1() {
    const stickyRef = useRef(null);
    const logoRef = useRef(null);
    const cubesContainerRef = useRef(null);
    const header1Ref = useRef(null);
    const header2Ref = useRef(null);
    const bgImageRef = useRef(null);

    useEffect(() => {
        const stickyHeight = window.innerHeight * 4;

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
                const initialProgress = Math.min(self.progress * 20, 1);
                logoRef.current.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;

                const logoOpacityProgress = self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0;
                logoRef.current.style.opacity = 1 - logoOpacityProgress;

                // Calculate cubes opacity - fade in early, then start fading out at 70% and completely gone by 80%
                let cubesOpacity;
                if (self.progress < 0.01) {
                    cubesOpacity = 0; // Start at 0
                } else if (self.progress < 0.7) {
                    // Fade in from 0.01 to 0.2, then stay visible until 0.7
                    const fadeInProgress = Math.min((self.progress - 0.01) * (1 / 0.19), 1);
                    cubesOpacity = fadeInProgress;
                } else if (self.progress < 0.8) {
                    // Fade out from 0.7 to 0.8
                    const fadeOutProgress = (self.progress - 0.7) * 10; // 10 = 1/(0.8-0.7)
                    cubesOpacity = 1 - fadeOutProgress;
                } else {
                    // Completely gone after 80%
                    cubesOpacity = 0;
                }
                cubesContainerRef.current.style.opacity = Math.max(0, Math.min(1, cubesOpacity));

                // Background image opacity - start appearing at 70% progress
                const bgImageProgress = Math.max(0, Math.min((self.progress - 0.7) * (1/0.3), 1)); // Start at 0.7, fully visible at 1.0
                bgImageRef.current.style.opacity = bgImageProgress;

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

    return (
        <>
            <section className="sticky" ref={stickyRef}>
                {/* Background image overlay */}
                <div 
                    ref={bgImageRef} 
                    className="absolute inset-0 z-0 mt-28 mx-40" 
                    style={{
                        backgroundImage: 'url(/images/configImages/bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0,
                        transition: 'opacity 0.5s ease'
                    }}
                />
                
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
                    <p>
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
