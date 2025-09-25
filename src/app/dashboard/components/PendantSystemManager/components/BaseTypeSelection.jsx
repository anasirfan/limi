import React from "react";

const BaseTypeSelection = ({ newPendantData, handlePendantInputChange }) => {
  const baseTypes = [
    { id: "round", name: "Round", image: "/images/configBase/round.png" },
    { id: "rectangular", name: "Rectangular", image: "/images/configBase/rectangular.png" }
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Base Type <span className="text-red-400">*</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        {baseTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => handlePendantInputChange({ target: { name: "baseType", value: type.id } })}
            className={`
              p-4 rounded-lg border-2 transition-all duration-300 flex flex-col items-center gap-2
              ${
                newPendantData.baseType === type.id
                  ? "border-[#50C878] bg-[#50C878]/10 text-[#50C878]"
                  : "border-[#3a3a3a] bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:bg-[#50C878]/5"
              }
            `}
          >
            <img 
              src={type.image} 
              alt={type.name}
              className="w-12 h-12 object-contain"
            />
            <span className="font-medium">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BaseTypeSelection;
