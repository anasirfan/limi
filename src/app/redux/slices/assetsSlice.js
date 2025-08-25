import { createSlice } from '@reduxjs/toolkit';

// Mock data for initial assets using real files from public folder
const mockAssets = [
  {
    id: '1',
    name: 'limi-dashboard.jpg',
    type: 'image',
    size: '607 KB',
    url: '/images/limi-dashboard.jpg',
    thumbnail: '/images/limi-dashboard.jpg',
    tags: ['dashboard', 'interface', 'ui'],
    uploadedBy: 'Frontend Dev',
    uploadedAt: '2024-01-15T10:30:00Z',
    lastModified: '2024-01-20T14:22:00Z',
    usageContext: 'Dashboard showcase page',
    dimensions: '1920x1080',
    format: 'JPEG'
  },
  {
    id: '2',
    name: 'product-banner.jpg',
    type: 'image',
    size: '199 KB',
    url: '/images/product-banner.jpg',
    thumbnail: '/images/product-banner.jpg',
    tags: ['product', 'banner', 'hero'],
    uploadedBy: 'Frontend Dev',
    uploadedAt: '2024-01-18T09:15:00Z',
    lastModified: '2024-01-25T11:45:00Z',
    usageContext: 'Product page hero section',
    dimensions: '1920x800',
    format: 'JPEG'
  },
  {
    id: '3',
    name: 'limi-light.png',
    type: 'image',
    size: '91 KB',
    url: '/images/limi-light.png',
    thumbnail: '/images/limi-light.png',
    tags: ['light', 'product', 'showcase'],
    uploadedBy: '3D Team',
    uploadedAt: '2024-01-22T16:20:00Z',
    lastModified: '2024-01-28T13:10:00Z',
    usageContext: 'Product showcase section',
    dimensions: '800x600',
    format: 'PNG'
  },
  {
    id: '4',
    name: 'limi-connect.jpg',
    type: 'image',
    size: '86 KB',
    url: '/images/limi-connect.jpg',
    thumbnail: '/images/limi-connect.jpg',
    tags: ['connect', 'app', 'mobile'],
    uploadedBy: 'Frontend Dev',
    uploadedAt: '2024-01-10T08:45:00Z',
    lastModified: '2024-01-12T10:30:00Z',
    usageContext: 'Mobile app section',
    dimensions: '1200x800',
    format: 'JPEG'
  },
  {
    id: '5',
    name: 'BgVideo.mp4',
    type: 'video',
    size: '3.6 MB',
    url: '/videos/BgVideo.mp4',
    thumbnail: '/images/main.jpg',
    tags: ['background', 'video', 'hero'],
    uploadedBy: 'VR Team',
    uploadedAt: '2024-01-25T14:30:00Z',
    lastModified: '2024-01-30T09:15:00Z',
    usageContext: 'Homepage background video',
    duration: '0:15',
    resolution: '1080p'
  },
  {
    id: '6',
    name: 'limi-web.m4v',
    type: 'video',
    size: '7.1 MB',
    url: '/videos/limi-web.m4v',
    thumbnail: '/images/hub-new1.jpg',
    tags: ['web', 'demo', 'showcase'],
    uploadedBy: 'VR Team',
    uploadedAt: '2024-01-28T11:20:00Z',
    lastModified: '2024-02-02T15:45:00Z',
    usageContext: 'Web platform demonstration',
    duration: '1:30',
    resolution: '4K'
  },
  {
    id: '7',
    name: 'chandler.glb',
    type: '3d',
    size: '8.2 MB',
    url: '/models/chandler.glb',
    thumbnail: '/images/light1.webp',
    tags: ['chandelier', '3d-model', 'lighting'],
    uploadedBy: '3D Team',
    uploadedAt: '2024-01-22T16:20:00Z',
    lastModified: '2024-01-28T13:10:00Z',
    usageContext: 'Product configurator',
    polygons: '15,420',
    format: 'GLB'
  },
  {
    id: '8',
    name: 'updated.glb',
    type: '3d',
    size: '6.4 MB',
    url: '/models/updated.glb',
    thumbnail: '/images/innovations.png',
    tags: ['updated', '3d-model', 'lighting'],
    uploadedBy: '3D Team',
    uploadedAt: '2024-01-28T11:20:00Z',
    lastModified: '2024-02-02T15:45:00Z',
    usageContext: 'AR viewer and product showcase',
    polygons: '12,890',
    format: 'GLB'
  },
  {
    id: '9',
    name: 'limi-app.png',
    type: 'image',
    size: '196 KB',
    url: '/images/limi-app.png',
    thumbnail: '/images/limi-app.png',
    tags: ['app', 'mobile', 'interface'],
    uploadedBy: 'Frontend Dev',
    uploadedAt: '2024-02-01T09:30:00Z',
    lastModified: '2024-02-03T11:15:00Z',
    usageContext: 'Mobile app showcase',
    dimensions: '800x1200',
    format: 'PNG'
  },
  {
    id: '10',
    name: 'customerprofile_anim.mp4',
    type: 'video',
    size: '6.3 MB',
    url: '/videos/customerprofile_anim.mp4',
    thumbnail: '/images/3.jpg',
    tags: ['animation', 'profile', 'customer'],
    uploadedBy: 'VR Team',
    uploadedAt: '2024-02-02T14:20:00Z',
    lastModified: '2024-02-04T16:30:00Z',
    usageContext: 'Customer profile animations',
    duration: '0:45',
    resolution: '1080p'
  }
];

