// Mock data for the customer portal

// Promotions
export const mockPromotions = [
  {
    id: 'promo-001',
    title: 'Spring Lighting Sale',
    description: 'Get 20% off all pendant lights and chandeliers. Perfect for refreshing your space this spring.',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1974&auto=format&fit=crop',
    discount: '20% OFF',
    code: 'SPRING20',
    validFrom: '2025-03-01T00:00:00',
    validTo: '2025-04-15T23:59:59',
    categories: ['Pendants', 'Chandeliers', 'Seasonal'],
    status: 'active',
    appExclusive: false
  },
  {
    id: 'promo-002',
    title: 'App Exclusive: Smart Home Bundle',
    description: 'Download our app and get a special 15% discount on all smart lighting bundles.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1974&auto=format&fit=crop',
    discount: '15% OFF',
    code: 'APPBUNDLE15',
    validFrom: '2025-02-15T00:00:00',
    validTo: '2025-05-30T23:59:59',
    categories: ['Smart Home', 'Bundles', 'App Exclusive'],
    status: 'active',
    appExclusive: true
  },
  {
    id: 'promo-003',
    title: 'Free Shipping on Orders Over $100',
    description: 'Enjoy free standard shipping on all orders over $100. No code needed, discount applied at checkout.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1974&auto=format&fit=crop',
    discount: 'FREE SHIPPING',
    code: null,
    validFrom: '2025-01-01T00:00:00',
    validTo: '2025-12-31T23:59:59',
    categories: ['Shipping', 'All Products'],
    status: 'active',
    appExclusive: false
  },
  {
    id: 'promo-004',
    title: 'New Customer Welcome Offer',
    description: 'First-time customers receive 10% off their first purchase. Use code at checkout.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop',
    discount: '10% OFF',
    code: 'WELCOME10',
    validFrom: '2025-01-01T00:00:00',
    validTo: '2025-12-31T23:59:59',
    categories: ['New Customers', 'All Products'],
    status: 'active',
    appExclusive: false
  },
  {
    id: 'promo-005',
    title: 'Flash Sale: Outdoor Lighting',
    description: 'Limited time offer! 25% off all outdoor lighting fixtures for 48 hours only.',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=1974&auto=format&fit=crop',
    discount: '25% OFF',
    code: 'FLASH25',
    validFrom: '2025-04-10T00:00:00',
    validTo: '2025-04-12T00:00:00',
    categories: ['Outdoor', 'Flash Sale'],
    status: 'active',
    appExclusive: false
  },
  {
    id: 'promo-006',
    title: 'Holiday Lighting Special',
    description: 'Prepare for the holidays with 15% off festive lighting collections and decorative fixtures.',
    image: 'https://images.unsplash.com/photo-1603794067602-9feaa4f70e0c?q=80&w=1974&auto=format&fit=crop',
    discount: '15% OFF',
    code: 'HOLIDAY15',
    validFrom: '2024-11-01T00:00:00',
    validTo: '2024-12-25T23:59:59',
    categories: ['Seasonal', 'Decorative'],
    status: 'expired',
    appExclusive: false
  },
  {
    id: 'promo-007',
    title: 'App Exclusive: Early Access Sale',
    description: 'Mobile app users get early access to our summer clearance event. Shop new markdowns before anyone else!',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
    discount: 'UP TO 40% OFF',
    code: 'EARLYBIRD40',
    validFrom: '2025-05-15T00:00:00',
    validTo: '2025-05-20T23:59:59',
    categories: ['Clearance', 'App Exclusive', 'All Products'],
    status: 'active',
    appExclusive: true
  }
];

