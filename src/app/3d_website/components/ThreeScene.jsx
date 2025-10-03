'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
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
  
  // Model position tracking for callouts
  const [modelPositions, setModelPositions] = useState([]);
  const modelPositionsRef = useRef([]);
  
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
    { x: 0, y: -1.8, z: 0 },   // Model 6 (bottom)
    { x: 0, y: -2.0, z: 0 },   // Model 7 (starts closer, 10x scale needs less distance)
    { x: 0, y: -3.0, z: 0 }    // Model 8 (starts even further below, comes after model7)
  ];

  // Custom assembled positions for each model (Model 4 centered at origin)
  const assembledPositions = [
    { x: 0, y: 0.3, z: 0 },   // Model 1 (top of stack)
    { x: 0, y: 0.25, z: 0 },  // Model 2
    { x: 0, y: 0.2, z: 0 },   // Model 3
    { x: 0, y: 0.0, z: 0 },   // Model 4 (CENTER - at origin)
    { x: 0, y: -0.2, z: 0 },  // Model 5
    { x: 0, y: -0.3, z: 0 },  // Model 6 (bottom of stack)
    { x: 0, y: -1.5, z: 0 },    // Model 7 (large scale, positioned below model6)
    { x: 0, y: -2, z: 0 }   // Model 8 (attaches below model7)
  ];

  // ===== MODEL PATHS =====
  const modelPaths = [
    '/limi_ai_assets/models/model1.glb',
    '/limi_ai_assets/models/model2.glb',
    '/limi_ai_assets/models/model3.glb',
    '/limi_ai_assets/models/model4.glb',
    '/limi_ai_assets/models/model5.glb',
    '/limi_ai_assets/models/model6.glb',
    '/limi_ai_assets/models/model7.glb', // Additional model that comes from bottom
    '/limi_ai_assets/models/model8.glb', // Final model that comes after model7
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    // ===== SCENE SETUP =====
    const scene = new THREE.Scene();
    
    // Set solid black background
    scene.background = new THREE.Color(0x000000); // Pure black background
    console.log('Black background applied successfully');
    
    sceneRef.current = scene;
    // Start with Y rotation at 90deg and tilted to 180 degrees
    scene.rotation.y = Math.PI ; // 90° rotation on Y axis
    scene.rotation.z = Math.PI ; // 180° tilt (upside down)
    // ===== CAMERA SETUP =====
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 0); // Moved closer for zoom effect
    camera.lookAt(0, 0, 0); // Look at the center of the model stack
    cameraRef.current = camera;

    // ===== RENDERER SETUP =====
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // ===== ORBIT CONTROLS DISABLED =====
    // No orbit controls - only scroll interaction allowed
    controlsRef.current = null;
    
    // ===== HDRI ENVIRONMENT LIGHTING =====
    // Load HDRI environment map for realistic lighting
    const exrLoader = new EXRLoader();
    exrLoader.load(
      '/limi_ai_assets/light2.exr',
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        // Optionally set as background (comment out if you want black bg)
        // scene.background = texture;
        console.log('HDRI environment loaded successfully');
      },
      (progress) => {
        console.log('Loading HDRI:', Math.round((progress.loaded / progress.total) * 100) + '%');
      },
      (error) => {
        console.error('Error loading HDRI:', error);
      }
    );

    // Enhanced studio lighting setup for comprehensive model illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // === MAIN STUDIO LIGHTS ===
    
    // Key light - Primary illumination from front-top-right
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(8, 12, 8);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill light - Softer light from front-left to fill shadows
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
    fillLight.position.set(-6, 8, 6);
    scene.add(fillLight);

    // Back light - Rim lighting from behind-top for separation
    const backLight = new THREE.DirectionalLight(0xffffff, 1.2);
    backLight.position.set(0, 10, -8);
    scene.add(backLight);

    // Side lights for even coverage
    const sideLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    sideLight1.position.set(10, 5, 0);
    scene.add(sideLight1);

    const sideLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
    sideLight2.position.set(-10, 5, 0);
    scene.add(sideLight2);

    // Bottom light to eliminate dark undersides
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.8);
    bottomLight.position.set(0, -8, 5);
    scene.add(bottomLight);

    // === TARGETED SPOTLIGHTS ===
    
    // Spotlight for top models (Model 1, 2, 3)
    const spotTop = new THREE.SpotLight(0xffffff, 3.0);
    spotTop.position.set(3, 5, 4);
    spotTop.target.position.set(0, 0.25, 0); // Target upper models
    spotTop.angle = Math.PI / 4; // 45 degree cone
    spotTop.penumbra = 0.4;
    spotTop.decay = 1.5;
    spotTop.distance = 15;
    scene.add(spotTop);
    scene.add(spotTop.target);

    // Spotlight for center model (Model 4)
    const spotCenter = new THREE.SpotLight(0xffffff, 3.5);
    spotCenter.position.set(-3, 3, 4);
    spotCenter.target.position.set(0, 0, 0); // Target Model 4
    spotCenter.angle = Math.PI / 5; // 36 degree cone
    spotCenter.penumbra = 0.3;
    spotCenter.decay = 1.5;
    spotCenter.distance = 12;
    scene.add(spotCenter);
    scene.add(spotCenter.target);

    // Spotlight for bottom models (Model 5, 6)
    const spotBottom = new THREE.SpotLight(0xffffff, 3.0);
    spotBottom.position.set(2, 1, 5);
    spotBottom.target.position.set(0, -0.25, 0); // Target lower models
    spotBottom.angle = Math.PI / 4; // 45 degree cone
    spotBottom.penumbra = 0.4;
    spotBottom.decay = 1.5;
    spotBottom.distance = 15;
    scene.add(spotBottom);
    scene.add(spotBottom.target);

    // === ACCENT LIGHTS ===
    
    // Accent light from camera angle to brighten front faces
    const accentLight = new THREE.DirectionalLight(0xffffff, 1.8);
    accentLight.position.set(0, 3, 8); // From camera direction
    scene.add(accentLight);

    // Circular rim lights for 360° coverage
    const rimLights = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
      rimLight.position.set(
        Math.cos(angle) * 12,
        6,
        Math.sin(angle) * 12
      );
      scene.add(rimLight);
      rimLights.push(rimLight);
    }

    // === LIGHT HELPERS FOR VISUALIZATION ===
    
    // Directional light helpers
    const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 2, 0xff0000);
    scene.add(keyLightHelper);
    
    const fillLightHelper = new THREE.DirectionalLightHelper(fillLight, 2, 0x00ff00);
    scene.add(fillLightHelper);
    
    const backLightHelper = new THREE.DirectionalLightHelper(backLight, 2, 0x0000ff);
    scene.add(backLightHelper);
    
    const sideLight1Helper = new THREE.DirectionalLightHelper(sideLight1, 1.5, 0xffff00);
    scene.add(sideLight1Helper);
    
    const sideLight2Helper = new THREE.DirectionalLightHelper(sideLight2, 1.5, 0xff00ff);
    scene.add(sideLight2Helper);
    
    const bottomLightHelper = new THREE.DirectionalLightHelper(bottomLight, 1.5, 0x00ffff);
    scene.add(bottomLightHelper);
    
    const accentLightHelper = new THREE.DirectionalLightHelper(accentLight, 2, 0xffa500);
    scene.add(accentLightHelper);
    
    // Rim light helpers
    const rimColors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xffeaa7, 0xdda0dd];
    rimLights.forEach((rimLight, index) => {
      const helper = new THREE.DirectionalLightHelper(rimLight, 1, rimColors[index]);
      scene.add(helper);
    });
    
    // Spotlight helpers
    const spotTopHelper = new THREE.SpotLightHelper(spotTop, 0xff4757);
    scene.add(spotTopHelper);
    
    const spotCenterHelper = new THREE.SpotLightHelper(spotCenter, 0x3742fa);
    scene.add(spotCenterHelper);
    
    const spotBottomHelper = new THREE.SpotLightHelper(spotBottom, 0x2ed573);
    scene.add(spotBottomHelper);
    
    // ===== GRID AND AXES HELPERS =====
    // Grid helper (size 10, divisions 10)
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Axes helper (pivot, size 5)
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // ===== TRANSFORM CONTROLS (GIZMO) =====
    const transformControls = new TransformControls(camera, canvasRef.current);
    transformControls.setMode('translate'); // Start with translate mode
    transformControls.setSize(1.5); // Make gizmo larger for visibility
    scene.add(transformControls);
    
    // Create a dummy object at origin for the gizmo to control
    const gizmoTarget = new THREE.Object3D();
    gizmoTarget.position.set(0, 0, 0);
    scene.add(gizmoTarget);
    transformControls.attach(gizmoTarget);
    
    // Add keyboard controls for gizmo modes
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'g': // Translate mode
          transformControls.setMode('translate');
          break;
        case 'r': // Rotate mode
          transformControls.setMode('rotate');
          break;
        case 's': // Scale mode
          transformControls.setMode('scale');
          break;
        case 'Escape': // Detach gizmo
          transformControls.detach();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

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

          // Make all meshes shiny
          model.traverse(obj => {
            if (obj.isMesh && obj.material) {
              if ('metalness' in obj.material) obj.material.metalness = 1.0;
              if ('roughness' in obj.material) obj.material.roughness = 0.15;
              obj.material.needsUpdate = true;
            }
          });

          // Set assembled position as initial state (models start assembled)
          const explodedPos = explodedPositions[index];
          const assembledPos = assembledPositions[index];
          
          model.position.set(assembledPos.x, assembledPos.y, assembledPos.z);
          model.scale.set(3, 3, 3);
          
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
      
      // Calculate position progress with special handling at 75%
      let positionProgress;
      if (progress <= 0.5) {
        // First half: explode (0 to 1)
        positionProgress = progress * 2;
      } else if (progress >= 0.75) {
        // At 75% and beyond: parts fully assembled, no rotation
        positionProgress = 0;
      } else {
        // Between 50% and 75%: assemble while rotating (1 to 0)
        const assemblyRange = 0.75 - 0.5; // 0.25
        const assemblyProgress = (progress - 0.5) / assemblyRange; // 0 to 1 over the range
        positionProgress = 1 - assemblyProgress; // 1 to 0
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
          
          // Special handling for model7 (index 6) - comes from bottom after 75%
          if (index === 6) { // Model 7
            if (progress < 0.75) {
              // Before 75%: keep model7 hidden far below
              model.position.x = explodedPos.x;
              model.position.y = explodedPos.y;
              model.position.z = explodedPos.z;
              model.visible = false; // Hide until 75%
              model.scale.setScalar(1.5); // Reduced scale for model7
            } else if (progress < 0.9) {
              // Between 75% and 90%: model7 animates from bottom to attach to model6
              model.visible = true;
              const model7Progress = (progress - 0.75) / 0.15; // 0 to 1 from 75% to 90%
              const clampedProgress = Math.min(1, model7Progress);
              
              // Animate from exploded position to assembled position
              model.position.x = explodedPos.x + (assembledPos.x - explodedPos.x) * clampedProgress;
              model.position.y = explodedPos.y + (assembledPos.y - explodedPos.y) * clampedProgress;
              model.position.z = explodedPos.z + (assembledPos.z - explodedPos.z) * clampedProgress;
              
              // Keep model7 at reduced scale
              model.scale.setScalar(1.5); // 5x larger than other models
            } else {
              // After 90%: model7 stays in final position
              model.visible = true;
              model.position.x = assembledPos.x;
              model.position.y = assembledPos.y;
              model.position.z = assembledPos.z;
              model.scale.setScalar(1.5);
            }
          } else if (index === 7) { // Model 8
            if (progress < 0.9) {
              // Before 90%: keep model8 hidden far below
              model.position.x = explodedPos.x;
              model.position.y = explodedPos.y;
              model.position.z = explodedPos.z;
              model.visible = false; // Hide until 90%
              model.scale.setScalar(1.5); // Reduced scale for model8
            } else {
              // After 90%: smoothly animate from bottom to attach to model7
              model.visible = true;
              const model8Progress = (progress - 0.9) / 0.1; // 0 to 1 from 90% to 100%
              const clampedProgress = Math.min(1, model8Progress);
              
              // Animate from exploded position to assembled position
              model.position.x = explodedPos.x + (assembledPos.x - explodedPos.x) * clampedProgress;
              model.position.y = explodedPos.y + (assembledPos.y - explodedPos.y) * clampedProgress;
              model.position.z = explodedPos.z + (assembledPos.z - explodedPos.z) * clampedProgress;
              
              // Keep model8 at reduced scale
              model.scale.setScalar(1.5); // 3x larger than other models
            }
          } else {
            // Normal behavior for models 1-6
            // Lerp between assembled and exploded positions
            model.position.x = assembledPos.x + (explodedPos.x - assembledPos.x) * positionProgress;
            model.position.y = assembledPos.y + (explodedPos.y - assembledPos.y) * positionProgress;
            model.position.z = assembledPos.z + (explodedPos.z - assembledPos.z) * positionProgress;
          }
        }
      });
      
      // Rotation handling with smooth stop at 75% (centered position)
      if (progress >= 0.75) {
        // At 75% and beyond: stop at centered position (0° = full rotation)
        modelsGroupRef.current.rotation.y = 0; // Centered position (0° = 360°)
      } else if (progress > 0.5) {
        // Between 50% and 75%: continue rotations
        modelsGroupRef.current.rotation.x = progress * Math.PI * 2; // 0 to 360° on X-axis
        
        // Z-axis rotation during assembly phase
        const assemblyProgress = (progress - 0.5) * 2; // 0 to 1 during assembly
        modelsGroupRef.current.rotation.z = assemblyProgress * Math.PI * 2; // 0 to 360° on Z-axis
      } else {
        // First half (0 to 50%): only X rotation, no Z rotation
        modelsGroupRef.current.rotation.x = progress * Math.PI * 2; // 0 to 360° on X-axis
        modelsGroupRef.current.rotation.z = 0;
      }
      
      // Background stays constant (radial gradient)
      
      // Track model positions for callouts (convert 3D to 2D screen coordinates)
      if (cameraRef.current && modelsRef.current.length > 0) {
        const newPositions = modelsRef.current.map((model, index) => {
          if (!model) return null;
          
          // Get world position of the model
          const worldPosition = new THREE.Vector3();
          model.getWorldPosition(worldPosition);
          
          // Convert to screen coordinates
          const screenPosition = worldPosition.clone();
          screenPosition.project(cameraRef.current);
          
          // Convert to pixel coordinates
          const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
          const y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;
          
          // Model names mapping
          const modelNames = [
            'Top Plate',           // Model 1 (index 0)
            'Male Connector Plate', // Model 2 (index 1)
            'Ceiling Bracket Steel', // Model 3 (index 2)
            'Plate',               // Model 4 (index 3)
            'PCB Board',           // Model 5 (index 4)
            'Ceiling Hub'          // Model 6 (index 5)
          ];
          
          return {
            id: index,
            name: modelNames[index] || `Model ${index + 1}`,
            x: Math.round(x),
            y: Math.round(y),
            z: screenPosition.z,
            worldPosition: {
              x: worldPosition.x,
              y: worldPosition.y,
              z: worldPosition.z
            },
            progress: progress,
            isVisible: screenPosition.z < 1 // Check if in front of camera
          };
        }).filter(pos => pos !== null);
        
        // Update positions
        modelPositionsRef.current = newPositions;
        setModelPositions(newPositions);
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
      
      // Detect if device is mobile/touch device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       ('ontouchstart' in window) || 
                       (navigator.maxTouchPoints > 0);
      
      // Adjust sensitivity based on device type
      const scrollSensitivity = isMobile ? 0.005 : 0.03; // Much lower sensitivity for mobile devices
      
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
      
      // Create smooth GSAP tween with optimized settings
      scrollTweenRef.current = gsap.to(scrollProgressRef, {
        current: targetProgress,
        duration: 0.3, // Faster, more responsive
        ease: "power1.out", // Gentler easing for smoother feel
        onUpdate: () => {
          updateScrollAnimation(scrollProgressRef.current);
        }
      });
    };

    // ===== TOUCH EVENT HANDLERS FOR MOBILE =====
    const handleTouchStart = (event) => {
      event.preventDefault();
      isTouchingRef.current = true;
      
      // Kill any existing animation to ensure smooth touch start
      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
      }
      
      touchStartRef.current = {
        y: event.touches[0].clientY,
        progress: scrollProgressRef.current // Use current actual progress
      };
    };

    const handleTouchMove = (event) => {
      if (!isTouchingRef.current) return;
      event.preventDefault();
      
      const currentY = event.touches[0].clientY;
      const deltaY = touchStartRef.current.y - currentY;
      const touchSensitivity = 0.0008; // Much lower sensitivity for more controlled touch scrolling
      
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
      
      // Update progress immediately for smooth touch response
      scrollProgressRef.current = targetProgress;
      updateScrollAnimation(scrollProgressRef.current);
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
      
      // Continuous auto-rotation of each individual model (slower)
      modelsRef.current.forEach((model, index) => {
        if (model) {
          // Each model rotates at slightly different speeds for variety (much slower)
          const baseSpeed = 0.003; // Reduced from 0.01 to 0.003 (3x slower)
          const speedVariation = (index + 1) * 0.0005; // Reduced from 0.002 to 0.0005 (4x slower)
          model.rotation.y += baseSpeed + speedVariation;
        }
      });

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
      window.removeEventListener('keydown', handleKeyDown);
      
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
    // End of useEffect
  }, []);

  // Content sections for carousel
  const contentSections = [
    {
      title: "Base Assembly",
      subtitle: "Foundation Component",
      description: "The core foundation that holds everything together with precision engineering.",
      progress: 0.0
    },
    {
      title: "Power Module",
      subtitle: "Model 5 - Energy Core",
      description: "Advanced power distribution system ensuring optimal performance.",
      progress: 0.2
    },
    {
      title: "Central Hub",
      subtitle: "Model 4 - Control Center",
      description: "The brain of the operation, coordinating all system functions seamlessly.",
      progress: 0.4
    },
    {
      title: "Integration Layer",
      subtitle: "Model 3 - Connection Point",
      description: "Seamless integration ensuring all components work in perfect harmony.",
      progress: 0.6
    },
    {
      title: "Interface Module",
      subtitle: "Model 2 - User Interface",
      description: "Intuitive interface design for effortless interaction and control.",
      progress: 0.75
    },
    {
      title: "Top Assembly",
      subtitle: "Model 1 - Final Touch",
      description: "The finishing component that completes the perfect assembly.",
      progress: 0.8
    },
    {
      title: "Foundation Base",
      subtitle: "Model 7 - Primary Support",
      description: "The massive foundation piece that emerges from below to support everything.",
      progress: 0.9
    },
    {
      title: "Ultimate Base",
      subtitle: "Model 8 - Final Foundation",
      description: "The ultimate foundation that completes the entire assembly from the very bottom.",
      progress: 1.0
    }
  ];

  // Determine active section based on scroll progress
  const getActiveSection = () => {
    const progress = scrollProgressRef.current;
    for (let i = contentSections.length - 1; i >= 0; i--) {
      if (progress >= contentSections[i].progress) {
        return i;
      }
    }
    return 0;
  };

  const activeSection = getActiveSection();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Loading Screen */}
      {modelsLoaded < modelPaths.length && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading 3D Preview...</p>
          </div>
        </div>
      )}
      
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Left Content Carousel - Responsive */}
      <div className="absolute left-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 pointer-events-none flex items-start md:items-center">
        <div className="relative w-full h-full flex flex-col justify-start md:justify-center px-4 sm:px-6 md:px-8 pt-8 md:pt-0">
          {contentSections.map((section, index) => {
            const progress = scrollProgressRef.current;
            const sectionProgress = section.progress;
            const nextSectionProgress = contentSections[index + 1]?.progress || 1.1;
            
            // Calculate visibility and position based on scroll progress
            let opacity = 0;
            let translateY = 100; // Start from bottom
            
            if (progress >= sectionProgress && progress < nextSectionProgress) {
              // Active section
              const localProgress = (progress - sectionProgress) / (nextSectionProgress - sectionProgress);
              
              if (localProgress < 0.2) {
                // Entering from bottom
                opacity = localProgress / 0.2;
                translateY = 100 - (localProgress / 0.2) * 100;
              } else if (localProgress > 0.8) {
                // Exiting to top
                const exitProgress = (localProgress - 0.8) / 0.2;
                opacity = 1 - exitProgress;
                translateY = -100 * exitProgress;
              } else {
                // Fully visible
                opacity = 1;
                translateY = 0;
              }
            } else if (progress < sectionProgress) {
              // Not yet visible
              opacity = 0;
              translateY = 100;
            } else {
              // Already passed
              opacity = 0;
              translateY = -100;
            }
            
            return (
              <div
                key={index}
                className="absolute inset-0 flex flex-col justify-start md:justify-center px-4 sm:px-6 md:px-8 pt-8 md:pt-0 transition-all duration-300"
                style={{
                  opacity,
                  transform: `translateY(${translateY}%)`,
                  pointerEvents: opacity > 0 ? 'auto' : 'none'
                }}
              >
                <div className="bg-black bg-opacity-70 backdrop-blur-md rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-white border-opacity-10 max-w-sm sm:max-w-md md:max-w-none mx-auto md:mx-0">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2 font-medium tracking-wider uppercase">
                    {section.subtitle}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                    {section.description}
                  </p>
                  <div className="mt-4 sm:mt-5 md:mt-6 flex items-center gap-2">
                    <div className="h-1 flex-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-300"
                        style={{ width: `${((index + 1) / contentSections.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-white text-xs sm:text-sm font-medium">
                      {index + 1}/{contentSections.length}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Model Positions Display - Always Visible */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-80 backdrop-blur-md text-white p-4 rounded-xl text-sm max-w-xs border border-white border-opacity-20">
        <div className="font-bold mb-3 text-white">
          Model Positions
        </div>
        <div className="text-gray-300 mb-3 text-xs">
          Progress: {Math.round(scrollProgressRef.current * 100)}%
        </div>
        {modelPositions.length > 0 ? (
          modelPositions.map((pos, index) => (
            <div key={pos.id} className="mb-2 p-2 bg-white bg-opacity-10 rounded">
              <div className="font-medium text-white">{pos.name}</div>
              <div className="text-xs text-gray-300">
                x: {pos.x.toFixed(2)}, y: {pos.y.toFixed(2)}
                {!pos.isVisible && <span className="text-red-400 ml-2">(hidden)</span>}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-xs">Loading models...</div>
        )}
        {autoAssemble && (
          <div className="mt-3 pt-2 border-t border-white border-opacity-20">
            <div className="text-yellow-400 text-xs">Auto-assembly enabled</div>
          </div>
        )}
      </div>
      
      {/* Gizmo Controls Info */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-80 backdrop-blur-md text-white p-3 rounded-xl text-xs border border-white border-opacity-20">
        <div className="font-bold mb-2 text-white">Gizmo Controls</div>
        <div className="space-y-1 text-gray-300">
          <div><kbd className="bg-gray-700 px-1 rounded">G</kbd> - Translate</div>
          <div><kbd className="bg-gray-700 px-1 rounded">R</kbd> - Rotate</div>
          <div><kbd className="bg-gray-700 px-1 rounded">S</kbd> - Scale</div>
          <div><kbd className="bg-gray-700 px-1 rounded">Esc</kbd> - Detach</div>
        </div>
      </div>
      {/* Callout positions for 60-120 degree rotation state */}
      {(() => {
        const rotationDegrees = scrollProgressRef.current * 360;
        return (rotationDegrees >= 120 && rotationDegrees <= 180 && modelPositions.length > 0);
      })() && (
        <>
          {modelPositions.map((pos) => (
            pos.isVisible && (
              <div
                key={pos.id}
                className="absolute pointer-events-none"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                  {pos.name}
                </div>
              </div>
            )
          ))}
        </>
      )}
    </div>
  );
}

export default ThreeScene;
   