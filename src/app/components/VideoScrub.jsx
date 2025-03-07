"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoScrub = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure metadata is loaded before getting duration
    const onMetadataLoaded = () => {
      gsap.to(video, {
        currentTime: 10, // Ensure duration is set
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true, // Keeps video in view while scrubbing
        },
      });
    };

    if (video.readyState >= 1) {
      onMetadataLoaded();
    } else {
      video.addEventListener("loadedmetadata", onMetadataLoaded);
    }

    return () => {
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh]">
      <div className="sticky top-0 flex justify-center items-center h-screen bg-black">
        <video ref={videoRef} className="w-full " muted playsInline>
          <source src="/videos/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoScrub;
