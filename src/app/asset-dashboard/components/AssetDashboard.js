'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Sidebar from './Sidebar';
import ActivityTracker from './ActivityTracker';
import AssetGrid from './AssetGrid';
import AssetTable from './AssetTable';
import SearchBar from './SearchBar';
import UploadModal from './UploadModal';
import FolderUploadModal from './FolderUploadModal';
import FolderNavigation from './FolderNavigation';
import { setViewMode, setAssets, setLoading } from '../../../app/redux/slices/assetsSlice';
import { FiGrid, FiList, FiPlus, FiSettings, FiFolder } from 'react-icons/fi';
import {assetsApi} from '../api/assetsApi';

export default function AssetDashboard() {
  const dispatch = useDispatch();
  const { viewMode, selectedAssets, filteredAssets } = useSelector(state => state.assets);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderUploadModal, setShowFolderUploadModal] = useState(false);
  const [showFolderNavigation, setShowFolderNavigation] = useState(true);
  const [currentFolderPath, setCurrentFolderPath] = useState('/');

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

  // Load real API data on dashboard initialization
  useEffect(() => {
    const loadInitialAssets = async () => {
      try {
        dispatch(setLoading(true));
        const response = await assetsApi.getAssets();
        // Handle new API response structure with items array and transform data
        const rawAssets = response.items || response.data || [];
        const transformedAssets = transformApiAssets(rawAssets);
        dispatch(setAssets(transformedAssets));
      } catch (error) {
        console.error('Failed to load initial assets:', error);
        // Keep existing mock data if API fails
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadInitialAssets();
  }, [dispatch]);

  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode));
  };

  const handleFolderPathChange = (path) => {
    setCurrentFolderPath(path);
    // Update URL without page reload
    const url = new URL(window.location);
    if (path === '/') {
      url.searchParams.delete('folder');
    } else {
      url.searchParams.set('folder', path);
    }
    window.history.pushState({}, '', url);
    
    // Dispatch action to filter assets by folder
    dispatch({
      type: 'assets/setFolderFilter',
      payload: path
    });
  };

  const handleFolderCreate = async (folderPath, folderName) => {
    // API call to create folder
    console.log('Creating folder:', folderPath, folderName);
    
    // Dispatch action to add folder to state
    dispatch({
      type: 'folders/createFolder',
      payload: {
        path: folderPath,
        name: folderName
      }
    });
  };

  // Get current folder info for breadcrumbs
  const getCurrentFolderInfo = () => {
    if (currentFolderPath === '/') {
      return { name: 'All Assets', path: '/', assetCount: filteredAssets.length };
    }
    
    const pathParts = currentFolderPath.split('/').filter(Boolean);
    const folderName = pathParts[pathParts.length - 1];
    
    return {
      name: folderName.charAt(0).toUpperCase() + folderName.slice(1),
      path: currentFolderPath,
      assetCount: filteredAssets.length
    };
  };

  const currentFolder = getCurrentFolderInfo();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Folder Navigation Panel */}
      {showFolderNavigation && (
        <div className="w-80 flex-shrink-0">
          <FolderNavigation
            currentPath={currentFolderPath}
            onPathChange={handleFolderPathChange}
            onFolderCreate={handleFolderCreate}
            className="h-full"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentFolder.name}
                  </h1>
                  {currentFolderPath !== '/' && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {currentFolderPath}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {currentFolderPath === '/' 
                    ? 'Manage your digital assets for Limi lighting brand'
                    : `Assets in ${currentFolder.name} folder`
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Folder navigation toggle */}
              <button
                onClick={() => setShowFolderNavigation(!showFolderNavigation)}
                className={`p-2 rounded-md transition-colors ${
                  showFolderNavigation 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={showFolderNavigation ? 'Hide folders' : 'Show folders'}
              >
                <FiFolder className="w-4 h-4" />
              </button>

              {/* Asset count */}
              <div className="text-sm text-gray-600">
                {filteredAssets.length} assets
                {selectedAssets.length > 0 && (
                  <span className="ml-2 text-blue-600 font-medium">
                    ({selectedAssets.length} selected)
                  </span>
                )}
              </div>

              {/* View mode toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleViewModeChange('table')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>

              {/* System Admin Link */}
              <Link
                href="/admin"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <FiSettings className="w-4 h-4" />
                <span>System Admin</span>
              </Link>

              {/* Upload buttons */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Upload Files
              </button>
              <button
                onClick={() => setShowFolderUploadModal(true)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Upload Folder
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <SearchBar currentFolder={currentFolderPath} />
          </div>

          {/* Folder Actions Bar */}
          {currentFolderPath !== '/' && (
            <div className="mt-3 flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-sm text-blue-700">
                  <FiFolder className="w-4 h-4 mr-2" />
                  <span className="font-medium">Current folder:</span>
                  <span className="ml-1">{currentFolder.name}</span>
                </div>
                <div className="text-sm text-blue-600">
                  {currentFolder.assetCount} assets
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/asset-dashboard?folder=${encodeURIComponent(currentFolderPath)}`;
                    navigator.clipboard.writeText(url);
                    // Show notification
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Copy URL
                </button>
                <button
                  onClick={() => handleFolderPathChange('/')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Assets View */}
          <main className="flex-1 overflow-auto p-6">
            {viewMode === 'grid' ? (
              <AssetGrid currentFolder={currentFolderPath} />
            ) : (
              <AssetTable currentFolder={currentFolderPath} />
            )}
          </main>

          {/* Activity Tracker */}
          <aside className="w-80 bg-white border-l border-gray-200 overflow-auto">
            <ActivityTracker />
          </aside>
        </div>
      </div>

      {/* Upload Modals */}
      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          defaultFolder={currentFolderPath}
        />
      )}
      {showFolderUploadModal && (
        <FolderUploadModal
          isOpen={showFolderUploadModal}
          onClose={() => setShowFolderUploadModal(false)}
          defaultFolder={currentFolderPath}
        />
      )}
    </div>
  );
}
