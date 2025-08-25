import { useState, useEffect } from 'react';

export default function HorizontalScrollSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const steps = [
    {
      id: 1,
      title: 'Install the Base',
      description: 'Mount the intelligent base unit to your ceiling. Zero-config installation with built-in power management.',
      icon: '🏗️',
      color: '#54bb74',
      highlights: ['Zero-config installation', 'Built-in power management', 'Universal mounting system'],
      video: '/limiai/step1.mp4'
    },
    {
      id: 2,
      title: 'Connect the Cable',
      description: 'Plug in the smart cable system. Automatic detection and power distribution to all components.',
      icon: '🔌',
      color: '#93cfa2',
      highlights: ['Automatic detection', 'Smart power distribution', 'Flexible cable management'],
      video: '/limiai/step2.mp4'
    },
    {
      id: 3,
      title: 'Attach the Pendant',
      description: 'Snap on your chosen pendant design. Magnetic connection ensures perfect alignment every time.',
      icon: '⚡',
      color: '#54bb74',
      highlights: ['Magnetic connection', 'Perfect alignment', 'Multiple design options'],
      video: '/limiai/step3.m4v'
    },
    {
      id: 4,
      title: 'Add Smart Modules',
      description: 'Insert sensor modules for advanced functionality. Radar, microphone, and camera modules available.',
      icon: '🔧',
      color: '#292929',
      highlights: ['Plug-and-play sensors', 'Advanced AI processing', 'Expandable ecosystem'],
      video: '/limiai/step4.m4v'
    }
  ];

  // Render video block with proper styling
  const renderVideoBlock = (step, className) => (
    <div className={`${className} bg-black rounded-xl md:rounded-2xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl`} 
     >
      <div className="relative w-full h-full">
        <video 
          className="w-full h-full object-cover" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={step.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );

  // Render title block
  const renderTitleBlock = (step, className) => (
    <div className={`${className} bg-[#021B23] rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col justify-center transition-all duration-500 hover:scale-[1.02] hover:shadow-xl`}
    >
      <div className="text-2xl md:text-4xl mb-2 md:mb-4">{step.icon}</div>
      <h3 className="text-lg md:text-2xl font-bold text-white mb-2">{step.title}</h3>
      <div className="w-8 md:w-12 h-1 rounded-full" style={{backgroundColor: step.color}}></div>
    </div>
  );

  // Render description block
  const renderDescriptionBlock = (step, className) => (
    <div className={`${className} bg-[#0AB6BC] rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col justify-center transition-all duration-500 hover:scale-[1.02] hover:shadow-xl`}
  >
      <p className="text-gray-300 text-sm md:text-lg leading-relaxed">{step.description}</p>
    </div>
  );

  // Render highlights block
  const renderHighlightsBlock = (step, className) => (
    <div className={`${className} bg-[#021B23] rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col justify-center transition-all duration-500 hover:scale-[1.02] hover:shadow-xl`}
      >
      <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Key Features</h4>
      <ul className="space-y-1 md:space-y-2">
        {step.highlights.map((highlight, index) => (
          <li key={index} className="flex items-center text-gray-300 text-xs md:text-sm">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full mr-2 md:mr-3 flex-shrink-0" style={{backgroundColor: step.color}}></div>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );

  // Render icon block
  const renderIconBlock = (step, className) => (
    <div className={`${className} bg-[#021B23] rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center justify-center transition-all duration-500 hover:scale-[1.02] hover:shadow-xl`}
   >
      <div className="text-center">
        <div className="text-3xl md:text-6xl mb-2 md:mb-4">{step.icon}</div>
        <div className="w-8 md:w-16 h-1 rounded-full mx-auto" style={{backgroundColor: step.color}}></div>
      </div>
    </div>
  );

  // Mobile-specific slide layouts
  const renderMobileSlideLayout = (step, slideIndex) => {
    return (
      <div className="flex flex-col gap-4 h-auto min-h-[500px]">
        {renderVideoBlock(step, "h-48")}
        {renderTitleBlock(step, "h-20")}
        {renderDescriptionBlock(step, "h-24")}
        {renderHighlightsBlock(step, "h-32")}
      </div>
    );
  };

  // Desktop slide layouts
  const renderDesktopSlideLayout = (step, slideIndex) => {
    switch (slideIndex) {
      case 0: // Slide 1: Large video left, 3 stacked small boxes right
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-6 h-[650px]">
            {renderVideoBlock(step, "col-span-2 row-span-3")}
            {renderTitleBlock(step, "col-span-1 row-span-1")}
            {renderDescriptionBlock(step, "col-span-1 row-span-1")}
            {renderHighlightsBlock(step, "col-span-1 row-span-1")}
          </div>
        );
      
      case 1: // Slide 2: Large video top, 2 smaller text boxes below (side-by-side)
        return (
          <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[650px]">
            {renderVideoBlock(step, "col-span-2 row-span-1")}
            {renderTitleBlock(step, "col-span-1 row-span-1")}
            {renderHighlightsBlock(step, "col-span-1 row-span-1")}
          </div>
        );
      
      case 2: // Slide 3: Bento with 4 blocks → big video right, title + description stacked left, highlights below
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-6 h-[650px]">
            {renderTitleBlock(step, "col-span-1 row-span-1")}
            {renderVideoBlock(step, "col-span-2 row-span-2")}
            {renderDescriptionBlock(step, "col-span-1 row-span-1")}
            {renderIconBlock(step, "col-span-1 row-span-1")}
            {renderHighlightsBlock(step, "col-span-2 row-span-1")}
          </div>
        );
      
      case 3: // Slide 4: Minimal 3-block layout → big video center, small title left, small highlights right
        return (
          <div className="grid grid-cols-4 grid-rows-2 gap-6 h-[650px]">
            {renderTitleBlock(step, "col-span-1 row-span-2")}
            {renderVideoBlock(step, "col-span-2 row-span-2")}
            {renderHighlightsBlock(step, "col-span-1 row-span-2")}
          </div>
        );
      
      default:
        return (
          <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[650px]">
            {renderVideoBlock(step, "col-span-1 row-span-1")}
            {renderTitleBlock(step, "col-span-1 row-span-1")}
            {renderDescriptionBlock(step, "col-span-1 row-span-1")}
            {renderHighlightsBlock(step, "col-span-1 row-span-1")}
          </div>
        );
    }
  };

  // Render specific slide layouts based on device
  const renderSlideLayout = (step, slideIndex) => {
    return isMobile ? renderMobileSlideLayout(step, slideIndex) : renderDesktopSlideLayout(step, slideIndex);
  };

  return (
    <section className="horizontal-scroll overflow-hidden bg-black">
      {/* Parallax Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#54bb74]/10 to-transparent animate-pulse"></div>
      </div>
      
      <div className={`flex ${isMobile ? 'h-auto' : 'h-screen'}`}>
        {steps.map((step, stepIndex) => (
          <div key={step.id} className={`scroll-card flex-shrink-0 w-screen ${isMobile ? 'h-auto min-h-screen' : 'h-full'} flex items-center justify-center relative p-4 md:p-8`}>
            {/* Slide Background Glow */}
            <div className="absolute inset-0 opacity-30" 
                 style={{background: `radial-gradient(circle at center, ${step.color}05 0%, transparent 70%)`}}></div>
            
            <div className="relative z-10 w-full max-w-7xl mx-auto">
              {/* Step Counter for Mobile */}
              {isMobile && (
                <div className="flex items-center justify-center mb-6">
                  <div className="flex space-x-2">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === stepIndex ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm ml-4">
                    {stepIndex + 1} / {steps.length}
                  </span>
                </div>
              )}

              {/* Dynamic Slide Layout */}
              {renderSlideLayout(step, stepIndex)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
