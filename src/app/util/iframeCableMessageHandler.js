// Utility to listen for iframe messages starting with 'cable_'
export function listenForCableMessages(callback) {
  function handleMessage(event) {
    // console.log('[CableMsg] BEFORE FILTER:', event.data);
    if (typeof event.data === "string" && event.data.startsWith("cable_")) {
      // console.log('[CableMsg] MATCHED cable_:', event.data);/
      callback(event.data, event);
      // console.log('[CableMsg] AFTER CALLBACK:', event.data);
    }
  }
  window.addEventListener("message", handleMessage);
  // Return cleanup
  return () => window.removeEventListener("message", handleMessage);
}
export function listenForOffconfigMessages(callback) {
  function handleMessage(event) {
    // console.log('[OffconfigMsg] BEFORE FILTER:', event.data);
    if (typeof event.data === "string" && event.data.startsWith("offconfig")) {
      // console.log('[OffconfigMsg] MATCHED offconfig:', event.data);
      callback(event.data, event);
      // console.log('[OffconfigMsg] AFTER CALLBACK:', event.data);
    }
  }
  window.addEventListener("message", handleMessage);
  // Return cleanup
  return () => window.removeEventListener("message", handleMessage);
}

export function listenForSelectedCableMessages(callback) {
  function handleMessage(event) {
    if (
      typeof event.data === "string" &&
      event.data.startsWith("selectedcable:")
    ) {
      const match = event.data.match(/^selectedcable:\s*([\d,\s]+);?/);
      if (match) {
        const indexes = match[1]
          .split(",")
          .map((x) => Number(x.trim()))
          .filter((x) => !isNaN(x));
        callback(indexes, event);
      }
    }
  }
  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}
// Add this to the exports in iframeCableMessageHandler.js

export function listenForScreenshotUploadMessages(callback) {
  function handleMessage(event) {
    if (
      typeof event.data === "string" &&
      event.data.startsWith("ScreenShot : /uploads/screen_shot/")
    ) {
      callback(event.data, event);
    }
  }
  window.addEventListener("message", handleMessage);
  // Return cleanup
  return () => window.removeEventListener("message", handleMessage);
}
export function listenForModelIdMessages(callback) {
  function handleMessage(event) {
    // console.log(event)
    // console.log('[ModelIdMsg] BEFORE FILTER:', event.data);
    if (typeof event.data === "string" && event.data.startsWith("model_id")) {
      // console.log('[ModelIdMsg] MATCHED model_id:', event.data);
      callback(event.data, event);
      // console.log('[ModelIdMsg] AFTER CALLBACK:', event.data);
    }
  }
  window.addEventListener("message", handleMessage);
  // Return cleanup
  // return () => window.removeEventListener('message', handleMessage);
}

export function listenForMouseOverMessages(callback) {
  function handleMessage(event) {
    // console.log(event)
    // console.log('[MouseOverMsg] BEFORE FILTER:', event.data);
    if (
      typeof event.data === "string" &&
      event.data.startsWith("MousepointerChange")
    ) {
      // console.log('[MouseOverMsg] MATCHED MousepointerChange:', event.data);
      callback(event.data, event);
      // console.log('[MouseOverMsg] AFTER CALLBACK:', event.data);
    }
  }
  window.addEventListener("message", handleMessage);
  // Return cleanup
  // return () => window.removeEventListener('message', handleMessage);
}
export function listenForMouseOutMessages(callback) {
  function handleMessage(event) {
    // console.log(event)
    // console.log('[MouseOutMsg] BEFORE FILTER:', event.data);
    if (
      typeof event.data === "string" &&
      event.data.startsWith("MousepointerNormal")
    ) {
      // console.log('[MouseOutMsg] MATCHED MousepointerNormal:', event.data);
      callback(event.data, event);
      // console.log('[MouseOutMsg] AFTER CALLBACK:', event.data);
    }
  }
  window.addEventListener("message", handleMessage);
  // Return cleanup
  // return () => window.removeEventListener('message', handleMessage);
}

export function listenForWallbaseColorMessages(callback) {
  function handleMessage(event) {
    // console.log('[WallbaseColorMsg] BEFORE FILTER:', event.data);
    if (typeof event.data === "string" && event.data === "wallbaseColor") {
      // console.log('[WallbaseColorMsg] MATCHED wallbaseColor:', event.data);
      callback(event.data, event);
      // console.log('[WallbaseColorMsg] AFTER CALLBACK:', event.data);
    }
  }
  window.addEventListener("message", handleMessage);
  // Return cleanup
  return () => window.removeEventListener("message", handleMessage);
}
export function listenForConnectorColorMessages(callback) {
  function handleMessage(event) {
    // console.log('[connectorColor] BEFORE FILTER:', event.data);
    if (typeof event.data === "string" && event.data === "connectorColor") {
      // console.log('[connectorColor] MATCHED connectorColor:', event.data);
      callback(event.data, event);
      // console.log('[connectorColor] AFTER CALLBACK:', event.data);
    }
  }
  window.addEventListener("message", handleMessage);
  // Return cleanup
  return () => window.removeEventListener("message", handleMessage);
}