// Saved Configurations
export const mockConfigurations = [
  {
    id: 'config-001',
    light_type: 'ceiling',
    light_amount: 6,
    base_type: 'round',
    name: 'Living Room Pendant Setup',
    createdAt: '2025-03-15T14:30:00',
    updatedAt: '2025-03-18T09:45:00',
    thumbnail: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1974&auto=format&fit=crop',
    description: 'Custom pendant configuration with warm lighting for the living room',
    products: [
      { id: 'prod-123', name: 'LIMI Pendant Base', quantity: 1 },
      { id: 'prod-456', name: 'Frosted Glass Globe', quantity: 3 },
      { id: 'prod-789', name: 'Brass Connector', quantity: 3 }
    ],
    settings: {
      brightness: 80,
      colorTemperature: 2700,
      scene: 'Evening Relax'
    },
    totalPrice: 349.99,
    status: 'saved'
  },
  {
    id: 'config-002',
    light_type: 'floor',
    light_amount: 3,
    base_type: null,
    name: 'Dining Room Chandelier',
    createdAt: '2025-04-02T16:20:00',
    updatedAt: '2025-04-02T16:20:00',
    thumbnail: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1974&auto=format&fit=crop',
    description: 'Modern chandelier setup with adjustable height and dimmable lights',
    products: [
      { id: 'prod-234', name: 'LIMI Chandelier Base', quantity: 1 },
      { id: 'prod-567', name: 'Crystal Pendant', quantity: 5 },
      { id: 'prod-890', name: 'Chrome Connector', quantity: 5 }
    ],
    settings: {
      brightness: 70,
      colorTemperature: 3000,
      scene: 'Dinner Party'
    },
    totalPrice: 529.99,
    status: 'saved'
  },
  {
    id: 'config-003',
    light_type: 'wall',
    light_amount: 1,
    base_type: null,
    name: 'Office Track Lighting',
    createdAt: '2025-03-28T11:15:00',
    updatedAt: '2025-04-05T14:30:00',
    thumbnail: 'https://images.unsplash.com/photo-1610017810004-a6f3c972fe0b?q=80&w=1974&auto=format&fit=crop',
    description: 'Focused track lighting setup for home office with adjustable spots',
    products: [
      { id: 'prod-345', name: 'LIMI Track Base', quantity: 1 },
      { id: 'prod-678', name: 'Directional Spotlight', quantity: 4 },
      { id: 'prod-901', name: 'Track Extension', quantity: 1 }
    ],
    settings: {
      brightness: 100,
      colorTemperature: 4000,
      scene: 'Focus Work'
    },
    totalPrice: 399.99,
    status: 'ordered',
    orderId: 'ORD-7890'
  },
  {
    id: 'config-004',
    light_type: 'ceiling',
    light_amount: 24,
    base_type: 'rectangular',
    name: 'Bedroom Ambient Lighting',
    createdAt: '2025-02-10T20:45:00',
    updatedAt: '2025-02-12T08:15:00',
    thumbnail: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=1974&auto=format&fit=crop',
    description: 'Soft ambient lighting for bedroom with color changing capabilities',
    products: [
      { id: 'prod-456', name: 'LIMI Wall Mount', quantity: 2 },
      { id: 'prod-789', name: 'RGB Light Panel', quantity: 2 },
      { id: 'prod-012', name: 'Diffuser Attachment', quantity: 2 }
    ],
    settings: {
      brightness: 50,
      colorTemperature: 'RGB',
      scene: 'Sunset Glow'
    },
    totalPrice: 279.99,
    status: 'saved'
  },
  {
    id: 'config-005',
    light_type: 'ceiling',
    light_amount: 6,
    base_type: 'round',
    name: 'Kitchen Under-Cabinet',
    createdAt: '2025-01-20T15:30:00',
    updatedAt: '2025-01-25T10:20:00',
    thumbnail: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1935&auto=format&fit=crop',
    description: 'Under-cabinet lighting for kitchen with motion sensors',
    products: [
      { id: 'prod-567', name: 'LIMI Strip Light', quantity: 3 },
      { id: 'prod-890', name: 'Motion Sensor', quantity: 1 },
      { id: 'prod-123', name: 'Power Adapter', quantity: 1 }
    ],
    settings: {
      brightness: 90,
      colorTemperature: 3500,
      scene: 'Cooking'
    },
    totalPrice: 199.99,
    status: 'ordered',
    orderId: 'ORD-4567'
  }
];

