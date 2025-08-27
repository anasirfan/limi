'use client';

import { useState } from 'react';
import UserManagementDashboard from './components/UserManagementDashboard';
import RolePermissions from './components/RolePermissions';
import TeamManagement from './components/TeamManagement';
import UserActivity from './components/UserActivity';
import AccessControl from './components/AccessControl';

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'User Dashboard', icon: '👥' },
    { id: 'roles', label: 'Roles & Permissions', icon: '🔐' },
    { id: 'teams', label: 'Team Management', icon: '🏢' },
    { id: 'activity', label: 'User Activity', icon: '📊' },
    { id: 'access', label: 'Access Control', icon: '🛡️' }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <UserManagementDashboard />;
      case 'roles':
        return <RolePermissions />;
      case 'teams':
        return <TeamManagement />;
      case 'activity':
        return <UserActivity />;
      case 'access':
        return <AccessControl />;
      default:
        return <UserManagementDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage users, roles, permissions, and team access</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                Add User
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Export Users
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderActiveComponent()}
      </div>
    </div>
  );
}
