'use client';

import { useSelector, useDispatch } from 'react-redux';
import { setRoleFilter, setActionFilter, setTimeRangeFilter } from '../../redux/slices/activitySlice';
import { formatDistanceToNow } from 'date-fns';
import { FiClock, FiUser, FiActivity, FiFilter } from 'react-icons/fi';

const roleColors = {
  '3D Team': 'bg-purple-100 text-purple-700 border-purple-200',
  'VR Team': 'bg-green-100 text-green-700 border-green-200',
  'Frontend Dev': 'bg-blue-100 text-blue-700 border-blue-200',
  'Backend Dev': 'bg-orange-100 text-orange-700 border-orange-200',
  'CEO': 'bg-red-100 text-red-700 border-red-200'
};

const actionIcons = {
  uploaded: '📤',
  replaced: '🔄',
  renamed: '✏️',
  approved: '✅',
  optimized: '⚡',
  tagged: '🏷️',
  deleted: '🗑️'
};

export default function ActivityTracker() {
  const dispatch = useDispatch();
  const { filteredActivities, selectedRole, selectedAction, timeRange } = useSelector(state => state.activity);

  const handleRoleFilter = (role) => {
    dispatch(setRoleFilter(role === selectedRole ? 'all' : role));
  };

  const handleActionFilter = (action) => {
    dispatch(setActionFilter(action === selectedAction ? 'all' : action));
  };

  const handleTimeRangeFilter = (range) => {
    dispatch(setTimeRangeFilter(range));
  };

  const getUniqueRoles = () => {
    const roles = [...new Set(filteredActivities.map(activity => activity.role))];
    return roles;
  };

  const getUniqueActions = () => {
    const actions = [...new Set(filteredActivities.map(activity => activity.action))];
    return actions;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <FiActivity className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Activity Feed</h2>
        </div>
        
        {/* Filters */}
        <div className="space-y-3">
          {/* Time Range Filter */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Time Range</label>
            <div className="flex space-x-1">
              {[
                { key: '1d', label: '1D' },
                { key: '7d', label: '7D' },
                { key: '30d', label: '30D' },
                { key: 'all', label: 'All' }
              ].map((range) => (
                <button
                  key={range.key}
                  onClick={() => handleTimeRangeFilter(range.key)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    timeRange === range.key
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Filter by Role</label>
            <div className="flex flex-wrap gap-1">
              {getUniqueRoles().map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleFilter(role)}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    selectedRole === role
                      ? roleColors[role]
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-auto">
        {filteredActivities.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <FiClock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No activities found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-shadow"
              >
                {/* Activity Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{actionIcons[activity.action] || '📝'}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded border ${roleColors[activity.role]}`}>
                          {activity.role}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Details */}
                <div className="ml-7">
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium capitalize">{activity.action}</span>{' '}
                    <span className="font-medium text-gray-900">{activity.assetName}</span>
                  </p>
                  
                  {activity.details && (
                    <p className="text-xs text-gray-500 bg-gray-50 rounded p-2 mt-2">
                      {activity.details}
                    </p>
                  )}

                  {/* Asset Type Badge */}
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${
                      activity.assetType === 'image' ? 'bg-green-100 text-green-700' :
                      activity.assetType === 'video' ? 'bg-blue-100 text-blue-700' :
                      activity.assetType === '3d' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {activity.assetType === 'image' && '🖼️'}
                      {activity.assetType === 'video' && '🎥'}
                      {activity.assetType === '3d' && '📦'}
                      <span className="ml-1 capitalize">{activity.assetType}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Summary */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Total Activities:</span>
            <span className="font-medium">{filteredActivities.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Most Active Role:</span>
            <span className="font-medium">
              {getUniqueRoles().length > 0 ? getUniqueRoles()[0] : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Recent Actions:</span>
            <span className="font-medium">{getUniqueActions().length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
