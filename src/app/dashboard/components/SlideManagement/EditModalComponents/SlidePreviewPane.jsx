import React from 'react';

/**
 * SlidePreviewPane component for displaying a preview of the slide being edited
 */
const SlidePreviewPane = ({ formState, getThemeStyles }) => {
  // Get theme styles for the current theme
  const themeStyle = getThemeStyles(formState.appearance.theme);
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-white mb-3">Preview</h3>
      <div 
        className="w-full h-64 rounded-lg overflow-hidden flex items-center justify-center relative"
        style={{ 
          backgroundColor: formState.appearance.backgroundColor,
          boxShadow: themeStyle.shadow
        }}
      >
        {/* Media-Text Split Layout */}
        {formState.layout === 'media-text-split' && (
          <div className="flex w-full h-full">
            <div 
              className={`${formState.media.position === 'left' ? 'order-1' : 'order-2'} w-1/2 bg-gray-700 flex items-center justify-center`}
              style={{ 
                backgroundImage: formState.media.urls[0] ? `url(${formState.media.urls[0]})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {!formState.media.urls[0] && (
                <span className="text-white opacity-50">Media</span>
              )}
            </div>
            <div 
              className={`${formState.media.position === 'left' ? 'order-2' : 'order-1'} w-1/2 p-6 flex flex-col justify-center`}
              style={{ 
                textAlign: formState.text.alignment,
                ...(formState.text.verticalPosition === 'top' ? { justifyContent: 'flex-start' } : 
                   formState.text.verticalPosition === 'bottom' ? { justifyContent: 'flex-end' } : 
                   { justifyContent: 'center' })
              }}
            >
              {formState.text.showHeading && (
                <div 
                  className={`text-lg font-bold mb-2 ${themeStyle.headingStyle}`}
                  style={{ color: themeStyle.text }}
                >
                  {formState.text.heading || 'Heading'}
                </div>
              )}
              
              {formState.text.showSubheading && (
                <div 
                  className="text-sm font-medium mb-3"
                  style={{ color: themeStyle.text }}
                >
                  {formState.text.subheading || 'Subheading'}
                </div>
              )}
              
              {formState.text.showDescription && (
                <div 
                  className="text-xs mb-3"
                  style={{ color: themeStyle.text }}
                >
                  {formState.text.description || 'Description text goes here...'}
                </div>
              )}
              
              {formState.text.showBullets && formState.text.bullets && formState.text.bullets.length > 0 && (
                <ul className="mb-3">
                  {formState.text.bullets.map((bullet, index) => (
                    <li 
                      key={index}
                      className="flex items-center text-xs mb-1"
                      style={{ color: themeStyle.text }}
                    >
                      <span 
                        className="inline-block w-2 h-2 mr-2"
                        style={{ 
                          backgroundColor: themeStyle.accent,
                          borderRadius: '50%'
                        }}
                      ></span>
                      {bullet || `Bullet point ${index + 1}`}
                    </li>
                  ))}
                </ul>
              )}
              
              {formState.text.ctaText && (
                <button
                  className="mt-3 px-4 py-1 text-xs font-medium rounded"
                  style={{ 
                    background: themeStyle.buttonGradient,
                    color: formState.appearance.theme === 'charleston' ? '#FFFFFF' : '#2B2D2F'
                  }}
                >
                  {formState.text.ctaText}
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Video Background Layout */}
        {formState.layout === 'video-background' && (
          <div 
            className="w-full h-full flex items-center justify-center relative"
            style={{ 
              backgroundImage: formState.media.urls[0] ? `url(${formState.media.urls[0]})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {!formState.media.urls[0] && (
              <span className="text-white opacity-50">Video Background</span>
            )}
            
            {/* Overlay for better text visibility */}
            {formState.appearance.overlayDarken && (
              <div className="absolute inset-0 bg-black opacity-40"></div>
            )}
            
            <div 
              className="relative z-10 text-center p-6 max-w-lg"
              style={{ 
                textAlign: formState.text.alignment,
                ...(formState.text.verticalPosition === 'top' ? { marginTop: '0', marginBottom: 'auto' } : 
                   formState.text.verticalPosition === 'bottom' ? { marginTop: 'auto', marginBottom: '0' } : 
                   { margin: 'auto' })
              }}
            >
              {formState.text.showHeading && (
                <div 
                  className="text-xl font-bold mb-2"
                  style={{ 
                    color: '#FFFFFF',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {formState.text.heading || 'Heading'}
                </div>
              )}
              
              {formState.text.showSubheading && (
                <div 
                  className="text-base font-medium mb-3"
                  style={{ 
                    color: '#FFFFFF',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {formState.text.subheading || 'Subheading'}
                </div>
              )}
              
              {formState.text.ctaText && (
                <button
                  className="mt-3 px-4 py-1 text-sm font-medium rounded"
                  style={{ 
                    background: themeStyle.buttonGradient,
                    color: formState.appearance.theme === 'charleston' ? '#FFFFFF' : '#2B2D2F'
                  }}
                >
                  {formState.text.ctaText}
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Image Collage Layout */}
        {formState.layout === 'image-collage' && (
          <div className="w-full h-full relative">
            {/* Render up to 4 images in a more dynamic layout */}
            {formState.media.urls.length === 1 ? (
              <div 
                className="absolute bg-gray-700 flex items-center justify-center overflow-hidden rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110"
                style={{ 
                  backgroundImage: formState.media.urls[0] ? `url(${formState.media.urls[0]})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  top: '10%',
                  left: '5%',
                  width: '350px',
                  height: '350px',
                  transform: 'scale(1)',
                  transition: 'all 0.4s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) rotate(0deg)';
                  e.currentTarget.style.zIndex = '10';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.zIndex = '1';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                {!formState.media.urls[0] && (
                  <span className="text-white opacity-50">Image 1</span>
                )}
              </div>
            ) : formState.media.urls.length === 2 ? (
              <>
                {[0, 1].map((index, i) => {
                  // Fixed size of 350x350 pixels for each image box
                  const boxSize = '350px';
                  const positions = [
                    { top: '5%', left: '5%', width: boxSize, height: boxSize, zIndex: 3, rotate: '-1deg' },  // First image on left
                    { top: '25%', left: '40%', width: boxSize, height: boxSize, zIndex: 2, rotate: '1deg' },   // Second image on right
                  ];
                  return (
                    <div 
                      key={index}
                      className="absolute bg-gray-700 flex items-center justify-center overflow-hidden rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110"
                      style={{ 
                        backgroundImage: formState.media.urls[index] ? `url(${formState.media.urls[index]})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        ...positions[i],
                        transform: `rotate(${positions[i].rotate})`,
                        transition: 'all 0.4s ease-in-out',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08) rotate(0deg)';
                        e.currentTarget.style.zIndex = '10';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = `rotate(${positions[i].rotate})`;
                        e.currentTarget.style.zIndex = positions[i].zIndex;
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                      }}
                    >
                      {!formState.media.urls[index] && (
                        <span className="text-white opacity-50">Image {index + 1}</span>
                      )}
                    </div>
                  );
                })}
              </>
            ) : formState.media.urls.length === 3 ? (
              <>
                {[0, 1, 2].map((index, i) => {
                  // Fixed size of 350x350 pixels for each image box
                  const boxSize = '350px';
                  const positions = [
                    { top: '5%', left: '5%', width: boxSize, height: boxSize, zIndex: 3, rotate: '-1deg' },   // First image on left
                    { top: '25%', left: '40%', width: boxSize, height: boxSize, zIndex: 2, rotate: '1deg' },    // Second image on right
                    { top: '45%', left: '5%', width: boxSize, height: boxSize, zIndex: 4, rotate: '-1deg' },    // Third image on left
                  ];
                  return (
                    <div 
                      key={index}
                      className="absolute bg-gray-700 flex items-center justify-center overflow-hidden rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110"
                      style={{ 
                        backgroundImage: formState.media.urls[index] ? `url(${formState.media.urls[index]})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        ...positions[i],
                        transition: 'all 0.4s ease-in-out',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08) rotate(0deg)';
                        e.currentTarget.style.zIndex = '10';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = `rotate(${positions[i].rotate})`;
                        e.currentTarget.style.zIndex = positions[i].zIndex;
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                      }}
                    >
                      {!formState.media.urls[index] && (
                        <span className="text-white opacity-50">Image {index + 1}</span>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {formState.media.urls.slice(0, 6).map((url, index) => {
                  // Fixed size of 350x350 pixels for each image box
                  const boxSize = '350px';
                  
                  // Positions for zig-zag pattern as specified
                  const positions = [
                    // First image - left
                    { top: '5%', left: '5%', width: boxSize, height: boxSize, zIndex: 4, rotate: '-1deg' },
                    // Second image - right
                    { top: '25%', left: '40%', width: boxSize, height: boxSize, zIndex: 3, rotate: '1deg' },
                    // Third image - left
                    { top: '45%', left: '5%', width: boxSize, height: boxSize, zIndex: 2, rotate: '-1deg' },
                    // Fourth image - right
                    { top: '65%', left: '40%', width: boxSize, height: boxSize, zIndex: 1, rotate: '1deg' },
                  ];
                  
                  // For images beyond the first 4
                  if (index >= 4) {
                    const isLeft = index % 2 === 0;
                    const row = Math.floor(index / 2);
                    positions.push({
                      top: `${(row * 20) + 5}%`,
                      left: isLeft ? '5%' : '40%',
                      width: boxSize,
                      height: boxSize,
                      zIndex: 4 - (index % 4),
                      rotate: isLeft ? '-1deg' : '1deg'
                    });
                  }
                  
                  const position = index < 4 ? positions[index] : positions[4 + (index % 4)];
                  
                  return (
                    <div 
                      key={index}
                      className="absolute bg-gray-700 flex items-center justify-center overflow-hidden rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110"
                      style={{ 
                        backgroundImage: url ? `url(${url})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        ...position,
                        transform: `rotate(${position.rotate})`,
                        transition: 'all 0.4s ease-in-out',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08) rotate(0deg)';
                        e.currentTarget.style.zIndex = '10';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = `rotate(${position.rotate})`;
                        e.currentTarget.style.zIndex = position.zIndex;
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                      }}
                    >
                      {!url && (
                        <span className="text-white opacity-50">Image {index + 1}</span>
                      )}
                    </div>
                  );
                })}
              </>
            )}
            
            {/* Optional overlay for darkening */}
            {formState.appearance.overlayDarken && (
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10 transition-opacity duration-300"
                style={{ backdropFilter: 'blur(1px)' }}
              ></div>
            )}
            
            {/* Text overlay */}
            {(formState.text.showHeading || formState.text.showSubheading) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="absolute p-4 rounded-md bg-[#2B2D2F] bg-opacity-75 backdrop-blur-md border border-[#50C878] border-opacity-20 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ 
                    textAlign: formState.text.alignment,
                    top: formState.text.verticalPosition === 'top' ? '10%' : 'auto',
                    bottom: formState.text.verticalPosition === 'bottom' ? '10%' : 'auto',
                    left: formState.text.alignment === 'left' ? '10%' : 'auto',
                    right: formState.text.alignment === 'right' ? '10%' : 'auto',
                    transform: formState.text.alignment === 'center' ? 'translateX(-50%)' : 'none',
                    width: '40%',
                    ...(formState.text.verticalPosition === 'center' && { top: '50%', transform: 'translateY(-50%)' }),
                    ...(formState.text.alignment === 'center' && formState.text.verticalPosition === 'center' && { left: '50%', transform: 'translate(-50%, -50%)' })
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
                    e.currentTarget.style.borderColor = 'rgba(80, 200, 120, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                    e.currentTarget.style.borderColor = 'rgba(80, 200, 120, 0.2)';
                  }}
                >
                  {formState.text.showHeading && (
                    <div 
                      className="text-lg font-bold mb-1"
                      style={{ 
                        color: '#FFFFFF',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      }}
                    >
                      {formState.text.heading || 'Heading'}
                    </div>
                  )}
                  
                  {formState.text.showSubheading && (
                    <div 
                      className="text-sm font-medium"
                      style={{ 
                        color: '#FFFFFF',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                      }}
                    >
                      {formState.text.subheading || 'Subheading'}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1">
        This is a simplified preview. The actual slide may appear differently.
      </p>
    </div>
  );
};

export default SlidePreviewPane;
