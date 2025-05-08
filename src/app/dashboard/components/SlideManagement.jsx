'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

// No longer using react-beautiful-dnd, using manual reordering instead

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

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex !== destinationIndex) {
      dispatch(reorderSlides({ sourceIndex, destinationIndex }));
    }
  };

  // Handle adding a new slide
  const handleAddSlide = (layout) => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      layout,
      media: {
        type: layout === 'video-bg-text' ? 'video' : 'image',
        urls: [layout === 'video-bg-text' ? '/videos/sample.mp4' : '/images/sample.jpg'],
        position: layout === 'media-text-split' ? 'left' : layout === 'video-bg-text' ? 'background' : 'overlap',
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

  return (
    <div className="bg-[#1e1e1e] rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#93cfa2]">Slide Management</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => {
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
            }}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={togglePreviewMode}
            className={`px-4 py-2 rounded-md transition-colors ${
              previewMode 
                ? 'bg-[#54bb74] text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {previewMode ? 'Exit Preview' : 'Preview Slides'}
          </button>
        </div>
      </div>
      
      {/* Presentation Settings */}
      <div className="bg-[#292929] p-4 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Presentation Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Presentation Title</label>
            <input
              type="text"
              value={presentationSettings.title}
              onChange={(e) => {
                setPresentationSettings({
                  ...presentationSettings,
                  title: e.target.value
                });
                
                // Save to localStorage immediately
                setTimeout(() => {
                  localStorage.setItem('presentationSettings', JSON.stringify({
                    ...presentationSettings,
                    title: e.target.value
                  }));
                  window.dispatchEvent(new Event('slidesUpdated'));
                }, 100);
              }}
              className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
              placeholder="Presentation"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Presentation Subtitle</label>
            <input
              type="text"
              value={presentationSettings.subtitle}
              onChange={(e) => {
                setPresentationSettings({
                  ...presentationSettings,
                  subtitle: e.target.value
                });
                
                // Save to localStorage immediately
                setTimeout(() => {
                  localStorage.setItem('presentationSettings', JSON.stringify({
                    ...presentationSettings,
                    subtitle: e.target.value
                  }));
                  window.dispatchEvent(new Event('slidesUpdated'));
                }, 100);
              }}
              className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
              placeholder="Interactive presentation for {customerName}"
            />
            <p className="text-xs text-gray-400 mt-1">Use customerName to insert the customer's name</p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && editingSlide && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-50 pt-24 pb-10">
          <div className="bg-[#292929] rounded-lg p-8 w-full max-w-5xl max-h-[80vh] overflow-y-auto mt-8 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Edit Slide</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    // Apply all form state changes to Redux at once
                    // This ensures all changes are saved even if some weren't triggered by onChange events
                    
                    // Update layout
                    dispatch(updateSlide({
                      id: editingSlide.id,
                      field: 'layout',
                      value: formState.layout
                    }));
                    
                    // Update media
                    dispatch(updateSlide({
                      id: editingSlide.id,
                      field: 'media',
                      value: formState.media
                    }));
                    
                    // Update text
                    dispatch(updateSlide({
                      id: editingSlide.id,
                      field: 'text',
                      value: formState.text
                    }));
                    
                    // Update appearance
                    dispatch(updateSlide({
                      id: editingSlide.id,
                      field: 'appearance',
                      value: formState.appearance
                    }));
                    
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
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
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
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">Layout</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => {
                        // Update local form state immediately for UI feedback
                        setFormState({
                          ...formState,
                          layout: 'media-text-split'
                        });
                        
                        // Update Redux state
                        dispatch(updateSlide({
                          id: editingSlide.id,
                          field: 'layout',
                          value: 'media-text-split'
                        }));
                        
                        // Save to localStorage
                        setTimeout(() => {
                          localStorage.setItem('slides', JSON.stringify(slides));
                          window.dispatchEvent(new Event('slidesUpdated'));
                        }, 100);
                      }}
                      className={`p-3 rounded-md flex flex-col items-center ${
                        formState.layout === 'media-text-split' 
                          ? 'bg-[#54bb74] text-white' 
                          : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#333]'
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
                          layout: 'video-background'
                        });
                        
                        // Update Redux state
                        dispatch(updateSlide({
                          id: editingSlide.id,
                          field: 'layout',
                          value: 'video-background'
                        }));
                        
                        // Save to localStorage
                        setTimeout(() => {
                          localStorage.setItem('slides', JSON.stringify(slides));
                          window.dispatchEvent(new Event('slidesUpdated'));
                        }, 100);
                      }}
                      className={`p-3 rounded-md flex flex-col items-center ${
                        formState.layout === 'video-background' 
                          ? 'bg-[#54bb74] text-white' 
                          : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#333]'
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
                          layout: 'image-collage'
                        });
                        
                        // Update Redux state
                        dispatch(updateSlide({
                          id: editingSlide.id,
                          field: 'layout',
                          value: 'image-collage'
                        }));
                        
                        // Save to localStorage
                        setTimeout(() => {
                          localStorage.setItem('slides', JSON.stringify(slides));
                          window.dispatchEvent(new Event('slidesUpdated'));
                        }, 100);
                      }}
                      className={`p-3 rounded-md flex flex-col items-center ${
                        formState.layout === 'image-collage' 
                          ? 'bg-[#54bb74] text-white' 
                          : 'bg-[#1e1e1e] text-gray-300 hover:bg-[#333]'
                      }`}
                    >
                      <FaLayerGroup className="text-2xl mb-2" />
                      <span className="text-sm">Image Collage</span>
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">Media</h3>
                  
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Media Type</label>
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
                        dispatch(updateSlide({
                          id: editingSlide.id,
                          field: 'media.type',
                          value: e.target.value
                        }));
                        
                        // Save to localStorage
                        setTimeout(() => {
                          localStorage.setItem('slides', JSON.stringify(slides));
                          window.dispatchEvent(new Event('slidesUpdated'));
                        }, 100);
                      }}
                      className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="multipleImages">Multiple Images</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Media URL</label>
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
                        dispatch(updateSlide({
                          id: editingSlide.id,
                          field: 'media.urls',
                          value: newUrls
                        }));
                        
                        // Save to localStorage
                        setTimeout(() => {
                          localStorage.setItem('slides', JSON.stringify(slides));
                          window.dispatchEvent(new Event('slidesUpdated'));
                        }, 100);
                      }}
                      className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                      placeholder="Enter URL for image or video"
                    />
                  </div>
                  
                  {(editingSlide.media && editingSlide.media.type === 'multipleImages') && (
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">Additional Image URLs</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={(editingSlide.media && editingSlide.media.urls && editingSlide.media.urls[1]) || ''}
                          onChange={(e) => {
                            const urls = [...(editingSlide.media.urls || [''])];
                            urls[1] = e.target.value;
                            dispatch(updateSlide({
                              id: editingSlide.id,
                              field: 'media.urls',
                              value: urls
                            }));
                            
                            // Save to localStorage immediately
                            setTimeout(() => {
                              localStorage.setItem('slides', JSON.stringify(slides));
                              window.dispatchEvent(new Event('slidesUpdated'));
                            }, 100);
                          }}
                          className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                          placeholder="Second image URL"
                        />
                        <input
                          type="text"
                          value={(editingSlide.media && editingSlide.media.urls && editingSlide.media.urls[2]) || ''}
                          onChange={(e) => {
                            const urls = [...(editingSlide.media.urls || ['', ''])];
                            urls[2] = e.target.value;
                            dispatch(updateSlide({
                              id: editingSlide.id,
                              field: 'media.urls',
                              value: urls
                            }));
                            
                            // Save to localStorage immediately
                            setTimeout(() => {
                              localStorage.setItem('slides', JSON.stringify(slides));
                              window.dispatchEvent(new Event('slidesUpdated'));
                            }, 100);
                          }}
                          className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                          placeholder="Third image URL"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Media Position</label>
                    <select
                      value={(editingSlide.media && editingSlide.media.position) || 'left'}
                      onChange={(e) => {
                        dispatch(updateSlide({
                          id: editingSlide.id,
                          field: 'media.position',
                          value: e.target.value
                        }));
                        
                        // Save to localStorage immediately
                        setTimeout(() => {
                          localStorage.setItem('slides', JSON.stringify(slides));
                          window.dispatchEvent(new Event('slidesUpdated'));
                        }, 100);
                      }}
                      className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                    >
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                      <option value="background">Background</option>
                      <option value="overlap">Overlap</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">Appearance</h3>
                  
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Theme</label>
                    <select
                      value={formState.appearance.theme}
                      onChange={(e) => {
                        // Update local form state immediately for UI feedback
                        setFormState({
                          ...formState,
                          appearance: {
                            ...formState.appearance,
                            theme: e.target.value
                          }
                        });
                        
                        // Update Redux state
                        dispatch(updateSlide({
                          id: editingSlide.id,
                          field: 'appearance.theme',
                          value: e.target.value
                        }));
                      }}
                      className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                    >
                      <option value="charleston">Charleston Green</option>
                      <option value="emerald">Emerald</option>
                      <option value="eton">Eton</option>
                      <option value="beige">Soft Beige</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Background Color</label>
                    <input
                      type="text"
                      value={formState.appearance.backgroundColor}
                      onChange={(e) => {
                        // Update local form state immediately for UI feedback
                        setFormState({
                          ...formState,
                          appearance: {
                            ...formState.appearance,
                            backgroundColor: e.target.value
                          }
                        });
                        
                        // Update Redux state
                        dispatch(updateSlide({
                          id: editingSlide.id,
                          field: 'appearance.backgroundColor',
                          value: e.target.value
                        }));
                      }}
                      className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                      placeholder="#292929"
                    />
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="overlayDarken"
                      checked={formState.appearance.overlayDarken}
                      onChange={(e) => {
                        // Update local form state immediately for UI feedback
                        setFormState({
                          ...formState,
                          appearance: {
                            ...formState.appearance,
                            overlayDarken: e.target.checked
                          }
                        });
                        
                        // Update Redux state
                        dispatch(updateSlide({
                          id: editingSlide.id,
                          field: 'appearance.overlayDarken',
                          value: e.target.checked
                        }));
                      }}
                      className="mr-2"
                    />
                    <label htmlFor="overlayDarken" className="text-gray-300">Darken Overlay</label>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Text Content */}
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">Text Content</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        id="showHeading"
                        checked={formState.text.showHeading}
                        onChange={(e) => {
                          // Update local form state immediately for UI feedback
                          setFormState({
                            ...formState,
                            text: {
                              ...formState.text,
                              showHeading: e.target.checked
                            }
                          });
                          
                          // Update Redux state
                          if (!editingSlide.text) {
                            dispatch(updateSlide({
                              id: editingSlide.id,
                              field: 'text',
                              value: { showHeading: e.target.checked }
                            }));
                          } else {
                            dispatch(updateSlide({
                              id: editingSlide.id,
                              field: 'text.showHeading',
                              value: e.target.checked
                            }));
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="showHeading" className="text-gray-300">Show Heading</label>
                    </div>
                    
                    <input
                      type="text"
                      value={formState.text.heading}
                      onChange={(e) => {
                        // Update local form state immediately for UI feedback
                        setFormState({
                          ...formState,
                          text: {
                            ...formState.text,
                            heading: e.target.value
                          }
                        });
                        
                        // Update Redux state
                        if (!editingSlide.text) {
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text',
                            value: { heading: e.target.value }
                          }));
                        } else {
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text.heading',
                            value: e.target.value
                          }));
                        }
                      }}
                      className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                      placeholder="Main Heading"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-3">
                      <input
                        type="checkbox"
                        id="showSubheading"
                        checked={formState.text.showSubheading}
                        onChange={(e) => {
                          // Update local form state immediately for UI feedback
                          setFormState({
                            ...formState,
                            text: {
                              ...formState.text,
                              showSubheading: e.target.checked
                            }
                          });
                          
                          // Update Redux state
                          if (!editingSlide.text) {
                            dispatch(updateSlide({
                              id: editingSlide.id,
                              field: 'text',
                              value: { showSubheading: e.target.checked }
                            }));
                          } else {
                            dispatch(updateSlide({
                              id: editingSlide.id,
                              field: 'text.showSubheading',
                              value: e.target.checked
                            }));
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="showSubheading" className="text-gray-300">Show Subheading</label>
                    </div>
                    
                    <input
                      type="text"
                      value={formState.text.subheading}
                      onChange={(e) => {
                        // Update local form state immediately for UI feedback
                        setFormState({
                          ...formState,
                          text: {
                            ...formState.text,
                            subheading: e.target.value
                          }
                        });
                        
                        // Update Redux state
                        if (!editingSlide.text) {
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text',
                            value: { subheading: e.target.value }
                          }));
                        } else {
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text.subheading',
                            value: e.target.value
                          }));
                        }
                      }}
                      className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                      placeholder="Subheading"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Description (Max 300 characters)</label>
                    <textarea
                      value={formState.text.description}
                      onChange={(e) => {
                        // Limit to 300 characters
                        const limitedText = e.target.value.slice(0, 300);
                        
                        // Update local form state immediately for UI feedback
                        setFormState({
                          ...formState,
                          text: {
                            ...formState.text,
                            description: limitedText
                          }
                        });
                        
                        // Update Redux state
                        if (!editingSlide.text) {
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text',
                            value: { description: limitedText }
                          }));
                        } else {
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text.description',
                            value: limitedText
                          }));
                        }
                      }}
                      className="w-full bg-[#1e1e1e] text-white p-2 rounded-md h-24"
                      placeholder="Detailed description..."
                      maxLength={300}
                    />
                    <div className="flex justify-end">
                      <span className="text-xs text-gray-400 mt-1">
                        {formState.text.description.length}/300
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Text Alignment</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          // Update local form state immediately for UI feedback
                          setFormState({
                            ...formState,
                            text: {
                              ...formState.text,
                              alignment: 'left'
                            }
                          });
                          
                          // Update Redux state
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text.alignment',
                            value: 'left'
                          }));
                        }}
                        className={`p-2 rounded-md ${formState.text.alignment === 'left' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
                      >
                        Left
                      </button>
                      <button
                        onClick={() => {
                          // Update local form state immediately for UI feedback
                          setFormState({
                            ...formState,
                            text: {
                              ...formState.text,
                              alignment: 'center'
                            }
                          });
                          
                          // Update Redux state
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text.alignment',
                            value: 'center'
                          }));
                        }}
                        className={`p-2 rounded-md ${formState.text.alignment === 'center' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
                      >
                        Center
                      </button>
                      <button
                        onClick={() => {
                          // Update local form state immediately for UI feedback
                          setFormState({
                            ...formState,
                            text: {
                              ...formState.text,
                              alignment: 'right'
                            }
                          });
                          
                          // Update Redux state
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text.alignment',
                            value: 'right'
                          }));
                        }}
                        className={`p-2 rounded-md ${formState.text.alignment === 'right' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
                      >
                        Right
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Vertical Position</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          // Update local form state immediately for UI feedback
                          setFormState({
                            ...formState,
                            text: {
                              ...formState.text,
                              verticalPosition: 'top'
                            }
                          });
                          
                          // Update Redux state
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text.verticalPosition',
                            value: 'top'
                          }));
                        }}
                        className={`p-2 rounded-md ${formState.text.verticalPosition === 'top' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
                      >
                        Top
                      </button>
                      <button
                        onClick={() => {
                          // Update local form state immediately for UI feedback
                          setFormState({
                            ...formState,
                            text: {
                              ...formState.text,
                              verticalPosition: 'center'
                            }
                          });
                          
                          // Update Redux state
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text.verticalPosition',
                            value: 'center'
                          }));
                        }}
                        className={`p-2 rounded-md ${formState.text.verticalPosition === 'center' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
                      >
                        Center
                      </button>
                      <button
                        onClick={() => {
                          // Update local form state immediately for UI feedback
                          setFormState({
                            ...formState,
                            text: {
                              ...formState.text,
                              verticalPosition: 'bottom'
                            }
                          });
                          
                          // Update Redux state
                          dispatch(updateSlide({
                            id: editingSlide.id,
                            field: 'text.verticalPosition',
                            value: 'bottom'
                          }));
                        }}
                        className={`p-2 rounded-md ${formState.text.verticalPosition === 'bottom' ? 'bg-[#54bb74] text-white' : 'bg-[#1e1e1e] text-gray-300'}`}
                      >
                        Bottom
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-gray-300">Bullet Points</label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="showBullets"
                          checked={formState.text.showBullets}
                          onChange={(e) => {
                            // Update local form state immediately for UI feedback
                            setFormState({
                              ...formState,
                              text: {
                                ...formState.text,
                                showBullets: e.target.checked
                              }
                            });
                            
                            // Update Redux state
                            dispatch(updateSlide({
                              id: editingSlide.id,
                              field: 'text.showBullets',
                              value: e.target.checked
                            }));
                          }}
                          className="mr-2"
                        />
                        <label htmlFor="showBullets" className="text-gray-300">Show Bullets</label>
                      </div>
                    </div>
                    
                    {formState.text.showBullets && (
                      <div>
                        <div className="space-y-2 mb-2">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="text"
                                value={(formState.text.bullets[index]) || ''}
                                onChange={(e) => {
                                  // Update local form state immediately for UI feedback
                                  const newBullets = [...formState.text.bullets];
                                  newBullets[index] = e.target.value;
                                  setFormState({
                                    ...formState,
                                    text: {
                                      ...formState.text,
                                      bullets: newBullets
                                    }
                                  });
                                  
                                  // Update Redux state
                                  dispatch(updateSlide({
                                    id: editingSlide.id,
                                    field: 'text.bullets',
                                    value: newBullets
                                  }));
                                }}
                                className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
                                placeholder={`Bullet point ${index + 1}`}
                                maxLength={50}
                              />
                              {index > 2 && (
                                <button
                                  onClick={() => {
                                    // Update local form state immediately for UI feedback
                                    const newBullets = [...formState.text.bullets];
                                    newBullets.splice(index, 1);
                                    setFormState({
                                      ...formState,
                                      text: {
                                        ...formState.text,
                                        bullets: newBullets
                                      }
                                    });
                                    
                                    // Update Redux state
                                    dispatch(updateSlide({
                                      id: editingSlide.id,
                                      field: 'text.bullets',
                                      value: newBullets
                                    }));
                                  }}
                                  className="ml-2 text-red-400 hover:text-red-300"
                                  title="Remove bullet point"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">Each bullet point limited to 50 characters. First 3 are required, additional 3 are optional.</p>
                      </div>
                    )}
                  </div>
                
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">Slide Preview</h3>
                  <div className="bg-[#1e1e1e] rounded-lg p-4 h-64 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <p>Preview of slide layout and content</p>
                      <p className="text-sm mt-2">{editingSlide.text?.heading || 'Heading'}</p>
                      <p className="text-xs mt-1">{editingSlide.text?.subheading || 'Subheading'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom padding */}
            <div className="h-6"></div>
          </div>
        </div>
      )}
      
      {previewMode ? (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Slide Preview</h3>
          <div className="bg-black rounded-lg overflow-hidden shadow-lg">
            <SlideCarousel />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slide List */}
          <div className="bg-[#292929] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Slides</h3>
              <div className="relative">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleAddSlide('MediaTextSplit')}
                    className="bg-[#54bb74] hover:bg-[#93cfa2] text-white px-3 py-2 rounded-md flex items-center"
                  >
                    <FaColumns className="mr-2" /> Add Media + Text
                  </button>
                  <button 
                    onClick={() => handleAddSlide('VideoBackground')}
                    className="bg-[#54bb74] hover:bg-[#93cfa2] text-white px-3 py-2 rounded-md flex items-center"
                  >
                    <FaVideo className="mr-2" /> Add Video Slide
                  </button>
                  <button 
                    onClick={() => handleAddSlide('ImageCollage')}
                    className="bg-[#54bb74] hover:bg-[#93cfa2] text-white px-3 py-2 rounded-md flex items-center"
                  >
                    <FaLayerGroup className="mr-2" /> Add Collage
                  </button>
                </div>
              </div>
            </div>

            {/* Slide List with manual reordering */}
            <div className="space-y-2">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`p-3 rounded-md flex justify-between items-center ${
                    activeSlideIndex === index
                      ? 'bg-[#54bb74]/20 border border-[#54bb74]'
                      : 'bg-[#1e1e1e] hover:bg-[#333]'
                  }`}
                  onClick={() => dispatch(setActiveSlideIndex(index))}
                >
                  <div className="flex items-center">
                    <div className="flex flex-col mr-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index > 0) {
                            dispatch(reorderSlides({ sourceIndex: index, destinationIndex: index - 1 }));
                          }
                        }}
                        className="text-gray-400 hover:text-white p-1"
                        disabled={index === 0}
                        title="Move up"
                      >
                        <FaArrowUp className={index === 0 ? 'opacity-30' : ''} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (index < slides.length - 1) {
                            dispatch(reorderSlides({ sourceIndex: index, destinationIndex: index + 1 }));
                          }
                        }}
                        className="text-gray-400 hover:text-white p-1"
                        disabled={index === slides.length - 1}
                        title="Move down"
                      >
                        <FaArrowDown className={index === slides.length - 1 ? 'opacity-30' : ''} />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        {slide.title || `Slide ${index + 1}`}
                      </h4>
                      <p className="text-sm text-gray-400">{slide.layout}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Set the current slide as the editing slide and open the modal
                        setEditingSlide(slide);
                        setEditModalOpen(true);
                      }}
                      className="text-blue-400 hover:text-blue-300 mr-2"
                      title="Edit slide"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeSlide(slide.id));
                      }}
                      className="text-red-400 hover:text-red-300"
                      title="Delete slide"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {slides.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>No slides yet. Add your first slide!</p>
              </div>
            )}
          </div>

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
    </div>
  );
}
