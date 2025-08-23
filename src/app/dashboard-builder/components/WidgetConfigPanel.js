'use client';

import { useState } from 'react';
import { X, Save, RotateCcw, Eye, EyeOff } from 'react-feather';

const WidgetConfigPanel = ({ widget, onUpdate, onClose, onDelete }) => {
  const [config, setConfig] = useState(widget?.config || {});
  const [hasChanges, setHasChanges] = useState(false);

  const updateConfig = (key, value) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(widget.id, { config });
    setHasChanges(false);
  };

  const handleReset = () => {
    setConfig(widget.config);
    setHasChanges(false);
  };

  const toggleVisibility = () => {
    const newWidget = { ...widget, visible: !widget.visible };
    onUpdate(widget.id, newWidget);
  };

  if (!widget) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye size={24} className="text-gray-400" />
          </div>
          <p>Select a widget to configure</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Widget Settings</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <p className="text-sm text-gray-600">{getWidgetDisplayName(widget.type)}</p>
      </div>

      {/* Configuration Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* General Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">General</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Widget Title
              </label>
              <input
                type="text"
                value={config.title || ''}
                onChange={(e) => updateConfig('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter widget title"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showTitle"
                checked={config.showTitle !== false}
                onChange={(e) => updateConfig('showTitle', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showTitle" className="ml-2 text-sm text-gray-700">
                Show widget title
              </label>
            </div>
          </div>
        </div>

        {/* Widget-specific Settings */}
        {renderWidgetSpecificSettings(widget.type, config, updateConfig)}

        {/* Position & Size */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Position & Size</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Width</label>
              <input
                type="number"
                value={widget.position?.w || 4}
                onChange={(e) => onUpdate(widget.id, {
                  position: { ...widget.position, w: parseInt(e.target.value) }
                })}
                min="1"
                max="12"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Height</label>
              <input
                type="number"
                value={widget.position?.h || 3}
                onChange={(e) => onUpdate(widget.id, {
                  position: { ...widget.position, h: parseInt(e.target.value) }
                })}
                min="1"
                max="10"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              hasChanges
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
          <button
            onClick={handleReset}
            disabled={!hasChanges}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              hasChanges
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={toggleVisibility}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              widget.visible
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {widget.visible ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{widget.visible ? 'Hide Widget' : 'Show Widget'}</span>
          </button>
        </div>

        <button
          onClick={() => onDelete(widget.id)}
          className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition-colors"
        >
          Delete Widget
        </button>
      </div>
    </div>
  );
};

const renderWidgetSpecificSettings = (type, config, updateConfig) => {
  switch (type) {
    case 'asset-stats':
      return (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Display Options</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Mode
              </label>
              <select
                value={config.displayMode || 'cards'}
                onChange={(e) => updateConfig('displayMode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cards">Cards</option>
                <option value="list">List</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refresh Interval (seconds)
              </label>
              <input
                type="number"
                value={config.refreshInterval ? config.refreshInterval / 1000 : 30}
                onChange={(e) => updateConfig('refreshInterval', parseInt(e.target.value) * 1000)}
                min="5"
                max="300"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      );

    case 'recent-uploads':
      return (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Content Options</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Items
              </label>
              <input
                type="number"
                value={config.itemCount || 10}
                onChange={(e) => updateConfig('itemCount', parseInt(e.target.value))}
                min="1"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showThumbnails"
                checked={config.showThumbnails !== false}
                onChange={(e) => updateConfig('showThumbnails', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showThumbnails" className="ml-2 text-sm text-gray-700">
                Show thumbnails
              </label>
            </div>
          </div>
        </div>
      );

    case 'storage-usage':
      return (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Chart Options</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chart Type
              </label>
              <select
                value={config.chartType || 'donut'}
                onChange={(e) => updateConfig('chartType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="donut">Donut Chart</option>
                <option value="bar">Progress Bar</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPercentage"
                checked={config.showPercentage !== false}
                onChange={(e) => updateConfig('showPercentage', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showPercentage" className="ml-2 text-sm text-gray-700">
                Show percentage
              </label>
            </div>
          </div>
        </div>
      );

    case 'activity-feed':
      return (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Feed Options</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Activities
              </label>
              <input
                type="number"
                value={config.itemCount || 15}
                onChange={(e) => updateConfig('itemCount', parseInt(e.target.value))}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showAvatars"
                checked={config.showAvatars !== false}
                onChange={(e) => updateConfig('showAvatars', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showAvatars" className="ml-2 text-sm text-gray-700">
                Show user avatars
              </label>
            </div>
          </div>
        </div>
      );

    case 'folder-tree':
      return (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Tree Options</h4>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="expandedByDefault"
                checked={config.expandedByDefault !== false}
                onChange={(e) => updateConfig('expandedByDefault', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="expandedByDefault" className="ml-2 text-sm text-gray-700">
                Expand folders by default
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showCounts"
                checked={config.showCounts !== false}
                onChange={(e) => updateConfig('showCounts', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showCounts" className="ml-2 text-sm text-gray-700">
                Show item counts
              </label>
            </div>
          </div>
        </div>
      );

    case 'quick-actions':
      return (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Action Options</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Layout
              </label>
              <select
                value={config.layout || 'grid'}
                onChange={(e) => updateConfig('layout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="grid">Grid</option>
                <option value="list">List</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Actions
              </label>
              <div className="space-y-2">
                {['upload', 'create-folder', 'bulk-download'].map(action => (
                  <div key={action} className="flex items-center">
                    <input
                      type="checkbox"
                      id={action}
                      checked={(config.actions || []).includes(action)}
                      onChange={(e) => {
                        const currentActions = config.actions || [];
                        const newActions = e.target.checked
                          ? [...currentActions, action]
                          : currentActions.filter(a => a !== action);
                        updateConfig('actions', newActions);
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={action} className="ml-2 text-sm text-gray-700 capitalize">
                      {action.replace('-', ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

const getWidgetDisplayName = (type) => {
  const names = {
    'asset-stats': 'Asset Statistics',
    'recent-uploads': 'Recent Uploads',
    'storage-usage': 'Storage Usage',
    'activity-feed': 'Activity Feed',
    'folder-tree': 'Folder Tree',
    'quick-actions': 'Quick Actions'
  };
  return names[type] || type;
};

export default WidgetConfigPanel;
