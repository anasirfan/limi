"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import components
import {
  ProductShowcaseWrapper,
  ProductCardGrid
} from "./productShowcase/index";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function ProductShowcase() {
  // Refs for scroll smoother

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Smart Ceiling Mount",
      tagline: "Intelligent Power Base",
      description: "The foundation of your smart lighting system, connecting seamlessly to your existing fixtures.",
      image: "/images/homepage-products/main-1.jpg",
      galleryImages: [
        "/images/homepage-products/main/main-1.jpg",
        "/images/homepage-products/main/main-2.jpg",
        "/images/homepage-products/main/main-3.jpg",
        "/images/homepage-products/main/main-4.jpg",
        "/images/homepage-products/main/main-5.jpg",
        "/images/homepage-products/main/main-6.jpg"
      ],
      category: "base",
      features: [
        "No electrician needed for installation", 
        "Smart connectivity built-in", 
        "Universal compatibility with existing fixtures", 
        "Energy efficient design"
      ],
      benefits: [
        "Install in minutes with basic tools",
        "Connects to your smart home ecosystem",
        "Works with any standard ceiling junction box",
        "Reduces energy consumption by up to 30%"
      ],
      gridPosition: "row1" // Full width feature product
    },
    {
      id: 2,
      name: "Interchangeable Designs",
      tagline: "Design-forward Pendants",
      description: "Beautiful pendants that can be swapped without tools or an electrician.",
      image: "/images/homepage-products/1.jpg",
      galleryImages: [
        "/images/homepage-products/1/1.jpg",
        "/images/homepage-products/1/2.jpg",
        "/images/homepage-products/1/3.jpg",
        "/images/homepage-products/1/4.jpg"
      ],
      category: "pendants",
      features: [
        "Swap designs in seconds", 
        "Premium materials and finishes", 
        "Diverse style options", 
        "Instant transformation"
      ],
      benefits: [
        "Update your space without hiring professionals",
        "High-quality construction ensures longevity",
        "Choose from modern, classic, or custom designs",
        "Change your lighting to match seasons or occasions"
      ],
      gridPosition: "row2-1" // Row 2, first product (3:2 ratio)
    },
    {
      id: 3,
      name: "The Brain",
      tagline: "Central Control Hub",
      description: "Central hub that connects your lighting system to your smart home ecosystem.",
      image: "/images/homepage-products/2.jpg",
      galleryImages: [
        "/images/homepage-products/2/1.jpg",
        "/images/homepage-products/2/2.png",
        "/images/homepage-products/2/3.jpg",
        "/images/homepage-products/2/4.png",
        "/images/homepage-products/2/5.jpg",
        "/images/homepage-products/2/7.jpg"
      ],
      category: "hub",
      features: [
        "Seamless integration with major platforms", 
        "Voice control compatibility", 
        "Advanced scheduling", 
        "Secure remote access"
      ],
      benefits: [
        "Works with Amazon Alexa, Google Home, and Apple HomeKit",
        "Control your lights with simple voice commands",
        "Set your lights to match your daily routine",
        "Adjust your lighting from anywhere in the world"
      ],
      gridPosition: "row2-2" // Row 2, second product (3:2 ratio)
    },
    {
      id: 4,
      name: "Wall Pendant",
      tagline: "Elegant Wall Lighting",
      description: "Sleek wall-mounted pendant lights that bring style and function to any room.",
      image: "/images/homepage-products/4.jpg",
      galleryImages: [
        "/images/homepage-products/4/1.jpg",
        "/images/homepage-products/4/2.jpg",
        "/images/homepage-products/4/3.jpg",
        "/images/homepage-products/4/4.jpg",
 
      ],
      category: "pendants",
      features: [
        "Easy wall mounting", 
        "Adjustable light direction", 
        "Compatible with all LIMI bases", 
        "Energy-efficient LED"
      ],
      benefits: [
        "Perfect for reading nooks and workspaces",
        "Creates ambient lighting for any room",
        "Minimalist design complements any decor",
        "Long-lasting and sustainable lighting solution"
      ],
      gridPosition: "row3-1" // Row 3, first product (2:3 ratio)
    },
    {
      id: 5,
      name: "Pendant Light",
      tagline: "Suspended Elegance",
      description: "Stunning pendant lights that create a focal point in any space.",
      image: "/images/homepage-products/3.jpg",
      galleryImages: [
        "/images/homepage-products/3/1.jpg",
        "/images/homepage-products/3/2.jpg",
        "/images/homepage-products/3/3.jpg",
        "/images/homepage-products/3/4.jpg",
        "/images/homepage-products/3/5.png",
        "/images/homepage-products/3/6.png"
      ],
      category: "pendants",
      features: [
        "Adjustable height", 
        "360° light distribution", 
        "Dimmable brightness", 
        "Multiple finish options"
      ],
      benefits: [
        "Creates a stunning focal point",
        "Perfect for dining areas and kitchen islands",
        "Customizable to match any interior style",
        "Energy-efficient with long-lasting LED technology"
      ],
      gridPosition: "row3-2" // Row 3, second product (2:3 ratio)
    },
    {
      id: 6,
      name: "Minimalist Sconce",
      tagline: "Sleek Wall Accent",
      description: "Clean, modern wall sconce that provides elegant ambient lighting.",
      image: "/images/homepage-products/6.jpg",
      galleryImages: [
        "/images/homepage-products/6/1.jpg",
        "/images/homepage-products/6/8.jpg",
        "/images/homepage-products/6/3.png",
        "/images/homepage-products/6/4.jpg",
        "/images/homepage-products/6/5.jpg",
        "/images/homepage-products/6/6.png"
      ],
      category: "sconces",
      features: [
        "Minimalist design", 
        "Space-saving profile", 
        "Warm ambient glow", 
        "Easy installation"
      ],
      benefits: [
        "Perfect for hallways and narrow spaces",
        "Creates a sophisticated atmosphere",
        "Complements both modern and traditional interiors",
        "Provides indirect lighting for a cozy feel"
      ],
      gridPosition: "row4-1" // Row 4, first product (1:2:1 ratio)
    },
    {
      id: 7,
      name: "Statement Chandelier",
      tagline: "Dramatic Ceiling Fixture",
      description: "Bold, eye-catching chandelier that transforms any space into a design showcase.",
      image: "/images/homepage-products/5.jpg",
      galleryImages: [
        "/images/homepage-products/5/1.jpg",
        "/images/homepage-products/5/2.jpg",
        "/images/homepage-products/5/3.jpg",
        "/images/homepage-products/5/4.jpg",

      ],
      category: "chandeliers",
      features: [
        "Sculptural design", 
        "Multi-point lighting", 
        "Customizable configuration", 
        "Premium materials"
      ],
      benefits: [
        "Creates a stunning focal point in large spaces",
        "Provides both ambient and task lighting",
        "Instantly elevates your interior design",
        "Conversation starter for guests and visitors"
      ],
      gridPosition: "row4-2" // Row 4, second product (1:2:1 ratio)
    },
    {
      id: 8,
      name: "Track Lighting System",
      tagline: "Versatile Directional Lighting",
      description: "Flexible track system that allows you to highlight specific areas or objects.",
      image: "/images/homepage-products/7.jpg",
      galleryImages: [
        "/images/homepage-products/7/7.jpg",
        "/images/homepage-products/7/8.jpg",
        "/images/homepage-products/7/9.jpg",
        "/images/homepage-products/7.jpg",

      ],
      category: "track",
      features: [
        "Adjustable light heads", 
        "Expandable system", 
        "Focused beam options", 
        "Contemporary finish"
      ],
      benefits: [
        "Perfect for highlighting artwork or architectural features",
        "Easily reconfigured as your needs change",
        "Creates dramatic lighting effects",
        "Provides targeted task lighting where needed"
      ],
      gridPosition: "row4-3" // Row 4, third product (1:2:1 ratio)
    }
  ];

  return (
    <div id="products" className="smooth-wrapper ProductShowcase">
      <div className="smooth-content">
        <ProductShowcaseWrapper>
          {/* Intro Text */}
          <motion.div 
            className="mb-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-[#292929] text-xl font-light mb-2 w-full">Explore Our</h3>
            <h2 className="text-[#54BB74] text-4xl font-bold mb-4 w-full">Innovative Lighting Solutions</h2>
            <p className="text-[#292929] opacity-75 w-full">Discover how our modular lighting system can transform your space with endless possibilities.</p>
          </motion.div>
          
          {/* Interactive Product Grid with Square Box Layout */}
          <ProductCardGrid products={products} />
        </ProductShowcaseWrapper>
      </div>
    </div>
  );
}

export default ProductShowcase;
