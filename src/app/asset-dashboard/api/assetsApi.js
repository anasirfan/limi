const API_BASE_URL = 'https://dev.api1.limitless-lighting.co.uk';

export const assetsApi = {
  // Upload single file
  async uploadAsset(file, tags = [], usageContext = '') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', JSON.stringify(tags));
    formData.append('description', usageContext);

    const response = await fetch(`${API_BASE_URL}/admin/assests_managment/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        // If JSON parsing fails, handle based on status code
        if (response.status === 409) {
          errorData = { code: 'FILENAME_EXISTS', message: 'Filename already exists' };
        } else {
          errorData = { code: 'UPLOAD_ERROR', message: `Upload failed: ${response.statusText}` };
        }
      }
      
      return {
        success: false,
        error: errorData
      };
    }

    const successData = await response.json();
    return {
      success: true,
      ...successData
    };
  },

  // Upload multiple files
  async uploadFiles(files, tags = [], description = '') {
    const formData = new FormData();
    
    // Add multiple files
    files.forEach(file => {
      formData.append('file', file);
    });
    
    // Add tags and description
    formData.append('tags', JSON.stringify(tags));
    formData.append('description', description);

    const response = await fetch(`${API_BASE_URL}/admin/assests_managment/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return await response.json();
  },

  // Delete asset
  async deleteAsset(assetId) {
    const response = await fetch(`${API_BASE_URL}/admin/assests_managment/delete/${assetId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }

    return await response.json();
  },

  // Update asset
  async updateAsset(assetId, updates) {
    const response = await fetch(`${API_BASE_URL}/admin/assests_managment/update/${assetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Update failed: ${response.statusText}`);
    }

    return await response.json();
  },

  // Search assets
  async searchAssets(query, filters = {}) {
    const params = new URLSearchParams({
      search: query,
      page: '1',
      limit: '50',
      sort: 'createdAt',
      sortOrder: 'desc',
      ...filters
    });

    const response = await fetch(`${API_BASE_URL}/admin/assests_managment/list?${params}`);

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    return await response.json();
  },

  // Get assets list with filters
  async getAssets({
    category = null, // 'models', 'images', 'videos'
    search = '',
    tags = [],
    page = 1,
    limit = 20,
    sort = 'createdAt',
    sortOrder = 'desc'
  } = {}) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
      sortOrder
    });

    // Add optional parameters
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (tags.length > 0) {
      if (Array.isArray(tags)) {
        params.append('tags', tags.join(','));
      } else {
        params.append('tags', tags);
      }
    }

    const response = await fetch(`${API_BASE_URL}/admin/assests_managment/list?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch assets: ${response.statusText}`);
    }

    return await response.json();
  },

  // Get asset categories
  getCategories() {
    return ['models', 'images', 'videos'];
  },

  // Helper to determine category from file type
  getCategoryFromFile(file) {
    const mimeType = file.type;
    
    if (mimeType.startsWith('image/')) return 'images';
    if (mimeType.startsWith('video/')) return 'videos';
    if (mimeType.includes('model/') || file.name.endsWith('.glb') || file.name.endsWith('.gltf')) return 'models';
    
    // Default based on common extensions
    const extension = file.name.split('.').pop().toLowerCase();
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'];
    const modelExts = ['glb', 'gltf', 'obj', 'fbx', '3ds'];
    
    if (imageExts.includes(extension)) return 'images';
    if (videoExts.includes(extension)) return 'videos';
    if (modelExts.includes(extension)) return 'models';
    
    return 'images'; // Default fallback
  },

  // Format file size
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Format date
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};
