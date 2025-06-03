'use client';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-sm:mt-10">
        {/* Responsive grid: stack on mobile, grid on md+ */}
        <div className="flex flex-col gap-10 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-start md:col-span-2 lg:col-span-1">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full">
              <Image
                src="/images/svgLogos/__Logo_Icon_Inverted.svg"
                alt="Limi Logo"
                width={80}
                height={32}
                className="mb-4 sm:mb-0 sm:w-32"
              />
              <p className="text-sm md:text-base font-[Poppins] text-[#f3ebe2] max-w-xs sm:mr-4">
                Seamlessly blending smart technology with modern design
              </p>
            </div>
          </div>

          {/* Products & Features */}
          <div className="flex flex-col xl:mx-16 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold font-[Amenti] mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/configurator" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Customize Yourself
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Your Space
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  What is LIMI?
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Let's Talk
                </Link>
              </li>
              <li>
                <Link href="/collaborate" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Let’s Grow Together
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col xl:mx-16">
            <h3 className="text-lg font-semibold font-[Amenti] mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:hello@limilighting.com" className="text-gray-300 hover:text-emerald-500 transition-colors">hello@limilighting.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 mb-10 sm:mb-0 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} LIMI Lighting. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-2 md:flex-row md:space-x-6 md:gap-0">
            {/* Mobile view - Privacy & Terms on one line, Cookie Policy on another */}
            <div className="flex flex-col sm:hidden items-center">
              <div className="flex">
                <Link href="/privacy-policy" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Privacy Policy |
                </Link>
                <Link href="/terms-of-service" className="text-gray-300 pl-1 hover:text-emerald-500 transition-colors">
                  Terms of Service
                </Link>
              </div>
              <Link href="/cookie-policy" className="text-gray-300 hover:text-emerald-500 transition-colors mt-2">
                Cookie Policy
              </Link>
            </div>
            {/* Desktop view - All links in one line */}
            <div className="hidden sm:flex space-x-6">
              <Link href="/privacy-policy" className="text-gray-300 hover:text-emerald-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-300 hover:text-emerald-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-gray-300 hover:text-emerald-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
