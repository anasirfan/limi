import { useState, useRef } from 'react';

export const usePendantSelection = (pendants, selectedPendants, setSelectedPendants, onPendantDesignChange) => {
  const [currentDesign, setCurrentDesign] = useState('radial');
  const carouselRef = useRef(null);
  
  // Helper function to map design names to their corresponding image numbers
  const getPendantDesignImageNumber = (designName) => {
      const designMap = {
        'bumble': '1.png',
        'radial': '2.png',
        'fina': '3.png',
        'ico': '4.png',
        'piko': '5.png',
      }
      return designMap[designName];
  }
  const getDesignImageNumber = (designName, SystemType) => {
    const designMap = {
      'pendant': {
        'bumble': '1.png',
        'radial': '2.png',
        'fina': '3.png',
        'ico': '4.png',
        'piko': '5.png',
      },
      'bar': {
        'prism': '1.png',
        'helix': '2.png',
        'orbit': '3.png',
        'zenith': '4.png',
        'pulse': '5.png',
        'vortex': '6.png',
        'nexus': '7.png',
        'quasar': '8.png',
        'nova': '9.png'
      },
      'universal': {
        'atom': '1.png',
        'nebula': '2.png',
        'cosmos': '3.png',
        'stellar': '4.png',
        'eclipse': '5.png',
        'aurora': '6.png',
        'solstice': '7.png',
        'quantum': '8.png',
        'vertex': '9.png',
        'horizon': '10.png',
        'zenith': '11.png',
        'equinox': '12.png',
        'meridian': '13.png',
        'polaris': '14.png',
      }
    };
  
    // If SystemType is a system type and the design exists in its map
    if (SystemType && designMap[SystemType] && designMap[SystemType][designName.toLowerCase()]) {
      return `${SystemType}/${designMap[SystemType][designName.toLowerCase()]}`;
    }
    // Otherwise, treat as pendant (or fallback)
    if (designMap['pendant'][designName.toLowerCase()]) {
      return designMap['pendant'][designName.toLowerCase()];
    }
    // Fallback
    return `${designName}.jpg`;
  };
  
  // Toggle pendant selection
  const togglePendantSelection = (pendantId) => {
    if (selectedPendants.includes(pendantId)) {
      setSelectedPendants(selectedPendants.filter(id => id !== pendantId));
    } else {
      setSelectedPendants([...selectedPendants, pendantId]);
    }
  };
  
  // Select all pendants
  const selectAllPendants = () => {
    const allPendants = pendants.map((_, index) => index);
    setSelectedPendants(allPendants);
  };
  
  // Clear selections
  const clearSelections = () => {
    setSelectedPendants([]);
  };
  
  // Apply design to selected pendants
  const applyDesignToSelected = (design) => {
    if (selectedPendants.length === 0) return;
    onPendantDesignChange(selectedPendants, design);
  };

  // Apply design to all pendants
  const applyToAllPendants = (design) => {
    if (selectedPendants.length === 0) return;
    onPendantDesignChange(pendants.map((_, index) => index), design);
  };
  
  // Carousel scroll functionality
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return {
    currentDesign,
    setCurrentDesign,
    carouselRef,
    scrollCarousel,
    togglePendantSelection,
    selectAllPendants,
    clearSelections,
    applyDesignToSelected,
    applyToAllPendants,
    getDesignImageNumber
  };
};
