import React from 'react';

/**
 * Header component for the Slide Management interface
 * Contains the title and action buttons
 */
const Header = ({ togglePreviewMode, previewMode, saveSlides }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-[#93cfa2]">Slide Management</h2>
      <div className="flex space-x-4">
        <button
          onClick={saveSlides}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          Save Changes
        </button>
        <button
          onClick={togglePreviewMode}
          className={`px-4 py-2 rounded-md transition-colors ${
            previewMode 
              ? 'bg-[#54bb74] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {previewMode ? 'Exit Preview' : 'Preview Slides'}
        </button>
      </div>
    </div>
  );
};

export default Header;
