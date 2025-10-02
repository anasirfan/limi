'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

const ThreeScene = ({ onAssemble = null, autoAssemble = false }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelsRef = useRef([]);
  const modelsGroupRef = useRef(null); // Parent group for all models
  const [isAssembled, setIsAssembled] = useState(true); // Start in assembled state
  const [modelsLoaded, setModelsLoaded] = useState(0);
  
  // Scroll animation state
  const scrollProgressRef = useRef(0); // 0 = assembled, 1 = exploded
  const isAnimatingRef = useRef(false);
  const scrollTweenRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  
  // Touch interaction state
  const touchStartRef = useRef({ y: 0, progress: 0 });
  const isTouchingRef = useRef(false);
  
  // Create refs for animation functions
  const assembleModelsRef = useRef(null);
  const explodeModelsRef = useRef(null);
  
  // Animation configuration
  const config = {
    explodedGap: 0.4,        // Gap between models in exploded view
    assembledGap: 0.1,     // Gap between models when assembled
    animationDuration: 5,  // Animation duration in seconds
    autoDelay: 2          // Delay before auto-assembly (if enabled)
  };

  // ===== CUSTOM POSITIONS =====
  // Custom exploded positions for each model (centered around 0)
  const explodedPositions = [
    { x: 0, y: 1.3, z: 0 },    // Model 1 (top)
    { x: 0, y: 0.8, z: 0 },    // Model 2
    { x: 0, y: 0.3, z: 0 },    // Model 3
    { x: 0, y: -0.3, z: 0 },   // Model 4
    { x: 0, y: -1.0, z: 0 },   // Model 5
    { x: 0, y: -1.8, z: 0 }    // Model 6 (bottom)
  ];

  // Custom assembled positions for each model
  const assembledPositions = [
    { x: 0, y: 0.004, z: 0 },  // Model 1 (top of stack)
    { x: 0, y: 0.003, z: 0 },  // Model 2
    { x: 0, y: 0.00001, z: 0 },  // Model 3
    { x: 0, y: 0.01, z: 0 },  // Model 4
    { x: 0, y: 0.05, z: 0 },  // Model 5
    { x: 0, y: 0.0, z: 0 }   // Model 6 (bottom of stack)
  ];

  // ===== MODEL PATHS =====
  const modelPaths = [
    '/limi_ai_assets/models/model1.glb',
    '/limi_ai_assets/models/model2.glb',
    '/limi_ai_assets/models/model3.glb',
    '/limi_ai_assets/models/model4.glb',
    '/limi_ai_assets/models/model5.glb',
    '/limi_ai_assets/models/model6.glb',
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    // ===== SCENE SETUP =====
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222); // Dark gray background
    sceneRef.current = scene;
    // Start with Y rotation at 90deg (assembled)
    scene.rotation.y = Math.PI / 2;

    // ===== CAMERA SETUP =====
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3); // Moved closer for zoom effect
    camera.lookAt(0, 0, 0); // Look at the center of the model stack
    cameraRef.current = camera;

    // ===== RENDERER SETUP =====
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // ===== ORBIT CONTROLS DISABLED =====
    // No orbit controls - only scroll interaction allowed
    controlsRef.current = null;
    
    // ===== ENHANCED LIGHTING =====
    // Brighter ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key light (main directional)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(10, 10, 10);
    scene.add(keyLight);

    // Fill light (softer, from opposite side)
    const fillLight = new THREE.DirectionalLight(0x88aaff, 0.8);
    fillLight.position.set(-10, 5, 10);
    scene.add(fillLight);

    // Back light (rim)
    const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
    backLight.position.set(0, 10, -10);
    scene.add(backLight);

    // ===== CREATE MODELS GROUP =====
    const modelsGroup = new THREE.Group();
    scene.add(modelsGroup);
    modelsGroupRef.current = modelsGroup;

    // ===== LOAD MODELS =====
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    modelPaths.forEach((path, index) => {
      loader.load(
        path,
        (gltf) => {
          const model = gltf.scene;
          
          // Set assembled position as initial state (models start assembled)
          const explodedPos = explodedPositions[index];
          const assembledPos = assembledPositions[index];
          
          model.position.set(assembledPos.x, assembledPos.y, assembledPos.z);
          model.scale.set(2, 2, 2);
          
          // Store custom positions for animation
          model.userData = {
            explodedPos: explodedPos,
            assembledPos: assembledPos,
            index: index
          };

          modelsGroup.add(model); // Add to group instead of scene
          modelsRef.current[index] = model;
          
          // Track loaded models
          setModelsLoaded(prev => {
            const newCount = prev + 1;
            if (newCount === modelPaths.length) {
              console.log('All models loaded!');
              // Trigger auto-assembly if enabled
              if (autoAssemble) {
                setTimeout(() => {
                  if (assembleModelsRef.current) {
                    assembleModelsRef.current();
                  }
                }, config.autoDelay * 1000);
              }
            }
            return newCount;
          });
        },
        (progress) => {
          console.log(`Loading model ${index + 1}: ${(progress.loaded / progress.total * 100)}%`);
        },
        (error) => {
          console.error(`Error loading model ${index + 1}:`, error);
          
          // Create a placeholder cube if model fails to load
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color().setHSL(index / modelPaths.length, 0.7, 0.5) 
          });
          const cube = new THREE.Mesh(geometry, material);
          
          const explodedPos = explodedPositions[index];
          const assembledPos = assembledPositions[index];
          
          cube.position.set(assembledPos.x, assembledPos.y, assembledPos.z);
          cube.userData = {
            explodedPos: explodedPos,
            assembledPos: assembledPos,
            index: index
          };
          
          modelsGroup.add(cube); // Add to group instead of scene
          modelsRef.current[index] = cube;
          
          setModelsLoaded(prev => prev + 1);
        }
      );
    });

    // ===== ASSEMBLY ANIMATION FUNCTIONS =====
    const assembleModels = () => {
      console.log('assembleModels called, modelsRef.current.length:', modelsRef.current.length);
      if (modelsRef.current.length === 0) {
        console.log('Assemble blocked - no models loaded');
        return;
      }
      
      console.log('Starting assembly animation...');
      setIsAssembled(true);
      
      // Create GSAP timeline
      const tl = gsap.timeline({
        ease: "power2.inOut",
        onComplete: () => {
          console.log('Assembly animation complete!');
          if (onAssemble) onAssemble();
        }
      });
      
      // Animate ALL models simultaneously (no stagger)
      modelsRef.current.forEach((model, index) => {
        if (model) {
          const assembledPos = model.userData.assembledPos;
          
          tl.to(model.position, {
            x: assembledPos.x,
            y: assembledPos.y,
            z: assembledPos.z,
            duration: config.animationDuration, // Full duration for smooth animation
            ease: "power2.inOut"
          }, 0); // All start at time 0 (simultaneously)
        }
      });
      // Animate scene rotation back from 140deg to 90deg
      gsap.to(sceneRef.current.rotation, {
        y: Math.PI / 2,
        duration: config.animationDuration,
        ease: "power2.inOut"
      });
      
      // Stop Z rotation of models group
      gsap.to(modelsGroupRef.current.rotation, {
        z: 0,
        duration: config.animationDuration,
        ease: "power2.inOut"
      });
    };
    
    const explodeModels = () => {
      console.log('explodeModels called, modelsRef.current.length:', modelsRef.current.length);
      if (modelsRef.current.length === 0) {
        console.log('Explode blocked - no models loaded');
        return;
      }
      
      console.log('Starting explode animation...');
      setIsAssembled(false);
      
      // Create GSAP timeline for exploding
      const tl = gsap.timeline({
        ease: "power2.inOut"
      });
      
      // Animate ALL models back to exploded position simultaneously
      modelsRef.current.forEach((model, index) => {
        if (model) {
          const explodedPos = model.userData.explodedPos;
          
          tl.to(model.position, {
            x: explodedPos.x,
            y: explodedPos.y,
            z: explodedPos.z,
            duration: config.animationDuration, // Full duration for smooth animation
            ease: "power2.inOut"
          }, 0); // All start at time 0 (simultaneously)
        }
      });
      // Animate scene rotation from 90deg to 140deg
      gsap.to(sceneRef.current.rotation, {
        y: 140 * Math.PI / 180,
        duration: config.animationDuration,
        ease: "power2.inOut"
      });
      
      // Rotate models group around Z axis during explode
      gsap.to(modelsGroupRef.current.rotation, {
        z: Math.PI * 2, // Full 360 degree rotation
        duration: config.animationDuration,
        ease: "power2.inOut"
      });
    };

    // ===== SCROLL-BASED ANIMATION FUNCTION =====
    const updateScrollAnimation = (progress) => {
      if (!modelsRef.current.length || !sceneRef.current || !modelsGroupRef.current) return;
      
      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      scrollProgressRef.current = progress;
      
      // Calculate position progress with twist at 180°
      let positionProgress;
      if (progress <= 0.5) {
        // First half: explode (0 to 1)
        positionProgress = progress * 2;
      } else {
        // Second half: assemble while rotating (1 to 0)
        positionProgress = 2 - (progress * 2);
      }
      
      // Update state based on position progress
      const newIsAssembled = positionProgress < 0.5;
      if (newIsAssembled !== isAssembled) {
        setIsAssembled(newIsAssembled);
      }
      
      // Interpolate model positions using position progress
      modelsRef.current.forEach((model, index) => {
        if (model && model.userData) {
          const assembledPos = model.userData.assembledPos;
          const explodedPos = model.userData.explodedPos;
          
          // Lerp between assembled and exploded positions
          model.position.x = assembledPos.x + (explodedPos.x - assembledPos.x) * positionProgress;
          model.position.y = assembledPos.y + (explodedPos.y - assembledPos.y) * positionProgress;
          model.position.z = assembledPos.z + (explodedPos.z - assembledPos.z) * positionProgress;
        }
      });
      
      // Full 360° rotation with tilt (rotation continues throughout)
      modelsGroupRef.current.rotation.x = progress * Math.PI * 2; // Forward flip
      modelsGroupRef.current.rotation.z = progress * Math.PI * 0.5; // Tilt angle (90° max)
      
      // Background color transition based on rotation angle
      const rotationDegrees = (progress * 360); // Convert to degrees for easier calculation
      let bgColor;
      
      if (rotationDegrees >= 160 && rotationDegrees <= 240) {
        // Between 160-240 degrees: transition to white
        const transitionProgress = (rotationDegrees - 160) / 80; // 0 to 1 over 80 degrees
        const smoothProgress = Math.sin(transitionProgress * Math.PI); // Smooth sine curve
        
        // Interpolate from dark gray (0x222222) to light beige (0xDAD5D0)
        const r = Math.round(0x22 + (0xDA - 0x22) * smoothProgress);
        const g = Math.round(0x22 + (0xD5 - 0x22) * smoothProgress);
        const b = Math.round(0x22 + (0xD0 - 0x22) * smoothProgress);
        
        bgColor = (r << 16) | (g << 8) | b;
      } else {
        // Outside 160-240 range: dark gray
        bgColor = 0x222222;
      }
      
      // Apply background color
      if (sceneRef.current) {
        sceneRef.current.background.setHex(bgColor);
      }
    };

    // ===== SMOOTH GSAP SCROLL HANDLER =====
    const handleScroll = (event) => {
      event.preventDefault();
      
      // Mark as scrolling to pause auto-rotation
      isScrollingRef.current = true;
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set timeout to resume auto-rotation after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Resume auto-rotation 1 second after scrolling stops
      
      const delta = event.deltaY;
      const scrollSensitivity = 0.05; // Much higher sensitivity - less scrolling needed
      
      let targetProgress = scrollProgressRef.current;
      
      if (delta > 0) {
        // Scrolling down - explode (only if not fully exploded)
        if (scrollProgressRef.current < 1) {
          targetProgress += scrollSensitivity;
        }
      } else {
        // Scrolling up - assemble (only if not fully assembled)
        if (scrollProgressRef.current > 0) {
          targetProgress -= scrollSensitivity;
        }
      }
      
      // Clamp target progress
      targetProgress = Math.max(0, Math.min(1, targetProgress));
      
      // Kill existing tween
      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
      }
      
      // Create smooth GSAP tween
      scrollTweenRef.current = gsap.to(scrollProgressRef, {
        current: targetProgress,
        duration: 0.8, // Smooth transition duration
        ease: "power2.out", // Smooth easing
        onUpdate: () => {
          updateScrollAnimation(scrollProgressRef.current);
        }
      });
    };

    // ===== TOUCH EVENT HANDLERS FOR MOBILE =====
    const handleTouchStart = (event) => {
      isTouchingRef.current = true;
      touchStartRef.current = {
        y: event.touches[0].clientY,
        progress: scrollProgressRef.current
      };
    };

    const handleTouchMove = (event) => {
      if (!isTouchingRef.current) return;
      event.preventDefault();
      
      const currentY = event.touches[0].clientY;
      const deltaY = touchStartRef.current.y - currentY;
      const touchSensitivity = 0.003; // Adjust for touch responsiveness
      
      let targetProgress = touchStartRef.current.progress + (deltaY * touchSensitivity);
      
      // Apply same scroll logic as wheel event
      if (deltaY > 0) {
        // Swiping up - explode (only if not fully exploded)
        if (scrollProgressRef.current < 1) {
          targetProgress = Math.min(1, targetProgress);
        } else {
          targetProgress = scrollProgressRef.current;
        }
      } else {
        // Swiping down - assemble (only if not fully assembled)
        if (scrollProgressRef.current > 0) {
          targetProgress = Math.max(0, targetProgress);
        } else {
          targetProgress = scrollProgressRef.current;
        }
      }
      
      // Clamp target progress
      targetProgress = Math.max(0, Math.min(1, targetProgress));
      
      // Kill existing tween
      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
      }
      
      // Create smooth GSAP tween
      scrollTweenRef.current = gsap.to(scrollProgressRef, {
        current: targetProgress,
        duration: 0.3, // Faster for touch responsiveness
        ease: "power2.out",
        onUpdate: () => {
          updateScrollAnimation(scrollProgressRef.current);
        }
      });
    };

    const handleTouchEnd = (event) => {
      isTouchingRef.current = false;
    };

    // Add event listeners for both desktop and mobile
    window.addEventListener('wheel', handleScroll, { passive: false });
    canvasRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvasRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvasRef.current.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Assign functions to refs for component access
    assembleModelsRef.current = assembleModels;
    explodeModelsRef.current = explodeModels;
    
    // Expose functions to parent component
    window.assembleModels = assembleModels;
    window.explodeModels = explodeModels;

    // ===== ANIMATION LOOP =====
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Continuous auto-rotation of each individual model (commented out)
      // modelsRef.current.forEach((model, index) => {
      //   if (model) {
      //     // Each model rotates at slightly different speeds for variety
      //     const baseSpeed = 0.01;
      //     const speedVariation = (index + 1) * 0.002; // Different speed per model
      //     model.rotation.y += baseSpeed + speedVariation;
      //   }
      // });

      // No controls to update - orbit controls disabled
      
      // Render scene
      renderer.render(scene, camera);
    };
    animate();

    // ===== WINDOW RESIZE =====
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ===== CLEANUP =====
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleScroll);
      
      // Clean up touch event listeners
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('touchstart', handleTouchStart);
        canvasRef.current.removeEventListener('touchmove', handleTouchMove);
        canvasRef.current.removeEventListener('touchend', handleTouchEnd);
      }
      
      // Kill scroll tween and timeout on cleanup
      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // No controls to dispose - orbit controls disabled
      
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
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ touchAction: 'none' }}
      />
      
      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md rounded-lg p-4 border border-white/10">
        <div className="flex flex-col space-y-3">
          <div className="text-white text-sm font-medium">
            Models Loaded: {modelsLoaded}/{modelPaths.length}
          </div>
          
          {/* <div className="text-white text-xs">
            Status: {isAssembled ? 'Assembled' : 'Exploded'}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => {
                console.log('Assemble button clicked, isAssembled:', isAssembled);
                console.log('assembleModelsRef.current:', assembleModelsRef.current);
                if (assembleModelsRef.current) {
                  assembleModelsRef.current();
                } else {
                  console.log('assembleModelsRef.current is null');
                }
              }}
              disabled={isAssembled || modelsLoaded < modelPaths.length}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
            >
              Assemble (Debug)
            </button>
            
            <button
              onClick={() => explodeModelsRef.current && explodeModelsRef.current()}
              disabled={!isAssembled || modelsLoaded < modelPaths.length}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
            >
              Explode
            </button>
          </div> */}
          
          {autoAssemble && (
            <div className="text-yellow-400 text-xs">
              Auto-assembly enabled
            </div>
          )}
        </div>
      </div>
      
      {/* Loading Indicator */}
      {modelsLoaded < modelPaths.length && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-semibold">Loading Models...</p>
            <p className="text-sm text-gray-400 mt-2">
              {modelsLoaded}/{modelPaths.length} models loaded
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeScene;
   