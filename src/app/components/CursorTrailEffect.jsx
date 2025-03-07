'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * CursorTrailEffect - Creates a realistic smoke/paintbrush trail that follows the cursor
 * Uses canvas for optimal performance and supports various customization options
 */
const CursorTrailEffect = ({ 
  color = 'rgba(80, 200, 120, 0.8)', 
  particleCount = 10,
  particleLifespan = 2500, // milliseconds
  initialSize = 12,
  trailEnabled = true,
  blendMode = 'multiply',
  trailType = 'brush', 
  style = {}
}) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const prevMousePosition = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);
  const [isActive, setIsActive] = useState(trailEnabled);
  const [debugInfo, setDebugInfo] = useState({ 
    mouseX: 0, 
    mouseY: 0, 
    particleCount: 0,
    canvasWidth: 0,
    canvasHeight: 0
  });
  
  // Track mouse velocity
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const isMouseDown = useRef(false);

  useEffect(() => {
    console.log("🔍 CursorTrailEffect useEffect running");
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("❌ Canvas ref is null");
      return;
    }
    
    console.log("✅ Canvas initialized: ", { element: canvas });
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("❌ Could not get canvas context");
      return;
    }
    
    console.log("✅ Canvas context acquired");
    
    // Set canvas size to match window
    const resize = () => {
      if (!canvas) return;
      
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      console.log("🔄 Canvas resized:", {
        from: { width: oldWidth, height: oldHeight },
        to: { width: canvas.width, height: canvas.height }
      });
      
      setDebugInfo(prev => ({
        ...prev,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height
      }));
    };
    
    resize();
    window.addEventListener('resize', resize);
    console.log("✅ Resize listener added");

    // Track mouse movement
    const handleMouseMove = (e) => {
      prevMousePosition.current = { ...mousePosition.current };
      
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      
      console.log("🖱️ Mouse move detected", { 
        clientX: e.clientX, 
        clientY: e.clientY,
        rect: { 
          left: rect.left, 
          top: rect.top,
          width: rect.width,
          height: rect.height 
        },
        canvasPosition: { x: newX, y: newY } 
      });
      
      mousePosition.current = { x: newX, y: newY };
      
      // Calculate mouse velocity
      mouseVelocity.current = {
        x: mousePosition.current.x - prevMousePosition.current.x,
        y: mousePosition.current.y - prevMousePosition.current.y
      };
      
      const speed = Math.sqrt(
        mouseVelocity.current.x * mouseVelocity.current.x + 
        mouseVelocity.current.y * mouseVelocity.current.y
      );
      
      // Create particles when mouse moves based on speed
      if (isActive) {
        // Number of particles based on speed
        const numParticles = Math.min(Math.ceil(speed / 5), 10);
        console.log("🔥 Creating particles", { numParticles, speed });
        
        for (let i = 0; i < numParticles; i++) {
          // Interpolate position along the line from previous to current position
          const t = i / numParticles;
          const x = prevMousePosition.current.x + (mousePosition.current.x - prevMousePosition.current.x) * t;
          const y = prevMousePosition.current.y + (mousePosition.current.y - prevMousePosition.current.y) * t;
          
          createParticle(x, y, speed);
        }
      }
      
      setDebugInfo({
        mouseX: Math.round(mousePosition.current.x), 
        mouseY: Math.round(mousePosition.current.y),
        particleCount: particles.current.length,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height
      });
    };
    
    const handleMouseDown = () => {
      isMouseDown.current = true;
      console.log("👇 Mouse down");
    };
    
    const handleMouseUp = () => {
      isMouseDown.current = false;
      console.log("☝️ Mouse up");
    };

    // Add mouse event listeners
    console.log("🔄 Adding event listeners");
    canvas.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Animation function
    const animate = () => {
      if (!canvas) {
        console.error("❌ Canvas missing in animation loop");
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = blendMode;
      
      const now = Date.now();
      const remainingParticles = [];
      const initialParticleCount = particles.current.length;
      
      // Draw individual particles
      particles.current.forEach(p => {
        const age = now - p.createdAt;
        if (age < particleLifespan) {
          // Calculate fade based on age
          const lifeProgress = age / particleLifespan;
          const fadeRatio = trailType === 'smoke' 
            ? Math.pow(1 - lifeProgress, 1.5) // Smoke fades out more gradually
            : Math.pow(1 - lifeProgress, 2.5); // Paint fades quicker at the end
          
          const currentOpacity = p.initialOpacity * fadeRatio;
          
          // Size changes differently based on effect type
          let currentSize;
          if (trailType === 'smoke') {
            // Smoke grows slightly then shrinks
            const growFactor = lifeProgress < 0.3 ? 1 + lifeProgress : 1 - (lifeProgress - 0.3) * 1.2;
            currentSize = p.size * Math.max(0.2, growFactor);
          } else {
            // Paint just shrinks
            currentSize = p.size * (fadeRatio * 0.6 + 0.4);
          }
          
          // Move particle
          p.x += p.vx;
          p.y += p.vy;
          
          // Rotate particle
          p.rotation += p.rotationSpeed;
          
          // Apply physics based on effect type
          if (trailType === 'smoke') {
            // Smoke rises and swirls
            p.vy -= 0.03 + Math.random() * 0.02; // Upward force
            p.vx += (Math.random() - 0.5) * 0.1;  // Random horizontal drift
            
            // Apply turbulence
            p.vx += Math.sin(now * 0.001 + p.randomOffset) * 0.05;
            p.vy += Math.cos(now * 0.001 + p.randomOffset) * 0.05;
            
            // Slow down over time
            p.vx *= 0.99;
            p.vy *= 0.99;
          } else {
            // Paint has more gravity
            p.vy += 0.05;
            p.vx *= 0.97;
            p.vy *= 0.97;
          }
          
          // Draw particle based on effect type
          try {
            ctx.save();
            if (trailType === 'brush') {
              // Brush stroke effect
              ctx.globalAlpha = currentOpacity;
              ctx.translate(p.x, p.y);
              ctx.rotate(p.rotation);
              ctx.beginPath();
              
              // Create a smooth brush stroke
              ctx.moveTo(0, 0);
              ctx.lineTo(currentSize, 0);
              ctx.lineWidth = currentSize * 0.5;
              ctx.strokeStyle = color;
              ctx.stroke();
            } else {
              // Paint particles are more solid with texture
              ctx.globalAlpha = currentOpacity;
              ctx.translate(p.x, p.y);
              ctx.rotate(p.rotation);
              ctx.beginPath();
              
              // Create a slightly irregular shape for paint
              const jitter = 0.3;
              ctx.moveTo(currentSize * (1 + Math.random() * jitter), 0);
              for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
                const radius = currentSize * (1 + (Math.random() - 0.5) * jitter);
                ctx.lineTo(
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius
                );
              }
              ctx.closePath();
              
              // Fill with gradient
              const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
              gradient.addColorStop(0, color);
              gradient.addColorStop(0.7, `rgba(${p.colorRGB}, ${currentOpacity * 0.8})`);
              gradient.addColorStop(1, `rgba(${p.colorRGB}, 0)`);
              ctx.fillStyle = gradient;
              ctx.fill();
            }
            ctx.restore();
          } catch (err) {
            console.error("❌ Error drawing particle:", err);
          }
          
          remainingParticles.push(p);
        }
      });
      
      if (particles.current.length > 0 && remainingParticles.length === 0) {
        console.log("⚠️ All particles expired");
      }
      
      particles.current = remainingParticles;
      
      if (initialParticleCount !== remainingParticles.length) {
        console.log("🧮 Particle count changed", { 
          before: initialParticleCount, 
          after: remainingParticles.length 
        });
      }
      
      animFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation loop
    console.log("🎬 Starting animation loop");
    animate();
    
    // Clean up
    return () => {
      console.log("🧹 Cleaning up CursorTrailEffect");
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isActive, blendMode, color, particleLifespan, trailType]);
  
  // Helper function to extract RGB values from color string
  const parseColor = (colorStr) => {
    let r = 255, g = 255, b = 255;
    
    if (colorStr.startsWith('rgba(')) {
      const parts = colorStr.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
      if (parts) {
        r = parseInt(parts[1], 10);
        g = parseInt(parts[2], 10);
        b = parseInt(parts[3], 10);
      }
    } else if (colorStr.startsWith('rgb(')) {
      const parts = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
      if (parts) {
        r = parseInt(parts[1], 10);
        g = parseInt(parts[2], 10);
        b = parseInt(parts[3], 10);
      }
    }
    
    return `${r}, ${g}, ${b}`;
  };
  
  // Helper function to create a particle
  const createParticle = (x, y, speed = 0) => {
    const angle = Math.random() * Math.PI * 2;
    const baseSpeed = Math.random() * 2 + 0.5 + (speed * 0.2);
    const rgb = parseColor(color);
    
    const newParticle = {
      x: x ?? mousePosition.current.x,
      y: y ?? mousePosition.current.y,
      vx: Math.cos(angle) * baseSpeed + (mouseVelocity.current.x * 0.3),
      vy: Math.sin(angle) * baseSpeed + (mouseVelocity.current.y * 0.3) - (trailType === 'smoke' ? 1 : 0),
      size: initialSize + Math.random() * 8 + (speed * 0.4),
      initialOpacity: 0.7 + Math.random() * 0.3,
      colorRGB: rgb,
      createdAt: Date.now(),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      randomOffset: Math.random() * 10 // For turbulence effect
    };
    
    console.log("➕ Created particle", { 
      position: { x: newParticle.x, y: newParticle.y },
      velocity: { vx: newParticle.vx, vy: newParticle.vy },
      size: newParticle.size
    });
    
    particles.current.push(newParticle);
    
    // Limit particle count for performance
    if (particles.current.length > 120) {
      const removed = particles.current.length - 120;
      particles.current = particles.current.slice(-120);
      console.log(`🗑️ Removed ${removed} particles due to limit`);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          ...style
        }}
      />
      
      {/* Debug info - can be removed for production */}
      <div style={{
        position: 'fixed', 
        top: '10px', 
        left: '10px', 
        background: 'rgba(0,0,0,0.7)', 
        color: 'white', 
        padding: '5px 10px',
        fontSize: '12px',
        zIndex: 10000,
        fontFamily: 'monospace'
      }}>
        Mouse: {debugInfo.mouseX}, {debugInfo.mouseY} | 
        Particles: {debugInfo.particleCount} | 
        Canvas: {debugInfo.canvasWidth}×{debugInfo.canvasHeight}
      </div>
    </>
  );
};

export default CursorTrailEffect;
