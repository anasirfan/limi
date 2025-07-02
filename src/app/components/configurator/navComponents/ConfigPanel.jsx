import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaCheck, FaTimes } from 'react-icons/fa';
import { Breadcrumb } from './Breadcrumb';
import BaseColorPanel from './BaseColorPanel';
import { FaArrow } from 'react-icons/fa';

export const ConfigPanel = ({
  configuringType,
  configuringSystemType,
  breadcrumbPath,
  onBreadcrumbNavigation,
  onSystemTypeSelection,
  selectedLocation,
  selectedPendants,
  cables, // Add cables prop
  onPendantDesignChange,
  onSystemBaseDesignChange,
  onBaseColorChange,
  onSelectConfigurationType,
  onShadeSelect,
  currentShade,
  onCableSizeChange, // NEW PROP
  onClose,
  className = '' // Add className prop with default empty string
}) => {
  // Clear shade state when entering pendant mode (defensive, avoids render loop)
  // Only runs when configuringType changes
  useEffect(() => {
    if (configuringType === 'pendant') {
      setShowShades(false);
      setAvailableShades([]);
      setLocalSelectedShade(null);
    }
  }, [configuringType]);

  const [currentDesign, setCurrentDesign] = useState(null);
  // Internal state for selected cable size (for immediate UI feedback)
  const [localSelectedCableSize, setLocalSelectedCableSize] = useState(1);

  // Sync localSelectedCableSize with props when relevant data changes
  useEffect(() => {
    if (configuringType === 'cableSize') {
      let selectedCableSize = 1;
      if (selectedPendants && selectedPendants.length > 0 && cables && cables.length > 0) {
        const idx = selectedPendants[0];
        if (typeof idx === 'number' && cables[idx] && cables[idx].size) {
          selectedCableSize = cables[idx].size;
        }
      } else if (typeof selectedLocation === 'number' && cables && cables[selectedLocation] && cables[selectedLocation].size) {
        selectedCableSize = cables[selectedLocation].size;
      }
      setLocalSelectedCableSize(selectedCableSize);
    }
  }, [configuringType, selectedPendants, selectedLocation, cables]);

  
  // Track navigation state for breadcrumb
  const [navState, setNavState] = useState({
    level: configuringType ? (configuringSystemType ? 2 : 1) : 0,
    path: [],
    ids: {}
  });

  const [currentConfig, SetcurrentConfig] = useState(null);
  
  // State for shade selection
  const [showShades, setShowShades] = useState(false);
  const [availableShades, setAvailableShades] = useState([]);
  const [localSelectedShade, setLocalSelectedShade] = useState(currentShade);
  
  // Shade selection handler
  const handleShadeSelect = (shade, shadeIndex) => {
    setLocalSelectedShade(shade.id);
    const baseOptions = {
      'bar': [
        { id: 'prism', name: 'Prism', baseNumber: '1', image: '/images/configOptions/bar/1.png' },
        { id: 'helix', name: 'Helix', baseNumber: '2', image: '/images/configOptions/bar/2.png' },
        { id: 'orbit', name: 'Orbit', baseNumber: '3', image: '/images/configOptions/bar/3.png' },
        { id: 'zenith', name: 'Zenith', baseNumber: '4', image: '/images/configOptions/bar/4.jpg' },
        { id: 'pulse', name: 'Pulse', baseNumber: '5', image: '/images/configOptions/bar/5.jpg' },
        { id: 'vortex', name: 'Vortex', baseNumber: '6', image: '/images/configOptions/bar/6.jpg' },
        { id: 'nexus', name: 'Nexus', baseNumber: '7', image: '/images/configOptions/bar/7.jpg' },
        { id: 'quasar', name: 'Quasar', baseNumber: '8', image: '/images/configOptions/bar/8.jpg' },
        { id: 'nova', name: 'Nova', baseNumber: '9', image: '/images/configOptions/bar/9.jpg' }
      ],
      'universal': [
        { id: 'atom', name: 'Atom', baseNumber: '1'  , image: '/images/configOptions/universal/1.png' },
        { id: 'nebula', name: 'Nebula', baseNumber: '2' , image: '/images/configOptions/universal/2.png' },
        { id: 'cosmos', name: 'Cosmos', baseNumber: '3' , image: '/images/configOptions/universal/3.png' },
        { id: 'stellar', name: 'Stellar', baseNumber: '4' , image: '/images/configOptions/universal/4.png' },
        { id: 'eclipse', name: 'Eclipse', baseNumber: '5' , image: '/images/configOptions/universal/5.png' },
        { id: 'aurora', name: 'Aurora', baseNumber: '6' , image: '/images/configOptions/universal/6.png' },
        { id: 'solstice', name: 'Solstice', baseNumber: '7',image: '/images/configOptions/universal/7.png' },
        { id: 'quantum', name: 'Quantum', baseNumber: '8',image: '/images/configOptions/universal/8.png' },
        { id: 'vertex', name: 'Vertex', baseNumber: '9',image: '/images/configOptions/universal/9.png' },
        { id: 'horizon', name: 'Horizon', baseNumber: '10',image: '/images/configOptions/universal/10.png' },
        { id: 'zenith', name: 'Zenith', baseNumber: '11',image: '/images/configOptions/universal/11.png' },
        { id: 'equinox', name: 'Equinox', baseNumber: '12',image: '/images/configOptions/universal/12.png' },
        { id: 'meridian', name: 'Meridian', baseNumber: '13',image: '/images/configOptions/universal/13.png' },
        { id: 'polaris', name: 'Polaris', baseNumber: '14',image: '/images/configOptions/universal/14.png' },
 
      ]
    };
    // Always use the canonical design id from baseOptions
    let designId = currentDesign;
    if (configuringSystemType && currentDesign) {
      const baseList = baseOptions[configuringSystemType] || [];
      const selectedBase = baseList.find(base => base.id === currentDesign);
      if (selectedBase) {
        designId = selectedBase.baseNumber; // or selectedBase.baseNumber if PlayCanvas expects a number
      }
    }
    if (typeof onShadeSelect === 'function') {
      onShadeSelect(designId, shade.id, configuringSystemType, shadeIndex);
    }
  };

  // Update local shade state when currentShade prop changes
  useEffect(() => {
    setLocalSelectedShade(currentShade);
  }, [currentShade]);
  
  // Update navigation state when configuringType or configuringSystemType changes
  useEffect(() => {
    updateNavigationState();
  }, [configuringType, configuringSystemType]);
  
  // Debug log for tracking props and state
  useEffect(() => {
    console.log('ConfigPanel props/state:', { 
      configuringType, 
      configuringSystemType,
      currentDesign,
      currentShade,
      localSelectedShade
    });
  }, [configuringType, configuringSystemType, currentDesign, currentShade, localSelectedShade]);
  
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
  // Separate ref for shade carousel
  const shadeCarouselRef = useRef(null);
  
  const getCurrentConfig = () => {
    const config = getPanelConfig();
    SetcurrentConfig(config);
  };
  
  // Carousel scroll functionality for main design slider
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Carousel scroll functionality for shade slider (separate)
  const scrollShadeCarousel = (direction) => {
    if (shadeCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      shadeCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Check if the selected design has multiple shades
  const checkForMultipleShades = (designId, systemType) => {
    // Map of designs to their available shades
    const shadeOptions = {
      // Universal system shades
      'universal': {
        'atom': [
          { id: 'shallowdome', name: 'Shallow Dome', color: '#2B2D2F' },
          { id: 'deepdome', name: 'Deep Dome', color: '#50C878' },
          { id: 'flatplate', name: 'Flat Plate', color: '#87CEAB' }
        ],
        'nebula': [
          { id: 'cone', name: 'Cone', color: '#2B2D2F' },
          { id: 'cylinder', name: 'Cylinder', color: '#50C878' }
        ],
        'cosmos': [
          { id: 'sphere', name: 'Sphere', color: '#2B2D2F' },
          { id: 'hemisphere', name: 'Hemisphere', color: '#50C878' },
          { id: 'disc', name: 'Disc', color: '#87CEAB' },
          { id: 'ring', name: 'Ring', color: '#F2F0E6' }
        ],
        'stellar': [
          { id: 'pyramid', name: 'Pyramid', color: '#2B2D2F' },
          { id: 'cube', name: 'Cube', color: '#50C878' },
          { id: 'prism', name: 'Prism', color: '#87CEAB' }
        ],
        'eclipse': [
          { id: 'oval', name: 'Oval', color: '#2B2D2F' },
          { id: 'rectangle', name: 'Rectangle', color: '#50C878' }
        ]
      },
      // Bar system shades
      'bar': {
        'prism': [
          { id: 'standard', name: 'Standard', color: '#2B2D2F' },
          { id: 'extended', name: 'Extended', color: '#50C878' }
        ],
        'helix': [
          { id: 'single', name: 'Single', color: '#2B2D2F' },
          { id: 'double', name: 'Double', color: '#50C878' },
          { id: 'triple', name: 'Triple', color: '#87CEAB' }
        ]
      }
    };
    
    // Check if this design has shade options
    if (systemType && shadeOptions[systemType] && shadeOptions[systemType][designId]) {

      return shadeOptions[systemType][designId];
    }
    
    return null; // No shades available
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
        { id: 'system', name: 'System', image: '/images/configOptions/system.png' },
        { id: 'cableSize', name: 'Cable Size', image: '/images/configOptions/cable_size.png' }
      ];
      config.onItemSelect = onSelectConfigurationType;
      config.selectedItem = null;
      config.useIcon = true;
      config.showCloseButton = true;
      config.showLocationLabel = true;
    }
    // Cable Size selection panel
    else if (configuringType === 'cableSize') {
      config.title = "Cable Size";
      config.showBreadcrumb = true;
      // Use localSelectedCableSize for immediate UI feedback
      config.items = [1, 2, 3, 4, 5, 6].map(size => ({
        id: size,
        name: `${size} mm`,
        image: `/images/configOptions/cable_size_${size}.png`
      }));
      config.onItemSelect = (size) => {
        setLocalSelectedCableSize(size); // Update UI immediately
        let cablesToUpdate = [];
        if (selectedPendants && selectedPendants.length > 0) {
          cablesToUpdate = selectedPendants.filter(idx => typeof idx === 'number');
        } else if (typeof selectedLocation === 'number') {
          cablesToUpdate = [selectedLocation];
        }
       
        if (onCableSizeChange && cablesToUpdate.length > 0) onCableSizeChange(size, cablesToUpdate);
      };
      config.selectedItem = localSelectedCableSize;
      config.breadcrumbItems = [
        { id: 'home', name: 'icon-home' },
        { id: 'cableSize', name: 'Cable Size' }
      ];
    }
    // Pendant Design Selection
    else if (configuringType === 'pendant') {
      config.title = "Pendant Design";
      config.showBreadcrumb = true;
      config.items = [
        { id: 'bumble', name: 'Bumble', image: '/images/configOptions/1.png' },
        { id: 'radial', name: 'Radial', image: '/images/configOptions/2.png' },
        { id: 'fina', name: 'Fina', image: '/images/configOptions/3.png' },
        { id: 'ico', name: 'Ico', image: '/images/configOptions/4.png' },
        { id: 'piko', name: 'Piko', image: '/images/configOptions/5.png' },
      ];
      config.onItemSelect = (itemId) => {
        setCurrentDesign(itemId);
        // Use all selected pendants if available, otherwise fall back to just the first one
        const pendantsToUpdate = selectedPendants && selectedPendants.length > 0 ? selectedPendants : [selectedLocation];
        onPendantDesignChange(pendantsToUpdate, itemId);
        // Always hide and clear shade panel for pendants
        setShowShades(false);
        setAvailableShades([]);
        setLocalSelectedShade(null);
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
        config.title = `${configuringSystemType.charAt(0).toUpperCase() + configuringSystemType.slice(1)} System`;
        config.showBreadcrumb = true;
        
        // Map of base IDs to names and image numbers based on available files
        const baseOptions = {
          'bar': [
            { id: 'prism', name: 'Prism', baseNumber: '1', image: '/images/configOptions/bar/1.png' },
            { id: 'helix', name: 'Helix', baseNumber: '2', image: '/images/configOptions/bar/2.png' },
            { id: 'orbit', name: 'Orbit', baseNumber: '3', image: '/images/configOptions/bar/3.png' },
            { id: 'zenith', name: 'Zenith', baseNumber: '4', image: '/images/configOptions/bar/4.jpg' },
            { id: 'pulse', name: 'Pulse', baseNumber: '5', image: '/images/configOptions/bar/5.jpg' },
            { id: 'vortex', name: 'Vortex', baseNumber: '6', image: '/images/configOptions/bar/6.jpg' },
            { id: 'nexus', name: 'Nexus', baseNumber: '7', image: '/images/configOptions/bar/7.jpg' },
            { id: 'quasar', name: 'Quasar', baseNumber: '8', image: '/images/configOptions/bar/8.jpg' },
            { id: 'nova', name: 'Nova', baseNumber: '9', image: '/images/configOptions/bar/9.jpg' }
          ],
          'universal': [
            { id: 'atom', name: 'Atom', baseNumber: '1'  , image: '/images/configOptions/universal/1.png' },
            { id: 'nebula', name: 'Nebula', baseNumber: '2' , image: '/images/configOptions/universal/2.png' },
            { id: 'cosmos', name: 'Cosmos', baseNumber: '3' , image: '/images/configOptions/universal/3.png' },
            { id: 'stellar', name: 'Stellar', baseNumber: '4' , image: '/images/configOptions/universal/4.png' },
            { id: 'eclipse', name: 'Eclipse', baseNumber: '5' , image: '/images/configOptions/universal/5.png' },
            { id: 'aurora', name: 'Aurora', baseNumber: '6' , image: '/images/configOptions/universal/6.png' },
            { id: 'solstice', name: 'Solstice', baseNumber: '7',image: '/images/configOptions/universal/7.png' },
            { id: 'quantum', name: 'Quantum', baseNumber: '8',image: '/images/configOptions/universal/8.png' },
            { id: 'vertex', name: 'Vertex', baseNumber: '9',image: '/images/configOptions/universal/9.png' },
            { id: 'horizon', name: 'Horizon', baseNumber: '10',image: '/images/configOptions/universal/10.png' },
            { id: 'zenith', name: 'Zenith', baseNumber: '11',image: '/images/configOptions/universal/11.png' },
            { id: 'equinox', name: 'Equinox', baseNumber: '12',image: '/images/configOptions/universal/12.png' },
            { id: 'meridian', name: 'Meridian', baseNumber: '13',image: '/images/configOptions/universal/13.png' },
            { id: 'polaris', name: 'Polaris', baseNumber: '14',image: '/images/configOptions/universal/14.png' },
     
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
          setCurrentDesign(itemId);
          // Find the selected base to get its baseNumber
          const selectedBase = config.items.find(item => item.id === itemId);
          
          // Check if this design has multiple shades
          const shades = checkForMultipleShades(itemId, configuringSystemType);
          if (shades && shades.length > 0) {
            setAvailableShades(shades);
            setShowShades(true);
            setLocalSelectedShade(shades[0].id);
            if (typeof onShadeSelect === 'function') {
              onShadeSelect(itemId, shades[0].id, configuringSystemType, 0);
            }
          } else {
            setAvailableShades([]);
            setShowShades(false);
            setLocalSelectedShade(null);
          }
          
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
    <div className="flex justify-center items-center w-full">
      <motion.div 
        className={`fixed h-[150px] sm:absolute bottom-0 sm:bottom-1 -translate-x-1/2 bg-black/95 backdrop-blur-sm border border-gray-700 rounded-t-lg sm:rounded-lg z-40 w-full sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] xl:max-w-[540px] sm:w-[80vw] md:w-[55vw] lg:w-[40vw] xl:w-[24vw] max-h-[60vh] sm:max-h-[30vh] shadow-lg overflow-hidden ${className}`}
        initial={isMobileView ? { y: '100%', opacity: 0 } : { y: 30, opacity: 0 }}
        animate={isMobileView ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        exit={isMobileView ? { y: '100%', opacity: 0 } : { y: 30, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
      <div className="px-2 sm:px-2 pt-2">
      
          {/* Responsive header */}
          <div className="flex items-center justify-between mb-2">
            {panelConfig.showBreadcrumb ? (
              <>
                <div className="flex items-center w-full">
                  <div className="flex-1 min-w-0">
                    <Breadcrumb path={panelConfig.breadcrumbItems} onNavigate={handleBreadcrumbNavigation} />
                  </div>
                  <h3 className="ml-4 text-xs sm:text-sm font-medium text-white font-['Amenti'] truncate text-right">
                    {panelConfig.title}
                  </h3>
                  {panelConfig.showCloseButton && (
                    <button 
                      onClick={onClose}
                      className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 ml-2"
                      aria-label="Close panel"
                    >
                      <FaTimes size={10} className="text-gray-300" />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex-1">
                  <h3 className="text-xs sm:text-sm font-medium text-white font-['Amenti'] truncate">
                    {panelConfig.showLocationLabel ? `Configure Cable${selectedPendants && selectedPendants.length > 1 ? 's' : ''} ${formatSelectedLocations(selectedPendants || selectedLocation)}` : panelConfig.title}
                  </h3>
                </div>
                {panelConfig.showCloseButton && (
                  <button 
                    onClick={onClose}
                    className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 ml-2"
                    aria-label="Close panel"
                  >
                    <FaTimes size={10} className="text-gray-300" />
                  </button>
                )}
              </>
            )}
          </div>
 

        
        
        {/* Items carousel or cable size segmented control */}
        {configuringType === 'cableSize' ? (
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-semibold text-gray-400 mb-1">Length</label>
            <div className="flex w-full bg-[#2B2D2F] rounded-full p-1 justify-between">
              {[1, 2, 3, 4, 5, 6].map(size => (
                <button
                  key={size}
                  onClick={() => panelConfig.onItemSelect(size)}
                  className={`flex-1 py-2 rounded-full font-semibold transition text-sm
                    ${panelConfig.selectedItem === size
                      ? 'bg-[#50C878] text-[#F6F6F6] shadow' // charleston green bg, light text
                      : 'bg-transparent text-[#50C878] hover:bg-[#E3F9EF]'} // charleston green text, emerald-tinted hover
                  `}
                  style={{ margin: '0 2px' }}
                >
                  {size}mm
                </button>
              ))}
            </div>
          </div>
        ) : (
        <div className="relative w-full">
          {panelConfig.items.length > (isMobileView ? 2 : 3) && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => scrollCarousel('left')}
                className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors shadow"
                aria-label="Scroll left"
              >
                <FaChevronLeft size={12} />
              </button>
            </div>
          )}
          <div
            ref={carouselRef}
            className={`flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-2 px-1 sm:px-5 max-w-full`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {panelConfig.items.map((item) => (
              <motion.div
                key={item.id}
                className="flex flex-col items-center flex-shrink-0 px-1 sm:px-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => panelConfig.onItemSelect(item.id)}
              >
                <div className={`relative ${isMobileView ? 'w-14 h-14' : 'w-16 h-16'} rounded-full overflow-hidden ${panelConfig.selectedItem === item.id ? 'ring-2 ring-emerald-500' : 'ring-1 ring-gray-600'}`}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={isMobileView ? 56 : 64}
                      height={isMobileView ? 56 : 64}
                      className="object-cover w-full h-full"
                      priority
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: '#2C3539', color: 'white' }}
                    >
                      <p className="text-base sm:text-lg font-bold">{item.baseNumber}</p>
                    </div>
                  )}
                  {panelConfig.selectedItem === item.id && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                      <FaCheck className="text-white text-xs" />
                    </div>
                  )}
                </div>
                <p className={`text-center text-xs sm:text-[13px] mt-1.5 text-gray-200 font-medium capitalize`}>
                  {item.name}
                </p>
              </motion.div>
            ))}
          </div>
          {panelConfig.items.length > (isMobileView ? 2 : 3) && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => scrollCarousel('right')}
                className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors shadow"
                aria-label="Scroll right"
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          )}
        </div>
      )}
      </div>
      </motion.div>
      
   
      
      {/* Shade selection panel */}
      {configuringType === 'system' && showShades && (
        <motion.div
          className="sm:absolute sm:bottom-[15%] absolute w-[300px] bg-black/95 backdrop-blur-md border border-gray-700/50 rounded-t-2xl sm:rounded-xl z-50 shadow-2xl pointer-events-auto transition-all duration-300"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="">
            <div className="flex items-center justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowShades(false);
                }}
                className="p-1.5 rounded-full hover:bg-gray-700/80 text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                aria-label="Close shade selector"
              >
                <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            {/* Shades carousel */}
            <div className="relative flex items-center justify-between gap-2">
              <button
                className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/80 hover:bg-emerald-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollShadeCarousel('left');
                }}
                aria-label="Previous shade"
              >
                <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              
              <div 
                className="flex-1 overflow-x-auto scrollbar-hide px-4 sm:px-0"
                ref={shadeCarouselRef}
              >
                <div className="flex gap-3 sm:gap-2 w-max mx-auto py-2">
                  {availableShades.map((shade, index) => (
                    <div key={shade.id} className="flex flex-col items-center flex-shrink-0">
                      <button
                        type="button"
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden relative focus:outline-none transition-transform duration-200 hover:scale-105 active:scale-95 ${localSelectedShade === shade.id ? 'ring-3 ring-emerald-400 shadow-lg' : 'ring-1 ring-gray-600 hover:ring-2 hover:ring-emerald-400/50'}`}
                        onClick={() => handleShadeSelect(shade, index)}
                        aria-label={`Select shade ${shade.name}`}
                      >
                        <div
                          className="w-full h-full flex items-center justify-center transition-all duration-200 hover:brightness-110"
                          style={{ 
                            backgroundColor: shade.color || '#2C3539',
                            color: 'rgba(255, 255, 255, 0.9)'
                          }}
                        >
                          <p className="text-base sm:text-lg font-bold drop-shadow-md">{index + 1}</p>
                        </div>
                        {localSelectedShade === shade.id && (
                          <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                            <FaCheck className="text-white text-xs sm:text-sm" />
                          </div>
                        )}
                      </button>
                      <p className="text-center text-xs sm:text-sm font-medium mt-2 text-gray-300 capitalize tracking-wide">
                        {shade.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/80 hover:bg-emerald-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollShadeCarousel('right');
                }}
                aria-label="Next shade"
              >
                <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
