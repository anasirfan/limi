'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiUsers, 
  FiShield, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSave,
  FiX,
  FiSettings,
  FiUserCheck,
  FiLock,
  FiUnlock,
  FiEye,
  FiGrid,
  FiList,
  FiFilter
} from 'react-icons/fi';

// Team categories with their associated roles
const teamCategories = {
  marketing: {
    name: 'Marketing',
    color: 'bg-pink-100 text-pink-700 border-pink-200',
    roles: ['marketing_manager', 'content_creator', 'social_media_specialist', 'marketing_analyst'],
    description: 'Marketing and promotional activities'
  },
  it: {
    name: 'Information Technology',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    roles: ['it_manager', 'system_admin', 'developer', 'devops_engineer', 'security_specialist'],
    description: 'Technology infrastructure and development'
  },
  design: {
    name: 'Design & Creative',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    roles: ['design_director', 'ui_designer', 'ux_designer', '3d_artist', 'graphic_designer'],
    description: 'Creative design and user experience'
  },
  sales: {
    name: 'Sales & Business',
    color: 'bg-green-100 text-green-700 border-green-200',
    roles: ['sales_manager', 'account_executive', 'business_analyst', 'customer_success'],
    description: 'Sales and business development'
  },
  operations: {
    name: 'Operations',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    roles: ['operations_manager', 'project_manager', 'quality_assurance', 'logistics_coordinator'],
    description: 'Operational management and coordination'
  },
  executive: {
    name: 'Executive',
    color: 'bg-red-100 text-red-700 border-red-200',
    roles: ['ceo', 'cto', 'cfo', 'vp_engineering', 'vp_sales'],
    description: 'Executive leadership and strategic decisions'
  }
};

// Enhanced role definitions with team associations
const roleDefinitions = {
  // Executive Roles
  ceo: {
    name: 'Chief Executive Officer',
    team: 'executive',
    level: 'executive',
    permissions: ['all_access', 'user_management', 'system_config', 'financial_access', 'strategic_planning'],
    description: 'Complete system access and strategic oversight'
  },
  cto: {
    name: 'Chief Technology Officer',
    team: 'executive',
    level: 'executive',
    permissions: ['tech_oversight', 'system_config', 'user_management', 'development_access', 'security_config'],
    description: 'Technology strategy and system architecture'
  },
  cfo: {
    name: 'Chief Financial Officer',
    team: 'executive',
    level: 'executive',
    permissions: ['financial_access', 'budget_management', 'reporting_access', 'audit_access'],
    description: 'Financial oversight and budget management'
  },

  // IT Team Roles
  it_manager: {
    name: 'IT Manager',
    team: 'it',
    level: 'manager',
    permissions: ['system_config', 'user_management', 'security_config', 'backup_management', 'network_access'],
    description: 'IT infrastructure and team management'
  },
  system_admin: {
    name: 'System Administrator',
    team: 'it',
    level: 'senior',
    permissions: ['system_config', 'user_management', 'backup_management', 'security_monitoring'],
    description: 'System maintenance and user administration'
  },
  developer: {
    name: 'Software Developer',
    team: 'it',
    level: 'standard',
    permissions: ['development_access', 'code_repository', 'testing_environment', 'documentation_access'],
    description: 'Software development and coding'
  },
  devops_engineer: {
    name: 'DevOps Engineer',
    team: 'it',
    level: 'senior',
    permissions: ['deployment_access', 'monitoring_tools', 'infrastructure_config', 'automation_tools'],
    description: 'Deployment and infrastructure automation'
  },

  // Marketing Team Roles
  marketing_manager: {
    name: 'Marketing Manager',
    team: 'marketing',
    level: 'manager',
    permissions: ['marketing_campaigns', 'content_management', 'analytics_access', 'social_media_access', 'budget_view'],
    description: 'Marketing strategy and campaign management'
  },
  content_creator: {
    name: 'Content Creator',
    team: 'marketing',
    level: 'standard',
    permissions: ['content_management', 'asset_upload', 'social_media_access', 'analytics_view'],
    description: 'Content creation and management'
  },
  social_media_specialist: {
    name: 'Social Media Specialist',
    team: 'marketing',
    level: 'standard',
    permissions: ['social_media_access', 'content_management', 'analytics_view', 'community_management'],
    description: 'Social media management and engagement'
  },

  // Design Team Roles
  design_director: {
    name: 'Design Director',
    team: 'design',
    level: 'manager',
    permissions: ['design_oversight', 'asset_management', 'brand_guidelines', 'creative_approval', 'team_management'],
    description: 'Creative direction and design strategy'
  },
  ui_designer: {
    name: 'UI Designer',
    team: 'design',
    level: 'standard',
    permissions: ['design_tools', 'asset_upload', 'prototype_access', 'design_review'],
    description: 'User interface design and prototyping'
  },
  ux_designer: {
    name: 'UX Designer',
    team: 'design',
    level: 'standard',
    permissions: ['user_research', 'wireframe_tools', 'testing_access', 'analytics_view'],
    description: 'User experience research and design'
  },
  '3d_artist': {
    name: '3D Artist',
    team: 'design',
    level: 'standard',
    permissions: ['3d_tools', 'asset_upload', 'render_access', 'model_library'],
    description: '3D modeling and visualization'
  },

  // Sales Team Roles
  sales_manager: {
    name: 'Sales Manager',
    team: 'sales',
    level: 'manager',
    permissions: ['sales_dashboard', 'crm_access', 'lead_management', 'reporting_access', 'team_performance'],
    description: 'Sales team leadership and performance management'
  },
  account_executive: {
    name: 'Account Executive',
    team: 'sales',
    level: 'standard',
    permissions: ['crm_access', 'lead_management', 'proposal_tools', 'client_communication'],
    description: 'Client relationship and account management'
  },

  // Operations Team Roles
  operations_manager: {
    name: 'Operations Manager',
    team: 'operations',
    level: 'manager',
    permissions: ['operations_dashboard', 'process_management', 'resource_allocation', 'quality_control'],
    description: 'Operational efficiency and process management'
  },
  project_manager: {
    name: 'Project Manager',
    team: 'operations',
    level: 'standard',
    permissions: ['project_tools', 'task_management', 'timeline_access', 'resource_view'],
    description: 'Project coordination and timeline management'
  }
};

