'use client';

import { useEffect, useRef, useState } from 'react';
import { useGLTF, Environment, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { modelConfigs } from './ModelConfigs';

gsap.registerPlugin(ScrollTrigger);

// Base Model Component
const BaseModel = ({ scene, config, opacity = 1, scale = 1, spin = 0 }) => {
  const modelRef = useRef();
  const baseScale = config.scale;

  useEffect(() => {
    if (modelRef.current) {
      // Apply gentle spin animation
      modelRef.current.rotation.y = (spin * Math.PI) / 180; // Convert degrees to radians
      
      modelRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material = new THREE.MeshPhysicalMaterial({
            ...child.material,
            ...config.materialProps,
            transparent: true,
            opacity: opacity,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [opacity, config, spin]);

  return (
    <primitive 
      ref={modelRef}
      object={scene.clone()} 
      scale={baseScale * scale}
      position={config.position}
      castShadow
      receiveShadow
    />
  );
};

// Pre-rendered Model Components
const CubeModel = ({ opacity, scale, spin }) => {
  const { scene } = useGLTF(modelConfigs.cube.path);
  return <BaseModel scene={scene} config={modelConfigs.cube} opacity={opacity} scale={scale} spin={spin} />;
};

const CubeUpdateModel = ({ opacity, scale, spin }) => {
  const { scene } = useGLTF(modelConfigs.cubeUpdate.path);
  return <BaseModel scene={scene} config={modelConfigs.cubeUpdate} opacity={opacity} scale={scale} spin={spin} />;
};

const HubModel = ({ opacity, scale, spin }) => {
  const { scene } = useGLTF(modelConfigs.hub.path);
  return <BaseModel scene={scene} config={modelConfigs.hub} opacity={opacity} scale={scale} spin={spin} />;
};

const PendantModel = ({ opacity, scale, spin }) => {
  const { scene } = useGLTF(modelConfigs.pendant.path);
  return <BaseModel scene={scene} config={modelConfigs.pendant} opacity={opacity} scale={scale} spin={spin} />;
};

// Preload all models
Object.values(modelConfigs).forEach(config => {
  useGLTF.preload(config.path);
});

const ModelTransition = () => {
  const containerRef = useRef(null);
  const [activeModel, setActiveModel] = useState({
    index: 0,
    opacity: 1,
    scale: 1,
    spin: 0,
    prevOpacity: 0,
    prevScale: 1,
    prevSpin: 0
  });

  useEffect(() => {
    const container = containerRef.current;

    // Create scroll triggers for each section
    [0, 1, 2, 3].forEach(index => {
      ScrollTrigger.create({
        trigger: container,
        start: `${index * 400}vh`,
        end: `${(index + 1) * 400}vh`,
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          setActiveModel({
            index,
            opacity: Math.min(1, 1.5 - progress), // Fade out current model
            scale: 1 + progress * 0.5, // Scale up current model
            spin: progress * 80, // Gentle 80-degree spin
            prevOpacity: index > 0 ? Math.max(0, progress - 0.5) : 0, // Fade in next model
            prevScale: index > 0 ? 0.5 + progress * 0.5 : 1, // Scale up next model
            prevSpin: index > 0 ? -40 + progress * 80 : 0 // Counter spin for previous model
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const renderActiveModel = () => {
    const { index, opacity, scale, spin, prevOpacity, prevScale, prevSpin } = activeModel;
    
    return (
      <>
        {index > 0 && prevOpacity > 0 && (
          {
            0: <CubeModel opacity={prevOpacity} scale={prevScale} spin={prevSpin} />,
            1: <CubeUpdateModel opacity={prevOpacity} scale={prevScale} spin={prevSpin} />,
            2: <HubModel opacity={prevOpacity} scale={prevScale} spin={prevSpin} />,
            3: <PendantModel opacity={prevOpacity} scale={prevScale} spin={prevSpin} />
          }[index - 1]
        )}
        {
          {
            0: <CubeModel opacity={opacity} scale={scale} spin={spin} />,
            1: <CubeUpdateModel opacity={opacity} scale={scale} spin={spin} />,
            2: <HubModel opacity={opacity} scale={scale} spin={spin} />,
            3: <PendantModel opacity={opacity} scale={scale} spin={spin} />
          }[index]
        }
      </>
    );
  };

  return (
    <div ref={containerRef} className="w-full h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        <Stage
          environment="city"
          intensity={1}
          adjustCamera={false}
        >
          <group>
            {renderActiveModel()}
          </group>
        </Stage>
        <Environment preset="city" />
        <ambientLight intensity={1.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={1} />
      </Canvas>
    </div>
  );
};

export default ModelTransition;
