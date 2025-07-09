import React from 'react';
import { FaTimes } from 'react-icons/fa';

/**
 * SlidePreviewModal component for previewing a slide
 */
const SlidePreviewModal = ({ slide, isOpen, onClose }) => {
  if (!isOpen || !slide) return null;

  // Get background style based on slide appearance
  const getBackgroundStyle = () => {
    const { appearance } = slide;
    if (!appearance) return { backgroundColor: '#292929' };
    
    return {
      backgroundColor: appearance.backgroundColor || '#292929',
    };
  };

  // Get text content style based on slide layout and text settings
  const getTextContentStyle = () => {
    const { text, layout } = slide;
    if (!text) return {};
    
    const styles = {
      textAlign: text.alignment || 'left',
    };
    
    // Add vertical positioning if available
    if (text.verticalPosition === 'top') {
      styles.justifyContent = 'flex-start';
    } else if (text.verticalPosition === 'bottom') {
      styles.justifyContent = 'flex-end';
    } else {
      styles.justifyContent = 'center';
    }
    
    return styles;
  };

  // Render media content based on slide media type and layout
  const renderMediaContent = () => {
    const { media, layout } = slide;
    if (!media || !media.urls || media.urls.length === 0) {
      return <div className="bg-gray-800 rounded-md flex items-center justify-center h-full">No media</div>;
    }
    
    if (media.type === 'video') {
      return (
        <div className="relative w-full h-full">
          <video 
            src={media.urls[0]} 
            className="w-full h-full object-cover rounded-md"
            controls
          />
        </div>
      );
    }
    
    if (layout === 'image-collage' && media.urls.length > 1) {
      return (
        <div className="grid grid-cols-2 gap-2 h-full">
          {media.urls.slice(0, 4).map((url, idx) => (
            <div 
              key={idx} 
              className="bg-cover bg-center rounded-md overflow-hidden"
              style={{ backgroundImage: `url(${url})` }}
            />
          ))}
        </div>
      );
    }
    
    return (
      <div 
        className="w-full h-full bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${media.urls[0]})` }}
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#333] flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Slide Preview</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="p-6 flex-grow overflow-auto">
          <div 
            className="w-full aspect-video rounded-lg overflow-hidden"
            style={getBackgroundStyle()}
          >
            {/* Slide layout rendering */}
            {slide.layout === 'media-text-split' ? (
              <div className="flex h-full">
                {/* Media side */}
                <div className={`w-1/2 p-4 ${slide.media?.position === 'right' ? 'order-2' : 'order-1'}`}>
                  {renderMediaContent()}
                </div>
                
                {/* Text side */}
                <div 
                  className={`w-1/2 p-6 flex flex-col ${slide.media?.position === 'right' ? 'order-1' : 'order-2'}`}
                  style={getTextContentStyle()}
                >
                  {slide.text?.showHeading !== false && slide.text?.heading && (
                    <h2 className="text-2xl font-bold text-white mb-2">{slide.text.heading}</h2>
                  )}
                  
                  {slide.text?.showSubheading !== false && slide.text?.subheading && (
                    <h3 className="text-xl text-gray-300 mb-4">{slide.text.subheading}</h3>
                  )}
                  
                  {slide.text?.showDescription !== false && slide.text?.description && (
                    <p className="text-gray-400 mb-4">{slide.text.description}</p>
                  )}
                  
                  {slide.text?.showBullets !== false && slide.text?.bullets && slide.text.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {slide.text.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : slide.layout === 'video-background' || slide.layout === 'video-bg-text' ? (
              <div className="relative h-full">
                {/* Background video */}
                <div className="absolute inset-0">
                  <video 
                    src={slide.media?.urls?.[0]} 
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                  />
                </div>
                
                {/* Overlay for text */}
                <div className={`absolute inset-0 bg-black ${slide.appearance?.overlayDarken ? 'bg-opacity-50' : 'bg-opacity-30'} flex items-center justify-center`}>
                  <div 
                    className="text-center p-8 max-w-2xl"
                    style={getTextContentStyle()}
                  >
                    {slide.text?.showHeading !== false && slide.text?.heading && (
                      <h2 className="text-3xl font-bold text-white mb-3">{slide.text.heading}</h2>
                    )}
                    
                    {slide.text?.showSubheading !== false && slide.text?.subheading && (
                      <h3 className="text-xl text-gray-300 mb-4">{slide.text.subheading}</h3>
                    )}
                    
                    {slide.text?.showDescription !== false && slide.text?.description && (
                      <p className="text-gray-200 mb-4">{slide.text.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-white">Unsupported layout type</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-[#333]">
          <div className="flex justify-between text-sm">
            <div className="text-gray-400">Layout: <span className="text-white">{slide.layout}</span></div>
            <div className="text-gray-400">Theme: <span className="text-white">{slide.appearance?.theme || 'Default'}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidePreviewModal;
