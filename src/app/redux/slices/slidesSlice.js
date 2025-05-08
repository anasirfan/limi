import { createSlice } from '@reduxjs/toolkit';
import { initialSlides } from '../../data/initialSlides';

const slidesSlice = createSlice({
  name: 'slides',
  initialState: {
    slides: initialSlides,
    activeSlideIndex: 0,
  },
  reducers: {
    replaceAllSlides: (state, action) => {
      state.slides = action.payload;
    },
    addSlide: (state, action) => {
      const newSlide = {
        ...action.payload,
        meta: {
          ...action.payload.meta,
          index: state.slides.length,
        },
      };
      state.slides.push(newSlide);
    },
    updateSlide: (state, action) => {
      const { id, field, value } = action.payload;
      const slideIndex = state.slides.findIndex(slide => slide.id === id);
      
      if (slideIndex !== -1) {
        // Handle nested fields like 'text.heading' or 'media.type'
        if (field.includes('.')) {
          const [parentField, childField] = field.split('.');
          state.slides[slideIndex][parentField][childField] = value;
        } else {
          state.slides[slideIndex][field] = value;
        }
      }
    },
    removeSlide: (state, action) => {
      const slideId = action.payload;
      state.slides = state.slides.filter(slide => slide.id !== slideId);
      
      // Update indices after removal
      state.slides.forEach((slide, index) => {
        slide.meta.index = index;
      });
      
      // Adjust active slide index if needed
      if (state.activeSlideIndex >= state.slides.length) {
        state.activeSlideIndex = Math.max(0, state.slides.length - 1);
      }
    },
    reorderSlides: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      
      // Ensure indices are valid
      if (
        fromIndex >= 0 && 
        fromIndex < state.slides.length && 
        toIndex >= 0 && 
        toIndex < state.slides.length
      ) {
        // Remove slide from old position
        const [movedSlide] = state.slides.splice(fromIndex, 1);
        
        // Insert at new position
        state.slides.splice(toIndex, 0, movedSlide);
        
        // Update indices
        state.slides.forEach((slide, index) => {
          slide.meta.index = index;
        });
      }
    },
    setActiveSlideIndex: (state, action) => {
      state.activeSlideIndex = action.payload;
    },
  },
});

export const { 
  replaceAllSlides,
  addSlide, 
  updateSlide, 
  removeSlide, 
  reorderSlides, 
  setActiveSlideIndex 
} = slidesSlice.actions;

// Selectors
export const selectSlides = (state) => state.slides.slides;
export const selectActiveSlideIndex = (state) => state.slides.activeSlideIndex;
export const selectActiveSlide = (state) => state.slides.slides[state.slides.activeSlideIndex];

export default slidesSlice.reducer;
