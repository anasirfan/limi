/**
 * Initial slide data for the customer presentation carousel
 * This data structure follows LIMI's brand guidelines with Charleston Green, Emerald, and Eton Blue colors
 */

export const initialSlides = [
  {
    id: 'slide1',
    layout: 'media-text-split',
    media: {
      type: 'video',
      urls: ['/videos/limi_intro.mp4'],
      position: 'left',
    },
    text: {
      heading: 'Smart Living',
      subheading: 'Personalized for You',
      description: 'Control light & mood with one touch.',
      bullets: ['Ambient modes', 'App Control', 'Modular Design'],
      alignment: 'right',
      verticalPosition: 'center',
      showBullets: true,
    },
    appearance: {
      theme: 'charleston',
      backgroundColor: '#2B2D2F', // Charleston Green
      overlayDarken: true,
      padding: '2rem',
    },
    meta: {
      index: 0,
      status: 'published',
    },
  },
  {
    id: 'slide2',
    layout: 'video-bg-text',
    media: {
      type: 'video',
      urls: ['/videos/limi_ambient.mp4'],
      position: 'background',
    },
    text: {
      heading: 'Seamless Integration',
      subheading: 'With Your Smart Home',
      description: 'LIMI connects with all major smart home platforms.',
      bullets: ['HomeKit', 'Google Home', 'Amazon Alexa', 'Samsung SmartThings'],
      alignment: 'center',
      verticalPosition: 'center',
      showBullets: true,
    },
    appearance: {
      theme: 'emerald',
      backgroundColor: '#50C878', // Emerald
      overlayDarken: true,
      padding: '2rem',
    },
    meta: {
      index: 1,
      status: 'published',
    },
  },
  {
    id: 'slide3',
    layout: 'image-collage',
    media: {
      type: 'multipleImages',
      urls: [
        '/images/products/limi_pendant1.jpg',
        '/images/products/limi_pendant2.jpg',
        '/images/products/limi_pendant3.jpg'
      ],
      position: 'overlap',
    },
    text: {
      heading: 'Modular Design',
      subheading: 'Endless Possibilities',
      description: 'Mix and match components to create your perfect lighting solution.',
      bullets: ['Interchangeable shades', 'Multiple base options', 'Expandable system'],
      alignment: 'left',
      verticalPosition: 'center',
      showBullets: true,
    },
    appearance: {
      theme: 'eton',
      backgroundColor: '#87CEAB', // Eton Blue
      overlayDarken: false,
      padding: '2rem',
    },
    meta: {
      index: 2,
      status: 'published',
    },
  },
  {
    id: 'slide4',
    layout: 'media-text-split',
    media: {
      type: 'image',
      urls: ['/images/products/limi_app.jpg'],
      position: 'right',
    },
    text: {
      heading: 'Intuitive Control',
      subheading: 'At Your Fingertips',
      description: 'The LIMI app gives you complete control over your lighting environment.',
      bullets: ['Scene creation', 'Scheduling', 'Voice commands', 'Energy monitoring'],
      alignment: 'left',
      verticalPosition: 'center',
      showBullets: true,
    },
    appearance: {
      theme: 'beige',
      backgroundColor: '#F2F0E6', // Alabaster/Soft Beige
      overlayDarken: false,
      padding: '2rem',
    },
    meta: {
      index: 3,
      status: 'published',
    },
  },
];
