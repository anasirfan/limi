// Cache for API data
let cachedSystemAssignments = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const POLL_INTERVAL = 10 * 1000; // 10 seconds polling
let pollTimer = null;
let lastDataHash = null;

// Event listeners for data refresh
const refreshCallbacks = new Set();

// Subscribe to data refresh events
export const onDataRefresh = (callback) => {
  refreshCallbacks.add(callback);
  return () => refreshCallbacks.delete(callback); // Return unsubscribe function
};

// Notify all subscribers of data refresh
const notifyDataRefresh = (newData) => {
  refreshCallbacks.forEach(callback => {
    try {
      callback(newData);
    } catch (error) {
      console.error('Error in data refresh callback:', error);
    }
  });
};

// Generate hash for data comparison
const generateDataHash = (data) => {
  try {
    return btoa(JSON.stringify(data.map(item => ({ 
      id: item.id, 
      design: item.design, 
      isShow: item.isShow,
      updatedAt: item.updatedAt || item.updated_at 
    }))));
  } catch (error) {
    console.error('Error generating data hash:', error);
    return Date.now().toString(); // Fallback to timestamp
  }
};

// Fetch pendant/system data from API
const fetchSystemAssignments = async () => {
  try {
    const response = await fetch("https://api1.limitless-lighting.co.uk/admin/configurator/system", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch pendant/system data");
    }

    const data = await response.json();
    const formattedData = Array.isArray(data) ? data : data?.data || [];
    
    // Check if data has changed
    const newDataHash = generateDataHash(formattedData);
    const dataChanged = lastDataHash && lastDataHash !== newDataHash;
    
    // Cache the data
    cachedSystemAssignments = formattedData;
    cacheTimestamp = Date.now();
    lastDataHash = newDataHash;
    
    // Always log the fetch for debugging
    console.log('🔄 API fetch completed:', {
      itemCount: formattedData.length,
      dataChanged,
      newHash: newDataHash.substring(0, 10) + '...',
      oldHash: lastDataHash ? lastDataHash.substring(0, 10) + '...' : 'none'
    });
    
    // Notify subscribers if data changed OR if this is the first load
    if (dataChanged || !lastDataHash) {
      console.log('🔄 API data updated, notifying components...');
      notifyDataRefresh(formattedData);
    }
    
    return formattedData;
  } catch (error) {
    console.error("Error fetching pendant/system data from API:", error);
    throw error; // Only use API data, do not fallback
  }
};

// Start periodic polling
const startPolling = () => {
  if (pollTimer) return; // Already polling
  
  pollTimer = setInterval(async () => {
    try {
      await fetchSystemAssignments();
    } catch (error) {
      console.error('Polling error:', error);
    }
  }, POLL_INTERVAL);
  
  console.log('🔄 Started API polling every 30 seconds');
};

// Stop periodic polling
const stopPolling = () => {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
    console.log('⏹️ Stopped API polling');
  }
};

// Auto-refresh on page visibility change
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', async () => {
    if (!document.hidden) {
      console.log('🔄 Page became visible, refreshing data...');
      await refreshSystemAssignments();
    }
  });

  // Auto-refresh on window focus
  window.addEventListener('focus', async () => {
    console.log('🔄 Window focused, refreshing data...');
    await refreshSystemAssignments();
  });

  // Start polling when module loads
  startPolling();
}

// Get system assignments with caching and filter by isShow: true (FOR CONFIGURATOR)
export const getSystemAssignments = async () => {
  let assignments;
  
  // Check if we have cached data and it's still valid
  if (cachedSystemAssignments && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    assignments = cachedSystemAssignments;
    console.log('🔄 Using cached system assignments (configurator - visible only)');
  } else {
    // Fetch fresh data
    assignments = await fetchSystemAssignments();
  }
  
  // Filter to only show visible items for configurator
  return assignments.filter(item => item.isShow === true);
};

// Get ALL system assignments with caching (FOR DASHBOARD)
export const getAllSystemAssignments = async () => {
  let assignments;
  
  // Check if we have cached data and it's still valid
  if (cachedSystemAssignments && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    assignments = cachedSystemAssignments;
    console.log('🔄 Using cached system assignments (dashboard - all items)');
  } else {
    // Fetch fresh data
    assignments = await fetchSystemAssignments();
  }
  
  // Return ALL items for dashboard management
  return assignments;
};

// Legacy export for backward compatibility (will use cached data or fetch if needed)
export const systemAssignments = await getSystemAssignments(); // Only use API data
// Dynamic filtered arrays that update based on API data (FOR CONFIGURATOR - VISIBLE ONLY)
export const getPendantAssignments = async () => {
  const assignments = await getSystemAssignments();
  return assignments.filter(a => !a.isSystem);
};

export const getBallAssignments = async () => {
  const assignments = await getSystemAssignments();
  return assignments.filter(a => a.isSystem && a.systemType === "ball");
};

export const getBarAssignments = async () => {
  const assignments = await getSystemAssignments();
  return assignments.filter(a => a.isSystem && a.systemType === "bar");
};

export const getUniversalAssignments = async () => {
  const assignments = await getSystemAssignments();
  return assignments.filter(a => a.isSystem && a.systemType === "universal");
};

export const getChandelierAssignments = async () => {
  const assignments = await getSystemAssignments();
  return assignments.filter(a => a.isSystem && a.systemType === "chandelier");
};

// Dynamic filtered arrays for DASHBOARD (ALL ITEMS - INCLUDING HIDDEN)
export const getAllPendantAssignments = async () => {
  const assignments = await getAllSystemAssignments();
  return assignments.filter(a => !a.isSystem);
};

export const getAllBallAssignments = async () => {
  const assignments = await getAllSystemAssignments();
  return assignments.filter(a => a.isSystem && a.systemType === "ball");
};

