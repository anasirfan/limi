import React, { useState, useMemo } from 'react';
import { 
  FaLightbulb, 
  FaCube, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSpinner,
  FaTimes,
  FaCheckSquare,
  FaSquare
} from 'react-icons/fa';
import { MdLightbulb } from 'react-icons/md';
import ModelViewer3D from './ModelViewer3D';
import DetailViewModal from './DetailViewModal';

const ProductTable = ({ 
  products, 
  onEdit, 
  onDelete, 
  deletingItemId,
  selectedItems,
  onSelectItem,
  onSelectAll,
  isAllSelected,
  viewMode = 'table'
}) => {
  const [isModelViewerOpen, setIsModelViewerOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const processedProducts = useMemo(() => {
    return products.map(product => ({
      ...product,
      isSystem: product.systemType && product.systemType !== 'pendant',
      isChandelier: product.systemType === 'chandelier'
    }));
  }, [products]);

  const handleViewModel = (item) => {
    const modelUrl = item.media?.model?.url || item.model;
    if (modelUrl && modelUrl.trim() !== '') {
      setSelectedModel({
        url: modelUrl,
        name: item.name
      });
      setIsModelViewerOpen(true);
    }
  };

  const handleCloseModelViewer = () => {
    setIsModelViewerOpen(false);
    setSelectedModel(null);
  };

  const handleViewDetails = (item) => {
    setSelectedDetailItem(item);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedDetailItem(null);
  };

  const handleSelectItem = (itemId) => {
    if (onSelectItem) {
      onSelectItem(itemId);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#2B2D2F] to-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-[#50C878]/10 to-[#87CEAB]/10 border-b border-gray-700/50">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-semibold text-gray-300">
          <div className="col-span-5">Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Model</div>
          <div className="col-span-3">Actions</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-700/30">
        {processedProducts.map((item, index) => {
          const isSystem = item.isSystem;
          const isChandelier = item.isChandelier;
          const Icon = isSystem ? MdLightbulb : FaLightbulb;
          
          return (
            <div
              key={item._id || index}
              onMouseEnter={() => setHoveredItem(item._id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`grid grid-cols-12 gap-4 p-4 transition-all duration-200 ${
                hoveredItem === item._id 
                  ? 'bg-gradient-to-r from-[#50C878]/5 to-[#87CEAB]/5' 
                  : 'hover:bg-gray-800/30'
              } ${selectedItems.has(item._id) ? 'bg-blue-500/10 border-l-4 border-blue-500' : ''}`}
            >
           

              {/* Name with Icon and Image */}
              <div className="col-span-5 flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isChandelier 
                    ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10' 
                    : isSystem 
                      ? 'bg-gradient-to-br from-[#87CEAB]/20 to-[#87CEAB]/10' 
                      : 'bg-gradient-to-br from-[#50C878]/20 to-[#50C878]/10'
                }`}>
                  {item.image || item.media?.image?.url ? (
                    <img
                      src={item.image || item.media?.image?.url}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  ) : (
                    <Icon className={`text-xl ${
                      isChandelier 
                        ? 'text-yellow-500' 
                        : isSystem 
                          ? 'text-[#87CEAB]' 
                          : 'text-[#50C878]'
                    }`} />
                  )}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{item.name}</h4>
                  <p className="text-gray-400 text-sm truncate max-w-xs">{item.message}</p>
                </div>
              </div>

              {/* Type */}
              <div className="col-span-2 flex items-center">
                {isChandelier ? (
                  <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    Chandelier
                  </span>
                ) : isSystem ? (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      item.systemType === "bar"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : item.systemType === "ball"
                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    }`}
                  >
                    {item.systemType || "System"}
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-green-500/20 text-green-400 border border-green-500/30">
                    Pendant
                  </span>
                )}
              </div>

              {/* Model */}
              <div className="col-span-2 flex items-center">
                {(() => {
                  const modelUrl = item.media?.model?.url || item.model;
                  const hasModel = modelUrl && modelUrl.trim() !== '';
                  
                  return hasModel ? (
                    <button
                      onClick={() => handleViewModel(item)}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <FaCube />
                      <span>View 3D</span>
                    </button>
                  ) : (
                    <span className="text-gray-500 text-xs">No Model</span>
                  );
                })()}
              </div>

              {/* Actions */}
              <div className="col-span-3 flex items-center space-x-2">
                <button
                  onClick={() => handleViewDetails(item)}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs hover:bg-emerald-500/30 transition-colors duration-200 flex items-center space-x-1"
                >
                  <FaEye />
                  <span>View</span>
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-colors duration-200 flex items-center space-x-1"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDelete(item)}
                  disabled={deletingItemId === item._id}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                >
                  {deletingItemId === item._id ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTrash />
                  )}
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail View Modal */}
      <DetailViewModal
        showModal={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        item={selectedDetailItem}
        onViewModel={handleViewModel}
      />

      {/* 3D Model Viewer Modal */}
      {selectedModel && (
        <ModelViewer3D
          modelUrl={selectedModel.url}
          modelName={selectedModel.name}
          isOpen={isModelViewerOpen}
          onClose={handleCloseModelViewer}
        />
      )}
    </div>
  );
};

export default ProductTable;
