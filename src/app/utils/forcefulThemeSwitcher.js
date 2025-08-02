 /**
 * LIMI Forceful Theme Switcher
 * Overrides ALL color values including arbitrary Tailwind classes, CSS variables, and inline styles
 */

// Color mapping pairs for theme switching
const colorPairs = [
  { light: "#f3ebe2", dark: "#2b2d2f" }, // Soft Beige ↔ Charleston Green
  { light: "#93cfa2", dark: "#3b7f63" }, // Eton ↔ Dark Eton
  { light: "#54bb74", dark: "#2e7f53" }, // Emerald ↔ Deep Emerald
  { light: "#ffffff", dark: "#000000" }, // White ↔ Black
  { light: "#e9eaec", dark: "#1e2022" }, // Gray-100 ↔ Gray-900
  { light: "#f2f0e6", dark: "#2b2d2f" }, // Alabaster ↔ Charleston
  { light: "#50c878", dark: "#2e7f53" }, // LIMI Emerald ↔ Deep Emerald
  { light: "#87ceab", dark: "#3b7f63" }, // LIMI Eton Blue ↔ Dark Eton
  { light: "#2b2d2f", dark: "#f2f0e6" }, // Charleston Green ↔ Alabaster (reverse)
  { light: "#1f1f1f", dark: "#ffffff" }, // Dark card bg ↔ White
  { light: "#3a3d42", dark: "#e5e5e5" }, // Medium gray ↔ Light gray
];

// CSS variable mappings for root overrides
const rootVariablePairs = [
  { light: "--emerald", dark: "--emerald-dark" },
  { light: "--eton-blue", dark: "--eton-blue-dark" },
  { light: "--charleston-green", dark: "--charleston-green-light" },
  { light: "--alabaster", dark: "--charleston-green" },
  { light: "--background", dark: "--charleston-green" },
  { light: "--foreground", dark: "--alabaster" },
];

class ForcefulThemeSwitcher {
  constructor() {
    this.currentTheme = 'dark'; // Default theme
    this.originalStyles = new Map(); // Store original styles for restoration
    this.styleOverrides = null; // Dynamic style element
    this.init();
  }

  init() {
    // Create dynamic style element for overrides
    this.createStyleOverrides();
    
    // Apply initial theme
    this.applyTheme(this.currentTheme);
    
    // Listen for theme changes
    this.setupEventListeners();
  }

  createStyleOverrides() {
    // Remove existing override styles
    const existingOverride = document.getElementById('limi-theme-override');
    if (existingOverride) {
      existingOverride.remove();
    }

    // Create new style element
    this.styleOverrides = document.createElement('style');
    this.styleOverrides.id = 'limi-theme-override';
    this.styleOverrides.setAttribute('data-theme-override', 'true');
    document.head.appendChild(this.styleOverrides);
  }

