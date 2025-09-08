import { useState, useRef } from 'react';
import { systemAssignments } from "../pendantSystemData";

export const usePendantSelection = (
  pendants,
  cables,
  selectedPendants,
  setSelectedPendants,
  onPendantDesignChange,
  setShowConfigurationTypeSelector,
  setOpenBase
) => {
  const [currentDesign, setCurrentDesign] = useState('radial');
  const carouselRef = useRef(null);

  

  // Helper function to map system design names/types to their image path
  const getImageSrc = (designName) => {
    console.log("designNameee", designName);
    if (!designName || typeof designName !== "string") return "";

    // Search systemAssignments for a matching design and return its image
    const assignment = systemAssignments.find(a => a.design === designName);
    return assignment && assignment.media && assignment.media.image && assignment.media.image.url ? assignment.media.image.url : "";
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
    const allPendants = cables.map((_, index) => index);
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
    getImageSrc,
  };
};