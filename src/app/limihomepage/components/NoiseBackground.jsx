"use client";

import { useEffect, useRef } from "react";

const NoiseBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Simple noise function
    const noise = (x, y, t) => {
      return Math.sin(x * 0.01 + t * 0.01) * 
             Math.cos(y * 0.01 + t * 0.015) * 
             Math.sin((x + y) * 0.005 + t * 0.008);
    };

    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      // Generate noise field
      for (let x = 0; x < canvas.width; x += 2) {
        for (let y = 0; y < canvas.height; y += 2) {
          const noiseValue = noise(x, y, time);
          const intensity = (noiseValue + 1) * 0.5; // Normalize to 0-1
          
          // Create color based on noise
          const r = Math.floor(80 * intensity);
          const g = Math.floor(200 * intensity);
          const b = Math.floor(120 * intensity);
          const a = Math.floor(255 * intensity * 0.3);

          const index = (y * canvas.width + x) * 4;
          if (index < data.length) {
            data[index] = r;     // Red
            data[index + 1] = g; // Green
            data[index + 2] = b; // Blue
            data[index + 3] = a; // Alpha
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Add flowing streams
      ctx.strokeStyle = "rgba(135, 207, 171, 0.4)";
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        const startX = (i / 7) * canvas.width;
        const startY = canvas.height * 0.2;
        
        let currentX = startX;
        let currentY = startY;
        
        ctx.moveTo(currentX, currentY);
        
        for (let step = 0; step < 100; step++) {
          const noiseX = noise(currentX, currentY, time + i * 10) * 3;
          const noiseY = noise(currentX + 100, currentY, time + i * 10) * 3;
          
          currentX += noiseX;
          currentY += 2 + noiseY;
          
          if (currentY > canvas.height) break;
          
          ctx.lineTo(currentX, currentY);
        }
        
        ctx.stroke();
      }

      // Add pulsing nodes
      for (let i = 0; i < 12; i++) {
        const x = (Math.sin(time * 0.005 + i) * 0.3 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.007 + i * 1.5) * 0.3 + 0.5) * canvas.height;
        const size = 5 + Math.sin(time * 0.02 + i) * 3;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
        gradient.addColorStop(0, "rgba(80, 200, 120, 0.8)");
        gradient.addColorStop(0.5, "rgba(135, 207, 171, 0.4)");
        gradient.addColorStop(1, "rgba(80, 200, 120, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(45deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)" }}
    />
  );
};

export default NoiseBackground;
