'use client';

import { useState, useEffect } from 'react';
import { FiUsers, FiPlus, FiEdit2, FiTrash2, FiUserPlus, FiUserMinus, FiSettings, FiTarget, FiCalendar } from 'react-icons/fi';

export default function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    const mockTeams = [
      {
        id: 1,
        name: 'Engineering',
        description: 'Software development and technical infrastructure',
        memberCount: 12,
        lead: 'Sarah Johnson',
        leadId: 1,
        color: 'blue',
        created: '2023-01-15',
        members: [
          { id: 1, name: 'Sarah Johnson', role: 'Team Lead', email: 'sarah.johnson@limi.com', avatar: 'SJ', joinDate: '2023-01-15' },
          { id: 2, name: 'Michael Chen', role: 'Senior Developer', email: 'michael.chen@limi.com', avatar: 'MC', joinDate: '2023-02-01' },
          { id: 3, name: 'Alex Rodriguez', role: 'Frontend Developer', email: 'alex.rodriguez@limi.com', avatar: 'AR', joinDate: '2023-03-10' },
          { id: 4, name: 'Emma Wilson', role: 'Backend Developer', email: 'emma.wilson@limi.com', avatar: 'EW', joinDate: '2023-04-05' }
        ],
        projects: ['Asset Management System', 'Workflow Builder', 'API Gateway'],
        stats: { activeProjects: 3, completedTasks: 156, avgProductivity: 87 }
      },
      {
        id: 2,
        name: 'Product',
        description: 'Product strategy, design, and user experience',
        memberCount: 8,
        lead: 'Lisa Thompson',
        leadId: 5,
        color: 'green',
        created: '2023-02-01',
        members: [
          { id: 5, name: 'Lisa Thompson', role: 'Product Manager', email: 'lisa.thompson@limi.com', avatar: 'LT', joinDate: '2023-02-01' },
          { id: 6, name: 'David Kim', role: 'UX Designer', email: 'david.kim@limi.com', avatar: 'DK', joinDate: '2023-02-15' },
          { id: 7, name: 'Maria Garcia', role: 'Product Designer', email: 'maria.garcia@limi.com', avatar: 'MG', joinDate: '2023-03-01' },
          { id: 8, name: 'James Brown', role: 'User Researcher', email: 'james.brown@limi.com', avatar: 'JB', joinDate: '2023-03-20' }
        ],
        projects: ['User Dashboard', 'Mobile App', 'Design System'],
        stats: { activeProjects: 3, completedTasks: 89, avgProductivity: 92 }
      },
      {
        id: 3,
        name: 'Marketing',
        description: 'Brand marketing, content creation, and customer engagement',
        memberCount: 6,
        lead: 'Emily Rodriguez',
        leadId: 3,
        color: 'purple',
        created: '2023-02-15',
        members: [
          { id: 9, name: 'Emily Rodriguez', role: 'Marketing Manager', email: 'emily.rodriguez@limi.com', avatar: 'ER', joinDate: '2023-02-15' },
          { id: 10, name: 'Ryan Taylor', role: 'Content Creator', email: 'ryan.taylor@limi.com', avatar: 'RT', joinDate: '2023-03-01' },
          { id: 11, name: 'Sophie Chen', role: 'Social Media Manager', email: 'sophie.chen@limi.com', avatar: 'SC', joinDate: '2023-03-15' }
        ],
        projects: ['Brand Campaign', 'Content Strategy', 'Social Media'],
        stats: { activeProjects: 3, completedTasks: 67, avgProductivity: 85 }
      },
      {
        id: 4,
        name: 'Sales',
        description: 'Customer acquisition, relationship management, and revenue growth',
        memberCount: 10,
        lead: 'Robert Johnson',
        leadId: 12,
        color: 'orange',
        created: '2023-03-01',
        members: [
          { id: 12, name: 'Robert Johnson', role: 'Sales Manager', email: 'robert.johnson@limi.com', avatar: 'RJ', joinDate: '2023-03-01' },
          { id: 13, name: 'Jennifer Lee', role: 'Account Executive', email: 'jennifer.lee@limi.com', avatar: 'JL', joinDate: '2023-03-15' },
          { id: 14, name: 'Mark Davis', role: 'Sales Representative', email: 'mark.davis@limi.com', avatar: 'MD', joinDate: '2023-04-01' }
        ],
        projects: ['Q2 Sales Campaign', 'Customer Onboarding', 'Partner Program'],
        stats: { activeProjects: 3, completedTasks: 124, avgProductivity: 78 }
      }
    ];

    const mockAvailableUsers = [
      { id: 15, name: 'John Smith', email: 'john.smith@limi.com', role: 'Developer', avatar: 'JS' },
      { id: 16, name: 'Anna Wilson', email: 'anna.wilson@limi.com', role: 'Designer', avatar: 'AW' },
      { id: 17, name: 'Tom Brown', email: 'tom.brown@limi.com', role: 'Analyst', avatar: 'TB' }
    ];

    setTeams(mockTeams);
    setAvailableUsers(mockAvailableUsers);
    setSelectedTeam(mockTeams[0]);
  }, []);

  const getTeamColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      red: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[color] || colors.blue;
  };

  const createTeam = () => {
    if (!newTeamName.trim()) return;

    const newTeam = {
      id: Date.now(),
      name: newTeamName,
      description: newTeamDescription,
      memberCount: 0,
      lead: null,
      leadId: null,
      color: 'blue',
      created: new Date().toISOString().split('T')[0],
      members: [],
      projects: [],
      stats: { activeProjects: 0, completedTasks: 0, avgProductivity: 0 }
    };

    setTeams(prev => [...prev, newTeam]);
    setNewTeamName('');
    setNewTeamDescription('');
    setShowCreateTeam(false);
  };

  const addMemberToTeam = (userId) => {
    const user = availableUsers.find(u => u.id === userId);
    if (!user || !selectedTeam) return;

    const newMember = {
      ...user,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setTeams(prev => prev.map(team => {
      if (team.id === selectedTeam.id) {
        return {
          ...team,
          members: [...team.members, newMember],
          memberCount: team.memberCount + 1
        };
      }
      return team;
    }));

    setAvailableUsers(prev => prev.filter(u => u.id !== userId));
    setShowAddMember(false);
  };

  const removeMemberFromTeam = (memberId) => {
    if (!selectedTeam) return;

    const member = selectedTeam.members.find(m => m.id === memberId);
    if (!member) return;

    setTeams(prev => prev.map(team => {
      if (team.id === selectedTeam.id) {
        return {
          ...team,
          members: team.members.filter(m => m.id !== memberId),
          memberCount: team.memberCount - 1
        };
      }
      return team;
    }));

    setAvailableUsers(prev => [...prev, {
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role,
      avatar: member.avatar
    }]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Teams List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Teams</h3>
              <button
                onClick={() => setShowCreateTeam(true)}
                className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTeam?.id === team.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getTeamColor(team.color)}`}>
                    {team.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiEdit2 className="w-3 h-3" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <FiTrash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{team.description}</p>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <FiUsers className="w-3 h-3 mr-1" />
                    {team.memberCount} members
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <FiTarget className="w-3 h-3 mr-1" />
                    {team.stats.activeProjects} active projects
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <FiCalendar className="w-3 h-3 mr-1" />
                    Created {new Date(team.created).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Create Team Form */}
          {showCreateTeam && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Team name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <textarea
                  placeholder="Team description"
                  value={newTeamDescription}
                  onChange={(e) => setNewTeamDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={createTeam}
                    className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowCreateTeam(false)}
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

      {/* Team Details */}
      <div className="lg:col-span-2">
        {selectedTeam && (
          <div className="space-y-6">
            {/* Team Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedTeam.name}</h3>
                  <p className="text-gray-600">{selectedTeam.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAddMember(true)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                  >
                    <FiUserPlus className="w-4 h-4 mr-2" />
                    Add Member
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <FiSettings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedTeam.memberCount}</div>
                  <div className="text-sm text-gray-600">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedTeam.stats.activeProjects}</div>
                  <div className="text-sm text-gray-600">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedTeam.stats.avgProductivity}%</div>
                  <div className="text-sm text-gray-600">Productivity</div>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900">Team Members</h4>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTeam.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-emerald-700">{member.avatar}</span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                          <div className="text-xs text-gray-400">Joined {new Date(member.joinDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeMemberFromTeam(member.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <FiUserMinus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Projects */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900">Active Projects</h4>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {selectedTeam.projects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FiTarget className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="ml-3 font-medium text-gray-900">{project}</span>
                      </div>
                      <span className="text-sm text-gray-500">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Team Member</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {availableUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-700">{user.avatar}</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addMemberToTeam(user.id)}
                    className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowAddMember(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
