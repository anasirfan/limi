import React, { useState, useMemo, useEffect } from "react";
import { FaLightbulb, FaPlus, FaSpinner, FaSync, FaMountain, FaImage } from "react-icons/fa";
import TabNavigation from "./components/TabNavigation";
import ProductTable from "./components/ProductTable";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import AddMountModal from "./components/AddMountModal";
import MountTable from "./components/MountTable";
import AddSceneModal from "./components/AddSceneModal";
import SceneTable from "./components/SceneTable";
import { filterProductsByTab } from "./utils/fileUtils";
import { onDataRefresh, refreshSystemAssignments, getAllSystemAssignments } from "../../../components/configurator/pendantSystemData";

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

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddMountModal, setShowAddMountModal] = useState(false);
  const [showAddSceneModal, setShowAddSceneModal] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  
  // Mount state
  const [mounts, setMounts] = useState([]);
  const [mountLoading, setMountLoading] = useState(false);
  const [mountSaving, setMountSaving] = useState(false);
  const [newMountData, setNewMountData] = useState({
    mountName: "",
    mountIcon: "",
    mountModel: "",
    mountBaseType: "",
    mountCableNumber: null
  });
  const [mountIconPreview, setMountIconPreview] = useState("");
  const [mountModelPreview, setMountModelPreview] = useState("");
  const [mountIconFile, setMountIconFile] = useState(null);
  const [mountModelFile, setMountModelFile] = useState(null);
  
  // Scene state
  const [scenes, setScenes] = useState([]);
  const [sceneLoading, setSceneLoading] = useState(false);
  const [sceneSaving, setSceneSaving] = useState(false);
  const [newSceneData, setNewSceneData] = useState({
    sceneName: "",
    sceneIcon: "",
    sceneModel: "",
    minYaw: "",
    maxYaw: "",
    minZoom: "",
    maxZoom: ""
  });
  const [sceneIconPreview, setSceneIconPreview] = useState("");
  const [sceneModelPreview, setSceneModelPreview] = useState("");
  const [sceneIconFile, setSceneIconFile] = useState(null);
  const [sceneModelFile, setSceneModelFile] = useState(null);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [viewMode, setViewMode] = useState("table");
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [selectedItems, setSelectedItems] = useState(new Set());
  
  // Local state for pendant system data to enable instant updates
  const [localPendantSystemData, setLocalPendantSystemData] = useState([]);
  
  // Force re-render when data changes
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now());

  // Initialize with direct API call instead of relying on props
  useEffect(() => {
    const initializeData = async () => {
      console.log('🔄 PendantSystemManager: Initializing with direct API call');
      setIsInitialLoading(true);
      try {
        await fetchAndUpdateLocalState();
      } catch (error) {
        console.error('Error initializing data:', error);
        // Fallback to prop data if API fails - show ALL items
        setLocalPendantSystemData(pendantSystemData);
      }
      setIsInitialLoading(false);
    };

    initializeData();
  }, []); // Only run once on mount

  // Update local state when prop changes (as fallback)
  useEffect(() => {
    if (!isInitialLoading && pendantSystemData.length > 0) {
      console.log('🔄 PendantSystemManager: Prop data changed, updating local state as fallback');
      setLocalPendantSystemData(pendantSystemData);
    }
  }, [pendantSystemData, isInitialLoading]);

  // Function to directly fetch and update local state using the new getAllSystemAssignments
  const fetchAndUpdateLocalState = async () => {
    try {
      console.log('🔄 PendantSystemManager: Using getAllSystemAssignments for dashboard');
      const formattedData = await getAllSystemAssignments();
      
      console.log('🔄 PendantSystemManager: Direct fetch - updating local state', {
        totalItems: formattedData.length,
        showingAllItems: 'Dashboard shows ALL items regardless of isShow status'
      });
      
      // Update local state directly - SHOW ALL ITEMS in dashboard
      setLocalPendantSystemData(formattedData);
      setDataRefreshTrigger(prev => prev + 1);
      setLastUpdateTimestamp(Date.now());
      
      // Force a complete re-render by updating a timestamp
      console.log('🔄 PendantSystemManager: Local state updated with ALL items:', formattedData.map(item => ({ id: item._id, name: item.name, isShow: item.isShow })));
      
      return formattedData;
    } catch (error) {
      console.error('Error in getAllSystemAssignments fetch:', error);
      
      // Fallback to direct API call if the new function fails
      try {
        const response = await fetch("https://dev.api1.limitless-lighting.co.uk/admin/configurator/system", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const formattedData = Array.isArray(data) ? data : data?.data || [];
          
          console.log('🔄 PendantSystemManager: Fallback direct API - updating local state', {
            totalItems: formattedData.length
          });
          
          setLocalPendantSystemData(formattedData);
          setDataRefreshTrigger(prev => prev + 1);
          setLastUpdateTimestamp(Date.now());
          
          return formattedData;
        }
      } catch (fallbackError) {
        console.error('Error in fallback direct fetch:', fallbackError);
      }
    }
    return null;
  };

  // Subscribe to data refresh events to update local state instantly
  useEffect(() => {
    const unsubscribe = onDataRefresh((newData) => {
      console.log('🔄 PendantSystemManager: Data refreshed, updating local state instantly');
      // Update local state with ALL data - dashboard shows everything
      setLocalPendantSystemData(newData);
      setDataRefreshTrigger(prev => prev + 1);
      setLastUpdateTimestamp(Date.now());
    });

    return unsubscribe;
  }, []);

  // Add additional refresh triggers for better reliability
  useEffect(() => {
    // Refresh when window gains focus
    const handleFocus = async () => {
      console.log('🔄 PendantSystemManager: Window focused, triggering refresh');
      try {
        await refreshSystemAssignments();
        // Also directly fetch to ensure local state updates
        await fetchAndUpdateLocalState();
      } catch (error) {
        console.error('Error refreshing on focus:', error);
      }
    };

    // Refresh when page becomes visible (tab switching)
    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        console.log('🔄 PendantSystemManager: Page visible, triggering refresh');
        try {
          await refreshSystemAssignments();
          // Also directly fetch to ensure local state updates
          await fetchAndUpdateLocalState();
        } catch (error) {
          console.error('Error refreshing on visibility change:', error);
        }
      }
    };

    // Add event listeners
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Periodic refresh fallback (every 2 minutes)
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log('🔄 PendantSystemManager: Periodic refresh fallback');
      try {
        await refreshSystemAssignments();
        // Also directly fetch to ensure local state updates
        await fetchAndUpdateLocalState();
      } catch (error) {
        console.error('Error in periodic refresh:', error);
      }
    }, 2 * 60 * 1000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  // Manual refresh function - completely independent
  const handleManualRefresh = async () => {
    setIsManualRefreshing(true);
    console.log('🔄 PendantSystemManager: Manual refresh triggered - bypassing global system');
    try {
      // ONLY use direct fetch - bypass global system entirely
      const freshData = await fetchAndUpdateLocalState();
      
      if (freshData) {
        console.log('🔄 PendantSystemManager: Manual refresh successful - UI should update now');
      } else {
        console.log('🔄 PendantSystemManager: Manual refresh failed - no data returned');
      }
      
      // Small delay to show the refresh animation
      setTimeout(() => setIsManualRefreshing(false), 500);
    } catch (error) {
      console.error('Error in manual refresh:', error);
      setIsManualRefreshing(false);
    }
  };

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
      hasSilver: item.hasSilver !== undefined ? item.hasSilver : false, // Default: No Silver
      baseType: item.baseType || "round" // Default: Round for chandelier
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

  // Handle toggle show functionality
  const handleToggleShow = async (itemId, isShow) => {
    try {
      // Only send the isShow field to the update API
      const updatedData = {
        isShow: isShow
      };

      // Call the update API with only isShow field
      await updatePendantSystem(itemId, updatedData);
      console.log(`Successfully updated item ${itemId} with isShow: ${isShow}`);
    } catch (error) {
      console.error("Error toggling show status:", error);
      alert("Failed to update show status. Please try again.");
    }
  };

  const handleAddNew = () => {
    setShowAddModal(true);
    setShowAddForm(true);
  };

  // Mount handlers
  const handleAddMount = () => {
    setShowAddMountModal(true);
  };

  const handleCloseMountModal = () => {
    setShowAddMountModal(false);
    // Clear form data
    setNewMountData({
      mountName: "",
      mountIcon: "",
      mountModel: "",
      mountBaseType: "",
      mountCableNumber: null
    });
    setMountIconPreview("");
    setMountModelPreview("");
    setMountIconFile(null);
    setMountModelFile(null);
  };

  const handleMountInputChange = (e) => {
    const { name, value } = e.target;
    setNewMountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMountIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMountIconFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setMountIconPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMountModelChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMountModelFile(file);
      setMountModelPreview(file.name);
    }
  };

  const fetchMounts = async () => {
    setMountLoading(true);
    try {
      const token = localStorage.getItem("limiToken");
      const response = await fetch("https://dev.api1.limitless-lighting.co.uk/admin/configurator/mount", {
        method: "GET",
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle both array and object responses
        const mountsArray = Array.isArray(data) ? data : data?.data || [];
        setMounts(mountsArray);
      } else {
        console.error("Failed to fetch mounts:", response.status);
      }
    } catch (error) {
      console.error("Error fetching mounts:", error);
    }
    setMountLoading(false);
  };

  const saveMountData = async () => {
    setMountSaving(true);
    try {
      const formData = new FormData();
      formData.append('mountName', newMountData.mountName);
      formData.append('mountBaseType', newMountData.mountBaseType);
      formData.append('mountCableNumber', newMountData.mountCableNumber);
      
      if (mountIconFile) {
        formData.append('mountIcon', mountIconFile);
      }
      
      if (mountModelFile) {
        formData.append('mountModel', mountModelFile);
      }

      const token = localStorage.getItem("limiToken");
      const response = await fetch("https://dev.api1.limitless-lighting.co.uk/admin/configurator/mount", {
        method: "POST",
        headers: {
          "Authorization": `${token}`,
        },
        body: formData
      });

      if (response.ok) {
        console.log("Mount saved successfully");
        handleCloseMountModal();
        fetchMounts(); // Refresh the mounts list
      } else {
        console.error("Failed to save mount:", response.status);
        alert("Failed to save mount. Please try again.");
      }
    } catch (error) {
      console.error("Error saving mount:", error);
      alert("Failed to save mount. Please try again.");
    }
    setMountSaving(false);
  };

  // Fetch mounts when component mounts or when mount tab is active
  useEffect(() => {
    if (activeTab === 'mount') {
      fetchMounts();
    }
  }, [activeTab]);

  // Scene handlers
  const handleAddScene = () => {
    setShowAddSceneModal(true);
  };

  const handleCloseSceneModal = () => {
    setShowAddSceneModal(false);
    // Clear form data
    setNewSceneData({
      sceneName: "",
      sceneIcon: "",
      sceneModel: "",
      minYaw: "",
      maxYaw: "",
      minZoom: "",
      maxZoom: ""
    });
    setSceneIconPreview("");
    setSceneModelPreview("");
    setSceneIconFile(null);
    setSceneModelFile(null);
  };

  const handleSceneInputChange = (e) => {
    const { name, value } = e.target;
    setNewSceneData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSceneIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSceneIconFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSceneIconPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSceneModelChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSceneModelFile(file);
      setSceneModelPreview(file.name);
    }
  };

  const fetchScenes = async () => {
    setSceneLoading(true);
    try {
      const token = localStorage.getItem("limiToken");
      const response = await fetch("https://dev.api1.limitless-lighting.co.uk/admin/configurator/scene", {
        method: "GET",
        headers: {
          "Authorization": `${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle both array and object responses
        const scenesArray = Array.isArray(data) ? data : data?.data || [];
        setScenes(scenesArray);
      } else {
        console.error("Failed to fetch scenes:", response.status);
      }
    } catch (error) {
      console.error("Error fetching scenes:", error);
    }
    setSceneLoading(false);
  };

  const saveSceneData = async () => {
    setSceneSaving(true);
    try {
      const formData = new FormData();
      formData.append('sceneName', newSceneData.sceneName);
      formData.append('minYaw', parseInt(newSceneData.minYaw));
      formData.append('maxYaw', parseInt(newSceneData.maxYaw));
      formData.append('minZoom', parseInt(newSceneData.minZoom));
      formData.append('maxZoom', parseInt(newSceneData.maxZoom));
      
      if (sceneIconFile) {
        formData.append('sceneIcon', sceneIconFile);
      }
      
      if (sceneModelFile) {
        formData.append('sceneModel', sceneModelFile);
      }

      const token = localStorage.getItem("limiToken");
      const response = await fetch("https://dev.api1.limitless-lighting.co.uk/admin/configurator/scene", {
        method: "POST",
        headers: {
          "Authorization": `${token}`,
        },
        body: formData
      });

      if (response.ok) {
        console.log("Scene saved successfully");
        handleCloseSceneModal();
        fetchScenes(); // Refresh the scenes list
      } else {
        console.error("Failed to save scene:", response.status);
        alert("Failed to save scene. Please try again.");
      }
    } catch (error) {
      console.error("Error saving scene:", error);
      alert("Failed to save scene. Please try again.");
    }
    setSceneSaving(false);
  };

  // Fetch scenes when component mounts or when scene tab is active
  useEffect(() => {
    if (activeTab === 'scene') {
      fetchScenes();
    }
  }, [activeTab]);

  const handleEditScene = (scene) => {
    // For now, just log - you can implement edit functionality later
    console.log("Edit scene:", scene);
  };

  const handleDeleteScene = async (scene) => {
    if (window.confirm(`Are you sure you want to delete "${scene.sceneName}"? This action cannot be undone.`)) {
      try {
        const token = localStorage.getItem("limiToken");
        const response = await fetch(`https://dev.api1.limitless-lighting.co.uk/admin/configurator/scene/${scene._id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Scene deleted successfully");
          fetchScenes(); // Refresh the scenes list
        } else {
          console.error("Failed to delete scene:", response.status);
          alert("Failed to delete scene. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting scene:", error);
        alert("Failed to delete scene. Please try again.");
      }
    }
  };

  const handleEditMount = (mount) => {
    // For now, just log - you can implement edit functionality later
    console.log("Edit mount:", mount);
  };

  const handleDeleteMount = async (mount) => {
    if (window.confirm(`Are you sure you want to delete "${mount.mountName}"? This action cannot be undone.`)) {
      try {
        const token = localStorage.getItem("limiToken");
        const response = await fetch(`https://dev.api1.limitless-lighting.co.uk/admin/configurator/mount/${mount._id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Mount deleted successfully");
          fetchMounts(); // Refresh the mounts list
        } else {
          console.error("Failed to delete mount:", response.status);
          alert("Failed to delete mount. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting mount:", error);
        alert("Failed to delete mount. Please try again.");
      }
    }
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
      hasSilver: false, // Default: No Silver
      baseType: "round" // Default: Round for chandelier
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
      if (newPendantData.baseType !== editingItem.baseType) {
        changedFields.baseType = newPendantData.baseType;
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
    console.log('🔄 PendantSystemManager: Processing products', {
      localDataLength: localPendantSystemData.length,
      activeTab,
      dataRefreshTrigger,
      localDataItems: localPendantSystemData.map(item => ({ id: item._id, name: item.name, isShow: item.isShow }))
    });
    
    // First filter by tab - use local state instead of props
    let filtered = filterProductsByTab(localPendantSystemData, activeTab);
    
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

    console.log('🔄 PendantSystemManager: Processed products result', {
      filteredLength: filtered.length,
      filteredItems: filtered.map(item => ({ id: item._id, name: item.name, isShow: item.isShow }))
    });
    
    return filtered;
  }, [localPendantSystemData, activeTab, searchQuery, activeFilters, sortField, sortDirection, dataRefreshTrigger, lastUpdateTimestamp]);

  const pendantProducts = processedProducts.filter((item) => !item.isSystem);
  const systemProducts = processedProducts.filter((item) => item.isSystem);
  
  console.log('🔄 PendantSystemManager: Final product counts', {
    processedProducts: processedProducts.length,
    pendantProducts: pendantProducts.length,
    systemProducts: systemProducts.length
  });

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
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddMount}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#87CEAB] to-[#54bb74] rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#87CEAB]/25 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#54bb74] to-[#87CEAB] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <FaMountain className="text-xl" />
                    <span className="text-lg">Add Mount</span>
                  </div>
                </button>
                
                <button
                  onClick={handleAddScene}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#50C878] to-[#87CEAB] rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#50C878]/25 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#87CEAB] to-[#50C878] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <FaImage className="text-xl" />
                    <span className="text-lg">Add Scene</span>
                  </div>
                </button>
                
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
        pendantSystemData={localPendantSystemData}
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

      {/* Add Mount Modal */}
      <AddMountModal
        showModal={showAddMountModal}
        onClose={handleCloseMountModal}
        newMountData={newMountData}
        handleMountInputChange={handleMountInputChange}
        handleMountIconChange={handleMountIconChange}
        handleMountModelChange={handleMountModelChange}
        mountIconPreview={mountIconPreview}
        mountModelPreview={mountModelPreview}
        mountSaving={mountSaving}
        onSave={saveMountData}
      />

      {/* Add Scene Modal */}
      <AddSceneModal
        showModal={showAddSceneModal}
        onClose={handleCloseSceneModal}
        newSceneData={newSceneData}
        handleSceneInputChange={handleSceneInputChange}
        handleSceneIconChange={handleSceneIconChange}
        handleSceneModelChange={handleSceneModelChange}
        sceneIconPreview={sceneIconPreview}
        sceneModelPreview={sceneModelPreview}
        sceneSaving={sceneSaving}
        onSave={saveSceneData}
      />

      {/* Main Content */}
      <div className="space-y-8">
        {(pendantLoading || isInitialLoading) ? (
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
        ) : localPendantSystemData.length === 0 && !showAddForm ? (
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
              <div className="flex gap-4">
                <button
                  onClick={handleManualRefresh}
                  disabled={isManualRefreshing}
                  className="group relative bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <FaSync className={`text-xl ${isManualRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isManualRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                  </div>
                </button>
                
                <button
                  onClick={handleAddNew}
                  className="group relative bg-gradient-to-r from-[#54bb74] to-[#87CEAB] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#87CEAB] to-[#54bb74] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-4">
                    <FaPlus className="text-2xl" />
                    <span>Add New Design</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          localPendantSystemData.length > 0 && (
            <div className="space-y-8">
              {/* Tab Navigation with Search */}
              <TabNavigation
                key={`tabnav-${dataRefreshTrigger}-${localPendantSystemData.length}-${lastUpdateTimestamp}`}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                products={localPendantSystemData}
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
                mounts={mounts}
                scenes={scenes}
              />

              {/* Filtered Products Display */}
              <div className="space-y-8">
                {/* Show Pendant Products Section only for 'all' and 'pendant' tabs */}
                {(activeTab === 'all' || activeTab === 'pendant') && pendantProducts.length > 0 && (
                  <ProductTable
                    key={`pendant-${dataRefreshTrigger}-${pendantProducts.length}`}
                    products={pendantProducts}
                    type="pendant"
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                    onToggleShow={handleToggleShow}
                    deletingItemId={deletingItemId}
                    viewMode={viewMode}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                )}

                {/* Show System Products Section only for 'all', 'system', and specific system types */}
                {(activeTab === 'all' || activeTab === 'system' || ['bar', 'ball', 'universal'].includes(activeTab)) && systemProducts.length > 0 && (
                  <ProductTable
                    key={`system-${dataRefreshTrigger}-${systemProducts.length}`}
                    products={systemProducts}
                    type="system"
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                    onToggleShow={handleToggleShow}
                    deletingItemId={deletingItemId}
                    viewMode={viewMode}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                )}

                {/* Show Chandeliers */}
                {activeTab === 'chandelier' && processedProducts.length > 0 && (
                  <ProductTable
                    key={`chandelier-${dataRefreshTrigger}-${processedProducts.length}`}
                    products={processedProducts}
                    type="chandelier"
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                    onToggleShow={handleToggleShow}
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
                        key={`model-pendant-${dataRefreshTrigger}-${processedProducts.filter(item => !item.isSystem).length}`}
                        products={processedProducts.filter(item => !item.isSystem)}
                        type="pendant"
                        onEdit={handleEditItem}
                        onDelete={handleDeleteItem}
                        onToggleShow={handleToggleShow}
                        deletingItemId={deletingItemId}
                        viewMode={viewMode}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                      />
                    )}
                    {/* Show system products with models */}
                    {processedProducts.filter(item => item.isSystem).length > 0 && (
                      <ProductTable
                        key={`model-system-${dataRefreshTrigger}-${processedProducts.filter(item => item.isSystem).length}`}
                        products={processedProducts.filter(item => item.isSystem)}
                        type="system"
                        onEdit={handleEditItem}
                        onDelete={handleDeleteItem}
                        onToggleShow={handleToggleShow}
                        deletingItemId={deletingItemId}
                        viewMode={viewMode}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                      />
                    )}
                  </>
                )}

                {/* Show Mounts */}
                {activeTab === 'mount' && (
                  <MountTable
                    key={`mounts-${mounts.length}`}
                    mounts={mounts}
                    onEdit={handleEditMount}
                    onDelete={handleDeleteMount}
                    deletingItemId={deletingItemId}
                    viewMode={viewMode}
                  />
                )}

                {/* Show Scenes */}
                {activeTab === 'scene' && (
                  <SceneTable
                    key={`scenes-${scenes.length}`}
                    scenes={scenes}
                    onEdit={handleEditScene}
                    onDelete={handleDeleteScene}
                    deletingItemId={deletingItemId}
                    viewMode={viewMode}
                  />
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
