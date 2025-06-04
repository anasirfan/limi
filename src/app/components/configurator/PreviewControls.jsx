"use client";
import { useState } from 'react';
import { FaEye, FaSave, FaFolderOpen } from 'react-icons/fa';

export const PreviewControls = ({ 
  isPreviewMode, 
  setIsPreviewMode, 
  config,
  onSaveConfig,
  onLoadConfig
}) => {
  return (
    <div className="absolute top-24 right-8 z-50 flex gap-2">
      <button 
        className={`p-2 rounded-full ${isPreviewMode ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-300'} hover:opacity-90 transition-all`}
        onClick={() => setIsPreviewMode(!isPreviewMode)}
        title={isPreviewMode ? "Exit Preview Mode" : "Enter Preview Mode"}
      >
        <FaEye size={16} />
      </button>
      
      <button 
        className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
        onClick={() => onSaveConfig(config)}
        title="Save Configuration"
      >
        <FaSave size={16} />
      </button>
      
      <button 
        className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
        onClick={onLoadConfig}
        title="Load Configuration"
      >
        <FaFolderOpen size={16} />
      </button>
    </div>
  );
};

export default PreviewControls;
