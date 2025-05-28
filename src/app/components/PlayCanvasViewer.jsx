'use client';
import { useState, useEffect, useRef } from 'react';

const PlayCanvasViewer = ({ 
  config = {}, 
  isDarkMode,
  className = ''
}) => {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Listen for messages from the PlayCanvas iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Check if the message is from our iframe
      if (event.data === 'app:ready1') {
        console.log('PlayCanvas app is ready');
        setAppReady(true);
        setIsLoading(false);
        
        // Send default selections after app is ready
        sendDefaultSelections();
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Set a timeout to handle cases where the app:ready1 message might not be received
    // This is especially important for mobile browsers
    const readyTimeout = setTimeout(() => {
      if (!appReady) {
        console.log('PlayCanvas ready timeout - forcing ready state');
        setAppReady(true);
        setIsLoading(false);
        sendDefaultSelections();
      }
    }, 8000); // 8 second timeout for mobile
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(readyTimeout);
    };
  }, [appReady]);
  
  // Send default selections when app is ready
  const sendDefaultSelections = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Only send default selections if they're not provided in the config
      if (!config.lightType && !config.lightAmount && !config.lightDesign) {
        // Default selections
        iframeRef.current.contentWindow.postMessage("light_type:ceiling", "*");
        iframeRef.current.contentWindow.postMessage("light_amount:1", "*");
        iframeRef.current.contentWindow.postMessage("pendant_design:product_2", "*");
      } else {
        // Send configurations from props instead of defaults
        sendConfigToPlayCanvas(config);
      }
    }
  };
  
  // Handle iframe load event
  useEffect(() => {
    const handleIframeLoad = () => {
      try {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          console.log('PlayCanvas iframe loaded');
          
          // For desktop browsers, set quality
          if (!isMobile) {
            iframeRef.current.contentWindow.postMessage("highdis", "*");
            console.log('Set quality to high for desktop');
          }
          
          // For mobile browsers, we handle this differently with script injection
          // in the iframe onLoad event
          if (isMobile) {
            setTimeout(() => {
              if (isLoading) {
                console.log('Mobile iframe loaded - setting ready state after timeout');
                setAppReady(true);
                setIsLoading(false);
                // We don't call sendDefaultSelections() here as it's handled in the script injection
              }
            }, 5000); // 5 second timeout for mobile after iframe loads
          }
        }
      } catch (error) {
        console.error("Error during iframe load:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    const handleIframeError = () => {
      console.error("Failed to load PlayCanvas iframe");
      setHasError(true);
      setIsLoading(false);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      iframe.addEventListener('error', handleIframeError);
    }

    // Set a timeout to handle cases where the iframe might not trigger events
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.warn("PlayCanvas iframe load timeout - forcing completion");
        setIsLoading(false);
        setAppReady(true);
      }
    }, isMobile ? 8000 : 15000); // Shorter timeout for mobile

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
        iframe.removeEventListener('error', handleIframeError);
      }
      clearTimeout(timeoutId);
    };
  }, [isMobile, isLoading]);


  // Function to send configuration to PlayCanvas
  const sendConfigToPlayCanvas = (config) => {
    try {
      if (!iframeRef.current || !iframeRef.current.contentWindow || !config) return;
      
      // Only send configurations if the app is ready or we're forcing it
      // Send light type
      if (config.lightType) {
        iframeRef.current.contentWindow.postMessage(`light_type:${config.lightType}`, "*");
      }
      
      // Send light amount
      if (config.lightAmount !== undefined && config.lightAmount !== null) {
        iframeRef.current.contentWindow.postMessage(`light_amount:${config.lightAmount}`, "*");
      }
      
      // // Send cable options
      // if (config.cableColor) {
      //   iframeRef.current.contentWindow.postMessage(`cable_color:${config.cableColor}`, "*");
      // }
      
      // if (config.cableLength) {
      //   iframeRef.current.contentWindow.postMessage(`cable_length:${config.cableLength}`, "*");
      // }
      
      // Send pendant configurations if available
      if (config.pendants && Array.isArray(config.pendants)) {
        config.pendants.forEach((pendant, index) => {
          if (pendant && pendant.design) {
            iframeRef.current.contentWindow.postMessage(`pendant_${index}_design:${pendant.design}`, "*");
          }
          if (pendant && pendant.color) {
            iframeRef.current.contentWindow.postMessage(`pendant_${index}_color:${pendant.color}`, "*");
          }
        });
      }
      
      // Send global design if single pendant
      if (config.lightAmount === 1 && config.lightDesign) {
        if(config.lightDesign === 'radial'){
          config.lightDesign = 'product_2';
        }
        iframeRef.current.contentWindow.postMessage(`pendant_design:${config.lightDesign}`, "*");
      }
    } catch (error) {
      console.error("Error sending configuration to PlayCanvas:", error);
      setHasError(true);
    }
  };

  // Function to handle direct script injection for mobile devices
  const injectPlayCanvasScript = () => {
    try {
      if (!iframeRef.current || !iframeRef.current.contentWindow || !iframeRef.current.contentDocument) {
        console.error('Cannot access iframe content document');
        return;
      }
      
      const doc = iframeRef.current.contentDocument;
      
      // Create a script element to load the PlayCanvas engine
      const script = doc.createElement('script');
      script.src = 'https://code.playcanvas.com/playcanvas-stable.min.js';
      script.onload = () => {
        console.log('PlayCanvas engine loaded via script injection');
        
        // Create a script to initialize the PlayCanvas application
        const initScript = doc.createElement('script');
        initScript.textContent = `
          // Initialize PlayCanvas application
          window.addEventListener('load', function() {
            var canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            
            // Load the PlayCanvas app
            var app = new pc.Application(canvas);
            app.start();
            
            // Set up the app
            app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
            app.setCanvasResolution(pc.RESOLUTION_AUTO);
            
            // Notify parent window that app is ready
            window.parent.postMessage('app:ready1', '*');
            
            // Listen for messages from parent
            window.addEventListener('message', function(event) {
              console.log('Message received in PlayCanvas:', event.data);
              // Handle messages here
            });
          });
        `;
        doc.body.appendChild(initScript);
      };
      
      // Set up the basic HTML structure
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <title>LIMI 3D Viewer</title>
          <style>
            body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #2B2D2F; }
            canvas { width: 100%; height: 100%; }
            .loading { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white; }
          </style>
        </head>
        <body>
          <div class="loading">Loading LIMI 3D Viewer...</div>
        </body>
        </html>
      `);
      doc.close();
      
      // Add the script to the document
      doc.head.appendChild(script);
      
    } catch (error) {
      console.error('Error injecting PlayCanvas script:', error);
      setHasError(true);
      setIsLoading(false);
    }
  };
  
  return (
    <div className={`w-full h-full relative ${className}`}>
      {/* Only render iframe if not in error state */}
      {!hasError && (
        isMobile ? (
          // For mobile devices, use a blank iframe and inject scripts
          <iframe 
            id="playcanvas-app"
            ref={iframeRef}
            src="about:blank"
            className="w-full h-full border-0"
            title="LIMI Light Configurator 3D Preview"
            allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            importance="high"
            loading="eager"
            onLoad={() => {
              console.log('Blank iframe loaded for mobile, injecting scripts');
              injectPlayCanvasScript();
            }}
          />
        ) : (
          // For desktop, use the standard PlayCanvas URL
          <iframe 
            id="playcanvas-app"
            ref={iframeRef}
            src="https://playcanv.as/e/p/cW2W3Amn/"
            className="w-full h-full border-0"
            title="LIMI Light Configurator 3D Preview"
            allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            importance="high"
            loading="eager"
            onLoad={() => console.log('Iframe onLoad event fired')}
          />
        )
      )}
      
      {/* Loading state - only shown until app:ready1 message is received */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
          <div className="text-center p-4 rounded-lg bg-white dark:bg-gray-700 shadow-lg">
            <div className="w-12 h-12 border-4 border-t-emerald-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Loading 3D Preview...</p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isMobile ? 'This may take a moment on mobile devices' : 'Please wait while we prepare your experience'}
            </p>
            {isMobile && (
              <div className="mt-4 space-y-2">
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  If the 3D preview doesn't load, try these options:
                </p>
                <button 
                  onClick={() => {
                    setIsLoading(false);
                    setAppReady(true);
                    // Try to send default selections
                    if (iframeRef.current && iframeRef.current.contentWindow) {
                      try {
                        sendDefaultSelections();
                      } catch (error) {
                        console.error('Error sending selections:', error);
                      }
                    }
                  }}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors w-full"
                >
                  Continue Anyway
                </button>
                <button 
                  onClick={() => {
                    // Reload the iframe with a different approach
                    if (iframeRef.current) {
                      try {
                        const iframe = iframeRef.current;
                        const parentNode = iframe.parentNode;
                        parentNode.removeChild(iframe);
                        
                        // Create a new iframe with a direct link to the mobile version
                        const newIframe = document.createElement('iframe');
                        newIframe.id = 'playcanvas-app';
                        newIframe.src = 'https://playcanv.as/p/cW2W3Amn/'; // Use /p/ instead of /e/p/
                        newIframe.className = 'w-full h-full border-0';
                        newIframe.title = 'LIMI Light Configurator 3D Preview';
                        newIframe.allow = 'accelerometer; autoplay; camera; encrypted-media; gyroscope; picture-in-picture';
                        newIframe.allowFullScreen = true;
                        
                        parentNode.appendChild(newIframe);
                        iframeRef.current = newIframe;
                        
                        // Hide loading after a short delay
                        setTimeout(() => {
                          setIsLoading(false);
                          setAppReady(true);
                        }, 3000);
                      } catch (error) {
                        console.error('Error reloading iframe:', error);
                        setHasError(true);
                      }
                    }
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full"
                >
                  Try Alternative Version
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-700 shadow-lg max-w-md">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>3D Preview Unavailable</h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>We're unable to load the 3D preview at this time. Please try refreshing the page or check your connection.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayCanvasViewer;
