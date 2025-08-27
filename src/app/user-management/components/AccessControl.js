'use client';

import { useState, useEffect } from 'react';
import { FiShield, FiLock, FiUnlock, FiKey, FiSettings, FiAlertTriangle, FiCheck, FiX, FiClock, FiUser, FiUsers } from 'react-icons/fi';

export default function AccessControl() {
  const [accessPolicies, setAccessPolicies] = useState([]);
  const [securitySettings, setSecuritySettings] = useState({});
  const [activeTab, setActiveTab] = useState('policies');
  const [showCreatePolicy, setShowCreatePolicy] = useState(false);
  const [newPolicyName, setNewPolicyName] = useState('');
  const [newPolicyDescription, setNewPolicyDescription] = useState('');

  useEffect(() => {
    const mockPolicies = [
      {
        id: 1,
        name: 'Asset Management Access',
        description: 'Controls access to asset management features',
        type: 'resource',
        status: 'active',
        rules: [
          { resource: 'assets', action: 'read', condition: 'role:user,manager,admin' },
          { resource: 'assets', action: 'write', condition: 'role:manager,admin' },
          { resource: 'assets', action: 'delete', condition: 'role:admin' }
        ],
        affectedUsers: 45,
        lastModified: '2024-01-15T10:30:00Z',
        createdBy: 'Sarah Johnson'
      },
      {
        id: 2,
        name: 'Workflow Management Access',
        description: 'Defines who can create and manage workflows',
        type: 'feature',
        status: 'active',
        rules: [
          { resource: 'workflows', action: 'read', condition: 'role:user,manager,admin' },
          { resource: 'workflows', action: 'create', condition: 'role:manager,admin' },
          { resource: 'workflows', action: 'approve', condition: 'role:manager,admin' }
        ],
        affectedUsers: 32,
        lastModified: '2024-01-14T16:45:00Z',
        createdBy: 'Michael Chen'
      },
      {
        id: 3,
        name: 'Admin Panel Access',
        description: 'Restricts access to administrative functions',
        type: 'system',
        status: 'active',
        rules: [
          { resource: 'admin', action: 'read', condition: 'role:admin' },
          { resource: 'users', action: 'manage', condition: 'role:admin' },
          { resource: 'system', action: 'configure', condition: 'role:admin' }
        ],
        affectedUsers: 5,
        lastModified: '2024-01-13T09:15:00Z',
        createdBy: 'Emily Rodriguez'
      },
      {
        id: 4,
        name: 'Time-Based Access',
        description: 'Restricts access during specific hours',
        type: 'temporal',
        status: 'inactive',
        rules: [
          { resource: 'system', action: 'access', condition: 'time:09:00-17:00' },
          { resource: 'uploads', action: 'bulk', condition: 'time:09:00-17:00' }
        ],
        affectedUsers: 25,
        lastModified: '2024-01-12T14:20:00Z',
        createdBy: 'David Kim'
      }
    ];

    const mockSecuritySettings = {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        maxAge: 90,
        preventReuse: 5
      },
      sessionManagement: {
        maxSessionDuration: 480, // minutes
        idleTimeout: 60, // minutes
        maxConcurrentSessions: 3,
        requireReauth: true
      },
      accessControl: {
        maxLoginAttempts: 5,
        lockoutDuration: 30, // minutes
        twoFactorRequired: false,
        ipWhitelisting: false,
        geoBlocking: false
      },
      auditSettings: {
        logAllAccess: true,
        logFailedAttempts: true,
        retentionPeriod: 365, // days
        alertOnSuspicious: true
      }
    };

    setAccessPolicies(mockPolicies);
    setSecuritySettings(mockSecuritySettings);
  }, []);

  const getPolicyTypeColor = (type) => {
    const colors = {
      resource: 'bg-blue-100 text-blue-800',
      feature: 'bg-green-100 text-green-800',
      system: 'bg-red-100 text-red-800',
      temporal: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const createPolicy = () => {
    if (!newPolicyName.trim()) return;

    const newPolicy = {
      id: Date.now(),
      name: newPolicyName,
      description: newPolicyDescription,
      type: 'resource',
      status: 'active',
      rules: [],
      affectedUsers: 0,
      lastModified: new Date().toISOString(),
      createdBy: 'Current User'
    };

    setAccessPolicies(prev => [...prev, newPolicy]);
    setNewPolicyName('');
    setNewPolicyDescription('');
    setShowCreatePolicy(false);
  };

  const togglePolicyStatus = (policyId) => {
    setAccessPolicies(prev => prev.map(policy => {
      if (policy.id === policyId) {
        return {
          ...policy,
          status: policy.status === 'active' ? 'inactive' : 'active',
          lastModified: new Date().toISOString()
        };
      }
      return policy;
    }));
  };

  const updateSecuritySetting = (category, setting, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Access Control & Security</h3>
            <p className="text-sm text-gray-600 mt-1">Manage access policies and security settings</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Save All Changes
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'policies', label: 'Access Policies', icon: FiShield },
              { id: 'security', label: 'Security Settings', icon: FiLock },
              { id: 'audit', label: 'Audit & Compliance', icon: FiKey }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Access Policies Tab */}
      {activeTab === 'policies' && (
        <div className="space-y-6">
          {/* Policy Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiShield className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Policies</p>
                  <p className="text-2xl font-bold text-gray-900">{accessPolicies.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiCheck className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Policies</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {accessPolicies.filter(p => p.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FiUsers className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Affected Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {accessPolicies.reduce((sum, p) => sum + p.affectedUsers, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FiAlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inactive Policies</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {accessPolicies.filter(p => p.status === 'inactive').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Policies List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Access Policies</h4>
                <button
                  onClick={() => setShowCreatePolicy(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Create Policy
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {accessPolicies.map((policy) => (
                <div key={policy.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-medium text-gray-900">{policy.name}</h5>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPolicyTypeColor(policy.type)}`}>
                          {policy.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                          {policy.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
                      
                      <div className="space-y-2">
                        <h6 className="text-sm font-medium text-gray-700">Rules:</h6>
                        {policy.rules.map((rule, index) => (
                          <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            <span className="font-medium">{rule.resource}</span> - 
                            <span className="mx-1">{rule.action}</span> - 
                            <span className="text-blue-600">{rule.condition}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <FiUsers className="w-3 h-3 mr-1" />
                          {policy.affectedUsers} users
                        </span>
                        <span className="flex items-center">
                          <FiClock className="w-3 h-3 mr-1" />
                          Modified {new Date(policy.lastModified).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <FiUser className="w-3 h-3 mr-1" />
                          by {policy.createdBy}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => togglePolicyStatus(policy.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          policy.status === 'active'
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                        }`}
                      >
                        {policy.status === 'active' ? <FiLock className="w-4 h-4" /> : <FiUnlock className="w-4 h-4" />}
                      </button>
                      <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                        <FiSettings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create Policy Modal */}
          {showCreatePolicy && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Access Policy</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Policy name"
                    value={newPolicyName}
                    onChange={(e) => setNewPolicyName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <textarea
                    placeholder="Policy description"
                    value={newPolicyDescription}
                    onChange={(e) => setNewPolicyDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={createPolicy}
                      className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => setShowCreatePolicy(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Security Settings Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Password Policy */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Password Policy</h4>
              <p className="text-sm text-gray-600 mt-1">Configure password requirements and security</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
                  <input
                    type="number"
                    value={securitySettings.passwordPolicy?.minLength || 8}
                    onChange={(e) => updateSecuritySetting('passwordPolicy', 'minLength', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Max Age (days)</label>
                  <input
                    type="number"
                    value={securitySettings.passwordPolicy?.maxAge || 90}
                    onChange={(e) => updateSecuritySetting('passwordPolicy', 'maxAge', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'requireUppercase', label: 'Require Uppercase Letters' },
                  { key: 'requireLowercase', label: 'Require Lowercase Letters' },
                  { key: 'requireNumbers', label: 'Require Numbers' },
                  { key: 'requireSpecialChars', label: 'Require Special Characters' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">{setting.label}</label>
                    <button
                      onClick={() => updateSecuritySetting('passwordPolicy', setting.key, !securitySettings.passwordPolicy?.[setting.key])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.passwordPolicy?.[setting.key] ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.passwordPolicy?.[setting.key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Session Management */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Session Management</h4>
              <p className="text-sm text-gray-600 mt-1">Control user session behavior and timeouts</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Session Duration (minutes)</label>
                  <input
                    type="number"
                    value={securitySettings.sessionManagement?.maxSessionDuration || 480}
                    onChange={(e) => updateSecuritySetting('sessionManagement', 'maxSessionDuration', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Idle Timeout (minutes)</label>
                  <input
                    type="number"
                    value={securitySettings.sessionManagement?.idleTimeout || 60}
                    onChange={(e) => updateSecuritySetting('sessionManagement', 'idleTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Sessions</label>
                  <input
                    type="number"
                    value={securitySettings.sessionManagement?.maxConcurrentSessions || 3}
                    onChange={(e) => updateSecuritySetting('sessionManagement', 'maxConcurrentSessions', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Access Control Settings */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Access Control</h4>
              <p className="text-sm text-gray-600 mt-1">Configure login security and access restrictions</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={securitySettings.accessControl?.maxLoginAttempts || 5}
                    onChange={(e) => updateSecuritySetting('accessControl', 'maxLoginAttempts', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lockout Duration (minutes)</label>
                  <input
                    type="number"
                    value={securitySettings.accessControl?.lockoutDuration || 30}
                    onChange={(e) => updateSecuritySetting('accessControl', 'lockoutDuration', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'twoFactorRequired', label: 'Require Two-Factor Authentication' },
                  { key: 'ipWhitelisting', label: 'Enable IP Whitelisting' },
                  { key: 'geoBlocking', label: 'Enable Geographic Blocking' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">{setting.label}</label>
                    <button
                      onClick={() => updateSecuritySetting('accessControl', setting.key, !securitySettings.accessControl?.[setting.key])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.accessControl?.[setting.key] ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.accessControl?.[setting.key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audit & Compliance Tab */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900">Audit & Compliance Settings</h4>
            <p className="text-sm text-gray-600 mt-1">Configure audit logging and compliance requirements</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Log Retention Period (days)</label>
                <input
                  type="number"
                  value={securitySettings.auditSettings?.retentionPeriod || 365}
                  onChange={(e) => updateSecuritySetting('auditSettings', 'retentionPeriod', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              {[
                { key: 'logAllAccess', label: 'Log All Access Attempts' },
                { key: 'logFailedAttempts', label: 'Log Failed Login Attempts' },
                { key: 'alertOnSuspicious', label: 'Alert on Suspicious Activity' }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">{setting.label}</label>
                  <button
                    onClick={() => updateSecuritySetting('auditSettings', setting.key, !securitySettings.auditSettings?.[setting.key])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      securitySettings.auditSettings?.[setting.key] ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        securitySettings.auditSettings?.[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
