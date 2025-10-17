import React from "react";
import { FaTimes, FaMountain, FaUpload, FaSpinner, FaCircle, FaSquare, FaHome, FaArrowUp, FaArrowRight } from "react-icons/fa";

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
    
    // Automatically set lightAmount based on lightType
    const submitData = { ...newMountData };
    if (submitData.lightType === 'wall') {
      submitData.lightAmount = 1;
    } else if (submitData.lightType === 'floor') {
      submitData.lightAmount = 3;
    }
    
    onSave(submitData);
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

          {/* Light Type */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-white">
              Light Type *
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleMountInputChange({ target: { name: 'lightType', value: 'floor' } })}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-3 ${
                  newMountData.lightType === 'floor'
                    ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                    : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                }`}
              >
                <FaHome className="text-xl" />
                <span className="font-semibold">Floor</span>
              </button>
              <button
                type="button"
                onClick={() => handleMountInputChange({ target: { name: 'lightType', value: 'ceiling' } })}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-3 ${
                  newMountData.lightType === 'ceiling'
                    ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                    : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                }`}
              >
                <FaArrowUp className="text-xl" />
                <span className="font-semibold">Ceiling</span>
              </button>
              <button
                type="button"
                onClick={() => handleMountInputChange({ target: { name: 'lightType', value: 'wall' } })}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-3 ${
                  newMountData.lightType === 'wall'
                    ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                    : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                }`}
              >
                <FaArrowRight className="text-xl" />
                <span className="font-semibold">Wall</span>
              </button>
            </div>
          </div>

          {/* Base Type - Only show for ceiling */}
          {newMountData.lightType === 'ceiling' && (
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-white">
                Base Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleMountInputChange({ target: { name: 'baseType', value: 'round' } })}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-3 ${
                    newMountData.baseType === 'round'
                      ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                      : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                  }`}
                >
                  <FaCircle className="text-xl" />
                  <span className="font-semibold">Round</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMountInputChange({ target: { name: 'baseType', value: 'rectangle' } })}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-3 ${
                    newMountData.baseType === 'rectangle'
                      ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                      : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                  }`}
                >
                  <FaSquare className="text-xl" />
                  <span className="font-semibold">Rectangle</span>
                </button>
              </div>
            </div>
          )}

          {/* Light Amount - Only show for ceiling */}
          {newMountData.lightType === 'ceiling' && newMountData.baseType && (
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-white">
                Light Amount *
              </label>
              <div className={`grid gap-4 ${newMountData.baseType === 'round' ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {newMountData.baseType === 'round' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleMountInputChange({ target: { name: 'lightAmount', value: 1 } })}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                        newMountData.lightAmount === 1
                          ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                          : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                      }`}
                    >
                      <span className="font-bold text-xl">1</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMountInputChange({ target: { name: 'lightAmount', value: 3 } })}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                        newMountData.lightAmount === 3
                          ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                          : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                      }`}
                    >
                      <span className="font-bold text-xl">3</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMountInputChange({ target: { name: 'lightAmount', value: 6 } })}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                        newMountData.lightAmount === 6
                          ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                          : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                      }`}
                    >
                      <span className="font-bold text-xl">6</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleMountInputChange({ target: { name: 'lightAmount', value: 2 } })}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                        newMountData.lightAmount === 2
                          ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                          : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                      }`}
                    >
                      <span className="font-bold text-xl">2</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMountInputChange({ target: { name: 'lightAmount', value: 3 } })}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                        newMountData.lightAmount === 3
                          ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                          : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                      }`}
                    >
                      <span className="font-bold text-xl">3</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMountInputChange({ target: { name: 'lightAmount', value: 4 } })}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                        newMountData.lightAmount === 4
                          ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                          : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                      }`}
                    >
                      <span className="font-bold text-xl">4</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMountInputChange({ target: { name: 'lightAmount', value: 5 } })}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                        newMountData.lightAmount === 5
                          ? 'border-[#50C878] bg-[#50C878]/10 text-[#50C878]'
                          : 'border-[#50C878]/30 bg-[#2a2a2a] text-gray-400 hover:border-[#50C878]/50 hover:text-white'
                      }`}
                    >
                      <span className="font-bold text-xl">5</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

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
              disabled={mountSaving || !newMountData.mountName || !newMountData.lightType || (newMountData.lightType === 'ceiling' && (!newMountData.baseType || !newMountData.lightAmount))}
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
