'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmailSetupPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Add title to document
  useEffect(() => {
    document.title = "LIMI Email Setup Guide";
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

      {/* Header with back buttons and logo */}
      <header className="container mx-auto px-4 py-8 flex items-center justify-between relative z-10">
        <Link href="/tools" className="flex items-center text-emerald hover:text-emerald/80 transition-colors group">
          <div className="relative overflow-hidden rounded-full mr-2 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="relative overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">Back to Tools</span>
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
        <Link href="/" className="flex items-center text-emerald hover:text-emerald/80 transition-colors group">
          <span className="relative overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Home</span>
          </span>
          <div className="relative overflow-hidden rounded-full ml-2 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-8 pb-16 relative z-10">
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
                  Email Setup Guide
                </h1>
                <div className="flex justify-center mb-2">
                  <div className="h-1 w-24 bg-gradient-to-r from-emerald to-emerald/30 rounded-full"></div>
                </div>
                <p className="text-xl text-center mb-16 text-gray-300 max-w-2xl mx-auto">
                  Configure your LIMI email account on your preferred email client
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-gradient-to-br from-charcoal/80 to-charcoal/40 backdrop-blur-md border border-emerald/10 rounded-2xl p-8 shadow-xl mb-10 relative overflow-hidden group">
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
                      <h2 className="text-2xl font-bold text-white group-hover:text-emerald transition-colors duration-300">General Email Settings</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-emerald/10 hover:border-emerald/30 transition-colors duration-300">
                        <h3 className="text-xl font-semibold mb-4 text-emerald flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          IMAP Settings (Incoming Mail)
                        </h3>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Server:</span>
                            <span className="text-emerald">mail.limi-lighting.com</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Port:</span>
                            <span className="text-emerald">993</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Security:</span>
                            <span className="text-emerald">SSL/TLS</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Username:</span>
                            <span>Your full email address</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Password:</span>
                            <span>Your email password</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-emerald/10 hover:border-emerald/30 transition-colors duration-300">
                        <h3 className="text-xl font-semibold mb-4 text-emerald flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          SMTP Settings (Outgoing Mail)
                        </h3>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Server:</span>
                            <span className="text-emerald">mail.limi-lighting.com</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Port:</span>
                            <span className="text-emerald">587</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Security:</span>
                            <span className="text-emerald">STARTTLS</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Username:</span>
                            <span>Your full email address</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Password:</span>
                            <span>Your email password</span>
                          </li>
                          <li className="flex items-start">
                            <span className="font-medium text-white min-w-32">Authentication:</span>
                            <span>Required</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Microsoft Outlook Setup */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gradient-to-br from-charcoal/80 to-charcoal/40 backdrop-blur-md border border-emerald/10 rounded-2xl p-8 shadow-xl mb-10 relative overflow-hidden group">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald/5 rounded-full blur-2xl group-hover:bg-emerald/10 transition-colors duration-700"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald/5 rounded-full blur-2xl group-hover:bg-emerald/10 transition-colors duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-emerald/10 rounded-xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-emerald transition-colors duration-300">Microsoft Outlook Setup</h2>
                  </div>
                  <ol className="list-decimal pl-5 space-y-4 text-gray-300 bg-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-emerald/10 hover:border-emerald/30 transition-colors duration-300">
              <li>Open Microsoft Outlook.</li>
              <li>Go to <span className="text-white font-medium">File &gt; Add Account</span>.</li>
              <li>Select <span className="text-white font-medium">Manual setup or additional server types</span> and click <span className="text-white font-medium">Next</span>.</li>
              <li>Choose <span className="text-white font-medium">POP or IMAP</span> and click <span className="text-white font-medium">Next</span>.</li>
              <li>Enter your name, email address, and the IMAP and SMTP server information as listed above.</li>
              <li>Click <span className="text-white font-medium">More Settings</span> to configure the outgoing server to require authentication.</li>
              <li>Test the account settings and click <span className="text-white font-medium">Finish</span>.</li>
            </ol>
                </div>
              </motion.div>

              {/* Mobile Setup */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gradient-to-br from-charcoal/80 to-charcoal/40 backdrop-blur-md border border-emerald/10 rounded-2xl p-8 shadow-xl mb-10 relative overflow-hidden group">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald/5 rounded-full blur-2xl group-hover:bg-emerald/10 transition-colors duration-700"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald/5 rounded-full blur-2xl group-hover:bg-emerald/10 transition-colors duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-emerald/10 rounded-xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-emerald transition-colors duration-300">Mobile Device Setup</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-emerald/10 hover:border-emerald/30 transition-colors duration-300">
                      <h3 className="text-xl font-semibold mb-4 text-emerald flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        iOS (iPhone/iPad)
                      </h3>
              <ol className="list-decimal pl-5 space-y-4 text-gray-300">
                <li>Go to <span className="text-white font-medium">Settings &gt; Mail &gt; Accounts &gt; Add Account &gt; Other</span>.</li>
                <li>Tap <span className="text-white font-medium">Add Mail Account</span> and enter your name, email, password, and description.</li>
                <li>Tap <span className="text-white font-medium">Next</span> and select <span className="text-white font-medium">IMAP</span>.</li>
                <li>Enter the IMAP and SMTP server information as listed above.</li>
                <li>Tap <span className="text-white font-medium">Next</span> and then <span className="text-white font-medium">Save</span>.</li>
              </ol>
                    </div>
                    
                    <div className="bg-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-emerald/10 hover:border-emerald/30 transition-colors duration-300">
                      <h3 className="text-xl font-semibold mb-4 text-emerald flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Android
                      </h3>
              <ol className="list-decimal pl-5 space-y-4 text-gray-300">
                <li>Open the <span className="text-white font-medium">Email</span> or <span className="text-white font-medium">Gmail</span> app.</li>
                <li>Go to <span className="text-white font-medium">Settings &gt; Add Account &gt; Other</span>.</li>
                <li>Enter your email address and password.</li>
                <li>Select <span className="text-white font-medium">Manual setup</span> and choose <span className="text-white font-medium">IMAP account</span>.</li>
                <li>Enter the IMAP and SMTP server information as listed above.</li>
                <li>Tap <span className="text-white font-medium">Next</span> and complete the setup.</li>
              </ol>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 text-center"
              >
                <p className="mb-6 text-gray-300">
                  Need additional help setting up your email? Contact our IT support team.
                </p>
                <Link 
                  href="/tools" 
                  className="inline-flex items-center px-6 py-3 bg-[#292929] text-[#54BB74] border border-[#54BB74] rounded-lg hover:bg-[#54BB74] hover:text-white transition-all duration-300 group hover:shadow-lg hover:shadow-emerald/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to Tools</span>
                </Link>
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