export const getAllBarAssignments = async () => {
  const assignments = await getAllSystemAssignments();
  return assignments.filter(a => a.isSystem && a.systemType === "bar");
};

export const getAllUniversalAssignments = async () => {
  const assignments = await getAllSystemAssignments();
  return assignments.filter(a => a.isSystem && a.systemType === "universal");
};

export const getAllChandelierAssignments = async () => {
  const assignments = await getAllSystemAssignments();
  return assignments.filter(a => a.isSystem && a.systemType === "chandelier");
};

// Reactive synchronous exports that update when data changes
let _pendantAssignments = systemAssignments.filter(a => !a.isSystem);
let _ballAssignments = systemAssignments.filter(a => a.isSystem && a.systemType === "ball");
let _barAssignments = systemAssignments.filter(a => a.isSystem && a.systemType === "bar");
let _universalAssignments = systemAssignments.filter(a => a.isSystem && a.systemType === "universal");
let _chandelierAssignments = systemAssignments.filter(a => a.isSystem && a.systemType === "chandelier");

// Update reactive exports when data changes
const updateReactiveExports = (newData) => {
  _pendantAssignments = newData.filter(a => !a.isSystem);
  _ballAssignments = newData.filter(a => a.isSystem && a.systemType === "ball");
  _barAssignments = newData.filter(a => a.isSystem && a.systemType === "bar");
  _universalAssignments = newData.filter(a => a.isSystem && a.systemType === "universal");
  _chandelierAssignments = newData.filter(a => a.isSystem && a.systemType === "chandelier");
  
  console.log('🔄 Updated reactive exports:', {
    pendants: _pendantAssignments.length,
    balls: _ballAssignments.length,
    bars: _barAssignments.length,
    universals: _universalAssignments.length,
    chandeliers: _chandelierAssignments.length
  });
};

// Subscribe to data changes to update reactive exports
onDataRefresh(updateReactiveExports);

// Export getters that always return current data
export const pendantAssignments = new Proxy([], {
  get: (target, prop) => _pendantAssignments[prop],
  has: (target, prop) => prop in _pendantAssignments,
  ownKeys: () => Object.keys(_pendantAssignments),
  getOwnPropertyDescriptor: (target, prop) => Object.getOwnPropertyDescriptor(_pendantAssignments, prop)
});

export const ballAssignments = new Proxy([], {
  get: (target, prop) => _ballAssignments[prop],
  has: (target, prop) => prop in _ballAssignments,
  ownKeys: () => Object.keys(_ballAssignments),
  getOwnPropertyDescriptor: (target, prop) => Object.getOwnPropertyDescriptor(_ballAssignments, prop)
});

export const barAssignments = new Proxy([], {
  get: (target, prop) => _barAssignments[prop],
  has: (target, prop) => prop in _barAssignments,
  ownKeys: () => Object.keys(_barAssignments),
  getOwnPropertyDescriptor: (target, prop) => Object.getOwnPropertyDescriptor(_barAssignments, prop)
});

export const universalAssignments = new Proxy([], {
  get: (target, prop) => _universalAssignments[prop],
  has: (target, prop) => prop in _universalAssignments,
  ownKeys: () => Object.keys(_universalAssignments),
  getOwnPropertyDescriptor: (target, prop) => Object.getOwnPropertyDescriptor(_universalAssignments, prop)
});

export const chandelierAssignments = new Proxy([], {
  get: (target, prop) => _chandelierAssignments[prop],
  has: (target, prop) => prop in _chandelierAssignments,
  ownKeys: () => Object.keys(_chandelierAssignments),
  getOwnPropertyDescriptor: (target, prop) => Object.getOwnPropertyDescriptor(_chandelierAssignments, prop)
});

// Extract base IDs dynamically
export const barBaseIds = barAssignments.map(a => a.design);
export const universalBaseIds = universalAssignments.map(a => a.design);
export const ballBaseIds = ballAssignments.map(a => a.design);
export const pendantTypes = pendantAssignments.map(a => a.design);
export const chandelierBaseIds = chandelierAssignments.map(a => a.design);

// Refresh cache function with enhanced capabilities
export const refreshSystemAssignments = async () => {
  console.log('🔄 Manually refreshing system assignments...');
  cachedSystemAssignments = null;
  cacheTimestamp = null;
  return await getSystemAssignments();
};

// Force refresh (ignores cache completely)
export const forceRefreshSystemAssignments = async () => {
  console.log('🔄 Force refreshing system assignments...');
  cachedSystemAssignments = null;
  cacheTimestamp = null;
  lastDataHash = null;
  return await fetchSystemAssignments();
};

// Debug function to manually trigger refresh and see current data
export const debugCurrentData = async () => {
  console.log('🔍 Debug: Current cached data:', {
    hasCachedData: !!cachedSystemAssignments,
    cacheAge: cacheTimestamp ? Date.now() - cacheTimestamp : 'no cache',
    itemCount: cachedSystemAssignments?.length || 0,
    lastHash: lastDataHash?.substring(0, 10) + '...' || 'none'
  });
  
  console.log('🔍 Debug: Forcing fresh API call...');
  const freshData = await forceRefreshSystemAssignments();
  console.log('🔍 Debug: Fresh data received:', {
    itemCount: freshData.length,
    items: freshData.map(item => ({ id: item.id, design: item.design, isShow: item.isShow }))
  });
  
  return freshData;
};

// Manual polling controls
export const startDataPolling = startPolling;
export const stopDataPolling = stopPolling;

// Check if data is stale
export const isDataStale = () => {
  return !cacheTimestamp || (Date.now() - cacheTimestamp > CACHE_DURATION);
};