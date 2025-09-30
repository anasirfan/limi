'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const ParticleSystem = () => {
  const particleRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!particleRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1,
        decay: Math.random() * 0.02 + 0.01
      });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: particles,
            x: (particle) => particle.x + particle.vx * 50,
            y: (particle) => particle.y + particle.vy * 50,
            life: 0,
            duration: 2000,
            easing: 'easeOutQuart',
            update: () => {
              ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              
              particles.forEach(particle => {
                ctx.save();
                ctx.globalAlpha = particle.life;
                ctx.fillStyle = `hsl(${particle.life * 360}, 70%, 50%)`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
              });
            },
            loop: true
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(particleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={particleRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-900 to-purple-900">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Particle Explosion</h2>
        <canvas ref={canvasRef} className="border border-purple-500 rounded-lg"></canvas>
      </div>
    </section>
  );
};

export default ParticleSystem;
