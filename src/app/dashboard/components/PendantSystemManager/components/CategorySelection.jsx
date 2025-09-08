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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              <svg
                className={`w-5 h-5 ${
                  newPendantData.systemType === ""
                    ? "text-[#54bb74]"
                    : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
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
            newPendantData.systemType !== ""
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
                newPendantData.systemType !== ""
                  ? "bg-[#87CEAB]/20"
                  : "bg-[#333333]"
              }`}
            >
              <svg
                className={`w-5 h-5 ${
                  newPendantData.systemType !== ""
                    ? "text-[#87CEAB]"
                    : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h4
                className={`font-bold text-base ${
                  newPendantData.systemType !== ""
                    ? "text-[#87CEAB]"
                    : "text-white"
                }`}
              >
                System Configuration
              </h4>
              <p className="text-gray-400 text-xs">
                Multiple connected fixtures
              </p>
            </div>
          </div>
          {newPendantData.systemType !== "" && (
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
      </div>
    </div>
  );
};

export default CategorySelection;
