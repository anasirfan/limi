import React from 'react';
import { FaTimes, FaGlobe, FaBriefcase, FaEnvelope, FaPhone, FaUser, FaBuilding, FaMapMarkerAlt, FaComment } from 'react-icons/fa';

const DetailRow = ({ icon: Icon, label, value, isLink = false }) => (
  <div className="flex items-start py-2">
    <div className="text-[#54bb74] mr-3 mt-0.5">
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
      {isLink ? (
        <a 
          href={value.startsWith('http') ? value : `https://${value}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#54bb74] hover:underline text-sm font-medium block mt-0.5"
        >
          {value}
        </a>
      ) : (
        <p className="text-white text-sm font-medium mt-0.5">{value || 'N/A'}</p>
      )}
    </div>
  </div>
);

export default function DistributorDetailsModal({ distributor, onClose }) {
  if (!distributor) return null;

  return (
    <div className="fixed inset-0 mt-14 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-[#1e1e1e] rounded-xl shadow-2xl w-full max-w-4xl" 
        style={{ maxHeight: '95vh' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center">
                <FaBuilding className="text-[#54bb74] mr-2" />
                Distributor Application
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                Submitted on {distributor.createdAt ? new Date(distributor.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 -mt-2 -mr-2"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content - Grid Layout */}
          <div className="space-y-4 mt-4">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#232323] rounded-xl p-4">
                <h4 className="text-base font-semibold text-white mb-3 flex items-center">
                  <FaUser className="text-[#54bb74] mr-2" />
                  Contact Info
                </h4>
                <div className="space-y-2">
                  <DetailRow 
                    icon={FaUser} 
                    label="Contact Person" 
                    value={distributor.name || distributor.contactName} 
                  />
                  {distributor.title && (
                    <DetailRow 
                      icon={FaBriefcase} 
                      label="Job Title" 
                      value={distributor.title} 
                    />
                  )}
                  <DetailRow 
                    icon={FaEnvelope} 
                    label="Email" 
                    value={distributor.email} 
                  />
                  {distributor.phoneNumber && (
                    <DetailRow 
                      icon={FaPhone} 
                      label="Phone" 
                      value={distributor.phoneNumber} 
                    />
                  )}
                </div>
              </div>
              {/* Company Section */}
              <div className="bg-[#232323] rounded-xl p-4">
                <h4 className="text-base font-semibold text-white mb-3 flex items-center">
                  <FaBuilding className="text-[#54bb74] mr-2" />
                  Company Info
                </h4>
                <div className="space-y-2">
                  <DetailRow 
                    icon={FaBuilding} 
                    label="Company Name" 
                    value={distributor.company} 
                  />
                  {distributor.website && (
                    <DetailRow 
                      icon={FaGlobe} 
                      label="Website" 
                      value={distributor.website}
                      isLink
                    />
                  )}
                </div>
                 <div className="space-y-2">
                  <DetailRow 
                    icon={FaMapMarkerAlt} 
                    label="Location" 
                    value={distributor.country} 
                  />
                  <DetailRow 
                    icon={FaBriefcase} 
                    label="Experience" 
                    value={distributor.experience} 
                  />
                </div>
              </div>

            </div>

            {/* Message - Full width */}
            {distributor.message && (
              <div className="bg-[#232323] rounded-xl p-4">
                <h4 className="text-base font-semibold text-white mb-3 flex items-center">
                  <FaComment className="text-[#54bb74] mr-2" />
                  Message
                </h4>
                <div className="bg-[#2a2a2a] p-3 rounded-lg max-h-40 overflow-y-auto">
                  <p className="text-gray-200 text-sm whitespace-pre-line">
                    {distributor.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
