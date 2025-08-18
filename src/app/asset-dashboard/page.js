'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import AssetDashboard from './components/AssetDashboard';

function ProtectedAssetDashboard() {
  const router = useRouter();
  const { isAuthenticated, currentUser } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
  }, [isAuthenticated, router]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <AssetDashboard />
    </div>
  );
}

export default function AssetDashboardPage() {
  return (
    <Provider store={store}>
      <ProtectedAssetDashboard />
    </Provider>
  );
}
