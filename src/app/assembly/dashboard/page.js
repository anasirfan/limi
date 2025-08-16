'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaDownload, FaEnvelope, FaBuilding, FaCalendar, FaEye, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [brochureRequests, setBrochureRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contacts');

  useEffect(() => {
    fetchData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch contact submissions
      const contactResponse = await fetch('https://dev.api1.limitless-lighting.co.uk/client/user/brochure_email');
      if (contactResponse.ok) {
        const contactData = await contactResponse.json();
        // Transform the data to match expected format
        const transformedContacts = Array.isArray(contactData) ? contactData.map(item => ({
          id: item._id,
          name: item.name || 'N/A',
          email: item.email,
          company: item.company || '',
          createdAt: item.createdAt
        })) : [];
        console.log("transformedContacts",transformedContacts);
        setContactSubmissions(transformedContacts);
      }

      // Fetch brochure requests
      const brochureResponse = await fetch('https://dev.api1.limitless-lighting.co.uk/client/user/brochure_email');
      if (brochureResponse.ok) {
        const brochureData = await brochureResponse.json();
        // Transform the data to match expected format
        const transformedBrochures = Array.isArray(brochureData.data) ? brochureData.data.map(item => ({
          id: item._id,
          email: item.email,
          createdAt: item.createdAt
        })) : [];
        setBrochureRequests(transformedBrochures);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      // Since we're using external API, we'll just remove from local state
      // You may need to implement actual delete API call to the external service
      setContactSubmissions(prev => prev.filter(item => item.id !== id));
      toast.success('Contact removed from view');
    } catch (error) {
      console.error('Error removing contact:', error);
      toast.error('Failed to remove contact');
    }
  };

  const deleteBrochureRequest = async (id) => {
    try {
      // Since we're using external API, we'll just remove from local state
      // You may need to implement actual delete API call to the external service
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
          <p className="text-xl text-[#292929]/70">Manage your leads and brochure requests</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#54bb74]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#292929]/60 uppercase tracking-wide">Total Contacts</p>
                <p className="text-3xl font-bold text-[#292929]">{contactSubmissions.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#93cfa2] rounded-xl flex items-center justify-center">
                <FaUsers className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#54bb74]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#292929]/60 uppercase tracking-wide">Brochure Requests</p>
                <p className="text-3xl font-bold text-[#292929]">{brochureRequests.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#93cfa2] to-[#54bb74] rounded-xl flex items-center justify-center">
                <FaDownload className="text-white text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#54bb74]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#292929]/60 uppercase tracking-wide">Total Leads</p>
                <p className="text-3xl font-bold text-[#292929]">{contactSubmissions.length + brochureRequests.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#292929] rounded-xl flex items-center justify-center">
                <FaEye className="text-white text-xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg border border-[#54bb74]/20">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'contacts'
                  ? 'bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white shadow-lg'
                  : 'text-[#292929] hover:bg-[#54bb74]/10'
              }`}
            >
              Contact Submissions ({contactSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('brochures')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'brochures'
                  ? 'bg-gradient-to-r from-[#54bb74] to-[#93cfa2] text-white shadow-lg'
                  : 'text-[#292929] hover:bg-[#54bb74]/10'
              }`}
            >
              Brochure Requests ({brochureRequests.length})
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-[#54bb74]/20 overflow-hidden"
        >
          {activeTab === 'contacts' ? (
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
          ) : (
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
          )}
        </motion.div>
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
