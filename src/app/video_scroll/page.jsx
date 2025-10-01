'use client';

import VideoScrollHeroContinuous from './components/VideoScrollHeroContinuous';

export default function VideoScrollPage() {
  return (
    <div className="relative">
      {/* Fixed video background that responds to scroll */}
      <VideoScrollHeroContinuous />
      
      {/* Invisible content to enable scrolling - video progresses as you scroll through this */}
      <div className="relative z-10 pointer-events-none">
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
      </div>
    </div>
  );
}
