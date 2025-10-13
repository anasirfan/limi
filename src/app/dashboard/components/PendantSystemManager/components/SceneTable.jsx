import React, { useState } from "react";
import { FaImage, FaEdit, FaTrash, FaEye, FaCube } from "react-icons/fa";
import ModelViewer3D from "./ModelViewer3D";

export default function SceneTable({ 
  scenes, 
  onEdit, 
  onDelete, 
  deletingItemId,
  viewMode = "table" 
}) {
  const [selectedScene, setSelectedScene] = useState(null);
  const [showModelViewer, setShowModelViewer] = useState(false);

  const handleViewModel = (scene) => {
    console.log('🔍 Opening model viewer for scene:', scene);
    console.log('🔍 Scene model URL:', scene.sceneModel);
    setSelectedScene(scene);
    setShowModelViewer(true);
  };

  const handleCloseViewer = () => {
    console.log('🔍 Closing model viewer');
    setShowModelViewer(false);
    setSelectedScene(null);
  };

  if (!scenes || scenes.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-[#50C878]/20 p-12 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-[#50C878]/20 to-[#87CEAB]/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <FaImage className="text-4xl text-[#50C878]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No Scenes Available</h3>
        <p className="text-gray-400 text-lg">
          Create your first scene to get started with scene management.
        </p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-[#50C878]/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#50C878] to-[#87CEAB] rounded-xl flex items-center justify-center">
              <FaImage className="text-xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Scenes</h2>
              <p className="text-gray-400">Manage your scene configurations</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {scenes.length} scene{scenes.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {scenes.map((scene) => (
            <div
              key={scene._id}
              className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-[#50C878]/20 p-4 hover:border-[#50C878]/40 transition-all duration-300 group"
            >
              {/* Scene Icon */}
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-[#1a1a1a] border border-[#50C878]/20">
                {scene.sceneIcon ? (
                  <img
                    src={scene.sceneIcon}
                    alt={scene.sceneName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaImage className="text-4xl text-[#50C878]/50" />
                  </div>
                )}
              </div>

              {/* Scene Info */}
              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-white truncate">
                  {scene.sceneName}
                </h3>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Yaw Range:</span>
                    <span className="text-[#50C878]">{scene.minYaw} to {scene.maxYaw}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zoom Range:</span>
                    <span className="text-[#50C878]">{scene.minZoom} to {scene.maxZoom}</span>
                  </div>
                </div>
                {scene.sceneModel && (
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <FaCube className="text-[#50C878]" />
                    <span className="truncate">Model attached</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {scene.sceneModel && (
                  <button
                    onClick={() => handleViewModel(scene)}
                    className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 text-sm font-medium transition-all duration-200 flex items-center justify-center"
                  >
                    <FaEye className="mr-1" />
                    View
                  </button>
                )}
                <button
                  onClick={() => onEdit && onEdit(scene)}
                  className="flex-1 px-3 py-2 bg-[#50C878]/20 hover:bg-[#50C878]/30 rounded-lg text-[#50C878] text-sm font-medium transition-all duration-200 flex items-center justify-center"
                >
                  <FaEdit className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete && onDelete(scene)}
                  disabled={deletingItemId === scene._id}
                  className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                >
                  <FaTrash className="mr-1" />
                  {deletingItemId === scene._id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Model Viewer Modal */}
        {selectedScene && (
          <>
            {console.log('🔍 Rendering ModelViewer3D (Grid):', { 
              selectedScene: selectedScene?.sceneName, 
              showModelViewer, 
              modelUrl: selectedScene?.sceneModel 
            })}
            <ModelViewer3D
              modelUrl={selectedScene.sceneModel}
              modelName={`${selectedScene.sceneName} - 3D Model`}
              isOpen={showModelViewer}
              onClose={handleCloseViewer}
            />
          </>
        )}
      </div>
    );
  }

  // Table view
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-[#50C878]/20 overflow-hidden">
      <div className="p-6 border-b border-[#50C878]/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#50C878] to-[#87CEAB] rounded-xl flex items-center justify-center">
              <FaImage className="text-xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Scenes</h2>
              <p className="text-gray-400">Manage your scene configurations</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {scenes.length} scene{scenes.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#2a2a2a]/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Icon</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Scene Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Yaw Range</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Zoom Range</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Model</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#50C878]/10">
            {scenes.map((scene) => (
              <tr
                key={scene._id}
                className="hover:bg-[#50C878]/5 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#2a2a2a] border border-[#50C878]/20">
                    {scene.sceneIcon ? (
                      <img
                        src={scene.sceneIcon}
                        alt={scene.sceneName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaImage className="text-xl text-[#50C878]/50" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-white font-medium">{scene.sceneName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300">
                    <span className="text-[#50C878]">{scene.minYaw}</span>
                    <span className="text-gray-400"> to </span>
                    <span className="text-[#50C878]">{scene.maxYaw}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300">
                    <span className="text-[#50C878]">{scene.minZoom}</span>
                    <span className="text-gray-400"> to </span>
                    <span className="text-[#50C878]">{scene.maxZoom}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {scene.sceneModel ? (
                    <button
                      onClick={() => handleViewModel(scene)}
                      className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 text-sm font-medium transition-all duration-200 flex items-center"
                    >
                      <FaEye className="mr-1" />
                      View Model
                    </button>
                  ) : (
                    <div className="text-gray-400 text-sm">No model</div>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit && onEdit(scene)}
                      className="p-2 bg-[#50C878]/20 hover:bg-[#50C878]/30 rounded-lg text-[#50C878] transition-all duration-200"
                      title="Edit Scene"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(scene)}
                      disabled={deletingItemId === scene._id}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-all duration-200 disabled:opacity-50"
                      title="Delete Scene"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Model Viewer Modal */}
      {selectedScene && (
        <>
          {console.log('🔍 Rendering ModelViewer3D:', { 
            selectedScene: selectedScene?.sceneName, 
            showModelViewer, 
            modelUrl: selectedScene?.sceneModel 
          })}
          <ModelViewer3D
            modelUrl={selectedScene.sceneModel}
            modelName={`${selectedScene.sceneName} - 3D Model`}
            isOpen={showModelViewer}
            onClose={handleCloseViewer}
          />
        </>
      )}
    </div>
  );
}
