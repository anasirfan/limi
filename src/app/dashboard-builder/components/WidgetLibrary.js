'use client';

import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { 
  BarChart3, 
  Upload, 
  HardDrive, 
  Activity, 
  FolderTree, 
  Zap, 
  PieChart, 
  TrendingUp,
  Users,
  Calendar,
  Search,
  Filter
} from 'react-feather';

const WidgetLibrary = ({ onWidgetAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const widgetCategories = [
    { id: 'all', name: 'All Widgets', count: 12 },
    { id: 'analytics', name: 'Analytics', count: 4 },
    { id: 'content', name: 'Content', count: 3 },
    { id: 'actions', name: 'Actions', count: 2 },
    { id: 'navigation', name: 'Navigation', count: 3 }
  ];

  const availableWidgets = [
    {
      id: 'asset-stats',
      name: 'Asset Statistics',
      description: 'Display key asset metrics and counts',
      icon: BarChart3,
      category: 'analytics',
      size: { w: 4, h: 3 },
      preview: '/images/widgets/asset-stats.png'
    },
    {
      id: 'recent-uploads',
      name: 'Recent Uploads',
      description: 'Show recently uploaded assets',
      icon: Upload,
      category: 'content',
      size: { w: 6, h: 4 },
      preview: '/images/widgets/recent-uploads.png'
    },
    {
      id: 'storage-usage',
      name: 'Storage Usage',
      description: 'Visualize storage consumption',
      icon: HardDrive,
      category: 'analytics',
      size: { w: 4, h: 3 },
      preview: '/images/widgets/storage-usage.png'
    },
    {
      id: 'activity-feed',
      name: 'Activity Feed',
      description: 'Real-time activity updates',
      icon: Activity,
      category: 'content',
      size: { w: 4, h: 5 },
      preview: '/images/widgets/activity-feed.png'
    },
    {
      id: 'folder-tree',
      name: 'Folder Structure',
      description: 'Navigate folder hierarchy',
      icon: FolderTree,
      category: 'navigation',
      size: { w: 3, h: 6 },
      preview: '/images/widgets/folder-tree.png'
    },
    {
      id: 'quick-actions',
      name: 'Quick Actions',
      description: 'Common action buttons',
      icon: Zap,
      category: 'actions',
      size: { w: 4, h: 2 },
      preview: '/images/widgets/quick-actions.png'
    },
    {
      id: 'asset-distribution',
      name: 'Asset Distribution',
      description: 'Asset types breakdown chart',
      icon: PieChart,
      category: 'analytics',
      size: { w: 4, h: 4 },
      preview: '/images/widgets/asset-distribution.png'
    },
    {
      id: 'upload-trends',
      name: 'Upload Trends',
      description: 'Upload activity over time',
      icon: TrendingUp,
      category: 'analytics',
      size: { w: 6, h: 3 },
      preview: '/images/widgets/upload-trends.png'
    },
    {
      id: 'team-activity',
      name: 'Team Activity',
      description: 'Team member contributions',
      icon: Users,
      category: 'content',
      size: { w: 5, h: 4 },
      preview: '/images/widgets/team-activity.png'
    },
    {
      id: 'calendar-view',
      name: 'Calendar View',
      description: 'Asset timeline calendar',
      icon: Calendar,
      category: 'navigation',
      size: { w: 6, h: 4 },
      preview: '/images/widgets/calendar-view.png'
    },
    {
      id: 'search-widget',
      name: 'Advanced Search',
      description: 'Enhanced search interface',
      icon: Search,
      category: 'navigation',
      size: { w: 4, h: 2 },
      preview: '/images/widgets/search-widget.png'
    },
    {
      id: 'bulk-operations',
      name: 'Bulk Operations',
      description: 'Mass action controls',
      icon: Filter,
      category: 'actions',
      size: { w: 4, h: 3 },
      preview: '/images/widgets/bulk-operations.png'
    }
  ];

  const filteredWidgets = availableWidgets.filter(widget => {
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || widget.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Widget Library</h3>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="space-y-1">
          {widgetCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs text-gray-500">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Widget List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredWidgets.map(widget => (
          <DraggableWidget
            key={widget.id}
            widget={widget}
            onWidgetAdd={onWidgetAdd}
          />
        ))}
        
        {filteredWidgets.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Search size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No widgets found</p>
            <p className="text-sm">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DraggableWidget = ({ widget, onWidgetAdd }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'widget',
    item: { 
      type: 'widget',
      widgetType: widget.id,
      size: widget.size
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const IconComponent = widget.icon;

  return (
    <div
      ref={drag}
      className={`bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:shadow-md transition-all duration-200 ${
        isDragging ? 'opacity-50 rotate-2 scale-105' : ''
      }`}
      onClick={() => onWidgetAdd(widget.id)}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <IconComponent size={20} className="text-blue-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 mb-1">{widget.name}</h4>
          <p className="text-xs text-gray-600 mb-2">{widget.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {widget.size.w}×{widget.size.h}
            </span>
            <span className="text-xs text-blue-600 font-medium capitalize">
              {widget.category}
            </span>
          </div>
        </div>
      </div>
      
      {/* Drag Indicator */}
      <div className="mt-3 flex justify-center">
        <div className="flex space-x-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetLibrary;
