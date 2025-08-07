import React, { useState, useEffect } from 'react';

const LimiFutureAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSlide, setSelectedSlide] = useState('all');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  // Umami API configuration from environment variables (using same config as layout.js)
  const UMAMI_API_URL = process.env.UMAMI_API_URL || 'https://api.umami.is/v1';
  const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || 'd1ff84bb-5098-45e2-b135-568ef7264eff';
  const API_KEY = process.env.UMAMI_API_KEY || 'api_08gPcyjfrwopTUEG9H11K4rQ3Zi8KevG';
  const IS_LOCALHOST = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Helper function to get date range
  const getDateRange = (range) => {
    const endDate = new Date();
    const startDate = new Date();
    
    switch (range) {
      case '1d':
        startDate.setDate(endDate.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      default:
        startDate.setDate(endDate.getDate() - 7);
    }
    
    return {
      startAt: startDate.getTime(),
      endAt: endDate.getTime()
    };
  };

  // Fetch LimiFuture analytics data
  const fetchLimiFutureAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      if (IS_LOCALHOST) {
        // Mock data for localhost
        const mockData = {
          totalPageViews: 156,
          totalSlideTransitions: 423,
          totalPopupInteractions: 89,
          slideBreakdown: {
            'Slide 1': { views: 156, transitions: 134, popups: 23 },
            'Slide 2': { views: 134, transitions: 112, popups: 18 },
            'Slide 3': { views: 112, transitions: 98, popups: 15 },
            'Slide 4': { views: 98, transitions: 79, popups: 21 },
            'Slide 5': { views: 79, transitions: 0, popups: 12 }
          },
          eventBreakdown: {
            'limifuture_page_view': 156,
            'limifuture_slide_transition': 423,
            'limifuture_slide1_popup_open': 23,
            'limifuture_slide2_popup_open': 18,
            'limifuture_slide3_popup_open': 15,
            'limifuture_slide4_popup_open': 21,
            'limifuture_slide5_popup_open': 12,
            'limifuture_carousel_keyboard_next': 45,
            'limifuture_carousel_keyboard_prev': 12
          },
          recentEvents: [
            { timestamp: new Date().toISOString(), event: 'limifuture_slide_transition', slide: 2, userAgent: 'Chrome/120.0.0.0', ip: '192.168.1.1' },
            { timestamp: new Date(Date.now() - 300000).toISOString(), event: 'limifuture_slide1_popup_open', slide: 1, userAgent: 'Firefox/121.0', ip: '192.168.1.2' },
            { timestamp: new Date(Date.now() - 600000).toISOString(), event: 'limifuture_page_view', slide: 1, userAgent: 'Safari/17.0', ip: '192.168.1.3' }
          ]
        };
        setStats(mockData);
        setLoading(false);
        return;
      }

      const { startAt, endAt } = getDateRange(timeRange);
      
      // Fetch events data from Umami API
      const eventsResponse = await fetch(`${UMAMI_API_URL}/websites/${WEBSITE_ID}/events?startAt=${startAt}&endAt=${endAt}&unit=day&timezone=UTC`, {
        headers: {
          'x-umami-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (!eventsResponse.ok) {
        throw new Error(`Events API error: ${eventsResponse.status}`);
      }

      const eventsData = await eventsResponse.json();
      
      // Process LimiFuture specific events
      const limiFutureEvents = eventsData.data?.filter(event => 
        event.eventName && event.eventName.startsWith('limifuture_')
      ) || [];

      // Calculate analytics
      const analytics = processLimiFutureEvents(limiFutureEvents);
      
      setStats(analytics);
    } catch (err) {
      console.error('Error fetching LimiFuture analytics:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Process events into analytics
  const processLimiFutureEvents = (events) => {
    const eventCounts = {};
    const slideBreakdown = {};
    const recentEvents = [];

    events.forEach(event => {
      const eventName = event.eventName;
      eventCounts[eventName] = (eventCounts[eventName] || 0) + 1;

      // Extract slide information
      const slideMatch = eventName.match(/slide(\d+)/);
      if (slideMatch) {
        const slideNum = parseInt(slideMatch[1]);
        const slideName = `Slide ${slideNum}`;
        
        if (!slideBreakdown[slideName]) {
          slideBreakdown[slideName] = { views: 0, transitions: 0, popups: 0 };
        }

        if (eventName.includes('popup')) {
          slideBreakdown[slideName].popups++;
        } else if (eventName.includes('transition')) {
          slideBreakdown[slideName].transitions++;
        }
      }

      // Add to recent events
      if (recentEvents.length < 10) {
        recentEvents.push({
          timestamp: event.createdAt || new Date().toISOString(),
          event: eventName,
          slide: slideMatch ? parseInt(slideMatch[1]) : null,
          userAgent: event.userAgent || 'Unknown',
          ip: event.ip || 'Unknown'
        });
      }
    });

    return {
      totalPageViews: eventCounts['limifuture_page_view'] || 0,
      totalSlideTransitions: eventCounts['limifuture_slide_transition'] || 0,
      totalPopupInteractions: Object.keys(eventCounts).filter(key => key.includes('popup')).reduce((sum, key) => sum + eventCounts[key], 0),
      slideBreakdown,
      eventBreakdown: eventCounts,
      recentEvents: recentEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    };
  };

  useEffect(() => {
    fetchLimiFutureAnalytics();
  }, [timeRange]);

  // Filter events based on selected filters
  const getFilteredEvents = () => {
    if (!stats) return [];
    
    return Object.entries(stats.eventBreakdown).filter(([eventName, count]) => {
      if (selectedEventType !== 'all' && !eventName.includes(selectedEventType)) return false;
      if (selectedSlide !== 'all' && !eventName.includes(`slide${selectedSlide}`)) return false;
      return true;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#54bb74]"></div>
        <span className="ml-4 text-[#93cfa2]">Loading LimiFuture analytics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
        <div className="flex items-center mb-2">
          <i className="fas fa-exclamation-triangle text-red-400 mr-2"></i>
          <h3 className="text-red-400 font-semibold">Error Loading Analytics</h3>
        </div>
        <p className="text-red-300">{error}</p>
        <button 
          onClick={fetchLimiFutureAnalytics}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#54bb74] font-[Amenti]">LimiFuture Analytics</h2>
          <p className="text-[#93cfa2] mt-1">Track slide interactions and user engagement</p>
        </div>
        
        {IS_LOCALHOST && (
          <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg px-3 py-1">
            <span className="text-yellow-400 text-sm">
              <i className="fas fa-exclamation-triangle mr-1"></i>
              Mock Data (Localhost)
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 bg-[#1a1a1a] p-4 rounded-lg">
        <div>
          <label className="block text-[#93cfa2] text-sm mb-1">Time Range</label>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#292929] border border-[#54bb74]/30 rounded px-3 py-1 text-white"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
        
        <div>
          <label className="block text-[#93cfa2] text-sm mb-1">Slide Filter</label>
          <select 
            value={selectedSlide} 
            onChange={(e) => setSelectedSlide(e.target.value)}
            className="bg-[#292929] border border-[#54bb74]/30 rounded px-3 py-1 text-white"
          >
            <option value="all">All Slides</option>
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>Slide {num}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-[#93cfa2] text-sm mb-1">Event Type</label>
          <select 
            value={selectedEventType} 
            onChange={(e) => setSelectedEventType(e.target.value)}
            className="bg-[#292929] border border-[#54bb74]/30 rounded px-3 py-1 text-white"
          >
            <option value="all">All Events</option>
            <option value="page_view">Page Views</option>
            <option value="transition">Slide Transitions</option>
            <option value="popup">Popup Interactions</option>
            <option value="carousel">Carousel Controls</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#54bb74]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#93cfa2] text-sm">Total Page Views</p>
              <p className="text-3xl font-bold text-[#54bb74]">{stats?.totalPageViews || 0}</p>
            </div>
            <i className="fas fa-eye text-[#54bb74] text-2xl"></i>
          </div>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#54bb74]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#93cfa2] text-sm">Slide Transitions</p>
              <p className="text-3xl font-bold text-[#54bb74]">{stats?.totalSlideTransitions || 0}</p>
            </div>
            <i className="fas fa-exchange-alt text-[#54bb74] text-2xl"></i>
          </div>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#54bb74]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#93cfa2] text-sm">Popup Interactions</p>
              <p className="text-3xl font-bold text-[#54bb74]">{stats?.totalPopupInteractions || 0}</p>
            </div>
            <i className="fas fa-mouse-pointer text-[#54bb74] text-2xl"></i>
          </div>
        </div>
      </div>

      {/* Slide Breakdown */}
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#54bb74]/30">
        <h3 className="text-xl font-semibold text-[#54bb74] mb-4">Slide Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#54bb74]/30">
                <th className="text-left py-2 text-[#93cfa2]">Slide</th>
                <th className="text-left py-2 text-[#93cfa2]">Views</th>
                <th className="text-left py-2 text-[#93cfa2]">Transitions</th>
                <th className="text-left py-2 text-[#93cfa2]">Popup Opens</th>
                <th className="text-left py-2 text-[#93cfa2]">Engagement Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats?.slideBreakdown || {}).map(([slide, data]) => (
                <tr key={slide} className="border-b border-[#54bb74]/10">
                  <td className="py-2 text-white">{slide}</td>
                  <td className="py-2 text-[#93cfa2]">{data.views}</td>
                  <td className="py-2 text-[#93cfa2]">{data.transitions}</td>
                  <td className="py-2 text-[#93cfa2]">{data.popups}</td>
                  <td className="py-2 text-[#93cfa2]">
                    {data.views > 0 ? Math.round((data.popups / data.views) * 100) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filtered Events */}
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#54bb74]/30">
        <h3 className="text-xl font-semibold text-[#54bb74] mb-4">Event Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getFilteredEvents().map(([eventName, count]) => (
            <div key={eventName} className="bg-[#292929] p-4 rounded border border-[#54bb74]/20">
              <p className="text-[#93cfa2] text-sm truncate" title={eventName}>{eventName}</p>
              <p className="text-2xl font-bold text-[#54bb74]">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#54bb74]/30">
        <h3 className="text-xl font-semibold text-[#54bb74] mb-4">Recent Activity</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {stats?.recentEvents?.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-[#292929] rounded border border-[#54bb74]/10">
              <div className="flex-1">
                <p className="text-white text-sm">{event.event}</p>
                <p className="text-[#93cfa2] text-xs">
                  {new Date(event.timestamp).toLocaleString()} | {event.userAgent} | {event.ip}
                </p>
              </div>
              {event.slide && (
                <span className="bg-[#54bb74] text-white px-2 py-1 rounded text-xs">
                  Slide {event.slide}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LimiFutureAnalytics;
