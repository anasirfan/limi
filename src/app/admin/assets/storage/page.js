'use client';

import { useState } from 'react';
import { 
  FiHardDrive, 
  FiPieChart, 
  FiTrendingUp, 
  FiFolder,
  FiFile,
  FiTrash2,
  FiDownload,
  FiSettings,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiImage,
  FiVideo,
  FiMusic,
  FiArchive,
  FiRefreshCw,
  FiFilter,
  FiSearch,
  FiMoreVertical,
  FiEdit3,
  FiEye,
  FiShare2
} from 'react-icons/fi';

const storageData = {
  total: 1000, // GB
  used: 650, // GB
  available: 350, // GB
  usageByType: {
    images: { size: 280, count: 15420, color: 'bg-blue-500' },
    videos: { size: 220, count: 1250, color: 'bg-purple-500' },
    documents: { size: 95, count: 8930, color: 'bg-green-500' },
    audio: { size: 35, count: 2100, color: 'bg-yellow-500' },
    archives: { size: 20, count: 450, color: 'bg-gray-500' }
  },
  usageByDepartment: {
    marketing: { size: 185, percentage: 28.5 },
    design: { size: 165, percentage: 25.4 },
    sales: { size: 120, percentage: 18.5 },
    development: { size: 95, percentage: 14.6 },
    operations: { size: 85, percentage: 13.0 }
  },
  recentActivity: [
    { id: 1, action: 'upload', user: 'Sarah Chen', file: 'campaign_video.mp4', size: '2.1 GB', time: '2 hours ago', type: 'video' },
    { id: 2, action: 'delete', user: 'Mike Johnson', file: 'old_presentation.pptx', size: '45 MB', time: '4 hours ago', type: 'document' },
    { id: 3, action: 'upload', user: 'Emma Davis', file: 'product_photos.zip', size: '890 MB', time: '6 hours ago', type: 'archive' },
    { id: 4, action: 'download', user: 'Alex Rodriguez', file: 'brand_guidelines.pdf', size: '12 MB', time: '8 hours ago', type: 'document' },
    { id: 5, action: 'upload', user: 'Lisa Wang', file: 'podcast_episode_12.mp3', size: '156 MB', time: '1 day ago', type: 'audio' }
  ]
};

const largeFiles = [
  { id: 1, name: 'Q4_presentation_final.pptx', size: '2.8 GB', type: 'document', lastAccessed: '2 weeks ago', owner: 'Marketing Team' },
  { id: 2, name: 'product_demo_4k.mp4', size: '2.3 GB', type: 'video', lastAccessed: '1 month ago', owner: 'Design Team' },
  { id: 3, name: 'company_event_photos.zip', size: '1.9 GB', type: 'archive', lastAccessed: '3 weeks ago', owner: 'HR Team' },
  { id: 4, name: 'backup_assets_2023.zip', size: '1.7 GB', type: 'archive', lastAccessed: '2 months ago', owner: 'IT Team' },
  { id: 5, name: 'training_video_series.mp4', size: '1.5 GB', type: 'video', lastAccessed: '1 week ago', owner: 'Operations Team' }
];

const duplicateFiles = [
  { id: 1, name: 'logo_final.png', copies: 8, totalSize: '24 MB', locations: ['Marketing', 'Design', 'Sales'] },
  { id: 2, name: 'company_profile.pdf', copies: 5, totalSize: '45 MB', locations: ['Sales', 'Marketing'] },
  { id: 3, name: 'product_sheet.docx', copies: 12, totalSize: '36 MB', locations: ['Sales', 'Marketing', 'Operations'] },
  { id: 4, name: 'team_photo.jpg', copies: 6, totalSize: '18 MB', locations: ['HR', 'Marketing'] }
];

