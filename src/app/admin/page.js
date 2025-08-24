'use client';

import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Link from 'next/link';
import { 
  FiUsers, 
  FiImage, 
  FiBarChart, 
  FiSettings,
  FiUserPlus,
  FiUpload,
  FiActivity,
  FiShield,
  FiTrendingUp,
  FiClock
} from 'react-icons/fi';

function AdminDashboard() {
  const { users } = useSelector(state => state.auth);
  const { assets } = useSelector(state => state.assets);

  const overviewCards = [
    {
      title: 'Total Users',
      value: users?.length || 0,
      icon: FiUsers,
      color: 'bg-blue-500',
      change: '+2 this week',
      href: '/admin/users'
    },
    {
      title: 'Total Assets',
      value: assets?.length || 0,
      icon: FiImage,
      color: 'bg-green-500',
      change: '+15 this week',
      href: '/admin/assets'
    },
    {
      title: 'Active Sessions',
      value: '12',
      icon: FiActivity,
      color: 'bg-purple-500',
      change: '+3 today',
      href: '/admin/analytics'
    },
    {
      title: 'Storage Used',
      value: '2.1 GB',
      icon: FiBarChart,
      color: 'bg-orange-500',
      change: '85% capacity',
      href: '/admin/settings'
    }
  ];

  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      icon: FiUserPlus,
      color: 'bg-blue-600',
      href: '/admin/users/add'
    },
    {
      title: 'Bulk Upload Assets',
      description: 'Upload multiple assets at once',
      icon: FiUpload,
      color: 'bg-green-600',
      href: '/admin/assets/upload'
    },
    {
      title: 'View Analytics',
      description: 'Check system usage statistics',
      icon: FiTrendingUp,
      color: 'bg-purple-600',
      href: '/admin/analytics'
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: FiSettings,
      color: 'bg-gray-600',
      href: '/admin/settings'
    }
  ];

  const recentActivity = [
    {
      user: 'Alex Thompson',
      action: 'uploaded 3 new assets',
      time: '2 minutes ago',
      type: 'upload'
    },
    {
      user: 'Sarah Rodriguez',
      action: 'created new user account',
      time: '15 minutes ago',
      type: 'user'
    },
    {
      user: 'David Chen',
      action: 'updated system settings',
      time: '1 hour ago',
      type: 'settings'
    },
    {
      user: 'Emma Wilson',
      action: 'approved 5 assets',
      time: '2 hours ago',
      type: 'approval'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-blue-100">
          Manage users, assets, and system settings from this central hub.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link
              key={index}
              href={card.href}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-sm text-green-600 mt-1">{card.change}</p>
                </div>
                <div className={`${card.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  href={action.href}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`${action.color} rounded-lg p-2`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'upload' ? 'bg-green-100' :
                    activity.type === 'user' ? 'bg-blue-100' :
                    activity.type === 'settings' ? 'bg-gray-100' :
                    'bg-purple-100'
                  }`}>
                    {activity.type === 'upload' && <FiUpload className="w-4 h-4 text-green-600" />}
                    {activity.type === 'user' && <FiUsers className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'settings' && <FiSettings className="w-4 h-4 text-gray-600" />}
                    {activity.type === 'approval' && <FiShield className="w-4 h-4 text-purple-600" />}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <div className="flex items-center mt-1">
                    <FiClock className="w-3 h-3 text-gray-400 mr-1" />
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/admin/analytics/activity"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all activity →
            </Link>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm font-medium text-gray-900">Server Status</p>
            <p className="text-xs text-green-600">Online</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiBarChart className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Database</p>
            <p className="text-xs text-blue-600">Healthy</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiActivity className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Performance</p>
            <p className="text-xs text-orange-600">Good</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Provider store={store}>
      <AdminDashboard />
    </Provider>
  );
}
