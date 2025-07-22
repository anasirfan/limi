/**
 * Utility functions for slide analytics data management
 */

/**
 * Fetch session data for a customer from API
 * @param {string} customerId - The customer ID
 * @returns {Promise<Array>} Array of session data
 */
export const fetchSessionData = async (customerId) => {
  try {
    const response = await fetch(`/api/slide-sessions?customerId=${customerId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : data.sessions || [];
  } catch (error) {
    console.error('Failed to fetch session data from API:', error);
    // Fallback to localStorage
    return getSessionDataFromLocalStorage(customerId);
  }
};

/**
 * Get session data from localStorage as fallback
 * @param {string} customerId - The customer ID
 * @returns {Array} Array of session data
 */
export const getSessionDataFromLocalStorage = (customerId) => {
  try {
    const sessions = JSON.parse(localStorage.getItem(`slideSessions_${customerId}`) || '[]');
    const slideTimes = JSON.parse(localStorage.getItem(`slideTimes_${customerId}`) || '[]');
    const engagementEvents = JSON.parse(localStorage.getItem(`engagementEvents_${customerId}`) || '[]');
    
    return {
      sessions,
      slideTimes,
      engagementEvents
    };
  } catch (error) {
    console.error('Failed to parse localStorage data:', error);
    return {
      sessions: [],
      slideTimes: [],
      engagementEvents: []
    };
  }
};

/**
 * Get slide time data for a customer
 * @param {string} customerId - The customer ID
 * @returns {Array} Array of slide time data
 */
export const getSlideTimesData = (customerId) => {
  try {
    return JSON.parse(localStorage.getItem(`slideTimes_${customerId}`) || '[]');
  } catch (error) {
    console.error('Failed to get slide times data:', error);
    return [];
  }
};

/**
 * Get engagement events for a customer
 * @param {string} customerId - The customer ID
 * @returns {Array} Array of engagement events
 */
export const getEngagementEvents = (customerId) => {
  try {
    return JSON.parse(localStorage.getItem(`engagementEvents_${customerId}`) || '[]');
  } catch (error) {
    console.error('Failed to get engagement events:', error);
    return [];
  }
};

/**
 * Clear all analytics data for a customer
 * @param {string} customerId - The customer ID
 */
export const clearCustomerAnalytics = (customerId) => {
  localStorage.removeItem(`slideSessions_${customerId}`);
  localStorage.removeItem(`slideTimes_${customerId}`);
  localStorage.removeItem(`engagementEvents_${customerId}`);
};

/**
 * Export analytics data for a customer
 * @param {string} customerId - The customer ID
 * @returns {Object} Complete analytics data
 */
export const exportCustomerAnalytics = (customerId) => {
  const data = getSessionDataFromLocalStorage(customerId);
  return {
    customerId,
    exportDate: new Date().toISOString(),
    ...data
  };
};
