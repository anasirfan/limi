import React from 'react';
import { FaPlus, FaTrash, FaEdit, FaArrowUp, FaArrowDown, FaColumns, FaVideo, FaLayerGroup } from 'react-icons/fa';
import SlideEditor from '../../../components/SlideCarousel/SlideEditor';

/**
 * SlideList component for managing the list of slides
 */
const SlideList = ({ 
  slides, 
  activeSlideIndex, 
  handleAddSlide, 
  handleEditSlide, 
  dispatch, 
  removeSlide, 
  reorderSlides, 
  setActiveSlideIndex 
}) => {
  return (
    <>
      {/* Slide List */}
      <div className="bg-[#292929] p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Slides</h3>
          <div className="relative">
            <div className="flex space-x-2">
              <button 
                onClick={() => handleAddSlide('media-text-split')}
                className="bg-[#54bb74] hover:bg-[#93cfa2] text-white px-3 py-2 rounded-md flex items-center"
              >
                <FaColumns className="mr-2" /> Add Media + Text
              </button>
              <button 
                onClick={() => handleAddSlide('video-background')}
                className="bg-[#54bb74] hover:bg-[#93cfa2] text-white px-3 py-2 rounded-md flex items-center"
              >
                <FaVideo className="mr-2" /> Add Video Slide
              </button>
              <button 
                onClick={() => handleAddSlide('image-collage')}
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
              key={slide.id || `slide-index-${index}`}
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
                <div className="ml-2">
                  <div className="font-medium text-white">{slide.text?.heading || `Slide ${index + 1}`}</div>
                  <div className="text-xs text-gray-400">{slide.layout}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditSlide(slide);
                  }}
                  className="text-blue-400 hover:text-blue-300 p-2"
                  title="Edit slide"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this slide?')) {
                      dispatch(removeSlide(slide.id));
                    }
                  }}
                  className="text-red-400 hover:text-red-300 p-2"
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
    </>
  );
};

export default SlideList;
