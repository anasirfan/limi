"use client";

import { useEffect, useRef } from "react";

const GridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = canvas.width / 2;
      targetMouseY = canvas.height / 2;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const gridSize = 50;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth mouse following
      const smoothing = 0.05;
      mouseX += smoothing * (targetMouseX - mouseX);
      mouseY += smoothing * (targetMouseY - mouseY);
      
      // Create animated grid with mouse influence
      ctx.strokeStyle = `rgba(80, 200, 120, ${0.3 + Math.sin(time * 0.01) * 0.2})`;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const mouseInfluence = Math.exp(-Math.abs(x - mouseX) / 200) * 20;
        const offset = Math.sin(time * 0.005 + x * 0.01) * 10 + mouseInfluence * Math.sin(time * 0.02);
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const mouseInfluence = Math.exp(-Math.abs(y - mouseY) / 200) * 20;
        const offset = Math.cos(time * 0.005 + y * 0.01) * 10 + mouseInfluence * Math.cos(time * 0.02);
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(canvas.width, y + offset);
        ctx.stroke();
      }

      // Add glowing intersections with mouse interaction
      ctx.fillStyle = `rgba(80, 200, 120, ${0.5 + Math.sin(time * 0.02) * 0.3})`;
      for (let x = 0; x <= canvas.width; x += gridSize * 2) {
        for (let y = 0; y <= canvas.height; y += gridSize * 2) {
          const distanceToMouse = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
          const mouseEffect = Math.exp(-distanceToMouse / 150) * 0.8;
          const pulse = Math.sin(time * 0.01 + (x + y) * 0.001) * 0.5 + 0.5;
          ctx.globalAlpha = (pulse * 0.6) + mouseEffect;
          ctx.beginPath();
          ctx.arc(x, y, 3 + mouseEffect * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}
    />
  );
};

export default GridBackground;
