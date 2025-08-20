'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiDownload, 
  FiUpload,
  FiActivity,
  FiBarChart,
  FiPieChart,
  FiClock,
  FiCalendar,
  FiFilter
} from 'react-icons/fi';

function AnalyticsDashboard() {
  const { users } = useSelector(state => state.auth);
  const { assets } = useSelector(state => state.assets);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock data for charts - replace with real API data later
  const mockData = {
    userActivity: [
      { hour: '00', users: 2 }, { hour: '01', users: 1 }, { hour: '02', users: 0 },
      { hour: '03', users: 1 }, { hour: '04', users: 0 }, { hour: '05', users: 2 },
      { hour: '06', users: 5 }, { hour: '07', users: 12 }, { hour: '08', users: 25 },
      { hour: '09', users: 35 }, { hour: '10', users: 42 }, { hour: '11', users: 38 },
      { hour: '12', users: 28 }, { hour: '13', users: 45 }, { hour: '14', users: 52 },
      { hour: '15', users: 48 }, { hour: '16', users: 35 }, { hour: '17', users: 22 },
      { hour: '18', users: 15 }, { hour: '19', users: 8 }, { hour: '20', users: 5 },
      { hour: '21', users: 3 }, { hour: '22', users: 2 }, { hour: '23', users: 1 }
    ],
    assetUsage: [
      { type: 'Images', count: 145, percentage: 45 },
      { type: 'Videos', count: 89, percentage: 28 },
      { type: '3D Models', count: 56, percentage: 17 },
      { type: 'Documents', count: 32, percentage: 10 }
    ],
    downloadTrends: [
      { date: 'Mon', downloads: 45, uploads: 12 },
      { date: 'Tue', downloads: 52, uploads: 18 },
      { date: 'Wed', downloads: 38, uploads: 15 },
      { date: 'Thu', downloads: 65, uploads: 22 },
      { date: 'Fri', downloads: 78, uploads: 28 },
      { date: 'Sat', downloads: 35, uploads: 8 },
      { date: 'Sun', downloads: 25, uploads: 5 }
    ],
    topAssets: [
      { name: 'Product_Render_V2.jpg', downloads: 156, views: 1240 },
      { name: 'Assembly_Animation.mp4', downloads: 134, views: 980 },
      { name: 'Logo_Package.zip', downloads: 98, views: 750 },
      { name: 'Brand_Guidelines.pdf', downloads: 87, views: 650 },
      { name: '3D_Model_Final.glb', downloads: 76, views: 580 }
    ]
  };

  const performanceMetrics = [
    { label: 'Avg Response Time', value: '245ms', change: '-12%', color: 'text-green-600' },
    { label: 'Server Uptime', value: '99.8%', change: '+0.1%', color: 'text-green-600' },
    { label: 'Storage Used', value: '2.1GB', change: '+15%', color: 'text-orange-600' },
    { label: 'Active Sessions', value: '24', change: '+8%', color: 'text-blue-600' }
  ];

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">System usage and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <FiDownload className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className={`text-sm ${metric.color} mt-1`}>{metric.change} from last period</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <FiTrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Heatmap */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">User Activity Heatmap</h2>
            <FiActivity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Hour of Day</span>
              <span>Active Users</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              {mockData.userActivity.map((item, index) => (
                <div key={index} className="text-center">
                  <div 
                    className={`h-8 rounded ${
                      item.users === 0 ? 'bg-gray-100' :
                      item.users <= 10 ? 'bg-blue-200' :
                      item.users <= 30 ? 'bg-blue-400' :
                      'bg-blue-600'
                    } flex items-center justify-center text-xs ${
                      item.users > 30 ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {item.users}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.hour}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-gray-100 rounded"></div>
                <div className="w-3 h-3 bg-blue-200 rounded"></div>
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Asset Usage Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Asset Usage by Type</h2>
            <FiPieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockData.assetUsage.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{item.count}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download/Upload Trends */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Download & Upload Trends</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Downloads</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Uploads</span>
            </div>
          </div>
        </div>
        <div className="h-64 flex items-end space-x-4">
          {mockData.downloadTrends.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="flex items-end space-x-1 w-full">
                <div 
                  className="bg-blue-500 rounded-t"
                  style={{ 
                    height: `${(item.downloads / 80) * 200}px`,
                    width: '45%'
                  }}
                ></div>
                <div 
                  className="bg-green-500 rounded-t"
                  style={{ 
                    height: `${(item.uploads / 80) * 200}px`,
                    width: '45%'
                  }}
                ></div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-900 font-medium">{item.date}</div>
                <div className="text-xs text-gray-500">{item.downloads}↓ {item.uploads}↑</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Assets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Assets</h2>
          <FiBarChart className="w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Asset Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Downloads</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Views</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {mockData.topAssets.map((asset, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{asset.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <FiDownload className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{asset.downloads}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{asset.views}</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(asset.downloads / asset.views) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Provider store={store}>
      <AnalyticsDashboard />
    </Provider>
  );
}
