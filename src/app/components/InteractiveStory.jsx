'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const TRIANGLE_CONFIG = {
  HUB: { x: -173.2, y: -100 }, // 200px from center at 120 degrees
  BASE: { x: 173.2, y: -100 }, // 200px from center at 60 degrees
  APP: { x: 0, y: 200 }, // 200px from center at 270 degrees
};

const PENDANT_MODELS = [
  '/models/pendant1.glb',
  '/models/pendant2.glb',
  '/models/pendant3.glb',
];

const InteractiveStory = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const hubRef = useRef(null);
  const baseRef = useRef(null);
  const appRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const pendantRef = useRef(null);
  const connectorsRef = useRef(null);
  const roomRef = useRef(null);
  
  const [currentPendantIndex, setCurrentPendantIndex] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Update pendant model based on scroll progress
            const newIndex = Math.floor(self.progress * PENDANT_MODELS.length);
            if (newIndex !== currentPendantIndex && newIndex < PENDANT_MODELS.length) {
              setCurrentPendantIndex(newIndex);
              updatePendantModel(PENDANT_MODELS[newIndex]);
            }
          }
        },
      });

      // Initial heading animation
      timeline
        .from(headingRef.current, {
          scale: 2,
          duration: 1,
          ease: 'power2.out',
        })
        .to(headingRef.current, {
          y: 0,
          scale: 0.8,
          position: 'fixed',
          top: '2rem',
          opacity: 0,
          duration: 1,
        });

      // Move divs into triangle formation
      timeline
        .from([hubRef.current, baseRef.current, appRef.current], {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
        })
        .to(hubRef.current, {
          x: TRIANGLE_CONFIG.HUB.x,
          y: TRIANGLE_CONFIG.HUB.y,
          duration: 1,
        }, 'triangle')
        .to(baseRef.current, {
          x: TRIANGLE_CONFIG.BASE.x,
          y: TRIANGLE_CONFIG.BASE.y,
          duration: 1,
        }, 'triangle')
        .to(appRef.current, {
          x: TRIANGLE_CONFIG.APP.x,
          y: TRIANGLE_CONFIG.APP.y,
          duration: 1,
        }, 'triangle')
        // Fade in images
        .to('.div-image', {
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
        })
        // Animate connectors
        .from('.connector-dot', {
          scale: 0,
          duration: 0.3,
          stagger: 0.1,
        })
        .from('.connector-line', {
          scaleX: 0,
          duration: 0.5,
          stagger: 0.1,
        })
        .from('.connector-text', {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.1,
        })
        // Scale up triangle
        .to('.triangle-container', {
          scale: 1.5,
          duration: 1,
        })
        // Transition to room
        .to('.room-background', {
          opacity: 1,
          duration: 1,
        })
        .to('.triangle-container', {
          opacity: 0,
          duration: 0.5,
        });
    });

    return () => ctx.revert();
  }, [currentPendantIndex]);

  const updatePendantModel = async (modelPath) => {
    if (!sceneRef.current || !pendantRef.current) return;
    
    const loader = new GLTFLoader();
    try {
      const gltf = await loader.loadAsync(modelPath);
      sceneRef.current.remove(pendantRef.current);
      pendantRef.current = gltf.scene;
      sceneRef.current.add(gltf.scene);
      
      // Fade transition
      gsap.fromTo(pendantRef.current.position, 
        { y: -2 },
        { y: 0, duration: 1, ease: 'power2.out' }
      );
    } catch (error) {
      console.error('Error loading pendant model:', error);
    }
  };

  useEffect(() => {
    // Initialize Three.js scene
    const initThreeJS = () => {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      const threeContainer = document.getElementById('three-container');
      threeContainer.appendChild(renderer.domElement);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 10, 5);
      scene.add(directionalLight);

      // Load pendant model
      const loader = new GLTFLoader();
      loader.load(PENDANT_MODELS[currentPendantIndex], (gltf) => {
        pendantRef.current = gltf.scene;
        scene.add(gltf.scene);
      });

      const animate = () => {
        requestAnimationFrame(animate);
        if (pendantRef.current) {
          pendantRef.current.rotation.y += 0.005;
        }
        renderer.render(scene, camera);
      };
      animate();
    };

    initThreeJS();

    // Cleanup
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Heading */}
      <h1
        ref={headingRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white"
      >
        Interactive Story
      </h1>

      {/* Triangle Container */}
      <div className="triangle-container relative h-full w-full">
        {/* Hub Div */}
        <div
          ref={hubRef}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-blue-500 p-4"
        >
          <div className="div-image opacity-0">
            <Image src="/images/hub.png" alt="Hub" width={160} height={160} />
          </div>
          <div className="connector-dot absolute -right-2 top-1/2 h-4 w-4 rounded-full bg-white"></div>
          <div className="connector-line absolute -right-32 top-1/2 h-0.5 w-28 bg-white origin-left"></div>
          <p className="connector-text absolute -right-64 top-1/2 w-32 text-white">Hub Description</p>
        </div>

        {/* Base Div */}
        <div
          ref={baseRef}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-green-500 p-4"
        >
          <div className="div-image opacity-0">
            <Image src="/images/base.jpg" alt="Base" width={160} height={160} />
          </div>
          <div className="connector-dot absolute -left-2 top-1/2 h-4 w-4 rounded-full bg-white"></div>
          <div className="connector-line absolute -left-32 top-1/2 h-0.5 w-28 bg-white origin-right"></div>
          <p className="connector-text absolute -left-64 top-1/2 w-32 text-right text-white">Base Description</p>
        </div>

        {/* App Div */}
        <div
          ref={appRef}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-purple-500 p-4"
        >
          <div className="div-image opacity-0">
            <Image src="/images/mobile-app.jpg" alt="App" width={160} height={160} />
          </div>
          <div className="connector-dot absolute left-1/2 -top-2 h-4 w-4 rounded-full bg-white"></div>
          <div className="connector-line absolute left-1/2 -top-32 h-28 w-0.5 bg-white origin-bottom"></div>
          <p className="connector-text absolute left-1/2 -top-64 w-32 -translate-x-1/2 text-center text-white">App Description</p>
        </div>

        {/* SVG Connectors */}
        <svg className="absolute inset-0 pointer-events-none" ref={connectorsRef}>
          <line className="connector" x1="0" y1="0" x2="0" y2="0" stroke="white" strokeWidth="2" />
          <line className="connector" x1="0" y1="0" x2="0" y2="0" stroke="white" strokeWidth="2" />
          <line className="connector" x1="0" y1="0" x2="0" y2="0" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      {/* Room Background */}
      <div className="room-background absolute inset-0 opacity-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-700"></div>
        <div className="absolute inset-0 bg-[url('/images/room-texture.jpg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Three.js Container */}
      <div id="three-container" className="absolute inset-0" />
    </div>
  );
};

export default InteractiveStory;
