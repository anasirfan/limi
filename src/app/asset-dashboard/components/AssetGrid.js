'use client';

import { useSelector, useDispatch } from 'react-redux';
import { toggleAssetSelection, deleteAsset, updateAsset, setAssets, setLoading } from '../../../app/redux/slices/activitySlice';
import { addActivity } from '../../../app/redux/slices/activitySlice';
import { useState, useEffect } from 'react';
import { assetsApi } from '../api/assetsApi';
import AssetCard from './AssetCard';
import { FiGrid } from 'react-icons/fi';

export default function AssetGrid() {
  const dispatch = useDispatch();
  const { filteredAssets, selectedAssets } = useSelector(state => state.assets);
  const [editingAsset, setEditingAsset] = useState(null);

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
  };

  const handleAssetRename = (asset, newName) => {
    const oldName = asset.name;
    dispatch(updateAsset({
      id: asset.id,
      updates: { name: newName }
    }));
    dispatch(addActivity({
      user: 'Current User',
      role: 'Frontend Dev',
      action: 'renamed',
      assetName: newName,
      assetType: asset.type,
      details: `Renamed from "${oldName}" to "${newName}"`
    }));
    setEditingAsset(null);
  };

  const handleCopyUrl = (asset) => {
    console.log("copyurl",asset);
    navigator.clipboard.writeText(asset.url);
    // Show a temporary notification
    const notification = document.createElement('div');
    notification.textContent = `URL copied: ${asset.name}`;
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity';
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  // Transform API response to component format
  const transformApiAssets = (apiAssets) => {
    return apiAssets.map(asset => ({
      id: asset._id,
      name: asset.originalname || asset.filename,
      type: asset.category === 'models' ? '3d' : asset.category?.slice(0, -1) || 'image', // 'videos' -> 'video', 'images' -> 'image'
      size: `${(asset.size / (1024 * 1024)).toFixed(1)} MB`, // Convert bytes to MB string
      url: asset.url,
      thumbnail: asset.url,
      tags: asset.tags || [],
      uploadedBy: 'API User',
      uploadedAt: asset.createdAt,
      lastModified: asset.updatedAt,
      usageContext: asset.description || 'Uploaded via API',
      format: asset.mimetype?.split('/')[1]?.toUpperCase() || asset.originalname?.split('.').pop()?.toUpperCase(),
      createdAt: asset.createdAt
    }));
  };

  useEffect(() => {
    const handleAssetsUpdated = async () => {
      try {
        const response = await assetsApi.getAssets();
        // Handle new API response structure with items array and transform data
        const rawAssets = response.items || response.data || [];
        const transformedAssets = transformApiAssets(rawAssets);
        dispatch(setAssets(transformedAssets));
      } catch (error) {
        console.error(error);
      }
    };

    const handleSearchUpdated = async (event) => {
      try {
        const { query } = event.detail;
        const response = await assetsApi.searchAssets(query);
        // Handle new API response structure with items array and transform data
        const rawAssets = response.items || response.data || [];
        const transformedAssets = transformApiAssets(rawAssets);
        dispatch(setAssets(transformedAssets));
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener('assetsUpdated', handleAssetsUpdated);
    window.addEventListener('searchUpdated', handleSearchUpdated);
    
    return () => {
      window.removeEventListener('assetsUpdated', handleAssetsUpdated);
      window.removeEventListener('searchUpdated', handleSearchUpdated);
    };
  }, []); 

  if (filteredAssets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <FiGrid className="w-12 h-12 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">No assets found</h3>
        <p className="text-sm text-center max-w-md">
          Try adjusting your search terms or filters, or upload new assets to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAssets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          isSelected={selectedAssets.includes(asset.id)}
          isEditing={editingAsset === asset.id}
          onSelect={() => handleAssetSelect(asset.id)}
          onDelete={() => handleAssetDelete(asset)}
          onRename={(newName) => handleAssetRename(asset, newName)}
          onCopyUrl={handleCopyUrl}
          onStartEdit={() => setEditingAsset(asset.id)}
          onCancelEdit={() => setEditingAsset(null)}
        />
      ))}
    </div>
  );
}
