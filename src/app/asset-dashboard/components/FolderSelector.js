'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Folder, FolderPlus, Search, Home, X } from 'react-feather';

const FolderSelector = ({ 
  selectedPath = '/', 
  onPathChange, 
  onCreateFolder,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(new Set(['/', '/assets']));
  const [folderStructure, setFolderStructure] = useState({
    '/': {
      name: 'Root',
      children: {
        '/assets': {
          name: 'Assets',
          children: {
            '/assets/images': { name: 'Images', children: {} },
            '/assets/documents': { name: 'Documents', children: {} },
            '/assets/videos': { name: 'Videos', children: {} },
            '/assets/frontend': {
              name: 'Frontend',
              children: {
                '/assets/frontend/components': { name: 'Components', children: {} },
                '/assets/frontend/styles': { name: 'Styles', children: {} },
                '/assets/frontend/public': { name: 'Public', children: {} }
              }
            }
          }
        },
        '/uploads': {
          name: 'Uploads',
          children: {
            '/uploads/2024': { name: '2024', children: {} },
            '/uploads/temp': { name: 'Temporary', children: {} }
          }
        }
      }
    }
  });
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBreadcrumbs = (path) => {
    if (path === '/') return [{ name: 'Root', path: '/' }];
    
    const parts = path.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Root', path: '/' }];
    
    let currentPath = '';
    parts.forEach(part => {
      currentPath += `/${part}`;
      const folder = getFolderByPath(currentPath);
      breadcrumbs.push({
        name: folder?.name || part,
        path: currentPath
      });
    });
    
    return breadcrumbs;
  };

  const getFolderByPath = (path) => {
    const parts = path === '/' ? [] : path.split('/').filter(Boolean);
    let current = folderStructure['/'];
    
    for (const part of parts) {
      const fullPath = `/${parts.slice(0, parts.indexOf(part) + 1).join('/')}`;
      current = current?.children?.[fullPath];
      if (!current) break;
    }
    
    return current;
  };

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const selectFolder = (path) => {
    onPathChange(path);
    setIsOpen(false);
  };

  const createNewFolder = async (parentPath, folderName) => {
    if (!folderName.trim()) return;
    
    const newPath = parentPath === '/' ? `/${folderName}` : `${parentPath}/${folderName}`;
    
    // Update local state
    setFolderStructure(prev => {
      const updated = { ...prev };
      const parent = getFolderByPath(parentPath);
      if (parent) {
        parent.children[newPath] = {
          name: folderName,
          children: {}
        };
      }
      return updated;
    });

    // Expand parent folder
    setExpandedFolders(prev => new Set([...prev, parentPath]));
    
    // Call API to create folder
    if (onCreateFolder) {
      await onCreateFolder(newPath, folderName);
    }
  };

  const filterFolders = (folders, searchTerm) => {
    if (!searchTerm) return folders;
    
    const filtered = {};
    Object.entries(folders).forEach(([path, folder]) => {
      if (folder.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        filtered[path] = folder;
      } else if (folder.children) {
        const filteredChildren = filterFolders(folder.children, searchTerm);
        if (Object.keys(filteredChildren).length > 0) {
          filtered[path] = { ...folder, children: filteredChildren };
        }
      }
    });
    
    return filtered;
  };

  const renderFolder = (path, folder, level = 0) => {
    const isExpanded = expandedFolders.has(path);
    const hasChildren = folder.children && Object.keys(folder.children).length > 0;
    const isSelected = selectedPath === path;

    return (
      <div key={path} className="select-none">
        <div
          className={`flex items-center py-2 px-3 hover:bg-gray-50 cursor-pointer rounded-md transition-colors ${
            isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
          }`}
          style={{ paddingLeft: `${12 + level * 20}px` }}
          onClick={() => selectFolder(path)}
        >
          <div className="flex items-center flex-1">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(path);
                }}
                className="mr-1 p-1 hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-6" />}
            <Folder size={16} className="mr-2 text-gray-500" />
            <span className="truncate">{folder.name}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const folderName = prompt('Enter folder name:');
              if (folderName) {
                createNewFolder(path, folderName);
              }
            }}
            className="ml-2 p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            title="Create subfolder"
          >
            <FolderPlus size={14} />
          </button>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {Object.entries(folder.children).map(([childPath, childFolder]) =>
              renderFolder(childPath, childFolder, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const breadcrumbs = getBreadcrumbs(selectedPath);
  const displayFolders = searchTerm 
    ? filterFolders(folderStructure['/'].children, searchTerm)
    : folderStructure['/'].children;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Breadcrumb Display */}
      <div className="mb-2">
        <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-md px-3 py-2">
          <Home size={14} className="mr-2" />
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center">
              {index > 0 && <ChevronRight size={12} className="mx-1 text-gray-400" />}
              <button
                onClick={() => onPathChange(crumb.path)}
                className="hover:text-blue-600 transition-colors"
              >
                {crumb.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Folder Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <div className="flex items-center">
          <Folder size={16} className="mr-2 text-gray-500" />
          <span className="truncate text-black">
            {selectedPath === '/' ? 'Root' : getFolderByPath(selectedPath)?.name || selectedPath}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search folders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 text-black pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Folder Tree */}
          <div className="max-h-60 overflow-y-auto">
            <div className="p-2">
              {/* Root folder */}
              <div
                className={`flex items-center py-2 px-3 hover:bg-gray-50 cursor-pointer rounded-md transition-colors ${
                  selectedPath === '/' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
                onClick={() => selectFolder('/')}
              >
                <Home size={16} className="mr-2 text-gray-500" />
                <span>Root</span>
              </div>
              
              {/* Folder tree */}
              {Object.entries(displayFolders).map(([path, folder]) =>
                renderFolder(path, folder, 0)
              )}
            </div>
          </div>

          {/* Create New Folder */}
          <div className="border-t border-gray-200 p-3">
            <button
              onClick={() => {
                const folderName = prompt('Enter folder name:');
                if (folderName) {
                  createNewFolder(selectedPath, folderName);
                }
              }}
              className="w-full flex items-center justify-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <FolderPlus size={16} className="mr-2" />
              Create New Folder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderSelector;
