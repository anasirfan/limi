import React, { useState, useMemo } from "react";
import { FaLightbulb, FaPlus, FaSpinner } from "react-icons/fa";
import TabNavigation from "./components/TabNavigation";
import ProductTable from "./components/ProductTable";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import { filterProductsByTab } from "./utils/fileUtils";

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
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [viewMode, setViewMode] = useState("table");
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [selectedItems, setSelectedItems] = useState(new Set());

  // Handle delete functionality
  const handleDeleteItem = async (item) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${item.name}"? This action cannot be undone.`
      )
    ) {
      try {
        setDeletingItemId(item._id);
        await deletePendantSystem(item._id);
        setDeletingItemId(null);
      } catch (error) {
        console.error("Error deleting item:", error);
        setDeletingItemId(null);
        alert("Failed to delete item. Please try again.");
      }
    }
  };

  // Handle edit functionality
  const handleEditItem = (item) => {
    console.log("Edit item:", item._id);
    setEditingItem(item);
    setShowEditModal(true);

    // Pre-populate form with existing data directly
    setNewPendantData({
      name: item.name || "",
      message: item.message || "",
      design: item.name ? item.name.toLowerCase() : (item.design || ""),
      systemType: item.systemType || "",
      isSystem: item.isSystem || false,
      image: item.image || "",
      hasGlass: item.hasGlass !== undefined ? item.hasGlass : false,  // Default: No Glass
      hasGold: item.hasGold !== undefined ? item.hasGold : false,     // Default: No Gold
      hasSilver: item.hasSilver !== undefined ? item.hasSilver : false // Default: No Silver
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
    // Reset form with default values
    setNewPendantData({
      name: "",
      message: "",
      design: "",
      systemType: "",
      isSystem: false,
      image: "",
      hasGlass: false,  // Default: No Glass
      hasGold: false,   // Default: No Gold
      hasSilver: false  // Default: No Silver
    });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
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
      if (newPendantData.hasGlass !== editingItem.hasGlass) {
        changedFields.hasGlass = newPendantData.hasGlass;
      }
      if (newPendantData.hasGold !== editingItem.hasGold) {
        changedFields.hasGold = newPendantData.hasGold;
      }
      if (newPendantData.hasSilver !== editingItem.hasSilver) {
        changedFields.hasSilver = newPendantData.hasSilver;
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
      const currentModelUrl =
        editingItem.model || editingItem.media?.model?.url;
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

  // Process products with search, filter, and sort
  const processedProducts = useMemo(() => {
    // First filter by tab
    let filtered = filterProductsByTab(pendantSystemData, activeTab);
    
    // Apply search filter
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(query);
        const messageMatch = item.message?.toLowerCase().includes(query);
        const typeMatch = item.systemType?.toLowerCase().includes(query);
        const designMatch = item.design?.toLowerCase().includes(query);
        return nameMatch || messageMatch || typeMatch || designMatch;
      });
    }

    // Apply active filters
    if (activeFilters.has("hasModel")) {
      filtered = filtered.filter((item) => {
        const hasModel = item.media?.model?.url && item.media.model.url.trim() !== '';
        return hasModel;
      });
    }
    if (activeFilters.has("noModel")) {
      filtered = filtered.filter((item) => {
        const hasModel = item.media?.model?.url && item.media.model.url.trim() !== '';
        return !hasModel;
      });
    }
    if (activeFilters.has("hasImage")) {
      filtered = filtered.filter((item) => {
        const hasImage = (item.image || item.media?.image?.url) && 
                         (item.image?.trim() !== '' || item.media?.image?.url?.trim() !== '');
        return hasImage;
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue = a[sortField] || '';
      let bValue = b[sortField] || '';
      
      if (sortField === 'name' || sortField === 'message') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [pendantSystemData, activeTab, searchQuery, activeFilters, sortField, sortDirection]);

  const pendantProducts = processedProducts.filter((item) => !item.isSystem);
  const systemProducts = processedProducts.filter((item) => item.isSystem);

  return (
    <div className="min-h-screen bg-[#202020] rounded-xl p-6">
      {/* Modern Header */}
      <div className="mb-8 w-full">
        <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="w-full">
            <div className="flex justify-between items-center space-x-3 w-full">
              <div className="flex items-center justify-center gap-4">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AddModal
        showModal={showAddModal}
        onClose={handleCloseAddModal}
        newPendantData={newPendantData}
        handlePendantInputChange={handlePendantInputChange}
        handleIconImageChange={handleIconImageChange}
        handle3DModelChange={handle3DModelChange}
        imagePreview={imagePreview}
        setImageFile={setImageFile}
        setImagePreview={setImagePreview}
        modelPreview={modelPreview}
        setModelFile={setModelFile}
        setModelPreview={setModelPreview}
        pendantSaving={pendantSaving}
        onSave={handleSaveOrUpdate}
        setNewPendantData={setNewPendantData}
        pendantSystemData={pendantSystemData}
      />

      {/* Edit Modal */}
      <EditModal
        showModal={showEditModal}
        onClose={handleCloseEditModal}
        newPendantData={newPendantData}
        handlePendantInputChange={handlePendantInputChange}
        imagePreview={imagePreview}
        setImageFile={setImageFile}
        setImagePreview={setImagePreview}
        modelPreview={modelPreview}
        setModelFile={setModelFile}
        setModelPreview={setModelPreview}
        pendantSaving={pendantSaving}
        onSave={handleSaveOrUpdate}
        setNewPendantData={setNewPendantData}
      />

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
              {/* Tab Navigation with Search */}
              <TabNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                products={pendantSystemData}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortField={sortField}
                setSortField={setSortField}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                viewMode={viewMode}
                setViewMode={setViewMode}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                processedProducts={processedProducts}
              />

              {/* Filtered Products Display */}
              <div className="space-y-8">
                {/* Show Pendant Products Section only for 'all' and 'pendant' tabs */}
                {(activeTab === 'all' || activeTab === 'pendant') && pendantProducts.length > 0 && (
                  <ProductTable
                    products={pendantProducts}
                    type="pendant"
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                    deletingItemId={deletingItemId}
                    viewMode={viewMode}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                )}

                {/* Show System Products Section only for 'all', 'system', and specific system types */}
                {(activeTab === 'all' || activeTab === 'system' || ['bar', 'ball', 'universal'].includes(activeTab)) && systemProducts.length > 0 && (
                  <ProductTable
                    products={systemProducts}
                    type="system"
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                    deletingItemId={deletingItemId}
                    viewMode={viewMode}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                )}

                {/* Show Products with Models */}
                {activeTab === 'model' && processedProducts.length > 0 && (
                  <>
                    {/* Show pendant products with models */}
                    {processedProducts.filter(item => !item.isSystem).length > 0 && (
                      <ProductTable
                        products={processedProducts.filter(item => !item.isSystem)}
                        type="pendant"
                        onEdit={handleEditItem}
                        onDelete={handleDeleteItem}
                        deletingItemId={deletingItemId}
                        viewMode={viewMode}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                      />
                    )}
                    {/* Show system products with models */}
                    {processedProducts.filter(item => item.isSystem).length > 0 && (
                      <ProductTable
                        products={processedProducts.filter(item => item.isSystem)}
                        type="system"
                        onEdit={handleEditItem}
                        onDelete={handleDeleteItem}
                        deletingItemId={deletingItemId}
                        viewMode={viewMode}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
