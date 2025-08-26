'use client';

import { useState } from 'react';
import { 
  FiPlay, 
  FiPause, 
  FiCheck, 
  FiClock, 
  FiAlertCircle,
  FiTrendingUp,
  FiUsers,
  FiSettings,
  FiMoreVertical
} from 'react-icons/fi';

export default function WorkflowDashboard() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  // Mock workflow data
  const workflows = [
    {
      id: 1,
      name: 'Asset Upload Approval',
      description: 'Multi-stage approval process for new asset uploads',
      status: 'active',
      runs: 24,
      successRate: 95.8,
      avgTime: '2.3 hours',
      lastRun: '2025-08-26T14:30:00Z',
      steps: 4,
      approvers: ['John Doe', 'Sarah Smith', 'Mike Johnson']
    },
    {
      id: 2,
      name: 'Product Launch Workflow',
      description: 'Complete product launch process with marketing coordination',
      status: 'draft',
      runs: 0,
      successRate: 0,
      avgTime: 'N/A',
      lastRun: null,
      steps: 8,
      approvers: ['Marketing Team', 'Product Team', 'CEO']
    },
    {
      id: 3,
      name: 'Content Review Process',
      description: 'Review and approval workflow for marketing content',
      status: 'active',
      runs: 156,
      successRate: 89.1,
      avgTime: '4.2 hours',
      lastRun: '2025-08-27T09:15:00Z',
      steps: 3,
      approvers: ['Content Manager', 'Brand Manager']
    },
    {
      id: 4,
      name: 'Budget Approval Chain',
      description: 'Financial approval process for budget requests',
      status: 'paused',
      runs: 42,
      successRate: 97.6,
      avgTime: '1.8 hours',
      lastRun: '2025-08-25T16:45:00Z',
      steps: 5,
      approvers: ['Team Lead', 'Finance Manager', 'CFO']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return FiPlay;
      case 'paused': return FiPause;
      case 'draft': return FiSettings;
      default: return FiClock;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <FiPlay className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Workflows</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Runs</p>
              <p className="text-2xl font-bold text-gray-900">222</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiCheck className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Workflows Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Workflows</h2>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Create Workflow
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workflow
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Runs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Run
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workflows.map((workflow) => {
                const StatusIcon = getStatusIcon(workflow.status);
                return (
                  <tr key={workflow.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <StatusIcon className="w-5 h-5 text-emerald-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {workflow.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {workflow.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(workflow.status)}`}>
                        {workflow.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {workflow.runs}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {workflow.successRate > 0 ? `${workflow.successRate}%` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {workflow.avgTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(workflow.lastRun)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-emerald-600 hover:text-emerald-900">
                          Edit
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Run
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FiMoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  action: 'Workflow completed',
                  workflow: 'Asset Upload Approval',
                  user: 'Sarah Smith',
                  time: '2 hours ago',
                  status: 'success'
                },
                {
                  action: 'Approval pending',
                  workflow: 'Content Review Process',
                  user: 'Mike Johnson',
                  time: '4 hours ago',
                  status: 'pending'
                },
                {
                  action: 'Workflow started',
                  workflow: 'Budget Approval Chain',
                  user: 'John Doe',
                  time: '6 hours ago',
                  status: 'running'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-400' :
                    activity.status === 'pending' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span> for{' '}
                      <span className="font-medium">{activity.workflow}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Pending Approvals</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  title: 'New Product Images',
                  workflow: 'Asset Upload Approval',
                  assignee: 'You',
                  priority: 'high',
                  dueDate: 'Today'
                },
                {
                  title: 'Marketing Campaign Copy',
                  workflow: 'Content Review Process',
                  assignee: 'Brand Manager',
                  priority: 'medium',
                  dueDate: 'Tomorrow'
                },
                {
                  title: 'Q4 Budget Request',
                  workflow: 'Budget Approval Chain',
                  assignee: 'Finance Manager',
                  priority: 'low',
                  dueDate: 'This week'
                }
              ].map((approval, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{approval.title}</p>
                    <p className="text-xs text-gray-500">{approval.workflow}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      approval.priority === 'high' ? 'bg-red-100 text-red-800' :
                      approval.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {approval.priority}
                    </span>
                    <span className="text-xs text-gray-500">{approval.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