const initialState = {
  assets: mockAssets,
  filteredAssets: mockAssets,
  selectedAssetType: 'all',
  searchQuery: '',
  sortBy: 'lastModified',
  sortOrder: 'desc',
  isUploading: false,
  uploadProgress: 0,
  selectedAssets: [],
  viewMode: 'grid' // 'grid' or 'table'
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    // Filter assets by type
    setAssetTypeFilter: (state, action) => {
      state.selectedAssetType = action.payload;
      state.filteredAssets = filterAssets(state);
    },

    // Search assets
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredAssets = filterAssets(state);
    },

    // Sort assets
    setSortBy: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
      state.filteredAssets = sortAssets(state.filteredAssets, sortBy, sortOrder);
    },

    // Add new asset
    addAsset: (state, action) => {
      const newAsset = {
        ...action.payload,
        id: Date.now().toString(),
        uploadedAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      };
      state.assets.unshift(newAsset);
      state.filteredAssets = filterAssets(state);
    },

    // Update asset
    updateAsset: (state, action) => {
      const { id, updates } = action.payload;
      const assetIndex = state.assets.findIndex(asset => asset.id === id);
      if (assetIndex !== -1) {
        state.assets[assetIndex] = {
          ...state.assets[assetIndex],
          ...updates,
          lastModified: new Date().toISOString()
        };
        state.filteredAssets = filterAssets(state);
      }
    },

    // Delete asset
    deleteAsset: (state, action) => {
      const id = action.payload;
      state.assets = state.assets.filter(asset => asset.id !== id);
      state.selectedAssets = state.selectedAssets.filter(assetId => assetId !== id);
      state.filteredAssets = filterAssets(state);
    },

    // Bulk delete assets
    deleteSelectedAssets: (state) => {
      state.assets = state.assets.filter(asset => !state.selectedAssets.includes(asset.id));
      state.selectedAssets = [];
      state.filteredAssets = filterAssets(state);
    },

    // Select/deselect assets
    toggleAssetSelection: (state, action) => {
      const id = action.payload;
      if (state.selectedAssets.includes(id)) {
        state.selectedAssets = state.selectedAssets.filter(assetId => assetId !== id);
      } else {
        state.selectedAssets.push(id);
      }
    },

    // Select all filtered assets
    selectAllAssets: (state) => {
      state.selectedAssets = state.filteredAssets.map(asset => asset.id);
    },

    // Clear selection
    clearSelection: (state) => {
      state.selectedAssets = [];
    },

    // Set view mode
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },

    // Upload states
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },

    setIsUploading: (state, action) => {
      state.isUploading = action.payload;
    },

    // Set assets from API
    setAssets: (state, action) => {
      state.assets = action.payload;
      state.filteredAssets = filterAssets(state);
    },

    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

// Helper functions
function filterAssets(state) {
  let filtered = state.assets;

  // Filter by type
  if (state.selectedAssetType !== 'all') {
    filtered = filtered.filter(asset => asset.type === state.selectedAssetType);
  }

  // Filter by search query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(asset =>
      asset.name.toLowerCase().includes(query) ||
      asset.tags.some(tag => tag.toLowerCase().includes(query)) ||
      asset.uploadedBy.toLowerCase().includes(query) ||
      asset.usageContext.toLowerCase().includes(query)
    );
  }

  return sortAssets(filtered, state.sortBy, state.sortOrder);
}

function sortAssets(assets, sortBy, sortOrder) {
  return [...assets].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Handle different data types
    if (sortBy === 'size') {
      aValue = parseFloat(aValue.replace(/[^\d.]/g, ''));
      bValue = parseFloat(bValue.replace(/[^\d.]/g, ''));
    } else if (sortBy === 'lastModified' || sortBy === 'uploadedAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

export const {
  setAssetTypeFilter,
  setSearchQuery,
  setSortBy,
  addAsset,
  updateAsset,
  deleteAsset,
  deleteSelectedAssets,
  toggleAssetSelection,
  selectAllAssets,
  clearSelection,
  setViewMode,
  setUploadProgress,
  setIsUploading,
  setAssets,
  setLoading
} = assetsSlice.actions;

export default assetsSlice.reducer;
