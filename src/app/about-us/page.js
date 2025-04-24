'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaLeaf, FaLightbulb, FaUsers } from 'react-icons/fa';

export default function AboutUs() {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate hero section
    gsap.fromTo(
      heroRef.current.querySelector('h1'),
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: 0.2
      }
    );

    gsap.fromTo(
      heroRef.current.querySelector('p'),
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: 0.4
      }
    );

    // Animate mission section
    gsap.fromTo(
      missionRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate values section
    gsap.fromTo(
      valuesRef.current.querySelectorAll('.value-card'),
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate team section
    gsap.fromTo(
      teamRef.current.querySelectorAll('.team-card'),
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <main className="min-h-screen bg-[#F2F0E6] text-[#2B2D2F]">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-32 pb-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2070&auto=format&fit=crop"
            alt="Modern lighting in a stylish interior"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2B2D2F]/70 to-[#F2F0E6]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Where Design Meets <span className="text-[#50C878]">Intelligent Innovation</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              At LIMI, we believe lighting should move with you—across seasons, trends, and lifestyles. Our Limitless Lighting System is a modular, future-ready platform that merges style and intelligence in one beautifully engineered ecosystem.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section 
        ref={missionRef}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6 text-[#2B2D2F]/80">
                LIMI was founded with a clear vision: to create lighting that evolves with you. We believe that lighting should adapt to people's needs, not the other way around—no rewiring, no tools, no downtime.
              </p>
              <p className="text-lg mb-6 text-[#2B2D2F]/80">
                Our mission is to deliver a modular, future-ready platform that empowers users to transform their spaces effortlessly. Through smart design, swappable components, and our one-of-a-kind mounting system, we're redefining what lighting can be.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-[#50C878]"></div>
                <p className="text-[#50C878] font-medium">Founded in 2020</p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop"
                alt="Modern office space with LIMI lighting"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section 
        ref={valuesRef}
        className="py-20 bg-[#2B2D2F] text-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              These principles guide everything we do, from product design to customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="value-card bg-[#1e2022] p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-[#50C878]/20 rounded-full flex items-center justify-center mb-6">
                <FaLightbulb className="text-[#50C878] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intelligent Innovation</h3>
              <p className="text-white/70">
                Our modular, future-ready platform merges style with intelligence, creating a lighting ecosystem that evolves with your needs and preferences.
              </p>
            </div>
            
            <div className="value-card bg-[#1e2022] p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-[#50C878]/20 rounded-full flex items-center justify-center mb-6">
                <FaLeaf className="text-[#50C878] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Adaptability</h3>
              <p className="text-white/70">
                Our lighting systems move with you—across seasons, trends, and lifestyles—with swappable components that update effortlessly without rewiring or tools.
              </p>
            </div>
            
            <div className="value-card bg-[#1e2022] p-8 rounded-lg shadow-lg">
              <div className="w-14 h-14 bg-[#50C878]/20 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="text-[#50C878] text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Seamless Integration</h3>
              <p className="text-white/70">
                Our universal connector system and specially engineered mounting bracket enable effortless updates and transformations without compromising on elegance or functionality.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section 
        ref={teamRef}
        className="py-20 bg-[#F2F0E6]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-[#2B2D2F]/70 max-w-2xl mx-auto">
              The passionate individuals behind LIMI's innovative lighting solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="team-card bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                  alt="Umer Asif - CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Umer Asif</h3>
                <p className="text-[#50C878] font-medium mb-3">CEO & Founder</p>
                <p className="text-[#2B2D2F]/70">
                  With over 15 years in lighting design and technology, Alex founded LIMI to bring smart lighting to everyone.
                </p>
              </div>
            </div>
            
            <div className="team-card bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                  alt="Karen Law - CTO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Karen Law</h3>
                <p className="text-[#50C878] font-medium mb-3">Chief Technology Officer</p>
                <p className="text-[#2B2D2F]/70">
                  Sarah leads our R&D team, bringing her expertise in IoT and smart home technology to create our innovative lighting systems.
                </p>
              </div>
            </div>
            
            <div className="team-card bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
                  alt="Shahrukh Ahmed - COO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Shahrukh Ahmed</h3>
                <p className="text-[#50C878] font-medium mb-3">C O O</p>
                <p className="text-[#2B2D2F]/70">
                  David ensures that all LIMI products are not only functional but also beautiful, with a focus on minimalist and timeless design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#50C878]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Space?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover our range of innovative lighting solutions and experience the perfect blend of technology and design.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/product-catalog"
              className="bg-white text-[#2B2D2F] px-6 py-3 rounded-md font-medium hover:bg-white/90 transition-colors"
            >
              Explore Products
            </Link>
            <Link 
              href="/contact-us"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
