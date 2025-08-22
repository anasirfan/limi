'use client';

import { forwardRef, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const InteractiveIframe = forwardRef(({ currentStage, onReady }, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const configSentRef = useRef(false);

  const sendMessageToPlayCanvas = (message) => {
    if (ref.current && ref.current.contentWindow) {
      ref.current.contentWindow.postMessage(message, '*');
      console.log('Sent message:', message);
    }
  };

  // Expose the function to parent component
  useEffect(() => {
    if (ref.current) {
      ref.current.sendMessageToPlayCanvas = sendMessageToPlayCanvas;
    }
  }, []);

  useEffect(() => {
    
    // Listen for messages from iframe
    const handleMessage = (event) => {
      if (event.data === 'app:ready1' && !configSentRef.current) {
        configSentRef.current = true;
        setIsLoading(false);
        onReady();
        
        // Send configuration messages once after receiving app:ready1
        const messages = [
          'light_type:ceiling',
          'light_amount:3',
          'base_type:round',
          'system:bar',
          'cable_0:system_base_2',
          'system:bar',
          'cable_1:system_base_2',
          'system:bar',
          'cable_2:system_base_2'
        ];
        messages.forEach((message, index) => {
          setTimeout(() => {
            sendMessageToPlayCanvas(message);
          }, index * 100);
        });
      }
    };

    window.addEventListener('message', handleMessage);

    // Fallback timer in case iframe doesn't send ready message
    const timer = setTimeout(() => {
      setIsLoading(false);
      onReady();
    }, 5000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timer);
    };
  }, [onReady, ref]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0f0f23] to-[#1a1a2e] rounded-lg overflow-hidden">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0f0f23] z-10">
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-[#54bb74]/30 border-t-[#54bb74] rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="text-white/70 text-sm">Loading 3D Experience...</div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0f0f23] z-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">⚠</span>
            </div>
            <div className="text-white/70 text-sm">3D Viewer Unavailable</div>
            <div className="text-white/50 text-xs mt-2">Placeholder mode active</div>
          </div>
        </div>
      )}


      {/* Stage Indicator */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md rounded-lg px-4 py-2">
        <div className="text-white/70 text-sm">
          Stage: <span className="text-[#54bb74] font-semibold capitalize">{currentStage}</span>
        </div>
      </div>

      {/* 3D Assembly Viewer */}
      <iframe
        ref={ref}
        src="https://playcanv.as/e/p/7c2273a2/"
        className="w-full h-full border-0"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        title="3D Assembly Viewer"
      />
    </div>
  );
});

InteractiveIframe.displayName = 'InteractiveIframe';

export default InteractiveIframe;
