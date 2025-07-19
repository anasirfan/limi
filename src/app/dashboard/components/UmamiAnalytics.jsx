import React, { useState, useEffect } from 'react';

const UmamiAnalytics = ({ investors = { VCFirmData: [], AngelInvestorData: [] } }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInvestor, setSelectedInvestor] = useState('all');
  const [filteredStats, setFilteredStats] = useState(null);

  // Umami API configuration from environment variables
  const UMAMI_API_URL = process.env.UMAMI_API_URL || 'https://api.umami.is/v1';
  const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || 'd1ff84bb-5098-45e2-b135-568ef7264eff';
  const API_KEY = process.env.UMAMI_API_KEY || 'api_08gPcyjfrwopTUEG9H11K4rQ3Zi8KevG';
  const IS_LOCALHOST = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Helper function to transform Umami events data
  const transformEventsData = (eventsResponse) => {
    const eventMap = {
      'resource_resourceA_click': 'Resource A (1-Pager)',
      'resource_resourceB_click': 'Resource B (Pitch Deck)',
      'resource_resourceC_click': 'Resource C (Podcast)',
      'resource_resourceD_click': 'Resource D (Deep-Dive)',
      'cta_book_call_click': 'Book Call CTA',
      'website_visit_click': 'Website Visit',
      'investor_page_view': 'Page Views'
    };
    
    const breakdown = {};
    const eventsData = eventsResponse.data || [];
    
    console.log('Processing events data:', eventsData);
    
    // Count events by name
    const eventCounts = {};
    eventsData.forEach(event => {
      if (event.eventName) {
        // Count both custom events (eventType 2) and page views (eventType 1)
        eventCounts[event.eventName] = (eventCounts[event.eventName] || 0) + 1;
      }
    });
    
    console.log('Event counts:', eventCounts);
    
    // Return both original event names (for dashboard access) and display names
    Object.keys(eventCounts).forEach(eventName => {
      // Keep original event name for dashboard access
      breakdown[eventName] = eventCounts[eventName];
      // Also add display name if different
      const displayName = eventMap[eventName];
      if (displayName && displayName !== eventName) {
        breakdown[displayName] = eventCounts[eventName];
      }
    });
    
    console.log('Final breakdown:', breakdown);
    return breakdown;
  };
  
  // Helper function to analyze session durations from events
  const analyzeSessionDurations = (eventsResponse) => {
    const eventsData = eventsResponse.data || [];
    const sessionDurations = {
      '5s+': 0,
      '30s+': 0,
      '1m+': 0,
      '2m+': 0,
      '5m+': 0
    };
    
    eventsData.forEach(event => {
      if (event.eventType === 2 && event.eventName) {
        switch (event.eventName) {
          case 'session_5s':
            sessionDurations['5s+']++;
            break;
          case 'session_30s':
            sessionDurations['30s+']++;
            break;
          case 'session_60s':
            sessionDurations['1m+']++;
            break;
          case 'session_120s':
            sessionDurations['2m+']++;
            break;
          case 'session_300s':
            sessionDurations['5m+']++;
            break;
        }
      }
    });
    
    return sessionDurations;
  };
  
  // Helper function to get top investor pages
  const getTopInvestorPages = (eventsResponse) => {
    const eventsData = eventsResponse.data || [];
    const pageCounts = {};
    
    eventsData.forEach(event => {
      if (event.urlPath && event.urlPath.startsWith('/investors/') && event.eventType === 1) { // eventType 1 = page views
        const investorSlug = event.urlPath.replace('/investors/', '');
        pageCounts[investorSlug] = (pageCounts[investorSlug] || 0) + 1;
      }
    });
    
    // Convert to array and sort by count
    return Object.entries(pageCounts)
      .map(([slug, count]) => ({ investor: slug, views: count }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5); // Top 5
  };

  // Get all investors for filter dropdown
  const allInvestors = [...(investors.VCFirmData || []), ...(investors.AngelInvestorData || [])];

  // Mock data for demonstration (replace with actual API calls)
  const mockStats = {
    totalPageViews: 247,
    uniqueVisitors: 189,
    averageSessionTime: '2m 34s',
    topInvestors: [
      { slug: 'sequoia-capital', name: 'Sequoia Capital', views: 45, avgTime: '3m 12s', type: 'VC' },
      { slug: 'andreessen-horowitz', name: 'Andreessen Horowitz', views: 38, avgTime: '2m 45s', type: 'VC' },
      { slug: 'john-doe-angel', name: 'John Doe', views: 32, avgTime: '1m 58s', type: 'Angel' },
      { slug: 'accel-partners', name: 'Accel Partners', views: 28, avgTime: '2m 21s', type: 'VC' },
    ],
    eventBreakdown: {
      'investor_page_view': 247,
      'resource_resourceA_click': 89,
      'resource_resourceB_click': 76,
      'resource_resourceC_click': 45,
      'resource_resourceD_click': 67,
      'cta_book_call_click': 34,
      'website_visit_click': 52,
      'session_30s': 198,
      'session_60s': 145,
      'session_120s': 89,
      'session_300s': 23
    },
    sessionDurations: {
      '5s+': 247,
      '30s+': 198,
      '1m+': 145,
      '2m+': 89,
      '5m+': 23
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Try to fetch real data first (if API key is available)
        // Allow testing on localhost for development
        if (API_KEY && API_KEY !== 'your_api_key_here') {
          console.log('Attempting to fetch real Umami data:', {
            apiUrl: UMAMI_API_URL,
            websiteId: WEBSITE_ID,
            hasApiKey: !!API_KEY,
            isLocalhost: IS_LOCALHOST
          });
          
          // Calculate date range (last 2 months)
          const endAt = Date.now();
          const startAt = endAt - (60 * 24 * 60 * 60 * 1000); // 2 months ago (60 days)
          const timezone = 'UTC';
          const unit = 'day';
          
          const apiUrl = `${UMAMI_API_URL}/websites/${WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}&unit=${unit}&timezone=${timezone}`;
          console.log('API URL:', apiUrl);
          
          try {
            const response = await fetch(apiUrl, {
              headers: {
                'x-umami-api-key': API_KEY,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              const realData = await response.json();
              console.log('Real Umami stats received:', realData);
              
              // Also fetch events data
              const eventsUrl = `${UMAMI_API_URL}/websites/${WEBSITE_ID}/events?startAt=${startAt}&endAt=${endAt}&unit=${unit}&timezone=${timezone}`;
              const eventsResponse = await fetch(eventsUrl, {
                headers: {
                  'x-umami-api-key': API_KEY,
                  'Content-Type': 'application/json'
                }
              });
              
              let eventsData = null;
              if (eventsResponse.ok) {
                eventsData = await eventsResponse.json();
                console.log('Real Umami events received:', eventsData);
              }
              
              // Transform real data to match our expected format
              const transformedStats = {
                totalPageViews: realData.pageviews?.value || 0,
                uniqueVisitors: realData.visitors?.value || 0,
                totalSessions: realData.visits?.value || 0,
                avgSessionTime: realData.totaltime?.value && realData.visits?.value ? 
                  Math.round(realData.totaltime.value / realData.visits.value) : 0,
                
                // Transform events data
                eventBreakdown: eventsData ? transformEventsData(eventsData) : {},
                
                // Analyze session durations from events
                sessionDurations: eventsData ? analyzeSessionDurations(eventsData) : {
                  '5s+': 0, '30s+': 0, '1m+': 0, '2m+': 0, '5m+': 0
                },
                
                // Get top investor pages
                topInvestors: eventsData ? getTopInvestorPages(eventsData) : []
              };
              
              console.log('Transformed stats:', transformedStats);
              setStats(transformedStats);
              setLoading(false);
              return;
            } else {
              console.error('Umami API response not OK:', response.status, response.statusText);
            }
          } catch (apiError) {
            console.error('Umami API Error:', {
              error: apiError.message,
              url: `${UMAMI_API_URL}/websites/${WEBSITE_ID}/stats`,
              websiteId: WEBSITE_ID,
              hasApiKey: !!API_KEY
            });
            console.warn('Failed to fetch real Umami data, falling back to mock data:', apiError);
          }
        }
        
        // Fallback to mock data
        setTimeout(() => {
          setStats(mockStats);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch analytics data');
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedInvestor]);

  // Filter stats based on selected investor
  useEffect(() => {
    if (!stats) return;

    if (selectedInvestor === 'all') {
      setFilteredStats(stats);
    } else {
      // Filter data for specific investor
      const investorData = stats.topInvestors?.find(inv => inv.investor === selectedInvestor);
      if (investorData) {
        setFilteredStats({
          totalPageViews: investorData.views,
          uniqueVisitors: investorData.views, // Simplified for now
          totalSessions: investorData.views,
          avgSessionTime: stats.avgSessionTime, // Use overall average
          topInvestors: [{ investor: investorData.investor, views: investorData.views }],
          eventBreakdown: stats.eventBreakdown, // Show all events for now
          sessionDurations: stats.sessionDurations // Show all session data for now
        });
      } else {
        // No data for this investor yet
        setFilteredStats({
          totalPageViews: 0,
          uniqueVisitors: 0,
          totalSessions: 0,
          avgSessionTime: 0,
          topInvestors: [],
          eventBreakdown: {},
          sessionDurations: {
            '5s+': 0,
            '30s+': 0,
            '1m+': 0,
            '2m+': 0,
            '5m+': 0
          }
        });
      }
    }
  }, [stats, selectedInvestor]);

  if (loading) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-[#292929] rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-[#292929] rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-[#292929] rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg p-6">
        <div className="text-red-400 text-center">
          <p className="text-xl font-amenti mb-2">Analytics Error</p>
          <p>{error}</p>
          <p className="text-sm mt-2 text-gray-400">
            Note: This is a demo component. In production, connect to Umami API.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-amenti text-emerald-400">Investor Portal Analytics</h2>
        <div className="flex items-center space-x-4">
          {/* Investor Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-400">Filter by Investor:</label>
            <select 
              value={selectedInvestor} 
              onChange={(e) => setSelectedInvestor(e.target.value)}
              className="bg-[#1e1e1e] border border-emerald-600/30 rounded-lg px-3 py-1 text-emerald-300 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Investors</option>
              {allInvestors.map(investor => (
                <option key={investor.slug} value={investor.slug}>
                  {investor.name} ({investor.slug})
                </option>
              ))}
            </select>
          </div>
          {/* Environment Status */}
          <div className="flex items-center space-x-2 text-sm">
            {IS_LOCALHOST ? (
              <>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-400">Localhost - Mock Data</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400">Live Umami Data</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mock Data Warning for Localhost */}
      {IS_LOCALHOST && (
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-yellow-400 text-xl">⚠️</div>
              <div>
                <h3 className="text-yellow-400 font-amenti text-lg">Development Mode</h3>
                <p className="text-yellow-200 text-sm mt-1">
                  You're viewing mock data for development. Check console for API debugging info.
                </p>
                <p className="text-yellow-300 text-xs mt-2">
                  <strong>API Status:</strong> {API_KEY ? 'API Key Configured' : 'No API Key'}
                </p>
              </div>
            </div>
            {API_KEY && (
              <button
                onClick={() => window.location.reload()}
                className="bg-yellow-600 hover:bg-yellow-700 text-black px-3 py-1 rounded text-sm font-medium transition"
              >
                Test API
              </button>
            )}
          </div>
        </div>
      )}

      {/* Selected Investor Info */}
      {selectedInvestor !== 'all' && (
        <div className="bg-emerald-900/20 border border-emerald-600/30 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="text-emerald-400 text-xl">🎯</div>
            <div>
              <h3 className="text-emerald-400 font-amenti text-lg">
                Viewing Analytics for: {allInvestors.find(inv => inv.slug === selectedInvestor)?.name || selectedInvestor}
              </h3>
              <p className="text-emerald-200 text-sm mt-1">
                Individual investor engagement metrics and behavior analysis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1e1e1e] rounded-lg p-4 border border-emerald-900/30">
          <div className="text-2xl font-bold text-emerald-400">{filteredStats?.totalPageViews || 0}</div>
          <div className="text-sm text-gray-400">{selectedInvestor === 'all' ? 'Total Page Views' : 'Page Views'}</div>
        </div>
        <div className="bg-[#1e1e1e] rounded-lg p-4 border border-emerald-900/30">
          <div className="text-2xl font-bold text-emerald-400">{filteredStats?.uniqueVisitors || 0}</div>
          <div className="text-sm text-gray-400">{selectedInvestor === 'all' ? 'Unique Visitors' : 'Sessions'}</div>
        </div>
        <div className="bg-[#1e1e1e] rounded-lg p-4 border border-emerald-900/30">
          <div className="text-2xl font-bold text-emerald-400">{filteredStats?.averageSessionTime || '0s'}</div>
          <div className="text-sm text-gray-400">Avg Session Time</div>
        </div>
        <div className="bg-[#1e1e1e] rounded-lg p-4 border border-emerald-900/30">
          <div className="text-2xl font-bold text-emerald-400">{filteredStats?.eventBreakdown?.cta_book_call_click || 0}</div>
          <div className="text-sm text-gray-400">Call Bookings</div>
        </div>
      </div>

      {/* Top Performing Investors / Current Investor */}
      <div className="bg-[#1e1e1e] rounded-lg p-6">
        <h3 className="text-xl font-amenti text-emerald-400 mb-4">
          {selectedInvestor === 'all' ? 'Top Performing Investor Pages' : 'Current Investor Details'}
        </h3>
        <div className="space-y-3">
          {filteredStats?.topInvestors?.length > 0 ? (
            filteredStats.topInvestors.map((investor, index) => (
              <div key={investor.investor || investor.slug || index} className="flex items-center justify-between p-3 bg-[#232323] rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {selectedInvestor === 'all' ? index + 1 : '🎯'}
                  </div>
                  <div>
                    <div className="font-medium text-white">{investor.name || investor.investor || investor.slug}</div>
                    <div className="text-sm text-gray-400">
                      {investor.type && <span className="text-emerald-300">{investor.type}</span>} • Views: {investor.views}
                    </div>
                  </div>
                </div>
                <div className="text-emerald-400 font-bold">{investor.views} views</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">📊</div>
              <p>No data available for this investor yet.</p>
              <p className="text-sm mt-1">Data will appear after they visit their portal page.</p>
            </div>
          )}
        </div>
      </div>

      {/* Event Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Clicks */}
        <div className="bg-[#1e1e1e] rounded-lg p-6">
          <h3 className="text-xl font-amenti text-emerald-400 mb-4">Resource Downloads</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">📄 Investor 1-Pager</span>
              <span className="text-emerald-400 font-bold">{filteredStats?.eventBreakdown?.resource_resourceA_click || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">📊 Pitch Deck Excerpt</span>
              <span className="text-emerald-400 font-bold">{filteredStats?.eventBreakdown?.resource_resourceB_click || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">🎙️ Podcast Style</span>
              <span className="text-emerald-400 font-bold">{filteredStats?.eventBreakdown?.resource_resourceC_click || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">🔍 Limi 360 Deep-Dive</span>
              <span className="text-emerald-400 font-bold">{filteredStats?.eventBreakdown?.resource_resourceD_click || 0}</span>
            </div>
          </div>
        </div>

        {/* Session Duration */}
        <div className="bg-[#1e1e1e] rounded-lg p-6">
          <h3 className="text-xl font-amenti text-emerald-400 mb-4">Session Duration</h3>
          <div className="space-y-3">
            {Object.entries(filteredStats?.sessionDurations || {}).map(([duration, count]) => (
              <div key={duration} className="flex justify-between items-center">
                <span className="text-gray-300">{duration}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-[#292929] rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full" 
                      style={{ width: `${filteredStats?.totalPageViews > 0 ? (count / filteredStats.totalPageViews) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-emerald-400 font-bold w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-[#1e1e1e] rounded-lg p-6 border border-yellow-600/30">
        <h3 className="text-xl font-amenti text-yellow-400 mb-4">🚀 Umami Dashboard Setup</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div>
            <strong className="text-yellow-400">1. Access Your Umami Dashboard:</strong>
            <p className="ml-4">Visit <a href="https://cloud.umami.is" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">https://cloud.umami.is</a> and log in</p>
          </div>
          <div>
            <strong className="text-yellow-400">2. View Events:</strong>
            <p className="ml-4">Go to your website → Events tab to see all tracked interactions</p>
          </div>
          <div>
            <strong className="text-yellow-400">3. Create Custom Charts:</strong>
            <p className="ml-4">Use the "Custom Events" section to create charts for specific events like <code className="bg-[#292929] px-1 rounded">resource_resourceA_click</code></p>
          </div>
          <div>
            <strong className="text-yellow-400">4. Set Up Filters:</strong>
            <p className="ml-4">Filter by <code className="bg-[#292929] px-1 rounded">investor_slug</code> to see individual investor engagement</p>
          </div>
          <div>
            <strong className="text-yellow-400">5. API Integration:</strong>
            <p className="ml-4">Replace mock data above with real API calls using your API key: <code className="bg-[#292929] px-1 rounded">api_08gPcyjfrwopTUEG9H11K4rQ3Zi8KevG</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmamiAnalytics;
