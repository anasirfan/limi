"use client";

import { useEffect, useRef } from "react";

const GeometricBackground = () => {
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

    class GeometricShape {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.sides = Math.floor(Math.random() * 4) + 3; // 3-6 sides
        this.alpha = Math.random() * 0.5 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.rotation += this.rotationSpeed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const pulse = Math.sin(time * this.pulseSpeed) * 0.3 + 0.7;
        const currentSize = this.size * pulse;

        // Draw filled shape
        ctx.fillStyle = `rgba(80, 200, 120, ${this.alpha * 0.3})`;
        ctx.beginPath();
        for (let i = 0; i < this.sides; i++) {
          const angle = (i / this.sides) * Math.PI * 2;
          const x = Math.cos(angle) * currentSize;
          const y = Math.sin(angle) * currentSize;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        // Draw outline
        ctx.strokeStyle = `rgba(135, 207, 171, ${this.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }
    }

    const shapes = [];
    for (let i = 0; i < 15; i++) {
      shapes.push(new GeometricShape());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines between shapes
      ctx.strokeStyle = "rgba(80, 200, 120, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const alpha = (200 - distance) / 200;
            ctx.globalAlpha = alpha * 0.3;
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[j].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      // Update and draw shapes
      shapes.forEach(shape => {
        shape.update();
        shape.draw();
      });

      // Add floating triangular elements
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1);
        const y = canvas.height / 2 + Math.sin(time * 0.01 + i) * 100;
        const size = 20 + Math.sin(time * 0.015 + i) * 10;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(time * 0.005 + i);
        
        ctx.fillStyle = `rgba(135, 207, 171, 0.4)`;
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(-size * 0.866, size * 0.5);
        ctx.lineTo(size * 0.866, size * 0.5);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }

      time++;
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
      style={{ background: "radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)" }}
    />
  );
};

export default GeometricBackground;
