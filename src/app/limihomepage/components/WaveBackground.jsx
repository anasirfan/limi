"use client";

import { useEffect, useRef } from "react";

const WaveBackground = () => {
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const amplitude = 80;
      const frequency = 0.01;
      const speed = 0.05;

      // Draw multiple wave layers
      for (let layer = 0; layer < 5; layer++) {
        ctx.beginPath();
        
        const layerOffset = layer * 20;
        const layerAmplitude = amplitude - layer * 15;
        const layerAlpha = 0.8 - layer * 0.15;
        
        ctx.strokeStyle = `rgba(80, 200, 120, ${layerAlpha})`;
        ctx.lineWidth = 3 - layer * 0.4;

        for (let x = 0; x <= canvas.width; x += 2) {
          const y = centerY + layerOffset + 
            Math.sin(x * frequency + time * speed + layer * 0.5) * layerAmplitude +
            Math.sin(x * frequency * 2 + time * speed * 1.5 + layer) * (layerAmplitude * 0.3);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();

        // Add filled wave for bottom layers
        if (layer >= 2) {
          ctx.fillStyle = `rgba(80, 200, 120, ${layerAlpha * 0.1})`;
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Add floating orbs that follow wave motion
      for (let i = 0; i < 8; i++) {
        const x = (i / 7) * canvas.width;
        const waveY = centerY + Math.sin(x * frequency + time * speed) * amplitude;
        const orbY = waveY - 50 + Math.sin(time * 0.02 + i) * 20;
        
        const gradient = ctx.createRadialGradient(x, orbY, 0, x, orbY, 15);
        gradient.addColorStop(0, "rgba(135, 207, 171, 0.8)");
        gradient.addColorStop(1, "rgba(135, 207, 171, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, orbY, 15, 0, Math.PI * 2);
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
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #1a2a1a 50%, #0a0a0a 100%)" }}
    />
  );
};

export default WaveBackground;
