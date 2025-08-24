'use client';

import { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Eye, EyeOff, Maximize2, Minimize2 } from 'react-feather';
import WidgetRenderer from './WidgetRenderer';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardPreview = ({ dashboard, viewportMode, isFullscreen = false, onToggleFullscreen }) => {
  const [hiddenWidgets, setHiddenWidgets] = useState(new Set());
  const [refreshKey, setRefreshKey] = useState(0);

  // Auto-refresh data every 30 seconds in preview mode
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const toggleWidgetVisibility = (widgetId) => {
    setHiddenWidgets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(widgetId)) {
        newSet.delete(widgetId);
      } else {
        newSet.add(widgetId);
      }
      return newSet;
    });
  };

  const getBreakpoints = () => {
    return {
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0
    };
  };

  const getCols = () => {
    switch (viewportMode) {
      case 'mobile': return { lg: 2, md: 2, sm: 2, xs: 1, xxs: 1 };
      case 'tablet': return { lg: 6, md: 6, sm: 4, xs: 2, xxs: 1 };
      default: return { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
    }
  };

  const getRowHeight = () => {
    switch (viewportMode) {
      case 'mobile': return 120;
      case 'tablet': return 100;
      default: return 80;
    }
  };

  // Filter visible widgets
  const visibleWidgets = dashboard.widgets.filter(widget => 
    widget.visible && !hiddenWidgets.has(widget.id)
  );

  // Convert widgets to grid layout format
  const layoutItems = visibleWidgets.map(widget => ({
    i: widget.id,
    x: widget.position.x,
    y: widget.position.y,
    w: widget.position.w,
    h: widget.position.h,
    static: true // Disable dragging/resizing in preview mode
  }));

  const containerClass = isFullscreen 
    ? 'fixed inset-0 z-50 bg-white' 
    : 'min-h-screen bg-gray-50 rounded-lg';

  return (
    <div className={containerClass}>
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{dashboard.name}</h2>
          <p className="text-sm text-gray-600">
            Preview Mode • {visibleWidgets.length} widgets • Auto-refresh enabled
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Widget Visibility Controls */}
          {dashboard.widgets.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Widgets:</span>
              <div className="flex space-x-1">
                {dashboard.widgets.map(widget => (
                  <button
                    key={widget.id}
                    onClick={() => toggleWidgetVisibility(widget.id)}
                    className={`p-1 rounded text-xs transition-colors ${
                      hiddenWidgets.has(widget.id)
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                    title={`Toggle ${widget.config.title || widget.type}`}
                  >
                    {hiddenWidgets.has(widget.id) ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fullscreen Toggle */}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {visibleWidgets.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Widgets to Display</h3>
              <p className="text-gray-600 mb-4">
                {dashboard.widgets.length === 0 
                  ? 'Add some widgets to your dashboard to see them here.'
                  : 'All widgets are currently hidden. Use the visibility controls above to show them.'
                }
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layoutItems }}
            breakpoints={getBreakpoints()}
            cols={getCols()}
            rowHeight={getRowHeight()}
            isDraggable={false}
            isResizable={false}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            useCSSTransforms={true}
          >
            {visibleWidgets.map(widget => (
              <div key={widget.id} className="widget-preview">
                <PreviewWidgetContainer widget={widget} refreshKey={refreshKey}>
                  <WidgetRenderer widget={widget} />
                </PreviewWidgetContainer>
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </div>

      {/* Dashboard Stats Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Dashboard: {dashboard.name}</span>
            <span>•</span>
            <span>Widgets: {visibleWidgets.length}/{dashboard.widgets.length}</span>
            <span>•</span>
            <span>Layout: {dashboard.layout}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Viewport: {viewportMode}</span>
            <span>•</span>
            <span>Theme: {dashboard.settings.theme}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreviewWidgetContainer = ({ widget, children, refreshKey }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Simulate refresh loading state
  useEffect(() => {
    if (refreshKey > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [refreshKey]);

  return (
    <div className="relative h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Widget Content */}
      <div className="h-full p-4">
        {children}
      </div>

      {/* Live Indicator */}
      <div className="absolute top-2 right-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Live Data"></div>
      </div>
    </div>
  );
};

export default DashboardPreview;
