import { createSlice } from '@reduxjs/toolkit';

// Mock activity data with role-based logs
const mockActivities = [
  {
    id: '1',
    user: 'Sarah Chen',
    role: '3D Team',
    action: 'uploaded',
    assetName: 'pendant-light-v2.glb',
    assetType: '3d',
    timestamp: '2024-02-02T15:45:00Z',
    details: 'Added new pendant light model with improved geometry'
  },
  {
    id: '2',
    user: 'Mike Rodriguez',
    role: 'VR Team',
    action: 'replaced',
    assetName: 'ambient-lighting-demo.mp4',
    assetType: 'video',
    timestamp: '2024-01-30T09:15:00Z',
    details: 'Updated demo video with better lighting effects'
  },
  {
    id: '3',
    user: 'Alex Thompson',
    role: 'Frontend Dev',
    action: 'renamed',
    assetName: 'hero-banner-main.jpg',
    assetType: 'image',
    timestamp: '2024-01-28T14:22:00Z',
    details: 'Renamed from hero-banner-old.jpg for better organization'
  },
  {
    id: '4',
    user: 'Emma Wilson',
    role: 'CEO',
    action: 'approved',
    assetName: 'brand-logo-white.svg',
    assetType: 'image',
    timestamp: '2024-01-25T11:30:00Z',
    details: 'Approved final brand logo for production use'
  },
  {
    id: '5',
    user: 'David Kim',
    role: '3D Team',
    action: 'uploaded',
    assetName: 'ceiling-lamp-model.glb',
    assetType: '3d',
    timestamp: '2024-01-22T16:20:00Z',
    details: 'Initial upload of ceiling lamp 3D model'
  },
  {
    id: '6',
    user: 'Lisa Park',
    role: 'Backend Dev',
    action: 'optimized',
    assetName: 'product-showcase.mp4',
    assetType: 'video',
    timestamp: '2024-01-20T13:45:00Z',
    details: 'Compressed video file to reduce loading time'
  },
  {
    id: '7',
    user: 'Alex Thompson',
    role: 'Frontend Dev',
    action: 'tagged',
    assetName: 'hero-banner-main.jpg',
    assetType: 'image',
    timestamp: '2024-01-18T10:15:00Z',
    details: 'Added tags: hero, banner, homepage'
  },
  {
    id: '8',
    user: 'Mike Rodriguez',
    role: 'VR Team',
    action: 'uploaded',
    assetName: 'product-showcase.mp4',
    assetType: 'video',
    timestamp: '2024-01-18T09:15:00Z',
    details: 'Initial upload of product showcase video'
  }
];

const initialState = {
  activities: mockActivities,
  filteredActivities: mockActivities,
  selectedRole: 'all',
  selectedAction: 'all',
  timeRange: '7d' // '1d', '7d', '30d', 'all'
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    // Add new activity
    addActivity: (state, action) => {
      const newActivity = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      state.activities.unshift(newActivity);
      state.filteredActivities = filterActivities(state);
    },

    // Filter by role
    setRoleFilter: (state, action) => {
      state.selectedRole = action.payload;
      state.filteredActivities = filterActivities(state);
    },

    // Filter by action type
    setActionFilter: (state, action) => {
      state.selectedAction = action.payload;
      state.filteredActivities = filterActivities(state);
    },

    // Filter by time range
    setTimeRangeFilter: (state, action) => {
      state.timeRange = action.payload;
      state.filteredActivities = filterActivities(state);
    },

    // Clear all filters
    clearActivityFilters: (state) => {
      state.selectedRole = 'all';
      state.selectedAction = 'all';
      state.timeRange = '7d';
      state.filteredActivities = filterActivities(state);
    }
  }
});

// Helper function to filter activities
function filterActivities(state) {
  let filtered = state.activities;

  // Filter by role
  if (state.selectedRole !== 'all') {
    filtered = filtered.filter(activity => activity.role === state.selectedRole);
  }

  // Filter by action
  if (state.selectedAction !== 'all') {
    filtered = filtered.filter(activity => activity.action === state.selectedAction);
  }

  // Filter by time range
  if (state.timeRange !== 'all') {
    const now = new Date();
    const timeRangeMs = {
      '1d': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };

    const cutoffTime = new Date(now.getTime() - timeRangeMs[state.timeRange]);
    filtered = filtered.filter(activity => new Date(activity.timestamp) >= cutoffTime);
  }

  return filtered;
}

export const {
  addActivity,
  setRoleFilter,
  setActionFilter,
  setTimeRangeFilter,
  clearActivityFilters
} = activitySlice.actions;

export default activitySlice.reducer;
