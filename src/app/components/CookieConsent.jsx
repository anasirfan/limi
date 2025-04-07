'use client';
import { useState, useEffect } from 'react';
import { FaCookieBite, FaCheck, FaTimes } from 'react-icons/fa';

/**
 * Cookie consent banner component that asks for user tracking consent
 * @param {Function} onAccept - Callback function when consent is accepted
 * @param {Function} onDecline - Callback function when consent is declined
 * @returns {JSX.Element|null} The cookie consent banner or null if already decided
 */
export default function CookieConsent({ onAccept, onDecline }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consentStatus = localStorage.getItem('cookieConsent');
    
    // Only show banner if consent status is not set
    if (consentStatus === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
    if (onAccept) onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
    if (onDecline) onDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] border-t border-[#333333] p-4 md:p-6 z-50 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FaCookieBite className="text-[#93cfa2] text-2xl flex-shrink-0" />
            <p className="text-gray-300 text-sm md:text-base">
              We use cookies to enhance your experience and analyze our website traffic. 
              This helps us improve our services and provide personalized content.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center gap-2 transition-colors"
            >
              <FaTimes />
              <span>Decline</span>
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-[#54bb74] hover:bg-[#93cfa2] text-[#292929] rounded-md flex items-center gap-2 transition-colors"
            >
              <FaCheck />
              <span>Accept</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
