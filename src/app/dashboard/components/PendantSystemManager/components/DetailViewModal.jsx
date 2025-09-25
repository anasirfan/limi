import React from "react";
import { FaTimes,FaLayerGroup ,FaLightbulb ,FaEye, FaCheck, FaTimes as FaTimesIcon } from "react-icons/fa";

const DetailViewModal = ({ showModal, onClose, item, onViewModel }) => {
  if (!showModal || !item) return null;

  const isChandelier = item.systemType === "chandelier";
  const isSystem = item.isSystem;
  const Icon = isChandelier ? FaLightbulb : isSystem ? FaLayerGroup : FaLightbulb;
  
  const hasModel = item.media?.model?.url || item.model;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#282E2C] rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Product Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FaTimes className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Product Image */}
              {(item.image || item.media?.image?.url) && (
                <div className="lg:col-span-1">
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-700">
                    <img
                      src={item.image || item.media?.image?.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Right Side - Product Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Name</label>
                    <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                  </div>
                  
                  {/* System Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">System Type</label>
                    <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-sm font-medium rounded-full">
                      {item.systemType || (item.isSystem ? 'System' : 'Pendant')}
                    </span>
                  </div>

                  {/* Base Type */}
                  {item.baseType && (
                    <div>
                      <label className="text-sm font-medium text-gray-400 mb-2 block">Base Type</label>
                      <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-sm font-medium rounded-full capitalize">
                        {item.baseType}
                      </span>
                    </div>
                  )}
                </div>

                {/* Message */}
                {item.message && (
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Message</label>
                    <p className="text-gray-300 leading-relaxed">{item.message}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 3D Model Section */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-white">3D Model</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    {hasModel ? 'Interactive 3D preview available' : 'No 3D model available'}
                  </p>
                </div>
                {hasModel && (
                  <button
                    onClick={() => onViewModel(item)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaEye className="mr-2" />
                    View Model
                  </button>
                )}
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-lg font-medium text-white mb-4">Available Options</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.hasGlass ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {item.hasGlass ? <FaCheck className="w-3 h-3" /> : <FaTimesIcon className="w-3 h-3" />}
                  </div>
                  <span className="text-sm text-gray-300">Glass</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.hasGold ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {item.hasGold ? <FaCheck className="w-3 h-3" /> : <FaTimesIcon className="w-3 h-3" />}
                  </div>
                  <span className="text-sm text-gray-300">Gold</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.hasSilver ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {item.hasSilver ? <FaCheck className="w-3 h-3" /> : <FaTimesIcon className="w-3 h-3" />}
                  </div>
                  <span className="text-sm text-gray-300">Silver</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailViewModal;
