import React from "react";
import { FaCube, FaLightbulb, FaLayerGroup } from "react-icons/fa";
import { getTabCounts } from "../utils/fileUtils";

const TabNavigation = ({ activeTab, setActiveTab, products }) => {
  const tabCounts = getTabCounts(products);

  const tabs = [
    { key: "all", label: "All Products", icon: FaCube },
    { key: "pendant", label: "Pendants", icon: FaLightbulb },
    { key: "system", label: "All Systems", icon: FaLayerGroup },
    { key: "bar", label: "Bar Systems", icon: FaLayerGroup },
    { key: "ball", label: "Ball Systems", icon: FaLayerGroup },
    { key: "universal", label: "Universal Systems", icon: FaLayerGroup },
    { key: "model", label: "With Models", icon: FaCube },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-[#50C878]/20 p-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          const count = tabCounts[tab.key];

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 ${
                isActive
                  ? "bg-gradient-to-r from-[#50C878] to-[#87CEAB] text-white shadow-lg shadow-[#50C878]/25"
                  : "bg-gradient-to-r from-[#50C878]/10 to-[#87CEAB]/10 text-gray-300 hover:text-white border border-[#50C878]/20"
              }`}
            >
              <Icon
                className={`text-lg ${
                  isActive ? "text-white" : "text-[#50C878]"
                }`}
              />
              <span>{tab.label}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[#50C878]/20 text-[#50C878]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
