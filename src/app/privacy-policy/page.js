'use client';
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#292929] text-white min-h-screen pt-[100px]">
      <Header />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 font-[Amenti] text-[#93cfa2]">Privacy Policy</h1>
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-300">Last Updated: April 5, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">1. Introduction</h2>
          <p>
            LIMI 3D ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p>
            We value your trust and strive to be transparent about our data practices. Please read this policy carefully to understand our practices regarding your personal data.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300">
            <li>Register for an account</li>
            <li>Sign up for our newsletter</li>
            <li>Contact our customer service</li>
            <li>Place an order or request a quote</li>
            <li>Apply to become a distributor</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>
            This information may include your name, email address, phone number, company name, mailing address, and payment information.
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Automatically Collected Information</h3>
          <p>
            When you visit our website, we automatically collect certain information about your device and usage patterns. This may include:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device information</li>
            <li>Pages visited and time spent</li>
            <li>Referring websites</li>
            <li>Click patterns</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">3. How We Use Your Information</h2>
          <p>
            We use your information for various purposes, including to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative information, such as updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate about products, services, offers, and events</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Protect against harmful or illegal activity</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">4. Sharing Your Information</h2>
          <p>
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300">
            <li>Service providers who perform services on our behalf</li>
            <li>Business partners with whom we jointly offer products or services</li>
            <li>Affiliates within our corporate family</li>
            <li>Professional advisors, such as lawyers, auditors, and insurers</li>
            <li>Government authorities when required by law</li>
          </ul>
          <p>
            We do not sell your personal information to third parties.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">5. Your Rights and Choices</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-300">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction or objection to processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">7. International Data Transfers</h2>
          <p>
            Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that differ from those in your country. We ensure appropriate safeguards are in place to protect your information when transferred internationally.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">8. Children's Privacy</h2>
          <p>
            Our services are not directed to children under the age of 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about our data practices.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#93cfa2]">10. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
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
