"use client";
import { useRef, useEffect } from "react";

const AmbientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Create gradient blobs
    const blobs = [];
    for (let i = 0; i < 5; i++) {
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 100,
        xSpeed: Math.random() * 0.2 - 0.1,
        ySpeed: Math.random() * 0.2 - 0.1,
        hue: Math.random() * 30 + 120, // Green hues
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw blobs
      blobs.forEach(blob => {
        // Move blob
        blob.x += blob.xSpeed;
        blob.y += blob.ySpeed;
        
        // Bounce off edges
        if (blob.x < 0 || blob.x > canvas.width) blob.xSpeed *= -1;
        if (blob.y < 0 || blob.y > canvas.height) blob.ySpeed *= -1;
        
        // Draw gradient blob
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, `hsla(${blob.hue}, 70%, 50%, 0.05)`);
        gradient.addColorStop(1, `hsla(${blob.hue}, 70%, 50%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default AmbientBackground;
