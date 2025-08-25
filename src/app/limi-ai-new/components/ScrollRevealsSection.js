export default function ScrollRevealsSection() {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-8">
        <h2 className="reveal-scale text-6xl font-bold text-center mb-20 text-[#F6F6F6] drop-shadow-[0_0_15px_rgba(10,182,188,0.4)]">
          Intelligent Features
        </h2>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
          
          {/* Large Feature Block - Real-Time Adaptation */}
          <div className="reveal-left md:col-span-2 lg:col-span-3 md:row-span-2 bg-black rounded-2xl overflow-hidden border border-[#0AB6BC] shadow-[0_0_20px_rgba(10,182,188,0.3)] relative group">
            <video 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/limiai/benefit1.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 h-full flex flex-col justify-between p-8 bg-gradient-to-br from-black/60 via-transparent to-black/80">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                  Real-Time <span className="text-[#0AB6BC] drop-shadow-[0_0_10px_rgba(10,182,188,0.5)]">Adaptation</span>
                </h3>
                <p className="text-lg text-white/90 leading-relaxed drop-shadow-md">
                  Adjusts your lighting and climate in real time based on your activities and preferences.
                </p>
              </div>
              <div className="mt-6">
                <div className="w-16 h-16 bg-[#0AB6BC]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(10,182,188,0.5)]">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Block - Predictive Learning */}
          <div className="reveal-right md:col-span-2 lg:col-span-2 bg-[#021B23] rounded-2xl p-6 border border-[#0AB6BC] shadow-[0_0_15px_rgba(10,182,188,0.2)]">
            <h3 className="text-2xl font-bold mb-3 text-[#F6F6F6]">
              Predictive <span className="text-[#0AB6BC] drop-shadow-[0_0_10px_rgba(10,182,188,0.5)]">Learning</span>
            </h3>
            <p className="text-[#F6F6F6] leading-relaxed">
              Learns your routines and anticipates your needs before you even think about them.
            </p>
          </div>

          {/* Video/3D Block */}
          <div className="reveal-scale md:col-span-2 lg:col-span-1 md:row-span-2 bg-black rounded-2xl overflow-hidden border border-[#0AB6BC] shadow-[0_0_15px_rgba(10,182,188,0.3)] relative group">
            <video 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/limiai/benefit2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <p className="text-sm text-white font-medium drop-shadow-lg">Smart Detection</p>
            </div>
          </div>

          {/* Smart Environment - Large Block */}
          <div className="reveal-scale md:col-span-2 lg:col-span-2 bg-black rounded-2xl overflow-hidden border border-[#0AB6BC] shadow-[0_0_20px_rgba(10,182,188,0.4)] relative group">
            <video 
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-500" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/limiai/benefit3.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#0AB6BC]/80 via-transparent to-black/60">
              <div>
                <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">Smart Environment</h3>
                <p className="text-white/90 leading-relaxed mb-4 drop-shadow-md">
                  Transforms every space into a smart, human-centered environment.
                </p>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-white rounded-full opacity-80 shadow-sm"></div>
                <div className="w-3 h-3 bg-white rounded-full opacity-60 shadow-sm"></div>
                <div className="w-3 h-3 bg-white rounded-full opacity-40 shadow-sm"></div>
              </div>
            </div>
          </div>

          {/* Energy Efficiency */}
          <div className="reveal-left md:col-span-1 lg:col-span-1 bg-[#021B23] rounded-2xl p-4 border border-[#0AB6BC] shadow-[0_0_10px_rgba(10,182,188,0.2)]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0AB6BC] mb-1 drop-shadow-[0_0_8px_rgba(10,182,188,0.5)]">85%</div>
              <p className="text-xs text-[#F6F6F6]">Energy Saved</p>
            </div>
          </div>

          {/* AI Learning */}
          <div className="reveal-right md:col-span-1 lg:col-span-1 bg-[#021B23] rounded-2xl p-4 border border-[#0AB6BC] shadow-[0_0_10px_rgba(10,182,188,0.2)]">
            <div className="text-center">
              <div className="w-8 h-8 bg-[#0AB6BC] rounded-full mx-auto mb-2 flex items-center justify-center shadow-[0_0_8px_rgba(10,182,188,0.5)]">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs text-[#F6F6F6] font-medium">AI Learning</p>
            </div>
          </div>

          {/* Comfort Zone */}
          <div className="reveal-scale md:col-span-2 lg:col-span-2 bg-black rounded-2xl overflow-hidden border border-[#0AB6BC] shadow-[0_0_15px_rgba(10,182,188,0.2)] relative group">
            <video 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/limiai/benefit4.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 h-full flex flex-col justify-between p-6 bg-gradient-to-r from-black/70 via-transparent to-black/50">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">Comfort Zone</h3>
                <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                  Perfect lighting and climate automatically adjusted for maximum comfort and productivity.
                </p>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex-1 h-1 bg-[#0AB6BC] rounded-full shadow-[0_0_5px_rgba(10,182,188,0.5)]"></div>
                <span className="text-[#0AB6BC] text-xs font-medium drop-shadow-[0_0_5px_rgba(10,182,188,0.5)]">Optimal</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