  // Convert color to various formats for matching
  normalizeColor(color) {
    if (!color) return '';
    
    // Convert to lowercase and remove spaces
    color = color.toLowerCase().replace(/\s+/g, '');
    
    // Convert rgb/rgba to hex if possible
    const rgbMatch = color.match(/rgba?\((\d+),(\d+),(\d+)(?:,[\d.]+)?\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
      const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
      const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    }
    
    return color;
  }

  // Find matching color pair for conversion
  findColorPair(color, targetTheme) {
    const normalizedColor = this.normalizeColor(color);
    
    for (const pair of colorPairs) {
      const lightNorm = this.normalizeColor(pair.light);
      const darkNorm = this.normalizeColor(pair.dark);
      
      if (targetTheme === 'dark') {
        if (normalizedColor === lightNorm) {
          return pair.dark;
        }
      } else {
        if (normalizedColor === darkNorm) {
          return pair.light;
        }
      }
    }
    
    return null;
  }

  // Override CSS root variables
  overrideRootVariables(theme) {
    const root = document.documentElement;
    
    // Direct color variable overrides based on theme
    if (theme === 'dark') {
      root.style.setProperty('--background', '#2b2d2f');
      root.style.setProperty('--foreground', '#f2f0e6');
      root.style.setProperty('--accent', '#2e7f53');
      root.style.setProperty('--accent-secondary', '#3b7f63');
      root.style.setProperty('--emerald', '#2e7f53');
      root.style.setProperty('--eton-blue', '#3b7f63');
      root.style.setProperty('--charleston-green', '#2b2d2f');
      root.style.setProperty('--alabaster', '#f2f0e6');
    } else {
      root.style.setProperty('--background', '#f2f0e6');
      root.style.setProperty('--foreground', '#2b2d2f');
      root.style.setProperty('--accent', '#54bb74');
      root.style.setProperty('--accent-secondary', '#87ceab');
      root.style.setProperty('--emerald', '#50c878');
      root.style.setProperty('--eton-blue', '#87ceab');
      root.style.setProperty('--charleston-green', '#2b2d2f');
      root.style.setProperty('--alabaster', '#f2f0e6');
    }
  }

  // Generate comprehensive CSS overrides
  generateCSSOverrides(theme) {
    const overrides = [];
    
    // Override arbitrary Tailwind color classes
    colorPairs.forEach(pair => {
      const sourceColor = theme === 'dark' ? pair.light : pair.dark;
      const targetColor = theme === 'dark' ? pair.dark : pair.light;
      const sourceHex = sourceColor.replace('#', '');
      const targetHex = targetColor.replace('#', '');
      
      // Text color overrides
      overrides.push(`
        .text-\\[${sourceColor}\\] { color: ${targetColor} !important; }
        .text-\\[\\#${sourceHex}\\] { color: ${targetColor} !important; }
      `);
      
      // Background color overrides
      overrides.push(`
        .bg-\\[${sourceColor}\\] { background-color: ${targetColor} !important; }
        .bg-\\[\\#${sourceHex}\\] { background-color: ${targetColor} !important; }
      `);
      
      // Border color overrides
      overrides.push(`
        .border-\\[${sourceColor}\\] { border-color: ${targetColor} !important; }
        .border-\\[\\#${sourceHex}\\] { border-color: ${targetColor} !important; }
      `);
      
      // Hover states
      overrides.push(`
        .hover\\:text-\\[${sourceColor}\\]:hover { color: ${targetColor} !important; }
        .hover\\:bg-\\[${sourceColor}\\]:hover { background-color: ${targetColor} !important; }
        .hover\\:border-\\[${sourceColor}\\]:hover { border-color: ${targetColor} !important; }
      `);
      
      // Focus states
      overrides.push(`
        .focus\\:text-\\[${sourceColor}\\]:focus { color: ${targetColor} !important; }
        .focus\\:bg-\\[${sourceColor}\\]:focus { background-color: ${targetColor} !important; }
        .focus\\:border-\\[${sourceColor}\\]:focus { border-color: ${targetColor} !important; }
      `);
    });

    // Global theming for all major elements, but exclude elements with no color classes
    if (theme === 'dark') {
      overrides.push(`
        /* Base theme */
        body, html {
          background-color: #2b2d2f !important;
          color: #f2f0e6 !important;
        }
        
        /* Global element theming - COMMENTED OUT FOR PROTOTYPING */
        /*
        h1:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]), 
        h2:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]), 
        h3:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]), 
        h4:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]), 
        h5:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]), 
        h6:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]) {
          color: #f2f0e6 !important;
        }
        
        p:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]) {
          color: #e9eaec !important;
        }
        
        button:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]) {
          background-color: #2e7f53 !important;
          color: #ffffff !important;
          border-color: #2e7f53 !important;
        }
        
        button:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]):hover {
          background-color: #3b7f63 !important;
        }
        
        a:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]) {
          color: #54bb74 !important;
        }
        
        a:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]):hover {
          color: #7ad69a !important;
        }
        */
        
        /* Elements with color-related classes get themed */
        [class*="text-"], [class*="bg-"], [class*="border-"] {
          /* These will be handled by the arbitrary color overrides above */
        }
        
        /* Cards and containers with color classes */
        .card, .container[class*="bg-"], .section[class*="bg-"], .box[class*="bg-"] {
          background-color: #1e2022 !important;
          border-color: #3a3d42 !important;
          color: #f2f0e6 !important;
        }
        
        /* Input fields with classes */
        input[class], textarea[class], select[class] {
          background-color: #1e2022 !important;
          color: #f2f0e6 !important;
          border-color: #3a3d42 !important;
        }
        
        input[class]:focus, textarea[class]:focus, select[class]:focus {
          border-color: #2e7f53 !important;
        }
      `);
    } else {
      overrides.push(`
        /* Base theme */
        body, html {
          background-color: #f2f0e6 !important;
          color: #2b2d2f !important;
        }
        
        /* Global element theming - COMMENTED OUT FOR PROTOTYPING */
        /*
        h1:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]), 
        h2:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]), 
        h3:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]), 
        h4:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]), 
        h5:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]), 
        h6:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]) {
          color: #2b2d2f !important;
        }
        
        p:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]) {
          color: #3a3d42 !important;
        }
        
        button:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]) {
          background-color: #54bb74 !important;
          color: #ffffff !important;
          border-color: #54bb74 !important;
        }
        
        button:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]):hover {
          background-color: #50c878 !important;
        }
        
        a:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]) {
          color: #2e7f53 !important;
        }
        
        a:not([class=""]):not([class*="flex"]):not([class*="grid"]):not([class*="container"]):not([class*="wrapper"]):hover {
          color: #54bb74 !important;
        }
        */
        
        /* Elements with color-related classes get themed */
        [class*="text-"], [class*="bg-"], [class*="border-"] {
          /* These will be handled by the arbitrary color overrides above */
        }
        
        /* Cards and containers with color classes */
        .card, .container[class*="bg-"], .section[class*="bg-"], .box[class*="bg-"] {
          background-color: #ffffff !important;
          border-color: #e5e5e5 !important;
          color: #2b2d2f !important;
        }
        
        /* Input fields with classes */
        input[class], textarea[class], select[class] {
          background-color: #ffffff !important;
          color: #2b2d2f !important;
          border-color: #e5e5e5 !important;
        }
        
        input[class]:focus, textarea[class]:focus, select[class]:focus {
          border-color: #54bb74 !important;
        }
      `);
    }

    return overrides.join('\n');
  }

  // Apply theme with all overrides
  applyTheme(theme) {
    this.currentTheme = theme;
    
    // Update root variables
    this.overrideRootVariables(theme);
    
    // Generate and apply CSS overrides
    const cssOverrides = this.generateCSSOverrides(theme);
    this.styleOverrides.textContent = cssOverrides;
    
    // Update body class for additional styling hooks
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
    
    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme, colors: this.getThemeColors(theme) } 
    }));
    
    console.log(`🎨 LIMI Theme switched to: ${theme}`);
  }

  // Get theme colors for external use
  getThemeColors(theme) {
    if (theme === 'dark') {
      return {
        background: '#2b2d2f',
        text: '#f2f0e6',
        primary: '#2e7f53',
        secondary: '#3b7f63',
        accent: '#54bb74',
        cardBg: '#1e2022',
        cardBorder: '#3a3d42'
      };
    } else {
      return {
        background: '#f2f0e6',
        text: '#2b2d2f',
        primary: '#54bb74',
        secondary: '#87ceab',
        accent: '#50c878',
        cardBg: '#ffffff',
        cardBorder: '#e5e5e5'
      };
    }
  }

  // Toggle between themes
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    
    // Store preference
    localStorage.setItem('limi-theme', newTheme);
  }

  // Setup event listeners
  setupEventListeners() {
    // Listen for storage changes (cross-tab sync)
    window.addEventListener('storage', (e) => {
      if (e.key === 'limi-theme' && e.newValue !== this.currentTheme) {
        this.applyTheme(e.newValue);
      }
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('limi-theme');
    if (savedTheme && savedTheme !== this.currentTheme) {
      this.applyTheme(savedTheme);
    }
  }

  // Get current theme
  getCurrentTheme() {
    return this.currentTheme;
  }

  // Destroy the theme switcher
  destroy() {
    if (this.styleOverrides) {
      this.styleOverrides.remove();
    }
    
    // Reset root variables to defaults
    const root = document.documentElement;
    root.style.removeProperty('--background');
    root.style.removeProperty('--foreground');
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-secondary');
    
    // Remove body class
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
  }
}

// Global instance
let themeSwitcher = null;

// Initialize theme switcher
export function initThemeSwitcher() {
  if (typeof window !== 'undefined' && !themeSwitcher) {
    themeSwitcher = new ForcefulThemeSwitcher();
  }
  return themeSwitcher;
}

// Export functions for external use
export function toggleTheme() {
  if (themeSwitcher) {
    themeSwitcher.toggleTheme();
  }
}

export function getCurrentTheme() {
  return themeSwitcher ? themeSwitcher.getCurrentTheme() : 'dark';
}

export function getThemeColors() {
  return themeSwitcher ? themeSwitcher.getThemeColors(themeSwitcher.getCurrentTheme()) : null;
}

// Auto-initialize on import (client-side only)
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
  } else {
    initThemeSwitcher();
  }
}

export default ForcefulThemeSwitcher;
