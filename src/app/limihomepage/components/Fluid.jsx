"use client";
import { useEffect, useRef } from "react";
import { WebGLFluid } from "webgl-fluid";

export default function Fluid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    WebGLFluid(canvasRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-screen" />;
}
