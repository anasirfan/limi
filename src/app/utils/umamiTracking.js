// Umami tracking utility for LimiFuture slides
export const trackUmamiEvent = (eventName, eventData = {}) => {
  try {
    // Check if umami is available
    if (typeof window !== 'undefined' && window.umami) {
      // Get additional metadata
      const metadata = {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
        screenResolution: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        ...eventData
      };

      // Track the event with umami
      window.umami.track(eventName, metadata);
      
      console.log(`Umami event tracked: ${eventName}`, metadata);
    } else {
      console.warn('Umami not available, event not tracked:', eventName);
    }
  } catch (error) {
    console.error('Error tracking Umami event:', error);
  }
};

// Track slide transitions
export const trackSlideTransition = (fromSlide, toSlide, method = 'navigation') => {
  trackUmamiEvent('limifuture_slide_transition', {
    fromSlide,
    toSlide,
    transitionMethod: method,
    slideDirection: toSlide > fromSlide ? 'forward' : 'backward'
  });
};

// Track popup interactions
export const trackPopupInteraction = (slideNumber, popupId, action = 'open') => {
  trackUmamiEvent(`limifuture_slide${slideNumber}_popup_${action}`, {
    slideNumber,
    popupId,
    action,
    popupType: 'info_modal'
  });
};

// Track carousel interactions
export const trackCarouselInteraction = (action, slideNumber, additionalData = {}) => {
  trackUmamiEvent(`limifuture_carousel_${action}`, {
    slideNumber,
    action,
    ...additionalData
  });
};

// Track assembly page specific events
export const trackAssemblyEvent = (eventName, eventData = {}) => {
  trackUmamiEvent(`assembly_${eventName}`, {
    page: 'assembly',
    ...eventData
  });
};

// Track Hero carousel interactions
export const trackHeroCarousel = (action, slideNumber, slideTitle, additionalData = {}) => {
  trackAssemblyEvent('hero_carousel', {
    action,
    slideNumber,
    slideTitle,
    carouselType: 'hero',
    ...additionalData
  });
};

// Track modal interactions
export const trackModalInteraction = (modalType, action, formData = {}) => {
  trackAssemblyEvent('modal_interaction', {
    modalType,
    action,
    hasFormData: Object.keys(formData).length > 0,
    formFields: Object.keys(formData),
    ...formData
  });
};

// Track video interactions
export const trackVideoInteraction = (videoType, action, videoId, additionalData = {}) => {
  trackAssemblyEvent('video_interaction', {
    videoType,
    action,
    videoId,
    ...additionalData
  });
};

// Track benefit timeline interactions
export const trackBenefitTimeline = (action, benefitIndex, benefitTitle, additionalData = {}) => {
  trackAssemblyEvent('benefit_timeline', {
    action,
    benefitIndex,
    benefitTitle,
    ...additionalData
  });
};

// Track CTA interactions
export const trackCTAInteraction = (ctaType, action, additionalData = {}) => {
  trackAssemblyEvent('cta_interaction', {
    ctaType,
    action,
    ...additionalData
  });
};

// Track 3D viewer interactions
export const trackViewerInteraction = (action, viewMode, additionalData = {}) => {
  trackAssemblyEvent('3d_viewer', {
    action,
    viewMode,
    ...additionalData
  });
};

// Track sensor card interactions
export const trackSensorCard = (action, sensorType, additionalData = {}) => {
  trackAssemblyEvent('sensor_card', {
    action,
    sensorType,
    ...additionalData
  });
};

// Track scroll-based interactions
export const trackScrollInteraction = (section, scrollProgress, additionalData = {}) => {
  trackAssemblyEvent('scroll_interaction', {
    section,
    scrollProgress: Math.round(scrollProgress * 100),
    ...additionalData
  });
};

// Track form submissions
export const trackFormSubmission = (formType, success, formData = {}, errorMessage = null) => {
  trackAssemblyEvent('form_submission', {
    formType,
    success,
    hasName: !!formData.name,
    hasEmail: !!formData.email,
    hasCompany: !!formData.company,
    errorMessage,
    submissionTime: new Date().toISOString()
  });
};

// Track page performance metrics
export const trackPagePerformance = (metrics) => {
  trackAssemblyEvent('page_performance', {
    loadTime: metrics.loadTime,
    firstContentfulPaint: metrics.fcp,
    largestContentfulPaint: metrics.lcp,
    cumulativeLayoutShift: metrics.cls,
    firstInputDelay: metrics.fid,
    timeToInteractive: metrics.tti
  });
};
