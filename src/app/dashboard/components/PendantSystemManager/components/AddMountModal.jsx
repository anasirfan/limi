import React from "react";
import { FaTimes, FaMountain, FaUpload, FaSpinner } from "react-icons/fa";

export default function AddMountModal({
  showModal,
  onClose,
  newMountData,
  handleMountInputChange,
  handleMountIconChange,
  handleMountModelChange,
  mountIconPreview,
  mountModelPreview,
  mountSaving,
  onSave
}) {
  if (!showModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl border border-[#50C878]/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-[#50C878]/20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#50C878] to-[#87CEAB] rounded-2xl flex items-center justify-center">
              <FaMountain className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Add New Mount</h2>
              <p className="text-gray-400">Create a new mount configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-xl flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Mount Name */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-white">
              Mount Name *
            </label>
            <input
              type="text"
              name="mountName"
              value={newMountData.mountName}
              onChange={handleMountInputChange}
              placeholder="Enter mount name"
              required
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#50C878]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#50C878] focus:ring-2 focus:ring-[#50C878]/20 transition-all duration-200"
            />
          </div>

          {/* Mount Icon */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-white">
              Mount Icon *
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMountIconChange}
                  className="hidden"
                  id="mountIcon"
                  required
                />
                <label
                  htmlFor="mountIcon"
                  className="flex items-center justify-center w-full px-4 py-3 bg-[#2a2a2a] border border-[#50C878]/30 rounded-xl text-gray-400 hover:text-white hover:border-[#50C878] cursor-pointer transition-all duration-200"
                >
                  <FaUpload className="mr-2" />
                  Choose Icon Image
                </label>
              </div>
              {mountIconPreview && (
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#50C878]/30">
                  <img
                    src={mountIconPreview}
                    alt="Mount Icon Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mount Model */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-white">
              Mount Model *
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept=".glb,.fbx,.usdz"
                onChange={handleMountModelChange}
                className="hidden"
                id="mountModel"
                required
              />
              <label
                htmlFor="mountModel"
                className="flex items-center justify-center w-full px-4 py-3 bg-[#2a2a2a] border border-[#50C878]/30 rounded-xl text-gray-400 hover:text-white hover:border-[#50C878] cursor-pointer transition-all duration-200"
              >
                <FaUpload className="mr-2" />
                Choose 3D Model (GLB, FBX, USDZ)
              </label>
              {mountModelPreview && (
                <div className="px-4 py-2 bg-[#50C878]/10 border border-[#50C878]/30 rounded-lg">
                  <p className="text-[#50C878] text-sm">Selected: {mountModelPreview}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-xl text-white font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mountSaving || !newMountData.mountName}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#50C878] to-[#87CEAB] hover:from-[#87CEAB] hover:to-[#50C878] rounded-xl text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {mountSaving ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Mount"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
