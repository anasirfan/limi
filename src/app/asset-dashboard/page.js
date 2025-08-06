'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import AssetDashboard from './components/AssetDashboard';

export default function AssetDashboardPage() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <AssetDashboard />
      </div>
    </Provider>
  );
}
