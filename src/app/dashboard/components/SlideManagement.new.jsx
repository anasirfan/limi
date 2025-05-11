'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus, FaTrash, FaEdit, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import SlideEditor from '../../components/SlideCarousel/SlideEditor';
import SlideCarousel from '../../components/SlideCarousel';
import Image from 'next/image';
import { 
  addSlide, 
  removeSlide, 
  updateSlide, 
  reorderSlides, 
  setActiveSlideIndex 
} from '../../redux/slices/slidesSlice';

// Import our new sub-components
import SlidePreview from './SlidePreview';
import SlideFormFields from './SlideFormFields';

export default function SlideManagement() {
  const dispatch = useDispatch();
  const { slides, activeSlideIndex } = useSelector(state => state.slides);
  const [previewMode, setPreviewMode] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  
  // Local state for form values to ensure real-time UI updates
  const [formState, setFormState] = useState({
    layout: '',
    media: { type: 'image', position: 'left', urls: [''] },
    text: { 
      heading: '', 
      subheading: '', 
      description: '', 
      bullets: [],
      alignment: 'left',
      verticalPosition: 'center',
      showHeading: true, 
      showSubheading: true, 
      showDescription: true, 
      showBullets: false,
      ctaText: ''
    },
    appearance: { 
      theme: 'charleston', 
      backgroundColor: '#292929', 
      overlayDarken: false,
      padding: '2rem' 
    }
  });
  
  // Update formState when editingSlide changes
  useEffect(() => {
    if (editingSlide) {
      setFormState({
        layout: editingSlide.layout || '',
        media: { 
          type: editingSlide.media?.type || 'image', 
          position: editingSlide.media?.position || 'left', 
          urls: editingSlide.media?.urls || [''],
          videoUrl: editingSlide.media?.videoUrl || ''
        },
        text: { 
          heading: editingSlide.text?.heading || '', 
          subheading: editingSlide.text?.subheading || '', 
          description: editingSlide.text?.description || '', 
          bullets: editingSlide.text?.bullets || [],
          alignment: editingSlide.text?.alignment || 'left',
          verticalPosition: editingSlide.text?.verticalPosition || 'center',
          showHeading: editingSlide.text?.showHeading !== false, 
          showSubheading: editingSlide.text?.showSubheading !== false, 
          showDescription: editingSlide.text?.showDescription !== false, 
          showBullets: editingSlide.text?.showBullets || false,
          ctaText: editingSlide.text?.ctaText || ''
        },
        appearance: { 
          theme: editingSlide.appearance?.theme || 'charleston', 
          backgroundColor: editingSlide.appearance?.backgroundColor || '#292929', 
          overlayDarken: editingSlide.appearance?.overlayDarken || false,
          padding: editingSlide.appearance?.padding || '2rem' 
        }
      });
    }
  }, [editingSlide]);

  // Helper function to get theme background color
  const getThemeBackgroundColor = (themeName) => {
    const themeColors = {
      'charleston': '#292929',
      'midnight': '#1A1A2E',
      'forest': '#2D3B36',
      'ocean': '#1A3A5A',
      'sunset': '#4A3636',
      'desert': '#9C7C38',
      'custom': formState.appearance.backgroundColor || '#292929'
    };
    return themeColors[themeName] || themeColors.charleston;
  };

  // Add a new slide
  const handleAddSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      layout: 'media-text-split',
      media: { type: 'image', position: 'left', urls: [''] },
      text: { 
        heading: 'New Slide', 
        subheading: 'Add your content here', 
        alignment: 'left',
        verticalPosition: 'center',
        showHeading: true, 
        showSubheading: true, 
        showDescription: true
      },
      appearance: { 
        theme: 'charleston', 
        backgroundColor: '#292929', 
        padding: '2rem' 
      }
    };
    
    dispatch(addSlide(newSlide));
  };

  // Remove a slide
  const handleRemoveSlide = (slideId) => {
    dispatch(removeSlide(slideId));
  };

  // Edit a slide
  const handleEditSlide = (slide) => {
    setEditingSlide(slide);
    setEditModalOpen(true);
  };

  // Move slide up in order
  const handleMoveUp = (index) => {
    if (index > 0) {
      dispatch(reorderSlides({ fromIndex: index, toIndex: index - 1 }));
    }
  };

  // Move slide down in order
  const handleMoveDown = (index) => {
    if (index < slides.length - 1) {
      dispatch(reorderSlides({ fromIndex: index, toIndex: index + 1 }));
    }
  };

  // Save edited slide
  const handleSaveSlide = () => {
    if (editingSlide) {
      const updatedSlide = {
        ...editingSlide,
        layout: formState.layout,
        media: formState.media,
        text: formState.text,
        appearance: formState.appearance
      };
      
      dispatch(updateSlide(updatedSlide));
      setEditModalOpen(false);
      setEditingSlide(null);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditingSlide(null);
  };

  // Set active slide for preview
  const handleSetActiveSlide = (index) => {
    dispatch(setActiveSlideIndex(index));
  };

  // Get current theme
  const theme = useMemo(() => {
    return {
      bg: getThemeBackgroundColor(formState.appearance.theme),
      text: formState.appearance.theme === 'charleston' ? '#FFFFFF' : '#FFFFFF',
      accent: '#F4B942',
      buttonGradient: 'linear-gradient(90deg, #F4B942 0%, #F4D58D 100%)',
      bulletStyle: 'bg-amber-400'
    };
  }, [formState.appearance.theme]);

  return (
    <div className="slide-management p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Slide Management</h2>
        <div className="flex space-x-3">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
            onClick={handleAddSlide}
          >
            <FaPlus className="mr-2" />
            Add Slide
          </button>
          <button
            className={`px-4 py-2 ${previewMode ? 'bg-gray-600' : 'bg-gray-200'} text-${previewMode ? 'white' : 'gray-800'} rounded-md`}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Exit Preview' : 'Preview All'}
          </button>
        </div>
      </div>

      {previewMode ? (
        <div className="preview-mode">
          <SlideCarousel slides={slides} activeIndex={activeSlideIndex} />
        </div>
      ) : (
        <div className="slide-list space-y-4">
          {slides.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
              <p className="text-gray-500 mb-4">No slides yet. Add your first slide to get started.</p>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center mx-auto"
                onClick={handleAddSlide}
              >
                <FaPlus className="mr-2" />
                Add Slide
              </button>
            </div>
          ) : (
            slides.map((slide, index) => (
              <div 
                key={slide.id} 
                className={`slide-item p-4 border rounded-lg flex items-center ${index === activeSlideIndex ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => handleSetActiveSlide(index)}
              >
                <div className="slide-number w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  {index + 1}
                </div>
                
                <div className="slide-preview-thumbnail w-24 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                  {slide.media?.urls && slide.media.urls[0] && (
                    <img 
                      src={slide.media.urls[0]} 
                      alt="Slide preview" 
                      className="w-full h-full object-cover"
                    />
                  )}
                  {(!slide.media?.urls || !slide.media.urls[0]) && slide.media?.videoUrl && (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <FaVideo className="text-white" />
                    </div>
                  )}
                  {(!slide.media?.urls || !slide.media.urls[0]) && !slide.media?.videoUrl && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs text-gray-400">No media</span>
                    </div>
                  )}
                </div>
                
                <div className="slide-info flex-1">
                  <h3 className="font-medium">{slide.text?.heading || 'Untitled Slide'}</h3>
                  <p className="text-sm text-gray-500">{slide.layout || 'No layout selected'}</p>
                </div>
                
                <div className="slide-actions flex space-x-2">
                  <button
                    className="p-2 text-gray-500 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveUp(index);
                    }}
                    disabled={index === 0}
                  >
                    <FaArrowUp className={index === 0 ? 'opacity-30' : ''} />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveDown(index);
                    }}
                    disabled={index === slides.length - 1}
                  >
                    <FaArrowDown className={index === slides.length - 1 ? 'opacity-30' : ''} />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSlide(slide);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSlide(slide.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Edit Slide</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCancelEdit}
              >
                &times;
              </button>
            </div>
            
            <div className="flex h-[80vh]">
              {/* Form Fields */}
              <div className="w-1/2 p-4 overflow-y-auto">
                <SlideFormFields 
                  formState={formState}
                  setFormState={setFormState}
                />
              </div>
              
              {/* Preview */}
              <div className="w-1/2 p-4 bg-gray-100">
                <div className="h-full flex flex-col">
                  <h4 className="text-lg font-semibold mb-2">Preview</h4>
                  <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-inner">
                    <SlidePreview 
                      formState={formState}
                      theme={theme}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t flex justify-end space-x-3">
              <button
                className="px-4 py-2 border rounded-md"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleSaveSlide}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
