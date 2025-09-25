import { useState, useEffect } from 'react';
import { 
  onDataRefresh, 
  getSystemAssignments,
  getPendantAssignments,
  getBallAssignments,
  getBarAssignments,
  getUniversalAssignments,
  getChandelierAssignments,
  refreshSystemAssignments,
  forceRefreshSystemAssignments,
  isDataStale
} from '../pendantSystemData';

// Hook for system assignments with auto-refresh
export const useSystemAssignments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const assignments = await getSystemAssignments();
      setData(assignments);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Error loading system assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadData();

    // Subscribe to data refresh events
    const unsubscribe = onDataRefresh((newData) => {
      console.log('🔄 useSystemAssignments: Data refreshed automatically');
      setData(newData.filter(assignment => assignment.isShow === true));
      setLastUpdated(new Date());
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh: refreshSystemAssignments,
    forceRefresh: forceRefreshSystemAssignments,
    isStale: isDataStale()
  };
};

// Hook for pendant assignments specifically
export const usePendantAssignments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const assignments = await getPendantAssignments();
      setData(assignments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const unsubscribe = onDataRefresh(async () => {
      console.log('🔄 usePendantAssignments: Data refreshed automatically');
      const newData = await getPendantAssignments();
      setData(newData);
    });

    return unsubscribe;
  }, []);

  return { data, loading, error, refresh: loadData };
};

// Hook for chandelier assignments specifically
export const useChandelierAssignments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const assignments = await getChandelierAssignments();
      setData(assignments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const unsubscribe = onDataRefresh(async () => {
      console.log('🔄 useChandelierAssignments: Data refreshed automatically');
      const newData = await getChandelierAssignments();
      setData(newData);
    });

    return unsubscribe;
  }, []);

  return { data, loading, error, refresh: loadData };
};

// Hook for system assignments by type
export const useSystemAssignmentsByType = (systemType) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      let assignments;
      
      switch (systemType) {
        case 'bar':
          assignments = await getBarAssignments();
          break;
        case 'ball':
          assignments = await getBallAssignments();
          break;
        case 'universal':
          assignments = await getUniversalAssignments();
          break;
        case 'chandelier':
          assignments = await getChandelierAssignments();
          break;
        default:
          assignments = await getSystemAssignments();
      }
      
      setData(assignments);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const unsubscribe = onDataRefresh(async () => {
      console.log(`🔄 useSystemAssignmentsByType(${systemType}): Data refreshed automatically`);
      await loadData();
    });

    return unsubscribe;
  }, [systemType]);

  return { data, loading, error, refresh: loadData };
};
