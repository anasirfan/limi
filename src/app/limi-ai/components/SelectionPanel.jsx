'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiLightBulb, HiCog, HiUserGroup, HiSpeakerWave, 
  HiSun, HiWifi, HiShieldCheck, HiHome 
} from 'react-icons/hi2';

const iconMap = {
  HiLightBulb, HiCog, HiUserGroup, HiSpeakerWave, 
  HiSun, HiWifi, HiShieldCheck, HiHome
};

export default function SelectionPanel({ 
  type, // 'pendants', 'systems', 'sensors'
  items, 
  selectedItems = [], 
  onItemSelect,
  multiSelect = false 
}) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemClick = (item) => {
    if (multiSelect) {
      const isSelected = selectedItems.some(selected => selected.id === item.id);
      if (isSelected) {
        onItemSelect(selectedItems.filter(selected => selected.id !== item.id));
      } else {
        onItemSelect([...selectedItems, item]);
      }
    } else {
      onItemSelect(item);
    }
  };

  const isSelected = (item) => {
    if (multiSelect) {
      return selectedItems.some(selected => selected.id === item.id);
    }
    return selectedItems?.id === item.id;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon];
          const selected = isSelected(item);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item)}
              className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                selected
                  ? 'bg-[#54bb74]/20 border-2 border-[#54bb74] shadow-lg'
                  : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40'
              }`}
            >
              {/* Selection Indicator */}
              <AnimatePresence>
                {selected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-[#54bb74] rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-sm font-bold">✓</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Glow Effect */}
              <AnimatePresence>
                {hoveredItem === item.id && !selected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#54bb74]/10 to-[#93cfa2]/10 rounded-xl"
                  />
                )}
              </AnimatePresence>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-4">
                  {Icon && (
                    <div className={`p-3 rounded-lg ${
                      selected 
                        ? 'bg-[#54bb74] text-white' 
                        : 'bg-white/20 text-white'
                    }`}>
                      <Icon className="text-2xl" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-xl font-bold text-white">{item.name}</h4>
                    {item.category && (
                      <span className="text-sm px-2 py-1 bg-white/20 rounded-full text-white/80">
                        {item.category}
                      </span>
                    )}
                    {item.style && (
                      <p className="text-white/70 text-sm mt-1">{item.style}</p>
                    )}
                  </div>
                </div>

                {/* Features/Capabilities */}
                {(item.features || item.capabilities) && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-white mb-2">
                      {type === 'sensors' ? 'Capabilities:' : 'Features:'}
                    </h5>
                    <div className="space-y-1">
                      {(item.features || item.capabilities).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#54bb74] rounded-full"></div>
                          <span className="text-sm text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {item.specs && (
                  <div className="mb-4 pt-3 border-t border-white/20">
                    <div className="text-sm text-white/60">
                      {item.specs.lumens} • {item.specs.cri} CRI • {item.specs.temp}
                    </div>
                  </div>
                )}

                {/* Technology Info */}
                {item.technology && (
                  <div className="mb-4 pt-3 border-t border-white/20">
                    <div className="space-y-1 text-sm text-white/60">
                      <div>Technology: {item.technology}</div>
                      <div>Range: {item.range}</div>
                      <div>Privacy: {item.privacy}</div>
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {item.benefits && (
                  <div className="pt-3 border-t border-white/20">
                    <h5 className="font-semibold text-white mb-2">Benefits:</h5>
                    <div className="space-y-1">
                      {item.benefits.map((benefit, idx) => (
                        <div key={idx} className="text-sm text-[#54bb74]">• {benefit}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Integration */}
                {item.integration && (
                  <div className="pt-3 border-t border-white/20">
                    <h5 className="font-semibold text-white mb-2">Integrates with:</h5>
                    <div className="flex flex-wrap gap-2">
                      {item.integration.map((integration, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-white/10 rounded text-white/70">
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Applications */}
                {item.applications && (
                  <div className="pt-3 border-t border-white/20">
                    <h5 className="font-semibold text-white mb-2">Applications:</h5>
                    <div className="space-y-1">
                      {item.applications.map((application, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#93cfa2] rounded-full"></div>
                          <span className="text-sm text-white/80">{application}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Selection Animation */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-[#54bb74]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: selected ? 1 : 0.8, 
                  opacity: selected ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-[#54bb74]/10 border border-[#54bb74]/30 rounded-xl"
        >
          <h4 className="text-lg font-bold text-white mb-4">
            {multiSelect ? 'Selected Items:' : 'Selected Item:'}
          </h4>
          <div className="space-y-2">
            {(multiSelect ? selectedItems : [selectedItems]).map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-[#54bb74] rounded-full"></div>
                <span className="text-white/90">{item.name}</span>
                {item.category && (
                  <span className="text-xs px-2 py-1 bg-[#54bb74]/20 rounded text-[#54bb74]">
                    {item.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
