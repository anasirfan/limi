import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSpinner,
  FaCube,
  FaLightbulb,
  FaLayerGroup,
  FaCheckSquare,
  FaTimes ,
  FaSquare
} from "react-icons/fa";
import ModelViewer3D from "./ModelViewer3D";

const ProductTable = ({ 
  products, 
  type, 
  onEdit, 
  onDelete, 
  deletingItemId,
  viewMode,
  selectedItems,
  setSelectedItems
}) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [isModelViewerOpen, setIsModelViewerOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const isSystem = type === "system";
  const primaryColor = isSystem ? "#87CEAB" : "#50C878";
  const Icon = isSystem ? FaLayerGroup : FaLightbulb;

  // Use products directly since filtering/sorting is now handled in parent
  const processedProducts = products;

  // Handler functions

  const handleViewModel = (item) => {
    const modelUrl = item.media?.model?.url || item.model;
    setSelectedModel({
      url: modelUrl,
      name: item.name
    });
    setIsModelViewerOpen(true);
  };

  const handleCloseModelViewer = () => {
    setIsModelViewerOpen(false);
    setSelectedModel(null);
  };

  const handleSelectItem = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems && selectedItems.size === processedProducts.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(processedProducts.map(item => item._id)));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Bulk Actions */}
      {selectedItems && selectedItems.size > 0 && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
          <div className="flex items-center space-x-3">
            <span className="text-blue-400 font-medium">
              {selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedItems(new Set())}
              className="px-3 py-2 bg-gray-700/50 text-gray-400 rounded-lg hover:text-white transition-colors duration-200 text-sm"
            >
              Clear Selection
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Delete ${selectedItems.size} selected items?`)) {
                  selectedItems.forEach(id => {
                    const item = processedProducts.find(p => p._id === id);
                    if (item) onDelete(item);
                  });
                  setSelectedItems(new Set());
                }
              }}
              className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-sm"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {viewMode === "table" ? (
        /* Table View */
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl overflow-hidden">
          {/* Table Header with Sorting */}
          <div
            className={`px-6 py-4 ${
              isSystem 
                ? 'bg-gradient-to-r from-[#87CEAB]/10 to-[#87CEAB]/5' 
                : 'bg-gradient-to-r from-[#50C878]/10 to-[#50C878]/5'
            }`}
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Select All Checkbox */}
              <div className="col-span-1 flex items-center space-x-2">
                <button
                  onClick={handleSelectAll}
                  className={`text-lg ${selectedItems.size === processedProducts.length && processedProducts.length > 0 ? (isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]') : 'text-gray-400'} hover:text-white transition-colors duration-200`}
                >
                  {selectedItems.size === processedProducts.length && processedProducts.length > 0 ? <FaCheckSquare /> : <FaSquare />}
                </button>
              </div>
              
              {/* Name Column */}
              <div className={`col-span-2 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
                Name
              </div>
              
              <div className={`col-span-2 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
                Type
              </div>
              
              {/* Message Column */}
              <div className={`col-span-2 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
                Message
              </div>
              
              <div className={`col-span-1 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
                Glass
              </div>
              
              <div className={`col-span-1 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
                Color
              </div>
              
              <div className={`col-span-1 font-semibold text-sm ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
                Model
              </div>
              
              <div className={`col-span-2 font-semibold text-sm text-right ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`}>
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-700">
            {processedProducts.map((item, index) => (
              <div
                key={item._id || index}
                onMouseEnter={() => setHoveredItem(item._id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`group px-6 py-4 transition-all duration-300 relative ${
                  isSystem 
                    ? 'hover:bg-gradient-to-r hover:from-[#87CEAB]/5 hover:to-transparent' 
                    : 'hover:bg-gradient-to-r hover:from-[#50C878]/5 hover:to-transparent'
                } ${selectedItems.has(item._id) ? 'bg-blue-500/10 border-l-4 border-blue-500' : ''}`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Checkbox */}
                  <div className="col-span-1 flex items-center space-x-2">
                    <button
                      onClick={() => handleSelectItem(item._id)}
                      className={`text-lg ${selectedItems.has(item._id) ? (isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]') : 'text-gray-400'} hover:text-white transition-colors duration-200`}
                    >
                      {selectedItems.has(item._id) ? <FaCheckSquare /> : <FaSquare />}
                    </button>
                  </div>

                  {/* Image */}
                  <div className="col-span-2 flex items-center space-x-3">
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
                    <div>
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
                  <div className="col-span-2">
                    <p className="text-gray-400 text-sm truncate">{item.message}</p>
                  </div>

                  {/* Glass Status */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      {item.hasGlass ? (
                        <>
                          <div className="w-4 h-4 bg-blue-500/20 rounded flex items-center justify-center">
                            <svg className="w-2 h-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-blue-400 text-xs font-medium">Glass</span>
                        </>
                      ) : (
                        <>
                          <div className="w-4 h-4 bg-gray-500/20 rounded flex items-center justify-center">
                            <FaTimes className="text-gray-500 text-xs" />
                          </div>
                          <span className="text-gray-500 text-xs">No Glass</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Color Status */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      {item.hasColor ? (
                        <>
                          <div className="w-4 h-4 bg-purple-500/20 rounded flex items-center justify-center">
                            <svg className="w-2 h-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-purple-400 text-xs font-medium">Color</span>
                        </>
                      ) : (
                        <>
                          <div className="w-4 h-4 bg-gray-500/20 rounded flex items-center justify-center">
                            <FaTimes className="text-gray-500 text-xs" />
                          </div>
                          <span className="text-gray-500 text-xs">No Color</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Model Status */}
                  <div className="col-span-1">
                    <div className="flex flex-col space-y-1">
                      {(() => {
                        // Check multiple possible model locations
                        const modelUrl = item.media?.model?.url || item.model;
                        const hasModel = modelUrl && modelUrl.trim() !== '';
                        
                        return hasModel ? (
                          <>
                            <div className="flex items-center space-x-1">
                              <div className="w-4 h-4 bg-yellow-500/20 rounded flex items-center justify-center">
                                <FaCube className="text-yellow-500 text-xs" />
                              </div>
                              <span className="text-green-400 text-xs font-medium">Available</span>
                            </div>
                            <button
                              onClick={() => handleViewModel(item)}
                              className="text-blue-400 hover:text-blue-300 text-xs underline transition-colors duration-200 bg-transparent border-none cursor-pointer text-left"
                            >
                              View 3D
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 bg-gray-500/20 rounded flex items-center justify-center">
                              <FaTimes className="text-gray-500 text-xs" />
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

                {/* Hover Preview Card */}
                {hoveredItem === item._id && (item.image || item.media?.image?.url) && (
                  <div className="absolute left-full top-0 ml-4 z-50 w-80 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-xl p-4 border border-gray-700/50 shadow-2xl">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image || item.media?.image?.url}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-2">{item.name}</h4>
                        <p className="text-gray-400 text-sm mb-3">{item.message}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onEdit(item)}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-colors duration-200"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </button>
                          {(() => {
                            const modelUrl = item.media?.model?.url || item.model;
                            const hasModel = modelUrl && modelUrl.trim() !== '';
                            
                            return hasModel ? (
                              <button
                                onClick={() => handleViewModel(item)}
                                className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs hover:bg-green-500/30 transition-colors duration-200"
                              >
                                <FaCube className="inline mr-1" /> View 3D
                              </button>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {processedProducts.map((item, index) => (
            <div
              key={item._id || index}
              onMouseEnter={() => setHoveredItem(item._id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative group bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                selectedItems.has(item._id) 
                  ? 'border-blue-500 shadow-blue-500/25' 
                  : 'border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              {/* Selection Checkbox */}
              <button
                onClick={() => handleSelectItem(item._id)}
                className={`absolute top-4 right-4 text-lg z-10 ${selectedItems.has(item._id) ? (isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]') : 'text-gray-400'} hover:text-white transition-colors duration-200`}
              >
                {selectedItems.has(item._id) ? <FaCheckSquare /> : <FaSquare />}
              </button>

              {/* Image */}
              <div className="mb-4">
                <div
                  className={`w-full h-32 rounded-xl flex items-center justify-center ${
                    isSystem 
                      ? 'bg-gradient-to-br from-[#87CEAB]/20 to-[#87CEAB]/10' 
                      : 'bg-gradient-to-br from-[#50C878]/20 to-[#50C878]/10'
                  }`}
                >
                  {item.image || item.media?.image?.url ? (
                    <img
                      src={item.image || item.media?.image?.url}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <Icon className={`text-4xl ${isSystem ? 'text-[#87CEAB]' : 'text-[#50C878]'}`} />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white truncate">{item.name}</h4>
                  {isSystem ? (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        item.systemType === "bar"
                          ? "bg-blue-500/20 text-blue-400"
                          : item.systemType === "ball"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {item.systemType || "System"}
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      Pendant
                    </span>
                  )}
                </div>

                <p className="text-gray-400 text-sm line-clamp-2">{item.message}</p>

                {/* Glass and Color Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {item.hasGlass ? (
                      <>
                        <div className="w-3 h-3 bg-blue-500/20 rounded flex items-center justify-center">
                          <svg className="w-2 h-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-blue-400 text-xs">Glass</span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-gray-500/20 rounded flex items-center justify-center">
                          <FaTimes className="text-gray-500 text-xs" />
                        </div>
                        <span className="text-gray-500 text-xs">No Glass</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {item.hasColor ? (
                      <>
                        <div className="w-3 h-3 bg-purple-500/20 rounded flex items-center justify-center">
                          <svg className="w-2 h-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-purple-400 text-xs">Color</span>
                      </>
                    ) : (
                      <>
                        <div className="w-3 h-3 bg-gray-500/20 rounded flex items-center justify-center">
                          <FaTimes className="text-gray-500 text-xs" />
                        </div>
                        <span className="text-gray-500 text-xs">No Color</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Model Status */}
                <div className="flex items-center space-x-2">
                  {(() => {
                    const modelUrl = item.media?.model?.url || item.model;
                    const hasModel = modelUrl && modelUrl.trim() !== '';
                    
                    return hasModel ? (
                      <>
                        <div className="w-4 h-4 bg-yellow-500/20 rounded flex items-center justify-center">
                          <FaCube className="text-yellow-500 text-xs" />
                        </div>
                        <span className="text-green-400 text-xs">3D Model Available</span>
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 bg-gray-500/20 rounded flex items-center justify-center">
                          <FaTimes className="text-gray-500 text-xs" />
                        </div>
                        <span className="text-gray-500 text-xs">No Model</span>
                      </>
                    );
                  })()}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => onEdit(item)}
                    className={`flex-1 px-3 py-2 bg-gradient-to-r ${
                      isSystem
                        ? "from-[#87CEAB] to-[#50C878]"
                        : "from-[#50C878] to-[#87CEAB]"
                    } text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-1`}
                  >
                    <FaEdit className="text-xs" />
                    <span className="text-xs">Edit</span>
                  </button>
                  
                  {(() => {
                    const modelUrl = item.media?.model?.url || item.model;
                    const hasModel = modelUrl && modelUrl.trim() !== '';
                    
                    return hasModel ? (
                      <button
                        onClick={() => handleViewModel(item)}
                        className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-300 hover:bg-blue-500/30 flex items-center justify-center"
                      >
                        <FaCube className="text-xs" />
                      </button>
                    ) : null;
                  })()}
                  
                  <button
                    onClick={() => onDelete(item)}
                    disabled={deletingItemId === item._id}
                    className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg transition-all duration-300 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
      )}

      {/* 3D Model Viewer Modal */}
      {selectedModel && (
        <ModelViewer3D
          modelUrl={selectedModel.url}
          modelName={selectedModel.name}
          isOpen={isModelViewerOpen}
          onClose={handleCloseModelViewer}
        />
      )}
    </div>
  );
};

export default ProductTable;
