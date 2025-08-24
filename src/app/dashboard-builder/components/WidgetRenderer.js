'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Upload, 
  HardDrive, 
  Activity, 
  Folder, 
  Zap,
  TrendingUp,
  Users,
  Clock,
  FileText,
  Image,
  Video,
  Music,
  Archive
} from 'react-feather';

const WidgetRenderer = ({ widget }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setData(generateMockData(widget.type));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [widget.type]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderWidget = () => {
    switch (widget.type) {
      case 'asset-stats':
        return <AssetStatsWidget config={widget.config} data={data} />;
      case 'recent-uploads':
        return <RecentUploadsWidget config={widget.config} data={data} />;
      case 'storage-usage':
        return <StorageUsageWidget config={widget.config} data={data} />;
      case 'activity-feed':
        return <ActivityFeedWidget config={widget.config} data={data} />;
      case 'folder-tree':
        return <FolderTreeWidget config={widget.config} data={data} />;
      case 'quick-actions':
        return <QuickActionsWidget config={widget.config} data={data} />;
      default:
        return <div className="text-gray-500">Unknown widget type: {widget.type}</div>;
    }
  };

  return (
    <div className="h-full">
      {widget.config.showTitle && (
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{widget.config.title}</h3>
        </div>
      )}
      <div className="h-full">
        {renderWidget()}
      </div>
    </div>
  );
};

