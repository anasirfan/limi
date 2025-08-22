'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Folder, 
  FolderPlus, 
  Search, 
  Home, 
  ChevronRight, 
  ChevronDown, 
  MoreVertical,
  Copy,
  Edit3,
  Trash2,
  Move,
  Share2,
  Star,
  Download,
  X
} from 'react-feather';

const FolderNavigation = ({ 
  currentPath = '/', 
  onPathChange, 
  onFolderCreate,
  className = '' 
}) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(new Set(['/', '/assets']));
  const [contextMenu, setContextMenu] = useState(null);
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const [selectedFolders, setSelectedFolders] = useState(new Set());
  const [isCreatingFolder, setIsCreatingFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState('');
  
  const contextMenuRef = useRef(null);
  const newFolderInputRef = useRef(null);

  // Mock folder structure - replace with Redux state
  const [folderStructure, setFolderStructure] = useState({
    '/': {
      id: 'root',
      name: 'Root',
      path: '/',
      children: {
        '/assets': {
          id: 'assets',
          name: 'Assets',
          path: '/assets',
          assetCount: 156,
          size: '2.4 GB',
          lastModified: '2024-01-15T10:30:00Z',
          children: {
            '/assets/images': { 
              id: 'images',
              name: 'Images', 
              path: '/assets/images',
              assetCount: 89,
              size: '1.2 GB',
              lastModified: '2024-01-14T15:20:00Z',
              children: {
                '/assets/images/products': {
                  id: 'products',
                  name: 'Products',
                  path: '/assets/images/products',
                  assetCount: 45,
                  size: '800 MB',
                  lastModified: '2024-01-13T09:15:00Z',
                  children: {}
                },
                '/assets/images/marketing': {
                  id: 'marketing',
                  name: 'Marketing',
                  path: '/assets/images/marketing',
                  assetCount: 32,
                  size: '350 MB',
                  lastModified: '2024-01-12T14:45:00Z',
                  children: {}
                }
              }
            },
            '/assets/documents': { 
              id: 'documents',
              name: 'Documents', 
              path: '/assets/documents',
              assetCount: 23,
              size: '45 MB',
              lastModified: '2024-01-10T11:30:00Z',
              children: {} 
            },
            '/assets/videos': { 
              id: 'videos',
              name: 'Videos', 
              path: '/assets/videos',
              assetCount: 12,
              size: '1.1 GB',
              lastModified: '2024-01-08T16:20:00Z',
              children: {} 
            },
            '/assets/frontend': {
              id: 'frontend',
              name: 'Frontend',
              path: '/assets/frontend',
              assetCount: 234,
              size: '156 MB',
              lastModified: '2024-01-16T08:45:00Z',
              children: {
                '/assets/frontend/components': { 
                  id: 'components',
                  name: 'Components', 
                  path: '/assets/frontend/components',
                  assetCount: 89,
                  size: '67 MB',
                  lastModified: '2024-01-16T08:30:00Z',
                  children: {} 
                },
                '/assets/frontend/styles': { 
                  id: 'styles',
                  name: 'Styles', 
                  path: '/assets/frontend/styles',
                  assetCount: 45,
                  size: '23 MB',
                  lastModified: '2024-01-15T17:15:00Z',
                  children: {} 
                },
                '/assets/frontend/public': { 
                  id: 'public',
                  name: 'Public', 
                  path: '/assets/frontend/public',
                  assetCount: 100,
                  size: '66 MB',
                  lastModified: '2024-01-14T12:00:00Z',
                  children: {} 
                }
              }
            }
          }
        },
        '/uploads': {
          id: 'uploads',
          name: 'Uploads',
          path: '/uploads',
          assetCount: 45,
          size: '890 MB',
          lastModified: '2024-01-17T09:30:00Z',
          children: {
            '/uploads/2024': { 
              id: '2024',
              name: '2024', 
              path: '/uploads/2024',
              assetCount: 38,
              size: '750 MB',
              lastModified: '2024-01-17T09:30:00Z',
              children: {} 
            },
            '/uploads/temp': { 
              id: 'temp',
              name: 'Temporary', 
              path: '/uploads/temp',
              assetCount: 7,
              size: '140 MB',
              lastModified: '2024-01-16T18:45:00Z',
              children: {} 
            }
          }
        }
      }
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isCreatingFolder && newFolderInputRef.current) {
      newFolderInputRef.current.focus();
    }
  }, [isCreatingFolder]);

  const getBreadcrumbs = (path) => {
    if (path === '/') return [{ name: 'Root', path: '/', id: 'root' }];
    
    const parts = path.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Root', path: '/', id: 'root' }];
    
    let currentPath = '';
    parts.forEach(part => {
      currentPath += `/${part}`;
      const folder = getFolderByPath(currentPath);
      breadcrumbs.push({
        name: folder?.name || part,
        path: currentPath,
        id: folder?.id || currentPath
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
  };

  const handleContextMenu = (e, folder) => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      folder: folder
    });
  };

  const copyFolderURL = (folder) => {
    const url = `${window.location.origin}/asset-dashboard?folder=${encodeURIComponent(folder.path)}`;
    navigator.clipboard.writeText(url);
    setContextMenu(null);
    
    // Show toast notification
    dispatch({
      type: 'ui/showNotification',
      payload: {
        type: 'success',
        message: 'Folder URL copied to clipboard'
      }
    });
  };

  const createNewFolder = async (parentPath, folderName) => {
    if (!folderName.trim()) return;
    
    const newPath = parentPath === '/' ? `/${folderName}` : `${parentPath}/${folderName}`;
    const newFolder = {
      id: `folder_${Date.now()}`,
      name: folderName,
      path: newPath,
      assetCount: 0,
      size: '0 MB',
      lastModified: new Date().toISOString(),
      children: {}
    };

    // Update local state
    setFolderStructure(prev => {
      const updated = { ...prev };
      const parent = getFolderByPath(parentPath);
      if (parent) {
        parent.children[newPath] = newFolder;
      }
      return updated;
    });

    // Expand parent folder
    setExpandedFolders(prev => new Set([...prev, parentPath]));
    
    // Reset creation state
    setIsCreatingFolder(null);
    setNewFolderName('');
    
    // Call API to create folder
    if (onFolderCreate) {
      await onFolderCreate(newPath, folderName);
    }
  };

  const handleKeyPress = (e, parentPath) => {
    if (e.key === 'Enter') {
      createNewFolder(parentPath, newFolderName);
    } else if (e.key === 'Escape') {
      setIsCreatingFolder(null);
      setNewFolderName('');
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

  const formatLastModified = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const renderFolder = (path, folder, level = 0) => {
    const isExpanded = expandedFolders.has(path);
    const hasChildren = folder.children && Object.keys(folder.children).length > 0;
    const isSelected = currentPath === path;
    const isHovered = hoveredFolder === path;

    return (
      <div key={path} className="select-none">
        <div
          className={`group flex items-center py-2 px-3 hover:bg-gray-50 cursor-pointer rounded-md transition-colors ${
            isSelected ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500' : 'text-gray-700'
          }`}
          style={{ paddingLeft: `${12 + level * 20}px` }}
          onClick={() => selectFolder(path)}
          onContextMenu={(e) => handleContextMenu(e, folder)}
          onMouseEnter={() => setHoveredFolder(path)}
          onMouseLeave={() => setHoveredFolder(null)}
        >
          <div className="flex items-center flex-1 min-w-0">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(path);
                }}
                className="mr-1 p-1 hover:bg-gray-200 rounded flex-shrink-0"
              >
                {isExpanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-6 flex-shrink-0" />}
            <Folder size={16} className={`mr-2 flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="truncate font-medium">{folder.name}</span>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {folder.assetCount} items
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCreatingFolder(path);
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                    title="Create subfolder"
                  >
                    <FolderPlus size={12} />
                  </button>
                  <button
                    onClick={(e) => handleContextMenu(e, folder)}
                    className="p-1 hover:bg-gray-200 rounded"
                    title="More actions"
                  >
                    <MoreVertical size={12} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <span>{folder.size}</span>
                <span>{formatLastModified(folder.lastModified)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* New folder input */}
        {isCreatingFolder === path && (
          <div 
            className="flex items-center py-2 px-3 bg-blue-50 rounded-md mx-3 mb-2"
            style={{ paddingLeft: `${12 + (level + 1) * 20}px` }}
          >
            <Folder size={16} className="mr-2 text-blue-600" />
            <input
              ref={newFolderInputRef}
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, path)}
              onBlur={() => {
                if (newFolderName.trim()) {
                  createNewFolder(path, newFolderName);
                } else {
                  setIsCreatingFolder(null);
                  setNewFolderName('');
                }
              }}
              placeholder="New folder name"
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-blue-800 placeholder-blue-400"
            />
          </div>
        )}
        
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

  const breadcrumbs = getBreadcrumbs(currentPath);
  const displayFolders = searchTerm 
    ? filterFolders(folderStructure['/'].children, searchTerm)
    : folderStructure['/'].children;

  return (
    <div className={`flex flex-col h-full bg-white border-r border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Folders</h3>
          <button
            onClick={() => setIsCreatingFolder('/')}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Create new folder"
          >
            <FolderPlus size={16} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search folders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

      {/* Breadcrumbs */}
      <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center text-sm text-gray-600 overflow-x-auto">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center flex-shrink-0">
              {index === 0 ? (
                <Home size={14} className="mr-1" />
              ) : (
                <ChevronRight size={12} className="mx-1 text-gray-400" />
              )}
              <button
                onClick={() => selectFolder(crumb.path)}
                className="hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {crumb.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Folder Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* Root folder */}
        <div
          className={`flex items-center py-2 px-3 hover:bg-gray-50 cursor-pointer rounded-md transition-colors mb-2 ${
            currentPath === '/' ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500' : 'text-gray-700'
          }`}
          onClick={() => selectFolder('/')}
          onContextMenu={(e) => handleContextMenu(e, folderStructure['/'])}
        >
          <Home size={16} className="mr-2 text-gray-500" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium">Root</span>
              <span className="text-xs text-gray-500">All items</span>
            </div>
          </div>
        </div>
        
        {/* Folder tree */}
        {Object.entries(displayFolders).map(([path, folder]) =>
          renderFolder(path, folder, 0)
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed z-50 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-48"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={() => copyFolderURL(contextMenu.folder)}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Copy size={14} className="mr-2" />
            Copy URL
          </button>
          <button
            onClick={() => {
              setContextMenu(null);
              // Handle rename
            }}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Edit3 size={14} className="mr-2" />
            Rename
          </button>
          <button
            onClick={() => {
              setContextMenu(null);
              // Handle move
            }}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Move size={14} className="mr-2" />
            Move
          </button>
          <button
            onClick={() => {
              setContextMenu(null);
              // Handle share
            }}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Share2 size={14} className="mr-2" />
            Share
          </button>
          <button
            onClick={() => {
              setContextMenu(null);
              // Handle download
            }}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Download size={14} className="mr-2" />
            Download
          </button>
          <div className="border-t border-gray-100 my-1"></div>
          <button
            onClick={() => {
              setContextMenu(null);
              // Handle delete
            }}
            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} className="mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FolderNavigation;
