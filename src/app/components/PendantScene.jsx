'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import PendantModel from './PendantModel';

// Main component for 3D scene
const PendantScene = ({ scrollProgress }) => {
    const { gl } = useThree();
    
    // Make renderer background transparent
    useEffect(() => {
        gl.setClearColor(0x000000, 0);
    }, [gl]);
    
    return (
        <>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <PendantModel 
                position={[0, 0, 0]} 
                scrollProgress={scrollProgress} 
                pendantPath="/models/chandler.glb" 
            />
            <Environment preset="apartment" />
            <OrbitControls enableZoom={false} />
            
            {/* Add a grid helper to visualize the scene */}
            <gridHelper args={[20, 20, 0xff0000, 0x444444]} />
        </>
    );
};

export default PendantScene;