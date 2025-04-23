'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { FaUser, FaSignOutAlt, FaUserCircle, FaBell, FaPortrait, FaTachometerAlt, FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const menuContentRef = useRef(null);
  const menuItemRef = useRef(null);
  const userDropdownRef = useRef(null);
  
  // Get current path to determine which navigation to show
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  // Redux state for user authentication
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const isAdmin = user?.role === 'admin';
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Close user dropdown when opening menu
    if (!menuOpen) setUserDropdownOpen(false);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };
  
  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
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
  
  // Handle clicks outside of user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Homepage section links (for scrolling)
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'interactive', label: 'Our Journey' },
    { id: 'lighting-carousel', label: 'Explore Smart Lighting' },
    { id: 'model', label: 'Transformation' },
    { id: 'lighting', label: 'Configurations' },
    { id: 'analytics-insights', label: 'Analytics Insights' },
    { id: 'distributor-hub', label: 'Become a Distributor' },
  ];

  // Standard navigation links for all other pages
  const standardLinks = [
    { href: '/', label: 'Home' },
    { href: '/product-catalog', label: 'Product Catalog' },
    { href: '/configurator', label: 'Configurator' },
    { href: '/portal', label: 'Portal' },
    { href: '/about-us', label: 'About Us' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/collaborate', label: 'Collaborate With Us' },
  ];
  
  // Links to show based on current page - keeping standard links for all pages
  const links = standardLinks;

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
      <div className="container mx-auto px-4 py-3 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="w-16 transition-transform hover:scale-105">
              <Image
                src="/images/svgLogos/__Logo_Icon_Inverted.svg"
                alt="Limi Logo"
                width={100}
                height={40}
                priority
                className="drop-shadow-glow"
              />
            </Link>
            
            {/* Standard Navigation Links (visible on all pages) */}
            <div className="hidden md:flex items-center space-x-6">
              {standardLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-white hover:text-emerald transition-all duration-300 relative group font-medium"
                >
                  <span className="relative inline-block">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </span>
                </Link>
              ))}
              
              {/* Admin Dashboard Link (only shown if user is admin) */}
              {isLoggedIn && isAdmin && (
                <Link 
                  href="/dashboard" 
                  className="text-emerald hover:text-emerald-light transition-all duration-300 relative group font-medium"
                >
                  <span className="relative inline-block">
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </span>
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Hamburger button - hidden on desktop, visible on mobile */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50 relative"
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
            
            {/* Auth Button and User Menu - positioned at extreme right */}
            <div className="flex items-center">
              {!isLoggedIn ? (
                <Link 
                  href="/portal" 
                  className="px-4 py-1.5 text-charleston-green bg-emerald hover:bg-emerald-light transition-all duration-300 rounded-md text-sm font-medium shadow-sm hover:shadow-emerald/40"
                >
                  Login / Sign Up
                </Link>
              ) : (
                <div className="relative" ref={userDropdownRef}>
                  <button 
                    onClick={toggleUserDropdown}
                    className="flex items-center gap-2 text-white hover:text-emerald transition-colors duration-300 bg-charleston-green-light/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald/20 hover:border-emerald/40"
                    aria-label="User menu"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald flex items-center justify-center overflow-hidden">
                      {user?.avatar ? (
                        <Image 
                          src={user.avatar} 
                          alt="User avatar" 
                          width={28} 
                          height={28} 
                          className="object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-xl text-charleston-green" />
                      )}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{user?.name || 'User'}</span>
                    <FaChevronDown className={`text-xs transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-charleston-green-dark border border-charleston-green-light rounded-lg shadow-xl py-2 z-50 backdrop-blur-md">
                      <div className="px-4 py-2 border-b border-charleston-green-light">
                        <p className="text-sm font-medium text-emerald">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                      </div>
                      
                      <Link 
                        href="/notifications"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-emerald/10 hover:text-emerald transition-colors duration-200"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <FaBell className="text-emerald" />
                        Notifications
                      </Link>
                      
                      <Link 
                        href="/account"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-emerald/10 hover:text-emerald transition-colors duration-200"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <FaUser className="text-emerald" />
                        Account
                      </Link>
                      
                      <Link 
                        href="/portal"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-emerald/10 hover:text-emerald transition-colors duration-200"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <FaPortrait className="text-emerald" />
                        Portal
                      </Link>
                      
                      <Link 
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-emerald/10 hover:text-emerald transition-colors duration-200"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <FaTachometerAlt className="text-emerald" />
                        Dashboard
                      </Link>
                      
                      <div className="border-t border-charleston-green-light mt-1 pt-1">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-emerald/10 hover:text-emerald transition-colors duration-200 w-full text-left"
                        >
                          <FaSignOutAlt className="text-emerald" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
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
            {/* Homepage section links - only shown on homepage */}
            {isHomePage && sections.map((section) => (
              <button
                key={section.id}
                ref={menuItemRef}
                onClick={() => handleNavClick(section.id)}
                className="navigation text-2xl md:text-3xl font-['Amenti'] hover:text-emerald transition-colors duration-300 relative group"
              >
                <span className="relative group inline-block pb-1 !text-white">
                  {section.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-white group-hover:w-full transition-all duration-1000 ease-in-out"></span>
                </span>
              </button>
            ))}
            
            {/* Standard navigation links - shown on all other pages */}
            {!isHomePage && standardLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="navigation text-2xl md:text-3xl font-['Amenti'] hover:text-emerald transition-colors duration-300 relative group"
                onClick={() => setMenuOpen(false)}
              >
                <span className="relative group inline-block pb-1 !text-white">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-white group-hover:w-full transition-all duration-1000 ease-in-out"></span>
                </span>
              </Link>
            ))}
            
            {/* Admin Dashboard Link - only shown if user is admin and not on homepage */}
            {!isHomePage && isLoggedIn && isAdmin && (
              <Link
                href="/dashboard"
                className="navigation text-2xl md:text-3xl font-['Amenti'] text-emerald hover:text-emerald-light transition-colors duration-300 relative group"
                onClick={() => setMenuOpen(false)}
              >
                <span className="relative group inline-block pb-1">
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-white group-hover:w-full transition-all duration-1000 ease-in-out"></span>
                </span>
              </Link>
            )}
            
            {/* Auth Link */}
            {!isLoggedIn && (
              <Link
                href="/portal"
                className="navigation text-2xl md:text-3xl font-['Amenti'] text-emerald hover:text-emerald-light transition-colors duration-300 relative group"
                onClick={() => setMenuOpen(false)}
              >
                <span className="relative group inline-block pb-1">
                  Login / Sign Up
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-white group-hover:w-full transition-all duration-1000 ease-in-out"></span>
                </span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
