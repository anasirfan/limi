"use client";
import React, { createContext, useState, useContext } from 'react';
import ProductModal from '../productShowcase/ProductModal';

// Create context
const ModalContext = createContext();

// Provider component
export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    product: null
  });

  // Open modal with product data
  const openModal = (product) => {
    setModalState({
      isOpen: true,
      product
    });
  };

  // Close modal
  const closeModal = () => {
    setModalState({
      isOpen: false,
      product: null
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      
      {/* Render modal at the root level */}
      {modalState.isOpen && (
        <ProductModal 
          product={modalState.product} 
          isOpen={modalState.isOpen}
          onClose={closeModal} 
        />
      )}
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
