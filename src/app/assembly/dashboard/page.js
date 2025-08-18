'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaDownload, FaEnvelope, FaBuilding, FaCalendar, FaEye, FaTrash, FaPlay, FaMousePointer, FaClock, FaChartLine } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [brochureRequests, setBrochureRequests] = useState([]);
  const [umamiStats, setUmamiStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');

  // Umami API configuration
  const UMAMI_API_URL = process.env.UMAMI_API_URL || 'https://api.umami.is/v1';
  const WEBSITE_ID = 'c2dbae41-29a3-457e-bcb6-5a6b68a53fe3'; // limiai.co specific website ID
  const API_KEY = 'api_te0BCYOEnbNdJhqVUncPwqCJVwB5U4eK'; // limiai.co specific API key

  // Transform Umami events data for assembly page
  const transformAssemblyEvents = (eventsResponse) => {
    const eventMap = {
      'assembly_hero_carousel': 'Hero Carousel Interactions',
      'assembly_modal_interaction': 'Modal Interactions',
      'assembly_video_interaction': 'Video Engagement',
      'assembly_benefit_timeline': 'Benefit Timeline Clicks',
      'assembly_cta_interaction': 'CTA Button Clicks',
      'assembly_form_submission': 'Form Submissions',
      'assembly_3d_viewer': '3D Viewer Interactions',
      'assembly_sensor_card': 'Sensor Card Interactions',
      'assembly_scroll_interaction': 'Scroll Interactions'
    };
    
    const breakdown = {};
    const eventsData = eventsResponse.data || [];
    
    // Count events by name
    const eventCounts = {};
    eventsData.forEach(event => {
      if (event.eventName && event.eventName.startsWith('assembly_')) {
        eventCounts[event.eventName] = (eventCounts[event.eventName] || 0) + 1;
      }
    });
    
    // Map to display names
    Object.keys(eventCounts).forEach(eventName => {
      const displayName = eventMap[eventName] || eventName;
      breakdown[displayName] = eventCounts[eventName];
    });
    
    return breakdown;
  };

  // Fetch Umami analytics data
  const fetchUmamiData = async () => {
    try {
      if (!API_KEY || API_KEY === 'your_api_key_here') {
        console.warn('No Umami API key configured, using mock data');
        return getMockUmamiData();
      }

      // Calculate date range (last 30 days)
      const endAt = Date.now();
      const startAt = endAt - (30 * 24 * 60 * 60 * 1000);
      const timezone = 'UTC';
      const unit = 'day';
      
      // Fetch general stats
      const statsUrl = `${UMAMI_API_URL}/websites/${WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}&unit=${unit}&timezone=${timezone}`;
      const statsResponse = await fetch(statsUrl, {
        headers: {
          'x-umami-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      });

      // Fetch events data
      const eventsUrl = `${UMAMI_API_URL}/websites/${WEBSITE_ID}/events?startAt=${startAt}&endAt=${endAt}&unit=${unit}&timezone=${timezone}`;
      const eventsResponse = await fetch(eventsUrl, {
        headers: {
          'x-umami-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      });

      let realStats = null;
      let eventsData = null;

      if (statsResponse.ok) {
        realStats = await statsResponse.json();
      }

      if (eventsResponse.ok) {
        eventsData = await eventsResponse.json();
      }

      if (realStats || eventsData) {
        return {
          totalPageViews: realStats?.pageviews?.value || 0,
          uniqueVisitors: realStats?.visitors?.value || 0,
          totalSessions: realStats?.visits?.value || 0,
          avgSessionTime: realStats?.totaltime?.value && realStats?.visits?.value ? 
            Math.round(realStats.totaltime.value / realStats.visits.value) : 0,
          eventBreakdown: eventsData ? transformAssemblyEvents(eventsData) : {},
          bounceRate: realStats?.bounces?.value && realStats?.visits?.value ?
            Math.round((realStats.bounces.value / realStats.visits.value) * 100) : 0
        };
      }

      return getMockUmamiData();
    } catch (error) {
      console.error('Error fetching Umami data:', error);
      // return getMockUmamiData();
    }
  };

  // Mock data for development/fallback
  const getMockUmamiData = () => ({
    totalPageViews: 1247,
    uniqueVisitors: 892,
    totalSessions: 1089,
    avgSessionTime: 154, // seconds
    bounceRate: 32,
    eventBreakdown: {
      'Hero Carousel Interactions': 456,
      'Modal Interactions': 234,
      'Video Engagement': 189,
      'Benefit Timeline Clicks': 167,
      'CTA Button Clicks': 145,
      'Form Submissions': 89,
      '3D Viewer Interactions': 78,
      'Sensor Card Interactions': 67,
      'Scroll Interactions': 1089
    }
  });

  // Format time duration
  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch contact submissions and Umami data in parallel
        const [contactResponse, umamiData] = await Promise.all([
          fetch('https://dev.api1.limitless-lighting.co.uk/client/user/brochure_email'),
          fetchUmamiData()
        ]);

        // Process contact data
        if (contactResponse.ok) {
          const contactData = await contactResponse.json();
          const transformedContacts = Array.isArray(contactData) ? contactData.map(item => ({
            id: item._id,
            name: item.name || 'N/A',
            email: item.email,
            company: item.company || '',
            createdAt: item.createdAt
          })) : [];
          setContactSubmissions(transformedContacts);
          setBrochureRequests(transformedContacts); // Using same data for demo
        }

        // Set Umami data
        setUmamiStats(umamiData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchAllData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const deleteContact = async (id) => {
    try {
      setContactSubmissions(prev => prev.filter(item => item.id !== id));
      toast.success('Contact removed from view');
    } catch (error) {
      console.error('Error removing contact:', error);
      toast.error('Failed to remove contact');
    }
  };

  const deleteBrochureRequest = async (id) => {
    try {
      setBrochureRequests(prev => prev.filter(item => item.id !== id));
      toast.success('Brochure request removed from view');
    } catch (error) {
      console.error('Error removing brochure request:', error);
      toast.error('Failed to remove brochure request');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3ebe2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#54bb74] mb-4"></div>
          <p className="text-2xl font-semibold text-[#292929]">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3ebe2] py-8 px-4 overflow-x-hidden">
      <style jsx global>{`
        /* Hide scrollbars for webkit browsers */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbars for Firefox */
        * {
          scrollbar-width: none;
        }
        
        /* Hide scrollbars for IE and Edge */
        * {
          -ms-overflow-style: none;
        }
        
        /* Custom scrollbar hide class */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#292929] mb-2">Assembly Dashboard</h1>
          <p className="text-xl text-[#292929]/70">Analytics, leads, and performance monitoring</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg border border-[#54bb74]/20">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white shadow-lg'
                  : 'text-[#292929] hover:bg-[#54bb74]/10'
              }`}
            >
              <FaChartLine className="inline mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'contacts'
                  ? 'bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white shadow-lg'
                  : 'text-[#292929] hover:bg-[#54bb74]/10'
              }`}
            >
              <FaUsers className="inline mr-2" />
              Contacts ({contactSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('brochures')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'brochures'
                  ? 'bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white shadow-lg'
                  : 'text-[#292929] hover:bg-[#54bb74]/10'
              }`}
            >
              <FaDownload className="inline mr-2" />
              Brochures ({brochureRequests.length})
            </button>
          </div>
        </motion.div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && umamiStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#54bb74]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#292929]/60 uppercase tracking-wide">Page Views</p>
                    <p className="text-3xl font-bold text-[#292929]">{umamiStats.totalPageViews.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-xl flex items-center justify-center">
                    <FaEye className="text-white text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#54bb74]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#292929]/60 uppercase tracking-wide">Unique Visitors</p>
                    <p className="text-3xl font-bold text-[#292929]">{umamiStats.uniqueVisitors.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#93cfa2] to-[#54bb74] rounded-xl flex items-center justify-center">
                    <FaUsers className="text-white text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#54bb74]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#292929]/60 uppercase tracking-wide">Avg Session</p>
                    <p className="text-3xl font-bold text-[#292929]">{formatDuration(umamiStats.avgSessionTime)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#292929] rounded-xl flex items-center justify-center">
                    <FaClock className="text-white text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#54bb74]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#292929]/60 uppercase tracking-wide">Bounce Rate</p>
                    <p className="text-3xl font-bold text-[#292929]">{umamiStats.bounceRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#292929] to-[#54bb74] rounded-xl flex items-center justify-center">
                    <FaMousePointer className="text-white text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* User Interactions */}
            <div className="bg-white rounded-2xl shadow-lg border border-[#54bb74]/20 overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#292929] mb-6 flex items-center">
                  <FaMousePointer className="mr-3 text-[#54bb74]" />
                  User Interactions (Last 30 Days)
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(umamiStats.eventBreakdown).map(([eventName, count]) => (
                    <div key={eventName} className="bg-[#f8f6f3] rounded-xl p-4 border border-[#54bb74]/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-[#292929]/70">{eventName}</p>
                          <p className="text-2xl font-bold text-[#292929]">{count.toLocaleString()}</p>
                        </div>
                        <div className="w-8 h-8 bg-[#54bb74] rounded-lg flex items-center justify-center">
                          {eventName.includes('Video') && <FaPlay className="text-white text-sm" />}
                          {eventName.includes('Form') && <FaEnvelope className="text-white text-sm" />}
                          {eventName.includes('CTA') && <FaMousePointer className="text-white text-sm" />}
                          {!eventName.includes('Video') && !eventName.includes('Form') && !eventName.includes('CTA') && 
                           <FaEye className="text-white text-sm" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-[#54bb74]/20 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#292929] mb-6 flex items-center">
                <FaUsers className="mr-3 text-[#54bb74]" />
                Contact Submissions
              </h2>
              
              {contactSubmissions.length === 0 ? (
                <div className="text-center py-12">
                  <FaUsers className="text-6xl text-[#292929]/20 mx-auto mb-4" />
                  <p className="text-xl text-[#292929]/60">No contact submissions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#54bb74]/20">
                        <th className="text-left py-3 px-4 font-semibold text-[#292929]">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#292929]">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#292929]">Company</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#292929]">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactSubmissions.map((contact, index) => (
                        <motion.tr
                          key={contact.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-[#54bb74]/10 hover:bg-[#54bb74]/5 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-full flex items-center justify-center mr-3">
                                <span className="text-white font-semibold">
                                  {contact.name?.charAt(0)?.toUpperCase() || 'N'}
                                </span>
                              </div>
                              <span className="font-semibold text-[#292929]">{contact.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center text-[#292929]">
                              <FaEnvelope className="mr-2 text-[#54bb74]" />
                              {contact.email}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center text-[#292929]">
                              <FaBuilding className="mr-2 text-[#54bb74]" />
                              {contact.company || 'N/A'}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center text-[#292929]">
                              <FaCalendar className="mr-2 text-[#54bb74]" />
                              {formatDate(contact.createdAt)}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Brochures Tab */}
        {activeTab === 'brochures' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-[#54bb74]/20 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#292929] mb-6 flex items-center">
                <FaDownload className="mr-3 text-[#54bb74]" />
                Brochure Requests
              </h2>
              
              {brochureRequests.length === 0 ? (
                <div className="text-center py-12">
                  <FaDownload className="text-6xl text-[#292929]/20 mx-auto mb-4" />
                  <p className="text-xl text-[#292929]/60">No brochure requests yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#54bb74]/20">
                        <th className="text-left py-3 px-4 font-semibold text-[#292929]">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#292929]">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brochureRequests.map((request, index) => (
                        <motion.tr
                          key={request.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-[#54bb74]/10 hover:bg-[#54bb74]/5 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#93cfa2] to-[#54bb74] rounded-full flex items-center justify-center mr-3">
                                <FaEnvelope className="text-white" />
                              </div>
                              <span className="font-semibold text-[#292929]">{request.email}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center text-[#292929]">
                              <FaCalendar className="mr-2 text-[#54bb74]" />
                              {formatDate(request.createdAt)}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          background: 'white',
          color: '#292929',
          borderRadius: '12px',
          border: '1px solid #54bb74'
        }}
      />
    </div>
  );
};

export default Dashboard;
