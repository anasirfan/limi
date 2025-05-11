// Theme utility functions

/**
 * Gets the background color based on the selected theme
 * @param {string} theme - The theme name
 * @returns {string} - The hex color code for the theme
 */
export const getThemeBackgroundColor = (theme) => {
  switch (theme) {
    case 'charleston':
      return '#2B2D2F';
    case 'emerald':
      return '#50C878';
    case 'eton':
      return '#87CEAB';
    case 'beige':
      return '#F2F0E6';
    default:
      return '#2B2D2F';
  }
};

/**
 * Gets the theme styles for a given theme
 * @param {string} theme - The theme name
 * @returns {Object} - The theme style object
 */
export const getThemeStyles = (theme) => {
  const themeStyles = {
    charleston: {
      bg: '#2B2D2F',
      text: '#FFFFFF',
      accent: '#50C878',
      secondaryAccent: '#93cfa2',
      gradient: 'linear-gradient(135deg, #2B2D2F 0%, #3a3c3e 100%)',
      buttonGradient: 'linear-gradient(to right, #50C878, #93cfa2)',
      shadow: '0 4px 12px rgba(80, 200, 120, 0.2)',
      borderRadius: '0.5rem',
      headingStyle: 'font-bold tracking-tight',
      bulletStyle: 'rounded-full bg-[#50C878]',
      textShadow: 'none',
      cardStyle: 'border-l-4 border-[#50C878]',
      animation: 'fade-in-up',
    },
    emerald: {
      bg: '#50C878',
      text: '#2B2D2F',
      accent: '#FFFFFF',
      secondaryAccent: '#e6e6e6',
      gradient: 'linear-gradient(135deg, #50C878 0%, #93cfa2 100%)',
      buttonGradient: 'linear-gradient(to right, #2B2D2F, #3a3c3e)',
      shadow: '0 4px 12px rgba(43, 45, 47, 0.2)',
      borderRadius: '1rem',
      headingStyle: 'font-bold italic',
      bulletStyle: 'rounded-full bg-white',
      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
      cardStyle: 'border-b-4 border-white',
      animation: 'slide-in-right',
    },
    eton: {
      bg: '#87CEAB',
      text: '#2B2D2F',
      accent: '#FFFFFF',
      secondaryAccent: '#e6e6e6',
      gradient: 'linear-gradient(135deg, #87CEAB 0%, #a9dbc4 100%)',
      buttonGradient: 'linear-gradient(to right, #2B2D2F, #3a3c3e)',
      shadow: '0 4px 12px rgba(135, 206, 171, 0.3)',
      borderRadius: '0.75rem',
      headingStyle: 'font-medium tracking-wide',
      bulletStyle: 'rounded-sm bg-white',
      textShadow: 'none',
      cardStyle: 'border-r-4 border-white',
      animation: 'fade-in-left',
    },
    beige: {
      bg: '#F2F0E6',
      text: '#2B2D2F',
      accent: '#50C878',
      secondaryAccent: '#93cfa2',
      gradient: 'linear-gradient(135deg, #F2F0E6 0%, #e6e4da 100%)',
      buttonGradient: 'linear-gradient(to right, #50C878, #93cfa2)',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      borderRadius: '0.25rem',
      headingStyle: 'font-bold tracking-normal',
      bulletStyle: 'rounded-full bg-[#50C878]',
      textShadow: 'none',
      cardStyle: 'border-t-4 border-[#50C878]',
      animation: 'slide-in-up',
    },
  };
  
  return themeStyles[theme] || themeStyles.charleston;
};
