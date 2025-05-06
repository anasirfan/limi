"use client";
import { useSpring, animated } from '@react-spring/web';

const LightGlow = ({ isActive, color }) => {
  const glowAnimation = useSpring({
    opacity: isActive ? 0.6 : 0,
    scale: isActive ? 1.5 : 1,
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.div 
      style={{
        ...glowAnimation,
        backgroundColor: color || '#54BB74'
      }}
      className="absolute inset-0 rounded-full blur-xl"
    />
  );
};

export default LightGlow;
