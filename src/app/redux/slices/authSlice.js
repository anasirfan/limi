import { createSlice } from '@reduxjs/toolkit';

// Demo user accounts with different roles and permissions
const demoUsers = [
  {
    id: '1',
    email: 'admin@limi.com',
    password: 'admin123',
    name: 'System Admin',
    role: 'admin',
    department: 'IT',
    avatar: '/images/avatars/admin.jpg',
    permissions: ['all'],
    joinedAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-08-19T00:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    email: 'ceo@limi.com',
    password: 'ceo123',
    name: 'Emma Wilson',
    role: 'ceo',
    department: 'Executive',
    avatar: '/images/avatars/ceo.jpg',
    permissions: ['view_all', 'approve_assets', 'manage_users', 'view_analytics'],
    joinedAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-08-18T15:30:00Z',
    status: 'active'
  },
  {
    id: '3',
    email: 'cto@limi.com',
    password: 'cto123',
    name: 'David Chen',
    role: 'cto',
    department: 'Technology',
    avatar: '/images/avatars/cto.jpg',
    permissions: ['view_all', 'manage_assets', 'manage_users', 'view_analytics', 'system_settings'],
    joinedAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-08-18T18:45:00Z',
    status: 'active'
  },
  {
    id: '4',
    email: 'web.dev@limi.com',
    password: 'web123',
    name: 'Alex Thompson',
    role: 'web_developer',
    department: 'Web Development',
    avatar: '/images/avatars/web-dev.jpg',
    permissions: ['upload_assets', 'edit_assets', 'view_assets', 'manage_web_assets'],
    joinedAt: '2024-01-15T00:00:00Z',
    lastLogin: '2024-08-19T00:15:00Z',
    status: 'active'
  },
  {
    id: '5',
    email: 'vr.lead@limi.com',
    password: 'vr123',
    name: 'Sarah Rodriguez',
    role: 'vr_team_lead',
    department: 'VR Development',
    avatar: '/images/avatars/vr-lead.jpg',
    permissions: ['upload_assets', 'edit_assets', 'view_assets', 'manage_vr_assets', 'manage_team'],
    joinedAt: '2024-01-10T00:00:00Z',
    lastLogin: '2024-08-18T22:30:00Z',
    status: 'active'
  },
  {
    id: '6',
    email: 'vr.dev@limi.com',
    password: 'vrdev123',
    name: 'Mike Johnson',
    role: 'vr_developer',
    department: 'VR Development',
    avatar: '/images/avatars/vr-dev.jpg',
    permissions: ['upload_assets', 'edit_assets', 'view_assets'],
    joinedAt: '2024-02-01T00:00:00Z',
    lastLogin: '2024-08-18T20:00:00Z',
    status: 'active'
  },
  {
    id: '7',
    email: '3d.artist@limi.com',
    password: '3d123',
    name: 'Lisa Park',
    role: '3d_artist',
    department: '3D Design',
    avatar: '/images/avatars/3d-artist.jpg',
    permissions: ['upload_assets', 'edit_assets', 'view_assets', 'manage_3d_assets'],
    joinedAt: '2024-01-20T00:00:00Z',
    lastLogin: '2024-08-18T16:45:00Z',
    status: 'active'
  }
];

// Role definitions with hierarchical permissions
const roleDefinitions = {
  admin: {
    name: 'System Administrator',
    level: 100,
    color: 'red',
    description: 'Full system access and control',
    permissions: ['all']
  },
  ceo: {
    name: 'Chief Executive Officer',
    level: 90,
    color: 'purple',
    description: 'Executive oversight and approval authority',
    permissions: ['view_all', 'approve_assets', 'manage_users', 'view_analytics']
  },
  cto: {
    name: 'Chief Technology Officer',
    level: 85,
    color: 'blue',
    description: 'Technology leadership and system management',
    permissions: ['view_all', 'manage_assets', 'manage_users', 'view_analytics', 'system_settings']
  },
  vr_team_lead: {
    name: 'VR Team Lead',
    level: 70,
    color: 'green',
    description: 'VR development team leadership',
    permissions: ['upload_assets', 'edit_assets', 'view_assets', 'manage_vr_assets', 'manage_team']
  },
  web_developer: {
    name: 'Web Developer',
    level: 60,
    color: 'blue',
    description: 'Web development and frontend assets',
    permissions: ['upload_assets', 'edit_assets', 'view_assets', 'manage_web_assets']
  },
  vr_developer: {
    name: 'VR Developer',
    level: 50,
    color: 'green',
    description: 'VR content development',
    permissions: ['upload_assets', 'edit_assets', 'view_assets']
  },
  '3d_artist': {
    name: '3D Artist',
    level: 50,
    color: 'orange',
    description: '3D modeling and asset creation',
    permissions: ['upload_assets', 'edit_assets', 'view_assets', 'manage_3d_assets']
  }
};

const initialState = {
  currentUser: null,
  users: demoUsers,
  roleDefinitions,
  isAuthenticated: false,
  loginAttempts: 0,
  lastLoginAttempt: null,
  sessionExpiry: null,
  permissions: [],
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Authentication actions
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      const user = action.payload;
      state.currentUser = user;
      state.isAuthenticated = true;
      state.permissions = user.permissions;
      state.sessionExpiry = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(); // 8 hours
      state.loading = false;
      state.error = null;
      state.loginAttempts = 0;
      
      // Update last login
      const userIndex = state.users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        state.users[userIndex].lastLogin = new Date().toISOString();
      }
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loginAttempts += 1;
      state.lastLoginAttempt = new Date().toISOString();
    },

    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.permissions = [];
      state.sessionExpiry = null;
      state.error = null;
    },

    // User management actions (admin only)
    addUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now().toString(),
        joinedAt: new Date().toISOString(),
        lastLogin: null,
        status: 'active'
      };
      state.users.push(newUser);
    },

    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updates };
      }
    },

    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter(user => user.id !== id);
    },

    updateUserStatus: (state, action) => {
      const { id, status } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex].status = status;
      }
    },

    // Permission checks
    checkPermission: (state, action) => {
      const permission = action.payload;
      const user = state.currentUser;
      
      if (!user) return false;
      if (user.permissions.includes('all')) return true;
      return user.permissions.includes(permission);
    },

    // Session management
    extendSession: (state) => {
      if (state.isAuthenticated) {
        state.sessionExpiry = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
      }
    },

    checkSession: (state) => {
      if (state.sessionExpiry && new Date() > new Date(state.sessionExpiry)) {
        state.currentUser = null;
        state.isAuthenticated = false;
        state.permissions = [];
        state.sessionExpiry = null;
      }
    }
  }
});

// Helper functions
export const hasPermission = (state, permission) => {
  const user = state.auth.currentUser;
  if (!user) return false;
  if (user.permissions.includes('all')) return true;
  return user.permissions.includes(permission);
};

export const isAdmin = (state) => {
  return state.auth.currentUser?.role === 'admin';
};

export const isExecutive = (state) => {
  const role = state.auth.currentUser?.role;
  return ['admin', 'ceo', 'cto'].includes(role);
};

export const canManageUsers = (state) => {
  return hasPermission(state, 'manage_users') || hasPermission(state, 'all');
};

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  addUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  checkPermission,
  extendSession,
  checkSession
} = authSlice.actions;

export default authSlice.reducer;
