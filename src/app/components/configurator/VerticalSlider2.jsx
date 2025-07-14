"use client";

import { useState, useRef, useEffect } from 'react';

const VerticalSlider2 = ({ 
  min = 1, 
  max = 10, 
  step = 1, 
  initialValue = 1,
  label = "Size",
  onChange = () => {}
}) => {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);

  // Handle mouse/touch move events
  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      updateSliderValue(e);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging]);

  // Update slider value based on position
  const updateSliderValue = (e) => {
    if (!trackRef.current) return;
    
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    let y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    const percent = 1 - (y / rect.height);
    const steps = (max - min) / step;
    const newValue = Math.round(percent * steps) * step + min;
    
    if (newValue !== value) {
      setValue(newValue);
      onChange(newValue);
    }
  };

  const handleStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderValue(e);
  };

  const calculatePosition = () => {
    return ((value - min) / (max - min)) * 100;
  };

  // Generate tick marks
  const renderTicks = () => {
    const ticks = [];
    const totalTicks = (max - min) / step + 1;
    
    for (let i = 0; i < totalTicks; i++) {
      const tickValue = min + (i * step);
      const isActive = value >= tickValue;
      
      ticks.push(
        <div 
          key={tickValue}
          className={`w-1 h-3 rounded-full transition-all duration-200 ${
            isActive ? 'bg-emerald-400' : 'bg-gray-600/50'
          }`}
          onClick={() => {
            setValue(tickValue);
            onChange(tickValue);
          }}
          style={{
            cursor: 'pointer',
            margin: '2px 0'
          }}
        />
      );
    }
    
    return ticks;
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-gray-800/40 backdrop-blur-md border border-gray-700/50 shadow-xl">
      <div className="text-sm font-medium text-gray-200 mb-1">{label}</div>
      
      <div className="flex items-center gap-3">
        {/* Value Display */}
        <div className="text-2xl font-bold text-emerald-400 w-8 text-center">
          {value}
        </div>
        
        {/* Slider Track */}
        <div 
          ref={trackRef}
          className="relative w-2 h-48 bg-gray-700/50 rounded-full flex flex-col justify-between items-center py-2 cursor-pointer"
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          {/* Active Track */}
          <div 
            className="absolute bottom-0 w-full bg-emerald-500/30 rounded-full transition-all duration-200 ease-out"
            style={{ 
              height: `${calculatePosition()}%`,
              background: 'linear-gradient(to top, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.1))'
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-[1px]" />
          </div>
          
          {/* Thumb */}
          <div 
            className="absolute w-6 h-6 rounded-full bg-emerald-500 shadow-lg z-10 flex items-center justify-center text-white font-medium text-xs select-none transition-transform duration-150 ease-out"
            style={{
              bottom: `calc(${calculatePosition()}% - 12px)`,
              transform: 'translateY(50%) scale(1)',
              transformOrigin: 'center',
              boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.3)',
              cursor: isDragging ? 'grabbing' : 'grab',
              transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
              background: 'radial-gradient(circle at 30% 30%, #34d399, #10b981)'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleStart(e);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleStart(e);
            }}
          >
            <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          </div>
          
          {/* Ticks */}
          <div className="relative z-0 flex flex-col items-center justify-between h-full w-full">
            {renderTicks()}
          </div>
        </div>
      </div>
      
      {/* Min/Max Labels */}
      <div className="flex justify-between w-full text-xs text-gray-400 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default VerticalSlider2;
