import React, { useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaColumns, FaVideo, FaLayerGroup } from 'react-icons/fa';
import SlideEditor from '../../../components/SlideCarousel/SlideEditor';
import ImageCollageThumbnail from './ImageCollageThumbnail';

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


  useEffect(() => {
    console.log("slides",slides)
  }, [slides]);
  return (
    <>
      {/* Slide List */}
      <div className="bg-[#292929] p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">
            Slides
            <span className="ml-3 text-base font-normal text-gray-400">
              ({slides.length})
            </span>
          </h3>
          <div className="relative">
            <div>
              <button
                onClick={() => handleAddSlide()}
                className="bg-[#54bb74] hover:bg-[#93cfa2] text-white px-3 py-2 rounded-md flex items-center"
              >
                <FaPlus className="mr-2" /> Add Slide
              </button>
            </div>
          </div>
        </div>
        {/* Slide List without manual reordering */}
        <div className="space-y-2">
          {slides.map((slide, index) => (
            <div
              key={`slide-${slide.id}-${index}-${Date.now()}`}
              className={`p-3 rounded-md flex justify-between items-center ${
                activeSlideIndex === index
                  ? 'bg-[#54bb74]/20 border border-[#54bb74]'
                  : 'bg-[#1e1e1e] hover:bg-[#333]'
              }`}
              onClick={() => dispatch(setActiveSlideIndex(index))}
            >
              <div className="flex items-center">
                {/* Slide number badge */}
                <span className="w-7 h-7 flex items-center justify-center bg-[#54bb74] text-[#1e1e1e] font-bold rounded-full mr-3 text-sm">
                  {index + 1}
                </span>
                {/* Slide thumbnail */}
                {slide.layout === 'image-collage' ? (
                  <div className="mr-3">
                    <ImageCollageThumbnail urls={slide.media?.urls || []} size="small" />
                  </div>
                ) : slide.layout === 'video-background' || slide.layout === 'video-bg-text' ? (
                  <div className="w-16 h-16 bg-[#1e1e1e] rounded-md flex items-center justify-center mr-3 overflow-hidden">
                    <div className="bg-[#50C878] rounded-full w-8 h-8 flex items-center justify-center">
                      <FaVideo className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-[#1e1e1e] rounded-md flex items-center justify-center mr-3 overflow-hidden">
                    {slide.media?.urls && slide.media.urls[0] ? (
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.media.urls[0]})` }}
                      />
                    ) : (
                      <div className="bg-[#50C878] rounded-full w-8 h-8 flex items-center justify-center">
                        <FaColumns className="text-white" />
                      </div>
                    )}
                  </div>
                )}
                
                <div>
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
      {/* <div className="lg:col-span-2 bg-[#292929] p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-white">Edit Slide</h3>
        {slides.length > 0 ? (
          <SlideEditor />
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>Select a slide to edit or create a new one</p>
          </div>
        )}
      </div> */}
    </>
  );
};

export default SlideList;
