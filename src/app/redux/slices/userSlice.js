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

// Save user to localStorage
const saveUserToStorage = (user) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('limiUser', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

const savedUser = loadUserFromStorage();

// Default user data structure with mock data
const defaultUserData = {
  id: '',
  name: '',
  email: '',
  phone: '',
  avatar: '',
  notifications: {
    email: true,
    sms: false,
    app: true
  },
  addresses: [],
  paymentMethods: [],
  savedConfigurations: []
};

// Merge saved user with default structure to ensure all fields exist
const mergedUser = savedUser ? {
  ...defaultUserData,
  ...savedUser,
  // Ensure nested objects exist
  notifications: {
    ...defaultUserData.notifications,
    ...(savedUser.notifications || {})
  },
  addresses: savedUser.addresses || [],
  paymentMethods: savedUser.paymentMethods || [],
  savedConfigurations: savedUser.savedConfigurations || []
} : null;

const initialState = {
  isLoggedIn: !!mergedUser,
  user: mergedUser,
  registeredUsers: [],
  loginStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  signupStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  successMessage: null,
};

// Real API login thunk
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Validation
      if (!credentials.email || !credentials.password) {
        return rejectWithValue('Please enter both email and password');
      }
      
      // Make API request
      const response = await fetch('https://api1.limitless-lighting.co.uk/client/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Save token to localStorage
      if (data.token) {
        localStorage.setItem('limiToken', data.token);
      }
      
      // Get user profile with token
      const profileResponse = await fetch('https://api1.limitless-lighting.co.uk/client/user/profile', {
        headers: {
          'Authorization': `${data.token}`
        }
      });
      
      if (!profileResponse.ok) {
        return rejectWithValue('Failed to fetch user profile');
      }
      
      const userData = await profileResponse.json();
      console.log("userData : ",userData);
      
      // Save to localStorage
      saveUserToStorage(userData);
      
      return userData;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Real API signup thunk
export const signupUser = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue }) => {

    console.log("in userSlice : ",userData);
    try {
      // Validation
      if (!userData.email || !userData.password || !userData.name) {
        return rejectWithValue('Please fill in all required fields');
      }
      
      // Make API request
      const response = await fetch('https://api1.limitless-lighting.co.uk/client/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Signup failed');
      }
      
      const data = await response.json();
      console.log("data : ",data);
      
      // Auto login after successful signup
      const loginResponse = await fetch('https://api1.limitless-lighting.co.uk/client/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        }),
      });
      
      if (!loginResponse.ok) {
        return rejectWithValue('Account created but login failed');
      }
      
      const loginData = await loginResponse.json();
      
      // Save token to localStorage
      if (loginData.token) {
        localStorage.setItem('limiToken', loginData.token);
      }
      console.log("loginData : ",loginData);
      // Get user profile
      const profileResponse = await fetch('https://api1.limitless-lighting.co.uk/client/user/profile', {
        headers: {
          'Authorization': `${loginData.token}`
        }
      });

      if (!profileResponse.ok) {
        return rejectWithValue('Account created but failed to fetch profile');
      }

      const newUser = await profileResponse.json();
      console.log("newUser : ",newUser);
      // Save to localStorage
      saveUserToStorage(newUser);
      
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);

