import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * SlideInsights
 * @param {Object} props
 * @param {Object[]} props.slideTimes - Array of { slideId, slideTitle, seconds }
 * @param {Object[]} props.sessions - Array of { sessionStart, sessionEnd, durationSeconds }
 */
export default function SlideInsights({ slideTimes = [], sessions = [] }) {
  // Color palette for bars
  const colorPalette = [
    'rgba(84, 187, 116, 0.8)',    // Primary green
    'rgba(147, 207, 162, 0.8)',   // Light green
    'rgba(22, 163, 74, 0.8)',     // Dark green
    'rgba(21, 128, 61, 0.8)',     // Darker green
    'rgba(22, 101, 52, 0.8)',     // Deep green
    'rgba(74, 222, 128, 0.8)',    // Bright green
    'rgba(34, 197, 94, 0.8)',     // Lighter green
  ];

  // Calculate session statistics
  const sessionStats = {
    totalSessions: sessions.length,
    totalTime: sessions.reduce((sum, session) => sum + (session.durationSeconds || 0), 0),
    averageSessionTime: sessions.length > 0 ? 
      sessions.reduce((sum, session) => sum + (session.durationSeconds || 0), 0) / sessions.length : 0,
    longestSession: sessions.length > 0 ? 
      Math.max(...sessions.map(s => s.durationSeconds || 0)) : 0
  };

  // Get engagement events from latest session
  const latestSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;
  const engagementEvents = latestSession?.engagementEvents || [];

  // Process device analytics
  const deviceAnalytics = sessions.reduce((acc, session) => {
    if (session.deviceInfo) {
      const { isMobile, screenWidth, screenHeight, userAgent } = session.deviceInfo;
      
      // Device type
      const deviceType = isMobile ? 'Mobile' : 
                        screenWidth > 1024 ? 'Desktop' : 'Tablet';
      acc.deviceTypes[deviceType] = (acc.deviceTypes[deviceType] || 0) + 1;
      
      // Screen sizes
      const screenCategory = screenWidth < 768 ? 'Small (<768px)' :
                           screenWidth < 1024 ? 'Medium (768-1024px)' :
                           screenWidth < 1440 ? 'Large (1024-1440px)' :
                           'XLarge (>1440px)';
      acc.screenSizes[screenCategory] = (acc.screenSizes[screenCategory] || 0) + 1;
      
      // Browser detection (basic)
      const browser = userAgent?.includes('Chrome') ? 'Chrome' :
                     userAgent?.includes('Firefox') ? 'Firefox' :
                     userAgent?.includes('Safari') ? 'Safari' :
                     userAgent?.includes('Edge') ? 'Edge' : 'Other';
      acc.browsers[browser] = (acc.browsers[browser] || 0) + 1;
    }
    return acc;
  }, { deviceTypes: {}, screenSizes: {}, browsers: {} });

  // Format time in minutes and seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  // Prepare data for Chart.js
  const chartData = {
    labels: slideTimes.map(slide => slide.slideTitle),
    datasets: [
      {
        label: 'Time Spent (seconds)',
        data: slideTimes.map(slide => slide.seconds),
        backgroundColor: slideTimes.map((_, index) => {
          return colorPalette[index % colorPalette.length];
        }),
        borderColor: slideTimes.map((_, index) => {
          // Slightly darker version of each color for the border
          const baseColor = colorPalette[index % colorPalette.length];
          return baseColor.replace('0.8)', '1)').replace(', 0.8', '');
        }),
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#93cfa2',
        bodyColor: '#93cfa2',
        borderColor: '#54bb74',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `Time: ${context.parsed.y.toFixed(1)}s`;
          }
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#93cfa2',
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: 'rgba(64, 64, 64, 0.3)',
          drawBorder: false,
        },
        border: {
          color: '#54bb74',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#93cfa2',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(64, 64, 64, 0.3)',
          drawBorder: false,
        },
        border: {
          color: '#54bb74',
        },
        title: {
          display: true,
          text: 'Time (seconds)',
          color: '#93cfa2',
          font: {
            size: 14,
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  // Session duration chart data
  const sessionChartData = {
    labels: sessions.map((_, index) => `Session ${index + 1}`),
    datasets: [
      {
        label: 'Session Duration (seconds)',
        data: sessions.map(session => session.durationSeconds || 0),
        backgroundColor: sessions.map((_, index) => {
          return colorPalette[index % colorPalette.length];
        }),
        borderColor: sessions.map((_, index) => {
          const baseColor = colorPalette[index % colorPalette.length];
          return baseColor.replace('0.8)', '1)').replace(', 0.8', '');
        }),
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const sessionOptions = {
    ...options,
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        title: {
          display: true,
          text: 'Duration (seconds)',
          color: '#93cfa2',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-[#1e1e1e] rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-[#93cfa2] mb-6">Slide Analytics Dashboard</h2>
      
      {/* Session Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-1">Total Sessions</h3>
          <p className="text-2xl font-bold text-[#54bb74]">{sessionStats.totalSessions}</p>
        </div>
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-1">Total Time</h3>
          <p className="text-2xl font-bold text-[#54bb74]">{formatTime(sessionStats.totalTime)}</p>
        </div>
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-1">Avg Session</h3>
          <p className="text-2xl font-bold text-[#54bb74]">{formatTime(sessionStats.averageSessionTime)}</p>
        </div>
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-sm text-gray-400 mb-1">Longest Session</h3>
          <p className="text-2xl font-bold text-[#54bb74]">{formatTime(sessionStats.longestSession)}</p>
        </div>
      </div>

      {/* Charts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Slide Time Chart */}
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#93cfa2] mb-4">Time Spent Per Slide</h3>
          <div style={{ height: '300px' }}>
            <Bar data={chartData} options={options} />
          </div>
        </div>

        {/* Session Duration Chart */}
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#93cfa2] mb-4">Session Durations</h3>
          <div style={{ height: '300px' }}>
            {sessions.length > 0 ? (
              <Bar data={sessionChartData} options={sessionOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No session data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Engagement Events Table */}
      {engagementEvents.length > 0 && (
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#93cfa2] mb-4">Recent Engagement Events</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 text-gray-400">Time</th>
                  <th className="text-left py-2 text-gray-400">Event Type</th>
                  <th className="text-left py-2 text-gray-400">Slide</th>
                  <th className="text-left py-2 text-gray-400">Details</th>
                </tr>
              </thead>
              <tbody>
                {engagementEvents.slice(-10).map((event, index) => (
                  <tr key={event.id || index} className="border-b border-gray-700">
                    <td className="py-2 text-gray-300">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        event.type === 'click' ? 'bg-blue-600 text-blue-100' :
                        event.type === 'slide_change' ? 'bg-green-600 text-green-100' :
                        event.type === 'user_idle' ? 'bg-yellow-600 text-yellow-100' :
                        event.type === 'activity_resumed' ? 'bg-purple-600 text-purple-100' :
                        'bg-gray-600 text-gray-100'
                      }`}>
                        {event.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2 text-gray-300">
                      {event.slideId || 'N/A'}
                    </td>
                    <td className="py-2 text-gray-300">
                      {event.type === 'click' && event.data?.target ? `${event.data.target} element` :
                       event.type === 'keypress' && event.data?.key ? `Key: ${event.data.key}` :
                       event.type === 'slide_change' ? `To slide ${event.data?.slideIndex + 1}` :
                       'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Device Analytics */}
      {sessions.length > 0 && Object.keys(deviceAnalytics.deviceTypes).length > 0 && (
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#93cfa2] mb-4">Device Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Device Types */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Device Types</h4>
              <div className="space-y-2">
                {Object.entries(deviceAnalytics.deviceTypes).map(([type, count]) => {
                  const percentage = ((count / sessions.length) * 100).toFixed(1);
                  return (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-gray-300">{type}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#54bb74] rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-[#54bb74] text-sm font-medium">{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Screen Sizes */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Screen Sizes</h4>
              <div className="space-y-2">
                {Object.entries(deviceAnalytics.screenSizes).map(([size, count]) => {
                  const percentage = ((count / sessions.length) * 100).toFixed(1);
                  return (
                    <div key={size} className="flex justify-between items-center">
                      <span className="text-gray-300 text-xs">{size}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#93cfa2] rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-[#93cfa2] text-sm font-medium">{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Browsers */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Browsers</h4>
              <div className="space-y-2">
                {Object.entries(deviceAnalytics.browsers).map(([browser, count]) => {
                  const percentage = ((count / sessions.length) * 100).toFixed(1);
                  return (
                    <div key={browser} className="flex justify-between items-center">
                      <span className="text-gray-300">{browser}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#74bb54] rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-[#74bb54] text-sm font-medium">{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Details */}
      {sessions.length > 0 && (
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#93cfa2] mb-4">Session History</h3>
          <div className="space-y-2">
            {sessions.slice(-5).map((session, index) => (
              <div key={session.sessionId || index} className="flex justify-between items-center p-3 bg-[#1e1e1e] rounded">
                <div>
                  <p className="text-white font-medium">
                    Session {session.sessionId ? session.sessionId.split('_')[1] : index + 1}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {new Date(session.sessionStart).toLocaleString()}
                    {session.deviceInfo && (
                      <span className="ml-2 px-2 py-1 bg-gray-700 rounded text-xs">
                        {session.deviceInfo.isMobile ? '📱 Mobile' : '💻 Desktop'}
                      </span>
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#54bb74] font-medium">
                    {formatTime(session.durationSeconds || 0)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {session.slides?.length || 0} slides viewed
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
