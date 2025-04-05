'use client';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 overflow-hidden ">
      <div className="container mx-auto px-4 md:px-6 max-sm:mt-24">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="mb-6 max-sm:flex max-sm:space-x-4 max-sm:items-center mx-auto">
              <Image
                src="/images/svgLogos/__Logo_Icon_Inverted.svg"
                alt="Limi Logo"
                width={80}
                height={32}
                className="mb-4 max-sm:w-32"
              />
              <p className=" text-sm md:text-base font-[Poppins] mr-4 text-[#f3ebe2] max-w-xs">
              Seamlessly blending smart technology with modern design </p>
            </div>
            <div className="flex space-x-4 max-sm:mx-auto max-sm:w-40">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#93cfa2] hover:text-[#54bb74] transition-colors">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#93cfa2] hover:text-[#54bb74] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#93cfa2] hover:text-[#54bb74] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="xl:mx-16 ">
            <h3 className="text-lg font-semibold font-[Amenti] mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#hero" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#motive" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Our Vision
                </Link>
              </li>
              <li>
                <Link href="#interactive" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Our Journey
                </Link>
              </li>
              <li>
                <Link href="#cube" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Experience LIMI
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Features */}
          <div className="xl:mx-16">
            <h3 className="text-lg font-semibold font-[Amenti] mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#analytics-insights" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Analytics Insights
                </Link>
              </li>
              <li>
                <Link href="#lighting-carousel" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Smart Lighting
                </Link>
              </li>
              <li>
                <Link href="#model" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Transformation
                </Link>
              </li>
              <li>
                <Link href="#lighting" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Configurations
                </Link>
              </li>
              <li>
                <Link href="#distributor-hub" className="text-gray-300 hover:text-emerald-500 transition-colors">
                  Become a Distributor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="xl:mx-16">
            <h3 className="text-lg font-semibold font-[Amenti] mb-4">Contact Us</h3>
            <ul className="space-y-2">
              
              <li className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:info@limi3d.com" className="text-gray-300 hover:text-emerald-500 transition-colors">info@limi.com</a>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LIMI 3D. All rights reserved.
          </p>
          <div className="flex space-x-6">
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
    </footer>
  );
};

export default Footer;
