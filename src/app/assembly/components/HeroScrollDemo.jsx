"use client";
import React, { useState, useEffect } from "react";
import { ContainerScroll } from "../../components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col overflow-hidden bg-[#010101]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-medium text-white mb-4">
            Every Surface. Every Corner. Every Moment. <br />
              <span className="text-4xl md:text-[5rem] mt-3 leading-none">
                Powered by <span className="text-white">Adaptive</span>{" "}
                <span className="text-[#54bb74]">Intelligence</span>
              </span>
            </h1>
          
          </>
        }>
        <video
          src="/limiai/main_video.mp4"
          className={`mx-auto rounded-2xl h-full w-full ${
            isMobile 
              ? 'object-contain object-center' 
              : 'object-cover object-left-top'
          }`}
          autoPlay
          loop
          muted
          playsInline
        />
      </ContainerScroll>
    </div>
  );
}
