'use client';
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CookiePolicy() {
  return (
    <main className="bg-[#292929] text-white min-h-screen pt-[100px]">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 font-[Amenti] text-[#93cfa2]">Cookie Policy</h1>
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-300">Last Updated: April 5, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">1. Introduction</h2>
          <p>
            This Cookie Policy explains how LIMI 3D ("we," "our," or "us") uses cookies and similar technologies on our website. This policy should be read alongside our Privacy Policy, which explains how we use personal information.
          </p>
          <p>
            By continuing to browse or use our website, you agree to our use of cookies as described in this policy.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">2. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
          </p>
          <p>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">3. Types of Cookies We Use</h2>
          <p>
            We use different types of cookies for various purposes:
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Performance and Analytics Cookies</h3>
          <p>
            These cookies collect information about how visitors use our website, such as which pages they visit most often and if they receive error messages. This data helps us improve our website and your browsing experience. All information collected by these cookies is aggregated and anonymous.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Functionality Cookies</h3>
          <p>
            These cookies allow our website to remember choices you make (such as your language preference or the region you are in) and provide enhanced, personalized features. They may be set by us or by third-party providers whose services we have added to our pages.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.4 Targeting and Advertising Cookies</h3>
          <p>
            These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns. They remember that you have visited a website and this information may be shared with other organizations, such as advertisers.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">4. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may include:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300">
            <li>Analytics cookies from Google Analytics</li>
            <li>Social media cookies from Facebook, Twitter, LinkedIn, etc.</li>
            <li>Advertising cookies from Google AdSense, Facebook Pixel, etc.</li>
            <li>Functionality cookies from various service providers</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">5. Cookie Management</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you.
          </p>
          <p>
            To manage cookies on different browsers, please refer to the following links:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#93cfa2] hover:text-[#54bb74] transition-colors">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[#93cfa2] hover:text-[#54bb74] transition-colors">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#93cfa2] hover:text-[#54bb74] transition-colors">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#93cfa2] hover:text-[#54bb74] transition-colors">Microsoft Edge</a></li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">6. Do Not Track Signals</h2>
          <p>
            Some browsers have a "Do Not Track" feature that signals to websites that you visit that you do not want to have your online activity tracked. Our website does not currently respond to "Do Not Track" signals.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">7. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to check this page periodically for any changes.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">8. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
          </p>
          <p className="text-gray-300">
            LIMI 3D<br />
            Please use the contact form on our website to reach us.
          </p>
          
          <div className="mt-12 mb-8 border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400">
              <Link href="/" className="text-[#93cfa2] hover:text-[#54bb74] transition-colors">
                Return to Homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
