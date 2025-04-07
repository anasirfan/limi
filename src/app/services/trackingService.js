/**
 * Tracking service to collect and send visitor data
 */

// Session start time
let startTime = null;
let idleTimeout = null;
let pagesVisited = [];
const IDLE_TIMEOUT_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds

/**
 * Initialize tracking service
 */
export const initTracking = () => {
  startTime = Date.now();
  resetIdleTimer();
  
  // Add current page to visited pages
  const currentPath = window.location.pathname;
  // Map the path to a simpler format for the API
  let simplifiedPath = 'home';
  
  if (currentPath.startsWith('/customer/')) {
    simplifiedPath = 'customer';
  } else if (currentPath.includes('privacy') || currentPath.includes('policy')) {
    simplifiedPath = 'policy';
  }
  
  if (!pagesVisited.includes(simplifiedPath)) {
    pagesVisited.push(simplifiedPath);
  }
  
  // Set up event listeners for user activity
  document.addEventListener('mousemove', resetIdleTimer);
  document.addEventListener('mousedown', resetIdleTimer);
  document.addEventListener('keypress', resetIdleTimer);
  document.addEventListener('touchmove', resetIdleTimer);
  document.addEventListener('scroll', resetIdleTimer);
  
  // Set up beforeunload event to track session duration
  window.addEventListener('beforeunload', sendTrackingData);
};

/**
 * Reset the idle timer
 */
const resetIdleTimer = () => {
  if (idleTimeout) {
    clearTimeout(idleTimeout);
  }
  
  idleTimeout = setTimeout(() => {
    // User has been idle for 2 minutes, end session
    sendTrackingData();
  }, IDLE_TIMEOUT_DURATION);
};

/**
 * Extract customer ID from URL query parameter or referrer
 * @returns {string|null} Customer ID or null if not present
 */
const extractCustomerId = () => {
  // First check for 'from' query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const fromParam = urlParams.get('from');
  if (fromParam) {
    return fromParam;
  }
  
  // If no query parameter, check if referrer is from a customer profile page
  const referrer = document.referrer;
  if (referrer && referrer.includes('/customer/')) {
    try {
      // Extract the customer ID from the referrer URL
      // Format: https://limilighting.co.uk/customer/{customerId}
      const referrerUrl = new URL(referrer);
      const pathParts = referrerUrl.pathname.split('/');
      const customerId = pathParts[pathParts.length - 1];
      
      // Validate that we have a proper ID (basic validation)
      if (customerId && customerId.length > 3) {
        return customerId;
      }
    } catch (error) {
      console.error('Error extracting customer ID from referrer:', error);
    }
  }
  
  return null;
};

/**
 * Get IP address and country information
 * @returns {Promise<Object>} IP and country data
 */
const getIpInfo = async () => {
  try {
    // Try multiple IP APIs in case one fails
    // First try our own API proxy to avoid CORS issues
    try {
      const response = await fetch('/api/get-ip-info');
      if (response.ok) {
        return await response.json();
      }
    } catch (innerError) {
      console.warn('Error using proxy API for IP info:', innerError);
    }
    
    // Fallback to direct API call (may have CORS issues in some environments)
    try {
      const response = await fetch('https://ipapi.co/json', { mode: 'cors' });
      if (response.ok) {
        return await response.json();
      }
    } catch (innerError) {
      console.warn('Error using direct API for IP info:', innerError);
    }
    
    // If all APIs fail, throw error to use fallback values
    throw new Error('All IP info APIs failed');
  } catch (error) {
    console.error('Error fetching IP info:', error);
    // Return fallback values
    return { 
      ip: '127.0.0.1', 
      country_name: 'Unknown' 
    };
  }
};

/**
 * Calculate session duration in seconds
 * @returns {number} Session duration in seconds
 */
const calculateSessionDuration = () => {
  if (!startTime) return 0;
  return Math.floor((Date.now() - startTime) / 1000);
};

/**
 * Send tracking data to the server
 */
export const sendTrackingData = async () => {
  try {
    // Check if consent was given
    const consentStatus = localStorage.getItem('cookieConsent');
    if (consentStatus !== 'true') return;
    
    // Get IP and country info
    const ipInfo = await getIpInfo();
    
    // Prepare tracking data
    const trackingData = {
      customerId: extractCustomerId(),
      ipAddress: ipInfo.ip || null,
      country: ipInfo.country_name || null,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
      sessionDuration: calculateSessionDuration(),
      pagesVisited: [...pagesVisited],
      consent: true,
      timestamp: new Date().toISOString()
    };
    
    // Send data directly to the server API
    await fetch('https://api.limitless-lighting.co.uk/client/tracking_capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackingData),
    });
    
    // Reset tracking data
    startTime = Date.now();
    pagesVisited = [window.location.pathname];
    
  } catch (error) {
    console.error('Error sending tracking data:', error);
  }
};

/**
 * Track page navigation
 * @param {string} path - The path that was navigated to
 */
export const trackPageNavigation = (path) => {
  // Map the path to a simpler format for the API
  let simplifiedPath = 'home';
  
  if (path.startsWith('/customer/')) {
    simplifiedPath = 'customer';
  } else if (path.includes('privacy') || path.includes('policy')) {
    simplifiedPath = 'policy';
  }
  
  if (!pagesVisited.includes(simplifiedPath)) {
    pagesVisited.push(simplifiedPath);
  }
};

/**
 * Clean up tracking service
 */
export const cleanupTracking = () => {
  document.removeEventListener('mousemove', resetIdleTimer);
  document.removeEventListener('mousedown', resetIdleTimer);
  document.removeEventListener('keypress', resetIdleTimer);
  document.removeEventListener('touchmove', resetIdleTimer);
  document.removeEventListener('scroll', resetIdleTimer);
  
  window.removeEventListener('beforeunload', sendTrackingData);
  
  if (idleTimeout) {
    clearTimeout(idleTimeout);
  }
};
