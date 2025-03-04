'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="w-20">
            <Image
              src="/images/svgLogos/__Logo_Icon_Inverted.svg"
              alt="Limi Logo"
              width={100}
              height={40}
              priority
            />
          </div>
          
          <nav className="hidden md:flex items-center gap-6 lg:gap-12">
            <Link href="#products" className="text-white relative group">
              <span className="relative text-base lg:text-lg">
                Products
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#93cfa2] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href="#features" className="text-white relative group">
              <span className="relative text-base lg:text-lg">
                Features
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#93cfa2] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href="#about" className="text-white relative group">
              <span className="relative text-base lg:text-lg">
                About
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#93cfa2] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href="#contact" className="text-white relative group">
              <span className="relative text-base lg:text-lg">
                Contact
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#93cfa2] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50"
            onClick={toggleMobileMenu}
          >
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-opacity ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Mobile menu */}
          <div className={`md:hidden fixed inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <nav className="flex flex-col items-center gap-8">
              <Link href="#products" className="text-white text-xl" onClick={() => setMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href="#features" className="text-white text-xl" onClick={() => setMobileMenuOpen(false)}>
                Features
              </Link>
              <Link href="#about" className="text-white text-xl" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="#contact" className="text-white text-xl" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </div>

          <button className="px-4 py-2 lg:px-6 lg:py-2 rounded-full border border-[#93cfa2] text-[#93cfa2] text-sm lg:text-lg
            transition-all duration-300
            hover:bg-[#93cfa2]/10
            hover:border-[#93cfa2]
            hover:text-[#93cfa2]
            hover:shadow-[0_0_20px_rgba(147,207,162,0.3)]
            hover:scale-105
            active:scale-100
            focus:outline-none focus:ring-2 focus:ring-[#93cfa2] focus:ring-opacity-50">
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
