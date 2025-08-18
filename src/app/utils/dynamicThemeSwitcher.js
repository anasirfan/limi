// dynamicThemeSwitcher.js
// Applies day (6am-5:59pm) or night (6pm-5:59am) palette for each brand color as CSS variables
// Usage: import and call initDynamicThemeSwitcher() in your app entry point

const DAY_PALETTE = {
  '--color-emerald': '#50C878',
  '--color-eton-blue': '#87CEAB',
  '--color-charleston-green': '#2B2D2F',  // Charleston Green for text on light theme
  '--color-alabaster': '#F2F0E6',         // Alabaster for background on light theme
};
const NIGHT_PALETTE = {
  '--color-emerald': '#2e7f53',
  '--color-eton-blue': '#3b7f63',
  '--color-charleston-green': '#2B2D2F',  // Charleston Green for background on dark theme
  '--color-alabaster': '#F2F0E6',         // Alabaster for text on dark theme
};

function setDayNightTheme(hour = null) {
  const now = new Date();
  const currentHour = hour !== null ? hour : now.getHours(); // 0-23
  const isDay = currentHour >= 6 && currentHour < 18; // 6am to 5:59pm
  const palette = isDay ? DAY_PALETTE : NIGHT_PALETTE;
  Object.entries(palette).forEach(([cssVar, value]) => {
    document.documentElement.style.setProperty(cssVar, value);
  });
}

function initDynamicThemeSwitcher() {
  setDayNightTheme();
  // Set up timer to update at 6am/6pm
  const now = new Date();
  const currentHour = now.getHours();
  let nextSwitchHour = currentHour < 6 ? 6 : (currentHour < 18 ? 18 : 30); // 6 or 18 or next day's 6
  if (nextSwitchHour === 30) nextSwitchHour = 6 + 24; // 6am next day
  const nextSwitch = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nextSwitchHour, 0, 0, 0);
  const msToNextSwitch = nextSwitch - now;
  setTimeout(() => {
    setDayNightTheme();
    setInterval(() => setDayNightTheme(), 12 * 60 * 60 * 1000); // Every 12 hours
  }, msToNextSwitch);
}

export { setDayNightTheme, initDynamicThemeSwitcher };
