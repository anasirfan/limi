'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus, FaTrash, FaEdit, FaArrowUp, FaArrowDown, FaImage, FaVideo, FaColumns, FaLayerGroup } from 'react-icons/fa';
import SlideEditor from '../../components/SlideCarousel/SlideEditor';
import SlideCarousel from '../../components/SlideCarousel';
import { 
  addSlide, 
  removeSlide, 
  updateSlide, 
  reorderSlides, 
  setActiveSlideIndex 
} from '../../redux/slices/slidesSlice';

// Import sub-components
import Header from './SlideManagement/Header';
import PresentationSettings from './SlideManagement/PresentationSettings';
import SlidePreview from './SlideManagement/SlidePreview';
import SlideList from './SlideManagement/SlideList';
import EditModal from './SlideManagement/EditModal';

// Import utility functions
import { getThemeBackgroundColor, getThemeStyles } from './SlideManagement/utils/themeUtils';

export default function SlideManagement() {
  const dispatch = useDispatch();
  const { slides, activeSlideIndex } = useSelector(state => state.slides);
  const [previewMode, setPreviewMode] = useState(false);
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
      showBullets: false 
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
          urls: [...(editingSlide.media?.urls || [''])],
        },
        text: {
          heading: editingSlide.text?.heading || '',
          subheading: editingSlide.text?.subheading || '',
          description: editingSlide.text?.description || '',
          bullets: [...(editingSlide.text?.bullets || [])],
          alignment: editingSlide.text?.alignment || 'left',
          verticalPosition: editingSlide.text?.verticalPosition || 'center',
          showHeading: editingSlide.text?.showHeading !== undefined ? editingSlide.text.showHeading : true,
          showSubheading: editingSlide.text?.showSubheading !== undefined ? editingSlide.text.showSubheading : true,
          showDescription: editingSlide.text?.showDescription !== undefined ? editingSlide.text.showDescription : true,
          showBullets: editingSlide.text?.showBullets !== undefined ? editingSlide.text.showBullets : false,
        },
        appearance: {
          theme: editingSlide.appearance?.theme || 'charleston',
          backgroundColor: editingSlide.appearance?.backgroundColor || '#292929',
          overlayDarken: editingSlide.appearance?.overlayDarken !== undefined ? editingSlide.appearance.overlayDarken : false,
          padding: editingSlide.appearance?.padding || '2rem',
        }
      });
    }
  }, [editingSlide]);
  
  const [presentationSettings, setPresentationSettings] = useState({
    title: 'Presentation',
    subtitle: 'Interactive presentation for {customerName}'
  });
  
  // Load presentation settings from localStorage on component mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('presentationSettings');
      if (savedSettings) {
        setPresentationSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading presentation settings:', error);
    }
  }, []);

  // Handle adding a new slide
  const handleAddSlide = (layout) => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      layout,
      media: {
        type: layout === 'video-background' ? 'video' : 'image',
        urls: [layout === 'video-background' ? '/videos/sample.mp4' : '/images/sample.jpg'],
        position: layout === 'media-text-split' ? 'left' : 'background',
      },
      text: {
        heading: `New ${layout} Slide`,
        subheading: 'Click to edit',
        description: 'Edit this slide content',
        bullets: ['Feature 1', 'Feature 2', 'Feature 3'],
        alignment: 'left',
        verticalPosition: 'center',
        showBullets: true,
      },
      appearance: {
        theme: 'charleston',
        backgroundColor: '#2B2D2F',
        overlayDarken: false,
        padding: '2rem',
      },
      meta: {
        index: slides.length,
        status: 'draft',
        updatedAt: new Date().toISOString()
      }
    };
    
    dispatch(addSlide(newSlide));
  };

  // Toggle between edit and preview modes
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Handle opening the edit modal for a slide
  const handleEditSlide = (slide) => {
    setEditingSlide(slide);
    setEditModalOpen(true);
  };

  // Handle saving changes
  const handleSaveChanges = () => {
    // Save slides to localStorage for persistence
    localStorage.setItem('slides', JSON.stringify(slides));
    
    // Save presentation settings
    localStorage.setItem('presentationSettings', JSON.stringify(presentationSettings));
    
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
    
    alert('Slides saved successfully! Changes will be reflected on the customer page.');
  };

  return (
    <div className="bg-[#1e1e1e] rounded-lg shadow-lg p-6">
      {/* Header Component */}
      <Header 
        togglePreviewMode={togglePreviewMode}
        previewMode={previewMode}
        handleSaveChanges={handleSaveChanges}
      />
      
      {/* Presentation Settings Component */}
      <PresentationSettings 
        presentationSettings={presentationSettings}
        setPresentationSettings={setPresentationSettings}
      />

      {/* Main Content */}
      {previewMode ? (
        <SlidePreview />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slide List Component */}
          <SlideList 
            slides={slides}
            activeSlideIndex={activeSlideIndex}
            handleAddSlide={handleAddSlide}
            handleEditSlide={handleEditSlide}
            dispatch={dispatch}
            setActiveSlideIndex={setActiveSlideIndex}
            removeSlide={removeSlide}
            reorderSlides={reorderSlides}
          />

          {/* Slide Editor */}
          <div className="lg:col-span-2 bg-[#292929] p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-white">Edit Slide</h3>
            {slides.length > 0 ? (
              <SlideEditor />
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p>Select a slide to edit or create a new one</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal Component */}
      {editModalOpen && editingSlide && (
        <EditModal 
          editingSlide={editingSlide}
          formState={formState}
          setFormState={setFormState}
          setEditModalOpen={setEditModalOpen}
          dispatch={dispatch}
          slides={slides}
        />
      )}
    </div>
  );
}
