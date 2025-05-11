import React from 'react';
import SlideCarousel from '../../../components/SlideCarousel';

/**
 * SlidePreview component for displaying the slide carousel in preview mode
 */
const SlidePreview = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-white">Slide Preview</h3>
      <div className="bg-black rounded-lg overflow-hidden shadow-lg">
        <SlideCarousel />
      </div>
    </div>
  );
};

export default SlidePreview;
