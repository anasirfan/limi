'use client';

import { useState } from 'react';
import { 
  FiActivity, 
  FiUsers, 
  FiEye, 
  FiEdit3,
  FiTrash2,
  FiUpload,
  FiDownload,
  FiLogIn,
  FiLogOut,
  FiSettings,
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiFilter,
  FiSearch,
  FiRefreshCw,
  FiTrendingUp,
  FiTrendingDown,
  FiBarChart,
  FiPieChart,
  FiMonitor,
  FiSmartphone,
  FiGlobe,
  FiMapPin,
  FiFileText,
  FiImage,
  FiVideo,
  FiMusic,
  FiArchive
} from 'react-icons/fi';

const activityData = {
  summary: {
    totalActivities: 15847,
    activeUsers: 342,
    criticalEvents: 23,
    systemUptime: '99.8%'
  },
  recentActivities: [
    {
      id: 1,
      type: 'user_login',
      user: 'Sarah Chen',
      action: 'User logged in',
      details: 'Login from Chrome on Windows',
      timestamp: '2 minutes ago',
      ip: '192.168.1.45',
      location: 'San Francisco, CA',
      severity: 'info'
    },
    {
      id: 2,
      type: 'file_upload',
      user: 'Mike Johnson',
      action: 'Uploaded file',
      details: 'campaign_video.mp4 (2.1 GB)',
      timestamp: '5 minutes ago',
      ip: '192.168.1.67',
      location: 'New York, NY',
      severity: 'info'
    },
    {
      id: 3,
      type: 'user_permission',
      user: 'Admin System',
      action: 'Permission changed',
      details: 'Emma Davis granted admin access',
      timestamp: '12 minutes ago',
      ip: '192.168.1.1',
      location: 'Server',
      severity: 'warning'
    },
    {
      id: 4,
      type: 'file_delete',
      user: 'Alex Rodriguez',
      action: 'Deleted file',
      details: 'old_presentation.pptx (45 MB)',
      timestamp: '18 minutes ago',
      ip: '192.168.1.89',
      location: 'Austin, TX',
      severity: 'warning'
    },
    {
      id: 5,
      type: 'system_error',
      user: 'System',
      action: 'Database connection error',
      details: 'Connection timeout after 30 seconds',
      timestamp: '25 minutes ago',
      ip: 'localhost',
      location: 'Server',
      severity: 'error'
    },
    {
      id: 6,
      type: 'user_logout',
      user: 'Lisa Wang',
      action: 'User logged out',
      details: 'Session ended normally',
      timestamp: '32 minutes ago',
      ip: '192.168.1.23',
      location: 'Seattle, WA',
      severity: 'info'
    }
  ],
  activityStats: {
    hourly: [
      { hour: '00:00', count: 45 },
      { hour: '01:00', count: 23 },
      { hour: '02:00', count: 12 },
      { hour: '03:00', count: 8 },
      { hour: '04:00', count: 15 },
      { hour: '05:00', count: 28 },
      { hour: '06:00', count: 67 },
      { hour: '07:00', count: 134 },
      { hour: '08:00', count: 289 },
      { hour: '09:00', count: 456 },
      { hour: '10:00', count: 523 },
      { hour: '11:00', count: 478 },
      { hour: '12:00', count: 345 },
      { hour: '13:00', count: 398 },
      { hour: '14:00', count: 467 },
      { hour: '15:00', count: 512 },
      { hour: '16:00', count: 445 },
      { hour: '17:00', count: 378 },
      { hour: '18:00', count: 234 },
      { hour: '19:00', count: 156 },
      { hour: '20:00', count: 89 },
      { hour: '21:00', count: 67 },
      { hour: '22:00', count: 45 },
      { hour: '23:00', count: 34 }
    ],
    byType: {
      user_login: { count: 2847, percentage: 18.0 },
      file_upload: { count: 2156, percentage: 13.6 },
      file_view: { count: 3245, percentage: 20.5 },
      file_edit: { count: 1876, percentage: 11.8 },
      file_delete: { count: 456, percentage: 2.9 },
      user_permission: { count: 234, percentage: 1.5 },
      system_error: { count: 123, percentage: 0.8 },
      user_logout: { count: 2910, percentage: 18.4 },
      settings_change: { count: 345, percentage: 2.2 },
      security_alert: { count: 89, percentage: 0.6 }
    }
  },
  topUsers: [
    { name: 'Sarah Chen', activities: 1247, department: 'Marketing' },
    { name: 'Mike Johnson', activities: 1089, department: 'Design' },
    { name: 'Emma Davis', activities: 987, department: 'Sales' },
    { name: 'Alex Rodriguez', activities: 876, department: 'Development' },
    { name: 'Lisa Wang', activities: 765, department: 'Operations' }
  ]
};

