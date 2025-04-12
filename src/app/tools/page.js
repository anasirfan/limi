'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToolsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Add title to document
  useEffect(() => {
    document.title = "LIMI Tools | Webmail & CRM Dashboard";
    // Simulate loading for smooth animation entrance
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#292929] text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-emerald/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-emerald/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header with back button and logo */}
      <header className="container mx-auto px-4 py-8 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center text-emerald hover:text-emerald/80 transition-colors group">
          <div className="relative overflow-hidden rounded-full mr-2 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="relative overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">Back to Home</span>
          </span>
        </Link>
        <div className="w-12 h-12 relative">
          <Image
            src="/images/svgLogos/__Logo_Icon_Inverted.svg"
            alt="Limi Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <AnimatePresence>
          {isLoaded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald/90">
                  LIMI Tools
                </h1>
                <div className="flex justify-center mb-2">
                  <div className="h-1 w-24 bg-gradient-to-r from-emerald to-emerald/30 rounded-full"></div>
                </div>
                <p className="text-xl text-center mb-16 text-gray-300 max-w-2xl mx-auto">
                  Access our professional tools and resources
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* Webmail Card */}
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative bg-gradient-to-br from-charcoal/80 to-charcoal/40 backdrop-blur-md border border-emerald/10 rounded-2xl p-8 shadow-xl overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald/5 rounded-full blur-2xl group-hover:bg-emerald/10 transition-colors duration-700"></div>
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald/5 rounded-full blur-2xl group-hover:bg-emerald/10 transition-colors duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-emerald/10 rounded-xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-white group-hover:text-emerald transition-colors duration-300">Webmail</h2>
                    </div>
                    
                    <p className="mb-8 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      Access your LIMI email account through our secure webmail portal with full functionality.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <Link 
                        href="https://mail.limi-lighting.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#292929] text-[#54BB74] border border-[#54BB74] rounded-lg hover:bg-[#54BB74] hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald/20 w-full sm:w-auto"
                      >
                        <span>Open Webmail</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                      
                      <Link 
                        href="/email-setup" 
                        className="inline-flex items-center justify-center text-emerald hover:text-white transition-colors duration-300 group-hover:underline w-full sm:w-auto"
                      >
                        <span>Email Setup Guide</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* CRM Dashboard Card */}
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative bg-gradient-to-br from-charcoal/80 to-charcoal/40 backdrop-blur-md border border-emerald/10 rounded-2xl p-8 shadow-xl overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald/5 rounded-full blur-2xl group-hover:bg-emerald/10 transition-colors duration-700"></div>
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald/5 rounded-full blur-2xl group-hover:bg-emerald/10 transition-colors duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-emerald/10 rounded-xl mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-white group-hover:text-emerald transition-colors duration-300">CRM Dashboard</h2>
                    </div>
                    
                    <p className="mb-8 text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      Manage customer relationships, track leads, and monitor sales performance through our comprehensive CRM system.
                    </p>
                    
                    <Link 
                      href="https://crm.limi-lighting.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#292929] text-[#54BB74] border border-[#54BB74] rounded-lg hover:bg-[#54BB74] hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald/20 w-full sm:w-auto"
                    >
                      <span>Open CRM Dashboard</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-auto relative z-10">
        <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} LIMI Lighting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
