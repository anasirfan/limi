"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

// Responsive triangle configuration
const defaultTriangleConfig = {
  HUB: { x: -173.2, y: -100 },
  BASE: { x: 173.2, y: -100 },
  APP: { x: 0, y: 200 },
};

const InteractiveStory = () => {
  const [triangleConfig, setTriangleConfig] = useState(defaultTriangleConfig);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const hubRef = useRef(null);
  const baseRef = useRef(null);
  const appRef = useRef(null);
  const svgRef = useRef(null);

  // Update triangle config on resize and detect mobile
  useEffect(() => {
    const updateConfig = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth <= 1023;

      setIsMobile(mobile);

      const newConfig = mobile
        ? {
            HUB: { x: -100, y: -80 },
            BASE: { x: 100, y: -80 },
            APP: { x: 0, y: 100 },
          }
        : tablet
        ? {
            HUB: { x: -140, y: -90 },
            BASE: { x: 140, y: -90 },
            APP: { x: 0, y: 150 },
          }
        : defaultTriangleConfig;

      setTriangleConfig(newConfig);
    };

    // Initial check
    updateConfig();

    // Add resize listener
    window.addEventListener("resize", updateConfig);
    return () => window.removeEventListener("resize", updateConfig);
  }, []);

  // Set up animations - only for desktop
  useEffect(() => {
    // Skip animations for mobile devices
    if (isMobile) {
      // Hide triangle container on mobile
      if (containerRef.current) {
        // Hide triangle container
        gsap.set(".triangle-container", { display: "none" });
      }

      return;
    }

    // Clean up any existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach((st) => {
      if (
        st.vars.trigger === containerRef.current ||
        (st.vars.trigger &&
          st.vars.trigger.classList &&
          st.vars.trigger.classList.contains("triangle-container"))
      ) {
        st.kill();
      }
    });

    let ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 4,
          anticipatePin: 1,
        },
      });

      // PHASE 1: Initial heading animation
      timeline
        .addLabel("intro", 0)
        .from(
          headingRef.current,
          {
            scale: 2,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "intro"
        )
        .to(
          headingRef.current,
          {
            y: 120,
            scale: 0.8,
            position: "fixed",
            top: "2rem",
            duration: 1,
          },
          "intro+=1"
        );

      // PHASE 2: Bring in the triangle components one by one
      timeline.addLabel("showComponents", "intro+=2");

      // Hub component
      timeline.from(
        hubRef.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: "power2.out",
        },
        "showComponents"
      );

      // Base component - after hub appears
      timeline.from(
        baseRef.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: "power2.out",
        },
        "showComponents+=0.4"
      );

      // App component - after base appears
      timeline.from(
        appRef.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: "power2.out",
        },
        "showComponents+=0.8"
      );

      // PHASE 3: Move components to triangle positions
      timeline.addLabel("formTriangle", "showComponents+=1.2");

      // Move hub
      timeline.to(
        hubRef.current,
        {
          x: triangleConfig?.HUB?.x,
          y: triangleConfig?.HUB?.y,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "formTriangle"
      );

      // Move base
      timeline.to(
        baseRef.current,
        {
          x: 173.2,
          y: -140,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "formTriangle+=0.1"
      );

      // Move app
      timeline.to(
        appRef.current,
        {
          x: triangleConfig?.APP?.x,
          y: triangleConfig?.APP?.y,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "formTriangle+=0.2"
      );

      // PHASE 4: Fade out names, fade in images
      timeline
        .addLabel("showImages", "formTriangle+=0.8")
        .to(
          ".div-name",
          {
            opacity: 0,
            duration: 0.3,
          },
          "showImages"
        )
        .to(
          hubRef.current.querySelector(".div-image"),
          {
            opacity: 1,
            duration: 0.3,
          },
          "showImages+=0.3"
        )
        .to(
          baseRef.current.querySelector(".div-image"),
          {
            opacity: 1,
            duration: 0.3,
          },
          "showImages+=0.4"
        )
        .to(
          appRef.current.querySelector(".div-image"),
          {
            opacity: 1,
            duration: 0.3,
          },
          "showImages+=0.5"
        );

      // PHASE 5: Show and animate triangle lines
      timeline
        .addLabel("showLines", "showImages+=0.8")
        .to(
          svgRef.current.querySelectorAll(".main-triangle-line"),
          {
            opacity: 1,
            duration: 1,
          },
          "showLines"
        )
        .fromTo(
          ".main-triangle-line",
          {
            strokeDashoffset: 300,
            strokeDasharray: 300,
          },
          {
            strokeDashoffset: 0,
            duration: 1,
            stagger: 0.4,
            ease: "power1.inOut",
          },
          "showLines+=0.2"
        );

      // PHASE 6: Show descriptions - desktop only
      timeline
        .addLabel("showDescriptions", "showLines+=1.2")
        .to(
          ".description-line",
          {
            opacity: 1,
            duration: 1,
            stagger: 0.4,
          },
          "showDescriptions"
        )
        .to(
          ".description-text",
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.8,
          },
          "showDescriptions+=0.5"
        );
    });

    return () => {
      // Clean up all animations and ScrollTriggers when component unmounts
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.vars.trigger === containerRef.current ||
          (st.vars.trigger &&
            st.vars.trigger.classList &&
            st.vars.trigger.classList.contains("triangle-container"))
        ) {
          st.kill();
        }
      });
    };
  }, [triangleConfig, isMobile]); // Re-run when triangleConfig or isMobile changes

  return (
    <div
      ref={containerRef}
      className={`relative ${
        isMobile ? "h-auto py-16" : "h-screen"
      } w-full overflow-hidden bg-[#292929]`}
    >
      {/* Heading */}
      <h1
        ref={headingRef}
        className={`font-[Amenti] text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 px-4 z-10 ${
          isMobile
            ? "hidden mb-8 relative top-0"
            : "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
      >
        How Our <br /> EcoSystem Works
      </h1>
      <h1
        className={`font-[Amenti] text-center text-3xl -mt-16 mb-12 font-bold text-emerald-400 px-4 z-10 hidden max-sm:block `}
      >
        How Our <br /> EcoSystem Works
      </h1>

      {/* Triangle Container - hidden on mobile */}
      {!isMobile && (
        <div className="triangle-container relative h-full w-full">
          {/* Main Triangle SVG */}
          <svg
            className="absolute inset-0 pointer-events-none z-10"
            ref={svgRef}
            viewBox="-400 -300 800 600"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          >
            <line
              className="main-triangle-line opacity-0"
              x1={triangleConfig?.HUB?.x}
              y1={triangleConfig?.HUB?.y}
              x2={triangleConfig?.BASE?.x}
              y2={triangleConfig?.BASE?.y}
              stroke="white"
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset="0"
            />
            <line
              className="main-triangle-line opacity-0"
              x1={triangleConfig?.BASE?.x}
              y1={triangleConfig?.BASE?.y}
              x2={triangleConfig?.APP?.x}
              y2={triangleConfig?.APP?.y}
              stroke="white"
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset="0"
            />
            <line
              className="main-triangle-line opacity-0"
              x1={triangleConfig?.APP?.x}
              y1={triangleConfig?.APP?.y}
              x2={triangleConfig?.HUB?.x}
              y2={triangleConfig?.HUB?.y}
              stroke="white"
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset="0"
            />
          </svg>

          {/* Hub Div */}
          <div
            ref={hubRef}
            className={`${
              isMobile
                ? "relative mx-auto mb-4"
                : "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  transform"
            } h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-40 lg:w-40 rounded-2xl  p-4 z-20`}
          >
            <div className="div-name text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white text-center mb-1 sm:mb-2">
              Hub
            </div>
            <div
              className={`div-image ${
                isMobile ? "opacity-100" : "opacity-10"
              } absolute inset-0 `}
            >
              <Image
                src="/images/hub-new.jpg"
                alt="Hub"
                className="rounded-xl shadow-glass backdrop-blur-lg  bg-white/10"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Hub Description Line - Desktop only */}
            <svg
              id="e7pqTGlYxEy1"
              className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 description-line hidden md:block"
              viewBox="0 0 600 600"
              width="400"
              height="400"
              style={{
                right: "40px",
                top: "80%",
                transform: "translateY(-50%)",
              }}
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
            >
              <ellipse
                rx="10"
                ry="10"
                transform="translate(453.190382 190.872063)"
                fill="#F3EBE2"
                strokeWidth="0"
              />
              <line
                x1="31.760273"
                y1="-49.563969"
                x2="-31.760272"
                y2="49.563968"
                transform="translate(416.430109 248.436032)"
                fill="none"
                stroke="#93CFA2"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <line
                x1="90.878326"
                y1="0"
                x2="-90.878325"
                y2="0"
                transform="translate(294.791511 298)"
                fill="none"
                stroke="#93CFA2"
                strokeWidth="3"
              />
            </svg>

            <div className="description-text absolute right-48 top-1/2 -translate-y-1/2 w-96 text-white opacity-0 hidden md:block">
              <h1 className="text-xl lg:text-2xl font-[Amenti] font-semibold">
                {" "}
                Hub – The Brain of the System
              </h1>
              <p className="italic text-[#93CFA2] text-xs lg:text-sm">
                Seamlessly Connects Everything
              </p>
              <p className="text-xs lg:text-sm font-[Poppins]">
                The Hub acts as the core processor, managing smart integrations
                and connecting all lighting modules for real-time adjustments.
              </p>
            </div>
          </div>

          {/* Base Div */}
          <div
            ref={baseRef}
            className={`${
              isMobile
                ? "relative mx-auto mb-4"
                : "absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 transform"
            } h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-40  lg:w-40 rounded-2xl p-4 z-20`}
          >
            <div className="div-name text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white text-center mb-1 sm:mb-2">
              Base
            </div>
            <div
              className={`div-image ${
                isMobile ? "opacity-100" : "opacity-10  "
              } absolute inset-0 rounded-2xl`}
            >
              <Image
                src="/images/base-new.jpg"
                alt="Base"
                className="rounded-xl shadow-glass backdrop-blur-lg  bg-white/10"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Base Description Line - Desktop only */}
            <svg
              id="ebGvKdsWm4j1"
              className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 description-line hidden md:block"
              viewBox="0 0 600 600"
              width="400"
              height="400"
              style={{
                left: "10px",
                top: "90%",
                transform: "translateY(-50%)",
              }}
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
            >
              <ellipse
                rx="10"
                ry="10"
                transform="translate(196.260283 195.987281)"
                fill="#F3EBE2"
                strokeWidth="0"
              />
              <line
                x1="31.760273"
                y1="-49.563969"
                x2="-31.760272"
                y2="49.563968"
                transform="matrix(0 1-1 0 251.436031 235.747553)"
                fill="none"
                stroke="#93CFA2"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <line
                x1="90.878326"
                y1="0"
                x2="-90.878325"
                y2="0"
                transform="translate(390.15277 267)"
                fill="none"
                stroke="#93CFA2"
                strokeWidth="3"
              />
            </svg>

            <div className="description-text absolute left-64 top-1/3 -translate-y-1/2 w-96 text-white opacity-0 hidden md:block">
              <h1 className="text-xl lg:text-2xl font-[Amenti] font-semibold">
                {" "}
                Base – The Power & Stability
              </h1>
              <p className="italic text-[#93CFA2] text-xs lg:text-sm">
                Reliable Infrastructure
              </p>
              <p className="text-xs lg:text-sm font-[Poppins]">
                The Base serves as the backbone, providing secure data storage,
                intelligent power distribution, and seamless automation.
              </p>
            </div>
          </div>

          {/* App Div */}
          <div
            ref={appRef}
            className={`${
              isMobile
                ? "relative mx-auto mb-4"
                : "absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 transform"
            } h-20 w-20 sm:h-28 sm:w-28 md:h-36  md:w-36 lg:h-40 lg:w-40 rounded-lg backdrop-blur-lg  bg-white/10  p-4 z-20`}
          >
            <div
              className="div-name text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white text-center mb-1 sm:mb-2 
              rounded-xl p-4"
            >
              App
            </div>

            <div
              className={`div-image ${
                isMobile ? "opacity-100" : "opacity-10"
              } absolute inset-0 rounded-2xl`}
            >
              <Image
                src="/images/mobile-app-new.png"
                className="rounded-xl shadow-glass"
                alt="App"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* App Description Line - Desktop only */}
            <svg
              id="appDescSvg"
              className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 description-line hidden md:block"
              viewBox="0 0 600 600"
              width="400"
              height="400"
              style={{
                top: "-0px",
                left: "0%",
                transform: "translateX(-50%)",
              }}
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
            >
              <ellipse
                rx="10"
                ry="10"
                transform="translate(453.190382 190.872063)"
                fill="#F3EBE2"
                strokeWidth="0"
              />
              <line
                x1="31.760273"
                y1="-49.563969"
                x2="-31.760272"
                y2="49.563968"
                transform="translate(416.430109 248.436032)"
                fill="none"
                stroke="#93CFA2"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <line
                x1="90.878326"
                y1="0"
                x2="-90.878325"
                y2="0"
                transform="translate(294.791511 298)"
                fill="none"
                stroke="#93CFA2"
                strokeWidth="3"
              />
            </svg>

            <div className="description-text absolute top-[120%] -left-[120%] -translate-x-1/2 -translate-y-24 w-96 text-white opacity-0 hidden md:block">
              <h1 className="text-xl lg:text-2xl font-[Amenti] font-semibold">
                App – Your Control Center
              </h1>
              <p className="italic text-[#93CFA2] text-xs lg:text-sm">
                Effortless User Control
              </p>
              <p className="text-xs lg:text-sm font-[Poppins]">
                With the App, you can customize lighting effects, set schedules,
                and create the perfect ambiance with just a tap.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Descriptions - Only visible on small screens */}
      {isMobile && (
        <div className="bg-[#292929]/90 p-4 z-30 mobile-description">
          <div className="flex flex-col space-y-4 text-white">
            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#176D63] mt-1 flex-shrink-0"></div>
              <div>
                <h3 className="text-base font-semibold font-['Amenti']">
                  Hub – The Brain of the System
                </h3>
                <p className="text-xs italic text-[#93CFA2] font-['Poppins']">
                  Seamlessly Connects Everything
                </p>
                <p className="text-xs font-['Poppins']">
                  The Hub acts as the core processor, managing smart
                  integrations and connecting all lighting modules for real-time
                  adjustments.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#0E5A3D] mt-1 flex-shrink-0"></div>
              <div>
                <h3 className="text-base font-semibold font-['Amenti']">
                  Base – The Power & Stability
                </h3>
                <p className="text-xs italic text-[#93CFA2] font-['Poppins']">
                  Reliable Infrastructure
                </p>
                <p className="text-xs font-['Poppins']">
                  The Base serves as the backbone, providing secure data
                  storage, intelligent power distribution, and seamless
                  automation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 rounded-full bg-[#2E1F3E] mt-1 flex-shrink-0"></div>
              <div>
                <h3 className="text-base font-semibold font-['Amenti']">
                  App – Your Control Center
                </h3>
                <p className="text-xs italic text-[#93CFA2] font-['Poppins']">
                  Effortless User Control
                </p>
                <p className="text-xs font-['Poppins']">
                  With the App, you can customize lighting effects, set
                  schedules, and create the perfect ambiance with just a tap.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveStory;