// Update user profile with real API
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      // Get current user and token
      const { user } = getState().user;
      const token = localStorage.getItem('limiToken');
      
      if (!user || !token) {
        return rejectWithValue('User not logged in');
      }
      
      // Make API request
      const response = await fetch('/client/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Profile update failed');
      }
      
      // Get updated profile
      const profileResponse = await fetch('/client/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!profileResponse.ok) {
        return rejectWithValue('Failed to fetch updated profile');
      }
      
      const updatedUser = await profileResponse.json();
      
      // Save to localStorage
      saveUserToStorage(updatedUser);
      
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message || 'Profile update failed');
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
      saveUserToStorage(action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.loginStatus = 'idle';
      state.error = null;
      
      // Clear user from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('limiUser');
      }
    },
    clearAuthStatus(state) {
      state.loginStatus = 'idle';
      state.signupStatus = 'idle';
      state.error = null;
      state.successMessage = null;
    },
    updatePersonalInfo(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        };
        saveUserToStorage(state.user);
      }
    },
    updateNotificationPreferences(state, action) {
      if (state.user) {
        state.user.notifications = {
          ...state.user.notifications,
          ...action.payload
        };
        saveUserToStorage(state.user);
      }
    },
    addAddress(state, action) {
      if (state.user) {
        const newAddress = {
          id: `addr-${Date.now()}`,
          default: state.user.addresses.length === 0, // First address is default
          ...action.payload
        };
        
        state.user.addresses.push(newAddress);
        saveUserToStorage(state.user);
      }
    },
    updateAddress(state, action) {
      if (state.user) {
        const { id, ...addressData } = action.payload;
        state.user.addresses = state.user.addresses.map(addr => 
          addr.id === id ? { ...addr, ...addressData } : addr
        );
        saveUserToStorage(state.user);
      }
    },
    removeAddress(state, action) {
      if (state.user) {
        const addressId = action.payload;
        const removedAddress = state.user.addresses.find(addr => addr.id === addressId);
        
        state.user.addresses = state.user.addresses.filter(addr => addr.id !== addressId);
        
        // If we removed the default address and there are other addresses, make the first one default
        if (removedAddress?.default && state.user.addresses.length > 0) {
          state.user.addresses[0].default = true;
        }
        
        saveUserToStorage(state.user);
      }
    },
    setDefaultAddress(state, action) {
      if (state.user) {
        const addressId = action.payload;
        state.user.addresses = state.user.addresses.map(addr => ({
          ...addr,
          default: addr.id === addressId
        }));
        saveUserToStorage(state.user);
      }
    },
    addPaymentMethod(state, action) {
      if (state.user) {
        const newPaymentMethod = {
          id: `card-${Date.now()}`,
          default: state.user.paymentMethods.length === 0, // First payment method is default
          ...action.payload
        };
        
        state.user.paymentMethods.push(newPaymentMethod);
        saveUserToStorage(state.user);
      }
    },
    updatePaymentMethod(state, action) {
      if (state.user) {
        const { id, ...paymentData } = action.payload;
        state.user.paymentMethods = state.user.paymentMethods.map(method => 
          method.id === id ? { ...method, ...paymentData } : method
        );
        saveUserToStorage(state.user);
      }
    },
    removePaymentMethod(state, action) {
      if (state.user) {
        const paymentId = action.payload;
        const removedMethod = state.user.paymentMethods.find(method => method.id === paymentId);
        
        state.user.paymentMethods = state.user.paymentMethods.filter(method => method.id !== paymentId);
        
        // If we removed the default payment method and there are others, make the first one default
        if (removedMethod?.default && state.user.paymentMethods.length > 0) {
          state.user.paymentMethods[0].default = true;
        }
        
        saveUserToStorage(state.user);
      }
    },
    setDefaultPaymentMethod: (state, action) => {
      const id = action.payload;
      
      if (state.user) {
        state.user.paymentMethods = state.user.paymentMethods.map(method => ({
          ...method,
          isDefault: method.id === id
        }));
        
        // Save to localStorage
        saveUserToStorage(state.user);
      }
    },
    saveConfiguration: (state, action) => {
      const configData = action.payload;
      
      if (state.user) {
        // Generate a unique ID for the configuration
        const configId = `config_${Date.now()}`;
        
        // Add the configuration to the user's saved configurations
        state.user.savedConfigurations = [
          {
            id: configId,
            name: configData.name || `Configuration ${state.user.savedConfigurations.length + 1}`,
            date: new Date().toISOString(),
            configuration: configData,
            thumbnail: configData.thumbnail || '/images/default-config-thumbnail.jpg'
          },
          ...state.user.savedConfigurations
        ];
        
        // Save to localStorage
        saveUserToStorage(state.user);
      }
    },
    removeSavedConfiguration: (state, action) => {
      const configId = action.payload;
      
      if (state.user && state.user.savedConfigurations) {
        state.user.savedConfigurations = state.user.savedConfigurations.filter(
          config => config.id !== configId
        );
        
        // Save to localStorage
        saveUserToStorage(state.user);
      }
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

export const { 
  login, 
  logout, 
  clearAuthStatus, 
  updatePersonalInfo, 
  updateNotificationPreferences, 
  addAddress, 
  updateAddress, 
  removeAddress, 
  setDefaultAddress, 
  addPaymentMethod, 
  updatePaymentMethod, 
  removePaymentMethod, 
  setDefaultPaymentMethod,
  saveConfiguration,
  removeSavedConfiguration
} = userSlice.actions;

export default userSlice.reducer;
