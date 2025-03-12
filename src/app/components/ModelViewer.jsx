"use client";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";

function Model({ src }) {
  const modelRef = useRef();
  const rotationStartRef = useRef(null);
  const { scene } = useGLTF(src);

  useEffect(() => {
    if (modelRef.current) {
      // Initial model position and scale
      modelRef.current.rotation.y = Math.PI / 4;
      modelRef.current.position.set(1.5, 2.5, 0);
      modelRef.current.scale.set(0, 0, 0);

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#mobile-container",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: (self) => {
            // console.log("Timeline Progress:", self.progress.toFixed(2));
          }
        },
      });

      tl.to(
        modelRef.current.position,
        {
          x: 1.5,
          y: -0.5,
          duration: 1,
          ease: "power1.inOut",
        }
      )
      .to(modelRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power1.inOut",
      }, "+=1")
      .to(
        modelRef.current.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: "power1.inOut",
        },
        "-=1"
      );

      // Listen for rotation event
      const handleRotation = () => {
        // Create a new timeline for the rotation
        const rotationTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#mobile-container",
            start: "center center",
            end: "+=100%",
            scrub: 1,
            onUpdate: (self) => {
              if (rotationStartRef.current === null) {
                rotationStartRef.current = modelRef.current.rotation.y;
              }
              // Calculate rotation based on scroll progress
              const targetRotation = rotationStartRef.current + (Math.PI * 2 * self.progress);
              modelRef.current.rotation.y = targetRotation;
            }
          }
        });
      };

      document.querySelector("#model-viewer")?.addEventListener("rotateModel", handleRotation);

      return () => {
        document.querySelector("#model-viewer")?.removeEventListener("rotateModel", handleRotation);
      };
    }
  }, []);

  return <primitive ref={modelRef} object={scene} />;
}

const ModelViewer = ({ src, className }) => {
  return (
    <Canvas
      style={{ background: "transparent" }}
      className={className}
      camera={{ position: [0, 0, 10], fov: 30 }}
      id="model-viewer"
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model src={src} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default ModelViewer;
