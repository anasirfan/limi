'use client';

import { useState, useRef, useCallback } from 'react';
import { 
  FiPlay, 
  FiPause, 
  FiCheck, 
  FiX, 
  FiMail, 
  FiUsers, 
  FiSettings,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiSave,
  FiZap
} from 'react-icons/fi';

export default function WorkflowBuilder() {
  const [workflow, setWorkflow] = useState({
    id: null,
    name: 'New Workflow',
    description: '',
    nodes: [],
    connections: []
  });
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const canvasRef = useRef(null);

  // Node types available in the toolbox
  const nodeTypes = [
    {
      type: 'start',
      label: 'Start',
      icon: FiPlay,
      color: 'bg-green-100 border-green-300 text-green-700',
      description: 'Workflow trigger point'
    },
    {
      type: 'approval',
      label: 'Approval',
      icon: FiUsers,
      color: 'bg-blue-100 border-blue-300 text-blue-700',
      description: 'Requires user approval'
    },
    {
      type: 'condition',
      label: 'Condition',
      icon: FiSettings,
      color: 'bg-yellow-100 border-yellow-300 text-yellow-700',
      description: 'Conditional logic branch'
    },
    {
      type: 'action',
      label: 'Action',
      icon: FiZap,
      color: 'bg-purple-100 border-purple-300 text-purple-700',
      description: 'Automated action'
    },
    {
      type: 'notification',
      label: 'Notification',
      icon: FiMail,
      color: 'bg-orange-100 border-orange-300 text-orange-700',
      description: 'Send notification'
    },
    {
      type: 'end',
      label: 'End',
      icon: FiCheck,
      color: 'bg-red-100 border-red-300 text-red-700',
      description: 'Workflow completion'
    }
  ];

  // Handle drag start from toolbox
  const handleDragStart = (e, nodeType) => {
    setDraggedNode(nodeType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Handle drop on canvas
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (!draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode = {
      id: `node_${Date.now()}`,
      type: draggedNode.type,
      label: draggedNode.label,
      x: x - 75, // Center the node
      y: y - 40,
      config: getDefaultConfig(draggedNode.type)
    };

    setWorkflow(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));

    setDraggedNode(null);
  }, [draggedNode]);

  // Get default configuration for node types
  const getDefaultConfig = (type) => {
    switch (type) {
      case 'approval':
        return {
          approvers: [],
          approvalType: 'any', // 'any' or 'all'
          timeout: 24, // hours
          escalation: null
        };
      case 'condition':
        return {
          conditions: [],
          operator: 'and' // 'and' or 'or'
        };
      case 'action':
        return {
          actionType: 'webhook',
          url: '',
          method: 'POST',
          payload: {}
        };
      case 'notification':
        return {
          recipients: [],
          template: '',
          channel: 'email' // 'email', 'slack', 'teams'
        };
      default:
        return {};
    }
  };

  // Handle node selection
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  // Handle node deletion
  const handleDeleteNode = (nodeId) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.filter(n => n.id !== nodeId),
      connections: prev.connections.filter(c => c.from !== nodeId && c.to !== nodeId)
    }));
    setSelectedNode(null);
  };

  // Start connection mode
  const handleStartConnection = (nodeId) => {
    setIsConnecting(true);
    setConnectionStart(nodeId);
  };

  // Complete connection
  const handleCompleteConnection = (nodeId) => {
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      const newConnection = {
        id: `conn_${Date.now()}`,
        from: connectionStart,
        to: nodeId
      };
      
      setWorkflow(prev => ({
        ...prev,
        connections: [...prev.connections, newConnection]
      }));
    }
    
    setIsConnecting(false);
    setConnectionStart(null);
  };

  // Render workflow node
  const renderNode = (node) => {
    const nodeType = nodeTypes.find(t => t.type === node.type);
    const Icon = nodeType?.icon || FiSettings;
    const isSelected = selectedNode?.id === node.id;
    const isConnectionTarget = isConnecting && connectionStart !== node.id;

    return (
      <div
        key={node.id}
        className={`absolute cursor-pointer transition-all duration-200 ${
          isSelected ? 'z-20' : 'z-10'
        }`}
        style={{ left: node.x, top: node.y }}
        onClick={() => handleNodeClick(node)}
      >
        <div className={`
          w-32 h-20 rounded-lg border-2 p-3 bg-white shadow-sm
          ${isSelected ? 'border-emerald-500 shadow-lg' : nodeType?.color || 'border-gray-300'}
          ${isConnectionTarget ? 'ring-2 ring-blue-300' : ''}
          hover:shadow-md
        `}>
          <div className="flex items-center justify-between mb-1">
            <Icon className="w-4 h-4" />
            <div className="flex space-x-1">
              {isConnecting && connectionStart !== node.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCompleteConnection(node.id);
                  }}
                  className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600"
                >
                  <FiPlus className="w-2 h-2" />
                </button>
              )}
              {!isConnecting && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartConnection(node.id);
                    }}
                    className="w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-emerald-600"
                    title="Connect"
                  >
                    <FiPlus className="w-2 h-2" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNode(node.id);
                    }}
                    className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                    title="Delete"
                  >
                    <FiX className="w-2 h-2" />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="text-xs font-medium text-gray-900 truncate">
            {node.label}
          </div>
        </div>
      </div>
    );
  };

  // Render connections
  const renderConnections = () => {
    return workflow.connections.map(connection => {
      const fromNode = workflow.nodes.find(n => n.id === connection.from);
      const toNode = workflow.nodes.find(n => n.id === connection.to);
      
      if (!fromNode || !toNode) return null;

      const fromX = fromNode.x + 64; // Center of node
      const fromY = fromNode.y + 40;
      const toX = toNode.x + 64;
      const toY = toNode.y + 40;

      return (
        <svg
          key={connection.id}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#6b7280"
              />
            </marker>
          </defs>
          <line
            x1={fromX}
            y1={fromY}
            x2={toX}
            y2={toY}
            stroke="#6b7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      );
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Toolbox */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Workflow Elements</h3>
        <div className="space-y-2">
          {nodeTypes.map((nodeType) => {
            const Icon = nodeType.icon;
            return (
              <div
                key={nodeType.type}
                draggable
                onDragStart={(e) => handleDragStart(e, nodeType)}
                className={`
                  p-3 rounded-lg border-2 cursor-move transition-all duration-200
                  ${nodeType.color} hover:shadow-md
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium text-sm">{nodeType.label}</div>
                    <div className="text-xs opacity-75">{nodeType.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Workflow Info</h4>
          <input
            type="text"
            value={workflow.name}
            onChange={(e) => setWorkflow(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
            placeholder="Workflow name"
          />
          <textarea
            value={workflow.description}
            onChange={(e) => setWorkflow(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
            rows="3"
            placeholder="Workflow description"
          />
          
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center space-x-1">
              <FiSave className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center space-x-1">
              <FiPlay className="w-4 h-4" />
              <span>Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <div
          ref={canvasRef}
          className="w-full h-full relative bg-gray-100"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => setSelectedNode(null)}
        >
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d1d5db" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Connections */}
          {renderConnections()}

          {/* Nodes */}
          {workflow.nodes.map(renderNode)}

          {/* Instructions */}
          {workflow.nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FiSettings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Build Your Workflow</h3>
                <p className="text-sm">
                  Drag elements from the toolbox to create your workflow
                </p>
              </div>
            </div>
          )}

          {/* Connection Mode Indicator */}
          {isConnecting && (
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm">Click a node to connect</span>
                <button
                  onClick={() => {
                    setIsConnecting(false);
                    setConnectionStart(null);
                  }}
                  className="ml-2 text-white hover:text-gray-200"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      {selectedNode && (
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Node Properties</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={selectedNode.label}
                onChange={(e) => {
                  const updatedNodes = workflow.nodes.map(node =>
                    node.id === selectedNode.id
                      ? { ...node, label: e.target.value }
                      : node
                  );
                  setWorkflow(prev => ({ ...prev, nodes: updatedNodes }));
                  setSelectedNode(prev => ({ ...prev, label: e.target.value }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Type-specific configuration */}
            {selectedNode.type === 'approval' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Approval Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="any">Any approver</option>
                    <option value="all">All approvers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timeout (hours)
                  </label>
                  <input
                    type="number"
                    defaultValue="24"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Approvers
                  </label>
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-left text-gray-500 hover:bg-gray-50">
                      + Add approver
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedNode.type === 'condition' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition Logic
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="and">All conditions (AND)</option>
                    <option value="or">Any condition (OR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conditions
                  </label>
                  <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-left text-gray-500 hover:bg-gray-50">
                    + Add condition
                  </button>
                </div>
              </div>
            )}

            {selectedNode.type === 'notification' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Channel
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <option value="email">Email</option>
                    <option value="slack">Slack</option>
                    <option value="teams">Microsoft Teams</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipients
                  </label>
                  <button className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-left text-gray-500 hover:bg-gray-50">
                    + Add recipient
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message Template
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                    rows="3"
                    placeholder="Enter notification message..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
