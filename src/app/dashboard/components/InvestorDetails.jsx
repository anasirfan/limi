import React, { useState, useEffect } from 'react';
import { FaSpinner, FaUserTie, FaEnvelope, FaBuilding, FaUsers, FaClock, FaChartLine } from 'react-icons/fa';

export default function InvestorDetails() {
  const [investorData, setInvestorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestorDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('limiToken');
        
        const response = await fetch("https://dev.api1.limitless-lighting.co.uk/admin/dashboard/investor_details", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setInvestorData(Array.isArray(data) ? data : [data] || []);
      } catch (err) {
        console.error('Error fetching investor details:', err);
        setError('Failed to load investor details. Please try again later.');
        setInvestorData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestorDetails();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-xl shadow-2xl border border-[#3a3a3a]">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#54BB74] to-[#4a9d63] rounded-full flex items-center justify-center">
                <FaSpinner className="animate-spin text-2xl text-white" />
              </div>
              <div className="absolute inset-0 w-16 h-16 mx-auto bg-gradient-to-r from-[#54BB74] to-[#4a9d63] rounded-full animate-pulse opacity-30"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Loading Investor Data</h3>
            <p className="text-gray-400">Fetching the latest investor information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-xl shadow-2xl border border-[#3a3a3a]">
        <div className="p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <FaBuilding className="text-2xl text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Connection Error</h3>
          <div className="text-red-400 mb-4">{error}</div>
          <p className="text-gray-400">Unable to load investor data at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden border border-[#3a3a3a]">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#54BB74] to-[#4a9d63] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <FaChartLine className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Limitless AI</h2>
              <p className="text-green-100 opacity-90">Investor Management Dashboard</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{investorData.length}</div>
              <div className="text-green-100 text-sm opacity-90">Active Investors</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#292929] to-[#333333] p-6 rounded-xl border border-[#3a3a3a] hover:border-[#54BB74]/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm mb-2 font-medium">Total Investors</div>
                <div className="text-3xl font-bold text-white">{investorData.length}</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#54BB74] to-[#4a9d63] rounded-xl flex items-center justify-center">
                <FaUsers className="text-white text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#292929] to-[#333333] p-6 rounded-xl border border-[#3a3a3a] hover:border-[#54BB74]/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm mb-2 font-medium">Organizations</div>
                <div className="text-3xl font-bold text-white">
                  {new Set(investorData.map(inv => inv.organization).filter(Boolean)).size}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FaBuilding className="text-white text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#292929] to-[#333333] p-6 rounded-xl border border-[#3a3a3a] hover:border-[#54BB74]/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm mb-2 font-medium">Recent Activity</div>
                <div className="text-3xl font-bold text-white">
                  {investorData.filter(inv => {
                    const createdDate = new Date(inv.createdAt);
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return createdDate > thirtyDaysAgo;
                  }).length}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaClock className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Investor Table */}
        <div className="bg-gradient-to-br from-[#292929] to-[#333333] rounded-xl border border-[#3a3a3a] overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-[#333333] to-[#3a3a3a] border-b border-[#444444]">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <FaUsers className="mr-2 text-[#54BB74]" />
              Investor Directory
            </h3>
          </div>
          
          {investorData.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto bg-gray-600/20 rounded-full flex items-center justify-center mb-4">
                <FaUsers className="text-2xl text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Investors Found</h3>
              <p className="text-gray-500">No investor data is currently available.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#444444]">
                <thead className="bg-gradient-to-r from-[#3a3a3a] to-[#404040]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Investor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Contact Information
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Member Since
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#404040]">
                  {investorData.map((investor, index) => (
                    <tr key={investor._id || index} className="hover:bg-gradient-to-r hover:from-[#333333] hover:to-[#3a3a3a] transition-all duration-200 group">
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className="relative">
                            <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-[#54BB74] to-[#4a9d63] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                              <FaUserTie className="text-white text-lg" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#292929]"></div>
                          </div>
                          <div className="ml-4">
                            <div className="text-base font-semibold text-white group-hover:text-[#54BB74] transition-colors duration-200">
                              {investor.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-400">Active Investor</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <FaEnvelope className="text-blue-400 text-sm" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{investor.email || 'N/A'}</div>
                            <div className="text-xs text-gray-500">Primary Contact</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <FaBuilding className="text-purple-400 text-sm" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{investor.organization || 'N/A'}</div>
                            <div className="text-xs text-gray-500">Organization</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <FaClock className="text-orange-400 text-sm" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {investor.createdAt ? new Date(investor.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              }) : 'N/A'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {investor.createdAt ? (() => {
                                const days = Math.floor((new Date() - new Date(investor.createdAt)) / (1000 * 60 * 60 * 24));
                                return `${days} days ago`;
                              })() : 'Unknown'}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}