export default function RolesPage() {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [viewMode, setViewMode] = useState('teams');
  const [showAddRole, setShowAddRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    team: '',
    level: 'standard',
    permissions: [],
    description: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoles = Object.entries(roleDefinitions).filter(([key, role]) => {
    const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || role.team === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  const handleAddRole = () => {
    // Add role logic here
    console.log('Adding role:', newRole);
    setShowAddRole(false);
    setNewRole({
      name: '',
      team: '',
      level: 'standard',
      permissions: [],
      description: ''
    });
  };

  const handleEditRole = (roleKey, role) => {
    setEditingRole({ key: roleKey, ...role });
    setShowEditRole(true);
  };

  const handleDeleteRole = (roleKey) => {
    if (confirm('Are you sure you want to delete this role?')) {
      console.log('Deleting role:', roleKey);
    }
  };

  const getRoleCount = (teamKey) => {
    return Object.values(roleDefinitions).filter(role => role.team === teamKey).length;
  };

  const getUserCount = (teamKey) => {
    // Mock user count - replace with actual data
    const mockCounts = {
      marketing: 8,
      it: 12,
      design: 6,
      sales: 10,
      operations: 7,
      executive: 3
    };
    return mockCounts[teamKey] || 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Roles & Teams Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage team categories, roles, and permissions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddRole(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Role</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiUsers className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Teams</p>
              <p className="text-2xl font-semibold text-gray-900">{Object.keys(teamCategories).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiShield className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Roles</p>
              <p className="text-2xl font-semibold text-gray-900">{Object.keys(roleDefinitions).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiUserCheck className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">46</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiLock className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Permissions</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
            <div className="flex-1">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search roles and teams..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              >
                <option value="all">All Teams</option>
                {Object.entries(teamCategories).map(([key, team]) => (
                  <option key={key} value={key}>{team.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('teams')}
              className={`p-2 rounded-lg ${viewMode === 'teams' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('roles')}
              className={`p-2 rounded-lg ${viewMode === 'roles' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Teams View */}
      {viewMode === 'teams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(teamCategories).map(([teamKey, team]) => (
            <div key={teamKey} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${team.color}`}>
                    <FiUsers className="w-4 h-4 mr-2" />
                    {team.name}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <FiSettings className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{team.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-gray-900">{getRoleCount(teamKey)}</p>
                    <p className="text-xs text-gray-500">Roles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-gray-900">{getUserCount(teamKey)}</p>
                    <p className="text-xs text-gray-500">Users</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Team Roles:</h4>
                  <div className="flex flex-wrap gap-1">
                    {team.roles.slice(0, 3).map(roleKey => (
                      <span key={roleKey} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                        {roleDefinitions[roleKey]?.name || roleKey}
                      </span>
                    ))}
                    {team.roles.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                        +{team.roles.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Roles View */}
      {viewMode === 'roles' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRoles.map(([roleKey, role]) => (
                  <tr key={roleKey} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{role.name}</div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${teamCategories[role.team]?.color || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {teamCategories[role.team]?.name || role.team}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        role.level === 'executive' ? 'bg-red-100 text-red-700' :
                        role.level === 'manager' ? 'bg-blue-100 text-blue-700' :
                        role.level === 'senior' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {role.level.charAt(0).toUpperCase() + role.level.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 2).map(permission => (
                          <span key={permission} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                            {permission.replace('_', ' ')}
                          </span>
                        ))}
                        {role.permissions.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                            +{role.permissions.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Math.floor(Math.random() * 10) + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditRole(roleKey, role)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(roleKey)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {showAddRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Role</h3>
              <button
                onClick={() => setShowAddRole(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    placeholder="Enter role name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
                  <select
                    value={newRole.team}
                    onChange={(e) => setNewRole({...newRole, team: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  >
                    <option value="">Select team</option>
                    {Object.entries(teamCategories).map(([key, team]) => (
                      <option key={key} value={key}>{team.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Enter role description"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddRole(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRole}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FiSave className="w-4 h-4" />
                <span>Add Role</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
