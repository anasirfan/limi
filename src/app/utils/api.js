/**
 * API Utility Functions
 * 
 * Wrapper functions for making API calls with centralized configuration
 */

import { API_CONFIG, buildApiUrl, buildApi1Url, buildTrackingUrl } from '../config/api.config';

/**
 * Get authentication token from localStorage
 * @returns {string|null} Token with Bearer prefix or null
 */
const getAuthToken = () => {
  const token = localStorage.getItem('limiToken');
  if (!token) return null;
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
};

/**
 * Generic fetch wrapper with error handling
 * @param {string} url - Full URL to fetch
 * @param {object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
export const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

/**
 * Make authenticated API call to BASE_URL
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
export const apiCall = async (endpoint, options = {}) => {
  const url = buildApiUrl(endpoint);
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = token;
  }
  
  return apiFetch(url, {
    ...options,
    headers,
  });
};

/**
 * Make authenticated API call to API1 base URL
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
export const api1Call = async (endpoint, options = {}) => {
  const url = buildApi1Url(endpoint);
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = token;
  }
  
  return apiFetch(url, {
    ...options,
    headers,
  });
};

/**
 * Make tracking API call
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
export const trackingCall = async (endpoint, options = {}) => {
  const url = buildTrackingUrl(endpoint);
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  return apiFetch(url, {
    ...options,
    headers,
  });
};

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  // Standard API calls (BASE_URL)
  get: (endpoint, options = {}) => apiCall(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options = {}) => apiCall(endpoint, { 
    ...options, 
    method: 'POST',
    body: JSON.stringify(data)
  }),
  put: (endpoint, data, options = {}) => apiCall(endpoint, { 
    ...options, 
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  patch: (endpoint, data, options = {}) => apiCall(endpoint, { 
    ...options, 
    method: 'PATCH',
    body: JSON.stringify(data)
  }),
  delete: (endpoint, options = {}) => apiCall(endpoint, { ...options, method: 'DELETE' }),
  
  // API1 calls
  api1: {
    get: (endpoint, options = {}) => api1Call(endpoint, { ...options, method: 'GET' }),
    post: (endpoint, data, options = {}) => api1Call(endpoint, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(data)
    }),
    put: (endpoint, data, options = {}) => api1Call(endpoint, { 
      ...options, 
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    patch: (endpoint, data, options = {}) => api1Call(endpoint, { 
      ...options, 
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
    delete: (endpoint, options = {}) => api1Call(endpoint, { ...options, method: 'DELETE' }),
  },
  
  // Tracking calls
  tracking: {
    post: (endpoint, data, options = {}) => trackingCall(endpoint, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(data)
    }),
  }
};

// Export individual functions for direct use
export { API_CONFIG, buildApiUrl, buildApi1Url, buildTrackingUrl };
