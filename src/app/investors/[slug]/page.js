"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Added for animations
import { motion } from "framer-motion";

const fetchJSON = (path) => fetch(path).then((res) => res.json());

export default function InvestorPage() {
  const { slug } = useParams();
  const [investor, setInvestor] = useState(null);
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load investor and all resource data
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchJSON("/data/InvestorsData.json").then((data) => {
      const all = [...(data.VCFirmData || []), ...(data.AngelInvestorData || [])];
      const found = all.find((i) => i.slug === slug);
      setInvestor(found);
      fetchJSON("/data/InvestorResources.json").then((allResources) => {
        setResources(allResources);
        setLoading(false);
      });
    });
  }, [slug]);

  // Umami Analytics tracking with bot detection
  useEffect(() => {
    if (!slug) return;

    // Bot detection - require mouse movement to verify human
    let isHuman = false;
    let sessionStart = Date.now();
    let sessionTimers = [];

    const verifyHuman = () => {
      if (!isHuman) {
        isHuman = true;
        // Track page view only after human verification
        if (typeof window !== "undefined" && window.umami) {
          window.umami.track('investor_page_view', {
            investor_slug: slug,
            page_path: `/investors/${slug}`
          });
        }
        
        // Start session duration tracking
        const durations = [5, 30, 60, 120, 300]; // 5s, 30s, 1m, 2m, 5m
        durations.forEach(seconds => {
          const timer = setTimeout(() => {
            if (typeof window !== "undefined" && window.umami) {
              window.umami.track(`session_${seconds}s`, {
                investor_slug: slug,
                duration_seconds: seconds
              });
            }
          }, seconds * 1000);
          sessionTimers.push(timer);
        });
      }
    };

    // Mouse movement detection for bot filtering
    const handleMouseMove = () => {
      verifyHuman();
      document.removeEventListener('mousemove', handleMouseMove);
    };

    // Fallback: verify after 3 seconds even without mouse movement
    const fallbackTimer = setTimeout(verifyHuman, 3000);

    document.addEventListener('mousemove', handleMouseMove);

    // Track session end
    const handleUnload = () => {
      if (isHuman && typeof window !== "undefined" && window.umami) {
        const totalDuration = (Date.now() - sessionStart) / 1000;
        window.umami.track('session_end', {
          investor_slug: slug,
          total_duration: Math.round(totalDuration)
        });
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);

    return () => {
      clearTimeout(fallbackTimer);
      sessionTimers.forEach(timer => clearTimeout(timer));
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#292929] flex flex-col items-center justify-center">
      <div className="w-24 h-24 relative">
        <div className="w-full h-full rounded-full border-4 border-emerald-400 border-opacity-20 animate-pulse"></div>
        <div className="w-full h-full absolute top-0 left-0 rounded-full border-t-4 border-emerald-500 animate-spin"></div>
      </div>
      <p className="mt-6 text-emerald-400 font-amenti text-2xl animate-pulse">Preparing Your Portal...</p>
    </div>
  );
  if (!investor || !resources)
    return (
      <div className="min-h-screen bg-[#292929] flex items-center justify-center font-poppins">
        <div className="bg-[#1e1e1e] rounded-lg shadow-lg p-10 text-center">
          <p className="text-2xl font-amenti text-emerald-400 mb-4">Investor not found</p>
          <p className="text-gray-300">Please check your link or contact LIMI Lighting for assistance.</p>
        </div>
      </div>
    );

  // Helper to replace <INVESTOR_ID> in links
  const replaceSlug = (url) => url.replace(/<INVESTOR_ID>/g, slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#292929] text-white font-poppins flex flex-col items-center">
      {/* Branded Header */}
      <motion.header 
        className="w-full bg-[#1a1a1a] border-b border-emerald-900/30 py-6 px-4 flex justify-center sticky top-0 z-10 backdrop-blur-sm bg-opacity-80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl w-full flex justify-between items-center">
          <Link href="/portal" className="flex items-center">
            <div className="h-10 w-10 flex items-center justify-center mr-3">
              <Image 
                src="/images/svgLogos/__Logo_Icon_Inverted.svg" 
                alt="LIMI Logo" 
                width={40} 
                height={40} 
                priority
                className="object-contain"
              />
            </div>
            <span className="font-amenti text-xl text-white">LIMI <span className="text-emerald-400">Investor Portal</span></span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 1.2,
              duration: 0.5,
              type: "spring",
              stiffness: 120
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 } 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="https://www.limilighting.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group"
              onClick={() => {
                if (typeof window !== "undefined" && window.umami) {
                  window.umami.track('website_visit_click', {
                    investor_slug: slug,
                    source: 'header_button'
                  });
                }
              }}
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200 animate-pulse"></span>
              <span className="relative flex items-center gap-2 px-5 py-2.5 bg-[#1e1e1e] text-emerald-300 rounded-full border border-emerald-500/30 font-amenti">
                <span className="text-sm md:text-base">Visit LIMI Website</span>
                <span className="text-lg">✨</span>
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-4xl w-full px-4 py-12">
        {/* Hero Section with animated gradient border */}
        <motion.div 
          className="relative mb-12 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl p-0.5">
            <div className="bg-[#1e1e1e] rounded-lg h-full w-full"></div>
          </div>

          <div className="relative z-10 p-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="font-amenti text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                Dear {investor.name},
              </p>
              <h1 className="font-amenti text-3xl text-emerald-300 mb-2">{resources.heroSection.header}</h1>
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mb-6 rounded-full"></div>
              <h2 className="font-amenti text-xl text-emerald-200 mb-3">{resources.heroSection.subheader}</h2>
              <p className="text-gray-200 text-lg leading-relaxed">{resources.heroSection.body}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Resource Cards - with staggered animation */}
        <div className="mb-12">
          <motion.h2 
            className="font-amenti text-2xl mb-6 text-emerald-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            LIMI Resources
          </motion.h2>
          
          <div className="space-y-5">
            {resources.resources.map((res, index) => (
              <motion.div 
                key={res.contentID} 
                className="bg-gradient-to-b from-[#232323] to-[#1e1e1e] rounded-xl p-0.5 shadow-lg hover:shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <div className="bg-[#1e1e1e] rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="font-amenti text-2xl text-emerald-400 mb-2">{res.title}</h3>
                      <p className="text-gray-300 text-base mb-4 leading-relaxed">{res.description}</p>
                    </div>
                    <div className="md:ml-6 flex-shrink-0">
                      <a
                        href={replaceSlug(res.linkURL)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-amenti rounded-lg shadow-lg hover:shadow-emerald-600/20 transition-all duration-300 transform"
                        onClick={() => {
                          if (typeof window !== "undefined" && window.umami) {
                            window.umami.track(`resource_${res.contentID}_click`, {
                              investor_slug: slug,
                              resource_id: res.contentID,
                              resource_title: res.title,
                              resource_url: replaceSlug(res.linkURL)
                            });
                          }
                        }}
                      >
                        {res.linkText} →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section - with pulse animation */}
        <motion.div 
          className="relative bg-gradient-to-br from-[#1e1e1e] to-[#232323] rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-emerald-800/30 opacity-70"></div>
          
          <div className="relative z-10 p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-600/20 mb-6 flex items-center justify-center animate-pulse">
              <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-emerald-400/40 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
              </div>
            </div>
            <p className="text-xl text-emerald-200 mb-5 font-amenti">{resources.ctaSection.text}</p>
            <a
              href={replaceSlug(resources.ctaSection.buttonLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-amenti text-lg rounded-lg shadow-lg hover:shadow-emerald-600/30 transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                if (typeof window !== "undefined" && window.umami) {
                  window.umami.track('cta_book_call_click', {
                    investor_slug: slug,
                    cta_text: resources.ctaSection.buttonText,
                    cta_url: replaceSlug(resources.ctaSection.buttonLink)
                  });
                }
              }}
            >
              {resources.ctaSection.buttonText}
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-16 mb-8 text-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-800/30 to-transparent mb-6"></div>
          <p className="text-gray-400 text-sm">
            Thank you for considering LIMI Lighting. We look forward to connecting!
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © {new Date().getFullYear()} LIMI Lighting. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
