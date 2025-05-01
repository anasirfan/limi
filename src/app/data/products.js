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
  {
    id: 'attachment-1',
    slug: 'universal-connector-standard',
    name: 'Universal Connector Standard',
    shortDescription: 'Connect any LIMI system to your base',
    fullDescription: 'The Universal Connector Standard allows you to connect any LIMI lighting system to your base. This versatile attachment features a quick-release mechanism for easy system swapping and a 360-degree rotation joint for perfect positioning. Compatible with all LIMI bases and lighting systems.',
    category: 'Universal Attachments',
    images: [
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618941716939-553df3c6c278?q=80&w=2070&auto=format&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop',
    hoverThumbnail: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070&auto=format&fit=crop',
    specs: {
      material: 'Reinforced polymer',
      dimensions: '5cm x 5cm x 8cm',
      rotationRange: '360°',
      tiltRange: '180°',
      loadCapacity: 'Up to 2kg',
      compatibility: 'All LIMI systems and bases',
      lifespan: '50,000 cycles',
    },
    toggleOptions: [
      {
        name: 'Metal Finish',
        description: 'Upgrade to metal construction for heavier loads',
        defaultValue: false,
      },
      {
        name: 'Extension Arm',
        description: 'Add 15cm extension arm for greater reach',
        defaultValue: false,
      }
    ],
    price: 39.99,
    featured: false,
    new: false,
    inStock: true,
  },
  {
    id: 'attachment-2',
    slug: 'universal-connector-premium',
    name: 'Universal Connector Premium',
    shortDescription: 'Advanced connector with enhanced flexibility',
    fullDescription: 'The Universal Connector Premium offers enhanced flexibility and durability over our standard connector. Featuring a multi-joint design, this premium attachment allows for precise positioning in any direction. The all-metal construction ensures stability for even the heaviest LIMI lighting systems.',
    category: 'Universal Attachments',
    images: [
      'https://images.unsplash.com/photo-1565374790464-0b28f87a1bc5?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565374790610-deee4a829ad0?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565374790340-28c355642f64?q=80&w=1974&auto=format&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1565374790464-0b28f87a1bc5?q=80&w=1974&auto=format&fit=crop',
    hoverThumbnail: 'https://images.unsplash.com/photo-1565374790610-deee4a829ad0?q=80&w=1974&auto=format&fit=crop',
    specs: {
      material: 'Aircraft-grade aluminum',
      dimensions: '6cm x 6cm x 10cm',
      rotationRange: '360°',
      tiltRange: '270°',
      loadCapacity: 'Up to 5kg',
      compatibility: 'All LIMI systems and bases',
      additionalFeatures: 'Cable management system, locking mechanisms',
      lifespan: '100,000 cycles',
    },
    toggleOptions: [
      {
        name: 'Color Options',
        description: 'Choose between silver, black, or white finish',
        defaultValue: false,
      },
      {
        name: 'Dual Mount',
        description: 'Add capability to mount two systems simultaneously',
        defaultValue: false,
      }
    ],
    price: 69.99,
    featured: true,
    new: true,
    inStock: true,
  },

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

  // Chandeliers
  {
    id: 'chandelier-1',
    slug: 'smart-chandelier-standard',
    name: 'Smart Chandelier Standard',
    shortDescription: 'Modern chandelier with integrated smart lighting',
    fullDescription: 'The Smart Chandelier Standard brings modern design to traditional chandeliers with integrated smart lighting technology. Featuring multiple light points that can be individually controlled, this fixture creates stunning lighting scenes for dining rooms, entryways, or living spaces. Compatible with all LIMI bases for seamless integration into your smart home.',
    category: 'Chandeliers',
    images: [
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565814329332-a5a0d0be2254?q=80&w=1974&auto=format&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1974&auto=format&fit=crop',
    hoverThumbnail: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?q=80&w=1974&auto=format&fit=crop',
    specs: {
      wattage: '45W total (5 x 9W)',
      lumens: '3600lm total',
      colorTemperature: '2700K-6500K',
      dimensions: '60cm diameter x 40cm height',
      lightPoints: '5 individually controllable points',
      cableLength: '150cm (adjustable)',
      connectivity: 'Compatible with all LIMI bases',
      voltage: 'Powered through LIMI base',
      lifespan: '50,000 hours',
    },
    toggleOptions: [
      {
        name: 'Glass Options',
        description: 'Choose between clear, frosted, or smoked glass shades',
        defaultValue: false,
      },
      {
        name: 'Metal Finish',
        description: 'Select brushed nickel, brass, or matte black frame',
        defaultValue: false,
      }
    ],
    price: 499.99,
    featured: true,
    new: false,
    inStock: true,
  },
  {
    id: 'chandelier-2',
    slug: 'smart-chandelier-premium',
    name: 'Smart Chandelier Premium',
    shortDescription: 'Luxury chandelier with advanced lighting control',
    fullDescription: 'The Smart Chandelier Premium is our luxury lighting fixture with advanced control capabilities. This statement piece features 9 individually addressable light points arranged in a contemporary design. Each light can be programmed for color, brightness, and effects, creating dynamic lighting scenes for luxury homes and commercial spaces. Compatible with all LIMI bases.',
    category: 'Chandeliers',
    images: [
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1974&auto=format&fit=crop',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1974&auto=format&fit=crop',
    hoverThumbnail: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1974&auto=format&fit=crop',
    specs: {
      wattage: '81W total (9 x 9W)',
      lumens: '6300lm total',
      colorTemperature: '2200K-6500K',
      dimensions: '80cm diameter x 50cm height',
      lightPoints: '9 individually controllable points',
      cableLength: '200cm (adjustable)',
      materials: 'Hand-blown glass, premium metal frame',
      connectivity: 'Compatible with all LIMI bases',
      voltage: 'Powered through LIMI base',
      lifespan: '60,000 hours',
    },
    toggleOptions: [
      {
        name: 'Glass Customization',
        description: 'Choose from our designer glass collection',
        defaultValue: false,
      },
      {
        name: 'Custom Layout',
        description: 'Work with our designers for custom arrangement',
        defaultValue: false,
      }
    ],
    price: 899.99,
    featured: true,
    new: true,
    inStock: true,
  },
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
  {
    id: 'ball-system-2',
    slug: 'ball-system-premium',
    name: 'Ball System Premium',
    shortDescription: 'Premium spherical lighting with enhanced features',
    fullDescription: 'The Ball System Premium takes our popular spherical lighting to the next level with enhanced features and premium materials. Each unit features higher brightness, expanded color range, and our advanced controller included as standard. Perfect for creating stunning lighting scenes in larger spaces.',
    category: 'Ball System',
    images: [
      '/images/products/4.jpg',
      '/images/products/5.jpg',
      '/images/products/6.jpg',
    ],
    thumbnail: '/images/products/4.jpg',
    hoverThumbnail: '/images/products/5.jpg',
    specs: {
      wattage: '20W',
      lumens: '1800lm',
      colorTemperature: '2200K-6500K',
      dimensions: '18cm diameter',
      connectivity: 'Wi-Fi, Bluetooth, Zigbee',
      voltage: '100-240V AC',
      lifespan: '60,000 hours',
    },
    toggleOptions: [
      {
        name: 'Include Pendants',
        description: 'Add matching pendant fixtures to your Ball System',
        defaultValue: false,
      },
      {
        name: 'Wall Mount Kit',
        description: 'Add wall mounting hardware for flexible installation',
        defaultValue: false,
      }
    ],
    price: 449.99,
    featured: true,
    new: false,
    inStock: true,
  },
  {
    id: 'bar-system-1',
    slug: 'bar-system-standard',
    name: 'Bar System Standard',
    shortDescription: 'Linear lighting system with seamless connectivity',
    fullDescription: 'The Bar System Standard offers sleek linear lighting with seamless connectivity between modules. Create custom lighting layouts with these interconnectable bars that feature full RGB spectrum control. Each bar includes mounting hardware for easy installation on walls or ceilings.',
    category: 'Bar System',
    images: [
      '/images/products/7.jpg',
      '/images/products/8.jpg',
      '/images/products/9.jpg',
    ],
    thumbnail: '/images/products/7.jpg',
    hoverThumbnail: '/images/products/8.jpg',
    specs: {
      wattage: '18W per meter',
      lumens: '1500lm per meter',
      colorTemperature: '2700K-6500K',
      dimensions: '100cm x 5cm x 2cm',
      connectivity: 'Wi-Fi, Bluetooth',
      voltage: '24V DC (power supply included)',
      lifespan: '50,000 hours',
    },
    toggleOptions: [
      {
        name: 'Corner Connectors',
        description: 'Add corner connectors for 90-degree turns',
        defaultValue: false,
      },
      {
        name: 'Extended Controller',
        description: 'Upgrade to our extended controller for larger installations',
        defaultValue: false,
      }
    ],
    price: 199.99,
    featured: false,
    new: true,
    inStock: true,
  },
  {
    id: 'bar-system-2',
    slug: 'bar-system-premium',
    name: 'Bar System Premium',
    shortDescription: 'Professional-grade linear lighting for custom installations',
    fullDescription: 'The Bar System Premium is our professional-grade linear lighting solution designed for custom installations. Featuring higher brightness, extended color accuracy, and our premium controller, this system is ideal for architectural lighting, commercial spaces, and luxury homes. The aluminum housing provides excellent heat dissipation and durability.',
    category: 'Bar System',
    images: [
      '/images/products/10.png',
      '/images/products/11.jpg',
      '/images/products/12.jpg',
    ],
    thumbnail: '/images/products/10.png',
    hoverThumbnail: '/images/products/11.jpg',
    specs: {
      wattage: '24W per meter',
      lumens: '2200lm per meter',
      colorTemperature: '2200K-6500K',
      dimensions: '100cm x 6cm x 2.5cm',
      connectivity: 'Wi-Fi, Bluetooth, Zigbee, DMX',
      voltage: '24V DC (power supply included)',
      lifespan: '70,000 hours',
    },
    toggleOptions: [
      {
        name: 'Corner Connectors',
        description: 'Add corner connectors for 90-degree turns',
        defaultValue: false,
      },
      {
        name: 'Diffuser Options',
        description: 'Choose between clear, frosted, or opal diffusers',
        defaultValue: false,
      }
    ],
    price: 299.99,
    featured: true,
    new: false,
    inStock: true,
  },
  {
    id: 'panel-system-1',
    slug: 'panel-system-standard',
    name: 'Panel System Standard',
    shortDescription: 'Modular light panels for creative wall designs',
    fullDescription: 'The Panel System Standard offers modular light panels that can be arranged in countless patterns on your walls. Each hexagonal panel connects magnetically to others, allowing for easy rearrangement and expansion. Control colors and patterns through our intuitive app for dynamic lighting experiences.',
    category: 'Panel System',
    images: [
      '/images/products/13.jpg',
      '/images/products/14.jpg',
      '/images/products/15.jpg',
    ],
    thumbnail: '/images/products/13.jpg',
    hoverThumbnail: '/images/products/14.jpg',
    specs: {
      wattage: '8W per panel',
      lumens: '800lm per panel',
      colorTemperature: '2700K-6500K',
      dimensions: '20cm per side (hexagon)',
      connectivity: 'Wi-Fi, Bluetooth',
      voltage: '24V DC (power supply included)',
      lifespan: '50,000 hours',
    },
    toggleOptions: [
      {
        name: 'Rhythm Module',
        description: 'Add music reactivity to your panel system',
        defaultValue: false,
      },
      {
        name: 'Expansion Pack',
        description: 'Add additional panels to your system',
        defaultValue: false,
      }
    ],
    price: 249.99,
    featured: false,
    new: true,
    inStock: true,
  },
  {
    id: 'panel-system-2',
    slug: 'panel-system-premium',
    name: 'Panel System Premium',
    shortDescription: 'Advanced modular panels with enhanced connectivity',
    fullDescription: 'The Panel System Premium elevates our modular lighting concept with enhanced features and connectivity. These premium panels feature higher brightness, improved color accuracy, and advanced scene capabilities. The system includes our premium controller and can integrate with major smart home platforms for synchronized lighting experiences.',
    category: 'Panel System',
    images: [
      '/images/products/16.jpg',
      '/images/products/17.jpg',
      '/images/products/18.jpg',
    ],
    thumbnail: '/images/products/16.jpg',
    hoverThumbnail: '/images/products/17.jpg',
    specs: {
      wattage: '12W per panel',
      lumens: '1200lm per panel',
      colorTemperature: '2200K-6500K',
      dimensions: '20cm per side (hexagon)',
      connectivity: 'Wi-Fi, Bluetooth, Zigbee, Matter',
      voltage: '24V DC (power supply included)',
      lifespan: '60,000 hours',
    },
    toggleOptions: [
      {
        name: 'Rhythm Module',
        description: 'Add music reactivity to your panel system',
        defaultValue: false,
      },
      {
        name: 'Designer Shapes',
        description: 'Add triangular and square panels for more design options',
        defaultValue: false,
      }
    ],
    price: 349.99,
    featured: true,
    new: false,
    inStock: true,
  }
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
