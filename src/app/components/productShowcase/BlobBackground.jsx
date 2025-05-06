"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BlobBackground = () => {
  const [blobs, setBlobs] = useState([]);
  
  // Animation variants for the blobs
  const blobAnimation = {
    initial: { x: 0, y: 0, rotate: 0, scale: 1 },
    animate: (blob) => ({
      x: [0, blob.animationX, 0, -blob.animationX, 0],
      y: [0, blob.animationY, 0, -blob.animationY, 0],
      rotate: [0, 15, 0, -15, 0],
      scale: [1, 1.05, 1, 0.95, 1],
      transition: {
        duration: blob.animationDuration || 30,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror"
      }
    })
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Smoother, more circular SVG blobs
    const svgBlobs = [
      {
        id: 'blob1',
        viewBox: '0 0 200 200',
        path: 'M48.8,-74.1C63.1,-67.2,74.7,-53.8,81.1,-38.6C87.5,-23.4,88.7,-6.3,85.9,10.1C83.1,26.6,76.3,42.4,65.6,55.1C54.9,67.8,40.3,77.3,24.1,81.9C7.9,86.5,-9.9,86.1,-26.2,81.1C-42.5,76.1,-57.3,66.5,-68.1,53.3C-78.9,40.1,-85.7,23.4,-87.2,6.1C-88.7,-11.2,-84.9,-29,-76.2,-44.1C-67.5,-59.1,-53.9,-71.4,-38.8,-77.8C-23.7,-84.3,-7.1,-84.9,9.2,-82.3C25.5,-79.7,34.5,-81,48.8,-74.1Z',
        transform: 'translate(100 100)',
        fill: 'rgba(84, 187, 116, 0.3)',
        preserveAspectRatio: 'none'
      },
      {
        id: 'blob2',
        viewBox: '0 0 200 200',
        path: 'M47.3,-71.7C61.3,-64.2,72.8,-51.2,79.3,-36.3C85.8,-21.4,87.3,-4.6,84.5,11.2C81.7,27,74.6,41.9,64.1,54C53.6,66.1,39.7,75.5,24.1,79.9C8.5,84.3,-8.7,83.7,-24.6,78.8C-40.4,73.9,-54.9,64.7,-65.7,52C-76.6,39.3,-83.8,23.1,-85.4,6.1C-87,-10.9,-83,-28.7,-73.9,-42.9C-64.8,-57.1,-50.5,-67.7,-35.5,-74.5C-20.5,-81.3,-4.8,-84.3,10.1,-82.1C25,-79.9,33.3,-79.3,47.3,-71.7Z',
        transform: 'translate(100 100)',
        fill: 'rgba(80, 200, 120, 0.25)',
        preserveAspectRatio: 'none'
      },
      {
        id: 'blob3',
        viewBox: '0 0 200 200',
        path: 'M53.2,-75.9C68.7,-68.2,80.9,-53.3,87.2,-36.7C93.5,-20.1,93.9,-1.7,89.5,15.2C85.1,32.1,75.9,47.5,63.2,59.5C50.5,71.6,34.3,80.4,16.8,83.9C-0.8,87.4,-19.8,85.7,-36.4,78.7C-53,71.7,-67.3,59.4,-76.3,44.1C-85.3,28.8,-89,10.5,-87.1,-7.2C-85.2,-24.9,-77.7,-42,-65.8,-54.1C-53.9,-66.2,-37.6,-73.3,-21.3,-77.1C-5,-80.9,11.2,-81.4,26.4,-79C41.6,-76.6,37.7,-83.6,53.2,-75.9Z',
        transform: 'translate(100 100)',
        fill: 'rgba(41, 41, 41, 0.15)',
        preserveAspectRatio: 'none'
      },
      {
        id: 'blob4',
        viewBox: '0 0 200 200',
        path: 'M39.6,-67.5C51.4,-61.7,61.1,-51.3,67.7,-39.3C74.2,-27.3,77.6,-13.6,78.3,0.4C79.1,14.5,77.2,29,70.8,41.2C64.3,53.4,53.4,63.4,40.8,71.8C28.2,80.2,14.1,87,-0.8,88.3C-15.7,89.6,-31.3,85.5,-44.9,77.7C-58.6,70,-70.2,58.6,-77.8,45C-85.4,31.5,-89,15.7,-86.4,1.5C-83.9,-12.8,-75.2,-25.6,-67.6,-39.2C-60.1,-52.9,-53.6,-67.3,-42.6,-73.5C-31.5,-79.8,-15.7,-77.8,-0.9,-76.1C13.9,-74.5,27.7,-73.3,39.6,-67.5Z',
        transform: 'translate(100 100)',
        fill: 'rgba(255, 255, 255, 0.3)',
        preserveAspectRatio: 'none'
      },
      {
        id: 'blob5',
        viewBox: '0 0 200 200',
        path: 'M45.4,-76.3C59.2,-69.3,71.1,-58.1,78.4,-44.5C85.7,-30.9,88.3,-15.5,87.7,-0.3C87.1,14.8,83.3,29.6,75.8,42.9C68.3,56.1,57.2,67.8,43.6,74.7C30,81.6,15,83.7,-0.2,84C-15.4,84.3,-30.8,82.8,-43.3,75.7C-55.8,68.6,-65.4,55.8,-72.3,42C-79.2,28.2,-83.4,14.1,-83.8,-0.2C-84.2,-14.5,-80.7,-29,-73.3,-41.8C-65.9,-54.5,-54.5,-65.6,-41.4,-72.8C-28.2,-80,-14.1,-83.3,0.9,-84.8C16,-86.3,31.9,-83.2,45.4,-76.3Z',
        transform: 'translate(100 100)',
        fill: 'rgba(84, 187, 116, 0.25)',
        preserveAspectRatio: 'none'
      },
      {
        id: 'blob6',
        viewBox: '0 0 200 200',
        path: 'M39.6,-67.5C51.4,-61.7,61.1,-51.3,67.7,-39.3C74.2,-27.3,77.6,-13.6,78.3,0.4C79.1,14.5,77.2,29,70.8,41.2C64.3,53.4,53.4,63.4,40.8,71.8C28.2,80.2,14.1,87,-0.8,88.3C-15.7,89.6,-31.3,85.5,-44.9,77.7C-58.6,70,-70.2,58.6,-77.8,45C-85.4,31.5,-89,15.7,-86.4,1.5C-83.9,-12.8,-75.2,-25.6,-67.6,-39.2C-60.1,-52.9,-53.6,-67.3,-42.6,-73.5C-31.5,-79.8,-15.7,-77.8,-0.9,-76.1C13.9,-74.5,27.7,-73.3,39.6,-67.5Z',
        transform: 'translate(100 100)',
        fill: 'rgba(80, 200, 120, 0.12)',
        preserveAspectRatio: 'none'
      }
    ];
    
    // Create blobs with 1 centered and 4 in corners
    const createBlobs = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newBlobs = [];
      
      // Define specific positions for 1 centered and 4 in corners
      const positionPatterns = [
        { x: 0.5, y: 0.5 },       // Center
        { x: 0.1, y: 0.1 },       // Top left
        { x: 0.9, y: 0.1 },       // Top right
        { x: 0.1, y: 0.9 },       // Bottom left
        { x: 0.9, y: 0.9 }        // Bottom right
      ];
      
      // Create exactly 5 blobs with specific positions
      for (let i = 0; i < 5; i++) {
        // Use different blobs for variety but ensure they're circular
        const blobIndex = i % svgBlobs.length;
        const blob = svgBlobs[blobIndex];
        const position = positionPatterns[i];
        
        // Exact positioning for the 5 blobs
        const xPos = position.x * width;
        const yPos = position.y * height;
        
        // Center blob is larger than corner blobs
        const size = i === 0 ? 700 : 500;
        
        // Center blob has higher opacity
        const baseOpacity = i === 0 ? 0.3 : 0.2;
        
        newBlobs.push({
          id: `blob-${i}`,
          blobData: blob,
          x: xPos,
          y: yPos,
          size,
          opacity: baseOpacity,
          rotation: Math.random() * 360,
          // Gentle movement for background blobs
          animationX: 40 + Math.random() * 30,
          animationY: 40 + Math.random() * 30,
          animationDuration: 30 + Math.random() * 15  // Slower animations for smoother feel
        });
      }
      
      setBlobs(newBlobs);
    };
    
    // Initialize blobs
    createBlobs();
    
    // Handle resize
    const handleResize = () => {
      createBlobs();
    };
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            opacity: blob.opacity,
          }}
          variants={blobAnimation}
          initial="initial"
          animate="animate"
          custom={blob}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox={blob.blobData.viewBox}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <path
              d={blob.blobData.path}
              fill={blob.blobData.fill}
              transform={blob.blobData.transform || ''}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default BlobBackground;
