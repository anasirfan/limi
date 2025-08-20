'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { 
  FiSettings, 
  FiShield, 
  FiDatabase, 
  FiKey,
  FiSave,
  FiRefreshCw,
  FiToggleLeft,
  FiToggleRight,
  FiCopy,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';

function SystemSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  
  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'storage', label: 'Storage', icon: FiDatabase },
    { id: 'api', label: 'API', icon: FiKey }
  ];

  const [settings, setSettings] = useState({
    general: {
      siteName: 'LIMI Asset Management',
      timezone: 'UTC',
      maintenanceMode: false,
      emailNotifications: true
    },
    security: {
      sessionTimeout: 480,
      passwordMinLength: 8,
      maxLoginAttempts: 5,
      twoFactorAuth: false
    },
    storage: {
      maxFileSize: 100,
      storageQuota: 10,
      autoCleanup: true,
      compressionEnabled: true
    },
    api: {
      apiKey: 'sk-limi-7f8e9d0a1b2c3e4f5g6h7i8j9k0l1m2n',
      rateLimitEnabled: true,
      corsEnabled: true
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], [key]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system preferences and security</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <FiSave className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">General Configuration</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Maintenance Mode</label>
                    <p className="text-sm text-gray-500">Temporarily disable access</p>
                  </div>
                  <button onClick={() => handleSettingChange('general', 'maintenanceMode', !settings.general.maintenanceMode)}>
                    {settings.general.maintenanceMode ? 
                      <FiToggleRight className="w-8 h-8 text-blue-600" /> : 
                      <FiToggleLeft className="w-8 h-8 text-gray-400" />
                    }
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Security Configuration</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (min)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
                  <input
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Storage Management</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
                  <input
                    type="number"
                    value={settings.storage.maxFileSize}
                    onChange={(e) => handleSettingChange('storage', 'maxFileSize', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Storage Quota (GB)</label>
                  <input
                    type="number"
                    value={settings.storage.storageQuota}
                    onChange={(e) => handleSettingChange('storage', 'storageQuota', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Storage Usage</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span>Used: 2.1 GB of 10 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '21%' }}></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">API Configuration</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <div className="flex space-x-2">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={settings.api.apiKey}
                    readOnly
                    className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {showApiKey ? <FiEyeOff className="w-4 h-4 text-gray-900" /> : <FiEye className="w-4 h-4 text-gray-900" />}
                  </button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <FiRefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-900">Rate Limiting</label>
                    <p className="text-sm text-gray-500">Enable API rate limiting</p>
                  </div>
                  <button onClick={() => handleSettingChange('api', 'rateLimitEnabled', !settings.api.rateLimitEnabled)}>
                    {settings.api.rateLimitEnabled ? 
                      <FiToggleRight className="w-8 h-8 text-blue-600" /> : 
                      <FiToggleLeft className="w-8 h-8 text-gray-400" />
                    }
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Provider store={store}>
      <SystemSettings />
    </Provider>
  );
}
