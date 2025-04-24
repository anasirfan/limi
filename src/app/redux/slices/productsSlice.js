import { createSlice } from '@reduxjs/toolkit';
import { products as initialProducts } from '../../data/products';

const initialState = {
  products: initialProducts,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Helper function to save products to localStorage
const saveProductsToLocalStorage = (products) => {
  try {
    localStorage.setItem('limiProducts', JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: `product-${Date.now()}`,
        // Use the slug from the form instead of generating it
        slug: action.payload.slug || action.payload.name.toLowerCase().replace(/\s+/g, '-'),
      };
      state.products.push(newProduct);
      saveProductsToLocalStorage(state.products);
    },
    
    updateProduct: (state, action) => {
      const { id, ...updatedFields } = action.payload;
      const index = state.products.findIndex(product => product.id === id);
      if (index !== -1) {
        state.products[index] = { 
          ...state.products[index], 
          ...updatedFields 
        };
        saveProductsToLocalStorage(state.products);
      }
    },
    
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      saveProductsToLocalStorage(state.products);
    },
    
    setProducts: (state, action) => {
      state.products = action.payload;
      saveProductsToLocalStorage(state.products);
    }
  }
});

export const { addProduct, updateProduct, deleteProduct, setProducts } = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductById = (state, productId) => 
  state.products.products.find(product => product.id === productId);
export const selectProductBySlug = (state, slug) => 
  state.products.products.find(product => product.slug === slug);
export const selectProductsByCategory = (state, category) => 
  category === 'all' 
    ? state.products.products 
    : state.products.products.filter(product => product.category === category);
export const selectFeaturedProducts = (state) => 
  state.products.products.filter(product => product.featured);
export const selectNewProducts = (state) => 
  state.products.products.filter(product => product.new);

export default productsSlice.reducer;
