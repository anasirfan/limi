import React from 'react';
import { FaColumns, FaVideo, FaLayerGroup } from 'react-icons/fa';

/**
 * LayoutSelector component for selecting the slide layout
 */
const LayoutSelector = ({ formState, setFormState, editingSlide, dispatch }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-white mb-3">Layout</h3>
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => {
            // Update local form state immediately for UI feedback
            setFormState({
              ...formState,
              layout: 'media-text-split',
              // Set default options for this layout
              media: {
                ...formState.media,
                type: 'image',
                position: 'left'
              }
            });
            
            // Update Redux state
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'layout',
                value: 'media-text-split'
              }
            });
            
            // Update media position to match layout
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'media.position',
                value: 'left'
              }
            });
            
            // Save to localStorage
            setTimeout(() => {
              localStorage.setItem('slides', JSON.stringify(slides));
              window.dispatchEvent(new Event('slidesUpdated'));
            }, 100);
          }}
          className={`p-3 rounded-md flex flex-col items-center transition-all duration-300 ${
            formState.layout === 'media-text-split' 
              ? 'bg-[#54bb74] text-white scale-105 shadow-lg' 
              : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#333] hover:scale-105'
          }`}
        >
          <FaColumns className="text-2xl mb-2" />
          <span className="text-sm">Media + Text</span>
        </button>
        <button
          onClick={() => {
            // Update local form state immediately for UI feedback
            setFormState({
              ...formState,
              layout: 'video-background',
              // Set default options for this layout
              media: {
                ...formState.media,
                type: 'video',
                position: 'background'
              },
              text: {
                ...formState.text,
                alignment: 'center'
              }
            });
            
            // Update Redux state
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'layout',
                value: 'video-background'
              }
            });
            
            // Update media type and position to match layout
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'media.type',
                value: 'video'
              }
            });
            
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'media.position',
                value: 'background'
              }
            });
          }}
          className={`p-3 rounded-md flex flex-col items-center transition-all duration-300 ${
            formState.layout === 'video-background' 
              ? 'bg-[#54bb74] text-white scale-105 shadow-lg' 
              : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#333] hover:scale-105'
          }`}
        >
          <FaVideo className="text-2xl mb-2" />
          <span className="text-sm">Video Background</span>
        </button>
        <button
          onClick={() => {
            // Update local form state immediately for UI feedback
            setFormState({
              ...formState,
              layout: 'image-collage',
              // Set default options for this layout
              media: {
                ...formState.media,
                type: 'multipleImages',
                position: 'grid'
              }
            });
            
            // Update Redux state
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'layout',
                value: 'image-collage'
              }
            });
            
            // Update media type to match layout
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'media.type',
                value: 'multipleImages'
              }
            });
            
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'media.position',
                value: 'grid'
              }
            });
          }}
          className={`p-3 rounded-md flex flex-col items-center transition-all duration-300 ${
            formState.layout === 'image-collage' 
              ? 'bg-[#54bb74] text-white scale-105 shadow-lg' 
              : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#333] hover:scale-105'
          }`}
        >
          <FaLayerGroup className="text-2xl mb-2" />
          <span className="text-sm">Image Collage</span>
        </button>
      </div>
    </div>
  );
};

export default LayoutSelector;
