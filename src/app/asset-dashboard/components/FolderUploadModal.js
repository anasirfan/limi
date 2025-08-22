'use client';

import { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { X, Upload, Folder, File, ChevronRight, AlertCircle, CheckCircle, Clock } from 'react-feather';
import FolderSelector from './FolderSelector';

const FolderUploadModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  
  const [selectedPath, setSelectedPath] = useState('/assets/frontend');
  const [uploadMode, setUploadMode] = useState('files'); // 'files' or 'folder'
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folderStructure, setFolderStructure] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = useCallback((event) => {
    const files = Array.from(event.target.files);
    if (uploadMode === 'folder') {
      // Process folder structure
      const structure = processFolderStructure(files);
      setFolderStructure(structure);
    }
    setSelectedFiles(files);
  }, [uploadMode]);

  const processFolderStructure = (files) => {
    const structure = {};
    
    files.forEach(file => {
      const pathParts = file.webkitRelativePath.split('/');
      let current = structure;
      
      pathParts.forEach((part, index) => {
        if (index === pathParts.length - 1) {
          // It's a file
          if (!current.files) current.files = [];
          current.files.push({
            name: part,
            file: file,
            size: file.size,
            type: file.type
          });
        } else {
          // It's a folder
          if (!current.folders) current.folders = {};
          if (!current.folders[part]) {
            current.folders[part] = {};
          }
          current = current.folders[part];
        }
      });
    });
    
    return structure;
  };

  const renderFolderStructure = (structure, path = '', level = 0) => {
    const items = [];
    
    // Render folders
    if (structure.folders) {
      Object.entries(structure.folders).forEach(([folderName, folderContent]) => {
        const folderPath = path ? `${path}/${folderName}` : folderName;
        items.push(
          <div key={folderPath} className="mb-2">
            <div 
              className="flex items-center py-2 px-3 bg-blue-50 rounded-md"
              style={{ paddingLeft: `${12 + level * 20}px` }}
            >
              <Folder size={16} className="mr-2 text-blue-600" />
              <span className="font-medium text-blue-800">{folderName}</span>
              <span className="ml-2 text-xs text-blue-600">
                ({getFolderStats(folderContent)})
              </span>
            </div>
            <div className="ml-4">
              {renderFolderStructure(folderContent, folderPath, level + 1)}
            </div>
          </div>
        );
      });
    }
    
    // Render files
    if (structure.files) {
      structure.files.forEach(fileInfo => {
        const status = uploadProgress[fileInfo.file.name];
        items.push(
          <div 
            key={fileInfo.file.name}
            className="flex items-center py-2 px-3 hover:bg-gray-50 rounded-md"
            style={{ paddingLeft: `${12 + level * 20}px` }}
          >
            <File size={16} className="mr-2 text-gray-500" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{fileInfo.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {formatFileSize(fileInfo.size)}
                  </span>
                  {status && (
                    <div className="flex items-center">
                      {status.status === 'uploading' && (
                        <>
                          <Clock size={14} className="text-blue-500 mr-1" />
                          <span className="text-xs text-blue-600">{status.progress}%</span>
                        </>
                      )}
                      {status.status === 'completed' && (
                        <CheckCircle size={14} className="text-green-500" />
                      )}
                      {status.status === 'error' && (
                        <AlertCircle size={14} className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {status && status.status === 'uploading' && (
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${status.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      });
    }
    
    return items;
  };

  const getFolderStats = (structure) => {
    let fileCount = 0;
    let folderCount = 0;
    
    const countItems = (struct) => {
      if (struct.files) fileCount += struct.files.length;
      if (struct.folders) {
        folderCount += Object.keys(struct.folders).length;
        Object.values(struct.folders).forEach(countItems);
      }
    };
    
    countItems(structure);
    return `${folderCount} folders, ${fileCount} files`;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateUpload = async (file, targetPath) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: { status: 'completed', progress: 100 }
          }));
          resolve();
        } else {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: { status: 'uploading', progress: Math.round(progress) }
          }));
        }
      }, 200);
    });
  };

  const uploadFiles = async () => {
    setIsUploading(true);
    setUploadProgress({});

    try {
      if (uploadMode === 'folder' && folderStructure) {
        // Upload entire folder structure
        await uploadFolderStructure(folderStructure, selectedPath);
      } else {
        // Upload individual files
        for (const file of selectedFiles) {
          await simulateUpload(file, selectedPath);
        }
      }

      // Dispatch success action
      dispatch({
        type: 'assets/uploadComplete',
        payload: {
          files: selectedFiles,
          path: selectedPath,
          mode: uploadMode
        }
      });

      // Close modal after successful upload
      setTimeout(() => {
        onClose();
        resetModal();
      }, 1000);

    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFolderStructure = async (structure, basePath, currentPath = '') => {
    // Create folders first
    if (structure.folders) {
      for (const [folderName, folderContent] of Object.entries(structure.folders)) {
        const folderPath = currentPath ? `${currentPath}/${folderName}` : folderName;
        
        // Create folder via API
        await createFolder(`${basePath}/${folderPath}`);
        
        // Recursively upload folder contents
        await uploadFolderStructure(folderContent, basePath, folderPath);
      }
    }
    
    // Upload files
    if (structure.files) {
      for (const fileInfo of structure.files) {
        const filePath = currentPath ? `${basePath}/${currentPath}` : basePath;
        await simulateUpload(fileInfo.file, filePath);
      }
    }
  };

  const createFolder = async (folderPath) => {
    // API call to create folder
    console.log('Creating folder:', folderPath);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
  };

  const resetModal = () => {
    setSelectedFiles([]);
    setFolderStructure(null);
    setUploadProgress({});
    setUploadMode('files');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (folderInputRef.current) folderInputRef.current.value = '';
  };

  const handleClose = () => {
    if (!isUploading) {
      onClose();
      resetModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Upload Assets</h2>
            <p className="text-sm text-gray-600 mt-1">
              Upload files or entire folders to your asset library
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isUploading}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {/* Destination Folder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Folder
            </label>
            <FolderSelector
              selectedPath={selectedPath}
              onPathChange={setSelectedPath}
              onCreateFolder={createFolder}
            />
          </div>

          {/* Upload Mode Selection */}
          <div>
            <label className="block text-sm  font-medium text-gray-700 mb-3">
              Upload Mode
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  name="uploadMode"
                  value="files"
                  checked={uploadMode === 'files'}
                  onChange={(e) => setUploadMode(e.target.value)}
                  className="mr-2 text-black"
                  disabled={isUploading}
                />
                <File size={16} className="mr-2 text-gray-500" />
                Individual Files
              </label>
              <label className="flex items-center text-black">
                <input
                  type="radio"
                  name="uploadMode"
                  value="folder"
                  checked={uploadMode === 'folder'}
                  onChange={(e) => setUploadMode(e.target.value)}
                  className="mr-2"
                  disabled={isUploading}
                />
                <Folder size={16} className="mr-2 text-gray-500" />
                Entire Folder
              </label>
            </div>
          </div>

          {/* File Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select {uploadMode === 'folder' ? 'Folder' : 'Files'}
            </label>
            
            {uploadMode === 'files' ? (
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                disabled={isUploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              />
            ) : (
              <input
                ref={folderInputRef}
                type="file"
                webkitdirectory=""
                directory=""
                multiple
                onChange={handleFileSelect}
                disabled={isUploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              />
            )}
          </div>

          {/* Selected Files/Folder Preview */}
          {(selectedFiles.length > 0 || folderStructure) && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {uploadMode === 'folder' ? 'Folder Structure Preview' : 'Selected Files'}
              </h3>
              <div className="border border-gray-200 rounded-md p-4 max-h-60 overflow-y-auto bg-gray-50">
                {uploadMode === 'folder' && folderStructure ? (
                  renderFolderStructure(folderStructure)
                ) : (
                  selectedFiles.map(file => {
                    const status = uploadProgress[file.name];
                    return (
                      <div key={file.name} className="flex items-center justify-between py-2 px-3 hover:bg-white rounded-md">
                        <div className="flex items-center">
                          <File size={16} className="mr-2 text-gray-500" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </span>
                          {status && (
                            <div className="flex items-center">
                              {status.status === 'uploading' && (
                                <>
                                  <Clock size={14} className="text-blue-500 mr-1" />
                                  <span className="text-xs text-blue-600">{status.progress}%</span>
                                </>
                              )}
                              {status.status === 'completed' && (
                                <CheckCircle size={14} className="text-green-500" />
                              )}
                              {status.status === 'error' && (
                                <AlertCircle size={14} className="text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedFiles.length > 0 && (
              <span>
                {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
                {uploadMode === 'folder' && folderStructure && (
                  <span className="ml-2">({getFolderStats(folderStructure)})</span>
                )}
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              disabled={isUploading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={uploadFiles}
              disabled={selectedFiles.length === 0 || isUploading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} className="mr-2" />
                  Upload {uploadMode === 'folder' ? 'Folder' : 'Files'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderUploadModal;