const activityTypes = {
  user_login: { icon: FiLogIn, color: 'text-green-600', bg: 'bg-green-100' },
  user_logout: { icon: FiLogOut, color: 'text-blue-600', bg: 'bg-blue-100' },
  file_upload: { icon: FiUpload, color: 'text-purple-600', bg: 'bg-purple-100' },
  file_download: { icon: FiDownload, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  file_view: { icon: FiEye, color: 'text-gray-600', bg: 'bg-gray-100' },
  file_edit: { icon: FiEdit3, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  file_delete: { icon: FiTrash2, color: 'text-red-600', bg: 'bg-red-100' },
  user_permission: { icon: FiShield, color: 'text-orange-600', bg: 'bg-orange-100' },
  settings_change: { icon: FiSettings, color: 'text-teal-600', bg: 'bg-teal-100' },
  system_error: { icon: FiAlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
  security_alert: { icon: FiAlertTriangle, color: 'text-red-600', bg: 'bg-red-100' }
};

export default function ActivityPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedActivityType, setSelectedActivityType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('recent');

  const getSeverityColor = (severity) => {
    const colors = {
      info: 'text-blue-600 bg-blue-100',
      warning: 'text-yellow-600 bg-yellow-100',
      error: 'text-red-600 bg-red-100',
      success: 'text-green-600 bg-green-100'
    };
    return colors[severity] || colors.info;
  };

  const getActivityIcon = (type) => {
    return activityTypes[type] || { icon: FiActivity, color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const tabs = [
    { id: 'recent', name: 'Recent Activity', icon: FiClock },
    { id: 'analytics', name: 'Analytics', icon: FiBarChart },
    { id: 'users', name: 'User Activity', icon: FiUsers },
    { id: 'system', name: 'System Events', icon: FiMonitor }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Activity Tracking</h2>
          <p className="text-sm text-gray-600 mt-1">
            Monitor system activities and user actions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            <option value="1h">Last hour</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <FiRefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Activities</p>
              <p className="text-2xl font-semibold text-gray-900">{formatNumber(activityData.summary.totalActivities)}</p>
            </div>
            <FiActivity className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">{formatNumber(activityData.summary.activeUsers)}</p>
            </div>
            <FiUsers className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Critical Events</p>
              <p className="text-2xl font-semibold text-gray-900">{formatNumber(activityData.summary.criticalEvents)}</p>
            </div>
            <FiAlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">System Uptime</p>
              <p className="text-2xl font-semibold text-gray-900">{activityData.summary.systemUptime}</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                placeholder="Search activities..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
            <select
              value={selectedActivityType}
              onChange={(e) => setSelectedActivityType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="all">All Types</option>
              <option value="user_login">User Login</option>
              <option value="file_upload">File Upload</option>
              <option value="file_view">File View</option>
              <option value="file_edit">File Edit</option>
              <option value="file_delete">File Delete</option>
              <option value="user_permission">Permission Change</option>
              <option value="system_error">System Error</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="all">All Severities</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <FiFilter className="w-4 h-4" />
              <span>Apply Filters</span>
            </button>
          </div>
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
      {activeTab === 'recent' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {activityData.recentActivities.map((activity) => {
              const activityConfig = getActivityIcon(activity.type);
              const IconComponent = activityConfig.icon;
              return (
                <div key={activity.id} className="px-6 py-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${activityConfig.bg}`}>
                      <IconComponent className={`w-4 h-4 ${activityConfig.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(activity.severity)}`}>
                            {activity.severity.charAt(0).toUpperCase() + activity.severity.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <FiUsers className="w-3 h-3" />
                          <span>{activity.user}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FiGlobe className="w-3 h-3" />
                          <span>{activity.ip}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FiMapPin className="w-3 h-3" />
                          <span>{activity.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity by Type */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Activity by Type</h3>
            <div className="space-y-4">
              {Object.entries(activityData.activityStats.byType).map(([type, data]) => {
                const activityConfig = getActivityIcon(type);
                const IconComponent = activityConfig.icon;
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-4 h-4 ${activityConfig.color}`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">{type.replace('_', ' ')}</p>
                        <p className="text-xs text-gray-500">{data.percentage}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatNumber(data.count)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Active Users */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Most Active Users</h3>
            <div className="space-y-4">
              {activityData.topUsers.map((user, index) => (
                <div key={user.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatNumber(user.activities)}</p>
                    <p className="text-xs text-gray-500">activities</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">User Activity Details</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activityData.topUsers.map((user) => (
                <div key={user.name} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiUsers className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.department}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Activities</span>
                      <span className="font-medium text-gray-900">{formatNumber(user.activities)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last Active</span>
                      <span className="font-medium text-gray-900">2 hours ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">System Events</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {activityData.recentActivities
              .filter(activity => activity.type === 'system_error' || activity.user === 'System' || activity.user === 'Admin System')
              .map((activity) => {
                const activityConfig = getActivityIcon(activity.type);
                const IconComponent = activityConfig.icon;
                return (
                  <div key={activity.id} className="px-6 py-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${activityConfig.bg}`}>
                        <IconComponent className={`w-4 h-4 ${activityConfig.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(activity.severity)}`}>
                              {activity.severity.charAt(0).toUpperCase() + activity.severity.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <FiMonitor className="w-3 h-3" />
                            <span>{activity.user}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FiGlobe className="w-3 h-3" />
                            <span>{activity.ip}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
