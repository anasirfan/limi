"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import {
  Html,
  useProgress,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { easing } from "maath";

const RoomModel = dynamic(() => import("./RoomModel"), {
  ssr: false,
});

const environmentSettings = {
  day: {
    ambientIntensity: 1,
    directionalIntensity: 2,
    directionalPosition: [5, 5, 5],
    // backgroundColor: "#87CEEB",
    preset: "sunset",
  },
  evening: {
    ambientIntensity: 0.7,
    directionalIntensity: 1,
    directionalPosition: [-3, 2, -5],
    // backgroundColor: "#FF7F50",
    preset: "sunset",
  },
  night: {
    ambientIntensity: 0.3,
    directionalIntensity: 0.5,
    directionalPosition: [-2, 3, -4],
    backgroundColor: "#292929",
    preset: "night",
  },
};

function useIntersectionObserver(ref) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // 50% of the element must be visible
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
}

function CircularLightControls({ modelRef, timeOfDay, setTimeOfDay }) {
  const [lampIntensity, setLampIntensity] = useState(0);
  const [pendantIntensity, setPendantIntensity] = useState(0);

  const toggleLight = (type) => {
    if (type === "lamp") {
      const newIntensity = lampIntensity === 0 ? 5 : 0;
      setLampIntensity(newIntensity);
      modelRef.current?.toggleLamp(newIntensity);
    } else {
      const newIntensity = pendantIntensity === 0 ? 5 : 0;
      setPendantIntensity(newIntensity);
      modelRef.current?.togglePendant(newIntensity);
    }
  };

  return (
    <div className="absolute bottom-8 right-8 flex flex-col gap-4">
      <style jsx>{`
        .glow-effect {
          transition: all 0.3s ease;
        }
        .glow-effect.active {
          box-shadow: 0 0 15px #ffb800, 0 0 30px #ff8c42, 0 0 45px #ff5733;
          transform: scale(1.05);
        }
        .time-controls {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          padding: 8px;
          border-radius: 12px;
        }
      `}</style>
      <div className="time-controls flex gap-2 mb-4">
        <button
          onClick={() => setTimeOfDay("day")}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            timeOfDay === "day"
              ? "bg-yellow-400 text-black"
              : "bg-gray-700 text-white"
          }`}
        >
          Day
        </button>
        <button
          onClick={() => setTimeOfDay("evening")}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            timeOfDay === "evening"
              ? "bg-orange-400 text-black"
              : "bg-gray-700 text-white"
          }`}
        >
          Evening
        </button>
        <button
          onClick={() => setTimeOfDay("night")}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            timeOfDay === "night"
              ? "bg-blue-900 text-white"
              : "bg-gray-700 text-white"
          }`}
        >
          Night
        </button>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => toggleLight("lamp")}
          className={`glow-effect w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            lampIntensity > 0
              ? "bg-yellow-400 text-black active"
              : "bg-gray-700 text-white"
          }`}
          title="Toggle Lamp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707m2.343 5.657h-1m-11.314-5.657l.707.707M3 12h1m9 9v-1"
            />
          </svg>
        </button>
        <button
          onClick={() => toggleLight("pendant")}
          className={`glow-effect w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            pendantIntensity > 0
              ? "bg-yellow-400 text-black active"
              : "bg-gray-700 text-white"
          }`}
          title="Toggle Pendant Light"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function CameraAnimationController({ isModelVisible }) {
  const { camera } = useThree();
  const [animationStarted, setAnimationStarted] = useState(false);

  // Window view coordinates
  const initialPosition = new THREE.Vector3(0, 0.5, 0);
  const initialRotation = new THREE.Euler(0, 0, 4);

  // Final view coordinates
  const targetPosition = new THREE.Vector3(0, 0.5, 6);
  const targetRotation = new THREE.Euler(0, 0, 0);

  // Log camera position when orbit controls are used

  useEffect(() => {
    // Set initial camera position and rotation
    camera.position.copy(initialPosition);
    camera.rotation.copy(initialRotation);

    // Start animation when model becomes visible
    if (isModelVisible && !animationStarted) {
      setTimeout(() => {
        setAnimationStarted(true);
      }, 1000); // Reduced delay to 1 second after model is visible
    }
  }, [isModelVisible]);

  useFrame((state, delta) => {
    if (animationStarted) {
      // Smoothly interpolate position
      easing.damp3(camera.position, targetPosition, 2, delta);

      // Smoothly interpolate rotation
      easing.dampE(camera.rotation, targetRotation, 0.75, delta);
    }
  });

  return null;
}

function CameraController({ isModelVisible }) {
  const { camera, pointer } = useThree();
  const initialPosition = new THREE.Vector3(0, 0.5, 4);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Initial window view coordinates
  const startPosition = new THREE.Vector3(0, 0.5, 0);
  const startRotation = new THREE.Euler(-2, 0, 4);

  useEffect(() => {
    // Set initial camera position and rotation
    camera.position.copy(startPosition);
    camera.rotation.copy(startRotation);

    // Start animation when model becomes visible
    if (isModelVisible && !animationStarted) {
      setTimeout(() => {
        setAnimationStarted(true);
      }, 1000);
    }
  }, [isModelVisible]);

  useFrame((state, delta) => {
    if (!animationStarted) return;

    if (camera.position.z !== initialPosition.z) {
      // Animate to initial z position if not there yet
      easing.damp3(camera.position, initialPosition, 2, delta);
    } else {
      // Only move in x and y directions once at correct z distance
      const targetPosition = new THREE.Vector3(
        initialPosition.x + pointer.x * 0.5,
        initialPosition.y + Math.max(-0.2, Math.min(0.2, pointer.y * 0.3)), // Limit vertical movement
        initialPosition.z // Keep z position fixed
      );

      easing.damp3(camera.position, targetPosition, 0.5, delta);
    }

    // Handle rotation
    const targetRotation = new THREE.Euler(
      pointer.y * 0.2,
      -pointer.x * 0.4,
      0
    );

    easing.dampE(camera.rotation, targetRotation, 0.75, delta);
  });

  return null;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-white text-lg font-medium">
          Loading Room ({progress.toFixed(0)}%)
        </div>
      </div>
    </Html>
  );
}

export default function Scene3D() {
  const modelRef = useRef(null);
  const containerRef = useRef(null);
  const [timeOfDay, setTimeOfDay] = useState("day");
  const settings = environmentSettings[timeOfDay];
  const isModelVisible = useIntersectionObserver(containerRef);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-8">
            <div className="w-60 h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full animate-pulse"
                style={{ width: "100%" }}
              />
            </div>
            <div className="text-white text-xl">
              Preparing Your 3D Experience...
            </div>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-[50vh] bg-black relative">
        <Canvas
          camera={{
            fov: 50,
            position: [0, 0.5, 0],
            near: 0.1,
            far: 1000,
          }}
          onCreated={() => {
            // Hide loading screen once everything is ready
            setTimeout(() => setIsLoading(false), 500);
          }}
        >
          <color attach="background" args={[settings.backgroundColor]} />
          <ambientLight intensity={settings.ambientIntensity} />
          <directionalLight
            position={settings.directionalPosition}
            intensity={settings.directionalIntensity}
          />
          <Environment preset={settings.preset} />
          <Suspense fallback={<Loader />}>
            <RoomModel
              ref={modelRef}
              onLoad={() => {
                setIsLoading(false);
              }}
            />
          </Suspense>
          {/* <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          /> */}
          <CameraController isModelVisible={isModelVisible} />
        </Canvas>

        <CircularLightControls
          modelRef={modelRef}
          timeOfDay={timeOfDay}
          setTimeOfDay={setTimeOfDay}
        />
      </div>
    </>
  );
}
