import React from 'react';

/**
 * AppearanceSettings component for managing theme and appearance settings
 */
const AppearanceSettings = ({ formState, setFormState, editingSlide, dispatch, getThemeBackgroundColor }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-white mb-3">Appearance</h3>
      
      {/* Theme Selection */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Theme</label>
        <select
          value={formState.appearance.theme}
          onChange={(e) => {
            const newTheme = e.target.value;
            // Get background color based on theme
            const newBgColor = getThemeBackgroundColor(newTheme);
            
            // Update local form state immediately for UI feedback
            setFormState({
              ...formState,
              appearance: {
                ...formState.appearance,
                theme: newTheme,
                backgroundColor: newBgColor
              }
            });
            
            // Update Redux state
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'appearance.theme',
                value: newTheme
              }
            });
            
            // Also update the background color field
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'appearance.backgroundColor',
                value: newBgColor
              }
            });
          }}
          className="w-full bg-[#1e1e1e] text-white p-2 rounded-md transition-all duration-300 hover:border-[#54bb74] focus:border-[#54bb74] focus:ring-1 focus:ring-[#54bb74]"
        >
          <option value="charleston">Charleston (Dark)</option>
          <option value="emerald">Emerald (Green)</option>
          <option value="eton">Eton (Light Green)</option>
          <option value="beige">Beige (Neutral)</option>
          <option value="alabaster">Alabaster (Light)</option>
          <option value="custom">Custom</option>
        </select>
        <p className="text-xs text-gray-400 mt-1">
          Themes apply preset colors and styles. Alabaster theme is recommended for product showcases.
        </p>
      </div>
      
      {/* Background Color */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Background Color</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={formState.appearance.backgroundColor || ''}
            onChange={(e) => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                appearance: {
                  ...formState.appearance,
                  backgroundColor: e.target.value
                }
              });
              
              // Update Redux state
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'appearance.backgroundColor',
                  value: e.target.value
                }
              });
            }}
            className="flex-grow bg-[#1e1e1e] text-white p-2 rounded-md"
            placeholder="#RRGGBB or rgba(r,g,b,a)"
          />
          <input 
            type="color"
            value={formState.appearance.backgroundColor || getThemeBackgroundColor(formState.appearance.theme)}
            onChange={(e) => {
              // Update local form state immediately for UI feedback
              setFormState({
                ...formState,
                appearance: {
                  ...formState.appearance,
                  backgroundColor: e.target.value
                }
              });
              
              // Update Redux state
              dispatch({
                type: 'slides/updateSlide',
                payload: {
                  id: editingSlide.id,
                  field: 'appearance.backgroundColor',
                  value: e.target.value
                }
              });
            }}
            className="w-10 h-10 rounded cursor-pointer"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          LIMI brand colors: Charleston Green (#292929), Eton Green (#54BB74), Alabaster (#f3ebe2)
        </p>
      </div>
      
      {/* Overlay Settings */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="overlayDarken"
          checked={formState.appearance.overlayDarken}
          onChange={(e) => {
            // Update local form state immediately for UI feedback
            setFormState({
              ...formState,
              appearance: {
                ...formState.appearance,
                overlayDarken: e.target.checked
              }
            });
            
            // Update Redux state
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'appearance.overlayDarken',
                value: e.target.checked
              }
            });
          }}
          className="mr-2"
        />
        <label htmlFor="overlayDarken" className="text-gray-300">Darken Overlay</label>
      </div>
      
      {/* Animation Settings */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Animation Style</label>
        <select
          value={formState.appearance.animation || 'fade-in'}
          onChange={(e) => {
            // Update local form state immediately for UI feedback
            setFormState({
              ...formState,
              appearance: {
                ...formState.appearance,
                animation: e.target.value
              }
            });
            
            // Update Redux state
            dispatch({
              type: 'slides/updateSlide',
              payload: {
                id: editingSlide.id,
                field: 'appearance.animation',
                value: e.target.value
              }
            });
          }}
          className="w-full bg-[#1e1e1e] text-white p-2 rounded-md transition-all duration-300 hover:border-[#54bb74] focus:border-[#54bb74] focus:ring-1 focus:ring-[#54bb74]"
        >
          <option value="fade-in">Fade In</option>
          <option value="slide-up">Slide Up</option>
          <option value="slide-in-right">Slide In Right</option>
          <option value="zoom-in">Zoom In</option>
          <option value="none">No Animation</option>
        </select>
        <p className="text-xs text-gray-400 mt-1">
          Animations enhance visual impact and user engagement
        </p>
      </div>
    </div>
  );
};

export default AppearanceSettings;
