import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = 'https://dev.api1.limitless-lighting.co.uk/admin/products/light-configs/wishlist';

const getToken = () => localStorage.getItem('limiToken');

// Thunk for fetching wishlist from API
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, thunkAPI) => {
    const token = getToken();
    const res = await fetch(API_BASE, {
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
export const updateFavorites = createAsyncThunk(
  'favorites/updateFavorites',
  async (favoritesArray, thunkAPI) => {
    const token = getToken();
    const res = await fetch(API_BASE, {
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
        state.items = action.payload;
        localStorage.setItem('limiFavorites', JSON.stringify(state));
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const removeFromFavoritesAndSync = (id) => (dispatch, getState) => {
  dispatch(favoritesSlice.actions.removeFromFavorites(id));
  const { items } = getState().favorites;
  dispatch(updateFavorites(items));
};



export const { addToFavorites, removeFromFavorites, clearFavorites, loadFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;