import React from "react";
import { generateName } from "../utils/nameGenerator";

const CategorySelection = ({
  newPendantData,
  handlePendantInputChange,
  setNewPendantData,
  pendantSystemData,
}) => {
  const handleCategorySelect = (systemType) => {
    handlePendantInputChange({
      target: { name: "systemType", value: systemType },
    });
  };

  return (
    <div className="mb-6">
      <label className="flex items-center text-gray-300 font-semibold mb-2">
        <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
        Product Category
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Individual Pendant Card */}
        <div
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
            newPendantData.systemType === ""
              ? "border-[#54bb74] bg-gradient-to-br from-[#54bb74]/10 to-[#87CEAB]/10"
              : "border-[#3a3a3a] bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:border-[#54bb74]/50"
          }`}
          onClick={() => handleCategorySelect("")}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                newPendantData.systemType === ""
                  ? "bg-[#54bb74]/20"
                  : "bg-[#333333]"
              }`}
            >
              <img 
                src="/images/configOptions/pendant.png" 
                alt="Individual Pendant"
                className="w-5 h-5 object-contain"
              />
            </div>
            <div>
              <h4
                className={`font-bold text-base ${
                  newPendantData.systemType === ""
                    ? "text-[#54bb74]"
                    : "text-white"
                }`}
              >
                Individual Pendant
              </h4>
              <p className="text-gray-400 text-xs">
                Single lighting fixture
              </p>
            </div>
          </div>
          {newPendantData.systemType === "" && (
            <div className="absolute top-2 right-2">
              <div className="w-5 h-5 bg-[#54bb74] rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* System Configuration Card */}
        <div
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
            newPendantData.systemType !== "" && newPendantData.systemType !== "chandelier"
              ? "border-[#87CEAB] bg-gradient-to-br from-[#87CEAB]/10 to-[#54bb74]/10"
              : "border-[#3a3a3a] bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:border-[#87CEAB]/50"
          }`}
          onClick={() => {
            if (newPendantData.systemType === "") {
              handleCategorySelect("bar");
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                newPendantData.systemType !== "" && newPendantData.systemType !== "chandelier"
                  ? "bg-[#87CEAB]/20"
                  : "bg-[#333333]"
              }`}
            >
              <img 
                src="/images/configOptions/system.png" 
                alt="System Configuration"
                className="w-5 h-5 object-contain"
              />
            </div>
            <div>
              <h4
                className={`font-bold text-base ${
                  newPendantData.systemType !== "" && newPendantData.systemType !== "chandelier"
                    ? "text-[#87CEAB]"
                    : "text-white"
                }`}
              >
                System Configuration
              </h4>
              <p className="text-gray-400 text-xs">
                Multi-light bar, ball, or universal
              </p>
            </div>
          </div>
          {newPendantData.systemType !== "" && newPendantData.systemType !== "chandelier" && (
            <div className="absolute top-2 right-2">
              <div className="w-5 h-5 bg-[#87CEAB] rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Chandelier Card */}
        <div
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
            newPendantData.systemType === "chandelier"
              ? "border-[#FFD700] bg-gradient-to-br from-[#FFD700]/10 to-[#FFFACD]/10"
              : "border-[#3a3a3a] bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:border-[#FFD700]/50"
          }`}
          onClick={() => handleCategorySelect("chandelier")}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                newPendantData.systemType === "chandelier"
                  ? "bg-[#FFD700]/20"
                  : "bg-[#333333]"
              }`}
            >
              <img 
                src="/images/configOptions/chandelier.png" 
                alt="Chandelier"
                className="w-5 h-5 object-contain"
              />
            </div>
            <div>
              <h4
                className={`font-bold text-base ${
                  newPendantData.systemType === "chandelier"
                    ? "text-[#FFD700]"
                    : "text-white"
                }`}
              >
                Chandeliers
              </h4>
              <p className="text-gray-400 text-xs">
                Decorative multi-arm lighting
              </p>
            </div>
          </div>
          {newPendantData.systemType === "chandelier" && (
            <div className="absolute top-2 right-2">
              <div className="w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
