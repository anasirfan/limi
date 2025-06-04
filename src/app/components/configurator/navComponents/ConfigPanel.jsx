import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaCheck, FaCubes, FaLightbulb, FaTimes } from "react-icons/fa";
import { Breadcrumb } from './Breadcrumb';

export const ConfigPanel = ({
  configuringType,
  configuringSystemType,
  breadcrumbPath,
  onBreadcrumbNavigation,
  onSystemTypeSelection,
  selectedLocation,
  selectedPendants,
  onPendantDesignChange,
  onSystemBaseDesignChange,
  onSelectConfigurationType,
  onClose
}) => {
  const [currentDesign, setCurrentDesign] = useState(null);
  
  // Track navigation state for breadcrumb
  const [navState, setNavState] = useState({
    level: configuringType ? (configuringSystemType ? 2 : 1) : 0,
    path: [],
    ids: {}
  });

  const [currentConfig, SetcurrentConfig] = useState(null);
  
  // Update navigation state when configuringType or configuringSystemType changes
  useEffect(() => {
    updateNavigationState();
  }, [configuringType, configuringSystemType]);
  
  // Update navigation state based on current configuration
  const updateNavigationState = () => {
    let newState = {
      level: 0,
      path: [],
      ids: {}
    };
    
    if (!configuringType) {
      // Home level
      newState.level = 0;
    } else if (configuringType === 'pendant') {
      // Pendant design level
      newState.level = 1;
      newState.path = ['pendant'];
      newState.ids = { pendant: true };
    } else if (configuringType === 'system') {
      if (!configuringSystemType) {
        // System type selection level
        newState.level = 1;
        newState.path = ['system'];
        newState.ids = { system: true };
      } else {
        // System base design level
        newState.level = 2;
        newState.path = ['system', configuringSystemType];
        newState.ids = { system: true, [configuringSystemType]: true };
      }
    }
    
    setNavState(newState);
  };
  const carouselRef = useRef(null);
  
  const getCurrentConfig = () => {
    const config = getPanelConfig();
    SetcurrentConfig(config);
  };
  
  // Carousel scroll functionality
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Helper function to map design names to their corresponding image numbers
  const getDesignImageNumber = (designName) => {
    const designMap = {
      'bumble': '1.png',
      'radial': '2.png',
      'fina': '3.png',
      'ripple': '5.png',
      'nexus': 'system_base_1.png',
      'vertex': 'system_base_2.png',
      'quantum': 'system_base_3.png',
      'fusion': 'system_base_4.png',
    };
    
    return designMap[designName] || `${designName}.jpg`;
  };

  // Get panel configuration based on the current state
  const getPanelConfig = () => {
    // Default configuration for the panel
    let config = {
      title: "",
      showBreadcrumb: true,
      items: [],
      onItemSelect: () => {},
      breadcrumbItems: []
    };

    // Home/Configuration Type Selection
    if (!configuringType) {
      config.title = "Configuration Type";
      config.showBreadcrumb = false;
      config.items = [
        { id: 'pendant', name: 'Pendant', icon: <FaLightbulb size={16} className="text-emerald-500" /> },
        { id: 'system', name: 'System', icon: <FaCubes size={16} className="text-emerald-500" /> }
      ];
      config.onItemSelect = onSelectConfigurationType;
      config.selectedItem = null;
      config.useIcon = true;
      config.showCloseButton = true;
      config.showLocationLabel = true;
    }
    // Pendant Design Selection
    else if (configuringType === 'pendant') {
      config.title = "Pendant Design";
      config.showBreadcrumb = true;
      config.items = [
        { id: 'bumble', name: 'Bumble', image: '/images/configOptions/1.png' },
        { id: 'radial', name: 'Radial', image: '/images/configOptions/2.png' },
        { id: 'fina', name: 'Fina', image: '/images/configOptions/3.png' },
        { id: 'ripple', name: 'Ripple', image: '/images/configOptions/5.png' }
      ];
      config.onItemSelect = (itemId) => {
        setCurrentDesign(itemId);
        // Use all selected pendants if available, otherwise fall back to just the first one
        const pendantsToUpdate = selectedPendants && selectedPendants.length > 0 ? selectedPendants : [selectedLocation];
        onPendantDesignChange(pendantsToUpdate, itemId);
      };
      config.selectedItem = currentDesign;
      config.breadcrumbItems = [
        { id: 'home', name: 'icon-home' },
        { id: 'pendant', name: 'Pendant Design' }
      ];
    } 
    else if (configuringType === 'system') {
      if (!configuringSystemType) {
        // System type selection
        config.title = "System Type";
        config.showBreadcrumb = true;
        config.items = [
          { id: 'bar', name: 'Bar', icon: <FaCubes size={16} className="text-emerald-500" /> },
          { id: 'ball', name: 'Ball', icon: <FaCubes size={16} className="text-emerald-500" /> },
          { id: 'universal', name: 'Universal', icon: <FaCubes size={16} className="text-emerald-500" /> }
        ];
        config.onItemSelect = (systemType) => {
          // Call the parent handler to update state and send message to iframe
          onSystemTypeSelection(systemType);
        };
        config.selectedItem = configuringSystemType;
        config.useIcon = true;
        config.breadcrumbItems = [
          { id: 'home', name: 'icon-home' },
          { id: 'system', name: 'System Type' }
        ];
      } else {
        // System base design selection
        config.title = "System Bases";
        config.showBreadcrumb = true;
        config.items = [
          { id: 'nexus', name: 'Nexus', image: '/images/configOptions/system_base_1.png' },
          { id: 'vertex', name: 'Vertex', image: '/images/configOptions/system_base_2.png' },
          // { id: 'quantum', name: 'Quantum', image: '/images/configOptions/system_base_3.png' },
          { id: 'fusion', name: 'Fusion', image: '/images/configOptions/system_base_4.png' }
        ];
        config.onItemSelect = (itemId) => {
          setCurrentDesign(itemId);
          onSystemBaseDesignChange(itemId);
        };
        config.selectedItem = currentDesign;
        config.breadcrumbItems = [
          { id: 'home', name: 'icon-home' },
          { id: 'system', name: 'System' },
          { id: configuringSystemType, name: `${configuringSystemType.charAt(0).toUpperCase() + configuringSystemType.slice(1)} System` }
        ];
      }
    }


    return config;
  };
  
  // Custom breadcrumb navigation handler
  const handleBreadcrumbNavigation = (id) => {
    // Use the navigation state to determine where to go
    if (id === 'home') {
      // Reset to configuration type selection (first level)
      console.log('Home clicked')
      onSelectConfigurationType(null);
      // Do NOT call onClose() as we want to keep the panel open
    } else if (id === 'system' && navState.level === 2) {
      // If we're in system base design and click on System Type breadcrumb,
      // go back to system type selection
      setNavState({
        level: 1,
        path: ['system'],
        ids: { system: true }
      });
      onSystemTypeSelection(null);
    } else if (id === 'pendant') {
      // If we click on Pendant Design breadcrumb, ensure we're at that level
      if (configuringType !== 'pendant') {
        onSelectConfigurationType('pendant');
      }
    } else {
      // Pass through to the parent handler
      onBreadcrumbNavigation(id);
    }
    
    // Log current navigation state for debugging
    console.log('Navigation state after breadcrumb click:', {
      id,
      newLevel: id === 'home' ? 0 : id === 'system' ? 1 : navState.level,
      configuringType: id === 'home' ? null : configuringType,
      configuringSystemType: id === 'system' ? null : configuringSystemType
    });
  };
  
  // Get the current panel configuration
  const formatSelectedLocations = (locations) => {
    if (typeof locations === 'number') {
      return locations + 1;
    }

    if (Array.isArray(locations) && locations.length > 0) {
      const numericLocations = locations.filter(loc => typeof loc === 'number');
      if (numericLocations.length === 0) return ''; // Handle empty or invalid array

      const displayLocations = numericLocations.map(loc => loc + 1).sort((a, b) => a - b);

      if (displayLocations.length === 0) return ''; // Should be caught by numericLocations.length check, but good for safety

      if (displayLocations.length > 5) {
        const firstFew = displayLocations.slice(0, 4);
        return `${firstFew.join(', ')}, ...`;
      } else if (displayLocations.length === 1) {
        return displayLocations[0];
      } else if (displayLocations.length === 2) {
        return `${displayLocations[0]} & ${displayLocations[1]}`;
      } else { // 3 to 5 locations
        const lastItem = displayLocations.pop();
        return `${displayLocations.join(', ')} & ${lastItem}`;
      }
    }
    return ''; // Default for other cases (null, undefined, etc.)
  };

  const panelConfig = getPanelConfig();
  return (
    <motion.div 
      className="absolute bottom-4 left-[40%] -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-gray-800 rounded-lg z-40 max-w-[280px] w-[20%] h-[15%] shadow-lg"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <div className="px-3 py-4">
        <div className="flex items-center justify-between mb-2">
          {panelConfig.showBreadcrumb ? (
            <>
              <Breadcrumb path={panelConfig.breadcrumbItems} onNavigate={handleBreadcrumbNavigation} />
              <h3 className="text-xs font-medium text-white font-['Amenti']">{panelConfig.title}</h3>
            </>
          ) : (
            <>
              <div className="flex items-center">
                <h3 className="text-xs font-medium text-white font-['Amenti']">
                  {panelConfig.showLocationLabel ? `Configure Cable${selectedPendants && selectedPendants.length > 1 ? 's' : ''} ${formatSelectedLocations(selectedPendants || selectedLocation)}` : panelConfig.title}
                </h3>
              </div>
              {panelConfig.showCloseButton && (
                <button 
                  onClick={onClose}
                  className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700"
                >
                  <FaTimes size={8} className="text-gray-400" />
                </button>
              )}
            </>
          )}
        </div>
        
        {/* Items carousel */}
        <div className="relative">
          {panelConfig.items.length > 3 && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => scrollCarousel('left')}
                className="w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <FaChevronLeft size={8} />
              </button>
            </div>
          )}
          
          <div 
            ref={carouselRef}
            className="flex gap-1 overflow-x-auto scrollbar-hide py-1 px-5 max-w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {panelConfig.items.map((item) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 cursor-pointer px-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => panelConfig.onItemSelect(item.id)}
              >
                <div className={`w-16 h-16 rounded-full overflow-hidden relative ${
                  panelConfig.selectedItem === item.id ? 'ring-2 ring-emerald-500' : ''
                }`}>
                  {panelConfig.useIcon ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="scale-100">{item.icon}</div>
                    </div>
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  {panelConfig.selectedItem === item.id && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                      <FaCheck className="text-white text-[8px]" />
                    </div>
                  )}
                </div>
                <p className="text-center text-[10px] mt-0.5 text-gray-300 capitalize">{item.name}</p>
              </motion.div>
            ))}
          </div>
          
          {panelConfig.items.length > 3 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => scrollCarousel('right')}
                className="w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <FaChevronRight size={8} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
