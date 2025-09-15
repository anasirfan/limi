import React from "react";
import { FaTimes, FaBox, FaSpinner } from "react-icons/fa";
import CategorySelection from "./CategorySelection";
import SystemTypeSelection from "./SystemTypeSelection";
import BaseTypeSelection from "./BaseTypeSelection";
import ProductDetailsForm from "./ProductDetailsForm";
import MediaUploadSection from "./MediaUploadSection";

const AddModal = ({
  showModal,
  onClose,
  newPendantData,
  handlePendantInputChange,
  handleIconImageChange,
  handle3DModelChange,
  imagePreview,
  setImageFile,
  setImagePreview,
  modelPreview,
  setModelFile,
  setModelPreview,
  pendantSaving,
  onSave,
  setNewPendantData,
  pendantSystemData,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1e1e1e] to-[#252525] rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#3a3a3a]">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1e1e1e] via-[#252525] to-[#1e1e1e] px-6 py-4 border-b border-[#3a3a3a] flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white font-amenti bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Add New Configuration
            </h2>
            <p className="text-gray-400 mt-1 text-sm">
              Create a new pendant or system configuration
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#333333] rounded-lg transition-colors"
          >
            <FaTimes className="text-gray-400 hover:text-white text-lg" />
          </button>
        </div>

        <div className="p-6">
          {/* Category Selection */}
          <CategorySelection
            newPendantData={newPendantData}
            handlePendantInputChange={handlePendantInputChange}
            setNewPendantData={setNewPendantData}
            pendantSystemData={pendantSystemData}
          />

          {/* System Type Selection */}
          {newPendantData.systemType !== "" && newPendantData.systemType !== "chandelier" && (
            <SystemTypeSelection
              newPendantData={newPendantData}
              handlePendantInputChange={handlePendantInputChange}
              setNewPendantData={setNewPendantData}
              pendantSystemData={pendantSystemData}
            />
          )}

          {/* Base Type Selection - Only for Chandelier */}
          {newPendantData.systemType === "chandelier" && (
            <BaseTypeSelection
              newPendantData={newPendantData}
              handlePendantInputChange={handlePendantInputChange}
            />
          )}

          {/* Product Details */}
          {(newPendantData.systemType === "chandelier" || newPendantData.systemType === "" || newPendantData.systemType !== "") && (
            <ProductDetailsForm
              newPendantData={newPendantData}
              handlePendantInputChange={handlePendantInputChange}
            />
          )}

          {/* Media Uploads */}
          {(newPendantData.systemType === "chandelier" || newPendantData.systemType === "" || newPendantData.systemType !== "") && (
            <MediaUploadSection
              imagePreview={imagePreview}
              modelPreview={modelPreview}
              handleIconImageChange={handleIconImageChange}
              handle3DModelChange={handle3DModelChange}
              setImageFile={setImageFile}
              setImagePreview={setImagePreview}
              setModelFile={setModelFile}
              setModelPreview={setModelPreview}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 px-6 pb-6 pt-4 border-t border-[#3a3a3a]">
          <button
            onClick={onClose}
            disabled={pendantSaving}
            className="px-6 py-2 bg-gradient-to-r from-[#333333] to-[#444444] text-white rounded-lg hover:from-[#444444] hover:to-[#555555] transition-all duration-300 disabled:opacity-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={
              pendantSaving ||
              !newPendantData.name ||
              !newPendantData.message
            }
            className="px-6 py-2 bg-gradient-to-r from-[#54bb74] to-[#48a064] text-[#1e1e1e] rounded-lg hover:from-[#48a064] hover:to-[#3d8b54] transition-all duration-300 disabled:opacity-50 flex items-center justify-center font-semibold"
          >
            {pendantSaving ? (
              <>
                <FaSpinner className="animate-spin mr-2 text-sm" />
                Creating...
              </>
            ) : (
              <>
                <FaBox className="mr-2 text-sm" />
                Create
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
