'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const modelPartsRef = useRef([]);
  const lightsRef = useRef({});

  useEffect(() => {
    if (!canvasRef.current) return;

    // ===== SCENE SETUP =====
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black
    scene.fog = new THREE.Fog(0x000000, 10, 50);
    sceneRef.current = scene;

    // ===== CAMERA SETUP =====
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // ===== RENDERER SETUP =====
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // ===== LIGHTING SETUP =====
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Main directional light (key light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    lightsRef.current.directional = directionalLight;

    // Fill light (softer, from opposite side)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Rim light (backlight for edge definition)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);
    lightsRef.current.rim = rimLight;

    // Point light for AI Core glow effect (initially off)
    const coreGlow = new THREE.PointLight(0x00ffff, 0, 3);
    coreGlow.position.set(0, 0, 0);
    scene.add(coreGlow);
    lightsRef.current.coreGlow = coreGlow;

    // ===== LOAD 3D MODEL =====
    // Setup DRACOLoader for compressed models
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    
    loader.load(
      '/assemblyImages/base_3d_model.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);

        // Enable shadows for all meshes
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Enhance materials
            if (child.material) {
              child.material.metalness = 0.7;
              child.material.roughness = 0.3;
            }

            // Store parts for exploded view animation
            modelPartsRef.current.push({
              mesh: child,
              originalPosition: child.position.clone(),
              originalRotation: child.rotation.clone(),
            });
          }
        });

        scene.add(model);
        modelRef.current = model;

        // Initialize scroll animations after model loads
        initScrollAnimations();
      },
      (progress) => {
        console.log('Loading model:', (progress.loaded / progress.total * 100).toFixed(2) + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // ===== ANIMATION LOOP =====
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      
      // Enhanced floating effect with smooth oscillations
      if (modelRef.current) {
        // Left-right tilt (Z-axis rotation) - gentle sway
        modelRef.current.rotation.z = Math.sin(time * 0.4) * 0.08;
        
        // Forward-back tilt (X-axis rotation) - subtle rock
        modelRef.current.rotation.x = Math.cos(time * 0.35) * 0.06;
        
        // Up and down movement (Y-axis position) - floating
        modelRef.current.position.y = Math.sin(time * 0.6) * 0.15;
        
        // Slow continuous rotation (Y-axis) - always rotating
        modelRef.current.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ===== SCROLL ANIMATIONS =====
    const initScrollAnimations = () => {
      const model = modelRef.current;
      const camera = cameraRef.current;
      const parts = modelPartsRef.current;

      // SECTION 1: INTRO - Camera orbit and zoom (GSAP Timeline for smoothness)
      gsap.timeline({
        scrollTrigger: {
          trigger: '#intro',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.25,
        }
      })
      .to(camera.position, {
        x: () => Math.sin(Math.PI * 2) * 6,
        z: () => Math.cos(Math.PI * 2) * 6,
        y: 3,
        onUpdate: () => camera.lookAt(0, 0, 0),
        ease: 'power1.inOut',
      }, 0)
      .to(model.rotation, {
        y: Math.PI * 0.5,
        ease: 'power1.inOut',
      }, 0);



      // SECTION 3: AI CORE - Zoom into PCB, glow effect (GSAP Timeline)
      gsap.timeline({
        scrollTrigger: {
          trigger: '#ai-core',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.25,
        }
      })
      .to(camera.position, {
        x: () => Math.sin(Math.PI) * 2,
        y: 1.5,
        z: 1,
        onUpdate: () => camera.lookAt(0, 0, 0),
        ease: 'power1.inOut',
      }, 0)
      .to(model.rotation, {
        y: Math.PI,
        ease: 'power1.inOut',
      }, 0)
      .to(lightsRef.current.coreGlow, {
        intensity: 5,
        ease: 'power1.inOut',
      }, 0)
      .to(lightsRef.current.rim, {
        intensity: 2.0,
        ease: 'power1.inOut',
      }, 0);


      // SECTION 4: INTEGRATION - Parts come together smoothly
      ScrollTrigger.create({
        trigger: '#integration',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Ensure all parts are back to original position
          parts.forEach((part) => {
            part.mesh.position.copy(part.originalPosition);
            part.mesh.rotation.copy(part.originalRotation);
          });

          // Camera pulls back smoothly
          camera.position.set(
            Math.sin(progress * Math.PI * 0.5) * 3,
            2 - progress * 0.5,
            5 + progress * 2
          );
          camera.lookAt(0, 0, 0);

          // Reduce glow
          if (lightsRef.current.coreGlow) {
            lightsRef.current.coreGlow.intensity = 5 * (1 - progress);
          }

          // Model rotates to show all sides
          if (model) {
            model.rotation.y = progress * Math.PI * 2;
          }
        },
      });

      // SECTION 5: CLOSING - Final camera position
      ScrollTrigger.create({
        trigger: '#closing',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Camera pulls way back for final view
          camera.position.set(
            0,
            3 + progress * 2,
            10 + progress * 5
          );
          camera.lookAt(0, 0, 0);

          // Model slowly rotates
          if (model) {
            model.rotation.y = Math.PI * 2 + progress * Math.PI;
          }

          // Lights fade to ambient
          if (lightsRef.current.directional) {
            lightsRef.current.directional.intensity = 1.5 * (1 - progress * 0.5);
          }
        },
      });
    };

    // ===== HANDLE RESIZE =====
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // ===== CLEANUP =====
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Dispose of Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      
      // Dispose DRACOLoader
      if (dracoLoader) {
        dracoLoader.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ touchAction: 'none' }}
    />
  );
};

export default ThreeScene;
