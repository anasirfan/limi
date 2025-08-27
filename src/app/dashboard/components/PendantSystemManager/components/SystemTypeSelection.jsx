import React from "react";
import { generateName } from "../utils/nameGenerator";

const SystemTypeSelection = ({
  newPendantData,
  handlePendantInputChange,
  setNewPendantData,
  pendantSystemData,
}) => {
  const handleSystemTypeSelect = (systemType) => {
    handlePendantInputChange({
      target: { name: "systemType", value: systemType },
    });
    
    // Auto-generate unique name
    const existingNames = pendantSystemData.map(
      (p) => p.name?.toLowerCase?.() || ""
    );
    let newName = generateName(existingNames);
    while (existingNames.includes(newName.toLowerCase())) {
      newName = generateName(existingNames);
    }
    setNewPendantData((prev) => ({ ...prev, name: newName }));
  };

  const systemTypes = [
    {
      key: "bar",
      label: "Bar System",
      description: "Linear arrangement",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      key: "universal",
      label: "Universal",
      description: "Flexible setup",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: "ball",
      label: "Ball System",
      description: "Spherical design",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-3 px-6 mb-6">
      <label className="flex items-center text-gray-300 font-semibold mb-2">
        <div className="w-2 h-2 bg-[#87CEAB] rounded-full mr-2"></div>
        System Type
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {systemTypes.map((type) => (
          <div
            key={type.key}
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              newPendantData.systemType === type.key
                ? "border-[#87CEAB] bg-gradient-to-br from-[#87CEAB]/10 to-[#54bb74]/10"
                : "border-[#3a3a3a] bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:border-[#87CEAB]/50"
            }`}
            onClick={() => handleSystemTypeSelect(type.key)}
          >
            <div className="text-center">
              <div
                className={`w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                  newPendantData.systemType === type.key
                    ? "bg-[#87CEAB]/20"
                    : "bg-[#333333]"
                }`}
              >
                <div
                  className={`${
                    newPendantData.systemType === type.key
                      ? "text-[#87CEAB]"
                      : "text-gray-400"
                  }`}
                >
                  {type.icon}
                </div>
              </div>
              <h5
                className={`font-medium text-sm ${
                  newPendantData.systemType === type.key
                    ? "text-[#87CEAB]"
                    : "text-white"
                }`}
              >
                {type.label}
              </h5>
              <p className="text-gray-400 text-xs">{type.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemTypeSelection;
