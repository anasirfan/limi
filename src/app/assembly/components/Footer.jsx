'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="relative"
    >
      <div className="p-10 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
          {/* Contact Info */}
          <div className="text-center w-full flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center text-gray-300">
                <FaEnvelope className="mr-3 text-[#54bb74] text-lg" />
                <span className="text-lg">@limiai.co</span>
              </div>
            </div>
          </div>

          {/* Logo/Brand */}
          <div className="text-center w-full flex flex-col items-center justify-center">
            <Image
              src="/images/svgLogos/__Icon_Wordmark_Inverted.svg"
              alt="LIMI Logo"
              width={120}
              height={40}
              className="h-8 w-auto mx-auto mb-3"
            />
            <p className="text-white/70 text-sm font-medium">
              Intelligent Modular Lighting
            </p>
          </div>

          {/* Social Links */}
          <div className="text-center w-full flex flex-col items-center justify-center">
            <h4 className="text-xl font-semibold text-white mb-4">
              Follow Us
            </h4>
            <div className="flex justify-center gap-4">
              <motion.a
                href="https://www.linkedin.com/company/limi-ai/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-[#54bb74] rounded-full flex items-center justify-center text-white hover:bg-[#93cfa2] transition-colors duration-300 shadow-lg"
                title="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/limi_uk/?igsh=N2t5ODNsbWFxcm8y#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-[#54bb74] rounded-full flex items-center justify-center text-white hover:bg-[#93cfa2] transition-colors duration-300 shadow-lg"
                title="Instagram"
              >
                <FaInstagram className="text-xl" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/30 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} LIMI AI. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-2">
            Comfort, Control, and Connection in One System{" "}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
