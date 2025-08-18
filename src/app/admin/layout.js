'use client';

import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
  FiUsers, 
  FiImage, 
  FiSettings, 
  FiBarChart, 
  FiShield, 
  FiUserPlus,
  FiUpload,
  FiDatabase,
  FiActivity
} from 'react-icons/fi';

const adminNavItems = [
  {
    title: 'User Management',
    icon: FiUsers,
    href: '/admin/users',
    children: [
      { title: 'All Users', href: '/admin/users', icon: FiUsers },
      { title: 'Add User', href: '/admin/users/add', icon: FiUserPlus },
      { title: 'Roles & Permissions', href: '/admin/users/roles', icon: FiShield }
    ]
  },
  {
    title: 'Asset Management',
    icon: FiImage,
    href: '/admin/assets',
    children: [
      { title: 'All Assets', href: '/admin/assets', icon: FiImage },
      { title: 'Bulk Upload', href: '/admin/assets/upload', icon: FiUpload },
      { title: 'Storage Settings', href: '/admin/assets/storage', icon: FiDatabase }
    ]
  },
  {
    title: 'Analytics',
    icon: FiBarChart,
    href: '/admin/analytics',
    children: [
      { title: 'Usage Analytics', href: '/admin/analytics', icon: FiBarChart },
      { title: 'User Activity', href: '/admin/analytics/activity', icon: FiActivity }
    ]
  },
  {
    title: 'System Settings',
    icon: FiSettings,
    href: '/admin/settings',
    children: [
      { title: 'General Settings', href: '/admin/settings', icon: FiSettings },
      { title: 'Security', href: '/admin/settings/security', icon: FiShield }
    ]
  }
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    // Check if user has admin privileges
    if (!currentUser?.permissions?.includes('all') && 
        !currentUser?.permissions?.includes('manage_users')) {
      router.push('/asset-dashboard');
      return;
    }
  }, [isAuthenticated, currentUser, router]);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const hasAdminAccess = currentUser.permissions?.includes('all') || 
                        currentUser.permissions?.includes('manage_users');

  if (!hasAdminAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiShield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access the admin panel.</p>
          <Link
            href="/asset-dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <FiShield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-600">{currentUser.name}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                  
                  {/* Sub-navigation */}
                  {isActive && item.children && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildActive = pathname === child.href;
                        
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                              isChildActive
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <ChildIcon className="w-4 h-4 mr-2" />
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="space-y-2">
            <Link
              href="/asset-dashboard"
              className="block w-full text-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/admin/users/add"
              className="block w-full text-center px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              Add New User
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {adminNavItems.find(item => pathname.startsWith(item.href))?.title || 'Admin Panel'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage users, assets, and system settings
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Logged in as <span className="font-medium">{currentUser.name}</span>
              </div>
              <div className={`px-2 py-1 text-xs rounded-full ${
                currentUser.role === 'admin' ? 'bg-red-100 text-red-700' :
                currentUser.role === 'ceo' ? 'bg-purple-100 text-purple-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {currentUser.role.toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
