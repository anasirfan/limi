'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  FiMoreVertical, 
  FiEdit2, 
  FiTrash2, 
  FiCopy, 
  FiCheck, 
  FiX,
  FiImage,
  FiVideo,
  FiBox,
  FiDownload
} from 'react-icons/fi';

const getAssetIcon = (type) => {
  switch (type) {
    case 'image': return FiImage;
    case 'video': return FiVideo;
    case '3d': return FiBox;
    default: return FiImage;
  }
};

const getAssetTypeColor = (type) => {
  switch (type) {
    case 'image': return 'bg-green-100 text-green-700 border-green-200';
    case 'video': return 'bg-blue-100 text-blue-700 border-blue-200';
    case '3d': return 'bg-purple-100 text-purple-700 border-purple-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function AssetCard({ 
  asset, 
  isSelected, 
  isEditing, 
  onSelect, 
  onDelete, 
  onRename, 
  onCopyUrl, 
  onStartEdit, 
  onCancelEdit 
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [newName, setNewName] = useState(asset.name);
  const [isHovered, setIsHovered] = useState(false);

  const AssetIcon = getAssetIcon(asset.type);

  const handleRename = () => {
    if (newName.trim() && newName !== asset.name) {
      onRename(newName.trim());
    } else {
      onCancelEdit();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setNewName(asset.name);
      onCancelEdit();
    }
  };

  return (
    <div 
      className={`relative bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </div>

      {/* Menu Button */}
      <div className="absolute top-3 right-3 z-10">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`p-1.5 rounded-full transition-colors ${
              showMenu || isHovered ? 'bg-white shadow-sm' : 'bg-transparent'
            } hover:bg-white hover:shadow-sm`}
          >
            <FiMoreVertical className="w-4 h-4 text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="py-1">
                <button
                  onClick={() => {
                    onStartEdit();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <FiEdit2 className="w-4 h-4" />
                  <span>Rename</span>
                </button>
                <button
                  onClick={() => {
                    onCopyUrl();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <FiCopy className="w-4 h-4" />
                  <span>Copy URL</span>
                </button>
                <button
                  onClick={() => {
                    window.open(asset.url, '_blank');
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <FiDownload className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => {
                    onDelete();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Asset Thumbnail */}
      <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
        {asset.thumbnail ? (
          <img
            src={asset.thumbnail}
            alt={asset.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <AssetIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Asset Info */}
      <div className="p-4">
        {/* Asset Name */}
        {isEditing ? (
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={handleRename}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
            >
              <FiCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setNewName(asset.name);
                onCancelEdit();
              }}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <h3 className="font-medium text-gray-900 mb-2 truncate" title={asset.name}>
            {asset.name}
          </h3>
        )}

        {/* Asset Type and Size */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 text-xs rounded border ${getAssetTypeColor(asset.type)}`}>
            {asset.type.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500">{asset.size}</span>
        </div>

        {/* Asset Details */}
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Uploaded by:</span>
            <span className="font-medium">{asset.uploadedBy}</span>
          </div>
          <div className="flex justify-between">
            <span>Modified:</span>
            <span>{formatDistanceToNow(new Date(asset.lastModified), { addSuffix: true })}</span>
          </div>
          {asset.dimensions && (
            <div className="flex justify-between">
              <span>Dimensions:</span>
              <span>{asset.dimensions}</span>
            </div>
          )}
          {asset.duration && (
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{asset.duration}</span>
            </div>
          )}
          {asset.polygons && (
            <div className="flex justify-between">
              <span>Polygons:</span>
              <span>{asset.polygons}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {asset.tags && asset.tags.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {asset.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                >
                  {tag}
                </span>
              ))}
              {asset.tags.length > 3 && (
                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                  +{asset.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Usage Context */}
        {asset.usageContext && (
          <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
            <span className="font-medium">Usage:</span> {asset.usageContext}
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
