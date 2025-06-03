import React, { useState } from 'react';
import MediaLibraryModal from './MediaLibraryModal';

/**
 * MediaSettings component for managing media-related settings
 */
const MediaSettings = ({ formState, setFormState, editingSlide, dispatch }) => {
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const handleMediaSelect = (url) => {
    // Update local form state immediately for UI feedback
    const newUrls = [...formState.media.urls];
    newUrls[0] = url;
    setFormState({
      ...formState,
      media: {
        ...formState.media,
        urls: newUrls
      }
    });
    
    // Update Redux state
    dispatch({
      type: 'slides/updateSlide',
      payload: {
        id: editingSlide.id,
        field: 'media.urls',
        value: newUrls
      }
    });
    
    // Close the media library
    setShowMediaLibrary(false);
  };
  
  return (
    <div className="mb-6">
      {/* Media Library Modal */}
      <MediaLibraryModal 
        isOpen={showMediaLibrary}
        onClose={() => setShowMediaLibrary(false)}
        onSelect={handleMediaSelect}
        mediaType={formState.media.type}
      />
      
      <h3 className="text-lg font-medium text-white mb-3">Media</h3>
      
      {/* Media Type - Only show relevant options based on layout */}
      <div className="mb-4">
        {/* <label className="block text-gray-300 mb-2">Media Type</label> */}
        <select
          value={formState.media.type}
          onChange={(e) => {
            // Update local form state immediately for UI feedback
            setFormState({
              ...formState,
              media: {
                ...formState.media,
                type: e.target.value
              }
            });
            
            // Update Redux state
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'media.type',
                value: e.target.value
              }
            });
          }}
          className="w-full bg-[#1e1e1e] text-white p-2 rounded-md transition-all duration-300 hover:border-[#54bb74] focus:border-[#54bb74] focus:ring-1 focus:ring-[#54bb74]"
          disabled={formState.layout === 'video-background' || formState.layout === 'image-collage'}
        >
          {/* Show options based on layout */}
          {formState.layout === 'media-text-split' && (
            <>
              <option value="image">Single Image</option>
              <option value="video">Video</option>
            </>
          )}
          {formState.layout === 'video-background' && (
            <option value="video">Video</option>
          )}
          {formState.layout === 'image-collage' && (
            <option value="multipleImages">Multiple Images</option>
          )}
        </select>
        {(formState.layout === 'video-background' || formState.layout === 'image-collage') && (
          <p className="text-xs text-gray-400 mt-1">
            {formState.layout === 'video-background' ? 'Video Background layout requires video media type' : 'Image Collage layout requires multiple images'}
          </p>
        )}
      </div>
      
      {/* Media Position - Show different options based on layout */}
      {formState.layout === 'media-text-split' && (
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Text Position</label>
          <div className="grid grid-cols-2 gap-2">
            {['left', 'right'].map((pos) => (
              <button
                key={pos}
                onClick={() => {
                  setFormState({
                    ...formState,
                    media: { ...formState.media, position: pos }
                  });
                  dispatch({
                    type: 'slides/updateSlide',
                    payload: {
                      id: editingSlide.id,
                      field: 'media.position',
                      value: pos
                    }
                  });
                }}
                className={`p-2 rounded-md flex flex-col items-center transition-all duration-300 ${
                  formState.media.position === pos 
                    ? 'bg-[#54bb74] text-white' 
                    : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#333]'
                }`}
              >
                <div className="flex items-center justify-center w-full">
                  {pos === 'left' ? (
                    <>
                      <div className="w-1/3 h-6 bg-[#54bb74]/50 rounded-l"></div>
                      <div className="w-2/3 h-6 bg-[#333] rounded-r flex items-center justify-center">
                        <span className="text-xs">Text</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-2/3 h-6 bg-[#333] rounded-l flex items-center justify-center">
                        <span className="text-xs">Text</span>
                      </div>
                      <div className="w-1/3 h-6 bg-[#54bb74]/50 rounded-r"></div>
                    </>
                  )}
                </div>
                <span className="text-xs mt-1 capitalize">{pos}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Media URLs - Different UI based on layout */}
      {formState.layout === 'image-collage' ? (
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Image Gallery (Max 4 images recommended)</label>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {formState.media.urls.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={url || ''}
                  onChange={(e) => {
                    const newUrls = [...formState.media.urls];
                    newUrls[index] = e.target.value;
                    // Update local form state
                    setFormState({
                      ...formState,
                      media: {
                        ...formState.media,
                        urls: newUrls
                      }
                    });
                    // Update Redux state
                    dispatch({
                      type: 'slides/updateSlide',
                      payload: {
                        id: editingSlide.id,
                        field: 'media.urls',
                        value: newUrls
                      }
                    });
                  }}
                  className="flex-grow bg-[#1e1e1e] text-white p-2 rounded-md transition-all duration-300 hover:border-[#54bb74] focus:border-[#54bb74] focus:ring-1 focus:ring-[#54bb74]"
                  placeholder={`Image ${index + 1} URL`}
                />
                <button
                  onClick={() => {
                    const newUrls = [...formState.media.urls];
                    newUrls.splice(index, 1);
                    if (newUrls.length === 0) newUrls.push('');
                    // Update local form state
                    setFormState({
                      ...formState,
                      media: {
                        ...formState.media,
                        urls: newUrls
                      }
                    });
                    // Update Redux state
                    dispatch({
                      type: 'slides/updateSlide',
                      payload: {
                        id: editingSlide.id,
                        field: 'media.urls',
                        value: newUrls
                      }
                    });
                  }}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  disabled={formState.media.urls.length <= 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                // Limit to maximum 4 images
                if (formState.media.urls.length >= 4) {
                  setShowMediaLibrary(true);
                  return;
                }
                const newUrls = [...formState.media.urls, ''];
                // Update local form state
                setFormState({
                  ...formState,
                  media: {
                    ...formState.media,
                    urls: newUrls
                  }
                });
                // Update Redux state
                dispatch({
                  type: 'slides/updateSlide',
                  payload: {
                    id: editingSlide.id,
                    field: 'media.urls',
                    value: newUrls
                  }
                });
              }}
              className="mt-2 w-full py-2 bg-[#1e1e1e] hover:bg-[#333] text-[#54bb74] rounded-md transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Add Image
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            For best display, use exactly 4 images of similar dimensions
          </p>
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">
            {formState.media.type === 'video' ? 'Video URL/Thumbnail' : 'Image URL'}
          </label>
          <div className="flex">
            <input
              type="text"
              value={formState.media.urls[0] || ''}
              onChange={(e) => {
                // Update local form state immediately for UI feedback
                const newUrls = [...formState.media.urls];
                newUrls[0] = e.target.value;
                setFormState({
                  ...formState,
                  media: {
                    ...formState.media,
                    urls: newUrls
                  }
                });
                
                // Update Redux state
                dispatch({
                  type: 'slides/updateSlide',
                  payload: {
                    id: editingSlide.id,
                    field: 'media.urls',
                    value: newUrls
                  }
                });
              }}
              className="flex-grow bg-[#1e1e1e] text-white p-2 rounded-l-md transition-all duration-300 hover:border-[#54bb74] focus:border-[#54bb74] focus:ring-1 focus:ring-[#54bb74]"
              placeholder={formState.media.type === 'video' ? 'Enter video URL or thumbnail image' : 'Enter image URL'}
            />
            <button 
              className="bg-[#333] hover:bg-[#444] text-white px-3 rounded-r-md transition-colors"
              onClick={() => setShowMediaLibrary(true)}
            >
              Browse
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {formState.media.type === 'video' ? 
              'For video backgrounds, provide a thumbnail image URL for best results' : 
              'Enter image URL or upload from your library'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaSettings;
