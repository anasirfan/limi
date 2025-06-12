/**
 * Mock product data for Limi Lighting products
 * This will be replaced with data from the backend/CMS in the future
 */

export const products = [
  // Bases
  {
    id: 'base-1',
    slug: 'smart-base-standard',
    name: 'Smart Base Standard',
    shortDescription: 'Foundation base for all LIMI lighting systems',
    fullDescription: 'The Smart Base Standard is the foundation for all LIMI lighting systems. This versatile base features integrated smart controls, wireless connectivity, and supports all LIMI attachments. The sleek design complements any decor while providing stable support for your lighting configuration.',
    category: 'Bases',
    images: [
      '/images/products/product1/1.jpg',
      '/images/products/product1/2.jpg',
      '/images/products/product1/3.jpg',
      '/images/products/product1/4.jpg'
    ],
    thumbnail: '/images/products/product1/1.jpg',
    hoverThumbnail: '/images/products/product1/2.jpg',
    specs: {
      wattage: '10W (base only)',
      dimensions: '20cm diameter x 5cm height',
      connectivity: 'Wi-Fi, Bluetooth',
      voltage: '100-240V AC',
      supportedSystems: 'All LIMI systems',
      controlInterface: 'Touch, App, Voice',
      lifespan: '50,000 hours',
    },
    toggleOptions: [
      {
        name: 'Premium Finish',
        description: 'Upgrade to brushed aluminum finish',
        defaultValue: false,
      },
      {
        name: 'Extended Power Cable',
        description: 'Add 3m extension to standard power cable',
        defaultValue: false,
      }
    ],
    price: 149.99,
    featured: true,
    new: false,
    inStock: true,
  },
  {
    id: 'base-2',
    slug: 'smart-base-premium',
    name: 'Smart Base Premium',
    shortDescription: 'Advanced foundation base with enhanced features',
    fullDescription: 'The Smart Base Premium offers enhanced features over our standard base, including expanded connectivity options, higher power output for larger installations, and premium materials. The base includes a built-in battery backup for uninterrupted operation during power outages and advanced sensors for automated lighting control.',
    category: 'Bases',
    images: [
      '/images/products/product2/1.jpg',
      '/images/products/product2/2.jpg',
      '/images/products/product2/3.jpg',
    ],
    thumbnail: '/images/products/product2/1.jpg',
    hoverThumbnail: '/images/products/product2/2.jpg',
    specs: {
      wattage: '15W (base only)',
      dimensions: '25cm diameter x 5cm height',
      connectivity: 'Wi-Fi, Bluetooth, Zigbee, Matter',
      voltage: '100-240V AC',
      supportedSystems: 'All LIMI systems',
      controlInterface: 'Touch, App, Voice, Gesture',
      batteryBackup: '4 hours',
      lifespan: '60,000 hours',
    },
    toggleOptions: [
      {
        name: 'Premium Finish',
        description: 'Choose between brushed aluminum or matte black',
        defaultValue: false,
      },
      {
        name: 'Extended Battery',
        description: 'Upgrade to 8-hour battery backup',
        defaultValue: false,
      }
    ],
    price: 249.99,
    featured: true,
    new: true,
    inStock: true,
  },

  // Universal Attachments



  // Pendants
  {
    id: 'pendant-1',
    slug: 'pendant-light-standard',
    name: 'Pendant Light Standard',
    shortDescription: 'Elegant hanging light with smart features',
    fullDescription: 'The Pendant Light Standard combines elegant design with smart lighting technology. This hanging fixture features adjustable height, full RGB spectrum control, and compatibility with all LIMI bases. Perfect for dining areas, kitchen islands, or as accent lighting in any room.',
    category: 'Pendants',
    images: [
      '/images/products/product3/1.jpg',
      '/images/products/product3/2.jpg',
      '/images/products/product3/3.jpg',
      '/images/products/product3/4.jpg',
    ],
    thumbnail: '/images/products/product3/1.jpg',
    hoverThumbnail: '/images/products/product3/4.jpg',
    specs: {
      wattage: '12W',
      lumens: '1000lm',
      colorTemperature: '2700K-6500K',
      dimensions: '15cm diameter x 25cm height',
      cableLength: '150cm (adjustable)',
      connectivity: 'Compatible with all LIMI bases',
      voltage: 'Powered through LIMI base',
      lifespan: '50,000 hours',
    },
    toggleOptions: [
      {
        name: 'Glass Options',
        description: 'Choose between clear, frosted, or smoked glass',
        defaultValue: false,
      },
      {
        name: 'Extended Cable',
        description: 'Add additional 100cm of suspension cable',
        defaultValue: false,
      }
    ],
    price: 129.99,
    featured: true,
    new: false,
    inStock: true,
  },
  {
    id: 'pendant-2',
    slug: 'pendant-light-premium',
    name: 'Pendant Light Premium',
    shortDescription: 'Designer pendant with advanced lighting features',
    fullDescription: 'The Pendant Light Premium is our designer-grade hanging fixture with advanced lighting features. The handcrafted glass shade creates stunning light patterns while the integrated smart controls allow for precise illumination. Compatible with all LIMI bases and perfect for statement lighting in any space.',
    category: 'Pendants',
    images: [
      '/images/products/product4/1.jpg',
      '/images/products/product4/2.jpg',
      '/images/products/product4/3.jpg',
      '/images/products/product4/4.jpg',
    ],
    thumbnail: '/images/products/product4/1.jpg',
    hoverThumbnail: '/images/products/product4/4.jpg',
    specs: {
      wattage: '18W',
      lumens: '1500lm',
      colorTemperature: '2200K-6500K',
      dimensions: '20cm diameter x 30cm height',
      cableLength: '200cm (adjustable)',
      materials: 'Hand-blown glass, brushed metal accents',
      connectivity: 'Compatible with all LIMI bases',
      voltage: 'Powered through LIMI base',
      lifespan: '60,000 hours',
    },
    toggleOptions: [
      {
        name: 'Glass Finish',
        description: 'Choose between clear, frosted, amber, or blue glass',
        defaultValue: false,
      },
      {
        name: 'Metal Finish',
        description: 'Select brushed nickel, brass, or matte black accents',
        defaultValue: false,
      }
    ],
    price: 199.99,
    featured: true,
    new: true,
    inStock: true,
  },

  // Ball System
  {
    id: 'ball-system-1',
    slug: 'ball-system-standard',
    name: 'Ball System Standard',
    shortDescription: 'Elegant spherical lighting system with smart controls',
    fullDescription: 'The Ball System Standard is our flagship spherical lighting solution, combining elegant design with advanced smart lighting technology. Each ball contains RGB LEDs that can be individually controlled for customized lighting scenes. The system includes our standard controller for easy integration with smart home systems.',
    category: 'Ball System',
    images: [
      '/images/products/product2/1.jpg',
      '/images/products/product2/2.jpg',
      '/images/products/product2/3.jpg',
    ],
    thumbnail: '/images/products/product2/1.jpg',
    hoverThumbnail: '/images/products/product2/2.jpg',
    specs: {
      wattage: '15W',
      lumens: '1200lm',
      colorTemperature: '2700K-6500K',
      dimensions: '15cm diameter',
      connectivity: 'Wi-Fi, Bluetooth',
      voltage: '100-240V AC',
      lifespan: '50,000 hours',
    },
    toggleOptions: [
      {
        name: 'Include Pendants',
        description: 'Add matching pendant fixtures to your Ball System',
        defaultValue: false,
      },
      {
        name: 'Advanced Controller',
        description: 'Upgrade to our premium controller with additional features',
        defaultValue: false,
      }
    ],
    price: 299.99,
    featured: true,
    new: true,
    inStock: true,
  },
 
];

