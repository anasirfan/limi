'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import { FiEye, FiEyeOff, FiUser, FiLock, FiArrowRight } from 'react-icons/fi';

const demoAccounts = [
  {
    email: 'admin@limi.com',
    password: 'admin123',
    name: 'System Admin',
    role: 'admin',
    color: 'bg-red-500',
    description: 'Full system access'
  },
  {
    email: 'ceo@limi.com',
    password: 'ceo123',
    name: 'Emma Wilson',
    role: 'ceo',
    color: 'bg-purple-500',
    description: 'Executive oversight'
  },
  {
    email: 'cto@limi.com',
    password: 'cto123',
    name: 'David Chen',
    role: 'cto',
    color: 'bg-blue-500',
    description: 'Technology leadership'
  },
  {
    email: 'vr.lead@limi.com',
    password: 'vr123',
    name: 'Sarah Rodriguez',
    role: 'vr_team_lead',
    color: 'bg-green-500',
    description: 'VR Team Lead'
  },
  {
    email: 'web.dev@limi.com',
    password: 'web123',
    name: 'Alex Thompson',
    role: 'web_developer',
    color: 'bg-blue-400',
    description: 'Web Developer'
  }
];

function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    dispatch(loginStart());
    
    // Simulate API call delay
    setTimeout(() => {
      const user = findUser(email, password);
      
      if (user) {
        dispatch(loginSuccess(user));
        router.push('/asset-dashboard');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    }, 1000);
  };

  const findUser = (email, password) => {
    const users = [
      {
        id: '1',
        email: 'admin@limi.com',
        password: 'admin123',
        name: 'System Admin',
        role: 'admin',
        department: 'IT',
        permissions: ['all']
      },
      {
        id: '2',
        email: 'ceo@limi.com',
        password: 'ceo123',
        name: 'Emma Wilson',
        role: 'ceo',
        department: 'Executive',
        permissions: ['view_all', 'approve_assets', 'manage_users', 'view_analytics']
      },
      {
        id: '3',
        email: 'cto@limi.com',
        password: 'cto123',
        name: 'David Chen',
        role: 'cto',
        department: 'Technology',
        permissions: ['view_all', 'manage_assets', 'manage_users', 'view_analytics', 'system_settings']
      },
      {
        id: '4',
        email: 'web.dev@limi.com',
        password: 'web123',
        name: 'Alex Thompson',
        role: 'web_developer',
        department: 'Web Development',
        permissions: ['upload_assets', 'edit_assets', 'view_assets', 'manage_web_assets']
      },
      {
        id: '5',
        email: 'vr.lead@limi.com',
        password: 'vr123',
        name: 'Sarah Rodriguez',
        role: 'vr_team_lead',
        department: 'VR Development',
        permissions: ['upload_assets', 'edit_assets', 'view_assets', 'manage_vr_assets', 'manage_team']
      }
    ];
    
    return users.find(u => u.email === email && u.password === password);
  };

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setShowDemoAccounts(false);
    
    // Auto-submit after setting credentials
    setTimeout(() => {
      const user = findUser(account.email, account.password);
      if (user) {
        dispatch(loginStart());
        setTimeout(() => {
          dispatch(loginSuccess(user));
          router.push('/asset-dashboard');
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Limi</h1>
          <p className="text-gray-600">Asset Management Dashboard</p>
        </div>

        {/* Demo Accounts */}
        {showDemoAccounts && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Accounts</h3>
            <div className="space-y-3">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => handleDemoLogin(account)}
                  className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className={`w-10 h-10 ${account.color} rounded-full flex items-center justify-center text-white font-semibold mr-3`}>
                    {account.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.description}</div>
                  </div>
                  <FiArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowDemoAccounts(false)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Or login manually
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {!showDemoAccounts && (
            <button
              onClick={() => setShowDemoAccounts(true)}
              className="text-sm text-blue-600 hover:text-blue-700 mb-4"
            >
              ← Back to demo accounts
            </button>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              This is a demo environment. Use the demo accounts above or any valid credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
}
