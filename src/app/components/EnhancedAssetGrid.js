'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  FiImage, 
  FiVideo, 
  FiFile, 
  FiMusic,
  FiArchive,
  FiEye,
  FiDownload,
  FiEdit3,
  FiTrash2,
  FiHeart,
  FiShare2,
  FiMoreVertical,
  FiGrid,
  FiList,
  FiFilter
} from 'react-icons/fi';

const ITEM_HEIGHT = 280; // Height of each grid item
const ITEMS_PER_ROW = 4; // Number of items per row

const getFileIcon = (type) => {
  const icons = {
    image: FiImage,
    video: FiVideo,
    audio: FiMusic,
    document: FiFile,
    archive: FiArchive
  };
  return icons[type] || FiFile;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const AssetCard = ({ asset, viewMode, onSelect, isSelected, onAction }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const IconComponent = getFileIcon(asset.type);

  const handleImageLoad = () => setIsLoaded(true);
  const handleImageError = () => setImageError(true);

  if (viewMode === 'list') {
    return (
      <div className={`flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="flex items-center space-x-4 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(asset.id)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {asset.type === 'image' && !imageError ? (
              <img
                src={asset.thumbnail || asset.url}
                alt={asset.name}
                className="w-full h-full object-cover rounded-lg"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <IconComponent className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">{asset.name}</h3>
            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
              <span className="capitalize">{asset.type}</span>
              <span>{formatFileSize(asset.size)}</span>
              <span>{asset.uploadedAt}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              asset.status === 'approved' ? 'bg-green-100 text-green-700' :
              asset.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {asset.status}
            </span>
            <button
              onClick={() => onAction('view', asset)}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <FiEye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAction('edit', asset)}
              className="p-1 text-gray-400 hover:text-green-600 transition-colors"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAction('delete', asset)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="relative aspect-video bg-gray-100">
        {asset.type === 'image' && !imageError ? (
          <>
            <img
              src={asset.thumbnail || asset.url}
              alt={asset.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <IconComponent className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button
              onClick={() => onAction('view', asset)}
              className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiEye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAction('download', asset)}
              className="p-2 bg-white rounded-full text-gray-700 hover:text-green-600 transition-colors"
            >
              <FiDownload className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAction('share', asset)}
              className="p-2 bg-white rounded-full text-gray-700 hover:text-purple-600 transition-colors"
            >
              <FiShare2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selection checkbox */}
        <div className="absolute top-2 left-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(asset.id)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>

        {/* Status badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            asset.status === 'approved' ? 'bg-green-100 text-green-700' :
            asset.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {asset.status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate mb-2">{asset.name}</h3>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="capitalize">{asset.type}</span>
            <span>•</span>
            <span>{formatFileSize(asset.size)}</span>
          </div>
          <span>{asset.uploadedAt}</span>
        </div>
        
        {/* Tags */}
        {asset.tags && asset.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {asset.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                {tag}
              </span>
            ))}
            {asset.tags.length > 2 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                +{asset.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const VirtualizedGrid = ({ items, viewMode, selectedItems, onSelect, onAction, containerHeight = 600 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const itemsPerRow = viewMode === 'grid' ? ITEMS_PER_ROW : 1;
  const itemHeight = viewMode === 'grid' ? ITEM_HEIGHT : 80;
  const totalRows = Math.ceil(items.length / itemsPerRow);
  const totalHeight = totalRows * itemHeight;

  const visibleRange = useMemo(() => {
    const startRow = Math.floor(scrollTop / itemHeight);
    const endRow = Math.min(totalRows - 1, startRow + Math.ceil(containerHeight / itemHeight) + 1);
    return { startRow, endRow };
  }, [scrollTop, itemHeight, totalRows, containerHeight]);

  const visibleItems = useMemo(() => {
    const { startRow, endRow } = visibleRange;
    const items_to_render = [];
    
    for (let row = startRow; row <= endRow; row++) {
      for (let col = 0; col < itemsPerRow; col++) {
        const index = row * itemsPerRow + col;
        if (index < items.length) {
          items_to_render.push({
            ...items[index],
            row,
            col,
            index
          });
        }
      }
    }
    return items_to_render;
  }, [items, visibleRange, itemsPerRow]);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-4 gap-6 p-6" style={{ paddingTop: visibleRange.startRow * itemHeight }}>
            {visibleItems.map((item) => (
              <div key={item.id} style={{ gridRow: item.row - visibleRange.startRow + 1, gridColumn: item.col + 1 }}>
                <AssetCard
                  asset={item}
                  viewMode={viewMode}
                  isSelected={selectedItems.includes(item.id)}
                  onSelect={onSelect}
                  onAction={onAction}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 p-6" style={{ paddingTop: visibleRange.startRow * itemHeight }}>
            {visibleItems.map((item) => (
              <div key={item.id} style={{ position: 'absolute', top: item.row * itemHeight, width: '100%', paddingRight: '24px' }}>
                <AssetCard
                  asset={item}
                  viewMode={viewMode}
                  isSelected={selectedItems.includes(item.id)}
                  onSelect={onSelect}
                  onAction={onAction}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function EnhancedAssetGrid({ 
  assets = [], 
  loading = false, 
  onAssetAction,
  containerHeight = 600 
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedAssets = useMemo(() => {
    return [...assets].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'size') {
        aValue = a.size || 0;
        bValue = b.size || 0;
      } else if (sortBy === 'uploadedAt') {
        aValue = new Date(a.uploadedAt);
        bValue = new Date(b.uploadedAt);
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [assets, sortBy, sortOrder]);

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === assets.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(assets.map(asset => asset.id));
    }
  };

  const handleAction = (action, asset) => {
    if (onAssetAction) {
      onAssetAction(action, asset);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedItems.length === assets.length && assets.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">
                {selectedItems.length > 0 ? `${selectedItems.length} selected` : `${assets.length} assets`}
              </span>
            </div>
            
            {selectedItems.length > 0 && (
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                  Download Selected
                </button>
                <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
                  Delete Selected
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Controls */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="name">Sort by Name</option>
              <option value="uploadedAt">Sort by Date</option>
              <option value="size">Sort by Size</option>
              <option value="type">Sort by Type</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Grid */}
      <VirtualizedGrid
        items={sortedAssets}
        viewMode={viewMode}
        selectedItems={selectedItems}
        onSelect={handleSelectItem}
        onAction={handleAction}
        containerHeight={containerHeight}
      />
    </div>
  );
}