export const categories = [
  {
    id: 'all',
    name: 'All Products',
    description: 'Explore our complete Limitless Lighting System — where design meets intelligent innovation',
  },
  {
    id: 'Bases',
    name: 'The Hub',
    description: 'Smart power, seamless mounting — the foundation of a smarter, more agile lighting solution',
  },
  {
    id: 'Ball System',
    name: 'Ball System',
    description: 'Sculptural, swappable, smart — modern spheres with interchangeable designs',
  },
  {
    id: 'Bar System',
    name: 'Bar System',
    description: 'Architectural simplicity with advanced engineering — sleek, directional lighting reimagined',
  },
  {
    id: 'Universal Attachments',
    name: 'Universal Pendant',
    description: 'Your vision, connected — integrate non-illuminated elements into your lighting setup',
  },
  {
    id: 'Pendants',
    name: 'Pendant Designs',
    description: 'Style, simplified — from minimalist forms to sculptural statements with effortless swapping',
  },
  {
    id: 'Chandeliers',
    name: 'Chandelier Designs',
    description: 'Bold form, modular logic — where impact meets innovation with adaptable installation',
  },
  {
    id: 'Panel System',
    name: 'Panel System',
    description: 'Modular panel lighting for creative wall designs — part of the Limitless ecosystem',
  }
];

// Helper function to get product by slug
export const getProductBySlug = (slug) => {
  return products.find(product => product.slug === slug);
};

// Helper function to get products by category
export const getProductsByCategory = (categoryId) => {
  if (categoryId === 'all') {
    return products;
  }
  return products.filter(product => product.category === categoryId);
};

// Helper function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Helper function to get new products
export const getNewProducts = () => {
  return products.filter(product => product.new);
};
