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
    <header className="fixed top-0 left-0 right-0 z-50 font-['Poppins']">
      <div className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm"></div>
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

          <nav className="hidden md:flex items-center gap-6 lg:gap-12 text-softBeige">
            {['Products', 'Features', 'About', 'Contact'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="relative group font-['Amenti'] text-base lg:text-lg">
                <span className="relative">
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            ))}
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
          <div
            className={`md:hidden fixed inset-0 bg-charcoal/10 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <nav className="flex flex-col items-center gap-8 text-softBeige">
              {['Products', 'Features', 'About', 'Contact'].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="text-xl font-['Amenti']" onClick={() => setMobileMenuOpen(false)}>
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <button
            className="px-4 py-2 lg:px-6 lg:py-2 rounded-full border border-emerald text-emerald text-sm lg:text-lg
            transition-all duration-300 font-['Poppins']
            hover:bg-emerald/10 hover:border-emerald hover:text-emerald
            hover:shadow-[0_0_20px_rgba(84,187,116,0.3)] hover:scale-105
            active:scale-100 focus:outline-none focus:ring-2 focus:ring-emerald focus:ring-opacity-50"
          >
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
