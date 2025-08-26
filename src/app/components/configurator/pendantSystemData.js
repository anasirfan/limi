// Cache for API data
let cachedSystemAssignments = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
    console.log()
    const formattedData = Array.isArray(data) ? data : data?.data || [];
    
    // Cache the data
    cachedSystemAssignments = formattedData;
    cacheTimestamp = Date.now();
    
    return formattedData;
  } catch (error) {
    console.error("Error fetching pendant/system data from API:", error);
    throw error; // Only use API data, do not fallback
  }
};

// Get system assignments with caching
export const getSystemAssignments = async () => {
  // Check if we have cached data and it's still valid
  if (cachedSystemAssignments && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    return cachedSystemAssignments;
  }
  // Fetch fresh data
  return await fetchSystemAssignments();
};

// Legacy export for backward compatibility (will use cached data or fetch if needed)
export const systemAssignments = await getSystemAssignments(); // Only use API data
console.log("systemAssignments",systemAssignments)
// Dynamic filtered arrays that update based on API data
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

// Legacy synchronous exports (using cached data or fallback)
export const pendantAssignments = systemAssignments.filter(a => !a.isSystem);
export const ballAssignments = systemAssignments.filter(a => a.isSystem && a.systemType === "ball");
export const barAssignments = systemAssignments.filter(a => a.isSystem && a.systemType === "bar");
export const universalAssignments = systemAssignments.filter(a => a.isSystem && a.systemType === "universal");

// Extract base IDs dynamically
export const barBaseIds = barAssignments.map(a => a.design);
export const universalBaseIds = universalAssignments.map(a => a.design);
export const ballBaseIds = ballAssignments.map(a => a.design);
export const pendantTypes = pendantAssignments.map(a => a.design);

// Refresh cache function (can be called manually to update data)
export const refreshSystemAssignments = async () => {
  cachedSystemAssignments = null;
  cacheTimestamp = null;
  return await getSystemAssignments();
};