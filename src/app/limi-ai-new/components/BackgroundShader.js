'use client';

import React, { memo, useMemo, useEffect, useRef } from 'react';
import { 
  Metaballs
} from '@paper-design/shaders-react';

// Component mapping for dynamic rendering
const ShaderComponents = {
  Metaballs
};

const BackgroundShader = memo(function BackgroundShader({ backgroundConfig }) {
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsRef = useRef(60);

  // Performance monitoring
  useEffect(() => {
    const monitorPerformance = () => {
      frameCountRef.current++;
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      
      if (delta >= 1000) { // Check every second
        const fps = Math.round((frameCountRef.current * 1000) / delta);
        fpsRef.current = fps;
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        
        // Log performance for debugging
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}fps - Consider using static background`);
        }
      }
      
      requestAnimationFrame(monitorPerformance);
    };
    
    const rafId = requestAnimationFrame(monitorPerformance);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Memoize the configuration processing
  const processedConfig = useMemo(() => {
    if (!backgroundConfig || !backgroundConfig.config) {
      return null;
    }
    return backgroundConfig.config;
  }, [backgroundConfig]);

  if (!processedConfig) {
    return null;
  }

  // Handle shader-react based backgrounds
  if (processedConfig.type === 'shader') {
    const { baseLayer, overlayLayer } = processedConfig;
    
    const BaseComponent = ShaderComponents[baseLayer.component];
    const OverlayComponent = overlayLayer ? ShaderComponents[overlayLayer.component] : null;

    if (!BaseComponent) {
      console.warn(`Shader component not found: ${baseLayer.component}`);
      return null;
    }

    // Memoize prop filtering for performance
    const { baseProps, overlayProps } = useMemo(() => {
      const filterProps = (props) => {
        const { opacity, mixBlendMode, fps, ...filteredProps } = props;
        return filteredProps;
      };

      return {
        baseProps: filterProps(baseLayer.props),
        overlayProps: overlayLayer ? filterProps(overlayLayer.props) : null
      };
    }, [baseLayer.props, overlayLayer?.props]);

    // Memoize style objects with aggressive performance optimizations
    const containerStyle = useMemo(() => ({
      backgroundColor: '#000000',
      overflow: 'hidden',
      willChange: 'transform',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden', // Prevent flickering
      perspective: 1000, // Optimize 3D transforms
      transformStyle: 'preserve-3d'
    }), []);

    const baseLayerStyle = useMemo(() => ({ 
      zIndex: 1,
      isolation: 'isolate',
      contain: 'layout style paint', // Optimize rendering
      willChange: 'transform'
    }), []);

    const overlayLayerStyle = useMemo(() => {
      if (!overlayLayer) return null;
      return {
        zIndex: 2,
        opacity: overlayLayer.props.opacity || 0.4,
        mixBlendMode: overlayLayer.props.mixBlendMode || 'overlay',
        isolation: 'isolate',
        contain: 'layout style paint'
      };
    }, [overlayLayer?.props.opacity, overlayLayer?.props.mixBlendMode]);

    const shaderStyle = useMemo(() => ({
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      willChange: 'transform',
      backfaceVisibility: 'hidden'
    }), []);

    return (
      <div 
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={containerStyle}
      >
        {/* Base Layer */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={baseLayerStyle}
        >
          <BaseComponent
            {...baseProps}
            style={shaderStyle}
          />
        </div>

        {/* Overlay Layer - Only render if exists */}
        {overlayLayer && OverlayComponent && (
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={overlayLayerStyle}
          >
            <OverlayComponent
              {...overlayProps}
              style={shaderStyle}
            />
          </div>
        )}
      </div>
    );
  }

  // Fallback for any legacy configurations
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full -z-10"
      style={{ backgroundColor: '#000000' }}
    />
  );
});

export default BackgroundShader;
