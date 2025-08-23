export default function ScrollRevealsSection() {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-8">
        <h2 className="reveal-scale text-6xl font-bold text-center mb-20 text-white">
          Intelligent Features
        </h2>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
          
          {/* Large Feature Block - Real-Time Adaptation */}
          <div className="reveal-left md:col-span-2 lg:col-span-3 md:row-span-2 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl p-8 border border-emerald-500/30">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                  Real-Time <span className="text-emerald-500">Adaptation</span>
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Adjusts your lighting and climate in real time based on your activities and preferences.
                </p>
              </div>
              <div className="mt-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Block - Predictive Learning */}
          <div className="reveal-right md:col-span-2 lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-2xl font-bold mb-3 text-black">
              Predictive <span className="text-emerald-500">Learning</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Learns your routines and anticipates your needs before you even think about them.
            </p>
          </div>

          {/* Video/3D Block */}
          <div className="reveal-scale md:col-span-2 lg:col-span-1 md:row-span-2 bg-gray-900 rounded-2xl overflow-hidden border border-emerald-500/30">
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">3D Demo</p>
              </div>
            </div>
          </div>

          {/* Smart Environment - Large Block */}
          <div className="reveal-scale md:col-span-2 lg:col-span-2 bg-emerald-500 rounded-2xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-3">Smart Environment</h3>
            <p className="text-emerald-100 leading-relaxed mb-4">
              Transforms every space into a smart, human-centered environment.
            </p>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
              <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
              <div className="w-3 h-3 bg-white rounded-full opacity-40"></div>
            </div>
          </div>

          {/* Energy Efficiency */}
          <div className="reveal-left md:col-span-1 lg:col-span-1 bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500 mb-1">85%</div>
              <p className="text-xs text-gray-400">Energy Saved</p>
            </div>
          </div>

          {/* AI Learning */}
          <div className="reveal-right md:col-span-1 lg:col-span-1 bg-white rounded-2xl p-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs text-gray-600 font-medium">AI Learning</p>
            </div>
          </div>

          {/* Comfort Zone */}
          <div className="reveal-scale md:col-span-2 lg:col-span-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 border border-emerald-500/20">
            <h3 className="text-xl font-bold text-white mb-2">Comfort Zone</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Perfect lighting and climate automatically adjusted for maximum comfort and productivity.
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex-1 h-1 bg-emerald-500 rounded-full"></div>
              <span className="text-emerald-500 text-xs font-medium">Optimal</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
