/**
 * Tracking service to collect and send visitor data
 */

// Session tracking variables
let startTime = null;
let idleTimeout = null;
let pagesVisited = [];
let sessionId = null;
let totalSessionDuration = 0;
let lastUpdateTime = null;
const IDLE_TIMEOUT_DURATION = 30 * 1000; // 30 seconds in milliseconds
const UPDATE_INTERVAL = 30 * 1000; // 30 seconds in milliseconds

/**
 * Initialize tracking service
 */
export const initTracking = () => {
  // Generate a unique session ID if one doesn't exist
  if (!sessionId) {
    sessionId = generateSessionId();
  }
  
  // Initialize or restore session data
  startTime = Date.now();
  lastUpdateTime = Date.now();
  
  // Try to restore session data from localStorage
  tryRestoreSession();
  
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
  
  // Set up multiple events to ensure tracking data is sent when the page is closed
  console.log('Setting up page close event listeners for tracking...');
  window.addEventListener('beforeunload', (e) => {
    console.log('🔴 beforeunload event triggered');
    handlePageClose(e);
  });
  window.addEventListener('pagehide', (e) => {
    console.log('🔴 pagehide event triggered');
    handlePageClose(e);
  });
  window.addEventListener('unload', (e) => {
    console.log('🔴 unload event triggered');
    handlePageClose(e);
  });
  console.log('All page close event listeners registered');
  
  // Set up periodic data sending to ensure data is captured even if close events fail
  startPeriodicDataSending();
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
 * Generate a unique session ID
 * @returns {string} A unique session ID
 */
const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
};

/**
 * Try to restore session data from localStorage
 */
const tryRestoreSession = () => {
  try {
    console.log('🔄 ATTEMPTING TO RESTORE SESSION FROM LOCAL STORAGE');
    const savedSession = localStorage.getItem('trackingSession');
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);
      console.log('🔄 FOUND EXISTING SESSION:', sessionData);
      sessionId = sessionData.sessionId;
      totalSessionDuration = sessionData.totalDuration || 0;
      pagesVisited = sessionData.pagesVisited || [];
      console.log('🔄 SESSION RESTORED - ID:', sessionId, 'DURATION:', totalSessionDuration, 'PAGES:', pagesVisited);
    } else {
      console.log('🔄 NO EXISTING SESSION FOUND');
    }
  } catch (error) {
    console.error('❌ ERROR RESTORING SESSION:', error);
    // If there's an error, create a new session
    sessionId = generateSessionId();
    totalSessionDuration = 0;
    console.log('🔄 CREATED NEW SESSION AFTER ERROR - ID:', sessionId);
  }
};

/**
 * Save session data to localStorage
 */
const saveSessionData = () => {
  try {
    const currentDuration = calculateCurrentDuration();
    totalSessionDuration += currentDuration;
    
    const sessionData = {
      sessionId,
      totalDuration: totalSessionDuration,
      pagesVisited
    };
    
    console.log('💾 SAVING SESSION DATA TO LOCAL STORAGE:', sessionData);
    localStorage.setItem('trackingSession', JSON.stringify(sessionData));
    
    // Reset the start time for the next duration calculation
    startTime = Date.now();
    console.log('💾 SESSION DATA SAVED, RESET START TIME TO:', new Date(startTime).toISOString());
  } catch (error) {
    console.error('❌ ERROR SAVING SESSION DATA:', error);
  }
};

/**
 * Calculate current duration since last update in seconds
 * @returns {number} Duration in seconds
 */
const calculateCurrentDuration = () => {
  if (!startTime) return 0;
  return Math.floor((Date.now() - startTime) / 1000);
};

/**
 * Calculate total session duration in seconds
 * @returns {number} Total session duration in seconds
 */
const calculateTotalSessionDuration = () => {
  return totalSessionDuration + calculateCurrentDuration();
};

/**
 * Start periodic data sending to ensure data is captured
 */
const startPeriodicDataSending = () => {
  console.log(`⏱️ Setting up periodic tracking every ${UPDATE_INTERVAL/1000} seconds`);
  
  // Immediately send the first tracking data
  console.log(`⏱️ SENDING INITIAL TRACKING DATA`);
  sendTrackingData(false, false); // Send initial data as a new session
  
  // Send data every 30 seconds to ensure we capture data even if close events fail
  const intervalId = setInterval(() => {
    console.log(`⏱️ 30-SECOND INTERVAL TRIGGERED - Sending update...`);
    // Force send tracking data every interval regardless of conditions
    console.log(`⏱️ Current session duration: ${calculateTotalSessionDuration()} seconds`);
    console.log(`⏱️ Pages visited: ${pagesVisited.join(', ')}`);
    
    // Always send the update
    sendTrackingData(false, true); // Update existing session
    lastUpdateTime = Date.now();
  }, UPDATE_INTERVAL);
  
  // Store the interval ID to clear it when needed
  if (typeof window !== 'undefined') {
    // Clear any existing interval to prevent duplicates
    if (window.__trackingIntervalId) {
      console.log('⏱️ Clearing existing tracking interval');
      clearInterval(window.__trackingIntervalId);
    }
    window.__trackingIntervalId = intervalId;
    console.log('⏱️ Tracking interval set with ID:', intervalId);
  }
};

/**
 * Handle page close events
 */
