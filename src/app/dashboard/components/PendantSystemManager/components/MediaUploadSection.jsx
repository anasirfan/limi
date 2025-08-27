import React from "react";

const MediaUploadSection = ({
  imagePreview,
  modelPreview,
  handleIconImageChange,
  handle3DModelChange,
  setImageFile,
  setImagePreview,
  setModelFile,
  setModelPreview,
}) => {
  return (
    <div className="grid p-6 grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Icon Image Upload */}
      <div className="space-y-1">
        <label className="flex items-center text-gray-300 font-semibold mb-2">
          <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
          Icon Image
        </label>
        <div className="space-y-3">
          <div className="relative group">
            <label className="relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#3a3a3a] rounded-lg cursor-pointer bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:from-[#252525] hover:to-[#333333] transition-all duration-300 group-hover:border-[#54bb74]/50">
              <div className="flex flex-col items-center justify-center py-2">
                <div className="p-2 bg-[#54bb74]/10 rounded-full mb-1 group-hover:bg-[#54bb74]/20 transition-colors">
                  <svg
                    className="w-4 h-4 text-[#54bb74]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                  <span className="text-[#54bb74]">Upload Icon</span>
                </p>
                <p className="text-xs text-gray-500">PNG, JPG</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleIconImageChange}
              />
            </label>
          </div>

          {imagePreview && (
            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-[#1e1e1e] to-[#252525] p-2 rounded-lg border border-[#3a3a3a]">
                  <img
                    src={imagePreview}
                    alt="Icon Preview"
                    className="w-16 h-16 object-cover rounded border border-[#3a3a3a]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview("");
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3D Model Upload */}
      <div className="space-y-1">
        <label className="flex items-center text-gray-300 font-semibold mb-2">
          <div className="w-2 h-2 bg-[#87CEAB] rounded-full mr-2"></div>
          3D Model
        </label>
        <div className="space-y-3">
          <div className="relative group">
            <label className="relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#3a3a3a] rounded-lg cursor-pointer bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:from-[#252525] hover:to-[#333333] transition-all duration-300 group-hover:border-[#87CEAB]/50">
              <div className="flex flex-col items-center justify-center py-2">
                <div className="p-2 bg-[#87CEAB]/10 rounded-full mb-1 group-hover:bg-[#87CEAB]/20 transition-colors">
                  <svg
                    className="w-4 h-4 text-[#87CEAB]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                  <span className="text-[#87CEAB]">Upload 3D Model</span>
                </p>
                <p className="text-xs text-gray-500">GLB, GLTF</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".glb,.fbx,.usdz,.gltf"
                onChange={handle3DModelChange}
              />
            </label>
          </div>

          {modelPreview && (
            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-[#1e1e1e] to-[#252525] p-2 rounded-lg border border-[#3a3a3a] min-w-[100px]">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 bg-[#87CEAB]/20 rounded">
                      <svg
                        className="w-4 h-4 text-[#87CEAB]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">
                        {modelPreview}
                      </p>
                      <p className="text-xs text-gray-400">3D Model</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setModelFile(null);
                      setModelPreview("");
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaUploadSection;