// Order History
export const mockOrders = [
  {
    id: 'ORD-1234',
    date: '2025-04-01T10:30:00',
    status: 'Delivered',
    total: 529.99,
    items: [
      {
        id: 'prod-234',
        name: 'LIMI Chandelier Base',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1974&auto=format&fit=crop'
      },
      {
        id: 'prod-567',
        name: 'Crystal Pendant',
        price: 39.99,
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1974&auto=format&fit=crop'
      },
      {
        id: 'prod-890',
        name: 'Chrome Connector',
        price: 10.00,
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1974&auto=format&fit=crop'
      }
    ],
    shippingAddress: {
      name: 'Sarah Johnson',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    trackingNumber: 'TRK-9876543210'
  },
  {
    id: 'ORD-4567',
    date: '2025-01-25T14:15:00',
    status: 'Delivered',
    total: 199.99,
    items: [
      {
        id: 'prod-567',
        name: 'LIMI Strip Light',
        price: 49.99,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1935&auto=format&fit=crop'
      },
      {
        id: 'prod-890',
        name: 'Motion Sensor',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1770&auto=format&fit=crop'
      },
      {
        id: 'prod-123',
        name: 'Power Adapter',
        price: 19.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1771&auto=format&fit=crop'
      }
    ],
    shippingAddress: {
      name: 'Sarah Johnson',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    trackingNumber: 'TRK-1234567890'
  },
  {
    id: 'ORD-7890',
    date: '2025-04-05T16:45:00',
    status: 'Shipped',
    total: 399.99,
    items: [
      {
        id: 'prod-345',
        name: 'LIMI Track Base',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610017810004-a6f3c972fe0b?q=80&w=1974&auto=format&fit=crop'
      },
      {
        id: 'prod-678',
        name: 'Directional Spotlight',
        price: 39.99,
        quantity: 4,
        image: 'https://images.unsplash.com/photo-1507723820998-e4cc524e86e2?q=80&w=1974&auto=format&fit=crop'
      },
      {
        id: 'prod-901',
        name: 'Track Extension',
        price: 39.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1974&auto=format&fit=crop'
      }
    ],
    shippingAddress: {
      name: 'Sarah Johnson',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    trackingNumber: 'TRK-5678901234',
    estimatedDelivery: '2025-04-10'
  },
  {
    id: 'ORD-0123',
    date: '2024-12-10T09:30:00',
    status: 'Delivered',
    total: 159.99,
    items: [
      {
        id: 'prod-234',
        name: 'LIMI Smart Bulb Pack',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1550985543-49bee3167284?q=80&w=1974&auto=format&fit=crop'
      },
      {
        id: 'prod-567',
        name: 'LIMI Hub Controller',
        price: 59.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1974&auto=format&fit=crop'
      },
      {
        id: 'prod-890',
        name: 'Wall Switch',
        price: 19.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=1974&auto=format&fit=crop'
      }
    ],
    shippingAddress: {
      name: 'Sarah Johnson',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    trackingNumber: 'TRK-0123456789'
  }
];

// Favorites
export const mockFavorites = [
  {
    id: 'prod-123',
    name: 'LIMI Pendant Base',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1974&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 124,
    addedAt: '2025-03-10T14:30:00',
    inStock: true,
    category: 'Bases'
  },
  {
    id: 'prod-456',
    name: 'Frosted Glass Globe',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1974&auto=format&fit=crop',
    rating: 4.6,
    reviewCount: 89,
    addedAt: '2025-03-12T10:15:00',
    inStock: true,
    category: 'Pendants'
  },
  {
    id: 'prod-789',
    name: 'LIMI Chandelier Base',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1974&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 56,
    addedAt: '2025-03-15T16:45:00',
    inStock: true,
    category: 'Chandeliers'
  },
  {
    id: 'prod-012',
    name: 'RGB Light Panel',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1964&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 42,
    addedAt: '2025-03-18T09:30:00',
    inStock: false,
    category: 'Smart Lighting'
  },
  {
    id: 'prod-345',
    name: 'LIMI Track Base',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1610017810004-a6f3c972fe0b?q=80&w=1974&auto=format&fit=crop',
    rating: 4.5,
    reviewCount: 38,
    addedAt: '2025-03-20T11:20:00',
    inStock: true,
    category: 'Bases'
  },
  {
    id: 'prod-678',
    name: 'LIMI Smart Bulb Pack',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1550985543-49bee3167284?q=80&w=1974&auto=format&fit=crop',
    rating: 4.4,
    reviewCount: 112,
    addedAt: '2025-03-22T14:10:00',
    inStock: true,
    category: 'Smart Lighting'
  }
];


