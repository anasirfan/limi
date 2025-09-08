import React from "react";

const ProductDetailsForm = ({ newPendantData, handlePendantInputChange }) => {
  return (
    <div className="space-y-6 mb-6">
      {/* Product Name and System Message */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="flex items-center text-gray-300 font-semibold mb-2">
            <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
            Product Name *
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="name"
              value={newPendantData.name}
              onChange={handlePendantInputChange}
              placeholder="e.g., Atom5, Prism, Piko"
              className="w-full bg-gradient-to-r from-[#1e1e1e] to-[#252525] text-white px-4 py-3 rounded-lg border border-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#54bb74] focus:border-transparent transition-all duration-300 hover:border-[#54bb74]/50 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="flex items-center text-gray-300 font-semibold mb-2">
            <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
            System Message *
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="message"
              value={newPendantData.message}
              onChange={handlePendantInputChange}
              placeholder="e.g., product_5, system_base_1"
              className="w-full bg-gradient-to-r from-[#1e1e1e] to-[#252525] text-white px-4 py-3 rounded-lg border border-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#54bb74] focus:border-transparent transition-all duration-300 hover:border-[#54bb74]/50 placeholder-gray-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Glass, Gold, and Silver Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Glass Option */}
        <div className="space-y-3">
          <label className="flex items-center text-gray-300 font-semibold mb-2">
            <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
            Glass Option
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="hasGlass"
                value="true"
                checked={newPendantData.hasGlass === true}
                onChange={(e) => handlePendantInputChange({
                  target: { name: 'hasGlass', value: true }
                })}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                newPendantData.hasGlass === true 
                  ? 'border-[#54bb74] bg-[#54bb74]' 
                  : 'border-gray-400 group-hover:border-[#54bb74]'
              }`}>
                {newPendantData.hasGlass === true && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                newPendantData.hasGlass === true ? 'text-[#54bb74]' : 'text-gray-300'
              }`}>
                Glass
              </span>
            </label>
            
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="hasGlass"
                value="false"
                checked={newPendantData.hasGlass === false}
                onChange={(e) => handlePendantInputChange({
                  target: { name: 'hasGlass', value: false }
                })}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                newPendantData.hasGlass === false 
                  ? 'border-[#54bb74] bg-[#54bb74]' 
                  : 'border-gray-400 group-hover:border-[#54bb74]'
              }`}>
                {newPendantData.hasGlass === false && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                newPendantData.hasGlass === false ? 'text-[#54bb74]' : 'text-gray-300'
              }`}>
                No Glass
              </span>
            </label>
          </div>
        </div>

        {/* Gold Option */}
        <div className="space-y-3">
          <label className="flex items-center text-gray-300 font-semibold mb-2">
            <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
            Gold Option
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="hasGold"
                value="true"
                checked={newPendantData.hasGold === true}
                onChange={(e) => handlePendantInputChange({
                  target: { name: 'hasGold', value: true }
                })}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                newPendantData.hasGold === true 
                  ? 'border-[#54bb74] bg-[#54bb74]' 
                  : 'border-gray-400 group-hover:border-[#54bb74]'
              }`}>
                {newPendantData.hasGold === true && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                newPendantData.hasGold === true ? 'text-[#54bb74]' : 'text-gray-300'
              }`}>
                Gold
              </span>
            </label>
            
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="hasGold"
                value="false"
                checked={newPendantData.hasGold === false}
                onChange={(e) => handlePendantInputChange({
                  target: { name: 'hasGold', value: false }
                })}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                newPendantData.hasGold === false 
                  ? 'border-[#54bb74] bg-[#54bb74]' 
                  : 'border-gray-400 group-hover:border-[#54bb74]'
              }`}>
                {newPendantData.hasGold === false && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                newPendantData.hasGold === false ? 'text-[#54bb74]' : 'text-gray-300'
              }`}>
                No Gold
              </span>
            </label>
          </div>
        </div>

        {/* Silver Option */}
        <div className="space-y-3">
          <label className="flex items-center text-gray-300 font-semibold mb-2">
            <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
            Silver Option
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="hasSilver"
                value="true"
                checked={newPendantData.hasSilver === true}
                onChange={(e) => handlePendantInputChange({
                  target: { name: 'hasSilver', value: true }
                })}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                newPendantData.hasSilver === true 
                  ? 'border-[#54bb74] bg-[#54bb74]' 
                  : 'border-gray-400 group-hover:border-[#54bb74]'
              }`}>
                {newPendantData.hasSilver === true && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                newPendantData.hasSilver === true ? 'text-[#54bb74]' : 'text-gray-300'
              }`}>
                Silver
              </span>
            </label>
            
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="hasSilver"
                value="false"
                checked={newPendantData.hasSilver === false}
                onChange={(e) => handlePendantInputChange({
                  target: { name: 'hasSilver', value: false }
                })}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                newPendantData.hasSilver === false 
                  ? 'border-[#54bb74] bg-[#54bb74]' 
                  : 'border-gray-400 group-hover:border-[#54bb74]'
              }`}>
                {newPendantData.hasSilver === false && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${
                newPendantData.hasSilver === false ? 'text-[#54bb74]' : 'text-gray-300'
              }`}>
                No Silver
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsForm;
