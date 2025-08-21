'use client';

import { useState } from 'react';
import { 
  FiSearch, 
  FiGrid, 
  FiList, 
  FiUpload,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiFile,
  FiImage,
  FiVideo,
  FiMusic,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiPlus,
  FiX,
  FiHardDrive,
  FiClock,
  FiFilter,
  FiSliders
} from 'react-icons/fi';
import AdvancedFilterPanel from '../../components/AdvancedFilterPanel';

// Enhanced mock asset data with more properties for filtering
const mockAssets = [
  {
    id: 1,
    name: 'Product_Showcase_Video.mp4',
    type: 'video',
    size: '45.2 MB',
    sizeInMB: 45.2,
    status: 'approved',
    uploadedBy: 'John Doe',
    uploadedAt: '2024-01-15T10:30:00Z',
    category: 'Marketing',
    tags: ['product', 'showcase', 'video']
  },
  {
    id: 2,
    name: 'Brand_Guidelines.pdf',
    type: 'document',
    size: '2.1 MB',
    sizeInMB: 2.1,
    status: 'pending',
    uploadedBy: 'Jane Smith',
    uploadedAt: '2024-01-14T15:45:00Z',
    category: 'Design',
    tags: ['brand', 'guidelines', 'design']
  },
  {
    id: 3,
    name: 'Hero_Banner_Image.jpg',
    type: 'image',
    size: '8.5 MB',
    sizeInMB: 8.5,
    status: 'approved',
    uploadedBy: 'Mike Johnson',
    uploadedAt: '2024-01-13T09:20:00Z',
    category: 'Marketing',
    tags: ['banner', 'hero', 'marketing']
  },
  {
    id: 4,
    name: 'Background_Music.mp3',
    type: 'audio',
    size: '12.3 MB',
    sizeInMB: 12.3,
    status: 'rejected',
    uploadedBy: 'Sarah Wilson',
    uploadedAt: '2024-01-12T14:15:00Z',
    category: 'Media',
    tags: ['music', 'background', 'audio']
  },
  {
    id: 5,
    name: 'Technical_Specs.docx',
    type: 'document',
    size: '1.8 MB',
    sizeInMB: 1.8,
    status: 'pending',
    uploadedBy: 'John Doe',
    uploadedAt: '2024-01-11T11:30:00Z',
    category: 'Technical',
    tags: ['specs', 'technical', 'documentation']
  },
  {
    id: 6,
    name: 'Product_Demo_Video.mp4',
    type: 'video',
    size: '78.9 MB',
    sizeInMB: 78.9,
    status: 'approved',
    uploadedBy: 'Jane Smith',
    uploadedAt: '2024-01-10T16:45:00Z',
    category: 'Marketing',
    tags: ['demo', 'product', 'video']
  }
];

const statusColors = {
  approved: 'bg-green-100 text-green-700 border-green-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  rejected: 'bg-red-100 text-red-700 border-red-200'
};

const typeIcons = {
  image: FiImage,
  video: FiVideo,
  audio: FiMusic,
  document: FiFile
};