const AssetStatsWidget = ({ config, data }) => {
  const stats = [
    { label: 'Total Assets', value: data.totalAssets, icon: FileText, color: 'blue' },
    { label: 'Images', value: data.images, icon: Image, color: 'green' },
    { label: 'Videos', value: data.videos, icon: Video, color: 'purple' },
    { label: 'Documents', value: data.documents, icon: FileText, color: 'orange' }
  ];

  if (config.displayMode === 'cards') {
    return (
      <div className="grid grid-cols-2 gap-3 h-full">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center">
            <div className={`p-2 rounded-lg bg-${stat.color}-100 mr-3`}>
              <stat.icon size={20} className={`text-${stat.color}-600`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center">
            <stat.icon size={16} className="text-gray-600 mr-2" />
            <span className="text-gray-700">{stat.label}</span>
          </div>
          <span className="font-semibold text-gray-900">{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

const RecentUploadsWidget = ({ config, data }) => {
  return (
    <div className="space-y-3 h-full overflow-y-auto">
      {data.uploads.slice(0, config.itemCount).map((upload, index) => (
        <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
          {config.showThumbnails && (
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
              {getFileIcon(upload.type)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{upload.name}</p>
            <p className="text-xs text-gray-500">{upload.size} • {upload.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const StorageUsageWidget = ({ config, data }) => {
  const percentage = Math.round((data.used / data.total) * 100);
  
  if (config.chartType === 'donut') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{percentage}%</div>
              <div className="text-xs text-gray-500">Used</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Storage Used</span>
        <span className="font-medium">{data.used}GB / {data.total}GB</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {config.showPercentage && (
        <div className="text-center text-2xl font-bold text-gray-900">{percentage}%</div>
      )}
    </div>
  );
};

const ActivityFeedWidget = ({ config, data }) => {
  return (
    <div className="space-y-3 h-full overflow-y-auto">
      {data.activities.slice(0, config.itemCount).map((activity, index) => (
        <div key={index} className="flex items-start space-x-3">
          {config.showAvatars && (
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-blue-600">
                {activity.user.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{activity.user}</span> {activity.action}
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const FolderTreeWidget = ({ config, data }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set(config.expandedByDefault ? ['/'] : []));

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFolder = (folder, level = 0) => (
    <div key={folder.path}>
      <div 
        className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-50 rounded cursor-pointer"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => toggleFolder(folder.path)}
      >
        <Folder size={14} className="text-gray-600" />
        <span className="text-sm text-gray-700 flex-1">{folder.name}</span>
        {config.showCounts && (
          <span className="text-xs text-gray-500">{folder.count}</span>
        )}
      </div>
      {expandedFolders.has(folder.path) && folder.children && (
        <div>
          {folder.children.map(child => renderFolder(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full overflow-y-auto">
      {data.folders.map(folder => renderFolder(folder))}
    </div>
  );
};

const QuickActionsWidget = ({ config, data }) => {
  const actions = [
    { id: 'upload', label: 'Upload Files', icon: Upload, color: 'blue' },
    { id: 'create-folder', label: 'New Folder', icon: Folder, color: 'green' },
    { id: 'bulk-download', label: 'Bulk Download', icon: Archive, color: 'purple' }
  ].filter(action => config.actions.includes(action.id));

  if (config.layout === 'grid') {
    return (
      <div className="grid grid-cols-1 gap-3 h-full">
        {actions.map(action => (
          <button
            key={action.id}
            className={`flex items-center justify-center space-x-2 p-3 bg-${action.color}-50 hover:bg-${action.color}-100 rounded-lg transition-colors`}
          >
            <action.icon size={18} className={`text-${action.color}-600`} />
            <span className={`text-sm font-medium text-${action.color}-700`}>{action.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {actions.map(action => (
        <button
          key={action.id}
          className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <action.icon size={16} className="text-gray-600" />
          <span className="text-sm text-gray-700">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

const getFileIcon = (type) => {
  switch (type) {
    case 'image': return <Image size={16} className="text-green-600" />;
    case 'video': return <Video size={16} className="text-purple-600" />;
    case 'audio': return <Music size={16} className="text-blue-600" />;
    default: return <FileText size={16} className="text-gray-600" />;
  }
};

const generateMockData = (type) => {
  switch (type) {
    case 'asset-stats':
      return {
        totalAssets: 1247,
        images: 856,
        videos: 234,
        documents: 157
      };
    
    case 'recent-uploads':
      return {
        uploads: [
          { name: 'hero-banner.jpg', size: '2.4 MB', time: '2 min ago', type: 'image' },
          { name: 'product-demo.mp4', size: '15.7 MB', time: '5 min ago', type: 'video' },
          { name: 'brand-guidelines.pdf', size: '1.2 MB', time: '12 min ago', type: 'document' },
          { name: 'logo-variants.zip', size: '3.8 MB', time: '18 min ago', type: 'archive' },
          { name: 'testimonial-audio.mp3', size: '5.1 MB', time: '25 min ago', type: 'audio' }
        ]
      };
    
    case 'storage-usage':
      return {
        used: 47.3,
        total: 100
      };
    
    case 'activity-feed':
      return {
        activities: [
          { user: 'Sarah Chen', action: 'uploaded 3 new images', time: '2 min ago' },
          { user: 'Mike Johnson', action: 'created folder "Q1 Campaign"', time: '8 min ago' },
          { user: 'Emma Davis', action: 'shared folder with team', time: '15 min ago' },
          { user: 'Alex Rodriguez', action: 'deleted 5 old files', time: '22 min ago' },
          { user: 'Lisa Wang', action: 'updated brand guidelines', time: '1 hour ago' }
        ]
      };
    
    case 'folder-tree':
      return {
        folders: [
          {
            name: 'Assets',
            path: '/assets',
            count: 234,
            children: [
              { name: 'Images', path: '/assets/images', count: 156 },
              { name: 'Videos', path: '/assets/videos', count: 45 },
              { name: 'Documents', path: '/assets/documents', count: 33 }
            ]
          },
          {
            name: 'Campaigns',
            path: '/campaigns',
            count: 89,
            children: [
              { name: '2024 Q1', path: '/campaigns/2024-q1', count: 45 },
              { name: '2024 Q2', path: '/campaigns/2024-q2', count: 44 }
            ]
          }
        ]
      };
    
    default:
      return {};
  }
};

export default WidgetRenderer;
