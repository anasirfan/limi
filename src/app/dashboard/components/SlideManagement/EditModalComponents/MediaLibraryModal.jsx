import React, { useState, useEffect } from 'react';
import { FaFolder, FaFolderOpen, FaArrowLeft, FaImage, FaVideo, FaSearch } from 'react-icons/fa';

// List of common video file extensions
const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.wmv', '.mkv', '.m4v'];
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff', '.ico'];

/**
 * MediaLibraryModal component for browsing and selecting media from public folders
 */
const MediaLibraryModal = ({ isOpen, onClose, onSelect, mediaType = 'all' }) => {
  const [activeTab, setActiveTab] = useState(mediaType === 'videos' ? 'videos' : 'images');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to fetch media items from the server
  const fetchMediaItems = async (path) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Construct the API endpoint to fetch directory contents
      const baseDir = activeTab === 'images' ? '/images' : '/videos';
      const fullPath = path ? `${baseDir}/${path}` : baseDir;
      
      // In a real implementation, this would be an API call to the server
      // For now, we'll simulate the response based on the expected structure
      const simulateDirectoryContents = (dirPath) => {
        // This is a simulation - in a real app, this would come from an API
        const basePath = dirPath.startsWith('/') ? dirPath : `/${dirPath}`;
        
        // Define folders and files based on the path using actual files from the public folder
        if (basePath === '/images') {
          return [
            { type: 'folder', name: 'slides', path: 'slides' },
            { type: 'folder', name: 'products', path: 'products' },
            { type: 'folder', name: 'howitworks', path: 'howitworks' },
            { type: 'folder', name: 'svgLogos', path: 'svgLogos' },
            { type: 'folder', name: 'carouselImages', path: 'carouselImages' },
            { type: 'folder', name: 'RGB', path: 'RGB' },
            { type: 'folder', name: 'brightness', path: 'brightness' },
            { type: 'folder', name: 'business-cards', path: 'business-cards' },
            { type: 'folder', name: 'businessCard', path: 'businessCard' },
            { type: 'folder', name: 'configIcons', path: 'configIcons' },
            { type: 'folder', name: 'configImages', path: 'configImages' },
            { type: 'folder', name: 'configOptions', path: 'configOptions' },
            { type: 'folder', name: 'designs', path: 'designs' },
            { type: 'folder', name: 'homepage-products', path: 'homepage-products' },
            { type: 'folder', name: 'icons', path: 'icons' },
            { type: 'folder', name: 'mobile-app', path: 'mobile-app' },
            { type: 'folder', name: 'presets', path: 'presets' },
            { type: 'folder', name: 'rooms', path: 'rooms' },
            { type: 'folder', name: 'timeline', path: 'timeline' },
            { type: 'file', name: 'base_1-1.jpeg', path: 'base_1-1.jpeg' },
            { type: 'file', name: 'base_1.png', path: 'base_1.png' },
            { type: 'file', name: 'hub-new.png', path: 'hub-new.png' },
            { type: 'file', name: 'hub-new1.jpg', path: 'hub-new1.jpg' },
            { type: 'file', name: 'innovations.png', path: 'innovations.png' },
            { type: 'file', name: 'light.png', path: 'light.png' },
            { type: 'file', name: 'light1.webp', path: 'light1.webp' },
            { type: 'file', name: 'limi-app.png', path: 'limi-app.png' },
            { type: 'file', name: 'limi-connect.jpg', path: 'limi-connect.jpg' },
            { type: 'file', name: 'limi-dashboard.jpg', path: 'limi-dashboard.jpg' },
            { type: 'file', name: 'limi-light.png', path: 'limi-light.png' },
            { type: 'file', name: 'product-banner.jpg', path: 'product-banner.jpg' },
            { type: 'file', name: 'product_launch.png', path: 'product_launch.png' },
          ];
        } else if (basePath === '/images/slides') {
          return [
            { type: 'file', name: '1.png', path: 'slides/1.png' },
            { type: 'file', name: '2.png', path: 'slides/2.png' },
            { type: 'file', name: '3.png', path: 'slides/3.png' },
            { type: 'file', name: '4.png', path: 'slides/4.png' },
            { type: 'file', name: '5.png', path: 'slides/5.png' },
          ];
        } else if (basePath === '/images/howitworks') {
          return [
            { type: 'folder', name: 'connect', path: 'howitworks/connect' },
            { type: 'folder', name: 'install', path: 'howitworks/install' },
            { type: 'folder', name: 'personalize', path: 'howitworks/personalize' },
          ];
        } else if (basePath === '/images/howitworks/connect') {
          return [
            { type: 'file', name: 'connect.m4v', path: 'howitworks/connect/connect.m4v' },
            { type: 'file', name: 'guided.jpg', path: 'howitworks/connect/guided.jpg' },
            { type: 'file', name: 'qrcode.jpg', path: 'howitworks/connect/qrcode.jpg' },
            { type: 'file', name: 'smart.jpg', path: 'howitworks/connect/smart.jpg' },
          ];
        } else if (basePath === '/images/howitworks/install') {
          return [
            { type: 'file', name: 'install.mp4', path: 'howitworks/install/install.mp4' },
            { type: 'file', name: 'notools.jpg', path: 'howitworks/install/notools.jpg' },
            { type: 'file', name: 'twist.jpg', path: 'howitworks/install/twist.jpg' },
            { type: 'file', name: 'universal.png', path: 'howitworks/install/universal.png' },
          ];
        } else if (basePath === '/images/howitworks/personalize') {
          return [
            { type: 'file', name: 'adaptive.jpg', path: 'howitworks/personalize/adaptive.jpg' },
            { type: 'file', name: 'custom.jpg', path: 'howitworks/personalize/custom.jpg' },
            { type: 'file', name: 'intuitive.jpg', path: 'howitworks/personalize/intuitive.jpg' },
            { type: 'file', name: 'personalize.m4v', path: 'howitworks/personalize/personalize.m4v' },
          ];
        } else if (basePath === '/images/products') {
          return [
            { type: 'folder', name: 'product1', path: 'products/product1' },
            { type: 'folder', name: 'product2', path: 'products/product2' },
            { type: 'folder', name: 'product3', path: 'products/product3' },
            { type: 'folder', name: 'product4', path: 'products/product4' },
            { type: 'file', name: '1.webp', path: 'products/1.webp' },
            { type: 'file', name: '2.jpg', path: 'products/2.jpg' },
            { type: 'file', name: '3.jpg', path: 'products/3.jpg' },
            { type: 'file', name: '4.jpg', path: 'products/4.jpg' },
            { type: 'file', name: '5.jpg', path: 'products/5.jpg' },
            { type: 'file', name: '6.jpg', path: 'products/6.jpg' },
            { type: 'file', name: '7.jpg', path: 'products/7.jpg' },
            { type: 'file', name: '8.jpg', path: 'products/8.jpg' },
            { type: 'file', name: '9.jpg', path: 'products/9.jpg' },
            { type: 'file', name: '10.png', path: 'products/10.png' },
            { type: 'file', name: '11.jpg', path: 'products/11.jpg' },
            { type: 'file', name: '12.jpg', path: 'products/12.jpg' },
            { type: 'file', name: '13.jpg', path: 'products/13.jpg' },
            { type: 'file', name: '14.jpg', path: 'products/14.jpg' },
            { type: 'file', name: '15.jpg', path: 'products/15.jpg' },
            { type: 'file', name: '16.jpg', path: 'products/16.jpg' },
            { type: 'file', name: '17.jpg', path: 'products/17.jpg' },
            { type: 'file', name: '18.jpg', path: 'products/18.jpg' },
            { type: 'file', name: '19.jpg', path: 'products/19.jpg' },
            { type: 'file', name: '20.jpg', path: 'products/20.jpg' },
          ];
        } else if (basePath === '/images/products/product1') {
          return [
            { type: 'file', name: '1.jpg', path: 'products/product1/1.jpg' },
            { type: 'file', name: '2.jpg', path: 'products/product1/2.jpg' },
            { type: 'file', name: '3.jpg', path: 'products/product1/3.jpg' },
            { type: 'file', name: '4.jpg', path: 'products/product1/4.jpg' },
          ];
        } else if (basePath === '/images/products/product2') {
          return [
            { type: 'file', name: '1.jpg', path: 'products/product2/1.jpg' },
            { type: 'file', name: '2.jpg', path: 'products/product2/2.jpg' },
            { type: 'file', name: '3.jpg', path: 'products/product2/3.jpg' },
          ];
        } else if (basePath === '/images/products/product3') {
          return [
            { type: 'file', name: '1.jpg', path: 'products/product3/1.jpg' },
            { type: 'file', name: '2.jpg', path: 'products/product3/2.jpg' },
            { type: 'file', name: '3.jpg', path: 'products/product3/3.jpg' },
            { type: 'file', name: '4.jpg', path: 'products/product3/4.jpg' },
          ];
        } else if (basePath === '/images/products/product4') {
          return [
            { type: 'file', name: '1.jpg', path: 'products/product4/1.jpg' },
            { type: 'file', name: '2.jpg', path: 'products/product4/2.jpg' },
            { type: 'file', name: '3.jpg', path: 'products/product4/3.jpg' },
            { type: 'file', name: '4.jpg', path: 'products/product4/4.jpg' },
          ];
        } else if (basePath === '/images/RGB') {
          return [
            { type: 'file', name: 'blue.jpg', path: 'RGB/blue.jpg' },
            { type: 'file', name: 'blue_mob.jpg', path: 'RGB/blue_mob.jpg' },
            { type: 'file', name: 'green.jpg', path: 'RGB/green.jpg' },
            { type: 'file', name: 'green_mob.jpg', path: 'RGB/green_mob.jpg' },
            { type: 'file', name: 'off.jpg', path: 'RGB/off.jpg' },
            { type: 'file', name: 'off1.jpg', path: 'RGB/off1.jpg' },
            { type: 'file', name: 'off_mob.jpg', path: 'RGB/off_mob.jpg' },
            { type: 'file', name: 'red.jpg', path: 'RGB/red.jpg' },
            { type: 'file', name: 'red_mob.jpg', path: 'RGB/red_mob.jpg' },
            { type: 'file', name: 'white.jpg', path: 'RGB/white.jpg' },
            { type: 'file', name: 'white1.jpg', path: 'RGB/white1.jpg' },
            { type: 'file', name: 'white_mob.jpg', path: 'RGB/white_mob.jpg' },
          ];
        } else if (basePath === '/images/brightness') {
          return [
            { type: 'file', name: 'light_off.jpg', path: 'brightness/light_off.jpg' },
            { type: 'file', name: 'light_off_mob.jpg', path: 'brightness/light_off_mob.jpg' },
            { type: 'file', name: 'light_on.jpg', path: 'brightness/light_on.jpg' },
            { type: 'file', name: 'light_on_mob.jpg', path: 'brightness/light_on_mob.jpg' },
          ];
        } else if (basePath === '/images/businessCard') {
          return [
            { type: 'file', name: 'back1.jpg', path: 'businessCard/back1.jpg' },
            { type: 'file', name: 'back2.jpg', path: 'businessCard/back2.jpg' },
            { type: 'file', name: 'front1.jpg', path: 'businessCard/front1.jpg' },
            { type: 'file', name: 'front2.jpg', path: 'businessCard/front2.jpg' },
          ];
        } else if (basePath === '/images/svgLogos') {
          return [
            { type: 'file', name: '__Icon_Wordmark_Black.svg', path: 'svgLogos/__Icon_Wordmark_Black.svg' },
            { type: 'file', name: '__Icon_Wordmark_Colored.svg', path: 'svgLogos/__Icon_Wordmark_Colored.svg' },
            { type: 'file', name: '__Icon_Wordmark_Inverted.svg', path: 'svgLogos/__Icon_Wordmark_Inverted.svg' },
            { type: 'file', name: '__Icon_Wordmark_White.svg', path: 'svgLogos/__Icon_Wordmark_White.svg' },
            { type: 'file', name: '__Logo_Icon_Black.svg', path: 'svgLogos/__Logo_Icon_Black.svg' },
            { type: 'file', name: '__Logo_Icon_Colored.svg', path: 'svgLogos/__Logo_Icon_Colored.svg' },
            { type: 'file', name: '__Logo_Icon_Inverted.svg', path: 'svgLogos/__Logo_Icon_Inverted.svg' },
            { type: 'file', name: '__Logo_Icon_White.svg', path: 'svgLogos/__Logo_Icon_White.svg' },
            { type: 'file', name: '__Primary_Logo_Black.svg', path: 'svgLogos/__Primary_Logo_Black.svg' },
            { type: 'file', name: '__Primary_Logo_Colored.svg', path: 'svgLogos/__Primary_Logo_Colored.svg' },
            { type: 'file', name: '__Primary_Logo_Inverted.svg', path: 'svgLogos/__Primary_Logo_Inverted.svg' },
            { type: 'file', name: '__Primary_Logo_White.svg', path: 'svgLogos/__Primary_Logo_White.svg' },
            { type: 'file', name: '__Vertical_Logo_A_B.svg', path: 'svgLogos/__Vertical_Logo_A_B.svg' },
            { type: 'file', name: '__Vertical_Logo_A_Colored.svg', path: 'svgLogos/__Vertical_Logo_A_Colored.svg' },
            { type: 'file', name: '__Vertical_Logo_A_Inverted.svg', path: 'svgLogos/__Vertical_Logo_A_Inverted.svg' },
            { type: 'file', name: '__Vertical_Logo_A_White.svg', path: 'svgLogos/__Vertical_Logo_A_White.svg' },
            { type: 'file', name: '__Vertical_Logo_B_Black.svg', path: 'svgLogos/__Vertical_Logo_B_Black.svg' },
            { type: 'file', name: '__Vertical_Logo_B_Colored.svg', path: 'svgLogos/__Vertical_Logo_B_Colored.svg' },
            { type: 'file', name: '__Vertical_Logo_B_Inverted.svg', path: 'svgLogos/__Vertical_Logo_B_Inverted.svg' },
            { type: 'file', name: '__Vertical_Logo_B_White.svg', path: 'svgLogos/__Vertical_Logo_B_White.svg' },
            { type: 'file', name: '__Wordmark_Black.svg', path: 'svgLogos/__Wordmark_Black.svg' },
            { type: 'file', name: '__Wordmark_Green.svg', path: 'svgLogos/__Wordmark_Green.svg' },
            { type: 'file', name: '__Wordmark_White.svg', path: 'svgLogos/__Wordmark_White.svg' },
          ];
        } else if (basePath === '/images/carouselImages') {
          return [
            { type: 'file', name: 'cool_mix.jpg', path: 'carouselImages/cool_mix.jpg' },
            { type: 'file', name: 'cool_mix_mob.jpg', path: 'carouselImages/cool_mix_mob.jpg' },
            { type: 'file', name: 'cool_pure.jpg', path: 'carouselImages/cool_pure.jpg' },
            { type: 'file', name: 'cool_pure_mob.jpg', path: 'carouselImages/cool_pure_mob.jpg' },
            { type: 'file', name: 'warm_mix.jpg', path: 'carouselImages/warm_mix.jpg' },
            { type: 'file', name: 'warm_mix_mob.jpg', path: 'carouselImages/warm_mix_mob.jpg' },
            { type: 'file', name: 'warm_pure.jpg', path: 'carouselImages/warm_pure.jpg' },
            { type: 'file', name: 'warm_pure_mob.jpg', path: 'carouselImages/warm_pure_mob.jpg' },
          ];
        } else if (basePath === '/videos') {
          return [
            { type: 'file', name: 'BgMobile.mp4', path: 'BgMobile.mp4' },
            { type: 'file', name: 'BgVideo.mp4', path: 'BgVideo.mp4' },
            { type: 'file', name: 'BgVideo.webm', path: 'BgVideo.webm' },
            { type: 'file', name: 'BgVideo1.mp4', path: 'BgVideo1.mp4' },
            { type: 'file', name: 'BgVideo2.mp4', path: 'BgVideo2.mp4' },
            { type: 'file', name: 'customerprofile_anim.mp4', path: 'customerprofile_anim.mp4' },
            { type: 'file', name: 'customerprofile_anim1.mp4', path: 'customerprofile_anim1.mp4' },
            { type: 'file', name: 'mobileview_slider.m4v', path: 'mobileview_slider.m4v' },
            { type: 'file', name: 'mobileview_slider1.m4v', path: 'mobileview_slider1.m4v' },
            { type: 'file', name: 'webview_slider.m4v', path: 'webview_slider.m4v' },
            { type: 'file', name: 'webview_slider1.m4v', path: 'webview_slider1.m4v' },
          ];
        }
        
        // Default empty directory
        return [];
      };
      
      // Get the simulated contents
      const contents = simulateDirectoryContents(fullPath);
      
      // Filter based on file extensions if needed
      const validExtensions = activeTab === 'images' ? imageExtensions : videoExtensions;
      
      // Process the items to add full URLs
      const processedItems = contents.map(item => {
        if (item.type === 'file') {
          // For files, check if they have valid extensions
          const ext = item.name.substring(item.name.lastIndexOf('.')).toLowerCase();
          const isValidType = validExtensions.includes(ext);
          
          if (!isValidType && item.type === 'file') {
            return null; // Skip files with invalid extensions
          }
          
          // Add the full URL
          return {
            ...item,
            url: `/${activeTab}/${item.path}`,
            title: item.name
          };
        }
        
        // For folders, just return as is
        return item;
      }).filter(Boolean); // Remove null items
      
      setMediaItems(processedItems);
    } catch (err) {
      setError('Failed to load media items. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load media items when the tab or path changes
  useEffect(() => {
    if (isOpen) {
      fetchMediaItems(currentPath);
    }
  }, [isOpen, activeTab, currentPath]);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPath(''); // Reset path when changing tabs
    setSearchTerm(''); // Clear search when changing tabs
  };
  
  // Handle folder navigation
  const handleFolderClick = (folderPath) => {
    setCurrentPath(folderPath);
  };
  
  // Handle going back up a directory
  const handleGoBack = () => {
    if (!currentPath) return;
    
    const pathParts = currentPath.split('/');
    pathParts.pop(); // Remove the last part
    const newPath = pathParts.join('/');
    setCurrentPath(newPath);
  };
  
  // Handle file selection
  const handleFileSelect = (fileUrl) => {
    onSelect(fileUrl);
    onClose();
  };
  
  // Filter media items based on search term
  const filteredItems = searchTerm.trim() 
    ? mediaItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mediaItems;
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-[9999] p-4 pt-16 md:pt-24">
      <div className="bg-[#292929] rounded-lg p-6 w-full max-w-4xl max-h-[85vh] h-auto overflow-hidden flex flex-col" style={{ maxHeight: 'min(85vh, 800px)' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Media Library</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-[#3a3a3a] transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-[#444] mb-4">
          <button
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'images' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => handleTabChange('images')}
          >
            <FaImage className="mr-2" /> Images
          </button>
          <button
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'videos' ? 'text-[#50C878] border-b-2 border-[#50C878]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => handleTabChange('videos')}
          >
            <FaVideo className="mr-2" /> Videos
          </button>
        </div>
        
        {/* Path Navigation and Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            {currentPath && (
              <button 
                onClick={handleGoBack}
                className="p-1.5 rounded hover:bg-[#3a3a3a] text-gray-400 hover:text-white"
                title="Go back"
              >
                <FaArrowLeft />
              </button>
            )}
            
            <div className="flex items-center overflow-x-auto whitespace-nowrap py-1 max-w-[300px] md:max-w-[500px]">
              <button 
                className="hover:text-[#50C878] font-medium"
                onClick={() => setCurrentPath('')}
              >
                {activeTab === 'images' ? 'Images' : 'Videos'}
              </button>
              
              {currentPath.split('/').filter(Boolean).map((segment, index, array) => {
                // Calculate the path up to this segment
                const pathToSegment = array.slice(0, index + 1).join('/');
                
                return (
                  <React.Fragment key={segment}>
                    <span className="mx-1">/</span>
                    <button 
                      className="hover:text-[#50C878] font-medium"
                      onClick={() => setCurrentPath(pathToSegment)}
                    >
                      {segment}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-[#1e1e1e] text-white p-2 pl-8 rounded-md transition-all duration-300 hover:border-[#50C878] focus:border-[#50C878] focus:ring-1 focus:ring-[#50C878]"
            />
            <FaSearch className="absolute left-2.5 top-3 text-gray-400" />
          </div>
        </div>
        
        {/* Media Content */}
        <div className="overflow-y-auto flex-grow">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#50C878]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-400">
              <p>{error}</p>
              <button 
                onClick={() => fetchMediaItems(currentPath)}
                className="mt-4 px-4 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded-md text-white"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Folders Section */}
              {filteredItems.filter(item => item.type === 'folder').length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white text-lg font-medium mb-3">Folders</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredItems
                      .filter(item => item.type === 'folder')
                      .map((folder) => (
                        <div 
                          key={folder.path} 
                          className="bg-[#1e1e1e] p-3 rounded-md cursor-pointer hover:bg-[#2a2a2a] transition-colors group"
                          onClick={() => handleFolderClick(folder.path)}
                        >
                          <div className="flex items-center space-x-2">
                            <FaFolderOpen className="text-[#50C878] group-hover:text-[#6ad98e] text-2xl" />
                            <span className="text-white text-sm truncate">{folder.name}</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
              
              {/* Files Section */}
              {filteredItems.filter(item => item.type === 'file').length > 0 ? (
                <div>
                  <h3 className="text-white text-lg font-medium mb-3">Files</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredItems
                      .filter(item => item.type === 'file')
                      .map((file) => {
                        // Determine if it's a video file
                        const isVideo = videoExtensions.some(ext => 
                          file.name.toLowerCase().endsWith(ext)
                        );
                        
                        // For videos, we'll use the actual file URL
                        // In a real implementation, we would have video thumbnails
                        const thumbnailUrl = file.url;
                        
                        return (
                          <div 
                            key={file.path} 
                            className="relative group cursor-pointer rounded-md overflow-hidden bg-[#1e1e1e]"
                            onClick={() => handleFileSelect(file.url)}
                          >
                            <div className="aspect-w-16 aspect-h-9 bg-[#1e1e1e]">
                              <img 
                                src={thumbnailUrl}
                                alt={file.name}
                                className="w-full h-24 sm:h-28 md:h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                                style={{ maxHeight: 'min(32vh, 150px)' }}
                              />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                              <div className="p-2 w-full">
                                <p className="text-white text-sm truncate">{file.name}</p>
                              </div>
                            </div>
                            {isVideo && (
                              <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              ) : (
                // Show when no files are found
                filteredItems.filter(item => item.type === 'folder').length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    {searchTerm ? (
                      <p>No {activeTab} found matching your search.</p>
                    ) : (
                      <p>This folder is empty.</p>
                    )}
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;
