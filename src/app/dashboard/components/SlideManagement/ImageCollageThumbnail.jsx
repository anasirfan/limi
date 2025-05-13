import React from 'react';

/**
 * ImageCollageThumbnail component for rendering a small preview of an image collage
 * Used in dashboard thumbnails and slide lists
 */
const ImageCollageThumbnail = ({ urls = [], size = 'small' }) => {
  // Filter out empty URLs and limit to max 4
  const validUrls = (urls || []).filter(url => url && url.trim() !== '').slice(0, 4);
  
  // Determine sizing based on the size prop
  const sizeClasses = {
    small: {
      container: 'w-16 h-16',
      singleImage: 'w-full h-full',
      twoImages: 'w-1/2 h-full',
      threeImages: {
        top: 'w-1/2 h-1/2',
        bottom: 'w-full h-1/2'
      },
      fourImages: 'w-1/2 h-1/2'
    },
    medium: {
      container: 'w-24 h-24',
      singleImage: 'w-full h-full',
      twoImages: 'w-1/2 h-full',
      threeImages: {
        top: 'w-1/2 h-1/2',
        bottom: 'w-full h-1/2'
      },
      fourImages: 'w-1/2 h-1/2'
    },
    large: {
      container: 'w-32 h-32',
      singleImage: 'w-full h-full',
      twoImages: 'w-1/2 h-full',
      threeImages: {
        top: 'w-1/2 h-1/2',
        bottom: 'w-full h-1/2'
      },
      fourImages: 'w-1/2 h-1/2'
    }
  };
  
  const classes = sizeClasses[size] || sizeClasses.small;
  
  if (validUrls.length === 0) {
    return (
      <div className={`${classes.container} bg-[#1e1e1e] rounded-md flex items-center justify-center`}>
        <span className="text-gray-500 text-xs">No images</span>
      </div>
    );
  }
  
  if (validUrls.length === 1) {
    return (
      <div className={`${classes.container} relative overflow-hidden rounded-md`}>
        <div 
          className={`${classes.singleImage} bg-cover bg-center`}
          style={{ backgroundImage: `url(${validUrls[0]})` }}
        />
      </div>
    );
  }
  
  if (validUrls.length === 2) {
    return (
      <div className={`${classes.container} flex overflow-hidden rounded-md`}>
        {validUrls.map((url, index) => (
          <div 
            key={index}
            className={`${classes.twoImages} bg-cover bg-center ${index === 0 ? 'rounded-l-md' : 'rounded-r-md'}`}
            style={{ 
              backgroundImage: `url(${url})`,
              transform: `rotate(${index === 0 ? '-1deg' : '1deg'})`,
              zIndex: 2 - index
            }}
          />
        ))}
      </div>
    );
  }
  
  if (validUrls.length === 3) {
    return (
      <div className={`${classes.container} flex flex-wrap overflow-hidden rounded-md`}>
        {/* Top row - two images side by side */}
        <div 
          className={`${classes.threeImages.top} bg-cover bg-center rounded-tl-md`}
          style={{ backgroundImage: `url(${validUrls[0]})` }}
        />
        <div 
          className={`${classes.threeImages.top} bg-cover bg-center rounded-tr-md`}
          style={{ backgroundImage: `url(${validUrls[1]})` }}
        />
        {/* Bottom row - one image full width */}
        <div 
          className={`${classes.threeImages.bottom} bg-cover bg-center rounded-b-md`}
          style={{ backgroundImage: `url(${validUrls[2]})` }}
        />
      </div>
    );
  }
  
  // 4 images - grid layout
  return (
    <div className={`${classes.container} flex flex-wrap overflow-hidden rounded-md`}>
      {validUrls.map((url, index) => {
        const positionClasses = [
          'rounded-tl-md', // top-left
          'rounded-tr-md', // top-right
          'rounded-bl-md', // bottom-left
          'rounded-br-md'  // bottom-right
        ];
        
        return (
          <div 
            key={index}
            className={`${classes.fourImages} bg-cover bg-center ${positionClasses[index]}`}
            style={{ backgroundImage: `url(${url})` }}
          />
        );
      })}
    </div>
  );
};

export default ImageCollageThumbnail;
