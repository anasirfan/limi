'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, sortBy, setSortBy, clearSelection, deleteSelectedAssets } from '../../redux/slices/assetsSlice';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { assetsApi } from '../api/assetsApi';

const sortOptions = [
  { value: 'lastModified', label: 'Last Modified', order: 'desc' },
  { value: 'name', label: 'Name A-Z', order: 'asc' },
  { value: 'name', label: 'Name Z-A', order: 'desc' },
  { value: 'size', label: 'Size (Largest)', order: 'desc' },
  { value: 'size', label: 'Size (Smallest)', order: 'asc' },
  { value: 'uploadedAt', label: 'Upload Date (Newest)', order: 'desc' },
  { value: 'uploadedAt', label: 'Upload Date (Oldest)', order: 'asc' },
  { value: 'type', label: 'Type', order: 'asc' }
];

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export default function SearchBar({ currentFolder }) {
  const dispatch = useDispatch();
  const { searchQuery, filteredAssets, selectedAssets, sortBy, sortOrder } = useSelector(state => state.assets);
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const searchInputRef = useRef(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim()) {
        setIsSearching(true);
        try {
          // Trigger search in parent components
          dispatch(setSearchQuery(query));
          
          // Dispatch custom event for AssetGrid to refetch
          window.dispatchEvent(new CustomEvent('searchUpdated', { 
            detail: { query } 
          }));
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        dispatch(setSearchQuery(''));
        window.dispatchEvent(new CustomEvent('searchUpdated', { 
          detail: { query: '' } 
        }));
      }
    }, 300),
    [dispatch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
    setShowSuggestions(false);
    window.dispatchEvent(new CustomEvent('searchUpdated', { 
      detail: { query: '' } 
    }));
  };

  const handleSortChange = (option) => {
    dispatch(setSortBy({ sortBy: option.value, sortOrder: option.order }));
    setShowSortDropdown(false);
  };

  const getCurrentSortLabel = () => {
    const currentOption = sortOptions.find(
      option => option.value === sortBy && option.order === sortOrder
    );
    return currentOption ? currentOption.label : 'Last Modified';
  };

  const handleBulkActions = (action) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedAssets.length} selected assets?`)) {
          dispatch(deleteSelectedAssets());
        }
        break;
      case 'clear':
        dispatch(clearSelection());
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Search Input */}
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          placeholder="Search assets by name, tags, or context..."
          className="block w-full pl-10 text-black pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        {localQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <FiX className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowSortDropdown(!showSortDropdown)}
          className="flex items-center text-black space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
        >
          <FiFilter className="w-4 h-4" />
          <span>Sort: {getCurrentSortLabel()}</span>
        </button>

        {showSortDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="py-1">
              {sortOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSortChange(option)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    option.value === sortBy && option.order === sortOrder
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedAssets.length > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {selectedAssets.length} selected
          </span>
          <button
            onClick={() => handleBulkActions('delete')}
            className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors text-black"
          >
            Delete
          </button>
          <button
            onClick={() => handleBulkActions('clear')}
            className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showSortDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowSortDropdown(false)}
        />
      )}
    </div>
  );
}
