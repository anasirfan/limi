import React from "react";
import { FaMountain, FaEdit, FaTrash, FaEye, FaDownload } from "react-icons/fa";

export default function MountTable({ 
  mounts, 
  onEdit, 
  onDelete, 
  deletingItemId,
  viewMode = "table" 
}) {
  if (!mounts || mounts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-[#50C878]/20 p-12 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-[#50C878]/20 to-[#87CEAB]/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <FaMountain className="text-4xl text-[#50C878]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No Mounts Available</h3>
        <p className="text-gray-400 text-lg">
          Create your first mount to get started with mount management.
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
              <FaMountain className="text-xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Mounts</h2>
              <p className="text-gray-400">Manage your mount configurations</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {mounts.length} mount{mounts.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mounts.map((mount) => (
            <div
              key={mount._id}
              className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-xl border border-[#50C878]/20 p-4 hover:border-[#50C878]/40 transition-all duration-300 group"
            >
              {/* Mount Icon */}
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-[#1a1a1a] border border-[#50C878]/20">
                {mount.mountIcon ? (
                  <img
                    src={mount.mountIcon}
                    alt={mount.mountName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaMountain className="text-4xl text-[#50C878]/50" />
                  </div>
                )}
              </div>

              {/* Mount Info */}
              <div className="space-y-2 mb-4">
                <h3 className="text-lg font-semibold text-white truncate">
                  {mount.mountName}
                </h3>
                {mount.mountModel && (
                  <p className="text-sm text-gray-400 truncate">
                    Model: {mount.mountModel}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit && onEdit(mount)}
                  className="flex-1 px-3 py-2 bg-[#50C878]/20 hover:bg-[#50C878]/30 rounded-lg text-[#50C878] text-sm font-medium transition-all duration-200 flex items-center justify-center"
                >
                  <FaEdit className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete && onDelete(mount)}
                  disabled={deletingItemId === mount._id}
                  className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                >
                  <FaTrash className="mr-1" />
                  {deletingItemId === mount._id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
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
              <FaMountain className="text-xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Mounts</h2>
              <p className="text-gray-400">Manage your mount configurations</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {mounts.length} mount{mounts.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#2a2a2a]/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Icon</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Mount Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Model</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#50C878]/10">
            {mounts.map((mount) => (
              <tr
                key={mount._id}
                className="hover:bg-[#50C878]/5 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#2a2a2a] border border-[#50C878]/20">
                    {mount.mountIcon ? (
                      <img
                        src={mount.mountIcon}
                        alt={mount.mountName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaMountain className="text-xl text-[#50C878]/50" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-white font-medium">{mount.mountName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-400">
                    {mount.mountModel || "No model"}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit && onEdit(mount)}
                      className="p-2 bg-[#50C878]/20 hover:bg-[#50C878]/30 rounded-lg text-[#50C878] transition-all duration-200"
                      title="Edit Mount"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(mount)}
                      disabled={deletingItemId === mount._id}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-all duration-200 disabled:opacity-50"
                      title="Delete Mount"
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
    </div>
  );
}
