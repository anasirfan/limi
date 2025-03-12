"use client";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  useTexture,
  AccumulativeShadows,
  RandomizedLight,
  Lightformer
} from "@react-three/drei";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from 'three';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Diamond() {
  const modelRef = useRef();
  const { scene, materials } = useGLTF("/models/diamond.glb");
  
  // Load and configure textures
  const [colorMap] = useTexture(['/textures/diamond.jpg']);
  
  useEffect(() => {
    if (modelRef.current) {
      const material = new THREE.MeshStandardMaterial({
        map: colorMap,
        metalness: 1,
        roughness: 0,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        envMapIntensity: 2
      });

      // Apply material
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
          child.material.needsUpdate = true;
        }
      });

      // Initial position
      modelRef.current.rotation.set(0, 0, 0);
      modelRef.current.scale.set(12, 12, 12);

      // Get the number of text sections from ModelSection
      const texts = document.querySelectorAll('.text-section');
      // console.log(texts)
      const totalSections = 4;

      // Create timeline for rotations
      gsap.timeline({
        scrollTrigger: {
          trigger: "#diamond-section",
          start: "top center",
          end: `${totalSections * 400}vh top`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            if (progress < 0.33) {
              const xRotation = (progress * 3) * Math.PI * 2;
              modelRef.current.rotation.x = xRotation;
            }
            else if (progress < 0.66) {
              const yRotation = ((progress - 0.33) * 3) * Math.PI * 2;
              modelRef.current.rotation.y = yRotation;
            }
            else {
              const zRotation = ((progress - 0.66) * 3) * Math.PI * 2;
              modelRef.current.rotation.z = zRotation;
            }

            // console.log("Diamond Rotation Progress:", progress.toFixed(2));
          }
        }
      });
    }
  }, [colorMap]);

  return <primitive ref={modelRef} object={scene} />;
}

const DiamondViewer = () => {
  return (
    <div className="h-[600px] w-full" id="diamond-section">
      <Canvas
        shadows
        camera={{
          position: [0, 0, 5],
          fov: 45
        }}
      >
        {/* Main Lighting */}
        <ambientLight intensity={1} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        {/* Additional Lighting Effects */}
        <group position={[0, 4, 0]}>
          <Lightformer 
            intensity={5} 
            rotation-x={Math.PI / 2} 
            position={[0, 0, 2]} 
            scale={[10, 1, 1]} 
          />
        </group>
        
        <Environment preset="warehouse" background />
        
        <Diamond />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default DiamondViewer;
