// Utility: Convert Base64 image string to Uint8Array (binary)
export function base64ToUint8Array(base64String) {
  const cleaned = base64String.replace(/^data:image\/\w+;base64,/, "");
  const binaryString = atob(cleaned);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Filter products by tab
export const filterProductsByTab = (products, activeTab) => {
  if (!products || !Array.isArray(products)) return [];
  
  switch (activeTab) {
    case "pendant":
      return products.filter(item => !item.isSystem);
    case "system":
      return products.filter(item => item.isSystem);
    case "bar":
    case "ball":
    case "universal":
      return products.filter(item => item.isSystem && item.systemType === activeTab);
    case "model":
      return products.filter(item => {
        const modelUrl = item.media?.model?.url;
        return modelUrl && modelUrl.trim() !== '';
      });
    case "all":
    default:
      return products;
  }
};

// Search products by query
export const searchProducts = (products, searchQuery) => {
  if (!products || !Array.isArray(products)) return [];
  if (!searchQuery || searchQuery.trim() === "") return products;
  
  const query = searchQuery.toLowerCase().trim();
  
  return products.filter(item => {
    // Search in name
    const nameMatch = item.name?.toLowerCase().includes(query);
    
    // Search in message
    const messageMatch = item.message?.toLowerCase().includes(query);
    
    // Search in system type
    const typeMatch = item.systemType?.toLowerCase().includes(query);
    
    // Search in design
    const designMatch = item.design?.toLowerCase().includes(query);
    
    // Search in category (pendant/system)
    const categoryMatch = item.isSystem 
      ? "system".includes(query) 
      : "pendant".includes(query);
    
    return nameMatch || messageMatch || typeMatch || designMatch || categoryMatch;
  });
};

// Combined filter function for both tab and search
export const filterAndSearchProducts = (products, activeTab, searchQuery) => {
  // First apply tab filtering
  const tabFiltered = filterProductsByTab(products, activeTab);
  
  // Then apply search filtering
  return searchProducts(tabFiltered, searchQuery);
};

// Get count for each tab
export function getTabCounts(products) {
  return {
    all: products.length,
    pendant: products.filter((item) => !item.isSystem).length,
    system: products.filter((item) => item.isSystem).length,
    bar: products.filter((item) => item.isSystem && item.systemType === "bar").length,
    ball: products.filter((item) => item.isSystem && item.systemType === "ball").length,
    universal: products.filter((item) => item.isSystem && item.systemType === "universal").length,
    model: products.filter(item => {
      const modelUrl = item.media?.model?.url;
      return modelUrl && modelUrl.trim() !== '';
    }).length,
    chandelier: products.filter(item => item.systemType === "chandelier").length,
  };
}
