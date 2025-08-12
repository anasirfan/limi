import { useState, useRef } from 'react';
import { pendantAssignments, barAssignments, universalAssignments } from "../pendantSystemData";

export const usePendantSelection = (
  pendants,
  selectedPendants,
  setSelectedPendants,
  onPendantDesignChange,
  setShowConfigurationTypeSelector,
  setOpenBase
) => {
  const [currentDesign, setCurrentDesign] = useState('radial');
  const carouselRef = useRef(null);

  // Helper function to map pendant design names to their image path
  const getPendantDesignImageNumber = (designName) => {
    const assignment = pendantAssignments.find(a => a.design === designName);
    return assignment ? assignment.image : "";
  };

  // Helper function to map system design names/types to their image path
  const getDesignImageNumber = (designName, systemType) => {
    if (!designName || typeof designName !== "string") return "";
    if (systemType === "bar") {
      const assignment = barAssignments.find(a => a.design === designName);
      return assignment ? assignment.image : "";
    }
    if (systemType === "universal") {
      const assignment = universalAssignments.find(a => a.design === designName);
      return assignment ? assignment.image : "";
    }
    // Fallback to pendant if not bar/universal
    const assignment = pendantAssignments.find(a => a.design === designName);
    return assignment ? assignment.image : "";
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
    getDesignImageNumber,
    getPendantDesignImageNumber
  };
};