"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEye,
  FaDownload,
  FaShoppingCart,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaChevronDown,
  FaExternalLinkAlt,
  FaSpinner,
} from "react-icons/fa";

export default function SavedConfigurations() {
  const router = useRouter();
  const { user } = useSelector(state => state.user);
  const [configurations, setConfigurations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // Fetch configurations when component mounts
  useEffect(() => {
    if (user?.data?._id) {
      fetchConfigurations();
    }
  }, [user]);
  

  // Fetch configurations from API
  const fetchConfigurations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api1.limitless-lighting.co.uk/admin/products/users/light-configs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.data._id })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch configurations');
      }
      
      const data = await response.json();
      setConfigurations(data);
    } catch (error) {
      console.error('Error fetching configurations:', error);
      toast.error('Failed to load configurations');
    } finally {
      setIsLoading(false);
    }
  };
  console.log("configurations",configurations);
  
  // Delete configuration
  const deleteConfiguration = async (configId) => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      setIsDeleting(true);
      try {
        const response = await fetch(`https://api1.limitless-lighting.co.uk/admin/products/light-configs/${configId}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete configuration');
        }
        
        // Remove from local state
        setConfigurations(prev => prev.filter(config => config._id !== configId));
        
        // Close modal if the deleted config was selected
        if (selectedConfig && selectedConfig._id === configId) {
          setSelectedConfig(null);
        }
        
        toast.success('Configuration deleted successfully');
      } catch (error) {
        console.error('Error deleting configuration:', error);
        toast.error('Failed to delete configuration');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  // View in configurator
  const viewInConfigurator = (configId) => {
    router.push(`/configurator?configId=${configId}`);
  };

  // Filter and sort configurations
  const filteredConfigurations = configurations
    .filter((config) => {
      // Filter by search term
      const matchesSearch = searchTerm === "" || 
        (config.name && config.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (config.config && config.config.light_type && config.config.light_type.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter by status - currently all configs have same status, but keeping for future use
      const matchesStatus = filterStatus === "all";

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by selected field
      let aValue, bValue;
      
      if (sortBy === "updatedAt" || sortBy === "createdAt") {
        aValue = new Date(a[sortBy] || a.createdAt).getTime();
        bValue = new Date(b[sortBy] || b.createdAt).getTime();
      } else if (sortBy === "name") {
        aValue = a.name || "";
        bValue = b.name || "";
      } else if (sortBy === "lightAmount") {
        aValue = a.config?.light_amount || 0;
        bValue = b.config?.light_amount || 0;
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  // View configuration details
  const viewConfigDetails = (config) => {
    setSelectedConfig(config);
  };

  // Close configuration details
  const closeConfigDetails = () => {
    setSelectedConfig(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Saved Configurations</h2>
          <p className="text-gray-400 text-sm">
            View and manage your saved lighting configurations
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:max-w-[250px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#292929] text-white w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#54BB74]"
              placeholder="Search configurations..."
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 bg-[#292929] text-white px-3 py-2 rounded-md hover:bg-[#333] transition-colors"
              >
                <FaFilter />
                <span className="text-sm">
                  {filterStatus === "all" ? "All" : filterStatus}
                </span>
                <FaChevronDown className="text-xs" />
              </button>
              {showFilterDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-[#292929] rounded-md shadow-lg z-10 w-40 py-1">
                  <button
                    onClick={() => {
                      setFilterStatus("all");
                      setShowFilterDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#333] transition-colors"
                  >
                    All
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={toggleSortOrder}
              className="flex items-center gap-2 bg-[#292929] text-white px-3 py-2 rounded-md hover:bg-[#333] transition-colors"
            >
              <FaSortAmountDown
                className={sortOrder === "desc" ? "" : "rotate-180"}
              />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : filteredConfigurations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No configurations found.</p>
          <p className="text-gray-500 text-sm mt-2">
            Create configurations in the configurator to see them here.
          </p>
          <div className="mt-4">
            <Link
              href="/configurator"
              className="inline-flex items-center gap-2 bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
            >
              <span>Go to Configurator</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredConfigurations.map((config) => (
            <motion.div
              key={config._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#292929] rounded-lg overflow-hidden"
            >
              <div className="relative h-48">
                {config.thumbnail?.url ? (
                  <img
                    src={config.thumbnail.url}
                    alt={config.name || 'Configuration'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/images/homepage-products/${Math.floor(Math.random() * 7) + 1}-mobile.jpg`;
                    }}
                  />
                ) : (
                  <img
                    src={`/images/homepage-products/${Math.floor(Math.random() * 7) + 1}-mobile.jpg`}
                    alt="Fallback image"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {config.name || 'Unnamed Configuration'}

                </h3>

                <div className="text-sm text-gray-400 mb-2">
                  <p>Light Type: {config.config?.light_type || 'N/A'}</p>
                  <p>Base Color: {config.config?.cable_color || 'N/A'}</p>
                  <p>Cables Length: {config.config?.cable_length || 'N/A'}</p>
                  <p>Light Amount: {config.config?.light_amount || 'N/A'}</p>
                  {config.config?.base_type && <p>Base Type: {config.config.base_type}</p>}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <div>
                    <span>Created: </span>
                    <span>{formatDate(config.createdAt)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => viewConfigDetails(config)}
                    className="flex-1 flex items-center justify-center gap-1 bg-[#54BB74] text-white px-3 py-2 rounded hover:bg-[#48a064] transition-colors"
                  >
                    <FaEye />
                    <span className="text-sm">View</span>
                  </button>

                  <button 
                    onClick={() => viewInConfigurator(config._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-[#292929] border border-[#54BB74] text-[#54BB74] px-3 py-2 rounded hover:bg-[#54BB74] hover:text-white transition-colors"
                  >
                    <FaEdit />
                    <span className="text-sm">Open</span>
                  </button>

                  <button 
                    onClick={() => deleteConfiguration(config._id)}
                    className="flex items-center justify-center gap-1 bg-[#292929] border border-gray-700 text-white px-3 py-2 rounded hover:bg-red-600 hover:border-red-600 transition-colors"
                    disabled={isDeleting}
                  >
                    {isDeleting ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Configuration Details Modal */}
      {selectedConfig && (
        <div className="fixed inset-0 pt-20 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1e1e1e] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <div className="h-64 relative">
                {selectedConfig.thumbnail?.url ? (
                  <img
                    src={selectedConfig.thumbnail.url}
                    alt={selectedConfig.name || 'Configuration'}
                    className="w-full h-full object-cover rounded-t-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `/images/homepage-products/${Math.floor(Math.random() * 7) + 1}-mobile.jpg`;
                    }}
                  />
                ) : (
                  <img
                    src={`/images/homepage-products/${Math.floor(Math.random() * 7) + 1}-mobile.jpg`}
                    alt="Fallback image"
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                )}
                <button
                  onClick={closeConfigDetails}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedConfig.name || 'Unnamed Configuration'}
                  </h2>
                  <div className="text-sm text-gray-400">
                    Created: {formatDate(selectedConfig.createdAt)}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Configuration Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-[#292929] p-4 rounded-xl border border-[#333] hover:border-[#54BB74] transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#54BB74]"></div>
                        <div className="text-sm font-medium text-gray-400">Light Type</div>
                      </div>
                      <div className="text-lg font-semibold text-white">{selectedConfig.config?.light_type || 'N/A'}</div>
                    </div>
                    
                    <div className="bg-[#292929] p-4 rounded-xl border border-[#333] hover:border-[#54BB74] transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#54BB74]"></div>
                        <div className="text-sm font-medium text-gray-400">Light Amount</div>
                      </div>
                      <div className="text-lg font-semibold text-white">{selectedConfig.config?.light_amount || 'N/A'}</div>
                      
                    </div>
                    <div className="bg-[#292929] p-4 rounded-xl border border-[#333] hover:border-[#54BB74] transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#54BB74]"></div>
                        <div className="text-sm font-medium text-gray-400">Base Color</div>
                      </div>
                      <div className="text-lg font-semibold text-white">{selectedConfig.config?.cable_color || 'N/A'}</div>
                    </div>
                    <div className="bg-[#292929] p-4 rounded-xl border border-[#333] hover:border-[#54BB74] transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#54BB74]"></div>
                        <div className="text-sm font-medium text-gray-400">Cable Length</div>
                      </div>
                      <div className="text-lg font-semibold text-white">{selectedConfig.config?.cable_length || 'N/A'}</div>
                    </div>
                    
                    {selectedConfig.config?.base_type && (
                      <div className="bg-[#292929] p-4 rounded-xl border border-[#333] hover:border-[#54BB74] transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#54BB74]"></div>
                          <div className="text-sm font-medium text-gray-400">Base Type</div>
                        </div>
                        <div className="text-lg font-semibold text-white">{selectedConfig.config.base_type}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Pendants/System Attached */}
                {selectedConfig.config?.cables && Object.keys(selectedConfig.config.cables).length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Pendants/System Attached
                    </h3>
                    <div className="bg-[#292929] p-4 rounded-lg overflow-auto max-h-48">
                      {Object.entries(selectedConfig.config.cables).map(([key, value]) => (
                        <div key={key} className="mb-4 pb-3 border-b border-gray-700 last:border-0 last:pb-0 last:mb-0">
                          <div className="font-medium text-white mb-2">Cable {parseInt(key) + 1}</div>
                          <div className="text-sm text-gray-400">
                            {value.replace(/^Cable \d+: \{|\}$/g, '').split('\n').map((line, index) => 
                              line.trim() ? (
                                <div key={index} className="mb-1 flex">
                                  <span className="mr-2">•</span>
                                  {line.includes(':') ? (
                                    <>
                                      <span className="font-medium">{line.split(':')[0].trim()}</span>
                                      <span>: {line.split(':')[1].trim()}</span>
                                    </>
                                  ) : (
                                    <span>{line.trim()}</span>
                                  )}
                                </div>
                              ) : null
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={() => viewInConfigurator(selectedConfig._id)}
                    className="flex-1 flex items-center  justify-center gap-1 bg-[#292929] border border-[#54BB74] text-[#54BB74] px-2 py-4 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors text-sm"
                  >
                    <FaEdit className="h-4 w-4" />
                    <span>View</span>
                  </button>

                  <button 
                    onClick={() => deleteConfiguration(selectedConfig._id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-[#292929] border border-red-600 text-red-600 px-2 py-2 rounded-md hover:bg-red-600 hover:text-white transition-colors text-sm"
                    disabled={isDeleting}
                  >
                    {isDeleting ? <FaSpinner className="animate-spin h-4 w-4" /> : <FaTrash className="h-4 w-4" />}
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
