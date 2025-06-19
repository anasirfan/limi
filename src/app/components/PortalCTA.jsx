'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FaUserCircle, FaStar, FaQuoteLeft, FaQuoteRight, FaArrowRight, FaLock, FaHistory, FaHeart, FaShoppingCart, FaRegCreditCard } from 'react-icons/fa';

const PortalCTA = ({onSignInClick}) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Portal features
  const portalFeatures = [
    {
      icon: <FaHistory className="text-[#50C878] text-2xl" />,
      title: 'Order History',
      description: 'View past orders, track shipments, and reorder your favorite items with just a click.'
    },
    {
      icon: <FaHeart className="text-[#50C878] text-2xl" />,
      title: 'Saved Favorites',
      description: 'Save your favorite products and lighting configurations for quick access later.'
    },
    {
      icon: <FaRegCreditCard className="text-[#50C878] text-2xl" />,
      title: 'Saved Payment Methods',
      description: 'Securely store your payment information for faster checkout.'
    },
    {
      icon: <FaShoppingCart className="text-[#50C878] text-2xl" />,
      title: 'Exclusive Discounts',
      description: 'Access member-only deals and special promotions available only to portal users.'
    }
  ];
  
  // Customer testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Interior Designer',
      quote: 'The LIMI customer portal has transformed how I manage lighting for my clients. I can save configurations, track orders, and access my entire purchase history in one place.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Home Automation Enthusiast',
      quote: 'Being able to save my favorite lighting scenes and configurations in the portal has made expanding my smart home setup so much easier. The exclusive discounts are a great bonus too!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Residential Customer',
      quote: 'I love how easy it is to manage my LIMI lighting through the portal. The ability to reorder items and track my orders has made maintaining my home lighting system effortless.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1970&auto=format&fit=crop',
      rating: 4
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the main content animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    // Add animations to the timeline
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    .fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6 },
      '-=0.5'
    );
    
    // Create a separate timeline for features
    const featuresTl = gsap.timeline({
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    // Stagger the features
    featuresTl.fromTo(
      '.feature-item',
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        stagger: 0.15
      }
    );
    
    // Create a separate timeline for testimonials
    const testimonialsTl = gsap.timeline({
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    testimonialsTl.fromTo(
      testimonialsRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8 }
    );

    // Parallax effect for the content
    gsap.to(contentRef.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-white  overflow-hidden w-full"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[#2B2D2F]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B2D2F] via-[#2B2D2F]/90 to-[#3da861]/20"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#50C878]/10 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#87CEAB]/10 blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Experience <span className="text-[#50C878]">Personalized Lighting</span> in Your Customer Portal
          </h2>
          
          <p 
            ref={textRef}
            className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Access exclusive features, manage your lighting preferences, track orders, and customize your LIMI experience. Join our community of lighting enthusiasts today and unlock the full potential of your lighting system.
          </p>
          
          <div ref={buttonRef} className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <button
          onClick={(e) => {
            e.preventDefault();
            if (onSignInClick) {
              onSignInClick();
            }
          }}
          className="bg-emerald text-charleston-green-dark hover:bg-emerald/90 transition-colors px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2"
        >
          Sign In
          <FaArrowRight />
        </button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>

              <button
          onClick={(e) => {
            e.preventDefault();
            if (onSignInClick) {
              onSignInClick();
            }
          }}
          className="bg-emerald text-charleston-green-dark hover:bg-emerald/90 transition-colors px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2"
        >
          Create Account
          <FaArrowRight />
        </button>
            </motion.div>
          </div>
          
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <FaLock className="mr-2 text-[#87CEAB]" />
            <span>Secure, encrypted connection. Your data is always protected.</span>
          </div>
        </div>
        
        {/* Portal features grid */}
        <div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {portalFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-item bg-[#1e2022] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]"
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-center text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonials */}
        {/* <div 
          ref={testimonialsRef}
          className="max-w-4xl mx-auto bg-[#1e2022] rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-8 p-8 md:p-10">
              <div className="mb-6">
                <FaQuoteLeft className="text-[#50C878] opacity-30 text-4xl" />
              </div>
              
              <div className="min-h-[160px]">
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: activeTestimonial === index ? 1 : 0,
                      x: activeTestimonial === index ? 0 : 20,
                      position: activeTestimonial === index ? 'relative' : 'absolute'
                    }}
                    transition={{ duration: 0.5 }}
                    className={activeTestimonial === index ? 'block' : 'hidden'}
                  >
                    <p className="text-white text-lg italic mb-6">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <Image 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[#50C878] font-medium">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`${i < testimonials[activeTestimonial].rating ? 'text-[#50C878]' : 'text-gray-600'} mr-1`} 
                    />
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${activeTestimonial === index ? 'bg-[#50C878] w-4' : 'bg-gray-600'}`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:col-span-4 bg-[#3a3d42] p-8 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-4">Join Our Community</h3>
              <p className="text-gray-300 text-sm mb-6">Create your account today and experience the full benefits of the LIMI Customer Portal.</p>
              
              <Link href="/signup">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#50C878] hover:bg-[#3da861] text-white font-medium rounded-md transition-colors duration-300 text-center"
                >
                  Get Started
                  <FaArrowRight className="text-sm" />
                </motion.span>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PortalCTA;
