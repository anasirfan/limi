"use client";
import React from "react";
import { ContainerScroll } from "../../components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-[#010101]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-medium text-white mb-4">
            Connected by Sensors, Powered by <br />
              <span className="text-4xl md:text-[5rem] mt-3 leading-none">
                <span className="text-white">LIMI</span>{" "}
                <span className="text-[#54bb74]">AI</span>
              </span>
            </h1>
          
          </>
        }>
        <video
          src="/limiai/main_video.mp4"
          className="mx-auto rounded-2xl object-cover h-full w-full"
          autoPlay
          loop
          muted
          playsInline
          style={{ objectPosition: "left top" }}
        />
      </ContainerScroll>
    </div>
  );
}
