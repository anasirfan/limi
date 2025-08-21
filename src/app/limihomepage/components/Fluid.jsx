"use client";
"use client";
import { useEffect, useRef } from "react";

export default function FluidAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    import("./fluid-sim").then(({ default: startSimulation }) => {
      startSimulation(canvasRef.current);
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="fluid-canvas"
      className="w-full h-screen"
    />
  );
}

