'use client';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Using manual reordering instead of react-beautiful-dnd
import { FiEdit2, FiTrash2, FiPlus, FiMove, FiChevronDown, FiChevronUp, FiImage, FiVideo, FiLayout, FiType, FiEye } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  selectSlides, 
  selectActiveSlideIndex,
  addSlide, 
  updateSlide, 
  removeSlide, 
  reorderSlides,
  setActiveSlideIndex
} from '../../redux/slices/slidesSlice';

/**
 * SlideEditor component for editing slides in the customer page
 * Allows adding, removing, reordering, and editing slides
 */
export default function SlideEditor() {
  const dispatch = useDispatch();
  const slides = useSelector(selectSlides);
  const activeSlideIndex = useSelector(selectActiveSlideIndex);
  const [editingSlideId, setEditingSlideId] = useState(null);
  const [expandedSection, setExpandedSection] = useState('layout');
  
  // Toggle editing for a slide
  const toggleEditSlide = (slideId) => {
    setEditingSlideId(editingSlideId === slideId ? null : slideId);
  };
  
  // Handle slide reordering via drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const fromIndex = result.source.index;
    const toIndex = result.destination.index;
    
    if (fromIndex !== toIndex) {
      dispatch(reorderSlides({ fromIndex, toIndex }));
    }
  };
  
  // Handle adding a new slide
  const handleAddSlide = () => {
    const newSlideId = `slide${slides.length + 1}`;
    
    const newSlide = {
      id: newSlideId,
      layout: 'media-text-split',
      media: {
        type: 'image',
        urls: ['/images/products/placeholder.jpg'],
        position: 'left',
      },
      text: {
        heading: 'New Slide',
        subheading: 'Add your content',
        description: 'Edit this slide to customize it.',
        bullets: ['Feature one', 'Feature two', 'Feature three'],
        alignment: 'right',
        verticalPosition: 'center',
        showBullets: true,
      },
      appearance: {
        theme: 'charleston',
        backgroundColor: '#2B2D2F',
        overlayDarken: true,
        padding: '2rem',
      },
      meta: {
        index: slides.length,
        status: 'draft',
      },
    };
    
    dispatch(addSlide(newSlide));
    setEditingSlideId(newSlideId);
  };
  
  // Handle removing a slide
  const handleRemoveSlide = (slideId) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      dispatch(removeSlide(slideId));
      setEditingSlideId(null);
    }
  };
  
  // Handle updating a slide field
  const handleUpdateSlide = (slideId, field, value) => {
    dispatch(updateSlide({ id: slideId, field, value }));
  };
  
  // Toggle expanded section
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  // Generate a thumbnail preview for a slide
  const SlideThumb = ({ slide, index }) => {
    const isEditing = editingSlideId === slide.id;
    
    return (
      <Draggable draggableId={slide.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`relative mb-4 rounded-lg overflow-hidden border-2 transition-all ${
              isEditing 
                ? 'border-[#50C878]' 
                : 'border-transparent hover:border-gray-500'
            }`}
          >
            {/* Thumbnail header */}
            <div className="flex items-center justify-between bg-[#2B2D2F] text-white p-2">
              <div className="flex items-center">
                <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                  <FiMove className="text-gray-400 hover:text-white" />
                </div>
                <span className="font-medium">Slide {index + 1}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleEditSlide(slide.id)}
                  className="p-1 hover:text-[#50C878]"
                  aria-label="Edit slide"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleRemoveSlide(slide.id)}
                  className="p-1 hover:text-red-500"
                  aria-label="Delete slide"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
            
            {/* Thumbnail preview */}
            <div 
              className="h-20 p-2 flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: slide.appearance.backgroundColor }}
              onClick={() => dispatch(setActiveSlideIndex(index))}
            >
              <div className="text-center truncate">
                <p 
                  className="font-bold text-sm truncate"
                  style={{ color: slide.appearance.theme === 'charleston' ? 'white' : '#2B2D2F' }}
                >
                  {slide.text.heading}
                </p>
                <p 
                  className="text-xs truncate"
                  style={{ color: slide.appearance.theme === 'charleston' ? 'white' : '#2B2D2F' }}
                >
                  {slide.layout} • {slide.media.type}
                </p>
              </div>
            </div>
            
            {/* Expanded edit form */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#1F1F1F] border-t border-gray-700 overflow-hidden"
                >
                  <div className="p-4">
                    {/* Layout Section */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('layout')}
                        className="flex items-center justify-between w-full text-left text-white font-medium p-2 bg-[#2B2D2F] rounded"
                      >
                        <div className="flex items-center">
                          <FiLayout className="mr-2" />
                          <span>Layout</span>
                        </div>
                        {expandedSection === 'layout' ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSection === 'layout' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-2 p-2 bg-[#2B2D2F]/50 rounded"
                          >
                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Layout Type</label>
                              <select
                                value={slide.layout}
                                onChange={(e) => handleUpdateSlide(slide.id, 'layout', e.target.value)}
                                className="w-full bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                              >
                                <option value="media-text-split">Media & Text Split</option>
                                <option value="video-bg-text">Video Background</option>
                                <option value="image-collage">Image Collage</option>
                              </select>
                            </div>
                            
                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Theme</label>
                              <select
                                value={slide.appearance.theme}
                                onChange={(e) => handleUpdateSlide(slide.id, 'appearance.theme', e.target.value)}
                                className="w-full bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                              >
                                <option value="charleston">Charleston Green</option>
                                <option value="emerald">Emerald</option>
                                <option value="eton">Eton Blue</option>
                                <option value="beige">Soft Beige</option>
                              </select>
                            </div>
                            
                            <div className="mb-3">
                              <label className="flex items-center text-sm text-gray-300">
                                <input
                                  type="checkbox"
                                  checked={slide.appearance.overlayDarken}
                                  onChange={(e) => handleUpdateSlide(slide.id, 'appearance.overlayDarken', e.target.checked)}
                                  className="mr-2"
                                />
                                Add dark overlay
                              </label>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Media Section */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('media')}
                        className="flex items-center justify-between w-full text-left text-white font-medium p-2 bg-[#2B2D2F] rounded"
                      >
                        <div className="flex items-center">
                          <FiImage className="mr-2" />
                          <span>Media</span>
                        </div>
                        {expandedSection === 'media' ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSection === 'media' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-2 p-2 bg-[#2B2D2F]/50 rounded"
                          >
                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Media Type</label>
                              <select
                                value={slide.media.type}
                                onChange={(e) => handleUpdateSlide(slide.id, 'media.type', e.target.value)}
                                className="w-full bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                              >
                                <option value="image">Single Image</option>
                                <option value="video">Video</option>
                                <option value="multipleImages">Multiple Images</option>
                              </select>
                            </div>
                            
                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Position</label>
                              <select
                                value={slide.media.position}
                                onChange={(e) => handleUpdateSlide(slide.id, 'media.position', e.target.value)}
                                className="w-full bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                              >
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                                <option value="background">Background</option>
                                <option value="overlap">Overlapping</option>
                              </select>
                            </div>
                            
                            {/* Media URL inputs */}
                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Media URL(s)</label>
                              {slide.media.urls.map((url, urlIndex) => (
                                <div key={urlIndex} className="flex mb-2">
                                  <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => {
                                      const newUrls = [...slide.media.urls];
                                      newUrls[urlIndex] = e.target.value;
                                      handleUpdateSlide(slide.id, 'media.urls', newUrls);
                                    }}
                                    className="flex-grow bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                                    placeholder="Enter media URL"
                                  />
                                  {slide.media.type === 'multipleImages' && (
                                    <button
                                      onClick={() => {
                                        const newUrls = slide.media.urls.filter((_, i) => i !== urlIndex);
                                        handleUpdateSlide(slide.id, 'media.urls', newUrls);
                                      }}
                                      className="ml-2 p-2 text-red-400 hover:text-red-300"
                                      aria-label="Remove URL"
                                    >
                                      <FiTrash2 />
                                    </button>
                                  )}
                                </div>
                              ))}
                              
                              {slide.media.type === 'multipleImages' && (
                                <button
                                  onClick={() => {
                                    const newUrls = [...slide.media.urls, '/images/products/placeholder.jpg'];
                                    handleUpdateSlide(slide.id, 'media.urls', newUrls);
                                  }}
                                  className="mt-2 flex items-center text-[#50C878] hover:text-[#87CEAB]"
                                >
                                  <FiPlus className="mr-1" /> Add another image
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Text Content Section */}
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('text')}
                        className="flex items-center justify-between w-full text-left text-white font-medium p-2 bg-[#2B2D2F] rounded"
                      >
                        <div className="flex items-center">
                          <FiType className="mr-2" />
                          <span>Text Content</span>
                        </div>
                        {expandedSection === 'text' ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSection === 'text' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-2 p-2 bg-[#2B2D2F]/50 rounded"
                          >
                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Heading</label>
                              <input
                                type="text"
                                value={slide.text.heading}
                                onChange={(e) => handleUpdateSlide(slide.id, 'text.heading', e.target.value)}
                                className="w-full bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                                placeholder="Enter heading"
                              />
                            </div>
                            
                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Subheading</label>
                              <input
                                type="text"
                                value={slide.text.subheading}
                                onChange={(e) => handleUpdateSlide(slide.id, 'text.subheading', e.target.value)}
                                className="w-full bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                                placeholder="Enter subheading"
                              />
                            </div>
                            
                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Description</label>
                              <textarea
                                value={slide.text.description}
                                onChange={(e) => handleUpdateSlide(slide.id, 'text.description', e.target.value)}
                                className="w-full bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                                rows="3"
                                placeholder="Enter description"
                              />
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex items-center justify-between">
                                <label className="flex items-center text-sm text-gray-300">
                                  <input
                                    type="checkbox"
                                    checked={slide.text.showBullets}
                                    onChange={(e) => handleUpdateSlide(slide.id, 'text.showBullets', e.target.checked)}
                                    className="mr-2"
                                  />
                                  Show bullet points
                                </label>
                              </div>
                              
                              {slide.text.showBullets && (
                                <div className="mt-2">
                                  {slide.text.bullets.map((bullet, bulletIndex) => (
                                    <div key={bulletIndex} className="flex mb-2">
                                      <input
                                        type="text"
                                        value={bullet}
                                        onChange={(e) => {
                                          const newBullets = [...slide.text.bullets];
                                          newBullets[bulletIndex] = e.target.value;
                                          handleUpdateSlide(slide.id, 'text.bullets', newBullets);
                                        }}
                                        className="flex-grow bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                                        placeholder={`Bullet point ${bulletIndex + 1}`}
                                      />
                                      <button
                                        onClick={() => {
                                          const newBullets = slide.text.bullets.filter((_, i) => i !== bulletIndex);
                                          handleUpdateSlide(slide.id, 'text.bullets', newBullets);
                                        }}
                                        className="ml-2 p-2 text-red-400 hover:text-red-300"
                                        aria-label="Remove bullet"
                                      >
                                        <FiTrash2 />
                                      </button>
                                    </div>
                                  ))}
                                  
                                  <button
                                    onClick={() => {
                                      const newBullets = [...slide.text.bullets, 'New bullet point'];
                                      handleUpdateSlide(slide.id, 'text.bullets', newBullets);
                                    }}
                                    className="mt-2 flex items-center text-[#50C878] hover:text-[#87CEAB]"
                                  >
                                    <FiPlus className="mr-1" /> Add bullet point
                                  </button>
                                </div>
                              )}
                            </div>
                            
                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Text Alignment</label>
                              <select
                                value={slide.text.alignment}
                                onChange={(e) => handleUpdateSlide(slide.id, 'text.alignment', e.target.value)}
                                className="w-full bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                              >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                              </select>
                            </div>
                            
                            <div className="mb-3">
                              <label className="block text-sm text-gray-300 mb-1">Vertical Position</label>
                              <select
                                value={slide.text.verticalPosition}
                                onChange={(e) => handleUpdateSlide(slide.id, 'text.verticalPosition', e.target.value)}
                                className="w-full bg-[#2B2D2F] text-white border border-gray-700 rounded p-2"
                              >
                                <option value="top">Top</option>
                                <option value="center">Center</option>
                                <option value="bottom">Bottom</option>
                              </select>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Draggable>
    );
  };
  
  return (
    <div className="bg-[#1F1F1F] rounded-lg shadow-xl p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Slide Editor</h2>
        <button
          onClick={handleAddSlide}
          className="flex items-center bg-[#50C878] hover:bg-[#3da861] text-white px-3 py-2 rounded"
        >
          <FiPlus className="mr-1" /> Add Slide
        </button>
      </div>
      
      <div className="space-y-2">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`p-3 rounded-md flex justify-between items-center ${
              activeSlideIndex === index
                ? 'bg-[#50C878]/20 border border-[#50C878]'
                : 'bg-[#292929] hover:bg-[#333]'
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
                  <FiChevronUp className={index === 0 ? 'opacity-30' : ''} />
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
                  <FiChevronDown className={index === slides.length - 1 ? 'opacity-30' : ''} />
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
                  dispatch(removeSlide(slide.id));
                }}
                className="text-red-400 hover:text-red-300"
                title="Delete slide"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {slides.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>No slides yet. Click "Add Slide" to create your first slide.</p>
        </div>
      )}
    </div>
  );
}
