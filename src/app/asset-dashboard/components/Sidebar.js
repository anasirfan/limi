'use client';

import { useSelector, useDispatch } from 'react-redux';
import { setAssetTypeFilter } from '../../redux/slices/assetsSlice';
import { FiImage, FiVideo, FiBox, FiGrid, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const assetTypes = [
  { key: 'all', label: 'All Assets', icon: FiGrid },
  { key: 'image', label: 'Images', icon: FiImage },
  { key: 'video', label: 'Videos', icon: FiVideo },
  { key: '3d', label: '3D Models', icon: FiBox }
];

const Sidebar =({ isCollapsed, onToggleCollapse }) => {
  const dispatch = useDispatch();
  const { selectedAssetType, assets } = useSelector(state => state.assets);

  const getAssetCount = (type) => {
    if (type === 'all') return assets.length;
    return assets.filter(asset => asset.type === type).length;
  };

  const handleFilterChange = (type) => {
    dispatch(setAssetTypeFilter(type));
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Limi Assets</h2>
            <p className="text-xs text-gray-500">Digital Asset Hub</p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <FiChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <FiChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Asset Type Filters */}
      <div className="p-4">
        {!isCollapsed && (
          <h3 className="text-sm font-medium text-gray-700 mb-3">Asset Types</h3>
        )}
        <nav className="space-y-1">
          {assetTypes.map((type) => {
            const Icon = type.icon;
            const count = getAssetCount(type.key);
            const isActive = selectedAssetType === type.key;

            return (
              <button
                key={type.key}
                onClick={() => handleFilterChange(type.key)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                title={isCollapsed ? type.label : ''}
              >
                <Icon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{type.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Size</span>
              <span className="font-medium text-gray-900">
                {assets.reduce((total, asset) => {
                  const size = parseFloat(asset.size.replace(/[^\d.]/g, ''));
                  return total + size;
                }, 0).toFixed(1)} MB
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">This Week</span>
              <span className="font-medium text-green-600">+3 assets</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Storage Used</span>
              <span className="font-medium text-gray-900">2.1 GB</span>
            </div>
          </div>
        </div>
      )}

      {/* Team Roles Legend */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Team Roles</h3>
          <div className="space-y-2">
            {[
              { role: '3D Team', color: 'bg-purple-100 text-purple-700' },
              { role: 'VR Team', color: 'bg-green-100 text-green-700' },
              { role: 'Frontend Dev', color: 'bg-blue-100 text-blue-700' },
              { role: 'Backend Dev', color: 'bg-orange-100 text-orange-700' },
              { role: 'CEO', color: 'bg-red-100 text-red-700' }
            ].map((team) => (
              <div key={team.role} className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${team.color.split(' ')[0]} mr-2`}></div>
                <span className="text-xs text-gray-600">{team.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;