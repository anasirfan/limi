import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load user from localStorage if available
const loadUserFromStorage = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const savedUser = localStorage.getItem('limiUser');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    return null;
  }
};

const savedUser = loadUserFromStorage();

const initialState = {
  isLoggedIn: !!savedUser,
  user: savedUser,
  registeredUsers: [],
  loginStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  signupStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  successMessage: null,
};

// Simulated async login thunk
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validation
      if (!credentials.email || !credentials.password) {
        return rejectWithValue('Please enter both email and password');
      }
      
      // Create user data
      const userData = {
        id: `user_${Date.now()}`,
        name: credentials.email.split('@')[0],
        email: credentials.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.email.split('@')[0])}&background=50C878&color=fff`
      };
      
      // Save to localStorage
      localStorage.setItem('limiUser', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Simulated async signup thunk
export const signupUser = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue, getState }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validation
      if (!userData.email || !userData.password || !userData.name) {
        return rejectWithValue('Please fill in all required fields');
      }
      
      // Check if email already exists
      const state = getState();
      const existingUser = state.user.registeredUsers.find(
        user => user.email === userData.email
      );
      
      if (existingUser) {
        return rejectWithValue('Email already registered');
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        password: userData.password, // In a real app, this would be hashed
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=50C878&color=fff`
      };
      
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.loginStatus = 'succeeded';
      state.error = null;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('limiUser', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.loginStatus = 'idle';
      state.error = null;
      
      // Remove from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('limiUser');
      }
    },
    clearAuthStatus: (state) => {
      state.loginStatus = 'idle';
      state.signupStatus = 'idle';
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.loginStatus = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.error = action.payload || 'Login failed';
      })
      
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.signupStatus = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.registeredUsers.push(action.payload);
        state.signupStatus = 'succeeded';
        state.successMessage = 'Account created successfully! Please log in.';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupStatus = 'failed';
        state.error = action.payload || 'Signup failed';
      });
  },
});

export const { login, logout, clearAuthStatus } = userSlice.actions;

export default userSlice.reducer;
