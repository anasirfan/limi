'use client';

import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import DashboardBuilder from './components/DashboardBuilder';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function ProtectedDashboardBuilder() {
  const { isAuthenticated, currentUser } = useSelector(state => state.auth);

  // if (!isAuthenticated || !currentUser) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading Dashboard Builder...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <DashboardBuilder />
      </div>
    </DndProvider>
  );
}

export default function DashboardBuilderPage() {
  return (
    <Provider store={store}>
      <ProtectedDashboardBuilder />
    </Provider>
  );
}
