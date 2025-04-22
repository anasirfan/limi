import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import { gsap } from "gsap";

const AdditionalInfo = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('installation');
  
  // Installation steps animation reference
  const stepsRef = useRef(null);
  
  useEffect(() => {
    if (stepsRef.current && activeTab === 'installation') {
      const steps = stepsRef.current.querySelectorAll('.step-item');
      gsap.fromTo(steps, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <motion.div 
      className={`mt-12 pt-12 ${isDarkMode ? 'border-t border-gray-700 text-white' : 'border-t border-gray-200'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-3xl font-bold mb-8 font-['Amenti'] text-center">
        Additional Information
      </h2>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 overflow-x-auto pb-2">
        <div className={`inline-flex rounded-lg p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {['installation', 'delivery', 'specifications', 'reviews'].map((tab) => (
            <motion.button
              key={tab}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === tab 
                ? isDarkMode ? 'bg-emerald-700 text-white' : 'bg-emerald-500 text-white'
                : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === 'installation' && 'Installation Guide'}
              {tab === 'delivery' && 'What\'s Included'}
              {tab === 'specifications' && 'Technical Specs'}
              {tab === 'reviews' && 'Customer Reviews'}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Installation Guide */}
        {activeTab === 'installation' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">Installation Guide</h3>
                <p className="mb-6">Our lights are designed for easy installation, but we recommend following these steps for best results:</p>
                
                <div ref={stepsRef} className="space-y-4">
                  {[
                    { step: 1, title: "Turn off power", desc: "Always ensure the power is off at the circuit breaker before beginning installation." },
                    { step: 2, title: "Mount the bracket", desc: "Secure the mounting bracket to the ceiling or wall junction box." },
                    { step: 3, title: "Connect the wires", desc: "Connect the fixture wires to your home wiring according to the included instructions." },
                    { step: 4, title: "Attach the fixture", desc: "Secure the light fixture to the mounting bracket." },
                    { step: 5, title: "Install bulbs & test", desc: "Install the bulbs and restore power to test the fixture." }
                  ].map((item) => (
                    <motion.div 
                      key={item.step}
                      className="step-item flex items-start gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-emerald-700' : 'bg-emerald-100'}`}>
                        <span className={isDarkMode ? 'text-white' : 'text-emerald-700'}>{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <p className="text-sm">For detailed instructions, refer to the installation manual included with your purchase.</p>
                  <button className={`mt-4 px-4 py-2 rounded-lg flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <FaInfoCircle /> Download Installation PDF
                  </button>
                </div>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-20 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-2">Professional Installation</h4>
                  <p className="mb-4">For ceiling and wall lights, we recommend professional installation for the best results and safety.</p>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Installation Requirements</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Standard junction box</li>
                      <li>Basic electrical tools</li>
                      <li>Wire connectors (included)</li>
                      <li>Mounting hardware (included)</li>
                      <li>Screwdriver and pliers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* What's Included */}
        {activeTab === 'delivery' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">What's Included</h3>
                <p className="mb-6">Every LIMI light package contains everything you need for a complete installation:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    { title: "Light Fixture(s)", desc: "Your configured pendant light(s)" },
                    { title: "Mounting Hardware", desc: "Brackets, screws, and anchors" },
                    { title: "Power Cable", desc: "Your selected cable length and color" },
                    { title: "LED Bulbs", desc: "Energy-efficient smart bulbs" },
                    { title: "Installation Guide", desc: "Step-by-step instructions" },
                    { title: "Warranty Card", desc: "5-year manufacturer warranty" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="font-bold">{item.title}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'} border-l-4 border-emerald-500`}>
                  <h4 className="font-bold mb-1">Shipping Information</h4>
                  <p className="text-sm">All orders are carefully packaged and shipped within 2-3 business days. Delivery typically takes 5-7 business days depending on your location.</p>
                </div>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-2">Package Contents</h4>
                  
                  <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Smart Features</h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Compatible with LIMI mobile app for remote control</li>
                      <li>Works with voice assistants (Alexa, Google Home)</li>
                      <li>Scheduling and automation capabilities</li>
                      <li>Color temperature and brightness control</li>
                    </ul>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Care Instructions</h5>
                    <p className="text-sm mb-2">To maintain the beauty of your LIMI lights:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Clean with a soft, dry cloth</li>
                      <li>Avoid chemical cleaners</li>
                      <li>Dust regularly to maintain brightness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Technical Specifications */}
        {activeTab === 'specifications' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">Technical Specifications</h3>
                <p className="mb-6">LIMI lights are designed with premium materials and advanced technology:</p>
                
                <div className="space-y-4 mb-6">
                  {[
                    { title: "Bulb Type", value: "E26/E27 socket, LED smart bulbs included" },
                    { title: "Power", value: "9W - 12W per bulb (60W equivalent)" },
                    { title: "Voltage", value: "110-240V AC, 50/60Hz" },
                    { title: "Color Temperature", value: "2700K-6500K (adjustable)" },
                    { title: "Brightness", value: "800-1100 lumens per bulb" },
                    { title: "Connectivity", value: "Wi-Fi, Bluetooth" },
                    { title: "Materials", value: "Aircraft-grade aluminum, premium glass" },
                    { title: "Lifespan", value: "25,000+ hours" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex justify-between items-center border-b last:border-0 pb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-medium">{item.title}</span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.value}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'} border-l-4 border-emerald-500`}>
                  <h4 className="font-bold mb-1">Energy Efficiency</h4>
                  <p className="text-sm">LIMI lights are Energy Star certified, consuming up to 85% less energy than traditional incandescent bulbs while providing the same brightness.</p>
                </div>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-10 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-2">Socket & Bulb Information</h4>
                  
                  <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Smart Bulb Features</h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Full color spectrum (16 million colors)</li>
                      <li>Adjustable white temperature (warm to cool)</li>
                      <li>Dimmable from 1% to 100%</li>
                      <li>Scene presets for different moods and activities</li>
                      <li>Energy usage monitoring</li>
                    </ul>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Dimensions</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Pendant Size:</p>
                        <p>Diameter: 120mm - 200mm</p>
                        <p>Height: 140mm - 180mm</p>
                      </div>
                      <div>
                        <p className="font-medium">Cable Length:</p>
                        <p>Standard: 2m</p>
                        <p>Extended: 3m, 5m</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">Customer Reviews</h3>
                
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400 text-2xl">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-xl">4.9/5</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Based on 128 reviews</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Jane D.", rating: 5, comment: "The configurator made it so easy to visualize exactly what I wanted. The lights look even better in person!" },
                    { name: "Mark T.", rating: 5, comment: "Exceptional quality and the smart features work flawlessly with my home system. The app is intuitive and reliable." },
                    { name: "Sarah L.", rating: 4, comment: "Beautiful design and excellent build quality. Installation was straightforward with the included instructions." }
                  ].map((review, index) => (
                    <motion.div 
                      key={index}
                      className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">{review.name}</h4>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className={`text-sm italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{review.comment}"</p>
                    </motion.div>
                  ))}
                </div>
                
                <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  View All Reviews
                </button>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-4">Customer Satisfaction</h4>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Overall Quality", percentage: 98 },
                      { label: "Smart Features", percentage: 96 },
                      { label: "Ease of Installation", percentage: 92 },
                      { label: "Customer Service", percentage: 97 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <motion.div 
                            className="h-full rounded-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Awards & Recognition</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>2024 Design Innovation Award</li>
                      <li>Smart Home Product of the Year</li>
                      <li>Energy Efficiency Excellence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdditionalInfo;
