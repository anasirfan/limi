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
              <svg
                className={`w-5 h-5 ${
                  newPendantData.systemType !== "" && newPendantData.systemType !== "chandelier"
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
                  d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 4h6"
                />
              </svg>
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
              <svg
                className={`w-5 h-5 ${
                  newPendantData.systemType === "chandelier"
                    ? "text-[#FFD700]"
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
                  d="M12 3v2m0 0c-3.866 0-7 3.134-7 7h2a5 5 0 015-5V5zm0 0c3.866 0 7 3.134 7 7h-2a5 5 0 00-5-5V5zm0 14v2m-4-2a4 4 0 008 0"
                />
              </svg>
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
