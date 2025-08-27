'use client';

import { useState, useEffect } from 'react';
import { FiShield, FiUsers, FiSettings, FiCheck, FiX, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function RolePermissions() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  // Mock data
  useEffect(() => {
    const mockRoles = [
      {
        id: 1,
        name: 'Super Admin',
        description: 'Full system access with all permissions',
        userCount: 2,
        color: 'red',
        permissions: ['user_management', 'asset_management', 'workflow_management', 'system_settings', 'analytics', 'api_access', 'security_settings', 'audit_logs']
      },
      {
        id: 2,
        name: 'Admin',
        description: 'Administrative access with most permissions',
        userCount: 5,
        color: 'blue',
        permissions: ['user_management', 'asset_management', 'workflow_management', 'analytics', 'api_access']
      },
      {
        id: 3,
        name: 'Manager',
        description: 'Team management and content oversight',
        userCount: 12,
        color: 'green',
        permissions: ['asset_management', 'workflow_management', 'team_management', 'analytics']
      },
      {
        id: 4,
        name: 'Editor',
        description: 'Content creation and editing capabilities',
        userCount: 25,
        color: 'purple',
        permissions: ['asset_management', 'workflow_create', 'content_edit']
      },
      {
        id: 5,
        name: 'Viewer',
        description: 'Read-only access to content and workflows',
        userCount: 48,
        color: 'gray',
        permissions: ['asset_view', 'workflow_view', 'dashboard_view']
      }
    ];

    const mockPermissions = [
      {
        id: 'user_management',
        name: 'User Management',
        description: 'Create, edit, and delete users',
        category: 'Users'
      },
      {
        id: 'asset_management',
        name: 'Asset Management',
        description: 'Full access to asset operations',
        category: 'Assets'
      },
      {
        id: 'asset_view',
        name: 'Asset View',
        description: 'View assets and folders',
        category: 'Assets'
      },
      {
        id: 'workflow_management',
        name: 'Workflow Management',
        description: 'Create and manage workflows',
        category: 'Workflows'
      },
      {
        id: 'workflow_create',
        name: 'Workflow Create',
        description: 'Create new workflows',
        category: 'Workflows'
      },
      {
        id: 'workflow_view',
        name: 'Workflow View',
        description: 'View existing workflows',
        category: 'Workflows'
      },
      {
        id: 'team_management',
        name: 'Team Management',
        description: 'Manage team members and assignments',
        category: 'Teams'
      },
      {
        id: 'system_settings',
        name: 'System Settings',
        description: 'Configure system-wide settings',
        category: 'System'
      },
      {
        id: 'security_settings',
        name: 'Security Settings',
        description: 'Manage security policies',
        category: 'System'
      },
      {
        id: 'analytics',
        name: 'Analytics',
        description: 'Access to analytics and reports',
        category: 'Analytics'
      },
      {
        id: 'api_access',
        name: 'API Access',
        description: 'Access to API endpoints',
        category: 'API'
      },
      {
        id: 'audit_logs',
        name: 'Audit Logs',
        description: 'View system audit logs',
        category: 'System'
      },
      {
        id: 'content_edit',
        name: 'Content Edit',
        description: 'Edit content and descriptions',
        category: 'Content'
      },
      {
        id: 'dashboard_view',
        name: 'Dashboard View',
        description: 'Access to dashboard views',
        category: 'Dashboard'
      }
    ];

    setRoles(mockRoles);
    setPermissions(mockPermissions);
    setSelectedRole(mockRoles[0]);
  }, []);

  const getRoleColor = (color) => {
    const colors = {
      red: 'bg-red-100 text-red-800 border-red-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[color] || colors.gray;
  };

  const hasPermission = (roleId, permissionId) => {
    const role = roles.find(r => r.id === roleId);
    return role?.permissions.includes(permissionId) || false;
  };

  const togglePermission = (roleId, permissionId) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permissionId);
        return {
          ...role,
          permissions: hasPermission
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId]
        };
      }
      return role;
    }));
  };

  const createRole = () => {
    if (!newRoleName.trim()) return;

    const newRole = {
      id: Date.now(),
      name: newRoleName,
      description: newRoleDescription,
      userCount: 0,
      color: 'blue',
      permissions: []
    };

    setRoles(prev => [...prev, newRole]);
    setNewRoleName('');
    setNewRoleDescription('');
    setShowCreateRole(false);
  };

  const deleteRole = (roleId) => {
    setRoles(prev => prev.filter(r => r.id !== roleId));
    if (selectedRole?.id === roleId) {
      setSelectedRole(roles[0]);
    }
  };

  // Group permissions by category
  const permissionsByCategory = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Roles List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Roles</h3>
              <button
                onClick={() => setShowCreateRole(true)}
                className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedRole?.id === role.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getRoleColor(role.color)}`}>
                    {role.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiEdit2 className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRole(role.id);
                      }}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <FiUsers className="w-3 h-3 mr-1" />
                  {role.userCount} users
                </div>
              </div>
            ))}
          </div>

          {/* Create Role Form */}
          {showCreateRole && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Role name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <textarea
                  placeholder="Role description"
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={createRole}
                    className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowCreateRole(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Permissions for {selectedRole?.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Configure what this role can access and modify
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {selectedRole && (
              <div className="space-y-6">
                {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                  <div key={category} className="border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-medium text-gray-900">{category}</h4>
                    </div>
                    <div className="p-4 space-y-3">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h5 className="font-medium text-gray-900">{permission.name}</h5>
                            </div>
                            <p className="text-sm text-gray-600">{permission.description}</p>
                          </div>
                          <div className="ml-4">
                            <button
                              onClick={() => togglePermission(selectedRole.id, permission.id)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                hasPermission(selectedRole.id, permission.id)
                                  ? 'bg-emerald-600'
                                  : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  hasPermission(selectedRole.id, permission.id)
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Permission Summary */}
        {selectedRole && (
          <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="font-medium text-gray-900 mb-4">Permission Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {selectedRole.permissions.length}
                </div>
                <div className="text-sm text-gray-600">Total Permissions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedRole.userCount}
                </div>
                <div className="text-sm text-gray-600">Users with Role</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((selectedRole.permissions.length / permissions.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Coverage</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
