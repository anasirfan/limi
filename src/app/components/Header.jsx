'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../redux/slices/userSlice';
import { removeFromCart } from '../redux/slices/cartSlice';
import { removeFromFavorites } from '../redux/slices/favoritesSlice';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { FaUser, FaSignOutAlt, FaUserCircle, FaBell, FaPortrait, FaTachometerAlt, FaChevronDown, FaHeart, FaShoppingCart, FaTrash, FaTimes, FaSignInAlt, FaComments } from 'react-icons/fa';

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [favoritesDropdownOpen, setFavoritesDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const menuRef = useRef(null);
  const menuContentRef = useRef(null);
  const userDropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);
  const favoritesDropdownRef = useRef(null);

  // Always call hooks unconditionally
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const favoritesData = useSelector((state) => state.favorites);
  const userData = useSelector((state) => state.user);
  

  // Then use the data conditionally
  const cart = isClient ? cartData : { items: [], totalQuantity: 0, totalAmount: 0 };
  const favorites = isClient ? favoritesData : { items: [] };

  const { isLoggedIn, user } = userData || { isLoggedIn: false, user: null };
  console.log("data",userData)
  // Get current path to determine which navigation to show
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const isAdmin = user?.role === 'admin';

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

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
    setCartDropdownOpen(false);
    setFavoritesDropdownOpen(false);
  };

  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
    setUserDropdownOpen(false);
    setFavoritesDropdownOpen(false);
  };

  const toggleFavoritesDropdown = () => {
    setFavoritesDropdownOpen(!favoritesDropdownOpen);
    setUserDropdownOpen(false);
    setCartDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
  };

  const handleRemoveFromCart = (e, id) => {
    e.stopPropagation();
    dispatch(removeFromCart(id));
  };

  const handleRemoveFromFavorites = (e, id) => {
    e.stopPropagation();
    dispatch(removeFromFavorites(id));
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
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setCartDropdownOpen(false);
      }
      if (favoritesDropdownRef.current && !favoritesDropdownRef.current.contains(event.target)) {
        setFavoritesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Homepage section links (for scrolling)
  const sections = [
    { href: '/configurator', label: 'Customize Yourself' },
    { href: '/portal', label: 'Your Space' },
    { href: '/about-us', label: 'What is LIMI?' },
    { href: '/contact-us', label: "Let's Talk" },
    { href: '/collaborate', label: 'Let’s Grow Together' },
  ];

  // Standard navigation links for all other pages
  const standardLinks = [
    // { href: '/', label: 'Home' },
    { href: '/configurator', label: 'Customize Yourself' },
    { href: '/portal', label: 'Your Space' },
    { href: '/about-us', label: 'What is LIMI?' },
    { href: '/contact-us', label: "Let's Talk" },
    { href: '/collaborate', label: 'Let’s Grow Together' },
  ];

  // Links to show based on current page - keeping standard links for all pages
  const links = standardLinks;

  // Fix: Use href for navigation, not id/scroll, for mobile menu
  // (The original code tried to scroll to an element by id, but the sections are not in the DOM, so use router.push instead)
  const handleMobileNav = (href) => {
    setMenuOpen(false);
    router.push(href);
  };

  // State for scroll behavior
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Determine scroll direction
      if (scrollPosition > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      // Update last scroll position
      lastScrollY.current = scrollPosition;

      // Set scrolled state based on position
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-[9999] font-['Poppins'] transition-all duration-300 ${isScrolled ? 'py-1.5' : 'py-3'} ${isScrolled && scrollDirection === 'down' ? '-translate-y-1' : 'translate-y-0'}`}>
      <div className="absolute inset-0 bg-[#2B2D2F] shadow-md"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className={`${isScrolled ? 'w-10 py-1.5' : 'w-16 py-0'} transition-all duration-300 hover:scale-105`}>
              <Image
                src="/images/svgLogos/__Logo_Icon_Inverted.svg"
                alt="Limi Logo"
                width={isScrolled ? 80 : 100}
                height={isScrolled ? 32 : 40}
                priority
                className="drop-shadow-glow"
              />
            </Link>

            {/* Standard Navigation Links (visible on all pages, hidden when scrolled down) */}
            <div className={`hidden md:flex items-center space-x-6 ${isScrolled && scrollDirection === 'down' ? 'opacity-0 invisible' : 'opacity-100 visible'} transition-all duration-300`}>
              {standardLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-[#50C878] transition-all duration-300 relative group font-medium"
                >
                  <span className="relative inline-block">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#50C878] group-hover:w-full transition-all duration-300 ease-in-out"></span>
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
              {!isClient ? (
                <div className="w-[120px] h-[36px] bg-[#50C878] rounded-md"></div>
              ) : !isLoggedIn ? (
                <Link
                  href="/portal"
                  className={`${isScrolled ? 'px-2.5 py-1.5' : 'px-4 py-1.5'} text-charleston-green bg-[#50C878] hover:bg-[#87CEAB] transition-all duration-300 rounded-md ${isScrolled ? 'text-xs' : 'text-sm'} font-medium shadow-md hover:shadow-[#50C878]/40 flex items-center justify-center`}
                >
                  {isScrolled ? <FaSignInAlt size={16} /> : 'Login / Sign Up'}
                </Link>
              ) : (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={toggleUserDropdown}
                    className={`flex items-center ${isScrolled ? 'gap-1 px-2.5 py-1.5' : 'gap-2 px-3 py-1.5'} text-white hover:text-[#50C878] transition-all duration-300 bg-[#3a3d42] rounded-full border border-[#50C878]/20 hover:border-[#50C878]/40 shadow-md`}
                    aria-label="User menu"
                  >
                    <div className={`${isScrolled ? 'w-6 h-6' : 'w-7 h-7'} rounded-full bg-emerald flex items-center justify-center overflow-hidden transition-all duration-300`}>
                     
                      {user?.data?.profilePicture?.url ? (
                        <Image
                          src={user?.data?.profilePicture?.url}
                          alt={user?.data?.username}
                          width={28}
                          height={28}
                          className="object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-xl text-charleston-green" />
                      )}
                    </div>
                    <span className={`${isScrolled ? 'hidden' : 'hidden sm:inline'} text-sm font-medium transition-all duration-300`}>{user?.data?.username || 'User'}</span>
                    <FaChevronDown className={`text-xs transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown menu */}
                  {isClient && userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-charleston-green-dark border border-charleston-green-light rounded-lg shadow-xl py-2 z-50 backdrop-blur-md">
                      <div className="px-4 py-2 border-b border-charleston-green-light">
                        <p className="text-sm font-medium text-emerald">{user?.data?.username || 'User'}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.data?.email || 'user@example.com'}</p>
                      </div>

                      <Link
                        href="/portal"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-emerald/10 hover:text-emerald transition-colors duration-200"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <FaPortrait className="text-emerald" />
                        Your Space
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
        className={`fixed top-0 left-0 w-full bg-[#2B2D2F] overflow-hidden z-40 origin-top`}
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
                key={section.label}
                type="button"
                className="navigation text-2xl md:text-3xl font-['Amenti'] hover:text-emerald transition-colors duration-300 relative group"
                onClick={() => handleMobileNav(section.href)}
                tabIndex={0}
              >
                <span className="relative group inline-block pb-1 !text-white">
                  {section.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-white group-hover:w-full transition-all duration-1000 ease-in-out"></span>
                </span>
              </button>
            ))}

            {/* Standard navigation links - shown on all other pages */}
            {!isHomePage && standardLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                className="navigation text-2xl md:text-3xl font-['Amenti'] hover:text-emerald transition-colors duration-300 relative group"
                onClick={() => handleMobileNav(link.href)}
                tabIndex={0}
              >
                <span className="relative group inline-block pb-1 !text-white">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-white group-hover:w-full transition-all duration-1000 ease-in-out"></span>
                </span>
              </button>
            ))}

            {/* Admin Dashboard Link - only shown if user is admin and not on homepage */}
            {!isHomePage && isLoggedIn && isAdmin && (
              <button
                type="button"
                className="navigation text-2xl md:text-3xl font-['Amenti'] text-emerald hover:text-emerald-light transition-colors duration-300 relative group"
                onClick={() => handleMobileNav('/dashboard')}
                tabIndex={0}
              >
                <span className="relative group inline-block pb-1">
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-white group-hover:w-full transition-all duration-1000 ease-in-out"></span>
                </span>
              </button>
            )}

            {/* Auth Link */}
            {!isLoggedIn && (
              <button
                type="button"
                className="navigation text-2xl md:text-3xl font-['Amenti'] text-emerald hover:text-emerald-light transition-colors duration-300 relative group"
                onClick={() => handleMobileNav('/portal')}
                tabIndex={0}
              >
                <span className="relative group inline-block pb-1">
                  Login / Sign Up
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-white group-hover:w-full transition-all duration-1000 ease-in-out"></span>
                </span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
