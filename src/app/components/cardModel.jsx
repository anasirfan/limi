import React from 'react'

const cardModel = () => {
  return (
    <div ref={featuresRef} className="absolute w-full top-1/2 left-0">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              {/* Initial Heading */}
              <div className="feature-heading absolute w-full">
                <div
                  className={`text-[120px] font-bold ${
                    index % 2 === 0 ? "text-left" : "text-right"
                  }`}
                >
                  <span className="text-emerald-400/30">{feature.index}</span>
                  <h3 className="text-[60px] font-bold text-[#E6E8E6]">
                    {feature.title}
                  </h3>
                </div>
              </div>

              {/* Feature Card */}
              <div className="feature-card fixed top-1/2 right-8 w-[45%] p-8 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-500">
                <div className="text-emerald-400/30 text-8xl font-bold absolute -top-8 -left-4 select-none">
                  {feature.index}
                </div>

                <div className="card-content">
                  <h3 className="text-3xl font-bold mb-4 relative text-[#E6E8E6]">
                    {feature.title}
                    <div className="absolute -bottom-1 left-0 w-16 h-px bg-gradient-to-r from-emerald-400/50 to-transparent" />
                  </h3>

                  <p className="text-lg leading-relaxed mb-6 text-[#E6E8E6]/80">
                    {feature.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-medium uppercase tracking-wider mb-3 text-[#E6E8E6]/70">
                        Features
                      </h4>
                      <ul className="space-y-2">
                        {feature.features.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center space-x-2 text-[#E6E8E6]/80"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium uppercase tracking-wider mb-3 text-[#E6E8E6]/70">
                        Impact
                      </h4>
                      <p className="text-[#E6E8E6]/80">{feature.impact}</p>

                      <div className="mt-4">
                        <div className="h-2 rounded-full overflow-hidden bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400/50 to-emerald-200/30"
                            style={{
                              width:
                                feature.efficiency
                                  .split("-")[1]
                                  .replace("%", "") + "%",
                            }}
                          />
                        </div>
                        <div className="text-sm text-[#E6E8E6]/50 mt-1">
                          Efficiency: {feature.efficiency}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
  )
}

export default cardModel