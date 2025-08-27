import React, { useState, useEffect } from "react";

// Utility: Convert Base64 image string to Uint8Array (binary)
function base64ToUint8Array(base64String) {
  const cleaned = base64String.replace(/^data:image\/\w+;base64,/, "");
  const binaryString = atob(cleaned);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

import {
  FaBox,
  FaSpinner,
  FaImage,
  FaUpload,
  FaTimes,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCube,
  FaLightbulb,
  FaLayerGroup,
} from "react-icons/fa";

export default function PendantSystemManager({
  pendantSystemData,
  showAddForm,
  setShowAddForm,
  newPendantData,
  handlePendantInputChange,
  handleIconImageChange,
  handle3DModelChange,
  imagePreview,
  setImageFile,
  setImagePreview,
  modelPreview,
  setModelFile,
  modelFile,
  setModelPreview,
  pendantLoading,
  pendantSaving,
  savePendantSystem,
  editingItem,
  setEditingItem,
  updatePendantSystem,
  setNewPendantData,
  deletePendantSystem,
}) {
  console.log("pendantSystemData", pendantSystemData);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [deletingItemId, setDeletingItemId] = useState(null);

  // Handle delete functionality
  const handleDeleteItem = async (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
      try {
        setDeletingItemId(item._id);
        await deletePendantSystem(item._id);
        setDeletingItemId(null);
      } catch (error) {
        console.error('Error deleting item:', error);
        setDeletingItemId(null);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  // Handle edit functionality
  const handleEditItem = (item) => {
    console.log("Edit item:", item._id);
    setCurrentEditItem(item);
    setEditingItem(item);
    setShowEditModal(true);

    // Pre-populate form with existing data directly
    setNewPendantData({
      name: item.name || "",
      message: item.message || "",
      design: item.design || "",
      systemType: item.systemType || "",
      isSystem: item.isSystem || false,
      image: item.image || "",
    });

    // Set existing images if available
    if (item.image) {
      setImagePreview(item.image);
    }
    if (item.media?.image?.url) {
      setImagePreview(item.media.image.url);
    }
    if (item.model) {
      setModelPreview(item.model);
    }
  };

  const handleAddNew = () => {
    setShowAddModal(true);
    setShowAddForm(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setShowAddForm(false);
    // Clear form data
    setImagePreview("");
    setModelPreview("");
    setImageFile(null);
    setModelFile(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentEditItem(null);
    setEditingItem(null);
    // Clear form data
    setImagePreview("");
    setModelPreview("");
    setImageFile(null);
    setModelFile(null);
  };

  const handleSaveOrUpdate = () => {
    if (editingItem) {
      // For updates, only send changed fields
      const changedFields = {};

      if (newPendantData.name !== editingItem.name) {
        changedFields.name = newPendantData.name;
      }
      if (newPendantData.message !== editingItem.message) {
        changedFields.message = newPendantData.message;
      }
      if (newPendantData.design !== editingItem.design) {
        changedFields.design = newPendantData.design;
      }
      if (newPendantData.systemType !== editingItem.systemType) {
        changedFields.systemType = newPendantData.systemType;
      }

      // Check if image was changed
      const currentImageUrl =
        editingItem.image || editingItem.media?.image?.url;
      if (imagePreview !== currentImageUrl) {
        // Use binary data if available, otherwise use base64
        if (newPendantData.imageBinary) {
          changedFields.imageBinary = newPendantData.imageBinary;
        } else {
          changedFields.image = imagePreview;
        }
      }

      // Check if model was changed
      const currentModelUrl = editingItem.model || editingItem.media?.model?.url;
      if (modelFile || modelPreview !== currentModelUrl) {
        // Convert model file to binary if available
        if (modelFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            changedFields.modelBinary = uint8Array;
            
            // Update with ALL changed fields including model binary
            if (Object.keys(changedFields).length > 0) {
              updatePendantSystem(editingItem._id, changedFields);
            }
            handleCloseEditModal();
          };
          reader.readAsArrayBuffer(modelFile);
          return; // Exit early to wait for file reading
        } else {
          changedFields.model = modelPreview;
        }
      }

      // Only update if there are changes (when no model file to process)
      if (Object.keys(changedFields).length > 0) {
        updatePendantSystem(editingItem._id, changedFields);
      }
      handleCloseEditModal();
    } else {
      // For new items, save normally
      savePendantSystem();
      handleCloseAddModal();
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br rounded from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] p-6">
      {/* Modern Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#54bb74] to-[#87CEAB] rounded-2xl flex items-center justify-center shadow-lg">
                <FaLightbulb className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#54bb74] via-[#87CEAB] to-[#54bb74] bg-clip-text text-transparent">
                  Lighting Studio
                </h1>
                <p className="text-gray-400 text-lg">
                  Design and manage your lighting ecosystem
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
              {/* Total Items */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-4 border border-[#54bb74]/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#54bb74]/20 rounded-xl flex items-center justify-center">
                    <FaCube className="text-[#54bb74]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {pendantSystemData.length}
                    </p>
                    <p className="text-sm text-gray-400">Total Items</p>
                  </div>
                </div>
              </div>

              {/* Individual Pendants */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-4 border border-[#50C878]/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#50C878]/20 rounded-xl flex items-center justify-center">
                    <FaLightbulb className="text-[#50C878]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {pendantSystemData.filter((item) => !item.isSystem).length}
                    </p>
                    <p className="text-sm text-gray-400">Pendants</p>
                  </div>
                </div>
              </div>

              {/* Total Systems */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-4 border border-[#87CEAB]/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#87CEAB]/20 rounded-xl flex items-center justify-center">
                    <FaLayerGroup className="text-[#87CEAB]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {pendantSystemData.filter((item) => item.isSystem).length}
                    </p>
                    <p className="text-sm text-gray-400">Systems</p>
                  </div>
                </div>
              </div>

              {/* Bar Systems */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-4 border border-[#87CEAB]/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#87CEAB]/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#87CEAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {pendantSystemData.filter((item) => item.systemType === "bar").length}
                    </p>
                    <p className="text-sm text-gray-400">Bar Systems</p>
                  </div>
                </div>
              </div>

              {/* Universal Systems */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-4 border border-[#87CEAB]/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#87CEAB]/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#87CEAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {pendantSystemData.filter((item) => item.systemType === "universal").length}
                    </p>
                    <p className="text-sm text-gray-400">Universal</p>
                  </div>
                </div>
              </div>

              {/* Ball Systems */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-4 border border-[#87CEAB]/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#87CEAB]/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#87CEAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {pendantSystemData.filter((item) => item.systemType === "ball").length}
                    </p>
                    <p className="text-sm text-gray-400">Ball Systems</p>
                  </div>
                </div>
              </div>

              {/* Items with 3D Models */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-4 border border-[#FFC107]/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#FFC107]/20 rounded-xl flex items-center justify-center">
                    <FaCube className="text-[#FFC107]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {pendantSystemData.filter((item) => item.model || item.media?.model?.url).length}
                    </p>
                    <p className="text-sm text-gray-400">With Models</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleAddNew}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#54bb74] to-[#87CEAB] rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#54bb74]/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#87CEAB] to-[#54bb74] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <FaPlus className="text-xl" />
                <span className="text-lg">Create New</span>
              </div>
            </button>

            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-gray-400 hover:text-white hover:border-[#54bb74]/50 transition-all duration-300">
                <FaEdit className="text-sm" />
              </button>
              <button className="px-4 py-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-gray-400 hover:text-white hover:border-[#54bb74]/50 transition-all duration-300">
                <FaLayerGroup className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#252525] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#3a3a3a]">
            <div className="sticky top-0 bg-gradient-to-r from-[#1e1e1e] via-[#252525] to-[#1e1e1e] px-8 py-6 border-b border-[#3a3a3a] flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white font-amenti bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Add New Configuration
                </h2>
                <p className="text-gray-400 mt-2">
                  Create a new pendant or system configuration
                </p>
              </div>
              <button
                onClick={handleCloseAddModal}
                className="p-2 hover:bg-[#333333] rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-400 hover:text-white text-xl" />
              </button>
            </div>

            <div className="p-8">
              {/* Category Selection */}
              <label className="flex items-center text-gray-300 font-semibold mb-3">
                <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
                Product Category
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Individual Pendant Card */}
                <div
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    newPendantData.systemType === ""
                      ? "border-[#54bb74] bg-gradient-to-br from-[#54bb74]/10 to-[#87CEAB]/10"
                      : "border-[#3a3a3a] bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:border-[#54bb74]/50"
                  }`}
                  onClick={() =>
                    handlePendantInputChange({
                      target: { name: "systemType", value: "" },
                    })
                  }
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        newPendantData.systemType === ""
                          ? "bg-[#54bb74]/20"
                          : "bg-[#333333]"
                      }`}
                    >
                      <svg
                        className={`w-6 h-6 ${
                          newPendantData.systemType === ""
                            ? "text-[#54bb74]"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4
                        className={`font-bold text-lg ${
                          newPendantData.systemType === ""
                            ? "text-[#54bb74]"
                            : "text-white"
                        }`}
                      >
                        Individual Pendant
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Single lighting fixture
                      </p>
                    </div>
                  </div>
                  {newPendantData.systemType === "" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-[#54bb74] rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* System Configuration Card */}
                <div
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    newPendantData.systemType !== ""
                      ? "border-[#87CEAB] bg-gradient-to-br from-[#87CEAB]/10 to-[#54bb74]/10"
                      : "border-[#3a3a3a] bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:border-[#87CEAB]/50"
                  }`}
                  onClick={() => {
                    // If not already a system, set to bar by default
                    if (newPendantData.systemType === "") {
                      handlePendantInputChange({
                        target: { name: "systemType", value: "bar" },
                      });
                    }
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        newPendantData.systemType !== ""
                          ? "bg-[#87CEAB]/20"
                          : "bg-[#333333]"
                      }`}
                    >
                      <svg
                        className={`w-6 h-6 ${
                          newPendantData.systemType !== ""
                            ? "text-[#87CEAB]"
                            : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4
                        className={`font-bold text-lg ${
                          newPendantData.systemType !== ""
                            ? "text-[#87CEAB]"
                            : "text-white"
                        }`}
                      >
                        System Configuration
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Multiple connected fixtures
                      </p>
                    </div>
                  </div>
                  {newPendantData.systemType !== "" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-[#87CEAB] rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* System Type Selection (only show if system is selected) */}
            {newPendantData.systemType !== "" && (
              <div className="space-y-4">
                <label className="flex items-center text-gray-300 font-semibold mb-3">
                  <div className="w-2 h-2 bg-[#87CEAB] rounded-full mr-2"></div>
                  System Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Bar System */}
                  <div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      newPendantData.systemType === "bar"
                        ? "border-[#87CEAB] bg-gradient-to-br from-[#87CEAB]/10 to-[#54bb74]/10"
                        : "border-[#3a3a3a] bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:border-[#87CEAB]/50"
                    }`}
                    onClick={() =>
                      handlePendantInputChange({
                        target: { name: "systemType", value: "bar" },
                      })
                    }
                  >
                    <div className="text-center">
                      <div
                        className={`w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                          newPendantData.systemType === "bar"
                            ? "bg-[#87CEAB]/20"
                            : "bg-[#333333]"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            newPendantData.systemType === "bar"
                              ? "text-[#87CEAB]"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </div>
                      <h5
                        className={`font-semibold ${
                          newPendantData.systemType === "bar"
                            ? "text-[#87CEAB]"
                            : "text-white"
                        }`}
                      >
                        Bar System
                      </h5>
                      <p className="text-gray-400 text-xs mt-1">
                        Linear arrangement
                      </p>
                    </div>
                  </div>

                  {/* Universal System */}
                  <div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      newPendantData.systemType === "universal"
                        ? "border-[#87CEAB] bg-gradient-to-br from-[#87CEAB]/10 to-[#54bb74]/10"
                        : "border-[#3a3a3a] bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:border-[#87CEAB]/50"
                    }`}
                    onClick={() =>
                      handlePendantInputChange({
                        target: {
                          name: "systemType",
                          value: "universal",
                        },
                      })
                    }
                  >
                    <div className="text-center">
                      <div
                        className={`w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                          newPendantData.systemType === "universal"
                            ? "bg-[#87CEAB]/20"
                            : "bg-[#333333]"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            newPendantData.systemType === "universal"
                              ? "text-[#87CEAB]"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h5
                        className={`font-semibold ${
                          newPendantData.systemType === "universal"
                            ? "text-[#87CEAB]"
                            : "text-white"
                        }`}
                      >
                        Universal
                      </h5>
                      <p className="text-gray-400 text-xs mt-1">
                        Flexible setup
                      </p>
                    </div>
                  </div>

                  {/* Ball System */}
                  <div
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      newPendantData.systemType === "ball"
                        ? "border-[#87CEAB] bg-gradient-to-br from-[#87CEAB]/10 to-[#54bb74]/10"
                        : "border-[#3a3a3a] bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:border-[#87CEAB]/50"
                    }`}
                    onClick={() =>
                      handlePendantInputChange({
                        target: { name: "systemType", value: "ball" },
                      })
                    }
                  >
                    <div className="text-center">
                      <div
                        className={`w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                          newPendantData.systemType === "ball"
                            ? "bg-[#87CEAB]/20"
                            : "bg-[#333333]"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            newPendantData.systemType === "ball"
                              ? "text-[#87CEAB]"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h5
                        className={`font-semibold ${
                          newPendantData.systemType === "ball"
                            ? "text-[#87CEAB]"
                            : "text-white"
                        }`}
                      >
                        Ball System
                      </h5>
                      <p className="text-gray-400 text-xs mt-1">
                        Spherical design
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-gray-300 font-semibold mb-3">
                  <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newPendantData.name}
                  onChange={handlePendantInputChange}
                  placeholder="e.g., Atom5, Prism, Piko"
                  className="w-full bg-gradient-to-r from-[#1e1e1e] to-[#252525] text-white px-5 py-4 rounded-xl border border-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#54bb74] focus:border-transparent transition-all duration-300 hover:border-[#54bb74]/50 placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-300 font-semibold mb-3">
                  <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
                  System Message *
                </label>
                <input
                  type="text"
                  name="message"
                  value={newPendantData.message}
                  onChange={handlePendantInputChange}
                  placeholder="e.g., product_5, system_base_1"
                  className="w-full bg-gradient-to-r from-[#1e1e1e] to-[#252525] text-white px-5 py-4 rounded-xl border border-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#54bb74] focus:border-transparent transition-all duration-300 hover:border-[#54bb74]/50 placeholder-gray-500 font-mono"
                />
              </div>
            </div>

            {/* Media Uploads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Icon Image Upload */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-300 font-semibold mb-3">
                  <div className="w-2 h-2 bg-[#54bb74] rounded-full mr-2"></div>
                  Icon Image
                </label>
                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#54bb74]/20 via-transparent to-[#87CEAB]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                    <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#3a3a3a] rounded-2xl cursor-pointer bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:from-[#252525] hover:to-[#333333] transition-all duration-300 group-hover:border-[#54bb74]/50">
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="p-3 bg-[#54bb74]/10 rounded-full mb-2 group-hover:bg-[#54bb74]/20 transition-colors">
                          <svg
                            className="w-6 h-6 text-[#54bb74]"
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
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                          <span className="text-[#54bb74]">Upload Icon</span>
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                          PNG, JPG • Max 5MB
                        </p>
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
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#54bb74]/20 to-[#87CEAB]/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                        <div className="relative bg-gradient-to-br from-[#1e1e1e] to-[#252525] p-3 rounded-xl border border-[#3a3a3a]">
                          <img
                            src={imagePreview}
                            alt="Icon Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-[#3a3a3a] shadow-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview("");
                            }}
                            className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg transform hover:scale-110"
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
              <div className="space-y-2">
                <label className="flex items-center text-gray-300 font-semibold mb-3">
                  <div className="w-2 h-2 bg-[#87CEAB] rounded-full mr-2"></div>
                  3D Model
                </label>
                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#87CEAB]/20 via-transparent to-[#54bb74]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                    <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#3a3a3a] rounded-2xl cursor-pointer bg-gradient-to-br from-[#1e1e1e] to-[#252525] hover:from-[#252525] hover:to-[#333333] transition-all duration-300 group-hover:border-[#87CEAB]/50">
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="p-3 bg-[#87CEAB]/10 rounded-full mb-2 group-hover:bg-[#87CEAB]/20 transition-colors">
                          <svg
                            className="w-6 h-6 text-[#87CEAB]"
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
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                          <span className="text-[#87CEAB]">
                            Upload 3D Model
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                          GLB, FBX, USDZ, GLTF
                        </p>
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
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#87CEAB]/20 to-[#54bb74]/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                        <div className="relative bg-gradient-to-br from-[#1e1e1e] to-[#252525] p-3 rounded-xl border border-[#3a3a3a] min-w-[120px]">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-[#87CEAB]/20 rounded-lg">
                              <svg
                                className="w-5 h-5 text-[#87CEAB]"
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
                            className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg transform hover:scale-110"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-[#3a3a3a]">
                <button
                  onClick={handleCloseAddModal}
                  disabled={pendantSaving}
                  className="px-8 py-4 bg-gradient-to-r from-[#333333] to-[#444444] text-white rounded-xl hover:from-[#444444] hover:to-[#555555] transition-all duration-300 disabled:opacity-50 font-medium transform hover:scale-105 shadow-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveOrUpdate}
                  disabled={
                    pendantSaving ||
                    !newPendantData.name ||
                    !newPendantData.message
                  }
                  className="px-8 py-4 bg-gradient-to-r from-[#54bb74] to-[#48a064] text-[#1e1e1e] rounded-xl hover:from-[#48a064] hover:to-[#3d8b54] transition-all duration-300 disabled:opacity-50 flex items-center justify-center font-semibold transform hover:scale-105 shadow-lg disabled:transform-none"
                >
                  {pendantSaving ? (
                    <>
                      <FaSpinner className="animate-spin mr-3 text-lg" />
                      Creating Configuration...
                    </>
                  ) : (
                    <>
                      <FaBox className="mr-3 text-lg" />
                      Create Configuration
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Similar structure */}
      {showEditModal && (
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
                onClick={handleCloseEditModal}
                className="p-2 hover:bg-[#333333] rounded-lg"
              >
                <FaTimes className="text-gray-400 hover:text-white text-xl" />
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {/* Basic Information */}
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
                                image: base64String, // Keep base64 for preview
                                imageBinary: binaryIcon, // Store binary for API
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
                  onClick={handleCloseEditModal}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveOrUpdate}
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
      )}

      {/* Main Content */}
      <div className="space-y-8">
        {pendantLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl border border-[#54bb74]/20 backdrop-blur-sm">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-[#54bb74]/20 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-24 h-24 border-t-4 border-[#54bb74] rounded-full animate-spin"></div>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-bold text-white">Loading Studio</h3>
              <p className="text-gray-400 text-lg">
                Preparing your lighting configurations...
              </p>
            </div>
          </div>
        ) : pendantSystemData.length === 0 && !showAddForm ? (
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-16 text-center border border-[#54bb74]/20 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#54bb74]/5 via-transparent to-[#87CEAB]/5"></div>
            <div className="relative z-10 space-y-8">
              <div className="w-32 h-32 bg-gradient-to-br from-[#54bb74]/20 to-[#87CEAB]/20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <FaLightbulb className="text-6xl text-[#54bb74]" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#54bb74] to-[#87CEAB] bg-clip-text text-transparent">
                  Welcome to Lighting Studio
                </h3>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                  Start creating your lighting masterpiece. Design individual
                  pendants or complex system configurations with our intuitive
                  tools.
                </p>
              </div>
              <button
                onClick={handleAddNew}
                className="group relative px-12 py-6 bg-gradient-to-r from-[#54bb74] to-[#87CEAB] rounded-2xl font-bold text-white text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#54bb74]/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#87CEAB] to-[#54bb74] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-4">
                  <FaPlus className="text-2xl" />
                  <span>Create Your First Design</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          pendantSystemData.length > 0 && (
            <div className="space-y-8">
              {/* Pendant Products Section */}
              {(() => {
                const pendantProducts = pendantSystemData.filter(
                  (item) => !item.isSystem
                );
                return (
                  pendantProducts.length > 0 && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#50C878]/20 to-[#50C878]/10 rounded-2xl flex items-center justify-center border border-[#50C878]/20">
                            <FaLightbulb className="text-2xl text-[#50C878]" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">
                              Individual Pendants
                            </h3>
                            <p className="text-gray-400">
                              Single lighting fixtures
                            </p>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-[#50C878]/10 to-[#50C878]/5 rounded-xl border border-[#50C878]/20">
                          <span className="text-[#50C878] font-semibold">
                            {pendantProducts.length} items
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {pendantProducts.map((item, index) => (
                          <div
                            key={item._id || index}
                            className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 border border-[#50C878]/20 hover:border-[#50C878]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#50C878]/10 backdrop-blur-sm"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#50C878]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative flex items-center space-x-6">
                              {/* Product Image */}
                              <div className="w-16 h-16 bg-gradient-to-br from-[#50C878]/20 to-[#50C878]/10 rounded-2xl flex items-center justify-center border border-[#50C878]/20 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                {item.image || item.media?.image?.url ? (
                                  <img
                                    src={item.image || item.media?.image?.url}
                                    alt={item.name}
                                    className="w-12 h-12 object-cover rounded-xl"
                                  />
                                ) : (
                                  <FaLightbulb className="text-2xl text-[#50C878]" />
                                )}
                              </div>

                              {/* Product Info */}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center space-x-3">
                                  <h4 className="text-xl font-bold text-white group-hover:text-[#50C878] transition-colors duration-300">
                                    {item.name}
                                  </h4>
                                  <span className="px-3 py-1 bg-[#50C878]/20 text-[#50C878] rounded-full text-xs font-medium border border-[#50C878]/30">
                                    Individual Pendant
                                  </span>
                                </div>
                                
                                <p className="text-gray-400 text-sm">
                                  {item.message}
                                </p>

                                {item.design && (
                                  <p className="text-gray-500 text-xs">
                                    Design: {item.design}
                                  </p>
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex space-x-3 flex-shrink-0">
                                <button
                                  onClick={() => handleEditItem(item)}
                                  className="px-6 py-3 bg-gradient-to-r from-[#50C878] to-[#87CEAB] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#50C878]/25 transform hover:scale-105 flex items-center space-x-2"
                                >
                                  <FaEdit className="text-sm" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(item)}
                                  disabled={deletingItemId === item._id}
                                  className="px-4 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 rounded-xl font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transform hover:scale-105 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {deletingItemId === item._id ? (
                                    <FaSpinner className="animate-spin text-sm" />
                                  ) : (
                                    <FaTrash className="text-sm" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                );
              })()}

              {/* System Products Section */}
              {(() => {
                const systemProducts = pendantSystemData.filter(
                  (item) => item.isSystem
                );
                const systemsByType = {
                  bar: systemProducts.filter(
                    (item) => item.systemType === "bar"
                  ),
                  ball: systemProducts.filter(
                    (item) => item.systemType === "ball"
                  ),
                  universal: systemProducts.filter(
                    (item) => item.systemType === "universal"
                  ),
                };

                return (
                  systemProducts.length > 0 && (
                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#87CEAB]/20 to-[#87CEAB]/10 rounded-2xl flex items-center justify-center border border-[#87CEAB]/20">
                            <FaLayerGroup className="text-2xl text-[#87CEAB]" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">
                              System Configurations
                            </h3>
                            <p className="text-gray-400">
                              Multi-fixture lighting systems
                            </p>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-[#87CEAB]/10 to-[#87CEAB]/5 rounded-xl border border-[#87CEAB]/20">
                          <span className="text-[#87CEAB] font-semibold">
                            {systemProducts.length} systems
                          </span>
                        </div>
                      </div>
                      {/* Bar Systems */}
                      {systemsByType.bar.length > 0 && (
                        <div className="space-y-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#87CEAB]/30 to-[#87CEAB]/20 rounded-xl flex items-center justify-center">
                              <div className="w-3 h-3 bg-[#87CEAB] rounded-full"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white">
                              Bar Systems
                            </h4>
                            <span className="px-3 py-1 bg-[#87CEAB]/20 text-[#87CEAB] rounded-full text-xs font-medium border border-[#87CEAB]/30">
                              {systemsByType.bar.length} systems
                            </span>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {systemsByType.bar.map((item, index) => (
                              <div
                                key={item._id || index}
                                className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-6 border border-[#87CEAB]/20 hover:border-[#87CEAB]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#87CEAB]/10"
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#87CEAB]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative flex items-center space-x-4">
                                  <div className="w-16 h-16 bg-gradient-to-br from-[#87CEAB]/20 to-[#87CEAB]/10 rounded-2xl flex items-center justify-center border border-[#87CEAB]/20 group-hover:scale-110 transition-transform duration-300">
                                    {item.image || item.media?.image?.url ? (
                                      <img
                                        src={
                                          item.image || item.media?.image?.url
                                        }
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded-xl"
                                      />
                                    ) : (
                                      <FaLayerGroup className="text-2xl text-[#87CEAB]" />
                                    )}
                                  </div>

                                  <div className="flex-1">
                                    <h5 className="text-lg font-bold text-white group-hover:text-[#87CEAB] transition-colors duration-300">
                                      {item.name}
                                    </h5>
                                    <p className="text-gray-400 text-sm mb-2">
                                      {item.message}
                                    </p>
                                    <div className="flex items-center space-x-3">
                                      <span className="px-2 py-1 bg-[#87CEAB]/20 text-[#87CEAB] rounded-full text-xs font-medium border border-[#87CEAB]/30">
                                        Bar System
                                      </span>
                                      {item.design && (
                                        <span className="text-gray-500 text-xs">
                                          Design: {item.design}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleEditItem(item)}
                                      className="px-4 py-2 bg-gradient-to-r from-[#87CEAB] to-[#50C878] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#87CEAB]/25 transform hover:scale-105"
                                    >
                                      <FaEdit className="text-sm" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(item)}
                                      disabled={deletingItemId === item._id}
                                      className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 rounded-xl font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transform hover:scale-105 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {deletingItemId === item._id ? (
                                        <FaSpinner className="animate-spin text-sm" />
                                      ) : (
                                        <FaTrash className="text-sm" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Ball Systems */}
                      {systemsByType.ball.length > 0 && (
                        <div className="space-y-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#87CEAB]/30 to-[#87CEAB]/20 rounded-xl flex items-center justify-center">
                              <div className="w-3 h-3 bg-[#87CEAB] rounded-full"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white">
                              Ball Systems
                            </h4>
                            <span className="px-3 py-1 bg-[#87CEAB]/20 text-[#87CEAB] rounded-full text-xs font-medium border border-[#87CEAB]/30">
                              {systemsByType.ball.length} systems
                            </span>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {systemsByType.ball.map((item, index) => (
                              <div
                                key={item._id || index}
                                className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-6 border border-[#87CEAB]/20 hover:border-[#87CEAB]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#87CEAB]/10"
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#87CEAB]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative flex items-center space-x-4">
                                  <div className="w-16 h-16 bg-gradient-to-br from-[#87CEAB]/20 to-[#87CEAB]/10 rounded-2xl flex items-center justify-center border border-[#87CEAB]/20 group-hover:scale-110 transition-transform duration-300">
                                    {item.image || item.media?.image?.url ? (
                                      <img
                                        src={
                                          item.image || item.media?.image?.url
                                        }
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded-xl"
                                      />
                                    ) : (
                                      <FaLayerGroup className="text-2xl text-[#87CEAB]" />
                                    )}
                                  </div>

                                  <div className="flex-1">
                                    <h5 className="text-lg font-bold text-white group-hover:text-[#87CEAB] transition-colors duration-300">
                                      {item.name}
                                    </h5>
                                    <p className="text-gray-400 text-sm mb-2">
                                      {item.message}
                                    </p>
                                    <div className="flex items-center space-x-3">
                                      <span className="px-2 py-1 bg-[#87CEAB]/20 text-[#87CEAB] rounded-full text-xs font-medium border border-[#87CEAB]/30">
                                        Ball System
                                      </span>
                                      {item.design && (
                                        <span className="text-gray-500 text-xs">
                                          Design: {item.design}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleEditItem(item)}
                                      className="px-4 py-2 bg-gradient-to-r from-[#87CEAB] to-[#50C878] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#87CEAB]/25 transform hover:scale-105"
                                    >
                                      <FaEdit className="text-sm" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(item)}
                                      disabled={deletingItemId === item._id}
                                      className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 rounded-xl font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transform hover:scale-105 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {deletingItemId === item._id ? (
                                        <FaSpinner className="animate-spin text-sm" />
                                      ) : (
                                        <FaTrash className="text-sm" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Universal Systems */}
                      {systemsByType.universal.length > 0 && (
                        <div className="space-y-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#87CEAB]/30 to-[#87CEAB]/20 rounded-xl flex items-center justify-center">
                              <div className="w-3 h-3 bg-[#87CEAB] rounded-full"></div>
                            </div>
                            <h4 className="text-xl font-bold text-white">
                              Universal Systems
                            </h4>
                            <span className="px-3 py-1 bg-[#87CEAB]/20 text-[#87CEAB] rounded-full text-xs font-medium border border-[#87CEAB]/30">
                              {systemsByType.universal.length} systems
                            </span>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {systemsByType.universal.map((item, index) => (
                              <div
                                key={item._id || index}
                                className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-6 border border-[#87CEAB]/20 hover:border-[#87CEAB]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#87CEAB]/10"
                              >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#87CEAB]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative flex items-center space-x-4">
                                  <div className="w-16 h-16 bg-gradient-to-br from-[#87CEAB]/20 to-[#87CEAB]/10 rounded-2xl flex items-center justify-center border border-[#87CEAB]/20 group-hover:scale-110 transition-transform duration-300">
                                    {item.image || item.media?.image?.url ? (
                                      <img
                                        src={
                                          item.image || item.media?.image?.url
                                        }
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded-xl"
                                      />
                                    ) : (
                                      <FaLayerGroup className="text-2xl text-[#87CEAB]" />
                                    )}
                                  </div>

                                  <div className="flex-1">
                                    <h5 className="text-lg font-bold text-white group-hover:text-[#87CEAB] transition-colors duration-300">
                                      {item.name}
                                    </h5>
                                    <p className="text-gray-400 text-sm mb-2">
                                      {item.message}
                                    </p>
                                    <div className="flex items-center space-x-3">
                                      <span className="px-2 py-1 bg-[#87CEAB]/20 text-[#87CEAB] rounded-full text-xs font-medium border border-[#87CEAB]/30">
                                        Universal System
                                      </span>
                                      {item.design && (
                                        <span className="text-gray-500 text-xs">
                                          Design: {item.design}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleEditItem(item)}
                                      className="px-4 py-2 bg-gradient-to-r from-[#87CEAB] to-[#50C878] text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#87CEAB]/25 transform hover:scale-105"
                                    >
                                      <FaEdit className="text-sm" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(item)}
                                      disabled={deletingItemId === item._id}
                                      className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 rounded-xl font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white transform hover:scale-105 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {deletingItemId === item._id ? (
                                        <FaSpinner className="animate-spin text-sm" />
                                      ) : (
                                        <FaTrash className="text-sm" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                );
              })()}
            </div>
          )
        )}
      </div>
    </div>
  );
}
