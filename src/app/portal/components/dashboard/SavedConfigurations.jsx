"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
} from "react-icons/fa";

export default function SavedConfigurations({ configurations }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedConfig, setSelectedConfig] = useState(null);

  // Filter and sort configurations
  const filteredConfigurations = configurations
    .filter((config) => {
      // Filter by search term
      const matchesSearch =
        config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        config.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by status
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "saved" && config.status === "saved") ||
        (filterStatus === "ordered" && config.status === "ordered");

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by selected field
      const aValue = a[sortBy];
      const bValue = b[sortBy];

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
              <button className="flex items-center gap-2 bg-[#292929] text-white px-3 py-2 rounded-md hover:bg-[#333] transition-colors">
                <FaFilter />
                <span className="text-sm">
                  {filterStatus === "all"
                    ? "All"
                    : filterStatus === "saved"
                    ? "Saved"
                    : "Ordered"}
                </span>
                <FaChevronDown className="text-xs" />
              </button>
              <div className="absolute top-full right-0 mt-1 bg-[#292929] rounded-md shadow-lg z-10 w-40 py-1 hidden">
                <button
                  onClick={() => setFilterStatus("all")}
                  className="w-full text-left px-4 py-2 text-white hover:bg-[#333] transition-colors"
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus("saved")}
                  className="w-full text-left px-4 py-2 text-white hover:bg-[#333] transition-colors"
                >
                  Saved
                </button>
                <button
                  onClick={() => setFilterStatus("ordered")}
                  className="w-full text-left px-4 py-2 text-white hover:bg-[#333] transition-colors"
                >
                  Ordered
                </button>
              </div>
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

      {filteredConfigurations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No configurations found.</p>
          <p className="text-gray-500 text-sm mt-2">
            Create configurations in the LIMI mobile app to see them here.
          </p>
          <div className="mt-4">
            <Link
              href="/product-catalog"
              className="inline-flex items-center gap-2 bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
            >
              <span>Browse Products</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredConfigurations.map((config) => (
            <motion.div
              key={config.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#292929] rounded-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={config.thumbnail}
                  alt={config.name}
                  fill
                  className="object-cover"
                />
                {config.status === "ordered" && (
                  <div className="absolute top-2 right-2 bg-[#54BB74] text-white text-xs font-bold px-2 py-1 rounded">
                    Ordered
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {config.name}
                </h3>
                {/* <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {config.description}
                </p> */}

                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <div>
                    <span>Last updated: </span>
                    <span>{formatDate(config.updatedAt)}</span>
                  </div>
                  {/* <div className="font-semibold text-[#54BB74]">
                    ${config.totalPrice.toFixed(2)}
                  </div> */}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => viewConfigDetails(config)}
                    className="flex-1 flex items-center justify-center gap-1 bg-[#54BB74] text-white px-3 py-2 rounded hover:bg-[#48a064] transition-colors"
                  >
                    <FaEye />
                    <span className="text-sm">View</span>
                  </button>
{/* 
                  <button className="flex items-center justify-center gap-1 bg-[#292929] border border-gray-700 text-white px-3 py-2 rounded hover:bg-[#333] transition-colors">
                    <FaShoppingCart />
                    <span className="text-sm">Order</span>
                  </button> */}

                  <button className="flex items-center justify-center gap-1 bg-[#292929] border border-gray-700 text-white px-3 py-2 rounded hover:bg-[#333] transition-colors">
                    <FaDownload />
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
            className="bg-[#1e1e1e] rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <div className="h-80 relative">
                <Image
                  src={selectedConfig.thumbnail}
                  alt={selectedConfig.name}
                  fill
                  className="object-cover  rounded-t-lg"
                />
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
                    {selectedConfig.name}
                  </h2>
                  <div className="text-sm text-gray-400">
                    Created: {formatDate(selectedConfig.createdAt)}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Products
                  </h3>
                  <div className="space-y-3">
                    {selectedConfig.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-[#292929] p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#333] rounded-md flex items-center justify-center text-[#54BB74] text-base">
                            {product.quantity}x
                          </div>
                          <div>
                            <div className="text-white font-medium text-base">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              ID: {product.id}
                            </div>
                            <Link
                              href={`/product-catalog/${product.id}`}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-sm text-[#50C878] hover:underline mt-1"
                            >
                              <span>View Product</span>
                              <FaExternalLinkAlt size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
               
              
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Settings
                  </h3>
                   {/*     {/* <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#292929] p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Brightness</div>
                      <div className="text-base text-white font-medium">{selectedConfig.settings.brightness}%</div>
                      <div className="mt-2 h-1 bg-[#333] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#54BB74]" 
                          style={{ width: `${selectedConfig.settings.brightness}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-[#292929] p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Color Temperature</div>
                      <div className="text-base text-white font-medium">
                        {typeof selectedConfig.settings.colorTemperature === 'number' 
                          ? `${selectedConfig.settings.colorTemperature}K` 
                          : selectedConfig.settings.colorTemperature}
                      </div>
                    </div>
                    
                    <div className="bg-[#292929] p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Scene</div>
                      <div className="text-base text-white font-medium">{selectedConfig.settings.scene}</div>
                    </div>
                  </div> */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-[#292929] p-4 rounded-xl border border-[#333] hover:border-[#54BB74] transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#54BB74]"></div>
                        <div className="text-sm font-medium text-gray-400">Light Type</div>
                      </div>
                      <div className="text-lg font-semibold text-white">Ceiling</div>
                    </div>
                    
                    <div className="bg-[#292929] p-4 rounded-xl border border-[#333] hover:border-[#54BB74] transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#54BB74]"></div>
                        <div className="text-sm font-medium text-gray-400">Light Amount</div>
                      </div>
                      <div className="text-lg font-semibold text-white">6</div>
                    </div>
                    
                    <div className="bg-[#292929] p-4 rounded-xl border border-[#333] hover:border-[#54BB74] transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#54BB74]"></div>
                        <div className="text-sm font-medium text-gray-400">Base Type</div>
                      </div>
                      <div className="text-lg font-semibold text-white">Round</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  {/* <button className="flex-1 flex items-center justify-center gap-2 bg-[#54BB74] text-white px-4 py-3 rounded-md hover:bg-[#48a064] transition-colors text-base">
                    <FaShoppingCart />
                    <span>Order Configuration</span>
                  </button> */}

                  <Link
                    href="#"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#292929] border border-[#54BB74] text-[#54BB74] px-4 py-3 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors text-base"
                  >
                    <FaEdit />
                    <span>View in Configurator</span>
                  </Link>

                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#292929] border border-gray-700 text-white px-4 py-3 rounded-md hover:bg-[#333] transition-colors text-base">
                    <FaDownload />
                    <span>Download</span>
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
