/**
 * Mock product data for Limi Lighting products
 * This will be replaced with data from the backend/CMS in the future
 */

export const products = [
  {
    id: 'ball-system-1',
    slug: 'ball-system-standard',
    name: 'Ball System Standard',
    shortDescription: 'Elegant spherical lighting system with smart controls',
    fullDescription: 'The Ball System Standard is our flagship spherical lighting solution, combining elegant design with advanced smart lighting technology. Each ball contains RGB LEDs that can be individually controlled for customized lighting scenes. The system includes our standard controller for easy integration with smart home systems.',
    category: 'Ball System',
    images: [
      '/images/products/1.webp',
      '/images/products/2.jpg',
      '/images/products/3.jpg',
    ],
    thumbnail: '/images/products/1.webp',
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
    description: 'View our complete collection of smart lighting solutions',
  },
  {
    id: 'Ball System',
    name: 'Ball System',
    description: 'Spherical lighting solutions for modern spaces',
  },
  {
    id: 'Bar System',
    name: 'Bar System',
    description: 'Linear lighting systems for versatile installations',
  },
  {
    id: 'Panel System',
    name: 'Panel System',
    description: 'Modular panel lighting for creative wall designs',
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
