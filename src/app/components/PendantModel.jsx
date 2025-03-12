'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const interpolate = (start, end, progress) => {
    return start + (end - start) * progress;
};

const PendantModel = ({ position, scrollProgress, pendantPath }) => {
    const { scene } = useGLTF(pendantPath);
    const groupRef = useRef();
    const pointLightRef = useRef();
    
    // Clone the scene to avoid manipulating the cached original
    const [model, setModel] = useState(null);
    
    // Setup the model and find all parts
    useEffect(() => {
        if (scene) {
            // console.log("Loading pendant model from:", pendantPath);
            const clonedScene = scene.clone();
            
            // Log model structure to help debug
            // console.log("Pendant model structure:", clonedScene);
            
            // Make all meshes visible and adjust materials
            clonedScene.traverse((object) => {
                if (object.isMesh) {
                    // console.log("Found mesh:", object.name);
                    object.visible = true;
                    object.castShadow = true;
                    object.receiveShadow = true;
                    
                    if (object.material) {
                        object.material = object.material.clone();
                        // Enhance material properties for better visibility
                        object.material.roughness = 0.5;
                        object.material.metalness = 0.8;
                    }
                }
            });
            
            setModel(clonedScene);
        }
    }, [scene, pendantPath]);
    
    // Rotate the model slightly for better visibility
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
        }
    });
    
    // Update light intensity based on scroll progress
    useEffect(() => {
        if (pointLightRef.current) {
            // Increase light intensity as user scrolls
            const lightIntensity = Math.max(0, Math.min(scrollProgress * 10, 5));
            pointLightRef.current.intensity = lightIntensity;
        }
    }, [scrollProgress]);
    
    return (
        <group position={position} ref={groupRef}>
            {model && (
                <primitive 
                    object={model} 
                    scale={[15, 15, 15]}
                    position={[0, 0, 0]}
                    rotation={[0, Math.PI / 4, 0]} // 45-degree rotation for better visibility
                />
            )}
            
            {/* Add multiple lights for better illumination */}
            <ambientLight intensity={1.5} />
            
            <pointLight
                ref={pointLightRef}
                color="#ffffff" 
                intensity={5}
                distance={50}
                decay={2}
                position={[10, 10, 10]}
            />
            
            <pointLight
                color="#f0f0ff" 
                intensity={3}
                distance={30}
                decay={2}
                position={[-10, 5, -10]}
            />
            
            {/* Add a sphere to help visualize position */}
            <mesh position={[0, -10, 0]} visible={false}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </group>
    );
};

export default PendantModel;
