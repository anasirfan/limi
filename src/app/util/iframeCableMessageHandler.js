// Utility to listen for iframe messages starting with 'cable_'
export function listenForCableMessages(callback) {
    function handleMessage(event) {
      console.log('[CableMsg] BEFORE FILTER:', event.data);
      if (typeof event.data === 'string' && event.data.startsWith('cable_')) {
        console.log('[CableMsg] MATCHED cable_:', event.data);
        callback(event.data, event);
        console.log('[CableMsg] AFTER CALLBACK:', event.data);
      }
    }
    window.addEventListener('message', handleMessage);
    // Return cleanup
    return () => window.removeEventListener('message', handleMessage);
  }


  export function listenForModelIdMessages(callback) {
    function handleMessage(event) {
      console.log('[CableMsg] BEFORE FILTER:', event.data);
      if (typeof event.data === 'string' && event.data.startsWith('model_id')) {
        console.log('[CableMsg] MATCHED model_id:', event.data);
        callback(event.data, event);
        console.log('[CableMsg] AFTER CALLBACK:', event.data);
      }
    }
    window.addEventListener('message', handleMessage);
    // Return cleanup
    return () => window.removeEventListener('message', handleMessage);
  }
  export function listenForWallbaseColorMessages(callback) {
    function handleMessage(event) {
      console.log('[WallbaseColorMsg] BEFORE FILTER:', event.data);
      if (typeof event.data === 'string' && event.data === 'wallbaseColor') {
        console.log('[WallbaseColorMsg] MATCHED wallbaseColor:', event.data);
        callback(event.data, event);
        console.log('[WallbaseColorMsg] AFTER CALLBACK:', event.data);
      }
    }
    window.addEventListener('message', handleMessage);
    // Return cleanup
    return () => window.removeEventListener('message', handleMessage);
  }