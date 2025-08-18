import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    // Prefer persisted redux state, fallback to system, fallback to dark
    const persisted = window.localStorage.getItem('limi-theme-redux');
    if (persisted === 'light' || persisted === 'dark') return persisted;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  }
  return 'dark';
};

const initialState = {
  mode: getInitialTheme(), // 'light' | 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('limi-theme-redux', action.payload);
      }
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('limi-theme-redux', state.mode);
      }
    }
  }
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;
export default themeSlice.reducer;
