import React, { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-[#50C878]/20 border-t-[#50C878] rounded-full animate-spin"></div>
        <div className="text-white text-lg font-medium">Loading Model...</div>
        <div className="text-[#50C878] text-sm">{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
}

// GLTF Model component
function GLTFModel({ url, autoRotate, ...props }) {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, url);

  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  React.useEffect(() => {
    if (gltf && modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      if (size > 0) {
        const scale = 2 / size;
        modelRef.current.scale.setScalar(scale);
        modelRef.current.position.copy(center).multiplyScalar(-scale);
      }
    }
  }, [gltf]);

  return <primitive ref={modelRef} object={gltf.scene} {...props} />;
}

// OBJ Model component
function OBJModel({ url, autoRotate, ...props }) {
  const modelRef = useRef();
  const obj = useLoader(OBJLoader, url);

  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  React.useEffect(() => {
    if (obj && modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      if (size > 0) {
        const scale = 2 / size;
        modelRef.current.scale.setScalar(scale);
        modelRef.current.position.copy(center).multiplyScalar(-scale);
      }
    }
  }, [obj]);

  return <primitive ref={modelRef} object={obj} {...props} />;
}

// FBX Model component
function FBXModel({ url, autoRotate, ...props }) {
  const modelRef = useRef();
  const fbx = useLoader(FBXLoader, url);

  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  React.useEffect(() => {
    if (fbx && modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      if (size > 0) {
        const scale = 2 / size;
        modelRef.current.scale.setScalar(scale);
        modelRef.current.position.copy(center).multiplyScalar(-scale);
      }
    }
  }, [fbx]);

  return <primitive ref={modelRef} object={fbx} {...props} />;
}

// Model component that handles different file formats
function Model({ url, autoRotate = true, ...props }) {
  const fileExtension = useMemo(() => {
    return url.split('.').pop().toLowerCase();
  }, [url]);

  if (fileExtension === 'gltf' || fileExtension === 'glb') {
    return <GLTFModel url={url} autoRotate={autoRotate} {...props} />;
  } else if (fileExtension === 'obj') {
    return <OBJModel url={url} autoRotate={autoRotate} {...props} />;
  } else if (fileExtension === 'fbx') {
    return <FBXModel url={url} autoRotate={autoRotate} {...props} />;
  } else {
    return (
      <Html center>
        <div className="text-red-400 text-center p-4">
          <div className="text-lg font-medium mb-2">Error Loading Model</div>
          <div className="text-sm">Unsupported file format: {fileExtension}</div>
        </div>
      </Html>
    );
  }
}

// Main 3D Model Viewer Component
const ModelViewer3D = ({ modelUrl, isOpen, onClose, modelName = "3D Model" }) => {
  const [autoRotate, setAutoRotate] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-4 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl overflow-hidden border border-gray-700/50">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-[#50C878]/10 to-[#87CEAB]/10 backdrop-blur-sm border-b border-gray-700/50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#50C878]/20 to-[#50C878]/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#50C878]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{modelName}</h3>
                <p className="text-sm text-gray-400">3D Model Viewer</p>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  autoRotate
                    ? 'bg-[#50C878]/20 text-[#50C878] border border-[#50C878]/30'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                }`}
              >
                Auto Rotate
              </button>
              
              <button
                onClick={onClose}
                className="w-10 h-10 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="w-full h-full pt-20">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}
          >
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <Suspense fallback={<Loader />}>
              <Model url={modelUrl} autoRotate={autoRotate} />
              <ContactShadows 
                rotation-x={Math.PI / 2} 
                position={[0, -2, 0]} 
                opacity={0.4} 
                width={10} 
                height={10} 
                blur={1} 
                far={4} 
              />
              <Environment preset="studio" />
            </Suspense>
            
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={autoRotate}
              autoRotateSpeed={2}
              minDistance={1}
              maxDistance={10}
            />
          </Canvas>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#50C878]/20 rounded border border-[#50C878]/30 flex items-center justify-center">
                <svg className="w-2 h-2 text-[#50C878]" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <span>Click & Drag to Rotate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#87CEAB]/20 rounded border border-[#87CEAB]/30 flex items-center justify-center">
                <svg className="w-2 h-2 text-[#87CEAB]" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <span>Scroll to Zoom</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500/20 rounded border border-yellow-500/30 flex items-center justify-center">
                <svg className="w-2 h-2 text-yellow-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <span>Right Click & Drag to Pan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer3D;
