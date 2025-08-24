import { useState, useEffect, useRef } from 'react';

export default function InteractiveFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const features = [
    {
      id: 'adaptive-lighting',
      title: 'Adaptive Lighting',
      description: 'AI-powered lighting that learns your daily routines and automatically adjusts brightness, color temperature, and ambiance throughout the day.',
      icon: '💡',
      color: '#54bb74',
      stats: ['98% Energy Efficient', '24/7 Learning', '∞ Customization'],
      demo: 'brightness'
    },
    {
      id: 'smart-sensors',
      title: 'Smart Sensors',
      description: 'Advanced radar and motion detection that understands occupancy patterns, presence zones, and environmental conditions.',
      icon: '📡',
      color: '#93cfa2',
      stats: ['360° Detection', '5m Range', '< 1ms Response'],
      demo: 'radar'
    },
    {
      id: 'voice-control',
      title: 'Voice Intelligence',
      description: 'Natural language processing with offline privacy. Control your entire lighting ecosystem with simple voice commands.',
      icon: '🎤',
      color: '#0AB6BC',
      stats: ['95% Accuracy', 'Offline Processing', '12 Languages'],
      demo: 'voice'
    },
    {
      id: 'ecosystem',
      title: 'Connected Ecosystem',
      description: 'Seamlessly integrate with your smart home. Works with existing systems while providing advanced AI coordination.',
      icon: '🏠',
      color: '#292929',
      stats: ['50+ Integrations', 'Zero Config', 'Cloud Optional'],
      demo: 'network'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const renderDemo = (demo) => {
    switch (demo) {
      case 'brightness':
        return (
          <div className="relative w-full h-48 bg-gradient-to-t from-yellow-900/20 to-yellow-400/40 rounded-2xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-t from-yellow-500/60 to-yellow-200/80 transition-all duration-1000"
              style={{ 
                opacity: 0.3 + mousePosition.y * 0.7,
                transform: `translateY(${(1 - mousePosition.y) * 100}%)`
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-pulse">💡</div>
            </div>
            <div className="absolute bottom-4 left-4 text-white/80 text-sm">
              Brightness: {Math.round(mousePosition.y * 100)}%
            </div>
          </div>
        );
      
      case 'radar':
        return (
          <div className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border border-emerald-400/30 rounded-full animate-ping"
                  style={{
                    width: `${(i + 1) * 60}px`,
                    height: `${(i + 1) * 60}px`,
                    left: `${mousePosition.x * 100}%`,
                    top: `${mousePosition.y * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl">📡</div>
            </div>
            <div className="absolute bottom-4 left-4 text-emerald-400 text-sm">
              Detection Zone: Active
            </div>
          </div>
        );
      
      case 'voice':
        return (
          <div className="relative w-full h-48 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="text-6xl">🎤</div>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 border-2 border-blue-400/40 rounded-full animate-pulse"
                    style={{
                      width: `${80 + i * 20}px`,
                      height: `${80 + i * 20}px`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-blue-400 text-sm">
              "Set living room to 75%"
            </div>
          </div>
        );
      
      case 'network':
        return (
          <div className="relative w-full h-48 bg-slate-800 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 p-6">
              <div className="grid grid-cols-3 gap-4 h-full">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-500 hover:bg-emerald-600/20"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      opacity: mousePosition.x > (i % 3) / 3 && mousePosition.y > Math.floor(i / 3) / 3 ? 1 : 0.3
                    }}
                  >
                    <div className="text-2xl">
                      {['💡', '🏠', '📱', '🔊', '🌡️', '🔒', '📺', '🎵', '⚡'][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-emerald-400 text-sm">
              Connected Devices: {Math.floor(mousePosition.x * 9) + 1}/9
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 reveal-scale">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Intelligent
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Features
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Experience the future of smart lighting with AI-powered features that adapt, learn, and evolve with your lifestyle.
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature Navigation */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-500 ${
                  activeFeature === index
                    ? 'bg-white/5 border-emerald-400/50 shadow-2xl'
                    : 'bg-white/2 border-white/10 hover:bg-white/3 hover:border-white/20'
                }`}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl transition-all duration-300"
                    style={{ 
                      backgroundColor: activeFeature === index ? `${feature.color}20` : 'rgba(255,255,255,0.05)',
                      border: activeFeature === index ? `2px solid ${feature.color}40` : '2px solid transparent'
                    }}
                  >
                    {feature.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {feature.stats.map((stat, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 border border-white/20"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Demo */}
          <div className="reveal-right">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">
                  {features[activeFeature].title} Demo
                </h4>
                <p className="text-white/60">
                  Move your cursor to interact with the demo
                </p>
              </div>
              
              {renderDemo(features[activeFeature].demo)}
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex space-x-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeFeature === index ? 'bg-emerald-400' : 'bg-white/20'
                      }`}
                      onClick={() => setActiveFeature(index)}
                    />
                  ))}
                </div>
                
                <div className="text-white/60 text-sm">
                  {activeFeature + 1} / {features.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 reveal-scale">
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  );
}
