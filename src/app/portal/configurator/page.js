'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaArrowLeft, FaLightbulb, FaSlidersH, FaDownload, FaShoppingCart, FaSave, FaUndo, FaRedo } from 'react-icons/fa';

// Mock configuration data
const mockConfig = {
  id: 'config-001',
  name: 'Living Room Pendant Setup',
  description: 'Custom pendant configuration with warm lighting for the living room',
  thumbnail: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1974&auto=format&fit=crop',
  products: [
    { id: 'prod-123', name: 'LIMI Pendant Base', quantity: 1, price: 149.99, image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1974&auto=format&fit=crop' },
    { id: 'prod-456', name: 'Frosted Glass Globe', quantity: 3, price: 39.99, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1974&auto=format&fit=crop' },
    { id: 'prod-789', name: 'Brass Connector', quantity: 3, price: 10.00, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1974&auto=format&fit=crop' }
  ],
  settings: {
    brightness: 80,
    colorTemperature: 2700,
    scene: 'Evening Relax'
  },
  totalPrice: 349.99
};

// Available scenes
const availableScenes = [
  'Evening Relax',
  'Morning Bright',
  'Dinner Party',
  'Movie Night',
  'Reading Mode',
  'Focus Work'
];

export default function Configurator() {
  const searchParams = useSearchParams();
  const configId = searchParams.get('id') || 'config-001';
  
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [brightness, setBrightness] = useState(80);
  const [colorTemperature, setColorTemperature] = useState(2700);
  const [scene, setScene] = useState('Evening Relax');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Load configuration
  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setConfig(mockConfig);
      setBrightness(mockConfig.settings.brightness);
      setColorTemperature(mockConfig.settings.colorTemperature);
      setScene(mockConfig.settings.scene);
      
      // Initialize history
      setHistory([{
        brightness: mockConfig.settings.brightness,
        colorTemperature: mockConfig.settings.colorTemperature,
        scene: mockConfig.settings.scene
      }]);
      setHistoryIndex(0);
      
      setLoading(false);
    }, 1000);
  }, [configId]);
  
  // Add to history when settings change
  useEffect(() => {
    if (!config) return;
    
    const currentSettings = {
      brightness,
      colorTemperature,
      scene
    };
    
    // Only add to history if settings have changed
    if (historyIndex >= 0 && 
        JSON.stringify(currentSettings) !== JSON.stringify(history[historyIndex])) {
      
      // Remove any future history if we're not at the end
      const newHistory = history.slice(0, historyIndex + 1);
      
      // Add current settings to history
      newHistory.push(currentSettings);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [brightness, colorTemperature, scene]);
  
  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const prevSettings = history[newIndex];
      
      setBrightness(prevSettings.brightness);
      setColorTemperature(prevSettings.colorTemperature);
      setScene(prevSettings.scene);
      
      setHistoryIndex(newIndex);
    }
  };
  
  // Redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextSettings = history[newIndex];
      
      setBrightness(nextSettings.brightness);
      setColorTemperature(nextSettings.colorTemperature);
      setScene(nextSettings.scene);
      
      setHistoryIndex(newIndex);
    }
  };
  
  // Calculate color temperature style
  const getColorTemperatureStyle = () => {
    // Map 2000K (warm) to 6500K (cool)
    const warmth = 1 - ((colorTemperature - 2000) / 4500);
    
    // Create a gradient from warm (amber) to cool (blue-white)
    const r = Math.round(255 * warmth);
    const g = Math.round(200 * warmth + 55 * (1 - warmth));
    const b = Math.round(100 * warmth + 155 * (1 - warmth));
    
    return {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      opacity: brightness / 100
    };
  };
  
  if (loading) {
    return (
      <main className="bg-[#292929] text-white min-h-screen">
        <Header />
        <div className="pt-[120px] pb-16 flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse text-2xl text-[#54BB74]">Loading configurator...</div>
        </div>
        <Footer />
      </main>
    );
  }
  
  if (!config) {
    return (
      <main className="bg-[#292929] text-white min-h-screen">
        <Header />
        <div className="pt-[120px] pb-16 container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Configuration Not Found</h2>
            <p className="text-gray-400 mb-6">The configuration you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }
  
  return (
    <main className="bg-[#292929] text-white min-h-screen">
      <Header />
      
      <div className="pt-[120px] pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
            >
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{config.name}</h1>
                <p className="text-gray-400">{config.description}</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="bg-[#292929] border border-gray-700 text-white p-2 rounded-md hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Undo"
                >
                  <FaUndo />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className="bg-[#292929] border border-gray-700 text-white p-2 rounded-md hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Redo"
                >
                  <FaRedo />
                </button>
                <button
                  className="bg-[#292929] border border-gray-700 text-white p-2 rounded-md hover:bg-[#333] transition-colors"
                  title="Download Configuration"
                >
                  <FaDownload />
                </button>
                <button
                  className="bg-[#292929] border border-gray-700 text-white p-2 rounded-md hover:bg-[#333] transition-colors"
                  title="Save Changes"
                >
                  <FaSave />
                </button>
                <button
                  className="bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors flex items-center gap-2"
                >
                  <FaShoppingCart />
                  <span>Order</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Preview */}
            <div className="lg:col-span-2">
              <div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={config.thumbnail}
                    alt={config.name}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Light effect overlay */}
                  <div 
                    className="absolute inset-0 mix-blend-soft-light transition-opacity duration-300"
                    style={getColorTemperatureStyle()}
                  ></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-3 rounded-lg backdrop-blur-sm">
                    <div className="text-white font-medium">Current Scene: {scene}</div>
                    <div className="text-sm text-gray-300">
                      Brightness: {brightness}% | Color Temperature: {colorTemperature}K
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Products in this Configuration</h3>
                  
                  <div className="space-y-3">
                    {config.products.map((product, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-[#292929]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="text-white font-medium">{product.name}</div>
                          <div className="text-sm text-gray-400">Qty: {product.quantity}</div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-white">${product.price.toFixed(2)}</div>
                          <div className="text-sm text-gray-400">
                            ${(product.price * product.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                    <div className="text-gray-400">Total:</div>
                    <div className="text-xl font-bold text-[#54BB74]">${config.totalPrice.toFixed(2)}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#1e1e1e] rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <FaLightbulb className="text-[#54BB74]" />
                  <h3 className="text-lg font-semibold text-white">Note</h3>
                </div>
                <p className="text-gray-400">
                  This is a simplified web configurator. For full editing capabilities including 3D visualization,
                  product swapping, and advanced lighting effects, please use the LIMI mobile app.
                </p>
              </div>
            </div>
            
            {/* Controls */}
            <div>
              <div className="bg-[#1e1e1e] rounded-lg p-6 sticky top-[120px]">
                <div className="flex items-center gap-3 mb-6">
                  <FaSlidersH className="text-[#54BB74]" />
                  <h3 className="text-lg font-semibold text-white">Lighting Controls</h3>
                </div>
                
                {/* Brightness control */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-gray-300">Brightness</label>
                    <span className="text-white font-medium">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#54BB74]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                {/* Color temperature control */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-gray-300">Color Temperature</label>
                    <span className="text-white font-medium">{colorTemperature}K</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="6500"
                    step="100"
                    value={colorTemperature}
                    onChange={(e) => setColorTemperature(parseInt(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-amber-500 to-blue-300 rounded-lg appearance-none cursor-pointer accent-[#54BB74]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Warm</span>
                    <span>Neutral</span>
                    <span>Cool</span>
                  </div>
                </div>
                
                {/* Scene selection */}
                <div>
                  <label className="text-gray-300 block mb-2">Scene</label>
                  <div className="grid grid-cols-2 gap-3">
                    {availableScenes.map((sceneName) => (
                      <button
                        key={sceneName}
                        onClick={() => setScene(sceneName)}
                        className={`py-2 px-3 rounded-md text-sm ${
                          scene === sceneName
                            ? 'bg-[#54BB74] text-white'
                            : 'bg-[#292929] text-gray-300 hover:bg-[#333] transition-colors'
                        }`}
                      >
                        {sceneName}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <button
                    className="w-full bg-[#54BB74] text-white py-3 rounded-md hover:bg-[#48a064] transition-colors flex items-center justify-center gap-2"
                  >
                    <FaSave />
                    <span>Save Configuration</span>
                  </button>
                  
                  <div className="mt-4 text-center">
                    <Link
                      href="/portal"
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      Cancel and return to dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
