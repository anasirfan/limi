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
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1 relative">
            {/* Render up to 4 images */}
            {[0, 1, 2, 3].map((index) => (
              <div 
                key={index}
                className="bg-gray-700 flex items-center justify-center overflow-hidden"
                style={{ 
                  backgroundImage: formState.media.urls[index] ? `url(${formState.media.urls[index]})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!formState.media.urls[index] && (
                  <span className="text-white opacity-50">Image {index + 1}</span>
                )}
              </div>
            ))}
            
            {/* Overlay for text if needed */}
            {(formState.text.showHeading || formState.text.showSubheading) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className={`text-center p-4 ${formState.appearance.overlayDarken ? 'bg-black bg-opacity-40' : ''} rounded`}
                  style={{ 
                    textAlign: formState.text.alignment,
                    ...(formState.text.verticalPosition === 'top' ? { alignSelf: 'flex-start' } : 
                       formState.text.verticalPosition === 'bottom' ? { alignSelf: 'flex-end' } : 
                       { alignSelf: 'center' })
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
