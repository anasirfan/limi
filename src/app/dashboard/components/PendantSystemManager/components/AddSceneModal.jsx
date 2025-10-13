import React from "react";
import { FaTimes, FaImage, FaUpload, FaSpinner } from "react-icons/fa";

export default function AddSceneModal({
  showModal,
  onClose,
  newSceneData,
  handleSceneInputChange,
  handleSceneIconChange,
  handleSceneModelChange,
  sceneIconPreview,
  sceneModelPreview,
  sceneSaving,
  onSave
}) {
  if (!showModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl border border-[#50C878]/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-[#50C878]/20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#50C878] to-[#87CEAB] rounded-2xl flex items-center justify-center">
              <FaImage className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Add New Scene</h2>
              <p className="text-gray-400">Create a new scene configuration</p>
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
          {/* Scene Name */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-white">
              Scene Name *
            </label>
            <input
              type="text"
              name="sceneName"
              value={newSceneData.sceneName}
              onChange={handleSceneInputChange}
              placeholder="Enter scene name"
              required
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#50C878]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#50C878] focus:ring-2 focus:ring-[#50C878]/20 transition-all duration-200"
            />
          </div>

          {/* Scene Icon */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-white">
              Scene Icon *
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSceneIconChange}
                  className="hidden"
                  id="sceneIcon"
                  required
                />
                <label
                  htmlFor="sceneIcon"
                  className="flex items-center justify-center w-full px-4 py-3 bg-[#2a2a2a] border border-[#50C878]/30 rounded-xl text-gray-400 hover:text-white hover:border-[#50C878] cursor-pointer transition-all duration-200"
                >
                  <FaUpload className="mr-2" />
                  Choose Icon Image
                </label>
              </div>
              {sceneIconPreview && (
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#50C878]/30">
                  <img
                    src={sceneIconPreview}
                    alt="Scene Icon Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Scene Model */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-white">
              Scene Model *
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept=".glb,.fbx,.usdz"
                onChange={handleSceneModelChange}
                className="hidden"
                id="sceneModel"
                required
              />
              <label
                htmlFor="sceneModel"
                className="flex items-center justify-center w-full px-4 py-3 bg-[#2a2a2a] border border-[#50C878]/30 rounded-xl text-gray-400 hover:text-white hover:border-[#50C878] cursor-pointer transition-all duration-200"
              >
                <FaUpload className="mr-2" />
                Choose 3D Model (GLB, FBX, USDZ)
              </label>
              {sceneModelPreview && (
                <div className="px-4 py-2 bg-[#50C878]/10 border border-[#50C878]/30 rounded-lg">
                  <p className="text-[#50C878] text-sm">Selected: {sceneModelPreview}</p>
                </div>
              )}
            </div>
          </div>

          {/* Camera Configuration */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#50C878]/30 to-transparent"></div>
              <h3 className="text-xl font-semibold text-white">Camera Configuration</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#50C878]/30 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Min Yaw */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">
                  Minimum Yaw *
                  <span className="text-gray-400 font-normal ml-2">(can be negative)</span>
                </label>
                <input
                  type="number"
                  name="minYaw"
                  value={newSceneData.minYaw}
                  onChange={handleSceneInputChange}
                  placeholder="e.g., -40"
                  required
                  step="any"
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#50C878]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#50C878] focus:ring-2 focus:ring-[#50C878]/20 transition-all duration-200"
                />
              </div>

              {/* Max Yaw */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">
                  Maximum Yaw *
                  <span className="text-gray-400 font-normal ml-2">(can be negative)</span>
                </label>
                <input
                  type="number"
                  name="maxYaw"
                  value={newSceneData.maxYaw}
                  onChange={handleSceneInputChange}
                  placeholder="e.g., 40"
                  required
                  step="any"
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#50C878]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#50C878] focus:ring-2 focus:ring-[#50C878]/20 transition-all duration-200"
                />
              </div>

              {/* Min Zoom */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">
                  Minimum Zoom *
                  <span className="text-gray-400 font-normal ml-2">(can be negative)</span>
                </label>
                <input
                  type="number"
                  name="minZoom"
                  value={newSceneData.minZoom}
                  onChange={handleSceneInputChange}
                  placeholder="e.g., -10"
                  required
                  step="any"
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#50C878]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#50C878] focus:ring-2 focus:ring-[#50C878]/20 transition-all duration-200"
                />
              </div>

              {/* Max Zoom */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">
                  Maximum Zoom *
                  <span className="text-gray-400 font-normal ml-2">(can be negative)</span>
                </label>
                <input
                  type="number"
                  name="maxZoom"
                  value={newSceneData.maxZoom}
                  onChange={handleSceneInputChange}
                  placeholder="e.g., 10"
                  required
                  step="any"
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#50C878]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#50C878] focus:ring-2 focus:ring-[#50C878]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Helper Text */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <p className="text-blue-400 text-sm">
                <strong>Note:</strong> These values control the camera movement boundaries in the 3D scene. 
                Yaw controls horizontal rotation, and Zoom controls the distance from the object. 
                Values can be negative to allow reverse movement.
              </p>
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
              disabled={sceneSaving || !newSceneData.sceneName || 
                newSceneData.minYaw === '' || newSceneData.maxYaw === '' || 
                newSceneData.minZoom === '' || newSceneData.maxZoom === ''}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#50C878] to-[#87CEAB] hover:from-[#87CEAB] hover:to-[#50C878] rounded-xl text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {sceneSaving ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Scene"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
