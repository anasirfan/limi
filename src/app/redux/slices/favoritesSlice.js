import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const product = action.payload;
      const exists = state.items.some(item => item.id === product.id);
    
      if (!exists) {
        state.items.push({
          id: product.id,
          name: product.name,
          image: product.image,
          type: product.type,
          message: product.message,
        });
      }   
      
      // Save to localStorage
      localStorage.setItem('limiFavorites', JSON.stringify(state));
    },
    
    removeFromFavorites: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      // Update localStorage
      localStorage.setItem('limiFavorites', JSON.stringify(state));
    },
    
    clearFavorites: (state) => {
      state.items = [];
      
      // Update localStorage
      localStorage.removeItem('limiFavorites');
    },
    
    loadFavorites: (state, action) => {
      const savedFavorites = action.payload;
      if (savedFavorites) {
        state.items = savedFavorites.items;
      }
    }
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites, loadFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
