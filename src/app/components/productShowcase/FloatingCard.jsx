"use client";
import { useRef, useState } from "react";
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

const FloatingCard = ({ product, index, onClick, isActive }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  // Tilt effect for the card
  const tiltRef = useRef(null);
  const tiltOptions = {
    max: 25,
    scale: 1.05,
    speed: 1000,
    glare: true,
    'max-glare': 0.5
  };

  // Animation for floating effect
  const floatAnimation = useSpring({
    to: async (next) => {
      while (true) {
        await next({ y: -10, rotateZ: -1, config: { duration: 2000 } });
        await next({ y: 0, rotateZ: 1, config: { duration: 2000 } });
      }
    },
    from: { y: 0, rotateZ: 0 },
    config: { tension: 120, friction: 14 },
    pause: !inView
  });

  // Light glow effect on hover
  const [isHovered, setIsHovered] = useState(false);
  const glowAnimation = useSpring({
    opacity: isHovered ? 0.8 : 0,
    scale: isHovered ? 1.2 : 1,
    config: { tension: 300, friction: 20 }
  });

  // Blob shape for the card
  const blobPath = [
    'M85.5,85.7c11.4,11.8,22.8,23.5,25.4,36.1c2.6,12.6,-3.6,26.1,-10.8,38.4c-7.2,12.3,-15.3,23.4,-26.8,30.5c-11.5,7.1,-26.4,10.1,-39.9,6.9c-13.5,-3.2,-25.7,-12.6,-34.4,-24.9c-8.7,-12.3,-14,-27.5,-13.2,-42.4c0.8,-14.9,7.7,-29.5,18.1,-41.3c10.4,-11.8,24.3,-20.8,38.8,-21.9c14.5,-1.1,29.4,5.8,42.8,18.6z',
    'M81.7,89.2c12.4,12.9,24.7,25.8,26.1,39.6c1.4,13.8,-8.1,28.5,-18.4,40.9c-10.3,12.4,-21.3,22.5,-34.9,26.3c-13.6,3.8,-29.8,1.3,-41.8,-8.1c-12,-9.4,-19.8,-25.7,-20.9,-41.9c-1.1,-16.2,4.5,-32.3,14.8,-44.5c10.3,-12.2,25.3,-20.5,40.7,-21.1c15.4,-0.6,31.2,6.5,34.4,8.8z',
    'M78.2,87.3c11.3,11.6,22.5,23.2,24.7,35.8c2.2,12.6,-4.7,26.2,-13.4,38.1c-8.7,11.9,-19.2,22.1,-32.1,26.8c-12.9,4.7,-28.2,3.9,-40.6,-3.5c-12.4,-7.4,-21.9,-21.4,-24.5,-36.5c-2.6,-15.1,1.7,-31.3,10.9,-43.8c9.2,-12.5,23.3,-21.3,38.1,-23.4c14.8,-2.1,30.3,2.5,36.9,6.5z'
  ];

  const randomBlobIndex = useRef(Math.floor(Math.random() * blobPath.length));

  return (
    <animated.div 
      ref={ref}
      style={{
        ...floatAnimation,
        position: 'relative',
        zIndex: isActive ? 10 : 1
      }}
      className={`relative ${inView ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
    >
      <div 
        ref={tiltRef}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer"
        style={{
          width: '280px',
          height: '350px',
          margin: '20px',
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(0) rotateY(0) scale(1)`,
          transition: 'transform 0.5s ease'
        }}
      >
        {/* Blob shape SVG mask */}
        <div className="absolute inset-0 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 150 150" preserveAspectRatio="xMidYMid meet">
            <clipPath id={`blob-shape-${product.id}`}>
              <path d={blobPath[randomBlobIndex.current]} transform="scale(0.8)" />
            </clipPath>
            <g clipPath={`url(#blob-shape-${product.id})`}>
              <image 
                href={product.image} 
                width="150%" 
                height="150%" 
                x="-25%" 
                y="-25%" 
                preserveAspectRatio="xMidYMid slice" 
              />
            </g>
          </svg>
        </div>

        {/* Product info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-[#292929] to-transparent">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-sm">{product.tagline}</p>
        </div>

        {/* Light glow effect */}
        <animated.div 
          style={glowAnimation}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#54BB74] to-[#87CEAB] blur-xl"
        />
      </div>
    </animated.div>
  );
};

export default FloatingCard;
