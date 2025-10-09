import React, { useState } from "react";
import {
  FaCube,
  FaLightbulb,
  FaLayerGroup,
  FaSearch,
  FaTimes,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaTh,
  FaList,
  FaEye,
  FaFilter,
  FaMountain
} from "react-icons/fa";
import { getTabCounts } from "../utils/fileUtils";

const TabNavigation = ({ 
  activeTab, 
  setActiveTab, 
  products,
  searchQuery,
  setSearchQuery,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  viewMode,
  setViewMode,
  activeFilters,
  setActiveFilters,
  processedProducts,
  mounts = []
}) => {
  const tabCounts = getTabCounts(products, mounts);

  // Filter products for display based on active tab
  let displayedProducts = products;
  if (activeTab === "chandelier") {
    displayedProducts = products.filter((p) => p.systemType === "chandelier");
  }

  // Handler functions
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const toggleFilter = (filter) => {
    const newFilters = new Set(activeFilters);
    if (newFilters.has(filter)) {
      newFilters.delete(filter);
    } else {
      newFilters.add(filter);
    }
    setActiveFilters(newFilters);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-500" />;
    return sortDirection === 'asc' ? 
      <FaSortUp className="text-[#50C878]" /> : 
      <FaSortDown className="text-[#50C878]" />;
  };

  const tabs = [
    { key: "all", label: "All Products", icon: FaCube },
    { key: "pendant", label: "Pendants", icon: FaLightbulb },
    { key: "system", label: "All Systems", icon: FaLayerGroup },
    { key: "bar", label: "Bar Systems", icon: FaLayerGroup },
    { key: "ball", label: "Ball Systems", icon: FaLayerGroup },
    { key: "universal", label: "Universal Systems", icon: FaLayerGroup },
    { key: "chandelier", label: "Chandeliers", icon: FaLightbulb },
    { key: "model", label: "With Models", icon: FaCube },
    { key: "mount", label: "Mounts", icon: FaMountain },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-[#50C878]/20 p-6 space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const count = tabCounts[tab.key];

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 ${
                isActive
                  ? "bg-gradient-to-r from-[#50C878] to-[#87CEAB] text-white shadow-lg shadow-[#50C878]/25"
                  : "bg-gradient-to-r from-[#50C878]/10 to-[#87CEAB]/10 text-gray-300 hover:text-white border border-[#50C878]/20"
              }`}
            >
              <Icon
                className={`text-lg ${
                  isActive ? "text-white" : "text-[#50C878]"
                }`}
              />
              <span>{tab.label}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[#50C878]/20 text-[#50C878]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 text-lg" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-12 py-3 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54bb74]/50 focus:border-[#54bb74]/50 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaTimes className="text-lg" />
              </button>
            )}
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* View Toggle */}
          <div className="flex bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 rounded-md transition-all duration-200 ${
                viewMode === "table"
                  ? 'bg-gradient-to-r from-[#50C878] to-[#87CEAB] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaList className="text-sm" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 rounded-md transition-all duration-200 ${
                viewMode === "grid"
                  ? 'bg-gradient-to-r from-[#50C878] to-[#87CEAB] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaTh className="text-sm" />
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2">
            {[
              { key: "hasModel", label: "Has Model", icon: FaCube },
              { key: "noModel", label: "No Model", icon: FaTimes },
              { key: "hasImage", label: "Has Image", icon: FaEye }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => toggleFilter(filter.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                  activeFilters.has(filter.key)
                    ? 'bg-gradient-to-r from-[#50C878]/20 to-[#87CEAB]/20 text-[#50C878] border border-[#50C878]/30'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600/30 hover:text-white hover:border-gray-500/50'
                }`}
              >
                <filter.icon className="text-xs" />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => handleSort('name')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                sortField === 'name'
                  ? 'bg-gradient-to-r from-[#50C878]/20 to-[#87CEAB]/20 text-[#50C878] border border-[#50C878]/30'
                  : 'bg-gray-700/50 text-gray-400 border border-gray-600/30 hover:text-white hover:border-gray-500/50'
              }`}
            >
              <span>Name</span>
              {getSortIcon('name')}
            </button>
            <button
              onClick={() => handleSort('message')}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                sortField === 'message'
                  ? 'bg-gradient-to-r from-[#50C878]/20 to-[#87CEAB]/20 text-[#50C878] border border-[#50C878]/30'
                  : 'bg-gray-700/50 text-gray-400 border border-gray-600/30 hover:text-white hover:border-gray-500/50'
              }`}
            >
              <span>Message</span>
              {getSortIcon('message')}
            </button>
          </div>

          {/* Results Count */}
          <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#50C878]/10 to-[#50C878]/5">
            <span className="font-semibold whitespace-nowrap text-[#50C878]">
              {processedProducts?.length || 0} of {products.length} items
            </span>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || activeFilters.size > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-400">Active filters:</span>
          {searchQuery && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
              <FaSearch className="text-xs" />
              <span>"{searchQuery}"</span>
              <button onClick={handleClearSearch} className="hover:text-blue-300">
                <FaTimes className="text-xs" />
              </button>
            </div>
          )}
          {Array.from(activeFilters).map(filter => (
            <div key={filter} className="flex items-center space-x-1 px-3 py-1 bg-[#50C878]/20 text-[#50C878] rounded-full text-xs">
              <span>{filter.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              <button onClick={() => toggleFilter(filter)} className="hover:opacity-70">
                <FaTimes className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabNavigation;
