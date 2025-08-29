import React from "react";
import { FaTimes, FaSpinner, FaImage, FaCube, FaUpload } from "react-icons/fa";
import { base64ToUint8Array } from "../utils/fileUtils";

const EditModal = ({
  showModal,
  onClose,
  newPendantData,
  handlePendantInputChange,
  imagePreview,
  setImageFile,
  setImagePreview,
  modelPreview,
  setModelFile,
  setModelPreview,
  pendantSaving,
  onSave,
  setNewPendantData,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1e1e1e] to-[#252525] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#3a3a3a]">
        <div className="sticky top-0 bg-gradient-to-r from-[#1e1e1e] via-[#252525] to-[#1e1e1e] px-8 py-6 border-b border-[#3a3a3a] flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white font-amenti">
              Edit Configuration
            </h2>
            <p className="text-gray-400 mt-2">
              Update your pendant or system configuration
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#333333] rounded-lg"
          >
            <FaTimes className="text-gray-400 hover:text-white text-xl" />
          </button>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-semibold mb-3">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newPendantData.name}
                    onChange={handlePendantInputChange}
                    className="w-full bg-[#1e1e1e] text-white px-4 py-3 rounded-xl border border-[#3a3a3a] focus:border-[#50C878] focus:outline-none transition-colors duration-300"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-3">
                    System Message *
                  </label>
                  <input
                    type="text"
                    name="message"
                    value={newPendantData.message}
                    onChange={handlePendantInputChange}
                    className="w-full bg-[#1e1e1e] text-white px-4 py-3 rounded-xl border border-[#3a3a3a] focus:border-[#50C878] focus:outline-none transition-colors duration-300"
                    placeholder="Enter system message"
                  />
                </div>
              </div>

              {/* Glass, Gold, and Silver Options */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Glass Option */}
                <div className="space-y-3">
                  <label className="flex items-center text-gray-300 font-semibold mb-3">
                    <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
                    Glass Option
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="hasGlass"
                        value="true"
                        checked={newPendantData.hasGlass === true}
                        onChange={(e) => handlePendantInputChange({
                          target: { name: 'hasGlass', value: true }
                        })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                        newPendantData.hasGlass === true 
                          ? 'border-[#54bb74] bg-[#54bb74]' 
                          : 'border-gray-400 group-hover:border-[#54bb74]'
                      }`}>
                        {newPendantData.hasGlass === true && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${
                        newPendantData.hasGlass === true ? 'text-[#54bb74]' : 'text-gray-300'
                      }`}>
                        Glass
                      </span>
                    </label>
                    
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="hasGlass"
                        value="false"
                        checked={newPendantData.hasGlass === false}
                        onChange={(e) => handlePendantInputChange({
                          target: { name: 'hasGlass', value: false }
                        })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                        newPendantData.hasGlass === false 
                          ? 'border-[#54bb74] bg-[#54bb74]' 
                          : 'border-gray-400 group-hover:border-[#54bb74]'
                      }`}>
                        {newPendantData.hasGlass === false && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${
                        newPendantData.hasGlass === false ? 'text-[#54bb74]' : 'text-gray-300'
                      }`}>
                        No Glass
                      </span>
                    </label>
                  </div>
                </div>

                {/* Gold Option */}
                <div className="space-y-3">
                  <label className="flex items-center text-gray-300 font-semibold mb-3">
                    <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
                    Gold Option
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="hasGold"
                        value="true"
                        checked={newPendantData.hasGold === true}
                        onChange={(e) => handlePendantInputChange({
                          target: { name: 'hasGold', value: true }
                        })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                        newPendantData.hasGold === true 
                          ? 'border-[#54bb74] bg-[#54bb74]' 
                          : 'border-gray-400 group-hover:border-[#54bb74]'
                      }`}>
                        {newPendantData.hasGold === true && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${
                        newPendantData.hasGold === true ? 'text-[#54bb74]' : 'text-gray-300'
                      }`}>
                        Gold
                      </span>
                    </label>
                    
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="hasGold"
                        value="false"
                        checked={newPendantData.hasGold === false}
                        onChange={(e) => handlePendantInputChange({
                          target: { name: 'hasGold', value: false }
                        })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                        newPendantData.hasGold === false 
                          ? 'border-[#54bb74] bg-[#54bb74]' 
                          : 'border-gray-400 group-hover:border-[#54bb74]'
                      }`}>
                        {newPendantData.hasGold === false && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${
                        newPendantData.hasGold === false ? 'text-[#54bb74]' : 'text-gray-300'
                      }`}>
                        No Gold
                      </span>
                    </label>
                  </div>
                </div>

                {/* Silver Option */}
                <div className="space-y-3">
                  <label className="flex items-center text-gray-300 font-semibold mb-3">
                    <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
                    Silver Option
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="hasSilver"
                        value="true"
                        checked={newPendantData.hasSilver === true}
                        onChange={(e) => handlePendantInputChange({
                          target: { name: 'hasSilver', value: true }
                        })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                        newPendantData.hasSilver === true 
                          ? 'border-[#54bb74] bg-[#54bb74]' 
                          : 'border-gray-400 group-hover:border-[#54bb74]'
                      }`}>
                        {newPendantData.hasSilver === true && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${
                        newPendantData.hasSilver === true ? 'text-[#54bb74]' : 'text-gray-300'
                      }`}>
                        Silver
                      </span>
                    </label>
                    
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="hasSilver"
                        value="false"
                        checked={newPendantData.hasSilver === false}
                        onChange={(e) => handlePendantInputChange({
                          target: { name: 'hasSilver', value: false }
                        })}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 transition-all duration-300 ${
                        newPendantData.hasSilver === false 
                          ? 'border-[#54bb74] bg-[#54bb74]' 
                          : 'border-gray-400 group-hover:border-[#54bb74]'
                      }`}>
                        {newPendantData.hasSilver === false && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${
                        newPendantData.hasSilver === false ? 'text-[#54bb74]' : 'text-gray-300'
                      }`}>
                        No Silver
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Icon Upload */}
              <div className="space-y-4">
                <label className="block text-gray-300 font-semibold mb-3">
                  <FaImage className="inline mr-2 text-[#50C878]" />
                  Icon Upload
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImageFile(file);
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const base64String = e.target.result;
                          setImagePreview(base64String);
                          const binaryIcon = base64ToUint8Array(base64String);
                          setNewPendantData({
                            ...newPendantData,
                            image: base64String,
                            imageBinary: binaryIcon,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full bg-[#1e1e1e] text-white px-4 py-4 rounded-xl border border-[#3a3a3a] hover:border-[#50C878] transition-colors duration-300 cursor-pointer">
                    <div className="flex items-center justify-center space-x-3">
                      <FaUpload className="text-[#50C878] text-xl" />
                      <div className="text-center">
                        <div className="font-medium">Choose Icon File</div>
                        <div className="text-sm text-gray-400">
                          PNG, JPG, SVG up to 10MB
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icon Preview */}
                {(imagePreview || newPendantData.image) && (
                  <div className="mt-4">
                    <div className="w-full h-32 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a] flex items-center justify-center overflow-hidden">
                      <img
                        src={imagePreview || newPendantData.image}
                        alt="Icon preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Model Upload */}
              <div className="space-y-4">
                <label className="block text-gray-300 font-semibold mb-3">
                  <FaCube className="inline mr-2 text-[#87CEAB]" />
                  Model Upload
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".glb,.gltf,.obj,.fbx,.3ds,.dae"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setModelFile(file);
                        setModelPreview(file.name);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full bg-[#1e1e1e] text-white px-4 py-4 rounded-xl border border-[#3a3a3a] hover:border-[#87CEAB] transition-colors duration-300 cursor-pointer">
                    <div className="flex items-center justify-center space-x-3">
                      <FaUpload className="text-[#87CEAB] text-xl" />
                      <div className="text-center">
                        <div className="font-medium">Choose Model File</div>
                        <div className="text-sm text-gray-400">
                          GLB, GLTF, OBJ, FBX up to 50MB
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Model Preview */}
                {modelPreview && (
                  <div className="mt-4 p-4 bg-[#2a2a2a] rounded-xl border border-[#3a3a3a]">
                    <div className="flex items-center space-x-3">
                      <FaCube className="text-[#87CEAB] text-xl" />
                      <div>
                        <div className="text-white font-medium">
                          Model Selected
                        </div>
                        <div className="text-gray-400 text-sm">
                          {modelPreview}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-[#3a3a3a]">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={pendantSaving}
              className="px-6 py-3 bg-[#54bb74] text-white rounded-lg hover:bg-[#48a064] disabled:opacity-50"
            >
              {pendantSaving ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
