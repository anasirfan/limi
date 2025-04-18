'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuContentRef = useRef(null);
  const menuItemRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (!menuRef.current || !menuContentRef.current) return;

    const menuTl = gsap.timeline({ paused: true });

    menuTl.set('.navigation', { opacity: 0, x: -200 });
    // Paper rolling effect
    menuTl.fromTo(menuRef.current,
      { height: 0, opacity: 0 },
      { height: '100vh', opacity: 1, duration: 0.5, ease: 'power3.inOut' }
    );

    menuTl.fromTo(menuContentRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 },
      "-=0.2"
    );
    menuTl.to('.navigation', { opacity: 1, x: 0, duration: .5 , stagger: .3}, "-=0.1");

    if (menuOpen) {
      menuTl.play();
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(menuContentRef.current, { clearProps: 'all' });
        }
      });
    }

    return () => {
      menuTl.kill();
    };
  }, [menuOpen]);

  const sections = [
    { id: 'hero', label: 'Home' },
    // { id: 'motive', label: 'Our Vision' },
    { id: 'interactive', label: 'Our Journey' },
    // { id: 'cube', label: 'Experience LIMI' },
    { id: 'lighting-carousel', label: 'Explore Smart Lighting' },
    { id: 'model', label: 'Transformation' },
    { id: 'lighting', label: 'Configurations' },
    { id: 'analytics-insights', label: 'Analytics Insights' },
    { id: 'distributor-hub', label: 'Become a Distributor' },
  ];

  const links = [
    { href: '/product-catalog', label: 'Product Catalog' },
    { href: '/tools', label: 'Tools' },
  ];

  const handleNavClick = (id) => {
    setMenuOpen(false);

    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] font-['Poppins']">
      <div className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="w-16">
            <Image
              src="/images/svgLogos/__Logo_Icon_Inverted.svg"
              alt="Limi Logo"
              width={100}
              height={40}
              priority
            />
          </div>

          {/* Hamburger button */}
          <button
            className="flex flex-col justify-center items-center w-10 h-10 z-50 relative"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-7 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
            ></span>
            <span
              className={`block w-7 h-0.5 bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
            ></span>
            <span
              className={`block w-7 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Paper rolling menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-full bg-charcoal/95 backdrop-blur-lg overflow-hidden z-40 origin-top`}
        style={{ height: 0, opacity: 0 }}
      >
        <div
          ref={menuContentRef}
          className="container mx-auto px-4 py-20 h-full flex flex-col justify-center items-center"
        >
          <nav className=" flex flex-col items-center gap-6 text-softBeige">
            {sections.map((section) => (
              <button
                key={section.id}
                ref={menuItemRef}
                onClick={() => handleNavClick(section.id)}
                className="navigation text-2xl  md:text-3xl font-['Amenti']  hover:text-emerald transition-colors duration-300 relative group"
              >
                <span className="relative group inline-block pb-1 !text-white">
                  {section.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-white group-hover:w-full transition-all duration-1000 ease-in-out"></span>
                </span>
              </button>
            ))}
            
            {/* External page links */}
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="navigation text-2xl md:text-3xl font-['Amenti'] hover:text-emerald transition-colors duration-300 relative group"
              >
                <span className="relative group inline-block pb-1 !text-white">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-white group-hover:w-full transition-all duration-1000 ease-in-out"></span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
