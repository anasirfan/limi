'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import ActivityTracker from './ActivityTracker';
import AssetGrid from './AssetGrid';
import AssetTable from './AssetTable';
import SearchBar from './SearchBar';
import UploadModal from './UploadModal';
import { setViewMode } from '../../redux/slices/assetsSlice';
import { FiGrid, FiList, FiPlus } from 'react-icons/fi';

export default function AssetDashboard() {
  const dispatch = useDispatch();
  const { viewMode, selectedAssets, filteredAssets } = useSelector(state => state.assets);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your digital assets for Limi lighting brand
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
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

              {/* Upload button */}
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <FiPlus className="w-4 h-4" />
                <span>Upload Asset</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <SearchBar />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Assets View */}
          <main className="flex-1 overflow-auto p-6">
            {viewMode === 'grid' ? <AssetGrid /> : <AssetTable />}
          </main>

          {/* Activity Tracker */}
          <aside className="w-80 bg-white border-l border-gray-200 overflow-auto">
            <ActivityTracker />
          </aside>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <UploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}
    </div>
  );
}