export default function AssetsPage() {
  const [assets, setAssets] = useState(mockAssets);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [bulkFiles, setBulkFiles] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    search: '',
    type: [],
    status: [],
    category: [],
    uploadedBy: [],
    dateRange: { start: '', end: '' },
    sizeRange: { min: '', max: '' },
    tags: []
  });

  // Enhanced filtering logic that supports advanced filters
  const filteredAssets = assets.filter(asset => {
    // Basic search
    const basicSearch = searchQuery === '' || asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const basicType = selectedType === 'all' || asset.type === selectedType;
    const basicStatus = selectedStatus === 'all' || asset.status === selectedStatus;

    // Advanced filters
    const advancedSearch = advancedFilters.search === '' || asset.name.toLowerCase().includes(advancedFilters.search.toLowerCase());
    const advancedType = advancedFilters.type.length === 0 || advancedFilters.type.includes(asset.type);
    const advancedStatus = advancedFilters.status.length === 0 || advancedFilters.status.includes(asset.status);
    const advancedCategory = advancedFilters.category.length === 0 || advancedFilters.category.includes(asset.category);
    const advancedUploader = advancedFilters.uploadedBy.length === 0 || advancedFilters.uploadedBy.includes(asset.uploadedBy);
    
    // Date range filter
    let advancedDateRange = true;
    if (advancedFilters.dateRange.start || advancedFilters.dateRange.end) {
      const assetDate = new Date(asset.uploadedAt);
      const startDate = advancedFilters.dateRange.start ? new Date(advancedFilters.dateRange.start) : null;
      const endDate = advancedFilters.dateRange.end ? new Date(advancedFilters.dateRange.end) : null;
      
      if (startDate && assetDate < startDate) advancedDateRange = false;
      if (endDate && assetDate > endDate) advancedDateRange = false;
    }

    // Size range filter
    let advancedSizeRange = true;
    if (advancedFilters.sizeRange.min || advancedFilters.sizeRange.max) {
      const minSize = advancedFilters.sizeRange.min ? parseFloat(advancedFilters.sizeRange.min) : 0;
      const maxSize = advancedFilters.sizeRange.max ? parseFloat(advancedFilters.sizeRange.max) : Infinity;
      
      if (asset.sizeInMB < minSize || asset.sizeInMB > maxSize) advancedSizeRange = false;
    }

    // Tags filter
    const advancedTags = advancedFilters.tags.length === 0 || 
      advancedFilters.tags.some(tag => asset.tags && asset.tags.includes(tag));

    // Check if any advanced filters are active
    const hasAdvancedFilters = 
      advancedFilters.search !== '' ||
      advancedFilters.type.length > 0 ||
      advancedFilters.status.length > 0 ||
      advancedFilters.category.length > 0 ||
      advancedFilters.uploadedBy.length > 0 ||
      advancedFilters.dateRange.start !== '' ||
      advancedFilters.dateRange.end !== '' ||
      advancedFilters.sizeRange.min !== '' ||
      advancedFilters.sizeRange.max !== '' ||
      advancedFilters.tags.length > 0;

    // Use advanced filters if any are active, otherwise use basic filters
    if (hasAdvancedFilters) {
      return advancedSearch && advancedType && advancedStatus && advancedCategory && 
             advancedUploader && advancedDateRange && advancedSizeRange && advancedTags;
    } else {
      return basicSearch && basicType && basicStatus;
    }
  });

  const handleAdvancedFiltersApply = (filters) => {
    setAdvancedFilters(filters);
    // Clear basic filters when advanced filters are applied
    setSearchQuery('');
    setSelectedType('all');
    setSelectedStatus('all');
  };

  const getActiveAdvancedFilterCount = () => {
    let count = 0;
    if (advancedFilters.search) count++;
    if (advancedFilters.type.length > 0) count++;
    if (advancedFilters.status.length > 0) count++;
    if (advancedFilters.category.length > 0) count++;
    if (advancedFilters.uploadedBy.length > 0) count++;
    if (advancedFilters.dateRange.start || advancedFilters.dateRange.end) count++;
    if (advancedFilters.sizeRange.min || advancedFilters.sizeRange.max) count++;
    if (advancedFilters.tags.length > 0) count++;
    return count;
  };

  const handleSelectAsset = (assetId) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleBulkAction = (action) => {
    const updatedAssets = assets.map(asset => {
      if (selectedAssets.includes(asset.id)) {
        return { ...asset, status: action };
      }
      return asset;
    });
    setAssets(updatedAssets);
    setSelectedAssets([]);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setBulkFiles(prev => [...prev, ...files]);
  };

  const handleBulkUpload = () => {
    bulkFiles.forEach((file, index) => {
      const newAsset = {
        id: Date.now() + index,
        name: file.name,
        type: getFileType(file.type),
        size: formatFileSize(file.size),
        status: 'pending',
        uploadedBy: 'Current User',
        uploadedAt: new Date().toISOString(),
        category: 'Uncategorized'
      };
      setAssets(prev => [newAsset, ...prev]);
    });
    setBulkFiles([]);
    setShowBulkUpload(false);
  };

  const getFileType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Asset Management</h2>
          <p className="text-sm text-gray-600 mt-1">Manage and organize your digital assets</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowBulkUpload(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <FiUpload className="w-4 h-4" />
            <span>Bulk Upload</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <FiPlus className="w-4 h-4" />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiHardDrive className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Assets</p>
              <p className="text-2xl font-semibold text-gray-900">{assets.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiCheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-semibold text-gray-900">
                {assets.filter(a => a.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiAlertCircle className="w-8 h-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {assets.filter(a => a.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiXCircle className="w-8 h-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-semibold text-gray-900">
                {assets.filter(a => a.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assets..."
                  className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="document">Documents</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => setShowAdvancedFilters(true)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                  getActiveAdvancedFilterCount() > 0 
                    ? 'bg-blue-100 border-blue-300 text-blue-700' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FiSliders className="w-4 h-4" />
                <span>Advanced</span>
                {getActiveAdvancedFilterCount() > 0 && (
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {getActiveAdvancedFilterCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Advanced Filters Summary */}
        {getActiveAdvancedFilterCount() > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FiFilter className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700 font-medium">
                  {getActiveAdvancedFilterCount()} advanced filter{getActiveAdvancedFilterCount() !== 1 ? 's' : ''} active
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowAdvancedFilters(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Edit Filters
                </button>
                <button
                  onClick={() => setAdvancedFilters({
                    search: '', type: [], status: [], category: [], uploadedBy: [],
                    dateRange: { start: '', end: '' }, sizeRange: { min: '', max: '' }, tags: []
                  })}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedAssets.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedAssets.length} asset{selectedAssets.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('approved')}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleBulkAction('rejected')}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredAssets.length} of {assets.length} assets
        </p>
        {filteredAssets.length !== assets.length && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedStatus('all');
              setAdvancedFilters({
                search: '', type: [], status: [], category: [], uploadedBy: [],
                dateRange: { start: '', end: '' }, sizeRange: { min: '', max: '' }, tags: []
              });
            }}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAssets.map((asset) => {
          const IconComponent = typeIcons[asset.type] || FiFile;
          return (
            <div key={asset.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <IconComponent className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedAssets.includes(asset.id)}
                    onChange={() => handleSelectAsset(asset.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[asset.status]}`}>
                    {asset.status === 'approved' && <FiCheckCircle className="w-3 h-3 mr-1" />}
                    {asset.status === 'pending' && <FiClock className="w-3 h-3 mr-1" />}
                    {asset.status === 'rejected' && <FiXCircle className="w-3 h-3 mr-1" />}
                    {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{asset.size}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400">{formatDate(asset.uploadedAt)}</span>
                  <div className="flex items-center space-x-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600">
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Bulk Upload Assets</h3>
              <button
                onClick={() => setShowBulkUpload(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="bulk-upload"
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                />
                <label htmlFor="bulk-upload" className="cursor-pointer">
                  <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop files here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Support for images, videos, audio and documents
                  </p>
                </label>
              </div>

              {bulkFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Files to Upload ({bulkFiles.length})</h4>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {bulkFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FiFile className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setBulkFiles(prev => prev.filter((_, i) => i !== index))}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowBulkUpload(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkUpload}
                disabled={bulkFiles.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <FiUpload className="w-4 h-4" />
                <span>Upload {bulkFiles.length} Files</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filter Panel */}
      <AdvancedFilterPanel
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApplyFilters={handleAdvancedFiltersApply}
        currentFilters={advancedFilters}
        assets={assets}
      />
    </div>
  );
}
