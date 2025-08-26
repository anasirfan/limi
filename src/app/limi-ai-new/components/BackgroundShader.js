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

    // Create gradient based on background type
    const createGradient = (ctx, type, colors, time) => {
      const width = canvas.width;
      const height = canvas.height;

      switch (type) {
        case 'noise':
          return createNoisePattern(ctx, colors, time, width, height);
        case 'torn':
          return createTornPaper(ctx, colors, time, width, height);
        case 'mesh':
          return createMeshGradient(ctx, colors, time, width, height);
        case 'liquid':
          return createLiquidMetal(ctx, colors, time, width, height);
        case 'fold':
          return createOrigamiFolds(ctx, colors, time, width, height);
        case 'grain':
          return createGrainTexture(ctx, colors, time, width, height);
        case 'crumple':
          return createCrumpledPaper(ctx, colors, time, width, height);
        case 'voronoi':
          return createVoronoiNoise(ctx, colors, time, width, height);
        case 'particles':
          return createFloatingParticles(ctx, colors, time, width, height);
        case 'auroraFluid':
          return createAuroraFluidGlow(ctx, colors, time, width, height);
        case 'auroraCrimson':
          return createAuroraCrimsonGlow(ctx, colors, time, width, height);
        case 'auroraPurple':
          return createAuroraPurpleStorm(ctx, colors, time, width, height);
        case 'auroraGolden':
          return createAuroraGoldenWaves(ctx, colors, time, width, height);
        case 'auroraIce':
          return createAuroraIceBlue(ctx, colors, time, width, height);
        case 'auroraRainbow':
          return createAuroraRainbowSpectrum(ctx, colors, time, width, height);
        default:
          return createDefaultGradient(ctx, colors, width, height);
      }
    };

    // Background pattern functions
    const createNoisePattern = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Base gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.5, colors[1]);
      gradient.addColorStop(1, colors[2]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add noise waves
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % width;
        const y = Math.floor((i / 4) / width);
        
        const noise = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time) * intensity * 50;
        
        data[i] += noise;     // Red
        data[i + 1] += noise; // Green
        data[i + 2] += noise; // Blue
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    const createTornPaper = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Create torn edges
      ctx.beginPath();
      ctx.moveTo(0, height * 0.3);
      
      for (let x = 0; x < width; x += 20) {
        const waveHeight = Math.sin(x * 0.01 + time) * intensity * 30;
        ctx.lineTo(x, height * 0.3 + waveHeight);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      ctx.fillStyle = colors[2];
      ctx.fill();
    };

    const createMeshGradient = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Multiple overlapping gradients
      for (let i = 0; i < 3; i++) {
        const offsetX = Math.sin(time + i) * intensity * 100;
        const offsetY = Math.cos(time + i) * intensity * 100;
        
        const gradient = ctx.createRadialGradient(
          width * 0.5 + offsetX, height * 0.5 + offsetY, 0,
          width * 0.5 + offsetX, height * 0.5 + offsetY, Math.max(width, height) * 0.8
        );
        
        gradient.addColorStop(0, colors[i] + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const createLiquidMetal = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Base metallic gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.5, colors[1]);
      gradient.addColorStop(1, colors[2]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Liquid highlights
      for (let i = 0; i < 5; i++) {
        const x = (Math.sin(time + i) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.7 + i) * 0.5 + 0.5) * height;
        
        const highlight = ctx.createRadialGradient(x, y, 0, x, y, 100 * intensity);
        highlight.addColorStop(0, colors[1] + '60');
        highlight.addColorStop(1, 'transparent');
        
        ctx.fillStyle = highlight;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const createOrigamiFolds = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Origami fold lines
      ctx.strokeStyle = colors[2] + '40';
      ctx.lineWidth = 2;
      
      const foldCount = 8;
      for (let i = 0; i < foldCount; i++) {
        const angle = (i / foldCount) * Math.PI * 2 + time * speed;
        const foldIntensity = Math.sin(time + i) * intensity;
        
        ctx.beginPath();
        ctx.moveTo(width * 0.5, height * 0.5);
        ctx.lineTo(
          width * 0.5 + Math.cos(angle) * 200 * foldIntensity,
          height * 0.5 + Math.sin(angle) * 200 * foldIntensity
        );
        ctx.stroke();
      }
    };

    const createGrainTexture = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add grain
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * intensity * 30;
        data[i] += grain;
        data[i + 1] += grain;
        data[i + 2] += grain;
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Spotlight effect
      const spotX = (Math.sin(time * speed) * 0.5 + 0.5) * width;
      const spotY = (Math.cos(time * speed * 0.7) * 0.5 + 0.5) * height;
      
      const spotlight = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 300);
      spotlight.addColorStop(0, colors[2] + '30');
      spotlight.addColorStop(1, 'transparent');
      
      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, width, height);
    };

    const createCrumpledPaper = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      const breathe = Math.sin(time * speed) * intensity * 0.1 + 1;
      
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.7 * breathe
      );
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.7, colors[1]);
      gradient.addColorStop(1, colors[2]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const createVoronoiNoise = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Voronoi-like cells
      const cellCount = 20;
      for (let i = 0; i < cellCount; i++) {
        const x = (Math.sin(time + i) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.8 + i) * 0.5 + 0.5) * height;
        const size = Math.max(5, Math.sin(time + i) * intensity * 50 + 30);
        
        const cellGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        cellGradient.addColorStop(0, colors[2] + '20');
        cellGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = cellGradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const createFloatingParticles = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Floating particles
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.sin(time * speed + i) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * speed * 0.7 + i) * 0.5 + 0.5) * height;
        const size = Math.max(0.5, Math.sin(time + i) * intensity * 5 + 3);
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors[2] + '60';
        ctx.fill();
      }
    };

    const createHandmadePaper = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[1]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Swirl patterns
      const swirlCount = 5;
      for (let i = 0; i < swirlCount; i++) {
        const centerX = (Math.sin(time + i) * 0.3 + 0.5) * width;
        const centerY = (Math.cos(time * 0.8 + i) * 0.3 + 0.5) * height;
        
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
          const radius = angle * 10 * intensity;
          const x = centerX + Math.cos(angle + time) * radius;
          const y = centerY + Math.sin(angle + time) * radius;
          
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.strokeStyle = colors[2] + '30';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const createDefaultGradient = (ctx, colors, width, height) => {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.5, colors[1]);
      gradient.addColorStop(1, colors[2]);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    // New Fluid Shader Functions
    const createLiquidInkFlow = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Base dark background
      ctx.fillStyle = colors[2];
      ctx.fillRect(0, 0, width, height);
      
      // Create flowing ink patterns
      for (let i = 0; i < 8; i++) {
        const phase = time + i * 0.5;
        const x = width * 0.5 + Math.sin(phase * 0.3) * width * 0.3;
        const y = height * 0.5 + Math.cos(phase * 0.2) * height * 0.3;
        
        // Create marbling effect
        const flowX = Math.sin(phase) * 200;
        const flowY = Math.cos(phase * 0.7) * 150;
        
        const gradient = ctx.createRadialGradient(
          x + flowX, y + flowY, 0,
          x + flowX, y + flowY, 300 + Math.sin(phase) * 100
        );
        
        gradient.addColorStop(0, colors[0] + '80');
        gradient.addColorStop(0.3, colors[1] + '60');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
      
      // Add grain texture overlay
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * 20;
        data[i] += grain;
        data[i + 1] += grain;
        data[i + 2] += grain;
      }
      
      ctx.putImageData(imageData, 0, 0);
    };


    const createNeuroPlasmaFluid = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Black base
      ctx.fillStyle = colors[0];
      ctx.fillRect(0, 0, width, height);
      
      // Neural network-like veins
      const nodeCount = 15;
      const nodes = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: (Math.sin(time + i) * 0.4 + 0.5) * width,
          y: (Math.cos(time * 0.7 + i) * 0.4 + 0.5) * height,
          energy: Math.sin(time + i * 0.5) * 0.5 + 0.5
        });
      }
      
      // Draw connections between nodes
      ctx.strokeStyle = colors[1] + '40';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.sqrt(
            Math.pow(nodes[i].x - nodes[j].x, 2) + 
            Math.pow(nodes[i].y - nodes[j].y, 2)
          );
          
          if (dist < 200) {
            const opacity = (200 - dist) / 200;
            ctx.strokeStyle = colors[1] + Math.floor(opacity * 100).toString(16);
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw glowing nodes
      nodes.forEach(node => {
        const glowSize = 30 + node.energy * 50;
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowSize
        );
        
        gradient.addColorStop(0, colors[2] + 'FF');
        gradient.addColorStop(0.5, colors[1] + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });
    };

    const createOilWaterSwirls = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Paper-white base
      ctx.fillStyle = colors[0];
      ctx.fillRect(0, 0, width, height);
      
      // Oil droplets
      const dropletCount = 12;
      for (let i = 0; i < dropletCount; i++) {
        const phase = time + i * 0.8;
        const x = (Math.sin(phase * 0.3) * 0.4 + 0.5) * width;
        const y = (Math.cos(phase * 0.2) * 0.4 + 0.5) * height;
        const size = 50 + Math.sin(phase) * 30;
        
        // Create organic droplet shape
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const radius = Math.max(1, size + Math.sin(angle * 3 + phase) * 15);
          const px = x + Math.cos(angle) * radius;
          const py = y + Math.sin(angle) * radius;
          
          if (angle === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 1.5);
        gradient.addColorStop(0, colors[1] + '80');
        gradient.addColorStop(0.7, colors[2] + '60');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Add surface tension effects
      ctx.strokeStyle = colors[2] + '40';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = 20 + Math.random() * 40;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const createGlassyLiquidWaves = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Base glass-like gradient
      const baseGradient = ctx.createLinearGradient(0, 0, width, height);
      baseGradient.addColorStop(0, colors[2] + '40');
      baseGradient.addColorStop(0.5, colors[0] + '60');
      baseGradient.addColorStop(1, colors[1] + '40');
      
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Ripple waves
      const waveCount = 8;
      for (let i = 0; i < waveCount; i++) {
        const phase = time + i * 0.7;
        const centerX = width * 0.5 + Math.sin(phase * 0.3) * width * 0.2;
        const centerY = height * 0.5 + Math.cos(phase * 0.2) * height * 0.2;
        
        for (let ring = 1; ring <= 5; ring++) {
          const radius = ring * 60 + Math.sin(phase) * 20;
          const opacity = Math.max(0, 1 - ring * 0.2);
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = colors[0] + Math.floor(opacity * 100).toString(16);
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
      
      // Refraction effects
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
          const distortion = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time) * 2;
          const sourceX = Math.max(0, Math.min(width - 1, x + distortion));
          const sourceY = Math.max(0, Math.min(height - 1, y + distortion));
          
          const sourceIndex = (Math.floor(sourceY) * width + Math.floor(sourceX)) * 4;
          const targetIndex = (y * width + x) * 4;
          
          if (sourceIndex >= 0 && sourceIndex < data.length && targetIndex >= 0 && targetIndex < data.length) {
            data[targetIndex] = data[sourceIndex];
            data[targetIndex + 1] = data[sourceIndex + 1];
            data[targetIndex + 2] = data[sourceIndex + 2];
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    const createCosmicFluidStorm = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark cosmic base
      ctx.fillStyle = colors[0];
      ctx.fillRect(0, 0, width, height);
      
      // Vortex center
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      
      // Spiral arms
      const armCount = 6;
      for (let arm = 0; arm < armCount; arm++) {
        const armAngle = (arm / armCount) * Math.PI * 2 + time * 0.2;
        
        ctx.beginPath();
        for (let r = 10; r < Math.max(width, height); r += 5) {
          const spiralAngle = armAngle + r * 0.01;
          const x = centerX + Math.cos(spiralAngle) * r;
          const y = centerY + Math.sin(spiralAngle) * r;
          
          if (r === 10) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        const gradient = ctx.createLinearGradient(centerX, centerY, centerX + 200, centerY + 200);
        gradient.addColorStop(0, colors[1] + 'FF');
        gradient.addColorStop(0.5, colors[2] + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      
      // Plasma clouds
      for (let i = 0; i < 15; i++) {
        const cloudPhase = time + i * 0.3;
        const x = centerX + Math.sin(cloudPhase) * (100 + i * 20);
        const y = centerY + Math.cos(cloudPhase) * (100 + i * 20);
        const size = Math.max(10, 40 + Math.sin(cloudPhase * 2) * 20);
        
        const cloudGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        cloudGradient.addColorStop(0, colors[1] + '60');
        cloudGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = cloudGradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const createInkSplatterFluid = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Paper base
      ctx.fillStyle = colors[0];
      ctx.fillRect(0, 0, width, height);
      
      // Ink splatters
      const splatterCount = 8;
      for (let i = 0; i < splatterCount; i++) {
        const phase = time + i * 1.5;
        const x = (Math.sin(phase * 0.2) * 0.4 + 0.5) * width;
        const y = (Math.cos(phase * 0.15) * 0.4 + 0.5) * height;
        const expansion = Math.sin(phase) * 0.5 + 0.5;
        
        // Main splatter blob
        const mainSize = 60 + expansion * 40;
        ctx.beginPath();
        ctx.arc(x, y, mainSize, 0, Math.PI * 2);
        ctx.fillStyle = colors[1] + '80';
        ctx.fill();
        
        // Splatter tendrils
        const tendrilCount = 8;
        for (let t = 0; t < tendrilCount; t++) {
          const tendrilAngle = (t / tendrilCount) * Math.PI * 2;
          const tendrilLength = 30 + expansion * 50;
          const endX = x + Math.cos(tendrilAngle) * tendrilLength;
          const endY = y + Math.sin(tendrilAngle) * tendrilLength;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = colors[2] + '60';
          ctx.lineWidth = 5 + expansion * 10;
          ctx.stroke();
          
          // Tendril end blob
          ctx.beginPath();
          ctx.arc(endX, endY, 5 + expansion * 10, 0, Math.PI * 2);
          ctx.fillStyle = colors[2] + '70';
          ctx.fill();
        }
      }
      
      // Diffusion effect
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 16) {
        const blur = Math.sin(time + i * 0.001) * 10;
        if (Math.random() < 0.1) {
          data[i] += blur;
          data[i + 1] += blur;
          data[i + 2] += blur;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    const createSubsurfaceFluidGlow = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Subsurface glow blobs
      const blobCount = 6;
      for (let i = 0; i < blobCount; i++) {
        const phase = time + i * 0.8;
        const x = (Math.sin(phase * 0.2) * 0.3 + 0.5) * width;
        const y = (Math.cos(phase * 0.15) * 0.3 + 0.5) * height;
        const size = Math.max(20, 80 + Math.sin(phase) * 40);
        const intensity = Math.sin(phase * 2) * 0.3 + 0.7;
        
        // Multiple glow layers for depth
        for (let layer = 3; layer >= 0; layer--) {
          const layerSize = size + layer * 30;
          const layerOpacity = (1 - layer * 0.2) * intensity;
          
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, layerSize);
          gradient.addColorStop(0, colors[i % 3] + Math.floor(layerOpacity * 255).toString(16));
          gradient.addColorStop(0.5, colors[(i + 1) % 3] + Math.floor(layerOpacity * 128).toString(16));
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);
        }
      }
      
      // Flowing connections
      ctx.strokeStyle = colors[0] + '30';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < blobCount - 1; i++) {
        const phase1 = time + i * 0.8;
        const phase2 = time + (i + 1) * 0.8;
        
        const x1 = (Math.sin(phase1 * 0.2) * 0.3 + 0.5) * width;
        const y1 = (Math.cos(phase1 * 0.15) * 0.3 + 0.5) * height;
        const x2 = (Math.sin(phase2 * 0.2) * 0.3 + 0.5) * width;
        const y2 = (Math.cos(phase2 * 0.15) * 0.3 + 0.5) * height;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(
          x1 + 50, y1 - 50,
          x2 - 50, y2 + 50,
          x2, y2
        );
        ctx.stroke();
      }
    };

    const createVortexFluidPull = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark base
      ctx.fillStyle = colors[2];
      ctx.fillRect(0, 0, width, height);
      
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      
      // Vortex spiral
      const particleCount = 200;
      for (let i = 0; i < particleCount; i++) {
        const particlePhase = time + i * 0.1;
        const radius = (i / particleCount) * Math.max(width, height) * 0.6;
        const angle = particlePhase * 2 + radius * 0.02;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const size = 3 + (1 - i / particleCount) * 8;
        const opacity = 1 - (i / particleCount);
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors[0] + Math.floor(opacity * 255).toString(16);
        ctx.fill();
      }
      
      // Turbulence streams
      for (let stream = 0; stream < 5; stream++) {
        const streamAngle = (stream / 5) * Math.PI * 2 + time * 0.1;
        
        ctx.beginPath();
        for (let r = 50; r < 300; r += 10) {
          const spiralAngle = streamAngle + r * 0.05 + Math.sin(time + stream) * 0.5;
          const x = centerX + Math.cos(spiralAngle) * r;
          const y = centerY + Math.sin(spiralAngle) * r;
          
          if (r === 50) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.strokeStyle = colors[1] + '60';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      
      // Central vortex glow
      const vortexGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
      vortexGradient.addColorStop(0, colors[0] + 'FF');
      vortexGradient.addColorStop(0.5, colors[1] + '80');
      vortexGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = vortexGradient;
      ctx.fillRect(0, 0, width, height);
    };

    const createDynamicSmokeFluid = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark space base
      ctx.fillStyle = colors[0];
      ctx.fillRect(0, 0, width, height);
      
      // Smoke clouds
      const cloudCount = 12;
      for (let i = 0; i < cloudCount; i++) {
        const phase = time + i * 0.5;
        const x = (Math.sin(phase * 0.1) * 0.4 + 0.5) * width;
        const y = (Math.cos(phase * 0.08) * 0.4 + 0.5) * height + Math.sin(phase) * 50;
        
        // Multiple cloud layers for depth
        for (let layer = 0; layer < 4; layer++) {
          const layerPhase = phase + layer * 0.2;
          const layerX = x + Math.sin(layerPhase) * 30;
          const layerY = y + Math.cos(layerPhase) * 20;
          const size = Math.max(10, 60 + layer * 20 + Math.sin(layerPhase * 2) * 15);
          const opacity = (4 - layer) / 4 * 0.6;
          
          // Organic cloud shape
          ctx.beginPath();
          for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
            const radius = Math.max(1, size + Math.sin(angle * 3 + layerPhase) * 20);
            const px = layerX + Math.cos(angle) * radius;
            const py = layerY + Math.sin(angle) * radius;
            
            if (angle === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.closePath();
          
          const gradient = ctx.createRadialGradient(layerX, layerY, 0, layerX, layerY, size * 1.5);
          gradient.addColorStop(0, colors[1] + Math.floor(opacity * 255).toString(16));
          gradient.addColorStop(0.6, colors[2] + Math.floor(opacity * 128).toString(16));
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
      
      // Flowing wisps
      for (let wisp = 0; wisp < 20; wisp++) {
        const wispPhase = time + wisp * 0.3;
        const startX = Math.random() * width;
        const startY = height + 50;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        for (let segment = 0; segment < 10; segment++) {
          const segmentY = startY - segment * 30 - Math.sin(wispPhase) * segment * 5;
          const segmentX = startX + Math.sin(wispPhase + segment * 0.5) * 20;
          ctx.lineTo(segmentX, segmentY);
        }
        
        ctx.strokeStyle = colors[1] + '30';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    // New Aurora Variant Functions
    const createAuroraFluidGlow = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark space base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Mouse glow effect
      if (mouseInfluence > 0) {
        const glowRadius = 150 * mouseInfluence;
        const glowX = mouseX * width;
        const glowY = mouseY * height;
        
        const glowGradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
        glowGradient.addColorStop(0, colors[0] + Math.floor(40 * mouseInfluence).toString(16));
        glowGradient.addColorStop(0.5, colors[1] + Math.floor(20 * mouseInfluence).toString(16));
        glowGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, width, height);
      }
      
      // Aurora ribbons with flowing movement and distortion
      for (let i = 0; i < 6; i++) {
        const phase = time + i * 0.7;
        const ribbonHeight = 80 + Math.sin(phase) * 40;
        const baseY = height * (0.3 + i * 0.12) + Math.sin(phase * 0.5) * 100;
        
        // Create flowing ribbon path with distortion
        ctx.beginPath();
        let firstPoint = true;
        
        for (let x = 0; x <= width; x += 20) {
          const waveY = baseY + Math.sin(x * 0.01 + phase) * ribbonHeight;
          const distorted = applyMouseDistortion(ctx, x, waveY, time);
          
          if (firstPoint) {
            ctx.moveTo(distorted.x, distorted.y);
            firstPoint = false;
          } else {
            ctx.lineTo(distorted.x, distorted.y);
          }
        }
        
        // Close the ribbon shape
        const endDistorted = applyMouseDistortion(ctx, width, baseY + ribbonHeight, time);
        const startDistorted = applyMouseDistortion(ctx, 0, baseY + ribbonHeight, time);
        ctx.lineTo(endDistorted.x, endDistorted.y);
        ctx.lineTo(startDistorted.x, startDistorted.y);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, baseY - ribbonHeight, 0, baseY + ribbonHeight);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, colors[i % 3] + '80');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Floating energy particles with distortion
      for (let p = 0; p < 25; p++) {
        const particlePhase = time + p * 0.3;
        const baseX = (Math.sin(particlePhase * 0.4) * 0.8 + 0.5) * width;
        const baseY = (Math.cos(particlePhase * 0.3) * 0.6 + 0.4) * height;
        const size = Math.abs(Math.sin(particlePhase * 2)) * 4 + 2;
        
        const distorted = applyMouseDistortion(ctx, baseX, baseY, time);
        
        ctx.beginPath();
        ctx.arc(distorted.x, distorted.y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors[2] + '60';
        ctx.fill();
        
        // Add subtle glow around particles near mouse
        const distanceToMouse = Math.sqrt(
          Math.pow(distorted.x - mouseX * width, 2) + 
          Math.pow(distorted.y - mouseY * height, 2)
        );
        
        if (distanceToMouse < 100 && mouseInfluence > 0) {
          const glowIntensity = (1 - distanceToMouse / 100) * mouseInfluence;
          ctx.beginPath();
          ctx.arc(distorted.x, distorted.y, size * 2, 0, Math.PI * 2);
          ctx.fillStyle = colors[0] + Math.floor(30 * glowIntensity).toString(16);
          ctx.fill();
        }
      }
    };

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
        const size = Math.max(0.5, Math.sin(phase * 2) * 3 + 2); // Ensure minimum size
        const glowIntensity = Math.sin(phase) * 0.5 + 0.5;
        
        const distorted = applyMouseDistortion(ctx, x, y, time);
        
        ctx.beginPath();
        ctx.arc(distorted.x, distorted.y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors[i % colors.length] + Math.floor(glowIntensity * 255).toString(16);
        ctx.fill();
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(distorted.x, distorted.y, Math.max(1, size * 2), 0, Math.PI * 2); // Ensure minimum glow size
        ctx.fillStyle = colors[i % colors.length] + Math.floor(30 * glowIntensity).toString(16);
        ctx.fill();
      }
    };

    const createAuroraPurpleStorm = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Electric purple storm ribbons with chaotic movement
      for (let i = 0; i < 8; i++) {
        const phase = time + i * 2.1;
        const ribbonHeight = 90 + Math.sin(phase * 1.8) * 70;
        const y = height * (0.1 + i * 0.11) + Math.sin(phase * 0.9) * 140;
        
        // Create electric storm path
        ctx.beginPath();
        ctx.moveTo(0, y);
        
        for (let x = 0; x <= width; x += 12) {
          const chaos = Math.sin(x * 0.02 + phase) * Math.cos(x * 0.015 + phase * 1.3);
          const waveY = y + chaos * ribbonHeight;
          ctx.lineTo(x, waveY);
        }
        
        ctx.lineTo(width, y + ribbonHeight);
        ctx.lineTo(0, y + ribbonHeight);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, y - ribbonHeight, 0, y + ribbonHeight);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.2, colors[0] + '60');
        gradient.addColorStop(0.5, colors[i % 3] + 'A0');
        gradient.addColorStop(0.8, colors[1] + '70');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Electric lightning effects
      for (let l = 0; l < 5; l++) {
        const lightningPhase = time + l * 3;
        const startX = (Math.sin(lightningPhase) * 0.6 + 0.5) * width;
        const startY = height * 0.2;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        let currentX = startX;
        let currentY = startY;
        
        for (let segment = 0; segment < 8; segment++) {
          currentX += (Math.random() - 0.5) * 60;
          currentY += height * 0.1 + Math.random() * 40;
          ctx.lineTo(currentX, currentY);
        }
        
        ctx.strokeStyle = colors[2] + 'C0';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const createAuroraGoldenWaves = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Golden wave ribbons with smooth, luxurious movement
      for (let i = 0; i < 6; i++) {
        const phase = time + i * 0.8;
        const ribbonHeight = 70 + Math.sin(phase * 0.8) * 40;
        const y = height * (0.25 + i * 0.15) + Math.sin(phase * 0.4) * 80;
        
        // Create smooth wave path
        ctx.beginPath();
        ctx.moveTo(0, y);
        
        for (let x = 0; x <= width; x += 25) {
          const smoothWave = Math.sin(x * 0.006 + phase * 0.5) * Math.cos(phase * 0.3);
          const waveY = y + smoothWave * ribbonHeight;
          ctx.lineTo(x, waveY);
        }
        
        ctx.lineTo(width, y + ribbonHeight);
        ctx.lineTo(0, y + ribbonHeight);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, y - ribbonHeight, 0, y + ribbonHeight);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.4, colors[0] + '50');
        gradient.addColorStop(0.5, colors[i % 3] + '90');
        gradient.addColorStop(0.6, colors[1] + '70');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Golden shimmer particles
      for (let s = 0; s < 40; s++) {
        const shimmerPhase = time + s * 0.15;
        const x = (Math.sin(shimmerPhase * 0.3) * 0.7 + 0.5) * width;
        const y = (Math.cos(shimmerPhase * 0.2) * 0.5 + 0.5) * height;
        const size = Math.abs(Math.sin(shimmerPhase * 4)) * 2 + 1;
        const opacity = Math.sin(shimmerPhase * 3) * 0.5 + 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors[2] + Math.floor(opacity * 255).toString(16);
        ctx.fill();
      }
    };

    const createAuroraIceBlue = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Ice blue ribbons with crystalline movement
      for (let i = 0; i < 6; i++) {
        const phase = time + i * 1.1;
        const ribbonHeight = 60 + Math.sin(phase * 0.6) * 30;
        const y = height * (0.2 + i * 0.14) + Math.sin(phase * 0.3) * 60;
        
        // Create crystalline wave path
        ctx.beginPath();
        ctx.moveTo(0, y);
        
        for (let x = 0; x <= width; x += 20) {
          const crystalWave = Math.sin(x * 0.01 + phase * 0.4) * Math.sin(phase * 0.6);
          const waveY = y + crystalWave * ribbonHeight;
          ctx.lineTo(x, waveY);
        }
        
        ctx.lineTo(width, y + ribbonHeight);
        ctx.lineTo(0, y + ribbonHeight);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, y - ribbonHeight, 0, y + ribbonHeight);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.3, colors[0] + '40');
        gradient.addColorStop(0.5, colors[i % 3] + '70');
        gradient.addColorStop(0.7, colors[1] + '50');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Ice crystal effects
      for (let c = 0; c < 25; c++) {
        const crystalPhase = time + c * 0.4;
        const x = (Math.sin(crystalPhase * 0.2) * 0.8 + 0.5) * width;
        const y = (Math.cos(crystalPhase * 0.15) * 0.6 + 0.4) * height;
        const size = Math.abs(Math.sin(crystalPhase)) * 4 + 2;
        
        // Draw crystal shape
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
          const px = x + Math.cos(angle) * size;
          const py = y + Math.sin(angle) * size;
          if (angle === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();
        
        ctx.fillStyle = colors[2] + '60';
        ctx.fill();
        ctx.strokeStyle = colors[0] + '80';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const createAuroraRainbowSpectrum = (ctx, colors, time, width, height) => {
      ctx.clearRect(0, 0, width, height);
      
      // Dark base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Rainbow spectrum ribbons
      for (let i = 0; i < 8; i++) {
        const phase = time + i * 1.3;
        const ribbonHeight = 80 + Math.sin(phase * 1.1) * 50;
        const y = height * (0.15 + i * 0.1) + Math.sin(phase * 0.5) * 100;
        
        // Create spectrum wave path
        ctx.beginPath();
        ctx.moveTo(0, y);
        
        for (let x = 0; x <= width; x += 18) {
          const spectrumWave = Math.sin(x * 0.008 + phase) * Math.cos(phase * 0.7);
          const waveY = y + spectrumWave * ribbonHeight;
          ctx.lineTo(x, waveY);
        }
        
        ctx.lineTo(width, y + ribbonHeight);
        ctx.lineTo(0, y + ribbonHeight);
        ctx.closePath();
        
        // Use different colors for each ribbon
        const colorIndex = i % colors.length;
        const nextColorIndex = (i + 1) % colors.length;
        
        const gradient = ctx.createLinearGradient(0, y - ribbonHeight, 0, y + ribbonHeight);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.3, colors[colorIndex] + '50');
        gradient.addColorStop(0.5, colors[colorIndex] + '90');
        gradient.addColorStop(0.7, colors[nextColorIndex] + '60');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Spectrum shimmer effect
      const spectrumShimmer = ctx.createLinearGradient(
        Math.sin(time * 0.5) * width, 0,
        Math.sin(time * 0.5) * width + 300, height
      );
      
      for (let s = 0; s < colors.length; s++) {
        spectrumShimmer.addColorStop(s / (colors.length - 1), colors[s] + '15');
      }
      
      ctx.fillStyle = spectrumShimmer;
      ctx.fillRect(0, 0, width, height);
      
      // Rainbow particles
      for (let p = 0; p < 35; p++) {
        const particlePhase = time + p * 0.25;
        const x = (Math.sin(particlePhase * 0.4) * 0.9 + 0.5) * width;
        const y = (Math.cos(particlePhase * 0.3) * 0.7 + 0.4) * height;
        const size = Math.abs(Math.sin(particlePhase * 2)) * 3 + 1;
        const colorIndex = Math.floor((Math.sin(particlePhase) * 0.5 + 0.5) * colors.length);
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors[colorIndex] + 'A0';
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
      
      createGradient(ctx, backgroundConfig.config.type, colors, time);
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
