// Cache for API data
let cachedSystemAssignments = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const POLL_INTERVAL = 2 * 60 * 1000; // 2 minutes polling
let pollTimer = null;
let lastDataHash = null;

// Global system assignments store for immediate access
let globalSystemAssignments = [];

// Mount data cache and state
let cachedMountData = null;
let mountCacheTimestamp = null;
let mountPollTimer = null;
let lastMountDataHash = null;
let globalMountData = [];

// Scene data cache and state
let cachedSceneData = null;
let sceneCacheTimestamp = null;
let scenePollTimer = null;
let lastSceneDataHash = null;
let globalSceneData = [];

// Event listeners for data refresh
const refreshCallbacks = new Set();

// Mount data refresh callbacks
const mountRefreshCallbacks = new Set();

// Scene data refresh callbacks
const sceneRefreshCallbacks = new Set();

// Subscribe to data refresh events
export const onDataRefresh = (callback) => {
  refreshCallbacks.add(callback);
  return () => refreshCallbacks.delete(callback); // Return unsubscribe function
};

// Subscribe to mount data refresh events
export const onMountDataRefresh = (callback) => {
  mountRefreshCallbacks.add(callback);
  return () => mountRefreshCallbacks.delete(callback); // Return unsubscribe function
};

// Subscribe to scene data refresh events
export const onSceneDataRefresh = (callback) => {
  sceneRefreshCallbacks.add(callback);
  return () => sceneRefreshCallbacks.delete(callback); // Return unsubscribe function
};

// Notify all subscribers of data refresh
const notifyDataRefresh = (newData) => {
  refreshCallbacks.forEach(callback => {
    try {
      callback(newData);
    } catch (error) {
    }
  });
};

// Notify all subscribers of mount data refresh
const notifyMountDataRefresh = (newData) => {
  mountRefreshCallbacks.forEach(callback => {
    try {
      callback(newData);
    } catch (error) {
    }
  });
};

