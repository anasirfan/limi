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
  onClose,
  className = '' // Add className prop with default empty string
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
      'nexus': 'product_1.png',
      'vertex': 'product_2.png',
      'quantum': 'product_3.png',
      'fusion': 'product_4.png',
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
        { id: 'pendant', name: 'Pendant', image: '/images/configOptions/pendant.png' },
        { id: 'system', name: 'System', image: '/images/configOptions/system.png' }
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
        // { id: 'ripple', name: 'Ripple', image: '/images/configOptions/5.png' }
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
          { id: 'bar', name: 'Bar', image: '/images/configOptions/bar.png' },
          { id: 'ball', name: 'Ball', image: '/images/configOptions/ball.png' },
          { id: 'universal', name: 'Universal', image: '/images/configOptions/universal.png' }
        ];
        config.onItemSelect = (systemType) => {
          // Call the parent handler to update state and send message to iframe
          onSystemTypeSelection(systemType);
        };
        config.selectedItem = configuringSystemType;
        config.useIcon = false;
        config.breadcrumbItems = [
          { id: 'home', name: 'icon-home' },
          { id: 'system', name: 'System Type' }
        ];
      } else {
        // System base design selection based on the selected system type
        config.title = `${configuringSystemType.charAt(0).toUpperCase() + configuringSystemType.slice(1)} System Bases`;
        config.showBreadcrumb = true;
        
        // Map of base IDs to names and image numbers based on available files
        const baseOptions = {
          'bar': [
          {id: 'centaur', name: 'Centaur', baseNumber: '11', image: '/images/configOptions/bar/11.png'},
          {id: 'apollo', name: 'Apollo', baseNumber: '12', image: '/images/configOptions/bar/12.png'},
          {id: 'ico', name: 'Ico', baseNumber: '13', image: '/images/configOptions/bar/13.png'},
          {id: 'orion', name: 'Orion', baseNumber: '14', image: '/images/configOptions/bar/14.jpg'},
{id: 'vega', name: 'Vega', baseNumber: '15', image: '/images/configOptions/bar/15.jpg'},
{id: 'atlas', name: 'Atlas', baseNumber: '16', image: '/images/configOptions/bar/16.jpg'},
{id: 'nova', name: 'Nova', baseNumber: '17', image: '/images/configOptions/bar/17.jpg'},
{id: 'hera', name: 'Hera', baseNumber: '18', image: '/images/configOptions/bar/18.jpg'},
{id: 'zephyr', name: 'Zephyr', baseNumber: '19', image: '/images/configOptions/bar/19.jpg'},

          ],
          'ball': [
           
          ],
          'universal': [
            { id: 'nexus', name: 'Nexus', baseNumber: '6', image: '/images/configOptions/universal/6.png' },
            { id: 'quantum', name: 'Quantum', baseNumber: '7', image: '/images/configOptions/universal/7.png' },
            { id: 'vertex', name: 'Vertex', baseNumber: '8', image: '/images/configOptions/universal/8.png' },
            { id: 'fusion', name: 'Fusion', baseNumber: '9', image: '/images/configOptions/universal/9.png' },
            { id: 'aurora', name: 'Aurora', baseNumber: '10', image: '/images/configOptions/universal/10.png' },
          ]
        };
        
        // Get the appropriate bases for the selected system type
        const systemTypeBases = baseOptions[configuringSystemType] || [];
        
        // Create items with images from the type-specific folder
        config.items = systemTypeBases.map(base => ({
          id: base.id,
          name: base.name,
          image: base.image,
          baseNumber: base.baseNumber // Store the base number for sending to PlayCanvas
        }));
        
        config.onItemSelect = (itemId) => {
          // Find the selected base to get its baseNumber
          const selectedBase = config.items.find(item => item.id === itemId);
          setCurrentDesign(itemId);
          
          // Pass the design name to maintain backward compatibility
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
  
  // Determine if we're in mobile view based on the className prop
  const isMobileView = className.includes('max-sm:static');
  
  return (
    <motion.div 
      className={`absolute bottom-4 left-[40%] -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-gray-800 rounded-lg z-40 max-w-[280px] w-[20%] h-[15%] shadow-lg ${className}`}
      initial={isMobileView ? { opacity: 1 } : { y: 30, opacity: 0 }}
      animate={isMobileView ? { opacity: 1 } : { y: 0, opacity: 1 }}
      exit={isMobileView ? { opacity: 0 } : { y: 30, opacity: 0 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <div className="px-3 py-4 max-sm:px-0 max-sm:py-0">
      
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
                    className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 max-sm:hidden"
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
            className={`flex gap-1 overflow-x-auto scrollbar-hide py-1 ${isMobileView ? 'px-2' : 'px-5'} max-w-full`}
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
                <div className={`${isMobileView ? 'w-16 h-16' : 'w-16 h-16'} rounded-full overflow-hidden relative ${
                  panelConfig.selectedItem === item.id ? 'ring-2 ring-emerald-500' : ''
                }`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  {panelConfig.selectedItem === item.id && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                      <FaCheck className="text-white text-[8px]" />
                    </div>
                  )}
                </div>
                <p className={`text-center ${isMobileView ? 'text-xs' : 'text-[10px]'} mt-0.5 text-gray-300 capitalize`}>{item.name}</p>
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
