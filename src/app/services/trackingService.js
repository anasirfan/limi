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
let isInitialized = false; // Track if the service has been initialized
let isDataBeingSent = false; // Track if data is currently being sent
const IDLE_TIMEOUT_DURATION = 300 * 1000; // 30 seconds in milliseconds
const UPDATE_INTERVAL = 300 * 1000; // 30 seconds in milliseconds

/**
 * Initialize tracking service
 */
export const initTracking = () => {
  // Prevent multiple initializations in the same page load
  if (isInitialized) {
    console.log('🔔 TRACKING SERVICE ALREADY INITIALIZED, SKIPPING');
    return;
  }
  
  // Prevent multiple initializations across different components
  if (typeof window !== 'undefined' && window.__hasInitializedTracking) {
    console.log('🔔 TRACKING ALREADY INITIALIZED BY ANOTHER COMPONENT, SKIPPING');
    isInitialized = true;
    return;
  }
  
  console.log('🔔 INITIALIZING TRACKING SERVICE');
  isInitialized = true;
  
  if (typeof window !== 'undefined') {
    window.__hasInitializedTracking = true;
  }
  
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
 * Extract customer ID from URL if available
 * @returns {string|null} Customer ID or null if not found
 */
const extractCustomerId = () => {
  if (typeof window === 'undefined') return null;
  
  // First check if we have a stored customer ID from previous navigation
  const storedCustomerId = localStorage.getItem('lastCustomerId');
  
  // Then check the current URL
  const path = window.location.pathname;
  const customerIdMatch = path.match(/\/customer\/([^\/]+)/);
  
  // If we find a customer ID in the URL, store it for future reference
  if (customerIdMatch && customerIdMatch[1]) {
    const currentCustomerId = customerIdMatch[1];
    console.log('💼 FOUND CUSTOMER ID IN URL:', currentCustomerId);
    localStorage.setItem('lastCustomerId', currentCustomerId);
    return currentCustomerId;
  }
  
  // If not in the URL but we have a stored one, use that
  if (storedCustomerId) {
    console.log('💼 USING STORED CUSTOMER ID:', storedCustomerId);
    return storedCustomerId;
  }
  
  return null;
};

/**
 * Get IP address and country information directly from client-side
 * @returns {Promise<Object>} IP and country data
 */
const getIpInfo = async () => {
  try {
    // Store cached IP info to avoid multiple requests in the same session
    const cachedIpInfo = localStorage.getItem('cachedIpInfo');
    if (cachedIpInfo) {
      try {
        const parsedCache = JSON.parse(cachedIpInfo);
        const cacheTime = parsedCache.timestamp || 0;
        const now = Date.now();
        // Use cache if it's less than 1 hour old
        if (now - cacheTime < 60 * 60 * 1000) {
          console.log('Using cached IP info:', parsedCache);
          return parsedCache;
        }
      } catch (e) {
        console.warn('Error parsing cached IP info:', e);
      }
    }
    
    // Try multiple client-side IP APIs in sequence until one works
    let ipInfo = null;
    
    // Try ipapi.co directly (most reliable but may have CORS issues)
    if (!ipInfo) {
      try {
        console.log('Trying direct ipapi.co request...');
        const response = await fetch('https://ipapi.co/json', { 
          mode: 'cors',
          headers: {
            'User-Agent': 'LIMI-Lighting-App/1.0'
          }
        });
        
        if (response.ok) {
          ipInfo = await response.json();
          console.log('Successfully got IP info from ipapi.co:', ipInfo);
        }
      } catch (err) {
        console.warn('ipapi.co direct request failed:', err);
      }
    }
    
    // Try ipinfo.io as a backup
    if (!ipInfo) {
      try {
        console.log('Trying ipinfo.io request...');
        const response = await fetch('https://ipinfo.io/json', { 
          mode: 'cors' 
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Successfully got IP info from ipinfo.io:', data);
          
          // Map ipinfo.io fields to our expected format
          ipInfo = {
            ip: data.ip,
            city: data.city,
            region: data.region,
            country_name: data.country,
            postal: data.postal,
            timezone: data.timezone,
            org: data.org
          };
        }
      } catch (err) {
        console.warn('ipinfo.io request failed:', err);
      }
    }
    
    // If direct client-side APIs fail, fall back to our server API
    if (!ipInfo) {
      try {
        console.log('Falling back to server API...');
        const response = await fetch('/api/get-ip-info');
        if (response.ok) {
          ipInfo = await response.json();
          console.log('Got IP info from server API:', ipInfo);
        }
      } catch (err) {
        console.warn('Server API request failed:', err);
      }
    }
    
    // If we got valid IP info, cache it
    if (ipInfo && ipInfo.ip && ipInfo.ip !== '127.0.0.1') {
      // Add timestamp for cache expiration
      ipInfo.timestamp = Date.now();
      localStorage.setItem('cachedIpInfo', JSON.stringify(ipInfo));
      console.log('Cached IP info for future use');
      return ipInfo;
    }
    
    // If all APIs fail, throw error to use fallback values
    if (!ipInfo) {
      throw new Error('All IP info APIs failed');
    }
    
    return ipInfo;
  } catch (error) {
    console.error('Error fetching IP info:', error);
    // Return fallback values
    return { 
      ip: '127.0.0.1', 
      country_name: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      postal: 'Unknown',
      timezone: 'Unknown',
      org: 'Unknown'
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
      
      // Set the trackingDataSent flag to true since we have an existing session
      localStorage.setItem('trackingDataSent', 'true');
      
      // Ensure we don't create a new session on this page load
      window.__hasInitializedTracking = true;
    } else {
      console.log('🔄 NO EXISTING SESSION FOUND');
      // Create a new session ID only if one doesn't exist
      sessionId = generateSessionId();
      console.log('🔄 CREATED NEW SESSION - ID:', sessionId);
      localStorage.setItem('trackingDataSent', 'false');
    }
  } catch (error) {
    console.error('❌ ERROR RESTORING SESSION:', error);
    // If there's an error, create a new session
    sessionId = generateSessionId();
    totalSessionDuration = 0;
    console.log('🔄 CREATED NEW SESSION AFTER ERROR - ID:', sessionId);
    localStorage.setItem('trackingDataSent', 'false');
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
  
  // Check for consent before sending initial tracking data
  const initialConsent = localStorage.getItem('cookieConsent');
  console.log(`⏱️ CHECKING INITIAL CONSENT STATUS: ${initialConsent === 'true' ? 'Granted' : 'Not granted'}`);
  
  if (initialConsent === 'true') {
    // Check if we've sent data before
    const hasSentDataBefore = localStorage.getItem('trackingDataSent');
    
    if (hasSentDataBefore === 'true') {
      console.log(`⏱️ SENDING INITIAL UPDATE TO EXISTING SESSION`);
      sendTrackingData(false, true); // Update existing session
    } else {
      console.log(`⏱️ SENDING INITIAL TRACKING DATA AS NEW SESSION`);
      sendTrackingData(false, false); // Send initial data as a new session
    }
  } else {
    console.log(`⏱️ CONSENT NOT GIVEN YET, WAITING FOR USER CONSENT`);
  }
  
  // Send data every 30 seconds to ensure we capture data even if close events fail
  const intervalId = setInterval(() => {
    console.log(`⏱️ 30-SECOND INTERVAL TRIGGERED - Checking consent status...`);
    
    // Check consent status on every interval
    const consentStatus = localStorage.getItem('cookieConsent');
    console.log(`⏱️ CURRENT CONSENT STATUS: ${consentStatus === 'true' ? 'Granted' : 'Not granted'}`);
    
    if (consentStatus === 'true') {
      console.log(`⏱️ Current session duration: ${calculateTotalSessionDuration()} seconds`);
      console.log(`⏱️ Pages visited: ${pagesVisited.join(', ')}`);
      
      // Check if we've sent data before
      const hasSentDataBefore = localStorage.getItem('trackingDataSent');
      
      if (hasSentDataBefore === 'true') {
        // If we've sent data before, this is an update
        console.log(`⏱️ SENDING UPDATE TO EXISTING SESSION`);
        sendTrackingData(false, true); // Update existing session
      } else {
        // If this is the first time sending data after consent, send as new
        console.log(`⏱️ SENDING FIRST TRACKING DATA AFTER CONSENT`);
        sendTrackingData(false, false); // New session
        localStorage.setItem('trackingDataSent', 'true');
      }
      
      lastUpdateTime = Date.now();
    } else {
      console.log(`⏱️ CONSENT NOT GIVEN, SKIPPING DATA SEND`);
    }
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
    
    // Add cleanup on page unload to prevent memory leaks
    window.addEventListener('unload', () => {
      if (window.__trackingIntervalId) {
        clearInterval(window.__trackingIntervalId);
        console.log('⏱️ Cleared tracking interval on page unload');
      }
    });
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
    
    // Prevent duplicate sends (except for page close events which are critical)
    if (isDataBeingSent && !isClosing) {
      console.log('⚠️ Data send already in progress, skipping duplicate send');
      return;
    }
    
    isDataBeingSent = true;
    
    // Mark that we've sent tracking data at least once
    localStorage.setItem('trackingDataSent', 'true');
    
    console.log(`💬 SENDING ${isUpdate ? 'UPDATE' : 'NEW'} TRACKING DATA...`);
    
    // Handle referrer tracking
    let referrer = document.referrer || null;
    const storedReferrer = localStorage.getItem('initialReferrer');
    const storedSessionReferrer = localStorage.getItem('sessionReferrer');
    const currentUrl = window.location.href;
    
    // Check if we're on a customer page
    const isCustomerPage = window.location.pathname.includes('/customer/');
    
    // If we're on a customer page, store it as a potential referrer
    if (isCustomerPage) {
      localStorage.setItem('customerPageReferrer', currentUrl);
      console.log('🔗 STORED CUSTOMER PAGE AS POTENTIAL REFERRER:', currentUrl);
    }
    
    // For session updates, prioritize the stored session referrer to prevent overwrites
    if (isUpdate && storedSessionReferrer) {
      referrer = storedSessionReferrer;
      console.log('🔗 USING STORED SESSION REFERRER FOR UPDATE:', referrer);
    }
    // If we have a direct referrer, use it
    else if (referrer) {
      console.log('🔗 CURRENT PAGE REFERRER:', referrer);
      
      // If this is the first page load with a referrer, store it
      if (!storedReferrer) {
        localStorage.setItem('initialReferrer', referrer);
        console.log('🔗 STORED INITIAL REFERRER:', referrer);
      }
    } 
    // If no direct referrer but we came from a customer page
    else if (!referrer && !isCustomerPage) {
      const customerReferrer = localStorage.getItem('customerPageReferrer');
      if (customerReferrer) {
        referrer = customerReferrer;
        console.log('🔗 USING CUSTOMER PAGE AS REFERRER:', referrer);
      }
    }
    // If we're on a subsequent page and have a stored referrer, use that
    else if (storedReferrer && !referrer) {
      referrer = storedReferrer;
      console.log('🔗 USING STORED INITIAL REFERRER:', referrer);
    }
    
    // Store the current referrer for future updates
    if (referrer) {
      localStorage.setItem('sessionReferrer', referrer);
      console.log('🔗 SAVED REFERRER FOR FUTURE UPDATES:', referrer);
    }
    
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
      city: ipInfo.city || null,
      region: ipInfo.region || null,
      org: ipInfo.org || null,
      postal: ipInfo.postal || null,
      timezone: ipInfo.timezone || null,
      referrer: referrer, // Use our improved referrer handling
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
  } finally {
    // Reset the flag to allow future sends
    isDataBeingSent = false;
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

/**
 * Set cookie consent status
 * @param {boolean} consent - Whether consent was given
 */
export const setCookieConsent = (consent) => {
  localStorage.setItem('cookieConsent', consent);
  
  // If consent was just given, send tracking data immediately
  if (consent === true) {
    console.log('👍 CONSENT JUST GIVEN! Sending initial tracking data...');
    // Check if we've sent data before
    const hasSentDataBefore = localStorage.getItem('trackingDataSent');
    
    if (hasSentDataBefore === 'true') {
      // Update existing session
      console.log('👍 UPDATING EXISTING SESSION AFTER CONSENT');
      sendTrackingData(false, true);
    } else {
      // Send as new session since this is the first time after consent
      console.log('👍 CREATING NEW SESSION AFTER CONSENT');
      sendTrackingData(false, false);
    }
  }
};
