'use client';

import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';

const RoomModel = forwardRef((props, ref) => {
  const localRef = useRef();
  const { scene } = useGLTF("/models/pendant1.glb");
  const [lampMaterial, setLampMaterial] = useState(null);
  const [pendantMaterial, setPendantMaterial] = useState(null);

  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        if (node.material.name === "Leather_Fabric_01") {
          setLampMaterial(node.material);
          // Set initial warm orange color for lamp
          node.material.color = new THREE.Color("#FF8C42");
          node.material.emissive = new THREE.Color("#FF8C42");
          node.material.emissiveIntensity = 0;
        } else if (node.material.name === "Leather_Fabric_01.002") {
          setPendantMaterial(node.material);
          // Set initial warm white color for pendant
          node.material.color = new THREE.Color("#FFE5CC");
          node.material.emissive = new THREE.Color("#FFE5CC");
          node.material.emissiveIntensity = 0;
        }
      }
    });

    // Call onLoad callback when model is ready
    if (props.onLoad) {
      props.onLoad();
    }
  }, [scene, props.onLoad]);

  useImperativeHandle(ref, () => ({
    toggleLamp: (intensity) => {
      if (lampMaterial) {
        lampMaterial.emissiveIntensity = intensity;
      }
    },
    togglePendant: (intensity) => {
      if (pendantMaterial) {
        pendantMaterial.emissiveIntensity = intensity;
      }
    }
  }));

  useEffect(() => {
    if (localRef.current && scene) {
      const initialTransforms = new Map();
      
      scene.traverse((object) => {
        if (object.isMesh) {
          initialTransforms.set(object.uuid, {
            position: object.position.clone(),
            rotation: object.rotation.clone(),
            scale: object.scale.clone()
          });
        }
      });

      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.set(-center.x, -center.y, -center.z);
      
      const resetTransforms = () => {
        scene.traverse((object) => {
          if (object.isMesh) {
            const initial = initialTransforms.get(object.uuid);
            if (initial) {
              object.position.copy(initial.position);
              object.rotation.copy(initial.rotation);
              object.scale.copy(initial.scale);
            }
          }
        });
      };

      const onFrame = () => {
        resetTransforms();
        requestAnimationFrame(onFrame);
      };
      requestAnimationFrame(onFrame);

      return () => {
        scene.traverse((object) => {
          if (object.isMesh) {
            object.geometry.dispose();
            if (object.material?.dispose) {
              object.material.dispose();
            }
          }
        });
      };
    }
  }, [scene]);

  return (
    <primitive 
      ref={localRef}
      object={scene}
      scale={1}
      position={[0, -1, 0]}
      rotation={[0, 0, 0]}
      {...props}
    />
  );
});

RoomModel.displayName = 'RoomModel';
export default RoomModel;
