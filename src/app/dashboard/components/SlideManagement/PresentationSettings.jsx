import React from 'react';
import { FaUserPlus } from 'react-icons/fa';

/**
 * PresentationSettings component for managing presentation title and subtitle
 * @param {Object} presentationSettings - The current presentation settings
 * @param {Function} setPresentationSettings - Function to update presentation settings
 * @param {Object} customer - The selected customer object
 * @param {Function} setShowAddCustomerModal - Function to show the add customer modal
 */
const PresentationSettings = ({ presentationSettings, setPresentationSettings, customer, setShowAddCustomerModal }) => {
  return (
    <div className="bg-[#292929] p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Presentation Settings</h3>
       
      </div>
      
      {customer ? (
        <div className="bg-[#1e1e1e] p-3 rounded-md mb-4">
          <h4 className="text-[#93cfa2] font-medium mb-2">Customer Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-400">Company:</span> 
              <span className="text-white ml-1">{customer.clientCompanyInfo}</span>
            </div>
            <div>
              <span className="text-gray-400">Profile ID:</span> 
              <span className="text-white ml-1 font-mono">{customer.profileId}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#1e1e1e] p-3 rounded-md mb-4 text-center">
          <p className="text-gray-400 italic">No customer selected</p>
        </div>
      )}
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
              
              // Save to localStorage immediately with customer-specific key
              setTimeout(() => {
                const customerKey = `presentationSettings_${customer?.profileId || 'default'}`;
                localStorage.setItem(customerKey, JSON.stringify({
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
              
              // Save to localStorage immediately with customer-specific key
              setTimeout(() => {
                const customerKey = `presentationSettings_${customer?.profileId || 'default'}`;
                localStorage.setItem(customerKey, JSON.stringify({
                  ...presentationSettings,
                  subtitle: e.target.value
                }));
                window.dispatchEvent(new Event('slidesUpdated'));
              }, 100);
            }}
            className="w-full bg-[#1e1e1e] text-white p-2 rounded-md"
            placeholder="Interactive presentation for {customerName}"
          />
          <p className="text-xs text-gray-400 mt-1">Use {customer ? customer.clientCompanyInfo : 'customerName'} to insert the customer's name</p>
        </div>
      </div>
    </div>
  );
};

export default PresentationSettings;
