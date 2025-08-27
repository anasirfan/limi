'use client';

import { useState, useEffect } from 'react';
import { FiActivity, FiUser, FiClock, FiFilter, FiDownload, FiSearch, FiCalendar, FiEye, FiEdit, FiTrash2, FiUpload, FiLogIn, FiLogOut } from 'react-icons/fi';

export default function UserActivity() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'Sarah Johnson', avatar: 'SJ' },
      { id: 2, name: 'Michael Chen', avatar: 'MC' },
      { id: 3, name: 'Emily Rodriguez', avatar: 'ER' },
      { id: 4, name: 'David Kim', avatar: 'DK' },
      { id: 5, name: 'Lisa Thompson', avatar: 'LT' }
    ];

    const mockActivities = [
      {
        id: 1,
        userId: 1,
        userName: 'Sarah Johnson',
        userAvatar: 'SJ',
        action: 'login',
        actionLabel: 'Logged In',
        description: 'User logged into the system',
        timestamp: '2024-01-15T10:30:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome 120.0.0.0',
        resource: 'Authentication',
        details: { location: 'New York, NY', device: 'Desktop' }
      },
      {
        id: 2,
        userId: 2,
        userName: 'Michael Chen',
        userAvatar: 'MC',
        action: 'asset_upload',
        actionLabel: 'Uploaded Asset',
        description: 'Uploaded 5 images to /assets/products folder',
        timestamp: '2024-01-15T09:45:00Z',
        ipAddress: '192.168.1.101',
        userAgent: 'Chrome 120.0.0.0',
        resource: 'Assets',
        details: { fileCount: 5, totalSize: '12.5 MB', folder: '/assets/products' }
      },
      {
        id: 3,
        userId: 3,
        userName: 'Emily Rodriguez',
        userAvatar: 'ER',
        action: 'workflow_create',
        actionLabel: 'Created Workflow',
        description: 'Created new approval workflow "Marketing Review Process"',
        timestamp: '2024-01-15T08:20:00Z',
        ipAddress: '192.168.1.102',
        userAgent: 'Safari 17.0',
        resource: 'Workflows',
        details: { workflowName: 'Marketing Review Process', stages: 3 }
      },
      {
        id: 4,
        userId: 4,
        userName: 'David Kim',
        userAvatar: 'DK',
        action: 'user_edit',
        actionLabel: 'Updated Profile',
        description: 'Updated user profile information',
        timestamp: '2024-01-14T16:15:00Z',
        ipAddress: '192.168.1.103',
        userAgent: 'Firefox 121.0',
        resource: 'User Management',
        details: { fieldsChanged: ['phone', 'department'] }
      },
      {
        id: 5,
        userId: 5,
        userName: 'Lisa Thompson',
        userAvatar: 'LT',
        action: 'asset_delete',
        actionLabel: 'Deleted Asset',
        description: 'Deleted asset "old-logo.png" from /assets/branding',
        timestamp: '2024-01-14T14:30:00Z',
        ipAddress: '192.168.1.104',
        userAgent: 'Chrome 120.0.0.0',
        resource: 'Assets',
        details: { fileName: 'old-logo.png', folder: '/assets/branding' }
      },
      {
        id: 6,
        userId: 1,
        userName: 'Sarah Johnson',
        userAvatar: 'SJ',
        action: 'role_change',
        actionLabel: 'Role Changed',
        description: 'Role changed from Manager to Admin',
        timestamp: '2024-01-14T11:00:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome 120.0.0.0',
        resource: 'User Management',
        details: { previousRole: 'Manager', newRole: 'Admin' }
      },
      {
        id: 7,
        userId: 2,
        userName: 'Michael Chen',
        userAvatar: 'MC',
        action: 'dashboard_view',
        actionLabel: 'Viewed Dashboard',
        description: 'Accessed analytics dashboard',
        timestamp: '2024-01-14T09:30:00Z',
        ipAddress: '192.168.1.101',
        userAgent: 'Chrome 120.0.0.0',
        resource: 'Dashboard',
        details: { dashboardType: 'Analytics', duration: '15 minutes' }
      },
      {
        id: 8,
        userId: 3,
        userName: 'Emily Rodriguez',
        userAvatar: 'ER',
        action: 'logout',
        actionLabel: 'Logged Out',
        description: 'User logged out of the system',
        timestamp: '2024-01-13T18:00:00Z',
        ipAddress: '192.168.1.102',
        userAgent: 'Safari 17.0',
        resource: 'Authentication',
        details: { sessionDuration: '8 hours 40 minutes' }
      }
    ];

    setUsers(mockUsers);
    setActivities(mockActivities);
    setFilteredActivities(mockActivities);
  }, []);

  // Filter activities
  useEffect(() => {
    let filtered = activities;

    if (searchTerm) {
      filtered = filtered.filter(activity => 
        activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.resource.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterUser !== 'all') {
      filtered = filtered.filter(activity => activity.userId === parseInt(filterUser));
    }

    if (filterAction !== 'all') {
      filtered = filtered.filter(activity => activity.action === filterAction);
    }

    if (filterDate !== 'all') {
      const now = new Date();
      const activityDate = new Date();
      
      switch (filterDate) {
        case 'today':
          filtered = filtered.filter(activity => {
            const date = new Date(activity.timestamp);
            return date.toDateString() === now.toDateString();
          });
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(activity => {
            const date = new Date(activity.timestamp);
            return date >= weekAgo;
          });
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(activity => {
            const date = new Date(activity.timestamp);
            return date >= monthAgo;
          });
          break;
      }
    }

    setFilteredActivities(filtered);
  }, [activities, searchTerm, filterUser, filterAction, filterDate]);

  const getActionIcon = (action) => {
    switch (action) {
      case 'login': return <FiLogIn className="w-4 h-4" />;
      case 'logout': return <FiLogOut className="w-4 h-4" />;
      case 'asset_upload': return <FiUpload className="w-4 h-4" />;
      case 'asset_delete': return <FiTrash2 className="w-4 h-4" />;
      case 'asset_edit': return <FiEdit className="w-4 h-4" />;
      case 'workflow_create': return <FiActivity className="w-4 h-4" />;
      case 'user_edit': return <FiUser className="w-4 h-4" />;
      case 'role_change': return <FiUser className="w-4 h-4" />;
      case 'dashboard_view': return <FiEye className="w-4 h-4" />;
      default: return <FiActivity className="w-4 h-4" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'login': return 'text-green-600 bg-green-100';
      case 'logout': return 'text-gray-600 bg-gray-100';
      case 'asset_upload': return 'text-blue-600 bg-blue-100';
      case 'asset_delete': return 'text-red-600 bg-red-100';
      case 'asset_edit': return 'text-yellow-600 bg-yellow-100';
      case 'workflow_create': return 'text-purple-600 bg-purple-100';
      case 'user_edit': return 'text-indigo-600 bg-indigo-100';
      case 'role_change': return 'text-orange-600 bg-orange-100';
      case 'dashboard_view': return 'text-emerald-600 bg-emerald-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
  };

  const exportActivities = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Description', 'Resource', 'IP Address'].join(','),
      ...filteredActivities.map(activity => [
        activity.timestamp,
        activity.userName,
        activity.actionLabel,
        activity.description,
        activity.resource,
        activity.ipAddress
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-activity-log.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiActivity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiUser className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiClock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Activities</p>
              <p className="text-2xl font-bold text-gray-900">
                {activities.filter(a => {
                  const date = new Date(a.timestamp);
                  const today = new Date();
                  return date.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <FiFilter className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Filtered Results</p>
              <p className="text-2xl font-bold text-gray-900">{filteredActivities.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Users</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Actions</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="asset_upload">Asset Upload</option>
              <option value="asset_delete">Asset Delete</option>
              <option value="workflow_create">Workflow Create</option>
              <option value="user_edit">User Edit</option>
              <option value="role_change">Role Change</option>
            </select>

            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <button
              onClick={exportActivities}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
            >
              <FiDownload className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
          <p className="text-sm text-gray-600 mt-1">Track all user actions and system events</p>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-emerald-700">{activity.userAvatar}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">{activity.userName}</p>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionColor(activity.action)}`}>
                        {getActionIcon(activity.action)}
                        <span className="ml-1">{activity.actionLabel}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiClock className="w-4 h-4 mr-1" />
                      {formatTimestamp(activity.timestamp)}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>

                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    <span>Resource: {activity.resource}</span>
                    <span>IP: {activity.ipAddress}</span>
                    <span>Agent: {activity.userAgent}</span>
                  </div>

                  {activity.details && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                      <strong>Details:</strong> {JSON.stringify(activity.details, null, 2)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="p-12 text-center">
            <FiActivity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No activities found matching your filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="bg-white px-6 py-3 border border-gray-200 rounded-lg flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {filteredActivities.length} of {activities.length} activities
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 bg-emerald-600 text-white rounded text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
