"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export const SaveConfigModal = ({ 
  isOpen, 
  onClose, 
  onSave,
  configSummary
}) => {
  const [configName, setConfigName] = useState('');
 console.log("in SaveConfigModal");
  if (!isOpen) return null;

  const handleSave = () => {
    console.log("in handleSave");
    if (!configName.trim()) return;
    onSave(configName);
    setConfigName('');
  };

  // Format the config summary for display
  const formatConfigSummary = () => {
    console.log("in formatConfigSummary");
    const { light_type, base_type, light_amount, cables } = configSummary;
    
    let summaryText = `Light Type: ${light_type}\n`;
    if (light_type === 'ceiling') {
      summaryText += `Base Type: ${base_type}\n`;
    }
    summaryText += `Light Amount: ${light_amount}\n\n`;
    
    summaryText += 'Cables:\n';
    Object.keys(cables || {}).forEach(cableId => {
      summaryText += `Cable ${parseInt(cableId) + 1}: `;
      const cable = cables[cableId];
      
      if (typeof cable === 'string' && cable.includes('System Type')) {
        // This is already a formatted string from ConfiguratorLayout
        summaryText += `${cable.split('Cable ' + (parseInt(cableId) + 1) + ':')[1].trim()}\n`;
      } else if (cable.pendant) {
        // It's a pendant cable
        const pendantMap = {
          'product_1': 'Bumble',
          'product_2': 'Radial',
          'product_3': 'Fina'
        };
        const pendantName = pendantMap[cable.pendant] || cable.pendant.replace('product_', '');
        summaryText += `Pendant (${pendantName})\n`;
      } else if (cable.system_type) {
        // It's a system cable
        const baseMap = {
          'system_base_0': 'Nexus/Quantum/Vertex',
          'system_base_1': 'Fusion',
          'system_base_2': 'Aurora'
        };
        const baseName = baseMap[cable.product] || cable.product.replace('system_base_', '');
        const systemType = cable.system_type.charAt(0).toUpperCase() + cable.system_type.slice(1);
        summaryText += `{\nSystem Type : ${systemType}\nBase Design: ${baseName}\n}\n`;
      }
    });
    
    return summaryText;
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Save Configuration</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Configuration Name
          </label>
          <input
            type="text"
            value={configName}
            onChange={(e) => setConfigName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="My LIMI Configuration"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Configuration Summary
          </label>
          <pre className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm overflow-auto max-h-48">
            {formatConfigSummary()}
          </pre>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            disabled={!configName.trim()}
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SaveConfigModal;
