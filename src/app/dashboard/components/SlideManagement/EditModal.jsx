import React, { useState } from 'react';
import { FaColumns, FaVideo, FaLayerGroup, FaUpload, FaSpinner } from 'react-icons/fa';
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
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setUploadingMedia(true);
    setUploadError(null);
    setUploadSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('https://reality-season-ease-iraqi.trycloudflare.com/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update form state with the new media URL
      const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
      
      setFormState(prevState => ({
        ...prevState,
        media: {
          ...prevState.media,
          type: mediaType,
          urls: [data.url || data.fileUrl || data.file_url || ''],
        }
      }));
      
      // Also update Redux directly
      dispatch({
        type: 'slides/updateSlide',
        payload: {
          id: editingSlide.id,
          field: 'media',
          value: {
            ...formState.media,
            type: mediaType,
            urls: [data.url || data.fileUrl || data.file_url || ''],
          }
        }
      });
      
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(error.message || 'Failed to upload file. Please try again or contact support.');
    } finally {
      setUploadingMedia(false);
    }
  };
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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-[9999] pt-16 md:pt-24 pb-10">
      <div className="bg-[#292929] rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-5xl overflow-y-auto mt-4 mb-8" style={{ maxHeight: 'min(85vh, 900px)', height: 'auto' }}>
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
            
            {/* File Upload Section */}
            <div className="bg-[#1e1e1e] p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">Upload Media File</h3>
              <div className="mb-3">
                <p className="text-gray-300 text-sm mb-2">Upload an image or video file directly:</p>
                <div className="flex items-center">
                  <label className="flex items-center justify-center bg-[#333] hover:bg-[#444] text-white px-4 py-2 rounded-md cursor-pointer transition-colors">
                    <FaUpload className="mr-2" />
                    {uploadingMedia ? 'Uploading...' : 'Choose File'}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,video/*" 
                      onChange={handleFileUpload}
                      disabled={uploadingMedia}
                    />
                  </label>
                  {uploadingMedia && <FaSpinner className="ml-3 text-[#54bb74] animate-spin" />}
                </div>
                {uploadSuccess && (
                  <div className="mt-2 text-[#54bb74] text-sm">
                    File uploaded successfully! The media has been updated.
                  </div>
                )}
                {uploadError && (
                  <div className="mt-2 text-red-400 text-sm">
                    Error: {uploadError}
                  </div>
                )}
              </div>
              <div className="text-gray-400 text-xs">
                <p>Supported formats: JPG, PNG, GIF, MP4, WebM</p>
                <p>Max file size: 10MB</p>
                <p>Files will be uploaded to our secure server</p>
              </div>
            </div>
            
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
