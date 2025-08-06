'use client';

import { useSelector, useDispatch } from 'react-redux';
import { toggleAssetSelection, selectAllAssets, clearSelection, deleteAsset, updateAsset } from '../../redux/slices/assetsSlice';
import { addActivity } from '../../redux/slices/activitySlice';
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
  FiDownload,
  FiTable
} from 'react-icons/fi';

const getAssetIcon = (type) => {
  switch (type) {
    case 'image': return FiImage;
    case 'video': return FiVideo;
    case '3d': return FiBox;
    default: return FiImage;
  }
};

export default function AssetTable() {
  const dispatch = useDispatch();
  const { filteredAssets, selectedAssets } = useSelector(state => state.assets);
  const [editingAsset, setEditingAsset] = useState(null);
  const [newName, setNewName] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);

  const handleSelectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      dispatch(clearSelection());
    } else {
      dispatch(selectAllAssets());
    }
  };

  const handleAssetSelect = (assetId) => {
    dispatch(toggleAssetSelection(assetId));
  };

  const handleAssetDelete = (asset) => {
    if (confirm(`Delete "${asset.name}"?`)) {
      dispatch(deleteAsset(asset.id));
      dispatch(addActivity({
        user: 'Current User',
        role: 'Frontend Dev',
        action: 'deleted',
        assetName: asset.name,
        assetType: asset.type,
        details: `Deleted ${asset.type} asset from dashboard`
      }));
    }
    setActiveMenu(null);
  };

  const handleStartEdit = (asset) => {
    setEditingAsset(asset.id);
    setNewName(asset.name);
    setActiveMenu(null);
  };

  const handleRename = (asset) => {
    if (newName.trim() && newName !== asset.name) {
      const oldName = asset.name;
      dispatch(updateAsset({
        id: asset.id,
        updates: { name: newName.trim() }
      }));
      dispatch(addActivity({
        user: 'Current User',
        role: 'Frontend Dev',
        action: 'renamed',
        assetName: newName.trim(),
        assetType: asset.type,
        details: `Renamed from "${oldName}" to "${newName.trim()}"`
      }));
    }
    setEditingAsset(null);
    setNewName('');
  };

  const handleCancelEdit = () => {
    setEditingAsset(null);
    setNewName('');
  };

  const handleCopyUrl = (asset) => {
    navigator.clipboard.writeText(asset.url);
    setActiveMenu(null);
  };

  const handleKeyPress = (e, asset) => {
    if (e.key === 'Enter') {
      handleRename(asset);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  if (filteredAssets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <FiTable className="w-12 h-12 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">No assets found</h3>
        <p className="text-sm text-center max-w-md">
          Try adjusting your search terms or filters, or upload new assets to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedAssets.length === filteredAssets.length && filteredAssets.length > 0}
            onChange={handleSelectAll}
            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="ml-3 text-sm font-medium text-gray-700">
            {selectedAssets.length > 0 ? `${selectedAssets.length} selected` : 'Select all'}
          </span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssets.map((asset) => {
              const AssetIcon = getAssetIcon(asset.type);
              const isSelected = selectedAssets.includes(asset.id);
              const isEditing = editingAsset === asset.id;

              return (
                <tr
                  key={asset.id}
                  className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
                >
                  {/* Selection + Asset Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleAssetSelect(asset.id)}
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <div className="ml-4 flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {asset.thumbnail ? (
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={asset.thumbnail}
                              alt={asset.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              <AssetIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          {isEditing ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                onKeyDown={(e) => handleKeyPress(e, asset)}
                                className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                autoFocus
                              />
                              <button
                                onClick={() => handleRename(asset)}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                              >
                                <FiCheck className="w-4 h-4" />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <FiX className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {asset.name}
                              </div>
                              {asset.tags && asset.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {asset.tags.slice(0, 2).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {asset.tags.length > 2 && (
                                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                                      +{asset.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      asset.type === 'image' ? 'bg-green-100 text-green-800' :
                      asset.type === 'video' ? 'bg-blue-100 text-blue-800' :
                      asset.type === '3d' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {asset.type.toUpperCase()}
                    </span>
                  </td>

                  {/* Size */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.size}
                  </td>

                  {/* Uploaded By */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.uploadedBy}
                  </td>

                  {/* Modified */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistanceToNow(new Date(asset.lastModified), { addSuffix: true })}
                  </td>

                  {/* Usage */}
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {asset.usageContext}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === asset.id ? null : asset.id)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <FiMoreVertical className="w-4 h-4 text-gray-400" />
                      </button>

                      {activeMenu === asset.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleStartEdit(asset)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                            >
                              <FiEdit2 className="w-4 h-4" />
                              <span>Rename</span>
                            </button>
                            <button
                              onClick={() => handleCopyUrl(asset)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                            >
                              <FiCopy className="w-4 h-4" />
                              <span>Copy URL</span>
                            </button>
                            <button
                              onClick={() => {
                                window.open(asset.url, '_blank');
                                setActiveMenu(null);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                            >
                              <FiDownload className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                            <hr className="my-1" />
                            <button
                              onClick={() => handleAssetDelete(asset)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                              <FiTrash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Click outside to close menu */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}