export default function StoragePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const formatSize = (gb) => {
    if (gb >= 1000) return `${(gb / 1000).toFixed(1)} TB`;
    return `${gb} GB`;
  };

  const getUsagePercentage = () => {
    return (storageData.used / storageData.total) * 100;
  };

  const getTypeIcon = (type) => {
    const icons = {
      image: FiImage,
      video: FiVideo,
      document: FiFile,
      audio: FiMusic,
      archive: FiArchive
    };
    return icons[type] || FiFile;
  };

  const getActionIcon = (action) => {
    const icons = {
      upload: FiTrendingUp,
      download: FiDownload,
      delete: FiTrash2
    };
    return icons[action] || FiFile;
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FiPieChart },
    { id: 'usage', name: 'Usage Analytics', icon: FiTrendingUp },
    { id: 'cleanup', name: 'Storage Cleanup', icon: FiTrash2 },
    { id: 'settings', name: 'Storage Settings', icon: FiSettings }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Storage Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Monitor and optimize your storage usage
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <FiRefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Storage Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Storage</p>
              <p className="text-2xl font-semibold text-gray-900">{formatSize(storageData.total)}</p>
            </div>
            <FiHardDrive className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Used Storage</p>
              <p className="text-2xl font-semibold text-gray-900">{formatSize(storageData.used)}</p>
              <p className="text-xs text-gray-500">{getUsagePercentage().toFixed(1)}% of total</p>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              getUsagePercentage() > 90 ? 'bg-red-100' : getUsagePercentage() > 75 ? 'bg-yellow-100' : 'bg-green-100'
            }`}>
              {getUsagePercentage() > 90 ? (
                <FiAlertTriangle className="w-4 h-4 text-red-600" />
              ) : (
                <FiCheckCircle className="w-4 h-4 text-green-600" />
              )}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Available</p>
              <p className="text-2xl font-semibold text-gray-900">{formatSize(storageData.available)}</p>
            </div>
            <FiFolder className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Files</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.values(storageData.usageByType).reduce((sum, type) => sum + type.count, 0).toLocaleString()}
              </p>
            </div>
            <FiFile className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Storage Usage Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Storage Usage</h3>
          <span className={`text-sm font-medium ${
            getUsagePercentage() > 90 ? 'text-red-600' : getUsagePercentage() > 75 ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {getUsagePercentage().toFixed(1)}% Used
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className={`h-4 rounded-full transition-all duration-300 ${
              getUsagePercentage() > 90 ? 'bg-red-500' : getUsagePercentage() > 75 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${getUsagePercentage()}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatSize(storageData.used)} used</span>
          <span>{formatSize(storageData.available)} available</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usage by File Type */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Usage by File Type</h3>
            <div className="space-y-4">
              {Object.entries(storageData.usageByType).map(([type, data]) => {
                const IconComponent = getTypeIcon(type);
                const percentage = (data.size / storageData.used) * 100;
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">{type}</p>
                        <p className="text-xs text-gray-500">{data.count.toLocaleString()} files</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{data.size} GB</p>
                      <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Usage by Department */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Usage by Department</h3>
            <div className="space-y-4">
              {Object.entries(storageData.usageByDepartment).map(([dept, data]) => (
                <div key={dept} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FiUsers className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">{dept}</p>
                      <p className="text-xs text-gray-500">{data.percentage}% of total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{data.size} GB</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Storage Activity</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {storageData.recentActivity.map((activity) => {
                const ActionIcon = getActionIcon(activity.action);
                const TypeIcon = getTypeIcon(activity.type);
                return (
                  <div key={activity.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        activity.action === 'upload' ? 'bg-green-100' :
                        activity.action === 'delete' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        <ActionIcon className={`w-4 h-4 ${
                          activity.action === 'upload' ? 'text-green-600' :
                          activity.action === 'delete' ? 'text-red-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user} {activity.action}ed {activity.file}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <TypeIcon className="w-3 h-3" />
                          <span>{activity.size}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cleanup' && (
        <div className="space-y-6">
          {/* Large Files */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Large Files</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="divide-y divide-gray-200">
              {largeFiles.map((file) => {
                const TypeIcon = getTypeIcon(file.type);
                return (
                  <div key={file.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <TypeIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {file.size} • Last accessed {file.lastAccessed} • {file.owner}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Duplicate Files */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Duplicate Files</h3>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                Clean All Duplicates
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {duplicateFiles.map((file) => (
                <div key={file.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FiFile className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {file.copies} copies • {file.totalSize} total • Found in: {file.locations.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs hover:bg-yellow-200">
                      Keep 1
                    </button>
                    <button className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200">
                      Delete All
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Storage Quotas */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Department Storage Quotas</h3>
            <div className="space-y-4">
              {Object.entries(storageData.usageByDepartment).map(([dept, data]) => (
                <div key={dept} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-gray-900 capitalize">{dept}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{data.size} GB / 200 GB</p>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(data.size / 200) * 100}%` }}
                        />
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-cleanup Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Auto-cleanup Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Delete files older than</p>
                  <p className="text-xs text-gray-500">Automatically remove unused files</p>
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black">
                  <option value="never">Never</option>
                  <option value="1y">1 year</option>
                  <option value="2y">2 years</option>
                  <option value="3y">3 years</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Remove duplicates automatically</p>
                  <p className="text-xs text-gray-500">Keep only the most recent version</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Compress large files</p>
                  <p className="text-xs text-gray-500">Automatically compress files over 100MB</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
