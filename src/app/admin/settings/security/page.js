'use client';

import { useState } from 'react';
import { 
  FiShield, 
  FiLock, 
  FiUnlock,
  FiKey,
  FiEye,
  FiEyeOff,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiMonitor,
  FiSettings,
  FiRefreshCw,
  FiSave,
  FiEdit3,
  FiTrash2,
  FiPlus,
  FiFilter,
  FiSearch,
  FiDownload,
  FiUpload,
  FiGlobe,
  FiSmartphone,
  FiMapPin
} from 'react-icons/fi';

const securitySettings = {
  authentication: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      passwordExpiry: 90,
      preventReuse: 5
    },
    twoFactorAuth: {
      enabled: true,
      required: false,
      methods: ['app', 'sms', 'email']
    },
    sessionManagement: {
      sessionTimeout: 30,
      maxConcurrentSessions: 3,
      rememberMe: true,
      forceLogoutInactive: true
    }
  },
  accessControl: {
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    geoRestrictions: {
      enabled: false,
      allowedCountries: ['US', 'CA', 'GB']
    },
    deviceTrust: {
      enabled: true,
      requireApproval: true,
      trustDuration: 30
    }
  },
  auditLogs: [
    {
      id: 1,
      event: 'Failed Login Attempt',
      user: 'unknown@example.com',
      ip: '203.0.113.45',
      location: 'Unknown Location',
      timestamp: '2 minutes ago',
      severity: 'warning'
    },
    {
      id: 2,
      event: 'Password Changed',
      user: 'sarah.chen@company.com',
      ip: '192.168.1.45',
      location: 'San Francisco, CA',
      timestamp: '15 minutes ago',
      severity: 'info'
    },
    {
      id: 3,
      event: 'Admin Access Granted',
      user: 'admin@company.com',
      ip: '192.168.1.1',
      location: 'Server',
      timestamp: '1 hour ago',
      severity: 'critical'
    },
    {
      id: 4,
      event: 'Suspicious Activity Detected',
      user: 'multiple_users',
      ip: '198.51.100.23',
      location: 'Unknown Location',
      timestamp: '2 hours ago',
      severity: 'error'
    }
  ],
  threats: {
    blockedIPs: 23,
    suspiciousLogins: 12,
    malwareAttempts: 3,
    bruteForceAttempts: 8
  }
};

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState('authentication');
  const [settings, setSettings] = useState(securitySettings);
  const [showPasswords, setShowPasswords] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(false);

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const getSeverityColor = (severity) => {
    const colors = {
      info: 'text-blue-600 bg-blue-100',
      warning: 'text-yellow-600 bg-yellow-100',
      error: 'text-red-600 bg-red-100',
      critical: 'text-purple-600 bg-purple-100'
    };
    return colors[severity] || colors.info;
  };

  const tabs = [
    { id: 'authentication', name: 'Authentication', icon: FiLock },
    { id: 'access', name: 'Access Control', icon: FiShield },
    { id: 'audit', name: 'Audit Logs', icon: FiMonitor },
    { id: 'threats', name: 'Threat Detection', icon: FiAlertTriangle }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
          <p className="text-sm text-gray-600 mt-1">
            Configure authentication, access control, and security policies
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <FiSave className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Security Score</p>
              <p className="text-2xl font-semibold text-green-600">85%</p>
            </div>
            <FiShield className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Sessions</p>
              <p className="text-2xl font-semibold text-gray-900">127</p>
            </div>
            <FiUsers className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Blocked Threats</p>
              <p className="text-2xl font-semibold text-red-600">{settings.threats.blockedIPs}</p>
            </div>
            <FiAlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">2FA Enabled</p>
              <p className="text-2xl font-semibold text-green-600">78%</p>
            </div>
            <FiKey className="w-8 h-8 text-green-600" />
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
      {activeTab === 'authentication' && (
        <div className="space-y-6">
          {/* Password Policy */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Password Policy</h3>
              <button
                onClick={() => setEditingPolicy(!editingPolicy)}
                className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <FiEdit3 className="w-4 h-4" />
                <span>{editingPolicy ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
                <input
                  type="number"
                  value={settings.authentication.passwordPolicy.minLength}
                  disabled={!editingPolicy}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                <input
                  type="number"
                  value={settings.authentication.passwordPolicy.passwordExpiry}
                  disabled={!editingPolicy}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black disabled:bg-gray-50"
                />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { key: 'requireUppercase', label: 'Require uppercase letters' },
                { key: 'requireLowercase', label: 'Require lowercase letters' },
                { key: 'requireNumbers', label: 'Require numbers' },
                { key: 'requireSpecialChars', label: 'Require special characters' }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.authentication.passwordPolicy[key]}
                      disabled={!editingPolicy}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Enable 2FA</p>
                  <p className="text-xs text-gray-500">Allow users to enable two-factor authentication</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.authentication.twoFactorAuth.enabled}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Require 2FA</p>
                  <p className="text-xs text-gray-500">Make two-factor authentication mandatory</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.authentication.twoFactorAuth.required}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Session Management */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Session Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.authentication.sessionManagement.sessionTimeout}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Sessions</label>
                <input
                  type="number"
                  value={settings.authentication.sessionManagement.maxConcurrentSessions}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'access' && (
        <div className="space-y-6">
          {/* IP Whitelist */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">IP Whitelist</h3>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center space-x-1">
                <FiPlus className="w-3 h-3" />
                <span>Add IP</span>
              </button>
            </div>
            <div className="space-y-2">
              {settings.accessControl.ipWhitelist.map((ip, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-mono text-gray-900">{ip}</span>
                  <button className="text-red-600 hover:text-red-700">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Restrictions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Geographic Restrictions</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Enable geo-restrictions</p>
                <p className="text-xs text-gray-500">Restrict access based on geographic location</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.accessControl.geoRestrictions.enabled}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {settings.accessControl.geoRestrictions.enabled && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Countries</label>
                <select
                  multiple
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  size="4"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Security Audit Logs</h3>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                <FiDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="text-gray-600 hover:text-gray-700">
                <FiRefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {settings.auditLogs.map((log) => (
              <div key={log.id} className="px-6 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">{log.event}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(log.severity)}`}>
                        {log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <FiUsers className="w-3 h-3" />
                        <span>{log.user}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FiGlobe className="w-3 h-3" />
                        <span>{log.ip}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FiMapPin className="w-3 h-3" />
                        <span>{log.location}</span>
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'threats' && (
        <div className="space-y-6">
          {/* Threat Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-red-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Blocked IPs</p>
                  <p className="text-2xl font-semibold text-red-600">{settings.threats.blockedIPs}</p>
                </div>
                <FiShield className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-yellow-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Suspicious Logins</p>
                  <p className="text-2xl font-semibold text-yellow-600">{settings.threats.suspiciousLogins}</p>
                </div>
                <FiAlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-purple-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Malware Attempts</p>
                  <p className="text-2xl font-semibold text-purple-600">{settings.threats.malwareAttempts}</p>
                </div>
                <FiAlertTriangle className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-orange-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Brute Force</p>
                  <p className="text-2xl font-semibold text-orange-600">{settings.threats.bruteForceAttempts}</p>
                </div>
                <FiLock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Threat Detection Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Threat Detection Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Auto-block suspicious IPs</p>
                  <p className="text-xs text-gray-500">Automatically block IPs with suspicious activity</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email alerts for threats</p>
                  <p className="text-xs text-gray-500">Send email notifications for security threats</p>
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
