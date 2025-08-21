'use client';

import { useState, useEffect } from 'react';
import { 
  FiFilter, 
  FiX, 
  FiSearch, 
  FiCalendar,
  FiUser,
  FiFolder,
  FiSave,
  FiTrash2,
  FiChevronDown,
  FiRefreshCw,
  FiSettings,
  FiInfo,
  FiHelpCircle
} from 'react-icons/fi';
import { KeyboardShortcutsProvider, ShortcutIndicator } from './KeyboardShortcuts';
import { 
  LoadingButton, 
  LoadingOverlay, 
  FadeIn, 
  StaggerChildren,
  useLoadingState 
} from './LoadingStates';
import { useNotifications } from './NotificationToast';

const AdvancedFilterPanel = ({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  currentFilters = {},
  assets = []
}) => {
  const [filters, setFilters] = useState({
    search: '',
    type: [],
    status: [],
    category: [],
    uploadedBy: [],
    dateRange: {
      start: '',
      end: ''
    },
    sizeRange: {
      min: '',
      max: ''
    },
    tags: []
  });

  const [savedSearches, setSavedSearches] = useState([
    { id: 1, name: 'Pending Marketing Assets', filters: { status: ['pending'], category: ['Marketing'] } },
    { id: 2, name: 'Large Video Files', filters: { type: ['video'], sizeRange: { min: '50' } } },
    { id: 3, name: 'Recent Uploads', filters: { dateRange: { start: '2024-01-01' } } }
  ]);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    advanced: false,
    saved: true
  });
  const [showShortcutsInfo, setShowShortcutsInfo] = useState(false);

  // Initialize notification system
  const { notifications, dismissNotification, success, error, warning, info } = useNotifications();

  // Loading states
  const { loading: applyLoading, startLoading: startApply, stopLoading: stopApply } = useLoadingState();
  const { loading: saveLoading, startLoading: startSave, stopLoading: stopSave } = useLoadingState();
  const { loading: clearLoading, startLoading: startClear, stopLoading: stopClear } = useLoadingState();

  // Extract unique values from assets for filter options
  const filterOptions = {
    types: ['image', 'video', 'audio', 'document'],
    statuses: ['approved', 'pending', 'rejected'],
    categories: [...new Set(assets.map(asset => asset.category).filter(Boolean))],
    uploaders: [...new Set(assets.map(asset => asset.uploadedBy).filter(Boolean))]
  };

  useEffect(() => {
    setFilters(prev => ({ ...prev, ...currentFilters }));
  }, [currentFilters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleMultiSelectChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const handleDateRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value
      }
    }));
  };

  const handleSizeRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      sizeRange: {
        ...prev.sizeRange,
        [type]: value
      }
    }));
  };

  const handleApplyFilters = async () => {
    startApply();
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      onApplyFilters(filters);
      success(`Applied ${getActiveFilterCount()} filter${getActiveFilterCount() !== 1 ? 's' : ''}`);
      onClose();
    } catch (err) {
      error('Failed to apply filters');
    } finally {
      stopApply();
    }
  };

  const handleClearFilters = async () => {
    startClear();
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const clearedFilters = {
        search: '',
        type: [],
        status: [],
        category: [],
        uploadedBy: [],
        dateRange: { start: '', end: '' },
        sizeRange: { min: '', max: '' },
        tags: []
      };
      setFilters(clearedFilters);
      onApplyFilters(clearedFilters);
      success('All filters cleared');
    } catch (err) {
      error('Failed to clear filters');
    } finally {
      stopClear();
    }
  };

  const handleSaveSearch = async () => {
    if (searchName.trim()) {
      startSave();
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600));
        const newSearch = {
          id: Date.now(),
          name: searchName,
          filters: { ...filters }
        };
        setSavedSearches(prev => [...prev, newSearch]);
        setSearchName('');
        setShowSaveDialog(false);
        success(`Search "${searchName}" saved successfully`);
      } catch (err) {
        error('Failed to save search');
      } finally {
        stopSave();
      }
    }
  };

  const handleLoadSearch = (searchFilters) => {
    setFilters(searchFilters);
    onApplyFilters(searchFilters);
    info('Search loaded successfully');
  };

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(prev => prev.filter(search => search.id !== searchId));
    warning('Search deleted');
  };

  const handleFocusSearch = () => {
    const searchInput = document.querySelector('input[placeholder="Search assets..."]');
    if (searchInput) {
      searchInput.focus();
    }
  };

  const handleToggleSection = (section) => {
    toggleSection(section);
    info(`${section} section ${expandedSections[section] ? 'collapsed' : 'expanded'}`);
  };

  // Keyboard shortcuts handlers
  const keyboardHandlers = {
    'cmd+f': handleFocusSearch,
    'cmd+enter': handleApplyFilters,
    'cmd+shift+c': handleClearFilters,
    'cmd+s': () => setShowSaveDialog(true),
    'cmd+1': () => handleToggleSection('basic'),
    'cmd+2': () => handleToggleSection('advanced'),
    'cmd+3': () => handleToggleSection('saved'),
    'cmd+i': () => setShowShortcutsInfo(true),
    onEscape: () => {
      setShowSaveDialog(false);
      setShowShortcutsInfo(false);
      onClose();
    },
    onCommand: (commandId) => {
      switch (commandId) {
        case 'apply-filters':
          handleApplyFilters();
          break;
        case 'clear-filters':
          handleClearFilters();
          break;
        case 'save-search':
          setShowSaveDialog(true);
          break;
        case 'focus-search':
          handleFocusSearch();
          break;
        case 'toggle-basic':
          handleToggleSection('basic');
          break;
        case 'toggle-advanced':
          handleToggleSection('advanced');
          break;
        case 'toggle-saved':
          handleToggleSection('saved');
          break;
        default:
          info(`Command "${commandId}" executed`);
      }
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.type.length > 0) count++;
    if (filters.status.length > 0) count++;
    if (filters.category.length > 0) count++;
    if (filters.uploadedBy.length > 0) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.sizeRange.min || filters.sizeRange.max) count++;
    if (filters.tags.length > 0) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <KeyboardShortcutsProvider handlers={keyboardHandlers}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Loading Overlay */}
          <LoadingOverlay loading={applyLoading || clearLoading} />
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <FiFilter className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
              {getActiveFilterCount() > 0 && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {getActiveFilterCount()} active
                </span>
              )}
              <button
                onClick={() => setShowShortcutsInfo(true)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Keyboard Shortcuts (Cmd+I)"
              >
                <FiInfo className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                Press <ShortcutIndicator shortcut="cmd+/" className="inline" /> for help
              </span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex h-[calc(90vh-140px)]">
            {/* Main Filter Panel */}
            <div className="flex-1 p-6 overflow-y-auto">
              <StaggerChildren>
                <div className="space-y-6">
                  {/* Basic Filters */}
                  <FadeIn>
                    <div>
                      <button
                        onClick={() => handleToggleSection('basic')}
                        className="flex items-center justify-between w-full text-left group"
                      >
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-gray-900">Basic Filters</h4>
                          <ShortcutIndicator shortcut="cmd+1" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.basic ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {expandedSections.basic && (
                        <FadeIn delay={100}>
                          <div className="mt-4 space-y-4">
                            {/* Search */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                              <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                  type="text"
                                  value={filters.search}
                                  onChange={(e) => handleFilterChange('search', e.target.value)}
                                  placeholder="Search assets..."
                                  className="w-full pl-10 pr-16 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                  <ShortcutIndicator shortcut="cmd+f" />
                                </div>
                              </div>
                            </div>

                            {/* File Type */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
                              <div className="grid grid-cols-2 gap-2">
                                {filterOptions.types.map(type => (
                                  <label key={type} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={filters.type.includes(type)}
                                      onChange={() => handleMultiSelectChange('type', type)}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700 capitalize">{type}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Status */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                              <div className="grid grid-cols-3 gap-2">
                                {filterOptions.statuses.map(status => (
                                  <label key={status} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={filters.status.includes(status)}
                                      onChange={() => handleMultiSelectChange('status', status)}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700 capitalize">{status}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Category */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                              <div className="grid grid-cols-2 gap-2">
                                {filterOptions.categories.map(category => (
                                  <label key={category} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={filters.category.includes(category)}
                                      onChange={() => handleMultiSelectChange('category', category)}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{category}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </FadeIn>
                      )}
                    </div>
                  </FadeIn>

                  {/* Advanced Filters */}
                  <FadeIn delay={200}>
                    <div className="border-t border-gray-200 pt-6">
                      <button
                        onClick={() => handleToggleSection('advanced')}
                        className="flex items-center justify-between w-full text-left group"
                      >
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-gray-900">Advanced Filters</h4>
                          <ShortcutIndicator shortcut="cmd+2" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.advanced ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {expandedSections.advanced && (
                        <FadeIn delay={100}>
                          <div className="mt-4 space-y-4">
                            {/* Uploaded By */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Uploaded By</label>
                              <div className="grid grid-cols-2 gap-2">
                                {filterOptions.uploaders.map(uploader => (
                                  <label key={uploader} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={filters.uploadedBy.includes(uploader)}
                                      onChange={() => handleMultiSelectChange('uploadedBy', uploader)}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{uploader}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Date Range */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Date Range</label>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">From</label>
                                  <input
                                    type="date"
                                    value={filters.dateRange.start}
                                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">To</label>
                                  <input
                                    type="date"
                                    value={filters.dateRange.end}
                                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* File Size Range */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">File Size (MB)</label>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Min</label>
                                  <input
                                    type="number"
                                    value={filters.sizeRange.min}
                                    onChange={(e) => handleSizeRangeChange('min', e.target.value)}
                                    placeholder="0"
                                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Max</label>
                                  <input
                                    type="number"
                                    value={filters.sizeRange.max}
                                    onChange={(e) => handleSizeRangeChange('max', e.target.value)}
                                    placeholder="1000"
                                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </FadeIn>
                      )}
                    </div>
                  </FadeIn>
                </div>
              </StaggerChildren>
            </div>

            {/* Saved Searches Sidebar */}
            <div className="w-80 border-l border-gray-200 bg-gray-50">
              <div className="p-4">
                <button
                  onClick={() => handleToggleSection('saved')}
                  className="flex items-center justify-between w-full text-left mb-4 group"
                >
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900">Saved Searches</h4>
                    <ShortcutIndicator shortcut="cmd+3" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.saved ? 'rotate-180' : ''}`} />
                </button>

                {expandedSections.saved && (
                  <FadeIn>
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowSaveDialog(true)}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-white transition-colors group"
                      >
                        <FiSave className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Save Current Search</span>
                        <ShortcutIndicator shortcut="cmd+s" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {savedSearches.map(search => (
                          <div key={search.id} className="bg-white rounded-lg border border-gray-200 p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-medium text-gray-900">{search.name}</h5>
                              <button
                                onClick={() => handleDeleteSearch(search.id)}
                                className="p-1 text-gray-400 hover:text-red-600"
                              >
                                <FiTrash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-xs text-gray-500 mb-2">
                              {Object.entries(search.filters).filter(([_, value]) => 
                                Array.isArray(value) ? value.length > 0 : value
                              ).map(([key, value]) => (
                                <span key={key} className="inline-block bg-gray-100 rounded px-2 py-1 mr-1 mb-1">
                                  {key}: {Array.isArray(value) ? value.join(', ') : JSON.stringify(value)}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={() => handleLoadSearch(search.filters)}
                              className="w-full text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                            >
                              Load Search
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <LoadingButton
                loading={clearLoading}
                loadingText="Clearing..."
                onClick={handleClearFilters}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span>Clear All</span>
                <ShortcutIndicator shortcut="cmd+shift+c" className="ml-2" />
              </LoadingButton>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <LoadingButton
                loading={applyLoading}
                loadingText="Applying..."
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                icon={FiFilter}
              >
                <span>Apply Filters</span>
                <ShortcutIndicator shortcut="cmd+enter" className="ml-2" />
              </LoadingButton>
            </div>
          </div>

          {/* Save Search Dialog */}
          {showSaveDialog && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <FadeIn>
                <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                  <LoadingOverlay loading={saveLoading} />
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Save Search</h4>
                  <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Enter search name..."
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveSearch()}
                  />
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => setShowSaveDialog(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <LoadingButton
                      loading={saveLoading}
                      loadingText="Saving..."
                      onClick={handleSaveSearch}
                      disabled={!searchName.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save
                    </LoadingButton>
                  </div>
                </div>
              </FadeIn>
            </div>
          )}

          {/* Shortcuts Info Modal */}
          {showShortcutsInfo && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <FadeIn>
                <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h4>
                    <button
                      onClick={() => setShowShortcutsInfo(false)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Focus search</span>
                      <ShortcutIndicator shortcut="cmd+f" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Apply filters</span>
                      <ShortcutIndicator shortcut="cmd+enter" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Clear all filters</span>
                      <ShortcutIndicator shortcut="cmd+shift+c" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Save search</span>
                      <ShortcutIndicator shortcut="cmd+s" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Toggle basic filters</span>
                      <ShortcutIndicator shortcut="cmd+1" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Toggle advanced filters</span>
                      <ShortcutIndicator shortcut="cmd+2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Toggle saved searches</span>
                      <ShortcutIndicator shortcut="cmd+3" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Show this help</span>
                      <ShortcutIndicator shortcut="cmd+i" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Close modal</span>
                      <ShortcutIndicator shortcut="esc" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          )}
        </div>
      </div>
    </KeyboardShortcutsProvider>
  );
};

export default AdvancedFilterPanel;
