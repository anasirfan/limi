"use client";

import { useEffect, useRef } from "react";

const GradientMeshBackground = () => {
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

    class GradientBlob {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 200 + 100;
        this.color = {
          r: Math.floor(Math.random() * 100 + 50),
          g: Math.floor(Math.random() * 100 + 150),
          b: Math.floor(Math.random() * 100 + 80)
        };
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < -this.size || this.x > canvas.width + this.size) {
          this.vx *= -1;
        }
        if (this.y < -this.size || this.y > canvas.height + this.size) {
          this.vy *= -1;
        }

        // Keep within extended bounds
        this.x = Math.max(-this.size, Math.min(canvas.width + this.size, this.x));
        this.y = Math.max(-this.size, Math.min(canvas.height + this.size, this.y));
      }

      draw() {
        const pulse = Math.sin(time * this.pulseSpeed) * 0.3 + 0.7;
        const currentSize = this.size * pulse;

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentSize
        );

        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`);
        gradient.addColorStop(0.3, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.4)`);
        gradient.addColorStop(0.7, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.1)`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const blobs = [];
    for (let i = 0; i < 6; i++) {
      blobs.push(new GradientBlob());
    }

    const animate = () => {
      // Create a subtle dark gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, "#0a0a0a");
      bgGradient.addColorStop(0.5, "#1a1a1a");
      bgGradient.addColorStop(1, "#0a0a0a");
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set blend mode for interesting color mixing
      ctx.globalCompositeOperation = "screen";

      // Update and draw blobs
      blobs.forEach(blob => {
        blob.update();
        blob.draw();
      });

      // Reset blend mode
      ctx.globalCompositeOperation = "source-over";

      // Add mesh overlay
      ctx.strokeStyle = "rgba(80, 200, 120, 0.1)";
      ctx.lineWidth = 1;
      
      const meshSize = 80;
      for (let x = 0; x <= canvas.width; x += meshSize) {
        const waveOffset = Math.sin(time * 0.01 + x * 0.005) * 20;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + waveOffset, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y <= canvas.height; y += meshSize) {
        const waveOffset = Math.cos(time * 0.01 + y * 0.005) * 20;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y + waveOffset);
        ctx.stroke();
      }

      // Add floating light particles
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.003 + i * 0.5) * 0.4 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.004 + i * 0.7) * 0.4 + 0.5) * canvas.height;
        const size = 2 + Math.sin(time * 0.02 + i) * 1;
        
        ctx.fillStyle = `rgba(135, 207, 171, ${0.6 + Math.sin(time * 0.01 + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
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
    />
  );
};

export default GradientMeshBackground;
