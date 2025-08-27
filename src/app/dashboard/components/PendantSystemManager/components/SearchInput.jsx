import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchInput = ({ searchQuery, setSearchQuery, placeholder = "Search lighting configurations..." }) => {
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400 text-lg" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-gray-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#54bb74]/50 focus:border-[#54bb74]/50 transition-all duration-300"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaTimes className="text-lg" />
          </button>
        )}
      </div>
      {searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 px-4 py-2 bg-[#54bb74]/10 border border-[#54bb74]/20 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-[#54bb74]">
            Searching for: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
