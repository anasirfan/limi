'use client';

import { useSelector, useDispatch } from 'react-redux';
import { toggleAssetSelection, deleteAsset, updateAsset } from '../../redux/slices/assetsSlice';
import { addActivity } from '../../redux/slices/activitySlice';
import { useState } from 'react';
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
    navigator.clipboard.writeText(asset.url);
    // You could add a toast notification here
  };

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
          onCopyUrl={() => handleCopyUrl(asset)}
          onStartEdit={() => setEditingAsset(asset.id)}
          onCancelEdit={() => setEditingAsset(null)}
        />
      ))}
    </div>
  );
}
