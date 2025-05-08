import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import favoritesReducer from './slices/favoritesSlice';
import productsReducer from './slices/productsSlice';
import slidesReducer from './slices/slidesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    products: productsReducer,
    slides: slidesReducer,
  },
  // Add middleware or other store configuration here if needed
});

export default store;
