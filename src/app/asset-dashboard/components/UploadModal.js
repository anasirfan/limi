'use client';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addAsset, setIsUploading, setUploadProgress } from '../../redux/slices/assetsSlice';
import { addActivity } from '../../redux/slices/activitySlice';
import { FiX, FiUpload, FiFile, FiImage, FiVideo, FiBox } from 'react-icons/fi';

const assetTypeIcons = {
  image: FiImage,
  video: FiVideo,
  '3d': FiBox,
  default: FiFile
};

const getAssetType = (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
    return 'image';
  } else if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(extension)) {
    return 'video';
  } else if (['glb', 'gltf', 'obj', 'fbx', '3ds', 'dae'].includes(extension)) {
    return '3d';
  }
  return 'other';
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function UploadModal({ onClose }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files) => {
    const newFiles = files.map(file => ({
      file,
      id: Date.now() + Math.random(),
      name: file.name,
      size: formatFileSize(file.size),
      type: getAssetType(file),
      tags: [],
      usageContext: '',
      uploadedBy: 'Current User'
    }));
    
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const updateFileMetadata = (fileId, field, value) => {
    setSelectedFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, [field]: value } : f
    ));
  };

  const simulateUpload = async (fileData) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          resolve();
        }
        dispatch(setUploadProgress(progress));
      }, 200);
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    dispatch(setIsUploading(true));
    setUploadingFiles(selectedFiles.map(f => f.id));

    for (const fileData of selectedFiles) {
      try {
        // Simulate upload process
        await simulateUpload(fileData);

        // Create asset object
        const newAsset = {
          name: fileData.name,
          type: fileData.type,
          size: fileData.size,
          url: `https://cdn.limi.com/${fileData.type}s/${fileData.name}`,
          thumbnail: '/api/placeholder/300/200',
          tags: fileData.tags.filter(tag => tag.trim()),
          uploadedBy: fileData.uploadedBy,
          usageContext: fileData.usageContext || `New ${fileData.type} asset`,
          dimensions: fileData.type === 'image' ? '1920x1080' : undefined,
          duration: fileData.type === 'video' ? '1:30' : undefined,
          polygons: fileData.type === '3d' ? '10,000' : undefined,
          format: fileData.name.split('.').pop().toUpperCase()
        };

        // Add to store
        dispatch(addAsset(newAsset));

        // Add activity
        dispatch(addActivity({
          user: fileData.uploadedBy,
          role: 'Frontend Dev',
          action: 'uploaded',
          assetName: fileData.name,
          assetType: fileData.type,
          details: `Uploaded new ${fileData.type} asset: ${fileData.name}`
        }));

      } catch (error) {
      }
    }

    dispatch(setIsUploading(false));
    dispatch(setUploadProgress(0));
    setSelectedFiles([]);
    setUploadingFiles([]);
    onClose();
  };

  const getFileIcon = (type) => {
    const Icon = assetTypeIcons[type] || assetTypeIcons.default;
    return Icon;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Upload Assets</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Drag and Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Supports images, videos, and 3D models (JPG, PNG, MP4, GLB, etc.)
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Choose Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,video/*,.glb,.gltf,.obj,.fbx"
            />
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Selected Files ({selectedFiles.length})
              </h3>
              <div className="space-y-4">
                {selectedFiles.map((fileData) => {
                  const FileIcon = getFileIcon(fileData.type);
                  const isUploading = uploadingFiles.includes(fileData.id);

                  return (
                    <div
                      key={fileData.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start space-x-4">
                        {/* File Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                            <FileIcon className="w-6 h-6 text-gray-600" />
                          </div>
                        </div>

                        {/* File Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {fileData.name}
                            </h4>
                            {!isUploading && (
                              <button
                                onClick={() => removeFile(fileData.id)}
                                className="p-1 hover:bg-gray-200 rounded"
                              >
                                <FiX className="w-4 h-4 text-gray-500" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Basic Info */}
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded ${
                                  fileData.type === 'image' ? 'bg-green-100 text-green-700' :
                                  fileData.type === 'video' ? 'bg-blue-100 text-blue-700' :
                                  fileData.type === '3d' ? 'bg-purple-100 text-purple-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {fileData.type.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-500">{fileData.size}</span>
                              </div>
                            </div>

                            {/* Metadata */}
                            <div className="space-y-2">
                              <input
                                type="text"
                                placeholder="Usage context (e.g., Homepage hero)"
                                value={fileData.usageContext}
                                onChange={(e) => updateFileMetadata(fileData.id, 'usageContext', e.target.value)}
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={isUploading}
                              />
                              <input
                                type="text"
                                placeholder="Tags (comma separated)"
                                value={fileData.tags.join(', ')}
                                onChange={(e) => updateFileMetadata(fileData.id, 'tags', e.target.value.split(',').map(t => t.trim()))}
                                className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                disabled={isUploading}
                              />
                            </div>
                          </div>

                          {/* Upload Progress */}
                          {isUploading && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>Uploading...</span>
                                <span>75%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: '75%' }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedFiles.length > 0 && (
              <span>{selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected</span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || uploadingFiles.length > 0}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {uploadingFiles.length > 0 ? 'Uploading...' : `Upload ${selectedFiles.length} Asset${selectedFiles.length !== 1 ? 's' : ''}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
