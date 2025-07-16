'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCart } from './slices/cartSlice';
import { loadFavorites } from './slices/favoritesSlice';
import { setProducts } from './slices/productsSlice';

export default function StoreInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('limiCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch(loadCart(parsedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('limiFavorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        dispatch(loadFavorites(parsedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
      }
    }

    // Load products from localStorage
    
    const savedProducts = localStorage.getItem('limiProducts');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        dispatch(setProducts(parsedProducts));
      } catch (error) {
        console.error('Error parsing products from localStorage:', error);
      }
    }
  }, [dispatch]);
  
  // This component doesn't render anything
  return null;
}
