'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, deleteUser, updateUserStatus } from '../../redux/slices/authSlice';
import { formatDistanceToNow } from 'date-fns';
import { 
  FiSearch, 
  FiFilter, 
  FiMoreVertical, 
  FiEdit2, 
  FiTrash2, 
  FiUserCheck, 
  FiUserX,
  FiMail,
  FiCalendar,
  FiShield
} from 'react-icons/fi';

const roleColors = {
  admin: 'bg-red-100 text-red-700 border-red-200',
  ceo: 'bg-purple-100 text-purple-700 border-purple-200',
  cto: 'bg-blue-100 text-blue-700 border-blue-200',
  vr_team_lead: 'bg-green-100 text-green-700 border-green-200',
  web_developer: 'bg-blue-100 text-blue-700 border-blue-200',
  vr_developer: 'bg-green-100 text-green-700 border-green-200',
  '3d_artist': 'bg-orange-100 text-orange-700 border-orange-200'
};

const statusColors = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  suspended: 'bg-red-100 text-red-700'
};

export default function UsersPage() {
  const dispatch = useDispatch();
  const { users, roleDefinitions } = useSelector(state => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeMenu, setActiveMenu] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = (userId, newStatus) => {
    dispatch(updateUserStatus({ id: userId, status: newStatus }));
    setActiveMenu(null);
  };

  const handleDeleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
    setActiveMenu(null);
  };

  const getRoleDisplayName = (role) => {
    return roleDefinitions[role]?.name || role;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add New User
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name, email, or department..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              {Object.entries(roleDefinitions).map(([key, role]) => (
                <option key={key} value={key}>{role.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  {/* User Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiMail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleColors[user.role]}`}>
                      <FiShield className="w-3 h-3 mr-1" />
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                      {user.status === 'active' && <FiUserCheck className="w-3 h-3 mr-1" />}
                      {user.status === 'inactive' && <FiUserX className="w-3 h-3 mr-1" />}
                      {user.status === 'suspended' && <FiUserX className="w-3 h-3 mr-1" />}
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>

                  {/* Last Login */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? (
                      <div className="flex items-center">
                        <FiCalendar className="w-3 h-3 mr-1" />
                        {formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })}
                      </div>
                    ) : (
                      <span className="text-gray-400">Never</span>
                    )}
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true })}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <FiMoreVertical className="w-4 h-4 text-gray-400" />
                      </button>

                      {activeMenu === user.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => {/* Edit user logic */}}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                            >
                              <FiEdit2 className="w-4 h-4" />
                              <span>Edit User</span>
                            </button>
                            
                            {user.status === 'active' ? (
                              <button
                                onClick={() => handleStatusChange(user.id, 'inactive')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                              >
                                <FiUserX className="w-4 h-4" />
                                <span>Deactivate</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStatusChange(user.id, 'active')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                              >
                                <FiUserCheck className="w-4 h-4" />
                                <span>Activate</span>
                              </button>
                            )}
                            
                            <hr className="my-1" />
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                            >
                              <FiTrash2 className="w-4 h-4" />
                              <span>Delete User</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <FiSearch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiUsers className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiUserCheck className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiShield className="w-8 h-8 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Admins</p>
              <p className="text-2xl font-semibold text-gray-900">
                {users.filter(u => u.role === 'admin' || u.role === 'ceo' || u.role === 'cto').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiCalendar className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">New This Month</p>
              <p className="text-2xl font-semibold text-gray-900">
                {users.filter(u => {
                  const joinDate = new Date(u.joinedAt);
                  const now = new Date();
                  return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}
