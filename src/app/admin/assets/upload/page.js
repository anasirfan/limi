'use client';

import { useState, useRef } from 'react';
import { 
  FiUpload, 
  FiFile, 
  FiImage, 
  FiVideo, 
  FiMusic,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiFolder,
  FiTag,
  FiUser,
  FiCalendar,
  FiHardDrive,
  FiSettings,
  FiEye,
  FiDownload,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi';

const fileTypeIcons = {
  image: FiImage,
  video: FiVideo,
  audio: FiMusic,
  document: FiFile,
  archive: FiFolder
};

const categories = [
  'Marketing',
  'Design',
  'Content',
  'Development',
  'Sales',
  'Operations',
  'Legal',
  'HR',
  'Finance',
  'Brand Assets',
  'Product Images',
  'Documentation',
  'Presentations',
  'Social Media',
  'Uncategorized'
];

const uploadPresets = {
  marketing: {
    name: 'Marketing Assets',
    category: 'Marketing',
    tags: ['marketing', 'campaign'],
    description: 'Marketing campaign materials and promotional content'
  },
  product: {
    name: 'Product Media',
    category: 'Product Images',
    tags: ['product', 'showcase'],
    description: 'Product photography and demonstration videos'
  },
  brand: {
    name: 'Brand Assets',
    category: 'Brand Assets',
    tags: ['brand', 'identity'],
    description: 'Logo, brand guidelines, and identity materials'
  },
  social: {
    name: 'Social Media',
    category: 'Social Media',
    tags: ['social', 'content'],
    description: 'Social media posts and engagement content'
  }
};

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('');
  const [globalMetadata, setGlobalMetadata] = useState({
    category: '',
    tags: '',
    description: '',
    visibility: 'private'
  });
  const [uploadMode, setUploadMode] = useState('individual'); // individual or batch
  const fileInputRef = useRef(null);

  const getFileType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'document';
    return 'archive';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

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
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const processedFiles = newFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileType(file.type),
      status: 'pending',
      metadata: {
        category: globalMetadata.category || selectedPreset ? uploadPresets[selectedPreset]?.category || '' : '',
        tags: globalMetadata.tags || selectedPreset ? uploadPresets[selectedPreset]?.tags.join(', ') || '' : '',
        description: globalMetadata.description || selectedPreset ? uploadPresets[selectedPreset]?.description || '' : '',
        visibility: globalMetadata.visibility
      },
      uploadProgress: 0
    }));

    setFiles(prev => [...prev, ...processedFiles]);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const updateFileMetadata = (fileId, field, value) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, metadata: { ...file.metadata, [field]: value } }
        : file
    ));
  };

  const applyPreset = (preset) => {
    if (!preset) return;
    
    const presetData = uploadPresets[preset];
    setGlobalMetadata({
      category: presetData.category,
      tags: presetData.tags.join(', '),
      description: presetData.description,
      visibility: 'private'
    });

    // Apply to existing files if in batch mode
    if (uploadMode === 'batch') {
      setFiles(prev => prev.map(file => ({
        ...file,
        metadata: {
          ...file.metadata,
          category: presetData.category,
          tags: presetData.tags.join(', '),
          description: presetData.description
        }
      })));
    }
  };

  const handleUpload = async () => {
    const filesToUpload = files.filter(f => f.status === 'pending');
    
    for (const file of filesToUpload) {
      // Update file status
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'uploading' } : f
      ));

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[file.id] || 0;
          if (currentProgress >= 100) {
            clearInterval(uploadInterval);
            setFiles(prevFiles => prevFiles.map(f => 
              f.id === file.id ? { ...f, status: 'completed' } : f
            ));
            return prev;
          }
          return { ...prev, [file.id]: currentProgress + 10 };
        });
      }, 200);
    }
  };

  const getTotalSize = () => {
    return files.reduce((total, file) => total + file.file.size, 0);
  };

  const getStatusCounts = () => {
    return files.reduce((counts, file) => {
      counts[file.status] = (counts[file.status] || 0) + 1;
      return counts;
    }, {});
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Asset Upload</h2>
          <p className="text-sm text-gray-600 mt-1">
            Upload and manage your digital assets with metadata
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <FiUpload className="w-4 h-4" />
            <span>Browse Files</span>
          </button>
        </div>
      </div>

      {/* Upload Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiFile className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Files</p>
              <p className="text-2xl font-semibold text-gray-900">{files.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiHardDrive className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Size</p>
              <p className="text-2xl font-semibold text-gray-900">{formatFileSize(getTotalSize())}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiCheckCircle className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">{statusCounts.completed || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center">
            <FiClock className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">{statusCounts.pending || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Configuration</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Upload Mode</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="individual"
                  checked={uploadMode === 'individual'}
                  onChange={(e) => setUploadMode(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Individual (separate metadata)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="batch"
                  checked={uploadMode === 'batch'}
                  onChange={(e) => setUploadMode(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Batch (shared metadata)</span>
              </label>
            </div>
          </div>

          {/* Preset Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Preset</label>
            <select
              value={selectedPreset}
              onChange={(e) => {
                setSelectedPreset(e.target.value);
                applyPreset(e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="">Custom Configuration</option>
              {Object.entries(uploadPresets).map(([key, preset]) => (
                <option key={key} value={key}>{preset.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Global Metadata (Batch Mode) */}
        {uploadMode === 'batch' && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-md font-medium text-gray-900 mb-4">Batch Metadata</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={globalMetadata.category}
                  onChange={(e) => setGlobalMetadata({...globalMetadata, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  value={globalMetadata.tags}
                  onChange={(e) => setGlobalMetadata({...globalMetadata, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={globalMetadata.description}
                  onChange={(e) => setGlobalMetadata({...globalMetadata, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Enter description for all files"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drag and Drop Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.zip,.rar"
        />
        
        <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to browse
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Support for images, videos, audio, documents and archives
        </p>
        <p className="text-xs text-gray-400">
          Maximum file size: 100MB • Supported formats: JPG, PNG, MP4, PDF, DOC, ZIP
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Files to Upload ({files.length})</h3>
            <button
              onClick={handleUpload}
              disabled={files.filter(f => f.status === 'pending').length === 0}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <FiUpload className="w-4 h-4" />
              <span>Upload All</span>
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {files.map((file) => {
              const IconComponent = fileTypeIcons[file.type] || FiFile;
              const progress = uploadProgress[file.id] || 0;
              
              return (
                <div key={file.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{file.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            file.status === 'completed' ? 'bg-green-100 text-green-700' :
                            file.status === 'uploading' ? 'bg-blue-100 text-blue-700' :
                            file.status === 'error' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {file.status === 'completed' && <FiCheck className="w-3 h-3 mr-1" />}
                            {file.status === 'uploading' && <FiClock className="w-3 h-3 mr-1" />}
                            {file.status === 'error' && <FiAlertCircle className="w-3 h-3 mr-1" />}
                            {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                          </span>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="capitalize">{file.type}</span>
                        <span className="mx-2">•</span>
                        <span>{file.size}</span>
                      </div>

                      {/* Upload Progress */}
                      {file.status === 'uploading' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>Uploading...</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Individual Metadata (Individual Mode) */}
                      {uploadMode === 'individual' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <select
                              value={file.metadata.category}
                              onChange={(e) => updateFileMetadata(file.id, 'category', e.target.value)}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                            >
                              <option value="">Select category</option>
                              {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <input
                              type="text"
                              value={file.metadata.tags}
                              onChange={(e) => updateFileMetadata(file.id, 'tags', e.target.value)}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                              placeholder="Tags (comma separated)"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={file.metadata.description}
                              onChange={(e) => updateFileMetadata(file.id, 'description', e.target.value)}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                              placeholder="Description"
                            />
                          </div>
                        </div>
                      )}

                      {/* Batch Metadata Display */}
                      {uploadMode === 'batch' && file.metadata.category && (
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                            <FiFolder className="w-3 h-3 mr-1" />
                            {file.metadata.category}
                          </span>
                          {file.metadata.tags && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                              <FiTag className="w-3 h-3 mr-1" />
                              {file.metadata.tags.split(',').length} tags
                            </span>
                          )}
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
  );
}
