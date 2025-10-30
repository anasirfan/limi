import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildApi1Url, API_CONFIG } from '../../config/api.config';

const API_BASE = buildApi1Url(API_CONFIG.ENDPOINTS.PRODUCTS_WISHLIST);

const getToken = () => localStorage.getItem('limiToken');

// Thunk for fetching wishlist from API
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, thunkAPI) => {
    const token = getToken();
    const res = await fetch(buildApi1Url(API_CONFIG.ENDPOINTS.PRODUCTS_WISHLIST), {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to fetch favorites');
    const data = await res.json();
    // API returns { wishlist: [...] }
    // Return as array of { id }
    return (data.wishlist || []).map(id => ({ id }));
  }
);

// Thunk to sync favorites with systemAssignments
import { getSystemAssignments } from '../../components/configurator/pendantSystemData';

export const syncFavoritesWithSystemAssignments = createAsyncThunk(
  'favorites/syncFavoritesWithSystemAssignments',
  async (favorites, thunkAPI) => {
    // Get systemAssignments (array of objects with .design)
    let systemAssignments = [];
    try {
      systemAssignments = await getSystemAssignments();
    } catch (err) {
      // fallback: don't filter if systemAssignments fails
      return favorites;
    }
    const validDesigns = new Set(systemAssignments.map(a => a.design));
    const filtered = favorites.filter(item => validDesigns.has(item.id));
    // If any were filtered out, update the backend
    if (filtered.length !== favorites.length) {
      const token = getToken();
      await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wishlist: filtered.map(item => item.id) }),
      });
    }
    return filtered ;


  }
);

export const updateFavorites = createAsyncThunk(
  'favorites/updateFavorites',
  async (favoritesArray, thunkAPI) => {
    const token = getToken();
    const res = await fetch(buildApi1Url(API_CONFIG.ENDPOINTS.PRODUCTS_WISHLIST), {
      method: 'POST', // Change to PATCH/PUT if your API expects it
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wishlist: favoritesArray.map(item => item.id) }),
    });
    if (!res.ok) throw new Error('Failed to update favorites');
    return favoritesArray;
  }
);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        // Instead of setting items directly, trigger syncFavoritesWithSystemAssignments
        // (handled in a thunk, not here)
        state.items = action.payload; // temp, will be filtered by syncFavoritesWithSystemAssignments
        localStorage.setItem('limiFavorites', JSON.stringify(state));
      })
      .addCase(syncFavoritesWithSystemAssignments.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem('limiFavorites', JSON.stringify(state));
      })
      .addCase(removeFromFavoritesAndSync.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem('limiFavorites', JSON.stringify(state));
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const removeFromFavoritesAndSync = createAsyncThunk(
  'favorites/removeFromFavoritesAndSync',
  async (id, thunkAPI) => {
    thunkAPI.dispatch(favoritesSlice.actions.removeFromFavorites(id));
    const { items } = thunkAPI.getState().favorites;
    await thunkAPI.dispatch(updateFavorites(items));
    return items;
  }
);



export const { addToFavorites, removeFromFavorites, clearFavorites, loadFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;