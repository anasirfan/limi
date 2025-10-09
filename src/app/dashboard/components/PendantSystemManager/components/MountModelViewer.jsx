import React, { useState } from "react";
import { FaTimes, FaEye, FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import ModelViewer3D from "./ModelViewer3D";

export default function MountModelViewer({ 
  isOpen, 
  onClose, 
  mount 
}) {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen || !mount) return null;

  const handleCopyUrl = async () => {
    if (mount.modelUrl) {
      try {
        await navigator.clipboard.writeText(mount.modelUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    }
  };

  const handleOpenInNewTab = () => {
    if (mount.modelUrl) {
      window.open(mount.modelUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl border border-[#50C878]/20 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#50C878]/20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#50C878] to-[#87CEAB] rounded-2xl flex items-center justify-center">
              <FaEye className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{mount.mountName}</h2>
              <p className="text-gray-400">3D Model Viewer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-xl flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Model Viewer */}
        <div className="p-6">
          {mount.modelUrl ? (
            <div className="space-y-6">
              {/* 3D Model Display */}
              <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl border border-[#50C878]/20 overflow-hidden" style={{ height: '500px' }}>
                <ModelViewer3D
                  modelUrl={mount.modelUrl}
                  isOpen={isOpen}
                  onClose={onClose}
                  title={mount.mountName}
                  showHeader={false}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleOpenInNewTab}
                  className="px-6 py-3 bg-gradient-to-r from-[#50C878] to-[#87CEAB] hover:from-[#87CEAB] hover:to-[#50C878] rounded-xl text-white font-semibold transition-all duration-200 flex items-center justify-center"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Open Model
                </button>
                <button
                  onClick={handleCopyUrl}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                    copySuccess
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-[#50C878]/20 hover:bg-[#50C878]/30 text-[#50C878] border border-[#50C878]/30"
                  }`}
                >
                  <FaCopy className="mr-2" />
                  {copySuccess ? "Copied!" : "Copy URL"}
                </button>
              </div>

              {/* Model Info */}
              <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl border border-[#50C878]/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Model Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1">
                      Mount Name
                    </label>
                    <p className="text-white">{mount.mountName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-1">
                      Model URL
                    </label>
                    <p className="text-[#50C878] break-all text-sm">{mount.modelUrl}</p>
                  </div>
                  {mount.iconUrl && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-1">
                        Icon Preview
                      </label>
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#50C878]/20">
                        <img
                          src={mount.iconUrl}
                          alt={mount.mountName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl border border-[#50C878]/20 p-12 text-center" style={{ height: '500px' }}>
              <div className="h-full flex items-center justify-center">
                <div className="space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-3xl flex items-center justify-center mx-auto">
                    <FaEye className="text-4xl text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">No Model Available</h3>
                    <p className="text-gray-400">
                      This mount doesn't have a 3D model associated with it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#50C878]/20">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-xl text-white font-semibold transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
