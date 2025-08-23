'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Save, 
  Eye, 
  Settings, 
  Grid, 
  Plus, 
  Trash2, 
  Copy, 
  RotateCcw,
  Download,
  Upload,
  Monitor,
  Smartphone,
  Tablet
} from 'react-feather';
import WidgetLibrary from './WidgetLibrary';
import DashboardCanvas from './DashboardCanvas';
// import DashboardPreview from './DashboardPreview';
import WidgetConfigPanel from './WidgetConfigPanel';

const DashboardBuilder = () => {
  const dispatch = useDispatch();
  const [currentDashboard, setCurrentDashboard] = useState({
    id: 'dashboard_1',
    name: 'Asset Management Dashboard',
    description: 'Customizable dashboard for LIMI asset management',
    layout: 'grid',
    columns: 12,
    widgets: [],
    settings: {
      theme: 'light',
      spacing: 'medium',
      showGrid: true,
      autoSave: true
    }
  });

  const [mode, setMode] = useState('edit'); // 'edit', 'preview'
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(true);
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [isDirty, setIsDirty] = useState(false);
  const [savedDashboards, setSavedDashboards] = useState([]);

  // Auto-save functionality
  useEffect(() => {
    if (isDirty && currentDashboard.settings.autoSave) {
      const timer = setTimeout(() => {
        saveDashboard();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentDashboard, isDirty]);

  const handleWidgetAdd = useCallback((widgetType, position) => {
    const newWidget = {
      id: `widget_${Date.now()}`,
      type: widgetType,
      position: position || { x: 0, y: 0, w: 4, h: 3 },
      config: getDefaultWidgetConfig(widgetType),
      data: {},
      visible: true
    };

    setCurrentDashboard(prev => ({
      ...prev,
      widgets: [...prev.widgets, newWidget]
    }));
    setIsDirty(true);
  }, []);

  const handleWidgetUpdate = useCallback((widgetId, updates) => {
    setCurrentDashboard(prev => ({
      ...prev,
      widgets: prev.widgets.map(widget =>
        widget.id === widgetId ? { ...widget, ...updates } : widget
      )
    }));
    setIsDirty(true);
  }, []);

  const handleWidgetDelete = useCallback((widgetId) => {
    setCurrentDashboard(prev => ({
      ...prev,
      widgets: prev.widgets.filter(widget => widget.id !== widgetId)
    }));
    setSelectedWidget(null);
    setIsDirty(true);
  }, []);

  const handleWidgetSelect = useCallback((widget) => {
    setSelectedWidget(widget);
    setShowConfigPanel(true);
  }, []);

  const getDefaultWidgetConfig = (type) => {
    const configs = {
      'asset-stats': {
        title: 'Asset Statistics',
        showTitle: true,
        refreshInterval: 30000,
        displayMode: 'cards'
      },
      'recent-uploads': {
        title: 'Recent Uploads',
        showTitle: true,
        itemCount: 10,
        showThumbnails: true
      },
      'storage-usage': {
        title: 'Storage Usage',
        showTitle: true,
        chartType: 'donut',
        showPercentage: true
      },
      'activity-feed': {
        title: 'Activity Feed',
        showTitle: true,
        itemCount: 15,
        showAvatars: true
      },
      'folder-tree': {
        title: 'Folder Structure',
        showTitle: true,
        expandedByDefault: true,
        showCounts: true
      },
      'quick-actions': {
        title: 'Quick Actions',
        showTitle: true,
        actions: ['upload', 'create-folder', 'bulk-download'],
        layout: 'grid'
      }
    };
    return configs[type] || {};
  };

  const saveDashboard = async () => {
    try {
      // API call to save dashboard
      const response = await fetch('/api/dashboards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentDashboard)
      });

      if (response.ok) {
        setIsDirty(false);
        dispatch({
          type: 'ui/showNotification',
          payload: {
            type: 'success',
            message: 'Dashboard saved successfully'
          }
        });
      }
    } catch (error) {
      console.error('Failed to save dashboard:', error);
      dispatch({
        type: 'ui/showNotification',
        payload: {
          type: 'error',
          message: 'Failed to save dashboard'
        }
      });
    }
  };

  const loadDashboard = async (dashboardId) => {
    try {
      const response = await fetch(`/api/dashboards/${dashboardId}`);
      if (response.ok) {
        const dashboard = await response.json();
        setCurrentDashboard(dashboard);
        setIsDirty(false);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    }
  };

  const exportDashboard = () => {
    const dataStr = JSON.stringify(currentDashboard, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${currentDashboard.name.replace(/\s+/g, '_')}_dashboard.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importDashboard = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const dashboard = JSON.parse(e.target.result);
          setCurrentDashboard(dashboard);
          setIsDirty(true);
        } catch (error) {
          dispatch({
            type: 'ui/showNotification',
            payload: {
              type: 'error',
              message: 'Invalid dashboard file'
            }
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const resetDashboard = () => {
    if (window.confirm('Are you sure you want to reset the dashboard? All changes will be lost.')) {
      setCurrentDashboard(prev => ({
        ...prev,
        widgets: []
      }));
      setSelectedWidget(null);
      setIsDirty(true);
    }
  };

  const duplicateDashboard = () => {
    const newDashboard = {
      ...currentDashboard,
      id: `dashboard_${Date.now()}`,
      name: `${currentDashboard.name} (Copy)`,
      widgets: currentDashboard.widgets.map(widget => ({
        ...widget,
        id: `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }))
    };
    setCurrentDashboard(newDashboard);
    setIsDirty(true);
  };

  const getViewportClass = () => {
    switch (viewportMode) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-4xl mx-auto';
      default: return 'w-full';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Builder</h1>
              <p className="text-sm text-gray-600">
                {currentDashboard.name} {isDirty && '(Unsaved changes)'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Viewport Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  viewportMode === 'desktop'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Desktop View"
              >
                <Monitor size={16} />
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  viewportMode === 'tablet'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Tablet View"
              >
                <Tablet size={16} />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  viewportMode === 'mobile'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Mobile View"
              >
                <Smartphone size={16} />
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMode('edit')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  mode === 'edit'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid size={16} className="mr-2 inline" />
                Edit
              </button>
              <button
                onClick={() => setMode('preview')}
                className={`px-3 py-2 rounded-md transition-colors ${
                  mode === 'preview'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye size={16} className="mr-2 inline" />
                Preview
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={saveDashboard}
                disabled={!isDirty}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={16} className="mr-2" />
                Save
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowWidgetLibrary(!showWidgetLibrary)}
                  className={`p-2 rounded-md transition-colors ${
                    showWidgetLibrary
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="Toggle Widget Library"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* More Actions Dropdown */}
              <div className="relative group">
                <button className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors">
                  <Settings size={16} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <button
                      onClick={duplicateDashboard}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Copy size={14} className="mr-2" />
                      Duplicate Dashboard
                    </button>
                    <button
                      onClick={exportDashboard}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Download size={14} className="mr-2" />
                      Export Dashboard
                    </button>
                    <label className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <Upload size={14} className="mr-2" />
                      Import Dashboard
                      <input
                        type="file"
                        accept=".json"
                        onChange={importDashboard}
                        className="hidden"
                      />
                    </label>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={resetDashboard}
                      className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <RotateCcw size={14} className="mr-2" />
                      Reset Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Widget Library Sidebar */}
        {showWidgetLibrary && mode === 'edit' && (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <WidgetLibrary onWidgetAdd={handleWidgetAdd} />
          </div>
        )}

        {/* Dashboard Canvas */}
        <div className="flex-1 overflow-auto p-6">
          <div className={`transition-all duration-300 ${getViewportClass()}`}>
            {mode === 'edit' ? (
              <DashboardCanvas
                dashboard={currentDashboard}
                onWidgetUpdate={handleWidgetUpdate}
                onWidgetDelete={handleWidgetDelete}
                onWidgetSelect={handleWidgetSelect}
                selectedWidget={selectedWidget}
                viewportMode={viewportMode}
              />
            ) : (
            //   <DashboardPreview
            //     dashboard={currentDashboard}
            //     viewportMode={viewportMode}
            //   />
            <p>dashboard preview</p>
            )}
          </div>
        </div>

        {/* Widget Configuration Panel */}
        {showConfigPanel && selectedWidget && mode === 'edit' && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <WidgetConfigPanel
              widget={selectedWidget}
              onWidgetUpdate={handleWidgetUpdate}
              onClose={() => setShowConfigPanel(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBuilder;