// Notify all subscribers of scene data refresh
const notifySceneDataRefresh = (newData) => {
  sceneRefreshCallbacks.forEach(callback => {
    try {
      callback(newData);
    } catch (error) {
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
    return Date.now().toString(); // Fallback to timestamp
  }
};

// Generate hash for mount data comparison
const generateMountDataHash = (data) => {
  try {
    return btoa(JSON.stringify(data.map(item => ({ 
      id: item.id, 
      mountName: item.mountName,
      mountBaseType: item.mountBaseType,
      mountCableNumber: item.mountCableNumber,
      updatedAt: item.updatedAt || item.updated_at 
    }))));
  } catch (error) {
    return Date.now().toString(); // Fallback to timestamp
  }
};

// Generate hash for scene data comparison
const generateSceneDataHash = (data) => {
  try {
    return btoa(JSON.stringify(data.map(item => ({ 
      id: item._id || item.id, 
      sceneName: item.sceneName,
      sceneModel: item.sceneModel,
      sceneIcon: item.sceneIcon,
      updatedAt: item.updatedAt || item.updated_at 
    }))));
  } catch (error) {
    return Date.now().toString(); // Fallback to timestamp
  }
};

// Fetch pendant/system data from API
const fetchSystemAssignments = async () => {
  try {
    const response = await fetch("https://dev.api1.limitless-lighting.co.uk/admin/configurator/system", {
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
    
    // Cache the data and update global store
    cachedSystemAssignments = formattedData;
    globalSystemAssignments = formattedData; // Update global store for immediate access
    cacheTimestamp = Date.now();
    lastDataHash = newDataHash;
    
    // Notify subscribers if data changed OR if this is the first load
    if (dataChanged || !lastDataHash) {
      notifyDataRefresh(formattedData);
    }
    
    return formattedData;
  } catch (error) {
    throw error; // Only use API data, do not fallback
  }
};

// Fetch mount data from API
const fetchMountData = async () => {
  try {
    const response = await fetch("https://dev.api1.limitless-lighting.co.uk/admin/configurator/mount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch mount data");
    }

    const data = await response.json();
    const formattedData = Array.isArray(data) ? data : data?.data || [];
    
    // Check if data has changed
    const newDataHash = generateMountDataHash(formattedData);
    const dataChanged = lastMountDataHash && lastMountDataHash !== newDataHash;
    
    // Cache the data and update global store
    cachedMountData = formattedData;
    globalMountData = formattedData; // Update global store for immediate access
    mountCacheTimestamp = Date.now();
    lastMountDataHash = newDataHash;
    
    // Notify subscribers if data changed OR if this is the first load
    if (dataChanged || !lastMountDataHash) {
      notifyMountDataRefresh(formattedData);
    }
    
    return formattedData;
  } catch (error) {
    throw error; // Only use API data, do not fallback
  }
};

// Fetch scene data from API
const fetchSceneData = async () => {
  try {
    const response = await fetch("https://dev.api1.limitless-lighting.co.uk/admin/configurator/scene", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch scene data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const formattedData = Array.isArray(data) ? data : data?.data || [];
    
    // Check if data has changed
    const newDataHash = generateSceneDataHash(formattedData);
    const dataChanged = lastSceneDataHash && lastSceneDataHash !== newDataHash;
    
    // Cache the data and update global store
    cachedSceneData = formattedData;
    globalSceneData = formattedData; // Update global store for immediate access
    sceneCacheTimestamp = Date.now();
    lastSceneDataHash = newDataHash;
    
    // Notify subscribers if data changed OR if this is the first load
    if (dataChanged || !lastSceneDataHash) {
      notifySceneDataRefresh(formattedData);
    }
    
    return formattedData;
  } catch (error) {
    throw error; // Only use API data, do not fallback
  }
};

// Start periodic polling
const startPolling = () => {
  if (pollTimer) return; // Already polling
  
  pollTimer = setInterval(async () => {
    try {
      await fetchSystemAssignments();
      await fetchMountData();
      await fetchSceneData();
    } catch (error) {
    }
  }, POLL_INTERVAL);
};

// Stop periodic polling
const stopPolling = () => {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
};

// Auto-refresh on page visibility change
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', async () => {
    if (!document.hidden) {
      await refreshSystemAssignments();
    }
  });

  // Auto-refresh on window focus
  window.addEventListener('focus', async () => {
    await refreshSystemAssignments();
  });

  // Start polling when module loads
  startPolling();
  
  // Initialize global store with initial fetch
  fetchSystemAssignments().catch(error => {
  });
  
  // Initialize mount data
  fetchMountData().catch(error => {
  });
  
  // Initialize scene data
  fetchSceneData().catch(error => {
  });
}

// Get system assignments synchronously from global store (FOR IMMEDIATE ACCESS)
export const getSystemAssignmentsSync = () => {
  return globalSystemAssignments.filter(item => item.isShow === true);
};

// Find a specific system assignment by design name (SYNCHRONOUS)
export const findSystemAssignmentByDesign = (designName) => {
  const assignments = getSystemAssignmentsSync();
  return assignments.find((a) => a.design === designName);
};

// Get system assignments with caching and filter by isShow: true (FOR CONFIGURATOR)
export const getSystemAssignments = async () => {
  let assignments;
  
  // Check if we have cached data and it's still valid
  if (cachedSystemAssignments && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    assignments = cachedSystemAssignments;
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
  cachedSystemAssignments = null;
  cacheTimestamp = null;
  return await getSystemAssignments();
};

// Force refresh (ignores cache completely)
export const forceRefreshSystemAssignments = async () => {
  cachedSystemAssignments = null;
  cacheTimestamp = null;
  lastDataHash = null;
  return await fetchSystemAssignments();
};

// Debug function to manually trigger refresh and see current data
export const debugCurrentData = async () => {
  const freshData = await forceRefreshSystemAssignments();
  return freshData;
};

// Manual polling controls
export const startDataPolling = startPolling;
export const stopDataPolling = stopPolling;

// Check if data is stale
export const isDataStale = () => {
  return !cacheTimestamp || (Date.now() - cacheTimestamp > CACHE_DURATION);
};

// ===== MOUNT DATA FUNCTIONS =====

// Get mount data synchronously from global store (FOR IMMEDIATE ACCESS)
export const getMountDataSync = () => {
  return globalMountData;
};

// Get mount data with caching (FOR CONFIGURATOR)
export const getMountData = async () => {
  let mountData;
  
  // Check if we have cached data and it's still valid
  if (cachedMountData && mountCacheTimestamp && (Date.now() - mountCacheTimestamp < CACHE_DURATION)) {
    mountData = cachedMountData;
  } else {
    // Fetch fresh data
    mountData = await fetchMountData();
  }
  
  return mountData;
};

// Find a specific mount by name (SYNCHRONOUS)
export const findMountByName = (mountName) => {
  const mounts = getMountDataSync();
  return mounts.find((mount) => mount.mountName === mountName);
};

// Get mounts filtered by base type
export const getMountsByBaseType = async (baseType) => {
  const mounts = await getMountData();
  return mounts.filter(mount => mount.mountBaseType === baseType);
};

// Get mounts filtered by cable number
export const getMountsByCableNumber = async (cableNumber) => {
  const mounts = await getMountData();
  return mounts.filter(mount => mount.mountCableNumber === cableNumber);
};

// Refresh mount data cache
export const refreshMountData = async () => {
  cachedMountData = null;
  mountCacheTimestamp = null;
  return await getMountData();
};

// Force refresh mount data (ignores cache completely)
export const forceRefreshMountData = async () => {
  cachedMountData = null;
  mountCacheTimestamp = null;
  lastMountDataHash = null;
  return await fetchMountData();
};

// Check if mount data is stale
export const isMountDataStale = () => {
  return !mountCacheTimestamp || (Date.now() - mountCacheTimestamp > CACHE_DURATION);
};

// ===== SCENE DATA FUNCTIONS =====

// Get scene data synchronously from global store (FOR IMMEDIATE ACCESS)
export const getSceneDataSync = () => {
  return globalSceneData; // Return all scene data since API might not have isShow field
};

// Get scene data with caching (FOR CONFIGURATOR)
export const getSceneData = async () => {
  let sceneData;
  
  // Check if we have cached data and it's still valid
  if (cachedSceneData && sceneCacheTimestamp && (Date.now() - sceneCacheTimestamp < CACHE_DURATION)) {
    sceneData = cachedSceneData;
  } else {
    // Fetch fresh data
    sceneData = await fetchSceneData();
  }
  // Return all scene data since API might not have isShow field
  return sceneData;
};

// Get ALL scene data with caching (FOR DASHBOARD)
export const getAllSceneData = async () => {
  let sceneData;
  
  // Check if we have cached data and it's still valid
  if (cachedSceneData && sceneCacheTimestamp && (Date.now() - sceneCacheTimestamp < CACHE_DURATION)) {
    sceneData = cachedSceneData;
  } else {
    // Fetch fresh data
    sceneData = await fetchSceneData();
  }
  
  // Return ALL items for dashboard management
  return sceneData;
};

// Refresh scene data cache function
export const refreshSceneData = async () => {
  cachedSceneData = null;
  sceneCacheTimestamp = null;
  return await getSceneData();
};

// Force refresh scene data (ignores cache completely)
export const forceRefreshSceneData = async () => {
  cachedSceneData = null;
  sceneCacheTimestamp = null;
  lastSceneDataHash = null;
  return await fetchSceneData();
};

// Check if scene data is stale
export const isSceneDataStale = () => {
  return !sceneCacheTimestamp || (Date.now() - sceneCacheTimestamp > CACHE_DURATION);
};