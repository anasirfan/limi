import React from 'react';

/**
 * PresentationSettings component for managing presentation title and subtitle
 */
const PresentationSettings = ({ presentationSettings, setPresentationSettings }) => {
  return (
    <div className="bg-[#292929] p-4 rounded-lg mb-6">
      <h3 className="text-xl font-bold text-white mb-4">Presentation Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 mb-2">Presentation Title</label>
          <input
            type="text"
            value={presentationSettings.title}
            onChange={(e) => {
              setPresentationSettings({
                ...presentationSettings,
                title: e.target.value
              });
              
              // Save to localStorage immediately
              setTimeout(() => {
                localStorage.setItem('presentationSettings', JSON.stringify({
                  ...presentationSettings,
                  title: e.target.value
                }));
                window.dispatchEvent(new Event('slidesUpdated'));
              }, 100);
            }}
            className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
            placeholder="Presentation"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Presentation Subtitle</label>
          <input
            type="text"
            value={presentationSettings.subtitle}
            onChange={(e) => {
              setPresentationSettings({
                ...presentationSettings,
                subtitle: e.target.value
              });
              
              // Save to localStorage immediately
              setTimeout(() => {
                localStorage.setItem('presentationSettings', JSON.stringify({
                  ...presentationSettings,
                  subtitle: e.target.value
                }));
                window.dispatchEvent(new Event('slidesUpdated'));
              }, 100);
            }}
            className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
            placeholder="Interactive presentation for {customerName}"
          />
          <p className="text-xs text-gray-400 mt-1">Use customerName to insert the customer's name</p>
        </div>
      </div>
    </div>
  );
};

export default PresentationSettings;
