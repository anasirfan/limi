'use client';
import { useMemo } from 'react';
import MediaTextSplit from './layouts/MediaTextSplit';
import VideoBackground from './layouts/VideoBackground';
import ImageCollage from './layouts/ImageCollage';

/**
 * SlideRenderer component that dynamically renders the appropriate layout
 * based on the slide's layout property
 */
export default function SlideRenderer({ slide }) {
  // Fallback if no slide is provided
  if (!slide) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-[#2B2D2F] text-white">
        <p className="text-lg">No slide content available</p>
      </div>
    );
  }

  // Render the appropriate layout component based on the slide's layout property
  const renderLayout = useMemo(() => {
    switch (slide.layout) {
      case 'media-text-split':
        return <MediaTextSplit slide={slide} />;
      case 'video-bg-text':
        return <VideoBackground slide={slide} />;
      case 'image-collage':
        return <ImageCollage slide={slide} />;
      default:
        return (
          <div className="flex items-center justify-center h-full w-full bg-[#2B2D2F] text-white">
            <p className="text-lg">Unknown layout: {slide.layout}</p>
          </div>
        );
    }
  }, [slide]);

  return renderLayout;
}
