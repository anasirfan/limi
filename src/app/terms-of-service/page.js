'use client';
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <main className="bg-[#292929] text-white min-h-screen pt-[100px]">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 font-[Amenti] text-[#93cfa2]">Terms of Service</h1>
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-300">Last Updated: April 5, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">1. Acceptance of Terms</h2>
          <p>
            Welcome to LIMI 3D. These Terms of Service ("Terms") govern your access to and use of our website, products, and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">2. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website with a new "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the new Terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">3. Using Our Services</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Eligibility</h3>
          <p>
            You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this requirement.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Account Registration</h3>
          <p>
            Some of our services may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating an account and to update your information to keep it accurate and current.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Prohibited Conduct</h3>
          <p>
            You agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Use our services for any illegal or unauthorized purpose</li>
            <li>Interfere with or disrupt our services or servers</li>
            <li>Attempt to gain unauthorized access to any part of our services</li>
            <li>Use automated means to access or use our services without our permission</li>
            <li>Transmit any viruses, malware, or other harmful code</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">4. Intellectual Property</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Our Intellectual Property</h3>
          <p>
            Our services, including all content, features, and functionality, are owned by LIMI 3D or our licensors and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our materials without our express written consent.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Trademarks</h3>
          <p>
            The LIMI 3D name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of LIMI 3D or our affiliates. You may not use these marks without our prior written permission.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">5. Products and Services</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Product Information</h3>
          <p>
            We strive to provide accurate product descriptions, pricing, and availability information. However, we do not warrant that product descriptions or other content on our site are accurate, complete, reliable, current, or error-free.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Orders and Payments</h3>
          <p>
            All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Payment must be made at the time of order. We accept various payment methods as indicated on our website.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Shipping and Delivery</h3>
          <p>
            Shipping and delivery times are estimates only and cannot be guaranteed. We are not liable for any delays in delivery. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">6. Warranties and Disclaimers</h2>
          <p>
            OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p>
            WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT OUR SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">7. Limitation of Liability</h2>
          <p>
            TO THE FULLEST EXTENT PERMITTED BY LAW, LIMI 3D SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300">
            <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE OUR SERVICES</li>
            <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON OUR SERVICES</li>
            <li>ANY CONTENT OBTAINED FROM OUR SERVICES</li>
            <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
          </ul>
          <p>
            IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU TO US DURING THE TWELVE (12) MONTH PERIOD PRIOR TO THE DATE OF THE CLAIM.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">8. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless LIMI 3D and our officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300">
            <li>Your use of our services</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another</li>
            <li>Your conduct in connection with our services</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">9. Governing Law and Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located in San Francisco County, California.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">10. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the Terms shall otherwise remain in full force and effect and enforceable.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">11. Entire Agreement</h2>
          <p>
            These Terms constitute the entire agreement between you and LIMI 3D regarding our services and supersede all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
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
