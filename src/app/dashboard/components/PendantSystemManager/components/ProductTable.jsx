import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSpinner,
  FaCube,
  FaLightbulb,
  FaLayerGroup,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const ProductTable = ({ products, type, onEdit, onDelete, deletingItemId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const isSystem = type === "system";
  const primaryColor = isSystem ? "#87CEAB" : "#50C878";
  const Icon = isSystem ? FaLayerGroup : FaLightbulb;

  // Filter products based on search query
  const filteredProducts = products.filter((item) => {
    if (!searchQuery || searchQuery.trim() === "") return true;

    const query = searchQuery.toLowerCase().trim();
    const nameMatch = item.name?.toLowerCase().includes(query);
    const messageMatch = item.message?.toLowerCase().includes(query);
    const typeMatch = item.systemType?.toLowerCase().includes(query);
    const designMatch = item.design?.toLowerCase().includes(query);

    return nameMatch || messageMatch || typeMatch || designMatch;
  });

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isSystem 
                ? 'bg-gradient-to-br from-[#87CEAB]/20 to-[#87CEAB]/10' 
                : 'bg-gradient-to-br from-[#50C878]/20 to-[#50C878]/10'
            }`}
          >
            <Icon className={`text-2xl ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              {isSystem ? "System Configurations" : "Individual Pendants"}
            </h3>
            <p className="text-gray-400">
              {isSystem
                ? "Multi-fixture lighting systems"
                : "Single lighting fixtures"}
            </p>
          </div>
        </div>
        <div className="flex gap-4 mr-7 justify-center items-center">
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
                placeholder={`Search ${isSystem ? "systems" : "pendants"}...`}
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
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 px-4 py-2 bg-[#54bb74]/10 border border-[#54bb74]/20 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-[#54bb74]">
                  {filteredProducts.length} result
                  {filteredProducts.length !== 1 ? "s" : ""} found for "
                  {searchQuery}"
                </p>
              </div>
            )}
          </div>
          <div
            className={`px-4 py-3 rounded-xl ${
              isSystem 
                ? 'bg-gradient-to-r from-[#87CEAB]/10 to-[#87CEAB]/5' 
                : 'bg-gradient-to-r from-[#50C878]/10 to-[#50C878]/5'
            }`}
          >
            <span className={`font-semibold whitespace-nowrap ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
              {filteredProducts.length} of {products.length} {isSystem ? "systems" : "items"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div
          className={`px-6 py-4 ${
            isSystem 
              ? 'bg-gradient-to-r from-[#87CEAB]/10 to-[#87CEAB]/5' 
              : 'bg-gradient-to-r from-[#50C878]/10 to-[#50C878]/5'
          }`}
        >
          <div className="grid grid-cols-12 gap-4 items-center">
            <div
              className={`col-span-1 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}
            >
              Image
            </div>
            <div className={`col-span-2 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
              Name
            </div>
            <div className={`col-span-2 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
              Type
            </div>
            <div className={`col-span-3 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
              Message
            </div>
            <div
              className={`col-span-2 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}
            >
              Models
            </div>
            <div
              className={`col-span-2 font-semibold text-sm text-right ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}
            >
              Actions
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-700">
          {filteredProducts.map((item, index) => (
            <div
              key={item._id || index}
              className={`group px-6 py-4 transition-all duration-300 ${
                isSystem 
                  ? 'hover:bg-gradient-to-r hover:from-[#87CEAB]/5 hover:to-transparent' 
                  : 'hover:bg-gradient-to-r hover:from-[#50C878]/5 hover:to-transparent'
              }`}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Image */}
                <div className="col-span-1">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      isSystem 
                        ? 'bg-gradient-to-br from-[#87CEAB]/20 to-[#87CEAB]/10' 
                        : 'bg-gradient-to-br from-[#50C878]/20 to-[#50C878]/10'
                    }`}
                  >
                    {item.image || item.media?.image?.url ? (
                      <img
                        src={item.image || item.media?.image?.url}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                    ) : (
                      <Icon className={`text-lg ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`} />
                    )}
                  </div>
                </div>

                {/* Name */}
                <div className="col-span-2">
                  <h4
                    className={`text-lg font-bold text-white transition-colors duration-300 ${
                      isSystem 
                        ? 'group-hover:text-[#87CEAB]' 
                        : 'group-hover:text-[#50C878]'
                    }`}
                  >
                    {item.name}
                  </h4>
                </div>

                {/* Type */}
                <div className="col-span-2">
                  {isSystem ? (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        item.systemType === "bar"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : item.systemType === "ball"
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      }`}
                    >
                      {item.systemType || "System"}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-green-500/20 text-green-400">
                      Pendant
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="col-span-3">
                  <p className="text-gray-400 text-sm">{item.message}</p>
                </div>

                {/* Models */}
                <div className="col-span-2">
                  <div className="space-y-1">
                    {(() => {
                      const modelUrl = item.media?.model?.url;
                      const hasModel = modelUrl && modelUrl.trim() !== '';
                      
                      return hasModel ? (
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                              <FaCube className="text-yellow-500 text-xs" />
                            </div>
                            <span className="text-green-400 text-xs font-medium">
                              3D Model Available
                            </span>
                          </div>
                          <a
                            href={modelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-xs underline ml-8 transition-colors duration-200"
                          >
                            View Model
                          </a>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-500/20 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-500 text-xs">No Model</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className={`px-4 py-2 bg-gradient-to-r ${
                      isSystem
                        ? "from-[#87CEAB] to-[#50C878]"
                        : "from-[#50C878] to-[#87CEAB]"
                    } text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[${primaryColor}]/25 transform hover:scale-105 flex items-center space-x-1`}
                  >
                    <FaEdit className="text-xs" />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    disabled={deletingItemId === item._id}
                    className="px-3 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 rounded-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingItemId === item._id ? (
                      <FaSpinner className="animate-spin text-xs" />
                    ) : (
                      <FaTrash className="text-xs" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
