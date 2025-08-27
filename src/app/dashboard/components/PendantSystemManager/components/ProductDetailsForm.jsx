import React from "react";

const ProductDetailsForm = ({ newPendantData, handlePendantInputChange }) => {
  return (
    <div className="grid grid-cols-1 p-6 lg:grid-cols-2 gap-4 mb-6">
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
  );
};

export default ProductDetailsForm;
