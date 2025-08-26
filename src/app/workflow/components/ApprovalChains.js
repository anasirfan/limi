'use client';

import { useState } from 'react';
import { 
  FiUsers, 
  FiArrowRight, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiClock,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiSettings,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';

export default function ApprovalChains() {
  const [selectedChain, setSelectedChain] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedChains, setExpandedChains] = useState(new Set());

  // Mock approval chains data
  const approvalChains = [
    {
      id: 1,
      name: 'Asset Upload Approval',
      description: 'Multi-stage approval for new asset uploads',
      status: 'active',
      stages: [
        {
          id: 1,
          name: 'Content Review',
          approvers: [
            { id: 1, name: 'Sarah Smith', role: 'Content Manager', avatar: '/api/placeholder/32/32' }
          ],
          approvalType: 'any',
          timeout: 24,
          escalation: { enabled: true, to: 'manager', after: 48 }
        },
        {
          id: 2,
          name: 'Brand Compliance',
          approvers: [
            { id: 2, name: 'Mike Johnson', role: 'Brand Manager', avatar: '/api/placeholder/32/32' },
            { id: 3, name: 'Lisa Chen', role: 'Design Lead', avatar: '/api/placeholder/32/32' }
          ],
          approvalType: 'all',
          timeout: 12,
          escalation: { enabled: false }
        },
        {
          id: 3,
          name: 'Final Approval',
          approvers: [
            { id: 4, name: 'John Doe', role: 'Creative Director', avatar: '/api/placeholder/32/32' }
          ],
          approvalType: 'any',
          timeout: 6,
          escalation: { enabled: true, to: 'ceo', after: 24 }
        }
      ],
      routing: {
        type: 'sequential', // 'sequential' or 'parallel'
        conditions: []
      },
      metrics: {
        totalRequests: 156,
        avgTime: '2.3 hours',
        successRate: 94.2,
        currentPending: 3
      }
    },
    {
      id: 2,
      name: 'Budget Approval Chain',
      description: 'Financial approval process for budget requests',
      status: 'active',
      stages: [
        {
          id: 1,
          name: 'Team Lead Review',
          approvers: [
            { id: 5, name: 'Alex Wilson', role: 'Team Lead', avatar: '/api/placeholder/32/32' }
          ],
          approvalType: 'any',
          timeout: 4,
          escalation: { enabled: false }
        },
        {
          id: 2,
          name: 'Finance Review',
          approvers: [
            { id: 6, name: 'Emma Davis', role: 'Finance Manager', avatar: '/api/placeholder/32/32' }
          ],
          approvalType: 'any',
          timeout: 24,
          escalation: { enabled: true, to: 'cfo', after: 48 }
        },
        {
          id: 3,
          name: 'Executive Approval',
          approvers: [
            { id: 7, name: 'Robert Taylor', role: 'CFO', avatar: '/api/placeholder/32/32' }
          ],
          approvalType: 'any',
          timeout: 72,
          escalation: { enabled: false }
        }
      ],
      routing: {
        type: 'conditional',
        conditions: [
          { field: 'amount', operator: '>', value: 10000, route: 'all_stages' },
          { field: 'amount', operator: '<=', value: 10000, route: 'skip_executive' }
        ]
      },
      metrics: {
        totalRequests: 89,
        avgTime: '4.1 hours',
        successRate: 97.8,
        currentPending: 2
      }
    },
    {
      id: 3,
      name: 'Content Publishing',
      description: 'Review and approval for marketing content',
      status: 'draft',
      stages: [
        {
          id: 1,
          name: 'Content Review',
          approvers: [
            { id: 8, name: 'Maria Garcia', role: 'Content Writer', avatar: '/api/placeholder/32/32' }
          ],
          approvalType: 'any',
          timeout: 8,
          escalation: { enabled: false }
        },
        {
          id: 2,
          name: 'Legal Review',
          approvers: [
            { id: 9, name: 'David Kim', role: 'Legal Counsel', avatar: '/api/placeholder/32/32' }
          ],
          approvalType: 'any',
          timeout: 48,
          escalation: { enabled: true, to: 'legal_head', after: 72 }
        }
      ],
      routing: {
        type: 'parallel',
        conditions: []
      },
      metrics: {
        totalRequests: 0,
        avgTime: 'N/A',
        successRate: 0,
        currentPending: 0
      }
    }
  ];

  const toggleChainExpansion = (chainId) => {
    const newExpanded = new Set(expandedChains);
    if (newExpanded.has(chainId)) {
      newExpanded.delete(chainId);
    } else {
      newExpanded.add(chainId);
    }
    setExpandedChains(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApprovalTypeLabel = (type) => {
    return type === 'any' ? 'Any approver' : 'All approvers';
  };

  const renderApprovalStage = (stage, isLast = false) => (
    <div key={stage.id} className="flex items-center">
      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 min-w-0 flex-1">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-gray-900">{stage.name}</h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {getApprovalTypeLabel(stage.approvalType)}
            </span>
            <FiClock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{stage.timeout}h</span>
          </div>
        </div>
        
        <div className="flex -space-x-2">
          {stage.approvers.map((approver, index) => (
            <div
              key={approver.id}
              className="relative"
              title={`${approver.name} - ${approver.role}`}
            >
              <div className="w-8 h-8 bg-emerald-100 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs font-medium text-emerald-700">
                  {approver.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {stage.escalation?.enabled && (
          <div className="mt-2 flex items-center text-xs text-orange-600">
            <FiAlertCircle className="w-3 h-3 mr-1" />
            <span>Escalates after {stage.escalation.after}h</span>
          </div>
        )}
      </div>
      
      {!isLast && (
        <div className="flex-shrink-0 mx-4">
          <FiArrowRight className="w-5 h-5 text-gray-400" />
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Approval Chains</h2>
          <p className="text-sm text-gray-600 mt-1">
            Configure multi-stage approval processes with routing logic
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>Create Chain</span>
        </button>
      </div>

      {/* Approval Chains List */}
      <div className="space-y-6">
        {approvalChains.map((chain) => {
          const isExpanded = expandedChains.has(chain.id);
          
          return (
            <div key={chain.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Chain Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleChainExpansion(chain.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {isExpanded ? (
                        <FiChevronDown className="w-5 h-5" />
                      ) : (
                        <FiChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">{chain.name}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(chain.status)}`}>
                          {chain.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{chain.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Metrics */}
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{chain.metrics.totalRequests}</div>
                        <div className="text-xs">Requests</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{chain.metrics.avgTime}</div>
                        <div className="text-xs">Avg Time</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {chain.metrics.successRate > 0 ? `${chain.metrics.successRate}%` : 'N/A'}
                        </div>
                        <div className="text-xs">Success</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900">{chain.metrics.currentPending}</div>
                        <div className="text-xs">Pending</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <FiSettings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chain Details */}
              {isExpanded && (
                <div className="p-6">
                  {/* Routing Configuration */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <h4 className="font-medium text-gray-900">Routing Configuration</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        chain.routing.type === 'sequential' ? 'bg-blue-100 text-blue-800' :
                        chain.routing.type === 'parallel' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {chain.routing.type}
                      </span>
                    </div>
                    
                    {chain.routing.conditions.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Conditions</h5>
                        <div className="space-y-1">
                          {chain.routing.conditions.map((condition, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              If {condition.field} {condition.operator} {condition.value} → {condition.route}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Approval Stages */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Approval Stages</h4>
                    <div className="flex items-center overflow-x-auto pb-4">
                      {chain.stages.map((stage, index) => 
                        renderApprovalStage(stage, index === chain.stages.length - 1)
                      )}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                      {[
                        {
                          action: 'Approved',
                          item: 'Product banner image',
                          user: 'Sarah Smith',
                          stage: 'Content Review',
                          time: '2 hours ago',
                          status: 'approved'
                        },
                        {
                          action: 'Pending',
                          item: 'Marketing video',
                          user: 'Mike Johnson',
                          stage: 'Brand Compliance',
                          time: '4 hours ago',
                          status: 'pending'
                        },
                        {
                          action: 'Rejected',
                          item: 'Social media post',
                          user: 'Lisa Chen',
                          stage: 'Brand Compliance',
                          time: '1 day ago',
                          status: 'rejected'
                        }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.status === 'approved' ? 'bg-green-400' :
                              activity.status === 'pending' ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`} />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {activity.action}: {activity.item}
                              </div>
                              <div className="text-xs text-gray-500">
                                {activity.stage} • by {activity.user}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Chain Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Create Approval Chain</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chain Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter chain name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    rows="3"
                    placeholder="Describe the approval process"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Routing Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="sequential">Sequential (one after another)</option>
                    <option value="parallel">Parallel (all at once)</option>
                    <option value="conditional">Conditional (based on rules)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700">
                Create Chain
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
