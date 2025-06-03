 // Generate a unique ID for slides
 const generateUniqueId = (prefix = 'slide') => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${timestamp}-${randomStr}`;
  };
  

export const slideTemplates = {
    modern: {
      name: "Modern & Sleek",
      description: "Clean, minimalist design with focus on product features",
      thumbnail: "/images/templates/modern-template.jpg",
      slides: [
        {
          id: generateUniqueId('template'),
          layout: 'media-text-split',
          media: {
            type: 'image',
            urls: ['/images/limi-product-1.jpg'],
            position: 'left',
          },
          text: {
            heading: 'Smart Lighting Solutions',
            subheading: 'Modern Design for Modern Spaces',
            description: 'Elevate your environment with intelligent lighting that adapts to your needs.',
            bullets: ['Intuitive Controls', 'Energy Efficient', 'Seamless Integration'],
            alignment: 'right',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 0,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'video-background',
          media: {
            type: 'video',
            urls: ['/videos/limi-ambient.mp4'],
            position: 'background',
          },
          text: {
            heading: 'Ambient Intelligence',
            subheading: 'Lighting that understands you',
            description: 'Our smart systems learn your preferences and adapt automatically.',
            bullets: [],
            alignment: 'center',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: false,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#000000',
            overlayDarken: true,
            padding: '2rem',
          },
          meta: {
            index: 1,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'image-collage',
          media: {
            type: 'image',
            urls: [
              '/images/limi-installation-1.jpg',
              '/images/limi-installation-2.jpg',
              '/images/limi-installation-3.jpg',
              '/images/limi-installation-4.jpg'
            ],
            position: 'grid',
          },
          text: {
            heading: 'Installations',
            subheading: 'See our work in action',
            description: 'Explore our recent projects and installations.',
            bullets: [],
            alignment: 'center',
            verticalPosition: 'top',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: false,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 2,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'media-text-split',
          media: {
            type: 'image',
            urls: ['/images/limi-features.jpg'],
            position: 'right',
          },
          text: {
            heading: 'Key Features',
            subheading: 'What sets us apart',
            description: 'Discover the technology behind our lighting solutions.',
            bullets: [
              'Adaptive Brightness',
              'Color Temperature Control',
              'Scene Programming',
              'Voice & App Control',
              'Energy Usage Monitoring'
            ],
            alignment: 'left',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 3,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'full-width-text',
          media: {
            type: 'none',
            urls: [],
            position: 'none',
          },
          text: {
            heading: 'Customized Solutions',
            subheading: 'Tailored to your needs',
            description: 'We work with you to create the perfect lighting system for your space.',
            bullets: [
              'Consultation & Design',
              'Professional Installation',
              'Programming & Setup',
              'Maintenance & Support'
            ],
            alignment: 'center',
            verticalPosition: 'center',
            showHeading: true, 
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'emerald',
            backgroundColor: '#50C878',
            overlayDarken: false,
            padding: '3rem',
          },
          meta: {
            index: 4,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'media-text-split',
          media: {
            type: 'image',
            urls: ['/images/limi-contact.jpg'],
            position: 'left',
          },
          text: {
            heading: 'Get Started',
            subheading: 'Contact us today',
            description: 'Ready to transform your space with intelligent lighting?',
            bullets: [
              'Schedule a Consultation',
              'Request a Quote',
              'Visit our Showroom'
            ],
            alignment: 'right',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 5,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        }
      ]
    },
    showcase: {
      name: "Product Showcase",
      description: "Highlight product features and benefits with visual emphasis",
      thumbnail: "/images/templates/showcase-template.jpg",
      slides: [
        {
          id: generateUniqueId('template'),
          layout: 'video-background',
          media: {
            type: 'video',
            urls: ['/videos/limi_intro.mp4'],
            position: 'background',
          },
          text: {
            heading: 'LIMI Lighting Solutions',
            subheading: 'Intelligent Illumination',
            description: 'Transform your space with smart lighting technology.',
            bullets: [],
            alignment: 'center',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: false,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#000000',
            overlayDarken: true,
            padding: '2rem',
          },
          meta: {
            index: 0,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'media-text-split',
          media: {
            type: 'image',
            urls: ['/images/limi-pendant.jpg'],
            position: 'left',
          },
          text: {
            heading: 'LIMI Pendant Series',
            subheading: 'Elegant Design, Smart Function',
            description: 'Our flagship pendant lights combine stunning aesthetics with intelligent controls.',
            bullets: [
              'Adjustable Color Temperature',
              'Dimmable Brightness',
              'Scene Programming',
              'Voice Control Compatible'
            ],
            alignment: 'right',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 1,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'media-text-split',
          media: {
            type: 'image',
            urls: ['/images/limi-recessed.jpg'],
            position: 'right',
          },
          text: {
            heading: 'Recessed Lighting',
            subheading: 'Subtle Sophistication',
            description: 'Discreet lighting solutions that make a powerful impact.',
            bullets: [
              'Seamless Integration',
              'Zonal Control',
              'Energy Efficient',
              'Easy Installation'
            ],
            alignment: 'left',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 2,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'image-collage',
          media: {
            type: 'image',
            urls: [
              '/images/limi-app-1.jpg',
              '/images/limi-app-2.jpg',
              '/images/limi-app-3.jpg',
              '/images/limi-app-4.jpg'
            ],
            position: 'grid',
          },
          text: {
            heading: 'LIMI Control App',
            subheading: 'Control at Your Fingertips',
            description: 'Manage your entire lighting system from our intuitive mobile application.',
            bullets: [],
            alignment: 'center',
            verticalPosition: 'top',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: false,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 3,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'media-text-split',
          media: {
            type: 'image',
            urls: ['/images/limi-hub.jpg'],
            position: 'left',
          },
          text: {
            heading: 'LIMI Connect Hub',
            subheading: 'The Brain of Your System',
            description: 'Our central hub connects all your lighting elements into one cohesive system.',
            bullets: [
              'Wireless Connectivity',
              'Smart Home Integration',
              'Automatic Updates',
              'Expandable Design'
            ],
            alignment: 'right',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 4,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'full-width-text',
          media: {
            type: 'none',
            urls: [],
            position: 'none',
          },
          text: {
            heading: 'Ready to Upgrade?',
            subheading: 'Special Offer for You',
            description: 'Contact us today to receive a customized quote and installation timeline.',
            bullets: [
              'Complimentary Consultation',
              'Professional Installation',
              'Extended Warranty',
              '24/7 Support'
            ],
            alignment: 'center',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'emerald',
            backgroundColor: '#50C878',
            overlayDarken: false,
            padding: '3rem',
          },
          meta: {
            index: 5,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        }
      ]
    },
    corporate: {
      name: "Corporate & Professional",
      description: "Clean, business-focused presentation with emphasis on solutions",
      thumbnail: "/images/templates/corporate-template.jpg",
      slides: [
        {
          id: generateUniqueId('template'),
          layout: 'media-text-split',
          media: {
            type: 'image',
            urls: ['/images/limi-corporate-1.jpg'],
            position: 'right',
          },
          text: {
            heading: 'Commercial Lighting Solutions',
            subheading: 'For Modern Businesses',
            description: 'Enhance productivity and create the perfect atmosphere with intelligent lighting systems.',
            bullets: [
              'Energy Efficiency',
              'Centralized Management',
              'Customizable Environments',
              'Regulatory Compliance'
            ],
            alignment: 'left',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 0,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'full-width-text',
          media: {
            type: 'none',
            urls: [],
            position: 'none',
          },
          text: {
            heading: 'Our Approach',
            subheading: 'Comprehensive Solutions',
            description: 'We deliver end-to-end lighting solutions tailored to your business needs.',
            bullets: [
              'Needs Assessment & Analysis',
              'Custom Design & Planning',
              'Professional Installation',
              'Training & Support',
              'Ongoing Maintenance'
            ],
            alignment: 'center',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '3rem',
          },
          meta: {
            index: 1,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'image-collage',
          media: {
            type: 'image',
            urls: [
              '/images/limi-office-1.jpg',
              '/images/limi-office-2.jpg',
              '/images/limi-office-3.jpg',
              '/images/limi-office-4.jpg'
            ],
            position: 'grid',
          },
          text: {
            heading: 'Case Studies',
            subheading: 'Success Stories',
            description: 'See how our solutions have transformed workspaces across industries.',
            bullets: [],
            alignment: 'center',
            verticalPosition: 'top',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: false,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 2,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'media-text-split',
          media: {
            type: 'image',
            urls: ['/images/limi-energy-savings.jpg'],
            position: 'left',
          },
          text: {
            heading: 'ROI & Energy Savings',
            subheading: 'The Bottom Line',
            description: 'Our systems typically deliver 30-50% energy savings with a clear return on investment.',
            bullets: [
              'Reduced Energy Consumption',
              'Lower Maintenance Costs',
              'Extended Equipment Lifespan',
              'Utility Rebate Eligibility',
              'Enhanced Productivity'
            ],
            alignment: 'right',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 3,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'media-text-split',
          media: {
            type: 'image',
            urls: ['/images/limi-management-system.jpg'],
            position: 'right',
          },
          text: {
            heading: 'Management System',
            subheading: 'Central Control',
            description: 'Our enterprise management platform gives you complete control over your lighting infrastructure.',
            bullets: [
              'Real-time Monitoring',
              'Scheduled Operations',
              'Usage Analytics',
              'Remote Management',
              'Multi-location Support'
            ],
            alignment: 'left',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'charleston',
            backgroundColor: '#2B2D2F',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 4,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        },
        {
          id: generateUniqueId('template'),
          layout: 'media-text-split',
          media: {
            type: 'image',
            urls: ['/images/limi-contact-corporate.jpg'],
            position: 'left',
          },
          text: {
            heading: 'Next Steps',
            subheading: 'Start Your Lighting Transformation',
            description: 'Contact our commercial team to schedule a consultation and site assessment.',
            bullets: [
              'Email: commercial@limilighting.com',
              'Phone: (555) 123-4567',
              'Web: limilighting.com/commercial'
            ],
            alignment: 'right',
            verticalPosition: 'center',
            showHeading: true,
            showSubheading: true,
            showDescription: true,
            showBullets: true,
          },
          appearance: {
            theme: 'emerald',
            backgroundColor: '#50C878',
            overlayDarken: false,
            padding: '2rem',
          },
          meta: {
            index: 5,
            status: 'published',
            updatedAt: new Date().toISOString()
          }
        }
      ]
    }
  };