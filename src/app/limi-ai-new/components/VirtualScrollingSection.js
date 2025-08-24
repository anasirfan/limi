export default function VirtualScrollingSection() {
  return (
    <section className="virtual-scroll-section relative h-[300vh] bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Background blur elements for glassmorphism */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0AB6BC]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#54bb74]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-[#93cfa2]/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="virtual-content sticky top-0 h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="text-center">
          <h2 className="text-7xl font-bold mb-16 text-gray-900 drop-shadow-sm">
            Core Benefits
          </h2>
          <p className="text-2xl mb-16 text-gray-700">
            Eight ways LIMI AI transforms your daily life
          </p>
          
          <div className="relative h-[600px] w-full max-w-[90vw] mx-auto">
            {[
              { title: 'Comfort', desc: 'Adjusts lighting, sound, and temperature to create your perfect environment.', icon: '🏠', gradient: 'from-[#0AB6BC] to-[#045C43]' },
              { title: 'Energy Saving', desc: 'Optimizes power consumption without compromising your experience.', icon: '⚡', gradient: 'from-[#54bb74] to-[#0AB6BC]' },
              { title: 'Wellness', desc: 'Supports focus, rest, and mental clarity through intelligent adaptation.', icon: '🧘', gradient: 'from-[#93cfa2] to-[#54bb74]' },
              { title: 'Learning', desc: 'Enhances productivity and study sessions with adaptive environments.', icon: '📚', gradient: 'from-[#0AB6BC] to-[#93cfa2]' },
              { title: 'Creativity', desc: 'Sparks imagination with AI collaboration and inspiring atmospheres.', icon: '🎨', gradient: 'from-[#54bb74] to-[#045C43]' },
              { title: 'Productivity', desc: 'Organizes schedules, tasks, and workspace for maximum efficiency.', icon: '📈', gradient: 'from-[#0AB6BC] to-[#54bb74]' },
              { title: 'Security', desc: 'Protects your environment proactively with intelligent monitoring.', icon: '🛡️', gradient: 'from-[#045C43] to-[#0AB6BC]' },
              { title: 'Limitless', desc: 'Always evolving with you, learning and adapting continuously.', icon: '∞', gradient: 'from-[#93cfa2] to-[#0AB6BC]' }
            ].map((item, num) => (
              <div 
                key={num}
                className="virtual-item absolute inset-0 flex items-center justify-center text-center rounded-3xl p-16 backdrop-blur-xl bg-white/20 border border-white/30 shadow-[0_8px_32px_rgba(10,182,188,0.15)] hover:shadow-[0_12px_40px_rgba(10,182,188,0.25)] transition-all duration-500"
                style={{
                  backdropFilter: 'blur(20px)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)'
                }}
              >
                <div className="max-w-6xl mx-auto w-full">
                  {/* Icon with enhanced gradient background */}
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-5xl text-white mx-auto mb-10 shadow-2xl backdrop-blur-sm border border-white/20`}>
                    {item.icon}
                  </div>
                  
                  {/* Number indicator with glassmorphism */}
                  <div className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-2xl font-bold text-[#0AB6BC] mb-6 shadow-lg">
                    {String(num + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-6xl font-bold mb-8 text-gray-900 drop-shadow-sm">
                    {item.title}
                  </h3>
                  
                  {/* Description with glassmorphism container */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-10 shadow-lg">
                    <p className="text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Progress indicator with glassmorphism */}
                  <div className="inline-flex justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20 shadow-lg">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div 
                        key={i}
                        className={`h-3 rounded-full transition-all duration-500 ${
                          i === num 
                            ? 'bg-[#0AB6BC] w-12 shadow-[0_0_10px_rgba(10,182,188,0.6)]' 
                            : 'bg-white/40 w-3 hover:bg-white/60'
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
