"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ModelViewer from "./ModelViewer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: "Remote Control",
    index: "01",
    description: "Take control of your environment with intuitive mobile app",
    features: [
      "Remote Access",
      "Voice Control",
      "Smart Scheduling",
      "Energy Monitoring",
    ],
    impact: "Transform how you interact with your space",
    efficiency: "85-95%",
  },
  {
    title: "Smart Automation",
    index: "02",
    description: "Let your space work for you with automated controls",
    features: [
      "Scene Setting",
      "Motion Detection",
      "Climate Control",
      "Custom Rules",
    ],
    impact: "Enhance comfort and efficiency automatically",
    efficiency: "80-90%",
  },
  {
    title: "Energy Efficient",
    index: "03",
    description: "Optimize your energy usage with smart controls",
    features: [
      "Usage Analytics",
      "Smart Scheduling",
      "Automated Rules",
      "Cost Savings",
    ],
    impact: "Reduce energy consumption and costs",
    efficiency: "90-95%",
  },
  {
    title: "Real-time Analytics",
    index: "04",
    description: "Get insights into your usage patterns",
    features: [
      "Usage Statistics",
      "Energy Reports",
      "Optimization Tips",
      "Trend Analysis",
    ],
    impact: "Make data-driven decisions",
    efficiency: "85-90%",
  },
];

const JourneySection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imagesRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.set("#hub-image", {
        opacity: 0,
        scale: 0.6,
        x: "100vw",
      });

      gsap.set("#base-image", {
        opacity: 0,
        scale: 0.6,
        x: "-100vw",
      });

      gsap.set("#mobile-container", {
        opacity: 0,
        scale: 0.1,
        y: "60vh",
        x: "15vw",
      });

      gsap.set(".feature-heading", {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? "-100vw" : "100vw"),
        y: (i) => {
          switch (i) {
            case 0:
              return "-50px";
            case 1:
              return "-10vh";
            case 2:
              return "10vh";
            case 3:
              return "30vh";
            default:
              return 0;
          }
        },
      });

      gsap.set(".feature-card", {
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // console.log("Timeline Progress:", self.progress.toFixed(2));
          }
        },
      });

      tl
        .to(headingRef.current, {
          scale: 1,
          duration: 1,
        })
        .to(
          ["#hub-image", "#base-image"],
          {
            opacity: 1,
            scale: 1,
            x: (i) => (i === 0 ? " /. ``````````Q" : "-15vw"),
            y: (i) => (i === 0 ? "-30vh" : "-30vh"),
            duration: 2,
            stagger: 0.2,
          },
          "<"
        )
        .to(
          "#mobile-container",
          {
            opacity: 1,
            scale: 1,
            y: "40vh",
            duration: 1,
          },
          "<"
        )

        .to("#base-image", {
          x: "-2vw",
          y: "-25vh",
          rotation: -15,
          scale: 0.6,
          duration: 1,
        })
        .to(
          "#hub-image",
          {
            x: "2vw",
            y: "-6vw",
            rotation: 15,
            scale: 0.9,
            duration: 1,
          },
          "-=0.8"
        )
        .to(
          "#mobile-container",
          {
            y: "15vh",
            duration: 1,
          },
          "-=0.6"
        )

        .to("#mobile-container", {
          duration: 1,
          scrub: 0.5,
          onStart: () => {
            const modelElement = document.querySelector("#model-viewer");
            if (modelElement) {
              modelElement.dispatchEvent(new CustomEvent("rotateModel", { detail: { rotation: 360 } }));
            }
          }
        })
        .to(
          ["#base-image", "#hub-image", headingRef.current],
          {
            opacity: 0,
            duration: 0.5,
          },
          "<"
        )

        .to(".feature-heading", {
          opacity: 1,
          x: (i) => {
            const x = i % 2 === 0 ? "-30vw" : "30vw";
            return x;
          },
          y: (i) => {
            let y;
            switch (i) {
              case 0:
                y = "-30vh";
                break;
              case 1:
                y = "-10vh";
                break;
              case 2:
                y = "10vh";
                break;
              case 3:
                y = "30vh";
                break;
              default:
                y = 0;
            }
            return y;
          },
          stagger: 0.1,
          duration: 0.5,

        })

        .to(".feature-heading", {
          x: 0,
          y: (i) => {
            const reversedIndex = 3 - i;

            const spacing =
              reversedIndex !== 0 || reversedIndex !== 1 ? -120 : 700;
            const y = reversedIndex * spacing - 20;
            return y;
          },
          stagger: {
            each: 0.2,
            from: "end",
          },
          duration: 1,
        })

        .to(".feature-heading", {
          opacity: 0,
          duration: 1.5,
        })
        .to("#mobile-container", {

          scale: 1,
          x: "-50vw",
          duration: 1,
        })

       
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#292929] h-[100vh] relative overflow-hidden"
    >
      <div className="container mx-auto px-28 h-full">
        {/* Heading */}
        <div
          ref={headingRef}
          className="absolute top-1/2 left-1/3 text-center scale-[2] origin-center"
        >
          <h2 className="text-emerald-400 text-center font-amenti text-[80px] leading-[0.8] whitespace-nowrap">
            How Our <br /> Journey Starts
          </h2>
        </div>

        {/* Images Container */}
        <div
          ref={imagesRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        >
          <div
            id="hub-image"
            className="journey-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/hub.png"
              width={200}
              height={200}
              alt="Hub"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div
            id="base-image"
            className="journey-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/base.jpg"
              width={200}
              height={200}
              alt="Base"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div
            id="mobile-container"
            className="relative w-full h-[800px] md:w-1/2"
          >
            <ModelViewer 
              src="/models/iphone.glb" 
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Features Container */}
        <div ref={featuresRef} className="absolute w-full top-1/2 left-0">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              {/* Initial Heading */}
              <div className="feature-heading absolute w-full">
                <div
                  className={`text-[120px] font-bold ${
                    index % 2 === 0 ? "text-left" : "text-right"
                  }`}
                >
                  <span className="text-emerald-400/30">{feature.index}</span>
                  <h3 className="text-[60px] font-bold text-[#E6E8E6]">
                    {feature.title}
                  </h3>
                </div>
              </div>

              
              {/* <div className="feature-card fixed top-1/2 right-8 w-[45%] p-8 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-500">
                <div className="text-emerald-400/30 text-8xl font-bold absolute -top-8 -left-4 select-none">
                  {feature.index}
                </div>

                <div className="card-content">
                  <h3 className="text-3xl font-bold mb-4 relative text-[#E6E8E6]">
                    {feature.title}
                    <div className="absolute -bottom-1 left-0 w-16 h-px bg-gradient-to-r from-emerald-400/50 to-transparent" />
                  </h3>

                  <p className="text-lg leading-relaxed mb-6 text-[#E6E8E6]/80">
                    {feature.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-medium uppercase tracking-wider mb-3 text-[#E6E8E6]/70">
                        Features
                      </h4>
                      <ul className="space-y-2">
                        {feature.features.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center space-x-2 text-[#E6E8E6]/80"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium uppercase tracking-wider mb-3 text-[#E6E8E6]/70">
                        Impact
                      </h4>
                      <p className="text-[#E6E8E6]/80">{feature.impact}</p>

                      <div className="mt-4">
                        <div className="h-2 rounded-full overflow-hidden bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400/50 to-emerald-200/30"
                            style={{
                              width:
                                feature.efficiency
                                  .split("-")[1]
                                  .replace("%", "") + "%",
                            }}
                          />
                        </div>
                        <div className="text-sm text-[#E6E8E6]/50 mt-1">
                          Efficiency: {feature.efficiency}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
