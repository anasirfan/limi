'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LimiFutureCarousel from './components/LimiFutureCarousel';
import { trackUmamiEvent } from '../utils/umamiTracking';

export default function LimiFuture() {
  useEffect(() => {
    // Track page view
    trackUmamiEvent('limifuture_page_view', {
      page: '/limifuture',
      timestamp: new Date().toISOString()
    });
  }, []);

  return (
    <main className="bg-[#292929] text-white min-h-screen">
      {/* <Header /> */}
      
      <div className="pt-[0px]">
        <LimiFutureCarousel />
      </div>
      
      {/* <Footer /> */}
    </main>
  );
}
