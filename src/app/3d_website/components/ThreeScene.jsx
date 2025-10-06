"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { gsap } from "gsap";

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
    explodedGap: 0.4, // Gap between models in exploded view
    assembledGap: 0.1, // Gap between models when assembled
    animationDuration: 5, // Animation duration in seconds
    autoDelay: 2, // Delay before auto-assembly (if enabled)
  };

  // ===== CUSTOM POSITIONS =====
  // Custom exploded positions for each model (centered around 0)
  const explodedPositions = [
    { x: 0, y: 1.3, z: 0 }, // Model 1 (top)
    { x: 0, y: 0.8, z: 0 }, // Model 2
    { x: 0, y: 0.3, z: 0 }, // Model 3
    { x: 0, y: -0.3, z: 0 }, // Model 4
    { x: 0, y: -1.0, z: 0 }, // Model 5
    { x: 0, y: -1.8, z: 0 }, // Model 6 (bottom)
    { x: 0, y: -2.0, z: 0 }, // Model 7 (starts closer, 1.5x scale)
    { x: 0, y: -3.0, z: 0 }, // Model 8 (starts further below, 2x scale)
    { x: 0, y: -4.0, z: 0 }, // Model 9 (starts furthest below, comes after model8)
  ];

  // Custom assembled positions for each model (Model 4 centered at origin)
  const assembledPositions = [
    { x: 0, y: 0.3, z: 0 }, // Model 1 (top of stack)
    { x: 0, y: 0.25, z: 0 }, // Model 2
    { x: 0, y: 0.2, z: 0 }, // Model 3
    { x: 0, y: 0.0, z: 0 }, // Model 4 (CENTER - at origin)
    { x: 0, y: -0.2, z: 0 }, // Model 5
    { x: 0, y: -0.3, z: 0 }, // Model 6 (bottom of stack)
    { x: 0, y: -0.38, z: 0 }, // Model 7 (large scale, positioned below model6)
    { x: 0, y: -2.3, z: 0 }, // Model 8 (attaches below model7)
    { x: 0, y: -2.5, z: 0 }, // Model 9 (attaches below model8)
  ];

  // ===== MODEL PATHS =====
  const modelPaths = [
    "/limi_ai_assets/models/model1.glb",
    "/limi_ai_assets/models/model2.glb",
    "/limi_ai_assets/models/model3.glb",
    "/limi_ai_assets/models/model4.glb",
    "/limi_ai_assets/models/model5.glb",
    "/limi_ai_assets/models/model6.glb",
    "/limi_ai_assets/models/model7.glb", // Additional model that comes from bottom
    "/limi_ai_assets/models/model8.glb", // Second model that comes after model7
    "/limi_ai_assets/models/model9.glb", // Final model that comes after model8
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    // ===== SCENE SETUP =====
    const scene = new THREE.Scene();

    // Set solid black background
    scene.background = new THREE.Color(0x000000); // Pure black background
    console.log("Black background applied successfully");

    sceneRef.current = scene;
    // Start with Y rotation at 90deg and tilted to 180 degrees
    scene.rotation.y = Math.PI; // 90° rotation on Y axis
    scene.rotation.z = Math.PI; // 180° tilt (upside down)
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

    // Mobile-friendly viewport sizing
    const getViewportSize = () => {
      // Use visualViewport API for better mobile support
      const width = window.visualViewport?.width || window.innerWidth;
      const height = window.visualViewport?.height || window.innerHeight;
      return { width, height };
    };

    const { width: initialWidth, height: initialHeight } = getViewportSize();
    renderer.setSize(initialWidth, initialHeight);

    // Shadow system disabled for better performance
    renderer.shadowMap.enabled = false;
    // ===== ORBIT CONTROLS DISABLED =====
    // No orbit controls - only scroll interaction allowed
    controlsRef.current = null;

    // ===== HDRI ENVIRONMENT LIGHTING =====
    // Load HDRI environment map for realistic lighting
    const exrLoader = new EXRLoader();
    exrLoader.load(
      "/limi_ai_assets/light2.exr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        // Optionally set as background (comment out if you want black bg)
        // scene.background = texture;
        console.log("HDRI environment loaded successfully");
      },
      (progress) => {
        console.log(
          "Loading HDRI:",
          Math.round((progress.loaded / progress.total) * 100) + "%"
        );
      },
      (error) => {
        console.error("Error loading HDRI:", error);
      }
    );

    // Enhanced studio lighting setup for comprehensive model illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // === MAIN STUDIO LIGHTS ===

    // Key light - Primary illumination from front-top-right
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(8, 12, 8);
    keyLight.castShadow = false; // Shadows disabled for performance
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
      rimLight.position.set(Math.cos(angle) * 12, 6, Math.sin(angle) * 12);
      scene.add(rimLight);
      rimLights.push(rimLight);
    }

    // === SUNLIGHT REMOVED ===
    // Sunlight system has been removed for cleaner studio lighting

    // === CAMERA-FOLLOWING STUDIO LIGHT ===
    // Professional studio light that follows camera angle for optimal model illumination
    const studioLight = new THREE.DirectionalLight(0xffffff, 2.5); // Bright white studio light
    studioLight.position.copy(camera.position); // Start at camera position
    studioLight.position.add(new THREE.Vector3(0, 1, 2)); // Offset slightly above and forward
    studioLight.target.position.set(0, 0, 0); // Always point at center
    studioLight.castShadow = false; // Disable shadows for cleaner studio look
    scene.add(studioLight);
    scene.add(studioLight.target);

    // Store reference for updating in animation loop
    const studioLightRef = { current: studioLight };

    // ===== CREATE MODELS GROUP =====
    const modelsGroup = new THREE.Group();
    scene.add(modelsGroup);
    modelsGroupRef.current = modelsGroup;

    // ===== ADD HELPERS FOR DEBUGGING =====
    // Main world axis helper (large, at origin)
    const worldAxisHelper = new THREE.AxesHelper(10); // 10 units long
    scene.add(worldAxisHelper);

    // Models group axis helper (smaller, follows the models)
    const modelsAxisHelper = new THREE.AxesHelper(5); // 5 units long
    modelsGroup.add(modelsAxisHelper);

    // Grid helper for reference
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);
    // ===== LOAD MODELS =====
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
    );

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    modelPaths.forEach((path, index) => {
      loader.load(
        path,
        (gltf) => {
          const model = gltf.scene;

          // Make all meshes shiny and enable shadows
          model.traverse((obj) => {
            if (obj.isMesh && obj.material) {
              if ("metalness" in obj.material) obj.material.metalness = 1.0;
              if ("roughness" in obj.material) obj.material.roughness = 0.15;

              // Shadow system disabled for performance
              obj.castShadow = false;
              obj.receiveShadow = false;
            }
          });

          // Set assembled position as initial state (models start assembled)
          const explodedPos = explodedPositions[index];
          const assembledPos = assembledPositions[index];

          model.position.set(assembledPos.x, assembledPos.y, assembledPos.z);
          if (index === 4) {
            // Model 5 (index 4)
            model.scale.set(2.95, 2.95, 2.95); // Slightly smaller than 3
          } else if (index === 3) {
            // Model 4 (index 3)
            model.scale.set(2.9, 2.9, 2.9); // Custom size for Model 4
          } else {
            model.scale.set(3, 3, 3); // Normal size for other models
          }

          // Set initial visibility - model7, model8, and model9 start hidden
          if (index === 6 || index === 7 || index === 8) {
            // Model 7, Model 8, and Model 9
            model.visible = false;
          } else {
            model.visible = true;
          }

          // Store custom positions for animation
          model.userData = {
            explodedPos: explodedPos,
            assembledPos: assembledPos,
            index: index,
          };

          modelsGroup.add(model); // Add to group instead of scene
          modelsRef.current[index] = model;

          // Track loaded models
          setModelsLoaded((prev) => {
            const newCount = prev + 1;
            if (newCount === modelPaths.length) {
              console.log("All models loaded!");
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
          console.log(
            `Loading model ${index + 1}: ${
              (progress.loaded / progress.total) * 100
            }%`
          );
        },
        (error) => {
          console.error(`Error loading model ${index + 1}:`, error);

          // Create a placeholder cube if model fails to load
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(
              index / modelPaths.length,
              0.7,
              0.5
            ),
          });
          const cube = new THREE.Mesh(geometry, material);

          const explodedPos = explodedPositions[index];
          const assembledPos = assembledPositions[index];

          cube.position.set(assembledPos.x, assembledPos.y, assembledPos.z);
          cube.userData = {
            explodedPos: explodedPos,
            assembledPos: assembledPos,
            index: index,
          };

          modelsGroup.add(cube); // Add to group instead of scene
          modelsRef.current[index] = cube;

          setModelsLoaded((prev) => prev + 1);
        }
      );
    });

    // ===== ASSEMBLY ANIMATION FUNCTIONS =====
    const assembleModels = () => {
      console.log(
        "assembleModels called, modelsRef.current.length:",
        modelsRef.current.length
      );
      if (modelsRef.current.length === 0) {
        console.log("Assemble blocked - no models loaded");
        return;
      }

      console.log("Starting assembly animation...");
      setIsAssembled(true);

      // Create GSAP timeline
      const tl = gsap.timeline({
        ease: "power2.inOut",
        onComplete: () => {
          console.log("Assembly animation complete!");
          if (onAssemble) onAssemble();
        },
      });

      // Animate ALL models simultaneously (no stagger)
      modelsRef.current.forEach((model, index) => {
        if (model) {
          const assembledPos = model.userData.assembledPos;

          tl.to(
            model.position,
            {
              x: assembledPos.x,
              y: assembledPos.y,
              z: assembledPos.z,
              duration: config.animationDuration, // Full duration for smooth animation
              ease: "power2.inOut",
            },
            0
          ); // All start at time 0 (simultaneously)
        }
      });
      // Animate scene rotation back from 140deg to 90deg
      gsap.to(sceneRef.current.rotation, {
        y: Math.PI / 2,
        duration: config.animationDuration,
        ease: "power2.inOut",
      });

      // Stop Z rotation of models group
      gsap.to(modelsGroupRef.current.rotation, {
        z: 0,
        duration: config.animationDuration,
        ease: "power2.inOut",
      });
    };

    const explodeModels = () => {
      console.log(
        "explodeModels called, modelsRef.current.length:",
        modelsRef.current.length
      );
      if (modelsRef.current.length === 0) {
        console.log("Explode blocked - no models loaded");
        return;
      }

      console.log("Starting explode animation...");
      setIsAssembled(false);

      // Create GSAP timeline for exploding
      const tl = gsap.timeline({
        ease: "power2.inOut",
      });

      // Animate ALL models back to exploded position simultaneously
      modelsRef.current.forEach((model, index) => {
        if (model) {
          const explodedPos = model.userData.explodedPos;

          tl.to(
            model.position,
            {
              x: explodedPos.x,
              y: explodedPos.y,
              z: explodedPos.z,
              duration: config.animationDuration, // Full duration for smooth animation
              ease: "power2.inOut",
            },
            0
          ); // All start at time 0 (simultaneously)
        }
      });
      // Animate scene rotation from 90deg to 140deg
      gsap.to(sceneRef.current.rotation, {
        y: (140 * Math.PI) / 180,
        duration: config.animationDuration,
        ease: "power2.inOut",
      });

      // Rotate models group around Z axis during explode
      gsap.to(modelsGroupRef.current.rotation, {
        z: Math.PI * 2, // Full 360 degree rotation
        duration: config.animationDuration,
        ease: "power2.inOut",
      });
    };

    // ===== SCROLL-BASED ANIMATION FUNCTION =====
    const updateScrollAnimation = (progress) => {
      if (
        !modelsRef.current.length ||
        !sceneRef.current ||
        !modelsGroupRef.current
      )
        return;

      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      scrollProgressRef.current = progress;

      // Calculate position progress with special handling at 75%
      // Calculate position progress with delay until 26% (when blue axis helper is on -x line)
      let positionProgress;

      if (progress <= 0.26) {
        // 0-26%: Only rotation, no assembly/explode - models stay in assembled position
        positionProgress = 0; // Keep models assembled
      } else {
        // After 26%: Start assembly/explode animations
        // Remap remaining 74% (0.26 to 1.0) to full animation range (0 to 1)
        const adjustedProgress = (progress - 0.26) / 0.74; // Normalize to 0-1 range

        if (adjustedProgress <= 0.5) {
          // First half after 26%: explode (0 to 1)
          positionProgress = adjustedProgress * 2;
        } else if (adjustedProgress >= 0.75) {
          // At 75% of adjusted range and beyond: parts fully assembled, no rotation
          positionProgress = 0;
        } else {
          // Between 50% and 75% of adjusted range: assemble while rotating (1 to 0)
          const assemblyRange = 0.75 - 0.5; // 0.25
          const assemblyProgress = (adjustedProgress - 0.5) / assemblyRange; // 0 to 1 over the range
          positionProgress = 1 - assemblyProgress; // 1 to 0
        }
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
          if (index === 6) {
            // Model 7
            if (progress < 0.75) {
              // Before 75%: keep model7 hidden far below
              model.position.x = explodedPos.x;
              model.position.y = explodedPos.y;
              model.position.z = explodedPos.z;
              model.visible = false; // Hide until 75%
              model.scale.setScalar(3); // Larger scale for model7
            } else if (progress < 0.9) {
              // Between 75% and 90%: model7 animates from bottom to attach to model6
              model.visible = true;
              const model7Progress = (progress - 0.75) / 0.15; // 0 to 1 from 75% to 90%
              const clampedProgress = Math.min(1, model7Progress);

              // Animate from exploded position to assembled position
              model.position.x =
                explodedPos.x +
                (assembledPos.x - explodedPos.x) * clampedProgress;
              model.position.y =
                explodedPos.y +
                (assembledPos.y - explodedPos.y) * clampedProgress;
              model.position.z =
                explodedPos.z +
                (assembledPos.z - explodedPos.z) * clampedProgress;

              // Keep model7 at reduced scale
              model.scale.setScalar(3); // 5x larger than other models
            } else {
              // After 90%: model7 stays in final position
              model.visible = true;
              model.position.x = assembledPos.x;
              model.position.y = assembledPos.y;
              model.position.z = assembledPos.z;
              model.scale.setScalar(3);
            }
          } else if (index === 7) {
            // Model 8
            if (progress < 0.9) {
              // Before 90%: keep model8 hidden far below
              model.position.x = explodedPos.x;
              model.position.y = explodedPos.y;
              model.position.z = explodedPos.z;
              model.visible = false; // Hide until 90%
              model.scale.setScalar(2.0); // Slightly larger scale for model8
            } else if (progress < 0.95) {
              // Between 90% and 95%: model8 animates from bottom to attach to model7
              model.visible = true;
              const model8Progress = (progress - 0.9) / 0.05; // 0 to 1 from 90% to 95%
              const clampedProgress = Math.min(1, model8Progress);

              // Animate from exploded position to assembled position
              model.position.x =
                explodedPos.x +
                (assembledPos.x - explodedPos.x) * clampedProgress;
              model.position.y =
                explodedPos.y +
                (assembledPos.y - explodedPos.y) * clampedProgress;
              model.position.z =
                explodedPos.z +
                (assembledPos.z - explodedPos.z) * clampedProgress;

              // Keep model8 at slightly larger scale
              model.scale.setScalar(2.0); // 2x larger than other models
            } else {
              // After 95%: model8 stays in final position
              model.visible = true;
              model.position.x = assembledPos.x;
              model.position.y = assembledPos.y;
              model.position.z = assembledPos.z;
              model.scale.setScalar(2.0);
            }
          } else if (index === 8) {
            // Model 9
            if (progress < 0.95) {
              // Before 95%: keep model9 hidden far below
              model.position.x = explodedPos.x;
              model.position.y = explodedPos.y;
              model.position.z = explodedPos.z;
              model.visible = false; // Hide until 95%
              model.scale.setScalar(2.2); // Larger scale for model9
            } else {
              // After 95%: smoothly animate from bottom to attach to model8
              model.visible = true;
              const model9Progress = (progress - 0.95) / 0.05; // 0 to 1 from 95% to 100%
              const clampedProgress = Math.min(1, model9Progress);

              // Animate from exploded position to assembled position
              model.position.x =
                explodedPos.x +
                (assembledPos.x - explodedPos.x) * clampedProgress;
              model.position.y =
                explodedPos.y +
                (assembledPos.y - explodedPos.y) * clampedProgress;
              model.position.z =
                explodedPos.z +
                (assembledPos.z - explodedPos.z) * clampedProgress;

              // Keep model9 at larger scale
              model.scale.setScalar(2.2); // 2.2x larger than other models
            }
          } else {
            // Normal behavior for models 1-6
            // Lerp between assembled and exploded positions
            model.position.x =
              assembledPos.x +
              (explodedPos.x - assembledPos.x) * positionProgress;
            model.position.y =
              assembledPos.y +
              (explodedPos.y - assembledPos.y) * positionProgress;
            model.position.z =
              assembledPos.z +
              (explodedPos.z - assembledPos.z) * positionProgress;
          }
        }
      });

      // Rotation handling with smooth stop at 75% (centered position)
      if (progress >= 0.75) {
        // At 75% and beyond: stop at centered position (0° = full rotation)
        modelsGroupRef.current.rotation.y = 0; // Centered position (0° = 360°)
        modelsGroupRef.current.rotation.x = Math.PI / 2; // 90° - green line up
        modelsGroupRef.current.rotation.z = 0; // 0° - maintain alignment
        // Smooth upward lift when assembly is complete (after 95%)
        if (progress >= 0.95) {
          const liftProgress = (progress - 0.95) / 0.05; // 0 to 1 from 95% to 100%
          const clampedLiftProgress = Math.min(1, liftProgress);

          // Smooth easing function for the lift (ease-out cubic)
          const easedProgress = 1 - Math.pow(1 - clampedLiftProgress, 2);

          // Lift the entire models group upward smoothly
          modelsGroupRef.current.position.y = easedProgress * 8.0; // Lift up by 8 units (higher)

          // Optional: Add slight scale increase for dramatic effect
          const scaleBoost = 1 + easedProgress * 0.15; // 1.0 to 1.15 scale (more dramatic)
          modelsGroupRef.current.scale.setScalar(scaleBoost);
        } else {
          // Only reset if we're not in the middle of model 7, 8, 9 animations
          if (progress < 0.75) {
            // Reset position and scale before model 7 starts coming
            modelsGroupRef.current.position.y = 0;
            modelsGroupRef.current.scale.setScalar(1);
          }
          // Between 75% and 95%, let individual model animations handle positioning
        }
      } else if (progress > 0.5) {
        // Between 50% and 75%: continue rotations
        modelsGroupRef.current.rotation.x = progress * Math.PI * 2; // 0 to 360° on X-axis

        // Z-axis rotation during assembly phase
        const assemblyProgress = (progress - 0.5) * 2; // 0 to 1 during assembly
        modelsGroupRef.current.rotation.z = assemblyProgress * Math.PI * 2; // 0 to 360° on Z-axis
      } else {
        // First half (0 to 50%): continuous X rotation, no Z rotation
        modelsGroupRef.current.rotation.x = progress * Math.PI * 2; // 0 to 360° on X-axis
        modelsGroupRef.current.rotation.z = 0; // No Z rotation
      }

      // Background stays constant (radial gradient)

      // Track model positions for callouts (convert 3D to 2D screen coordinates)
      if (cameraRef.current && modelsRef.current.length > 0) {
        const newPositions = modelsRef.current
          .map((model, index) => {
            if (!model) return null;

            // Get world position of the model
            const worldPosition = new THREE.Vector3();
            model.getWorldPosition(worldPosition);

            // Convert to screen coordinates
            const screenPosition = worldPosition.clone();
            screenPosition.project(cameraRef.current);

            // Convert to pixel coordinates
            let x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
            let y = (screenPosition.y * -0.5 + 0.5) * window.innerHeight;

            // Calculate dynamic offsets based on specific model directions
            const calculateDynamicOffset = (modelIndex, screenX, screenY, worldPos) => {
              // Base offset distance from model center
              const baseOffsetDistance = 100;
              
              // Specific directional pattern for each model
              let offsetX = 0;
              let offsetY = 0;
              
              switch (modelIndex) {
                case 0: // Model 1 - LEFT
                  offsetX = -baseOffsetDistance * 1.2;
                  offsetY = 0;
                  break;
                case 1: // Model 2 - UP
                  offsetX = 0;
                  offsetY = -baseOffsetDistance;
                  break;
                case 2: // Model 3 - DOWN
                  offsetX = 0;
                  offsetY = baseOffsetDistance;
                  break;
                case 3: // Model 4 - UP
                  offsetX = 0;
                  offsetY = -baseOffsetDistance;
                  break;
                case 4: // Model 5 - DOWN
                  offsetX = 0;
                  offsetY = baseOffsetDistance;
                  break;
                case 5: // Model 6 - RIGHT
                  offsetX = baseOffsetDistance * 1.2;
                  offsetY = 0;
                  break;
                default:
                  // Fallback for any additional models
                  offsetX = (modelIndex % 2 === 0) ? baseOffsetDistance : -baseOffsetDistance;
                  offsetY = 0;
              }
              
              // Add some variation based on model index to avoid overlaps
              const indexVariation = (modelIndex * 15) % 30 - 15; // -15 to +15
              offsetX += indexVariation;
              offsetY += indexVariation * 0.5;
              
              // Ensure callouts stay within screen bounds
              const margin = 200; // Minimum margin from screen edges
              const finalX = Math.max(margin, Math.min(window.innerWidth - margin, screenX + offsetX));
              const finalY = Math.max(margin, Math.min(window.innerHeight - margin, screenY + offsetY));
              
              return {
                x: finalX - screenX, // Return relative offset
                y: finalY - screenY
              };
            };

            // Manual dot position overrides (set to null to use calculated position)
            const manualDotPositions = {
              0: null, // Model 1 - set to { x: 400, y: 300 } for manual position
              1: null, // Model 2 - set to { x: 500, y: 200 } for manual position
              2: null, // Model 3 - set to { x: 600, y: 400 } for manual position
              3: null, // Model 4 - set to { x: 700, y: 350 } for manual position
              4: null, // Model 5 - set to { x: 800, y: 450 } for manual position
              5: null, // Model 6 - set to { x: 900, y: 300 } for manual position
            };

            // Use manual position if specified, otherwise use calculated position
            if (manualDotPositions[index]) {
              x = manualDotPositions[index].x;
              y = manualDotPositions[index].y;
            } else {
              // Apply dynamic offset calculation only if no manual position
              const dynamicOffset = calculateDynamicOffset(index, x, y, worldPosition);
              x += dynamicOffset.x;
              y += dynamicOffset.y;
            }

            // Model names mapping
            const modelNames = [
              "Top Plate", // Model 1 (index 0)
              "Male Connector Plate", // Model 2 (index 1)
              "Ceiling Bracket Steel", // Model 3 (index 2)
              "Plate", // Model 4 (index 3)
              "PCB Board", // Model 5 (index 4)
              "Ceiling Hub", // Model 6 (index 5)
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
                z: worldPosition.z,
              },
              progress: progress,
              isVisible: screenPosition.z < 1, // Check if in front of camera
            };
          })
          .filter((pos) => pos !== null);

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
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;

      // Adjust sensitivity based on device type and scroll progress
      let scrollSensitivity = isMobile ? 0.005 : 0.07; // Base sensitivity

      // Smoothly reduce sensitivity between 49% and 70% progress
      const currentProgress = scrollProgressRef.current;

      if (currentProgress >= 0.45 && currentProgress <= 0.74) {
        let sensitivityMultiplier = 1.0; // Default multiplier

        if (currentProgress >= 0.45 && currentProgress < 0.49) {
          // Smooth transition IN (45% to 49%) - gradually reduce to 50%
          const transitionProgress = (currentProgress - 0.45) / 0.04; // 0 to 1
          const smoothTransition =
            (0.5 * (1 - Math.cos(transitionProgress * Math.PI))) / 2; // Smooth curve
          sensitivityMultiplier = 1.0 - 0.5 * smoothTransition; // 1.0 to 0.5
        } else if (currentProgress >= 0.49 && currentProgress <= 0.7) {
          // Reduced sensitivity zone (49% to 70%) - maintain 50%
          sensitivityMultiplier = 0.5;
        } else if (currentProgress > 0.7 && currentProgress <= 0.74) {
          // Smooth transition OUT (70% to 74%) - gradually increase back to 100%
          const transitionProgress = (currentProgress - 0.7) / 0.04; // 0 to 1
          const smoothTransition =
            (0.5 * (1 - Math.cos(transitionProgress * Math.PI))) / 2; // Smooth curve
          sensitivityMultiplier = 0.5 + 0.5 * smoothTransition; // 0.5 to 1.0
        }

        scrollSensitivity = scrollSensitivity * sensitivityMultiplier;
      }
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
        },
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
        progress: scrollProgressRef.current, // Use current actual progress
      };
    };

    const handleTouchMove = (event) => {
      if (!isTouchingRef.current) return;
      event.preventDefault();

      const currentY = event.touches[0].clientY;
      const deltaY = touchStartRef.current.y - currentY;
      const touchSensitivity = 0.0008; // Much lower sensitivity for more controlled touch scrolling

      let targetProgress =
        touchStartRef.current.progress + deltaY * touchSensitivity;

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
    window.addEventListener("wheel", handleScroll, { passive: false });
    canvasRef.current.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    canvasRef.current.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    canvasRef.current.addEventListener("touchend", handleTouchEnd, {
      passive: false,
    });

    // Assign functions to refs for component access
    assembleModelsRef.current = assembleModels;
    explodeModelsRef.current = explodeModels;

    // Expose functions to parent component
    window.assembleModels = assembleModels;
    window.explodeModels = explodeModels;

    // ===== ANIMATION LOOP =====
    const animate = () => {
      requestAnimationFrame(animate);

      // Continuous auto-rotation of each individual model (alternating directions)
      modelsRef.current.forEach((model, index) => {
        if (model) {
          // Each model rotates at slightly different speeds for variety (much slower)
          const baseSpeed = 0.003; // Reduced from 0.01 to 0.003 (3x slower)
          const speedVariation = (index + 1) * 0.0005; // Reduced from 0.002 to 0.0005 (4x slower)

          // Alternate rotation direction: even indices clockwise, odd indices anti-clockwise
          const rotationDirection = index % 2 === 0 ? 1 : -1; // Model 1,3,5... clockwise, Model 2,4,6... anti-clockwise

          model.rotation.y += (baseSpeed + speedVariation) * rotationDirection;
        }
      });

      // No controls to update - orbit controls disabled

      // Update studio light to follow camera angle
      if (studioLightRef.current) {
        // Position studio light relative to camera with slight offset
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);

        // Position light slightly above and forward from camera
        studioLightRef.current.position.copy(camera.position);
        studioLightRef.current.position.add(new THREE.Vector3(0, 1, 2));

        // Make light point towards the center of the models
        studioLightRef.current.target.position.set(0, 0, 0);
        studioLightRef.current.target.updateMatrixWorld();
      }

      // Render scene
      renderer.render(scene, camera);
    };
    animate();

    // ===== WINDOW RESIZE =====
    const handleResize = () => {
      const { width, height } = getViewportSize();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Listen to both resize and visualViewport events for mobile
    window.addEventListener("resize", handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    // ===== CLEANUP =====
    return () => {
      window.removeEventListener("resize", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
      window.removeEventListener("wheel", handleScroll);

      // Clean up touch event listeners
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("touchstart", handleTouchStart);
        canvasRef.current.removeEventListener("touchmove", handleTouchMove);
        canvasRef.current.removeEventListener("touchend", handleTouchEnd);
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
              object.material.forEach((material) => material.dispose());
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
      description:
        "The core foundation that holds everything together with precision engineering.",
      progress: 0.0,
    },
    {
      title: "Power Module",
      subtitle: "Model 5 - Energy Core",
      description:
        "Advanced power distribution system ensuring optimal performance.",
      progress: 0.2,
    },
    {
      title: "Central Hub",
      subtitle: "Model 4 - Control Center",
      description:
        "The brain of the operation, coordinating all system functions seamlessly.",
      progress: 0.4,
    },
    {
      title: "Integration Layer",
      subtitle: "Model 3 - Connection Point",
      description:
        "Seamless integration ensuring all components work in perfect harmony.",
      progress: 0.6,
    },
    {
      title: "Interface Module",
      subtitle: "Model 2 - User Interface",
      description:
        "Intuitive interface design for effortless interaction and control.",
      progress: 0.75,
    },
    {
      title: "Top Assembly",
      subtitle: "Model 1 - Final Touch",
      description:
        "The finishing component that completes the perfect assembly.",
      progress: 0.8,
    },
    {
      title: "Foundation Base",
      subtitle: "Model 7 - Primary Support",
      description:
        "The massive foundation piece that emerges from below to support everything.",
      progress: 0.9,
    },
    {
      title: "Secondary Base",
      subtitle: "Model 8 - Support Layer",
      description:
        "The secondary foundation layer that reinforces the primary support structure.",
      progress: 0.95,
    },
    {
      title: "Ultimate Base",
      subtitle: "Model 9 - Final Foundation",
      description:
        "The ultimate foundation that completes the entire assembly from the very bottom.",
      progress: 1.0,
    },
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
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Loading Screen */}
      {modelsLoaded < modelPaths.length && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading 3D Preview...</p>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          touchAction: "none",
        }}
      />

      {/* Left Content Carousel - Responsive (Hidden during callouts) */}
      {(() => {
        const currentProgress = scrollProgressRef.current;
        const calloutsActive =
          currentProgress >= 0.49 && currentProgress <= 0.7;
        return !calloutsActive;
      })() && (
        <div className="absolute left-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 pointer-events-none flex items-start md:items-center">
          <div className="relative w-full h-full flex flex-col justify-start md:justify-center px-4 sm:px-6 md:px-8 pt-8 md:pt-0">
            {contentSections.map((section, index) => {
              const progress = scrollProgressRef.current;
              const sectionProgress = section.progress;
              const nextSectionProgress =
                contentSections[index + 1]?.progress || 1.1;

              // Calculate smooth scroll-based position and opacity
              let opacity = 0;
              let translateY = 0;

              // Always show first section initially (on page load)
              if (index === 0 && progress === 0) {
                opacity = 1;
                translateY = 0;
              } else {
                // Calculate position based on scroll progress
                const sectionRange = nextSectionProgress - sectionProgress;
                const transitionZone = sectionRange * 0.7; // 70% of section for transitions (slower)

                if (progress < sectionProgress - transitionZone) {
                  // Section is below (not yet reached)
                  opacity = 0;
                  translateY = 100; // Start from bottom
                } else if (
                  progress >= sectionProgress - transitionZone &&
                  progress < sectionProgress
                ) {
                  // Section is entering from bottom
                  const enterProgress =
                    (progress - (sectionProgress - transitionZone)) /
                    transitionZone;
                  opacity = Math.min(1, enterProgress);
                  translateY = 100 * (1 - enterProgress);
                } else if (
                  progress >= sectionProgress &&
                  progress < nextSectionProgress - transitionZone
                ) {
                  // Section is fully visible
                  opacity = 1;
                  translateY = 0;
                } else if (
                  progress >= nextSectionProgress - transitionZone &&
                  progress < nextSectionProgress
                ) {
                  // Section is exiting to top
                  const exitProgress =
                    (progress - (nextSectionProgress - transitionZone)) /
                    transitionZone;
                  opacity = Math.max(0, 1 - exitProgress);
                  translateY = -100 * exitProgress;
                } else {
                  // Section has exited
                  opacity = 0;
                  translateY = -100;
                }
              }

              return (
                <div
                  key={index}
                  className="absolute inset-0 flex flex-col justify-start md:justify-center px-4 sm:px-6 md:px-8 pt-8 md:pt-0"
                  style={{
                    opacity,
                    transform: `translateY(${translateY}%)`,
                    pointerEvents: opacity > 0 ? "auto" : "none",
                    willChange: "transform, opacity",
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
                          style={{
                            width: `${
                              ((index + 1) / contentSections.length) * 100
                            }%`,
                          }}
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
      )}
      {/* Callout positions when scroll sensitivity is reduced (49% to 70% progress) */}
      {(() => {
        const currentProgress = scrollProgressRef.current;
        return (
          currentProgress >= 0.49 &&
          currentProgress <= 0.7 &&
          modelPositions.length > 0
        );
      })() && (
        <>
          {modelPositions
            .filter((pos) => pos.id <= 5) // Only show models 1-6 (indices 0-5)
            .map(
              (pos) =>
                pos.isVisible && (
                  <div
                    key={pos.id}
                    className="absolute pointer-events-none z-50"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Cyberpunk-style callout system */}
                    <div className="relative">
                      {/* Central glowing dot */}
                      <div className="relative w-3 h-3">
                        <div className="absolute inset-0 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                        <div className="absolute inset-0 bg-cyan-300 rounded-full animate-ping opacity-75"></div>
                        <div className="absolute inset-0 bg-white rounded-full scale-50"></div>
                      </div>

                      {/* Connecting line to label - specific directions */}
                      {(() => {
                        // Define line properties based on model ID
                        const getLineConfig = (modelId) => {
                          switch (modelId) {
                            case 0: // Model 1 - LEFT
                              return {
                                lineClass: "absolute top-1.5 w-28 h-px bg-gradient-to-l from-cyan-400 to-cyan-200 right-1.5",
                                pulseClass: "absolute top-0 right-0 w-3 h-px bg-cyan-100 animate-pulse"
                              };
                            case 1: // Model 2 - UP
                              return {
                                lineClass: "absolute left-1.5 w-px h-24 bg-gradient-to-t from-cyan-400 to-cyan-200 bottom-1.5",
                                pulseClass: "absolute left-0 bottom-0 w-px h-3 bg-cyan-100 animate-pulse"
                              };
                            case 2: // Model 3 - DOWN
                              return {
                                lineClass: "absolute left-1.5 w-px h-24 bg-gradient-to-b from-cyan-400 to-cyan-200 top-1.5",
                                pulseClass: "absolute left-0 top-0 w-px h-3 bg-cyan-100 animate-pulse"
                              };
                            case 3: // Model 4 - UP
                              return {
                                lineClass: "absolute left-1.5 w-px h-24 bg-gradient-to-t from-cyan-400 to-cyan-200 bottom-1.5",
                                pulseClass: "absolute left-0 bottom-0 w-px h-3 bg-cyan-100 animate-pulse"
                              };
                            case 4: // Model 5 - DOWN
                              return {
                                lineClass: "absolute left-1.5 w-px h-24 bg-gradient-to-b from-cyan-400 to-cyan-200 top-1.5",
                                pulseClass: "absolute left-0 top-0 w-px h-3 bg-cyan-100 animate-pulse"
                              };
                            case 5: // Model 6 - RIGHT
                              return {
                                lineClass: "absolute top-1.5 w-28 h-px bg-gradient-to-r from-cyan-400 to-cyan-200 left-1.5",
                                pulseClass: "absolute top-0 left-0 w-3 h-px bg-cyan-100 animate-pulse"
                              };
                            default:
                              return {
                                lineClass: "absolute top-1.5 w-24 h-px bg-gradient-to-r from-cyan-400 to-transparent left-1.5",
                                pulseClass: "absolute top-0 left-0 w-2 h-px bg-cyan-300 animate-pulse"
                              };
                          }
                        };
                        
                        const lineConfig = getLineConfig(pos.id);
                        
                        return (
                          <div className={lineConfig.lineClass}>
                            {/* Animated pulse along the line */}
                            <div className={lineConfig.pulseClass}></div>
                          </div>
                        );
                      })()}

                      {/* Tech-style callout label - specific positioning */}
                      <div
                        className={`absolute transform ${
                          (() => {
                            switch (pos.id) {
                              case 0: // Model 1 - LEFT
                                return "right-32 top-0 -translate-y-1/2";
                              case 1: // Model 2 - UP
                                return "left-0 bottom-28 -translate-x-1/2";
                              case 2: // Model 3 - DOWN
                                return "left-0 top-28 -translate-x-1/2";
                              case 3: // Model 4 - UP
                                return "left-0 bottom-28 -translate-x-1/2";
                              case 4: // Model 5 - DOWN
                                return "left-0 top-28 -translate-x-1/2";
                              case 5: // Model 6 - RIGHT
                                return "left-32 top-0 -translate-y-1/2";
                              default:
                                return "left-28 top-0 -translate-y-1/2";
                            }
                          })()
                        }`}
                      >
                        <div className="relative">
                          {/* Outer glow effect */}
                          <div className="absolute -inset-1 bg-cyan-400/20 blur-sm rounded"></div>

                          {/* Main label container */}
                          <div className="relative bg-black/90 border border-cyan-400/60 backdrop-blur-sm">
                            {/* Corner decorations */}
                            <div className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
                            <div className="absolute -top-px -right-px w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
                            <div className="absolute -bottom-px -left-px w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
                            <div className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>

                            {/* Label content - Enhanced and larger */}
                            <div className="px-4 py-3 text-cyan-300 font-mono whitespace-nowrap min-w-[180px]">
                              {/* Main component name */}
                              <div className="flex items-center space-x-2 mb-1">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                                <span className="text-cyan-100 font-bold text-sm uppercase tracking-wide">
                                  {pos.name}
                                </span>
                              </div>
                              {/* Status indicator with enhanced styling */}
                              <div className="text-[11px] text-cyan-400/80 uppercase tracking-wider">
                                COMPONENT #{pos.id + 1}
                              </div>
                            </div>
                            {/* Animated border effect */}
                            <div className="absolute inset-0 border border-cyan-400/30 animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      {/* Additional tech elements */}
                      <div
                        className="absolute -top-1 -left-1 w-5 h-5 border border-cyan-400/30 rounded-full animate-spin"
                        style={{ animationDuration: "8s" }}
                      ></div>
                      <div
                        className="absolute -top-0.5 -left-0.5 w-4 h-4 border border-cyan-400/20 rounded-full animate-spin"
                        style={{
                          animationDuration: "6s",
                          animationDirection: "reverse",
                        }}
                      ></div>
                    </div>
                  </div>
                )
            )}
        </>
      )}

      {/* Right Side Progress Indicator */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 pointer-events-none">
        <div className="flex flex-col items-center space-y-4">
          {/* Progress Percentage */}
          <div className="bg-black bg-opacity-80 backdrop-blur-md rounded-lg px-3 py-2 border border-white border-opacity-20">
            <div className="text-white text-sm font-mono font-bold">
              {Math.round(scrollProgressRef.current * 100)}%
            </div>
          </div>

          {/* Vertical Progress Bar */}
          <div className="relative">
            {/* Background track */}
            <div className="w-1 h-48 bg-white bg-opacity-20 rounded-full overflow-hidden">
              {/* Progress fill */}
              <div
                className="w-full bg-gradient-to-t from-cyan-400 via-blue-400 to-purple-400 rounded-full transition-all duration-300 ease-out"
                style={{
                  height: `${scrollProgressRef.current * 100}%`,
                  transformOrigin: "bottom",
                }}
              />
            </div>

            {/* Progress indicator dot */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-300 ease-out"
              style={{
                top: `${(1 - scrollProgressRef.current) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-cyan-400 rounded-full animate-pulse opacity-75"></div>
              <div className="absolute inset-0 bg-white rounded-full scale-75"></div>
            </div>
          </div>

          {/* Progress Labels */}
          <div className="flex flex-col items-center space-y-2 text-xs text-white text-opacity-60">
            <div className="text-center">
              <div className="font-mono">ASSEMBLY</div>
              <div className="font-mono">PROGRESS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeScene;
