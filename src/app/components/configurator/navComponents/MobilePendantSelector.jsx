"use client";
import React, { useState, useRef } from "react";
import { FaArrowLeft, FaCheck, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export const MobilePendantSelector = ({
  pendants,
  selectedPendant,
  onPendantSelect,
  onClose,
  isOpen,
  cables,
  selectedPendants,
  togglePendantSelection,
  selectAllPendants,
  clearSelections,
  getImageSrc
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const carouselRef = useRef(null);

  if (!isOpen) return null;

  // Scroll carousel function
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  // Group pendants by category
  const categories = pendants.reduce((acc, pendant) => {
    const category = pendant.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(pendant);
    return acc;
  }, {});

  const categoryNames = Object.keys(categories);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep(2);
  };

  const handlePendantSelect = (pendant) => {
    onPendantSelect(pendant);
    setCurrentStep(3);
    // Auto-close after selection
    setTimeout(() => {
      onClose();
      setCurrentStep(1);
      setSelectedCategory(null);
    }, 1500);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedCategory(null);
    } else if (currentStep === 1) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed bg-black bg-opacity-50 z-[9999]"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed bottom-0 bg-[#1a1a1a] z-[10000] flex flex-col max-h-[80vh] rounded-t-2xl border-t border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <button
          onClick={handleBack}
          className="flex items-center text-white hover:text-[#50C878] transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          {currentStep === 1 ? "Close" : "Back"}
        </button>
        
        <div className="text-white font-medium">
          {currentStep === 1 && "Select Category"}
          {currentStep === 2 && selectedCategory}
          {currentStep === 3 && "Selected!"}
        </div>
        
        <div className="flex space-x-1">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full ${
                step <= currentStep ? "bg-[#50C878]" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
        {currentStep === 1 && (
          <div className="space-y-3 w-full max-w-md">
            <h2 className="text-xl font-semibold text-black mb-6 text-center">
              Choose a Category
            </h2>
            {categoryNames.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all duration-200 flex items-center justify-between group"
              >
                <div className="text-left">
                  <div className="text-white font-medium">{category}</div>
                  <div className="text-gray-400 text-sm">
                    {categories[category].length} pendant{categories[category].length !== 1 ? 's' : ''}
                  </div>
                </div>
                <FaChevronRight className="text-gray-400 group-hover:text-[#50C878] transition-colors" />
              </button>
            ))}
          </div>
        )}

        {currentStep === 2 && selectedCategory && (
          <div className="space-y-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-6 text-center">
              Configure Pendants
            </h2>

            {/* Pendant selection controls */}
            <div className="flex justify-between mb-4">
              {selectedPendants && selectedPendants.length > 0 && (
                <>
                  <button
                    onClick={selectAllPendants}
                    className="px-4 py-2 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    Select All
                  </button>

                  <button
                    onClick={clearSelections}
                    className="px-4 py-2 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    Clear ({selectedPendants.length})
                  </button>
                </>
              )}
            </div>

            {/* Pendant selector carousel */}
            <div className="relative mb-6">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaChevronLeft size={16} />
                </button>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={() => scrollCarousel("right")}
                  className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <FaChevronRight size={16} />
                </button>
              </div>

              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-12 max-w-full"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {cables && cables.length > 0
                  ? cables.map((cable, index) => (
                      <motion.div
                        key={index}
                        className="flex-shrink-0 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => togglePendantSelection(index)}
                        style={{ userSelect: "none" }}
                      >
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold transition-all overflow-hidden relative ${
                            selectedPendants && selectedPendants.includes(index)
                              ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-gray-800"
                              : "bg-gray-700 text-white hover:bg-gray-600"
                          }`}
                        >
                          {cable.design && (
                            <div className="absolute inset-0 opacity-30">
                              <Image
                                src={
                                  getImageSrc(cable.design) ||
                                  `/images/configOptions/2.png`
                                }
                                alt={cable.design}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <span className="relative z-10">{index + 1}</span>
                        </div>
                      </motion.div>
                    ))
                  : pendants.map((pendant, index) => (
                      <motion.div
                        key={index}
                        className="flex-shrink-0 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => togglePendantSelection(index)}
                        style={{ userSelect: "none" }}
                      >
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold transition-all overflow-hidden relative ${
                            selectedPendants && selectedPendants.includes(index)
                              ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-gray-800"
                              : "bg-gray-700 text-white hover:bg-gray-600"
                          }`}
                        >
                          {pendant.image && (
                            <div className="absolute inset-0 opacity-30">
                              <Image
                                src={pendant.image}
                                alt={pendant.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <span className="relative z-10">{index + 1}</span>
                        </div>
                      </motion.div>
                    ))}
              </div>
            </div>

            {/* Individual pendant selection list */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-white mb-4">
                Individual Selection
              </h3>
              {categories[selectedCategory].map((pendant) => (
                <button
                  key={pendant.id}
                  onClick={() => handlePendantSelect(pendant)}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 flex items-center space-x-4 ${
                    selectedPendant?.id === pendant.id
                      ? "bg-[#50C878]/20 border-[#50C878] text-white"
                      : "bg-gray-800 hover:bg-gray-700 border-gray-600 text-white"
                  }`}
                >
                  {pendant.image && (
                    <img
                      src={pendant.image}
                      alt={pendant.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-medium">{pendant.name}</div>
                    {pendant.description && (
                      <div className="text-gray-400 text-sm mt-1">
                        {pendant.description}
                      </div>
                    )}
                  </div>
                  {selectedPendant?.id === pendant.id && (
                    <FaCheck className="text-[#50C878]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-[#50C878] rounded-full flex items-center justify-center mb-6">
              <FaCheck className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Perfect Choice!
            </h2>
            <p className="text-gray-400 mb-4">
              {selectedPendant?.name} has been selected
            </p>
            <div className="text-sm text-gray-500">
              Returning to configurator...
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};