const handlePageClose = (event) => {
  console.log('🔴 PAGE CLOSE EVENT DETECTED!', event.type);
  console.log('🔴 Current session data before close:', {
    sessionId,
    totalSessionDuration,
    pagesVisited,
    startTime
  });
  
  // Save session data before closing
  saveSessionData();
  console.log('🔴 Session data saved to localStorage');
  
  // Use sendBeacon for more reliable data sending when page is closing
  console.log('🔴 Attempting to send final tracking data via beacon...');
  sendTrackingData(true, true); // isClosing=true, isUpdate=true
  
  // Clear the interval
  if (typeof window !== 'undefined' && window.__trackingIntervalId) {
    clearInterval(window.__trackingIntervalId);
    console.log('🔴 Tracking interval cleared');
  }
  
  // Add a message that will only show if beacon failed
  setTimeout(() => {
    console.log('⚠️ If you see this message, the page close event might have been canceled or the beacon might not have sent');
  }, 500);
};

/**
 * Send tracking data to the server
 * @param {boolean} isClosing - Whether the page is closing
 * @param {boolean} isUpdate - Whether this is an update to an existing session
 */
export const sendTrackingData = async (isClosing = false, isUpdate = false) => {
  try {
    // Check if consent was given
    const consentStatus = localStorage.getItem('cookieConsent');
    if (consentStatus !== 'true') {
      console.log('⚠️ Tracking consent not given, skipping data send');
      return;
    }
    
    console.log(`💬 SENDING ${isUpdate ? 'UPDATE' : 'NEW'} TRACKING DATA...`);
    
    // Save current session data before sending
    if (!isClosing) {
      saveSessionData();
    }
    
    // Get IP and country info
    const ipInfo = await getIpInfo();
    console.log('IP info received:', ipInfo);
    
    // Prepare tracking data
    const trackingData = {
      sessionId: sessionId,
      customerId: extractCustomerId(),
      ipAddress: ipInfo.ip || null,
      country: ipInfo.country_name || null,
      // city: ipInfo.city || null,
      // region: ipInfo.region || null,
      // org: ipInfo.org || null,
      // postal: ipInfo.postal || null,
      // timezone: ipInfo.timezone || null,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
      sessionDuration: calculateTotalSessionDuration(),
      pagesVisited: [...pagesVisited],
      consent: true,
      isUpdate: isUpdate, // Flag to indicate this is an update to an existing session
      browser: navigator.userAgent.match(/(chrome|safari|firefox|msie|trident|edge)/i)?.[0].toLowerCase() || 'unknown',
      device: /mobile|android|iphone|ipad|ipod/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
    };
    
    console.log(`Preparing to send ${isUpdate ? 'UPDATE' : 'NEW'} tracking data:`, trackingData);
    
    // Use the same endpoint for both new sessions and updates
    const endpoint = 'https://api.limitless-lighting.co.uk/client/tracking_capture';
    const method = 'POST';
    
    // Add _method key to the body if this is an update
    if (isUpdate) {
      trackingData._method = 'PATCH';
    } else {
      trackingData._method = 'POST';

    }
    
    // Use navigator.sendBeacon for more reliable data sending when page is closing
    if (isClosing && navigator.sendBeacon) {
      // SendBeacon is more reliable for sending data when the page is closing
      // Note: sendBeacon always uses POST method
      console.log('🔴 BEACON TEST: Preparing to send data via sendBeacon');
      console.log('🔴 BEACON DATA:', JSON.stringify(trackingData, null, 2));
      console.log('🔴 BACKEND ENDPOINT:', endpoint);
      console.log('🔴 HTTP METHOD: POST');
      console.log('🔴 _method in payload:', isUpdate ? 'PATCH' : 'Not included');
      
      // Check if sendBeacon is supported and working
      console.log('🔴 Is navigator.sendBeacon available?', !!navigator.sendBeacon);
      
      // Try to send the beacon and get the result
      const beaconResult = navigator.sendBeacon(
        endpoint,
        JSON.stringify(trackingData)
      );
      
      console.log('🔴 BEACON RESULT:', beaconResult ? 'SUCCESSFULLY QUEUED' : 'FAILED TO QUEUE');
      
      // This message might not show if the page closes immediately
      console.log('🔴 Beacon data sent. If you see this message, the browser had time to log before closing');
    } else {
      // Regular fetch for normal operation
      console.log(`🔵 SENDING DATA VIA FETCH:`);
      console.log(`🔵 BACKEND ENDPOINT: ${endpoint}`);
      console.log(`🔵 HTTP METHOD: POST`);
      console.log(`🔵 _method in payload: ${isUpdate ? 'PATCH' : 'Not included'}`);
      console.log('🔵 TRACKING DATA:', JSON.stringify(trackingData, null, 2));
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
        // Use keepalive to ensure the request completes even if the page is closing
        keepalive: true
      });
      
      if (response.ok) {
        console.log('🔵 TRACKING DATA SENT SUCCESSFULLY ✅');
        try {
          const responseData = await response.json();
          console.log('🔵 BACKEND RESPONSE:', responseData);
        } catch (jsonError) {
          console.log('🔵 RESPONSE RECEIVED BUT COULD NOT PARSE JSON');
        }
      } else {
        console.error('🔴 ERROR SENDING TRACKING DATA, STATUS:', response.status);
        try {
          const errorText = await response.text();
          console.error('🔴 ERROR RESPONSE:', errorText);
        } catch (e) {
          console.error('🔴 COULD NOT READ ERROR RESPONSE');
        }
      }
    }
    
    // Only reset start time if this isn't a final send before page close
    // We don't reset pagesVisited anymore since we're tracking cumulative data
    if (!isClosing) {
      startTime = Date.now();
      lastUpdateTime = Date.now();
    }
    
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
  } else if (
    path.includes('privacy-policy') || 
    path.includes('terms-of-service') || 
    path.includes('cookie-policy')
  ) {
    simplifiedPath = 'policy';
    console.log('📚 Policy page visit detected:', path);
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
