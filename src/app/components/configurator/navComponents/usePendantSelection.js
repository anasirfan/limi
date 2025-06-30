import { useState, useRef } from 'react';

export const usePendantSelection = (pendants, selectedPendants, setSelectedPendants, onPendantDesignChange) => {
  const [currentDesign, setCurrentDesign] = useState('radial');
  const carouselRef = useRef(null);
  
  // Helper function to map design names to their corresponding image numbers
  const getDesignImageNumber = (designName) => {
    console.log("designName",designName);
    const designMap = {
      'bumble': '1.png',
      'radial': '2.png',
      'fina': '3.png',
      'ico': '4.png',
      'piko': '5.png',
      // Add any other design mappings here
    };
    
    return designMap[designName] || `${designName}.jpg`; // Fallback to the design name if not found
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
