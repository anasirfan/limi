'use client';

import { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Edit3, Trash2, Copy, Move, Settings } from 'react-feather';
import WidgetRenderer from './WidgetRenderer';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardCanvas = ({
  dashboard,
  onWidgetUpdate,
  onWidgetDelete,
  onWidgetSelect,
  selectedWidget,
  viewportMode
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: 'widget',
    drop: (item, monitor) => {
      const offset = monitor.getDropResult();
      if (!offset) {
        // Calculate grid position based on drop coordinates
        const clientOffset = monitor.getClientOffset();
        const canvasRect = document.getElementById('dashboard-canvas').getBoundingClientRect();
        
        const x = Math.floor((clientOffset.x - canvasRect.left) / 100); // Approximate grid cell width
        const y = Math.floor((clientOffset.y - canvasRect.top) / 80);   // Approximate grid cell height
        
        const position = {
          x: Math.max(0, x),
          y: Math.max(0, y),
          w: item.size?.w || 4,
          h: item.size?.h || 3
        };
        
        onWidgetAdd(item.widgetType, position);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const onWidgetAdd = useCallback((widgetType, position) => {
    const newWidget = {
      id: `widget_${Date.now()}`,
      type: widgetType,
      position: position,
      config: getDefaultWidgetConfig(widgetType),
      data: {},
      visible: true
    };

    onWidgetUpdate(newWidget.id, newWidget);
  }, [onWidgetUpdate]);

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

  const handleLayoutChange = (layout) => {
    layout.forEach(item => {
      const widget = dashboard.widgets.find(w => w.id === item.i);
      if (widget) {
        onWidgetUpdate(widget.id, {
          position: {
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h
          }
        });
      }
    });
  };

  const handleWidgetAction = (action, widget) => {
    switch (action) {
      case 'edit':
        onWidgetSelect(widget);
        break;
      case 'duplicate':
        const duplicatedWidget = {
          ...widget,
          id: `widget_${Date.now()}`,
          position: {
            ...widget.position,
            x: widget.position.x + 1,
            y: widget.position.y + 1
          }
        };
        onWidgetUpdate(duplicatedWidget.id, duplicatedWidget);
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this widget?')) {
          onWidgetDelete(widget.id);
        }
        break;
    }
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

  // Convert widgets to grid layout format
  const layoutItems = dashboard.widgets.map(widget => ({
    i: widget.id,
    x: widget.position.x,
    y: widget.position.y,
    w: widget.position.w,
    h: widget.position.h,
    minW: 2,
    minH: 2
  }));

  return (
    <div
      ref={drop}
      id="dashboard-canvas"
      className={`min-h-screen bg-gray-100 rounded-lg border-2 border-dashed transition-all duration-200 ${
        isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
      } ${dashboard.settings.showGrid ? 'bg-grid-pattern' : ''}`}
      style={{
        backgroundImage: dashboard.settings.showGrid 
          ? 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)'
          : 'none',
        backgroundSize: dashboard.settings.showGrid ? '20px 20px' : 'auto'
      }}
    >
      {dashboard.widgets.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Move size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Dashboard</h3>
            <p className="text-gray-600 mb-4">Drag widgets from the library to create your custom dashboard</p>
            <div className="text-sm text-gray-500">
              <p>• Drag widgets to add them</p>
              <p>• Resize by dragging corners</p>
              <p>• Click to configure</p>
            </div>
          </div>
        </div>
      ) : (
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layoutItems }}
          breakpoints={getBreakpoints()}
          cols={getCols()}
          rowHeight={getRowHeight()}
          onLayoutChange={handleLayoutChange}
          isDraggable={true}
          isResizable={true}
          margin={[16, 16]}
          containerPadding={[20, 20]}
          useCSSTransforms={true}
        >
          {dashboard.widgets.map(widget => (
            <div key={widget.id} className="widget-container">
              <WidgetContainer
                widget={widget}
                isSelected={selectedWidget?.id === widget.id}
                onAction={handleWidgetAction}
                onSelect={() => onWidgetSelect(widget)}
              >
                <WidgetRenderer widget={widget} />
              </WidgetContainer>
            </div>
          ))}
        </ResponsiveGridLayout>
      )}

      {/* Drop Overlay */}
      {isOver && (
        <div className="absolute inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Move size={32} className="text-blue-600 mx-auto mb-2" />
            <p className="text-blue-800 font-medium">Drop widget here</p>
          </div>
        </div>
      )}
    </div>
  );
};

const WidgetContainer = ({ widget, isSelected, onAction, onSelect, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative h-full bg-white rounded-lg shadow-sm border transition-all duration-200 overflow-hidden ${
        isSelected 
          ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
          : isHovered 
            ? 'border-gray-300 shadow-md' 
            : 'border-gray-200'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      {/* Widget Actions */}
      {(isHovered || isSelected) && (
        <div className="absolute top-2 right-2 z-10 flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction('edit', widget);
            }}
            className="p-1 bg-white rounded shadow-sm hover:bg-gray-50 transition-colors"
            title="Configure widget"
          >
            <Settings size={14} className="text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction('duplicate', widget);
            }}
            className="p-1 bg-white rounded shadow-sm hover:bg-gray-50 transition-colors"
            title="Duplicate widget"
          >
            <Copy size={14} className="text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction('delete', widget);
            }}
            className="p-1 bg-white rounded shadow-sm hover:bg-red-50 transition-colors"
            title="Delete widget"
          >
            <Trash2 size={14} className="text-red-600" />
          </button>
        </div>
      )}

      {/* Widget Content */}
      <div className="h-full p-4">
        {children}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default DashboardCanvas;
