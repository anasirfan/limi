'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative z-10 flex items-center justify-between px-4 md:px-20 py-25 min-h-screen">
      <div className="flex-1 max-w-2xl">
        {/* Main Title */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          The AI that 
          <br />
          adopts to you.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-white/85 mt-5 leading-relaxed max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          Huly, an open-source platform, serves as an all-in-one replacement of Linear, Jira, Slack, and Notion.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="mt-10 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFEDD5] to-[#FF5733] text-black font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 15px #FF5733"
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: "0 4px 20px rgba(255,87,51,0.4)"
          }}
        >
          <motion.span
            animate={{ 
              textShadow: [
                "0 0 0px rgba(255,87,51,0)",
                "0 0 5px rgba(255,87,51,0.3)",
                "0 0 0px rgba(255,87,51,0)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            SEE IN ACTION
          </motion.span>
          <motion.svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.button>
      </div>

      {/* Right Visual - Floating UI Elements */}
      <div className="hidden lg:block flex-1 relative">
        <motion.div
          className="absolute right-[10%] top-[20%] opacity-10 text-white text-lg"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm">Task Cards</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-white/20 rounded w-3/4"></div>
              <div className="h-2 bg-white/20 rounded w-1/2"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute right-[5%] top-[40%] opacity-10 text-white text-sm"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -10, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-xs">Notifications</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded w-full"></div>
          </div>
        </motion.div>

        <motion.div
          className="absolute right-[15%] top-[65%] opacity-10 text-white text-xs"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.1, 0.18, 0.1]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              <span className="text-xs">Messages</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
