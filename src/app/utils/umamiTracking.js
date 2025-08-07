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
