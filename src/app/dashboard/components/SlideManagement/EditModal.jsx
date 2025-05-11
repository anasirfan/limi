import React from 'react';
import { FaColumns, FaVideo, FaLayerGroup } from 'react-icons/fa';
import { getThemeStyles, getThemeBackgroundColor } from './utils/themeUtils';

// Import sub-components
import LayoutSelector from './EditModalComponents/LayoutSelector';
import MediaSettings from './EditModalComponents/MediaSettings';
import AppearanceSettings from './EditModalComponents/AppearanceSettings';
import TextSettings from './EditModalComponents/TextSettings';
import SlidePreviewPane from './EditModalComponents/SlidePreviewPane';

/**
 * EditModal component for editing slide properties
 */
const EditModal = ({ 
  editingSlide, 
  formState, 
  setFormState, 
  setEditModalOpen, 
  dispatch, 
  slides
}) => {
  const handleSaveChanges = () => {
    // Apply all form state changes to Redux at once
    // This ensures all changes are saved even if some weren't triggered by onChange events
    
    // Update layout
    dispatch({
      type: 'slides/updateSlide',
      payload: {
        id: editingSlide.id,
        field: 'layout',
        value: formState.layout
      }
    });
    
    // Update media
    dispatch({
      type: 'slides/updateSlide',
      payload: {
        id: editingSlide.id,
        field: 'media',
        value: formState.media
      }
    });
    
    // Update text
    dispatch({
      type: 'slides/updateSlide',
      payload: {
        id: editingSlide.id,
        field: 'text',
        value: formState.text
      }
    });
    
    // Update appearance
    dispatch({
      type: 'slides/updateSlide',
      payload: {
        id: editingSlide.id,
        field: 'appearance',
        value: formState.appearance
      }
    });
    
    // Save slides to localStorage for persistence
    localStorage.setItem('slides', JSON.stringify(slides));
    
    // Dispatch a custom event to notify other components
    const event = new Event('slidesUpdated');
    window.dispatchEvent(event);
    
    // Also trigger a storage event for cross-tab communication
    const storageEvent = new StorageEvent('storage', {
      key: 'slides',
      newValue: JSON.stringify(slides),
      url: window.location.href
    });
    window.dispatchEvent(storageEvent);
    
    setEditModalOpen(false);
  };
  
  // If no slide is being edited, don't render the modal
  if (!editingSlide) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-50 pt-24 pb-10">
      <div className="bg-[#292929] rounded-lg p-8 w-full max-w-5xl max-h-[80vh] overflow-y-auto mt-8 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Edit Slide</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveChanges}
              className="bg-[#54bb74] hover:bg-[#4ca868] text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Save Changes
            </button>
            <button 
              onClick={() => setEditModalOpen(false)}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#3a3a3a] transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Layout & Media */}
          <div>
            <LayoutSelector 
              formState={formState}
              setFormState={setFormState}
              editingSlide={editingSlide}
              dispatch={dispatch}
            />
            
            <MediaSettings 
              formState={formState}
              setFormState={setFormState}
              editingSlide={editingSlide}
              dispatch={dispatch}
            />
            
            <AppearanceSettings 
              formState={formState}
              setFormState={setFormState}
              editingSlide={editingSlide}
              dispatch={dispatch}
              getThemeBackgroundColor={getThemeBackgroundColor}
            />
          </div>
          
          {/* Right Column - Text Content & Preview */}
          <div>
            <TextSettings 
              formState={formState}
              setFormState={setFormState}
              editingSlide={editingSlide}
              dispatch={dispatch}
            />
            
            <SlidePreviewPane 
              formState={formState}
              getThemeStyles={getThemeStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
