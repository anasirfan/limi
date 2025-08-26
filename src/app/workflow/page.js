'use client';

import { useState } from 'react';
import WorkflowBuilder from './components/WorkflowBuilder';
import ApprovalChains from './components/ApprovalChains';
import WorkflowDashboard from './components/WorkflowDashboard';
import { FiSettings, FiPlay, FiUsers, FiHome } from 'react-icons/fi';

export default function WorkflowPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'builder', label: 'Workflow Builder', icon: FiSettings },
    { id: 'approvals', label: 'Approval Chains', icon: FiUsers },
    { id: 'automation', label: 'Automation', icon: FiPlay }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflow & Automation</h1>
              <p className="text-sm text-gray-600 mt-1">
                Design, manage, and automate your business processes
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <FiPlay className="w-4 h-4" />
                <span>Run Workflow</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {activeTab === 'dashboard' && <WorkflowDashboard />}
        {activeTab === 'builder' && <WorkflowBuilder />}
        {activeTab === 'approvals' && <ApprovalChains />}
        {activeTab === 'automation' && (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <FiPlay className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Automation Center</h3>
              <p className="text-gray-600">
                Advanced automation features coming soon. Configure triggers, actions, and conditions.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
