import { motion } from 'framer-motion';
import { FaUser, FaCheck } from "react-icons/fa";

export const SaveConfigurationModal = ({ 
  isLoggedIn, 
  configName, 
  setConfigName, 
  config, 
  currentDesign, 
  isSaving, 
  setShowSaveModal, 
  saveConfigToSystem 
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#2B2D2F] rounded-xl p-6 max-w-md w-full mx-4"
      >
        <h3 className="text-xl font-bold text-white mb-4">Save Your Configuration</h3>
        
        {!isLoggedIn ? (
          <div className="text-center py-4">
            <div className="mb-4 text-gray-300">
              <FaUser className="text-4xl mx-auto mb-3 text-[#50C878]" />
              <p>You need to be logged in to save configurations.</p>
            </div>
            <div className="flex gap-3 justify-center">
              <motion.button
                onClick={() => window.location.href = '/portal'}
                className="bg-[#50C878] hover:bg-[#3da861] text-white px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log In
              </motion.button>
              <motion.button
                onClick={() => setShowSaveModal(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Configuration Name</label>
              <input 
                type="text" 
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                placeholder="My Perfect Lighting Setup"
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50C878]"
              />
            </div>
            
            <div className="p-3 bg-gray-800 rounded-lg mb-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Configuration Summary</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-400">
                <div>Type: <span className="text-white capitalize">{config.lightType}</span></div>
                <div>Amount: <span className="text-white">{config.lightAmount}</span></div>
                <div>Design: <span className="text-white capitalize">{currentDesign}</span></div>
                <div>Configuration: <span className="text-white capitalize">{config.configurationType}</span></div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <motion.button
                onClick={() => setShowSaveModal(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={saveConfigToSystem}
                className="bg-[#50C878] hover:bg-[#3da861] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaCheck /> Save
                  </>
                )}
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
