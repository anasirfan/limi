export default function VirtualScrollingSection() {
  return (
    <section className="virtual-scroll-section relative h-[300vh] bg-white">
      <div className="virtual-content sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <h2 className="text-6xl font-bold mb-16 text-black">
            Core Benefits
          </h2>
          <p className="text-2xl mb-16 text-gray-600">
            Eight ways LIMI AI transforms your daily life
          </p>
          
          <div className="relative h-[500px] w-full max-w-7xl mx-auto">
            {[
              { title: 'Comfort', desc: 'Adjusts lighting, sound, and temperature to create your perfect environment.', icon: '🏠', gradient: 'from-emerald-400 to-green-500' },
              { title: 'Energy Saving', desc: 'Optimizes power consumption without compromising your experience.', icon: '⚡', gradient: 'from-yellow-400 to-orange-500' },
              { title: 'Wellness', desc: 'Supports focus, rest, and mental clarity through intelligent adaptation.', icon: '🧘', gradient: 'from-purple-400 to-pink-500' },
              { title: 'Learning', desc: 'Enhances productivity and study sessions with adaptive environments.', icon: '📚', gradient: 'from-blue-400 to-indigo-500' },
              { title: 'Creativity', desc: 'Sparks imagination with AI collaboration and inspiring atmospheres.', icon: '🎨', gradient: 'from-pink-400 to-red-500' },
              { title: 'Productivity', desc: 'Organizes schedules, tasks, and workspace for maximum efficiency.', icon: '📈', gradient: 'from-teal-400 to-cyan-500' },
              { title: 'Security', desc: 'Protects your environment proactively with intelligent monitoring.', icon: '🛡️', gradient: 'from-gray-400 to-gray-600' },
              { title: 'Limitless', desc: 'Always evolving with you, learning and adapting continuously.', icon: '∞', gradient: 'from-emerald-400 to-teal-500' }
            ].map((item, num) => (
              <div 
                key={num}
                className="virtual-item absolute  inset-0 flex items-center justify-center text-center rounded-2xl p-12 shadow-2xl border border-gray-200 bg-white"
              >
                <div className="max-w-4xl mx-auto">
                  {/* Icon with gradient background */}
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl text-white mx-auto mb-8 shadow-lg`}>
                    {item.icon}
                  </div>
                  
                  {/* Number indicator */}
                  <div className="text-2xl font-bold text-emerald-500 mb-4">
                    {String(num + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-5xl font-bold mb-6 text-black">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
                    {item.desc}
                  </p>
                  
                  {/* Progress indicator */}
                  <div className="flex justify-center space-x-2">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div 
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === num ? 'bg-emerald-500 w-8' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
