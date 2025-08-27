'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BackgroundShader({ backgroundConfig }) {
  const canvasRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size to hero section dimensions
    const resizeCanvas = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        // Fallback to viewport height for hero section
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let time = 0;
    const { colors, animation, intensity, speed } = backgroundConfig.config;
    
    // Mouse distortion variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseInfluence = 0;
    let targetInfluence = 0;
    
    // Mouse event handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / canvas.width;
      targetMouseY = (e.clientY - rect.top) / canvas.height;
      targetInfluence = 1;
    };
    
    const handleMouseEnter = () => {
      targetInfluence = 1;
    };
    
    const handleMouseLeave = () => {
      targetInfluence = 0;
    };
    
    // Add mouse event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Mouse distortion function
    const applyMouseDistortion = (ctx, x, y, time) => {
      if (mouseInfluence <= 0) return { x, y };
      
      const distanceX = x - mouseX * canvas.width;
      const distanceY = y - mouseY * canvas.height;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const maxDistance = 200;
      
      if (distance < maxDistance) {
        const rippleStrength = (1 - distance / maxDistance) * mouseInfluence * 0.3;
        const ripplePhase = time * 3 - distance * 0.02;
        
        // Create ripple effect
        const ripple = Math.sin(ripplePhase) * rippleStrength;
        const dampening = Math.exp(-distance * 0.005);
        
        const offsetX = (distanceX / distance) * ripple * 15 * dampening;
        const offsetY = (distanceY / distance) * ripple * 15 * dampening;
        
        return {
          x: x + offsetX,
          y: y + offsetY
        };
      }
      
      return { x, y };
    };

    // Aurora Crimson Glow function
    const createAuroraCrimsonGlow = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Crimson aurora ribbons
      const ribbonCount = 6;
      for (let i = 0; i < ribbonCount; i++) {
        const phase = time + i * 0.8;
        const baseY = height * (0.3 + i * 0.1);
        
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const waveHeight = Math.sin(x * 0.01 + phase) * 80 + Math.cos(x * 0.005 + phase * 0.7) * 40;
          const y = baseY + waveHeight;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Create gradient for ribbon
        const gradient = ctx.createLinearGradient(0, baseY - 100, 0, baseY + 100);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, colors[i % colors.length] + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 15 + Math.sin(phase) * 5;
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowColor = colors[i % colors.length];
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      
      // Particle effects
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const phase = time + i * 0.1;
        const x = (Math.sin(phase * 0.5) * 0.4 + 0.5) * width;
        const y = (Math.cos(phase * 0.3) * 0.4 + 0.5) * height;
        const size = Math.max(0.5, Math.sin(phase * 2) * 3 + 2);
        const glowIntensity = Math.sin(phase) * 0.5 + 0.5;
        
        const distorted = applyMouseDistortion(ctx, x, y, time);
        
        ctx.beginPath();
        ctx.arc(distorted.x, distorted.y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors[i % colors.length] + Math.floor(glowIntensity * 255).toString(16);
        ctx.fill();
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(distorted.x, distorted.y, Math.max(1, size * 2), 0, Math.PI * 2);
        ctx.fillStyle = colors[i % colors.length] + Math.floor(30 * glowIntensity).toString(16);
        ctx.fill();
      }
    };

    // Animation loop
    const animate = () => {
      time += speed * 0.01;
      
      // Smooth mouse position interpolation
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      mouseInfluence += (targetInfluence - mouseInfluence) * 0.08;
      
      createAuroraCrimsonGlow(ctx, colors, time, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [backgroundConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}
