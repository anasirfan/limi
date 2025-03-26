'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MouseTrail = () => {
  const trailRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef();
  const throttleRef = useRef(false);

  useEffect(() => {
    const dots = [];
    const colors = [
      '#FF3366', // Pink
      '#33FF66', // Neon Green
      '#3366FF', // Blue
      '#FFFF66', // Yellow
      '#FF66FF', // Magenta
    ];
    // Reduce number of dots for better performance
    const numDots = 15; // Reduced from 25
    const trailContainer = trailRef.current;

    // Create dots
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'trail-dot';
      dot.style.cssText = `
        position: fixed;
        width: ${8 - (i * 0.2)}px;
        height: ${8 - (i * 0.2)}px;
        background: ${colors[i % colors.length]};
        border-radius: 50%;
        pointer-events: none;
        opacity: ${1 - (i * 0.02)};
        mix-blend-mode: screen;
        z-index: 9999;
        filter: blur(${i * 0.2}px);
        transform: translate(-50%, -50%);
      `;
      trailContainer.appendChild(dot);
      dots.push({
        element: dot,
        x: 0,
        y: 0,
        delay: i * 2
      });
    }
    dotsRef.current = dots;

    // Mouse move handler with throttling
    const handleMouseMove = (e) => {
      // Throttle mousemove events for better performance
      if (throttleRef.current) return;
      
      throttleRef.current = true;
      setTimeout(() => {
        throttleRef.current = false;
      }, 16); // ~60fps
      
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Animation loop with RAF optimization
    const animate = () => {
      dotsRef.current.forEach((dot, index) => {
        const targetX = mouseRef.current.x;
        const targetY = mouseRef.current.y;

        // Smooth follow with delay
        dot.x += (targetX - dot.x) * (0.2 - index * 0.004);
        dot.y += (targetY - dot.y) * (0.2 - index * 0.004);

        // Apply position
        dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      dots.forEach(dot => {
        if (dot.element && dot.element.parentNode) {
          dot.element.remove();
        }
      });
      dotsRef.current = [];
    };
  }, []);

  return <div ref={trailRef} className="pointer-events-none fixed inset-0 z-50 max-sm:hidden" />;
};

export default MouseTrail;
