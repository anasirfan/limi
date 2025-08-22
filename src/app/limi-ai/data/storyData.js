export const storyData = {
  sections: [
    {
      id: 'intro',
      stage: 'brand',
      height: '100vh',
      background: '#f3ebe2', // Soft Beige
      content: {
        eyebrow: "LIMI AI",
        headline: "What if your environment could think, learn, and respond?",
        subheadline: "Edge AI Infrastructure",
        description: "Ceiling-mounted hubs transform spaces into proactive, empathetic ecosystems that understand and anticipate.",
        features: [
          { icon: "HiCpuChip", text: "Local Processing" },
          { icon: "HiShieldCheck", text: "Privacy First" },
          { icon: "HiLightningBolt", text: "Instant Response" }
        ],
        iframeMessage: { type: 'SHOW_BRAND_INTRO' },
        messages: [
          'system:universal',
          'cable_0:system_base_2',
          'system:universal',
          'cable_1:system_base_2',
          'system:universal',
          'cable_2:system_base_2'
        ]
      }
    },
    {
      id: 'circuit',
      stage: 'circuit',
      height: '100vh',
      background: '#292929', // Charleston Green
      content: {
        eyebrow: "FOUNDATION",
        headline: "Every system starts with a spark.",
        subheadline: "The Raw Intelligence",
        description: "At the heart of every Limi hub lies a sophisticated circuit board—the neural foundation that processes, learns, and adapts in real-time.",
        stats: [
          { label: "Processing Power", value: "Edge AI Chip" },
          { label: "Response Time", value: "< 10ms" },
          { label: "Privacy", value: "100% Local" }
        ],
        highlights: [
          "ARM Cortex-A78 processor",
          "Dedicated AI acceleration",
          "Secure enclave for data protection",
          "Ultra-low latency processing"
        ],
        iframeMessage: { type: 'SHOW_CIRCUIT', stage: 'circuit' },
        messages: [
          'system:universal',
          'cable_0:system_base_3',
          'system:universal',
          'cable_1:system_base_3',
          'system:universal',
          'cable_2:system_base_3'
        ]
      }
    },
    {
      id: 'base',
      stage: 'base',
      height: '100vh',
      background: '#54bb74', // Emerald
      content: {
        eyebrow: "ASSEMBLY",
        headline: "From foundation to intelligence.",
        subheadline: "The Hub Takes Shape",
        description: "The circuit evolves into a complete base—your intelligent anchor point. Designed for ceiling mounting, it becomes the central nervous system of your space.",
        features: [
          { icon: "HiCube", text: "Modular Design", desc: "Expandable architecture" },
          { icon: "HiWifi", text: "Mesh Network", desc: "Seamless connectivity" },
          { icon: "HiShieldCheck", text: "Secure Core", desc: "End-to-end encryption" }
        ],
        specifications: [
          "Dimensions: 120mm x 120mm x 40mm",
          "Weight: 450g",
          "Power: 12V DC, 15W max",
          "Connectivity: WiFi 6, Bluetooth 5.2, Zigbee 3.0"
        ],
        iframeMessage: { type: 'ASSEMBLE_BASE', stage: 'base' },
        messages: [
          'system:universal',
          'cable_0:system_base_4',
          'system:universal',
          'cable_1:system_base_4',
          'system:universal',
          'cable_2:system_base_4'
        ]
      }
    },
    {
      id: 'base-complete',
      stage: 'base-complete',
      height: '100vh',
      background: '#93cfa2', // Eton
      content: {
        eyebrow: "READY",
        headline: "The hub is scalable, secure, and ready to expand.",
        subheadline: "Your Intelligent Anchor",
        description: "The completed base represents more than hardware—it's the foundation of an ecosystem that grows with your needs, learns from your patterns, and adapts to your lifestyle.",
        capabilities: [
          { title: "Edge Processing", desc: "All AI computation happens locally" },
          { title: "Expandable Modules", desc: "Add pendants, sensors, and systems" },
          { title: "Adaptive Learning", desc: "Understands usage patterns over time" },
          { title: "Privacy by Design", desc: "Your data never leaves your space" }
        ],
        cta: {
          primary: "Start Building Your Ecosystem",
          secondary: "Explore Technical Specs"
        },
        iframeMessage: { type: 'COMPLETE_BASE', stage: 'base-complete' },
        messages: [
          'system:universal',
          'cable_0:system_base_5',
          'system:universal',
          'cable_1:system_base_5',
          'system:universal',
          'cable_2:system_base_5'
        ]
      }
    },
    {
      id: 'ecosystem',
      stage: 'ecosystem',
      height: '100vh',
      background: '#292929', // Charleston Green
      content: {
        eyebrow: "MODULAR ECOSYSTEM",
        headline: "Intelligence that grows with you.",
        subheadline: "Beyond the Base",
        description: "Your Limi base is just the beginning. Add pendants for ambient lighting, systems for expanded functionality, and sensors for environmental awareness.",
        ecosystem: [
          { 
            type: "Pendants", 
            count: "1-8 per base",
            purpose: "Ambient lighting & presence detection",
            icon: "HiLightBulb"
          },
          { 
            type: "Systems", 
            count: "Unlimited",
            purpose: "Expanded functionality modules",
            icon: "HiCog"
          },
          { 
            type: "Sensors", 
            count: "4 types",
            purpose: "Environmental awareness",
            icon: "HiWifi"
          }
        ],
        iframeMessage: { type: 'SHOW_ECOSYSTEM', stage: 'ecosystem' },
        messages: [
          'system:universal',
          'cable_0:system_base_6',
          'system:universal',
          'cable_1:system_base_6',
          'system:universal',
          'cable_2:system_base_6'
        ]
      }
    },
    {
      id: 'pendants',
      stage: 'pendants',
      height: '120vh',
      background: '#f3ebe2', // Soft Beige
      content: {
        eyebrow: "PENDANT SELECTION",
        headline: "Style meets function.",
        subheadline: "Choose Your Lighting Personality",
        description: "Each pendant combines intelligent lighting with presence detection. Select your preferred style and watch it integrate with your base in real-time.",
        pendants: [
          {
            id: 'pendant-1',
            name: 'Minimalist',
            style: 'Clean lines, subtle presence',
            features: ['360° ambient light', 'Presence detection', 'Touch dimming'],
            specs: { lumens: '800lm', cri: '95+', temp: '2700K-6500K' },
            preview: '/images/pendant-1-preview.jpg'
          },
          {
            id: 'pendant-2',
            name: 'Industrial',
            style: 'Bold geometry, statement piece',
            features: ['Directional lighting', 'Motion tracking', 'Voice control'],
            specs: { lumens: '1200lm', cri: '90+', temp: '3000K-5000K' },
            preview: '/images/pendant-2-preview.jpg'
          },
          {
            id: 'pendant-3',
            name: 'Organic',
            style: 'Natural curves, warm ambiance',
            features: ['Circadian rhythm', 'Mood lighting', 'Gesture control'],
            specs: { lumens: '600lm', cri: '98+', temp: '2200K-4000K' },
            preview: '/images/pendant-3-preview.jpg'
          },
          {
            id: 'pendant-4',
            name: 'Architectural',
            style: 'Geometric precision, modern edge',
            features: ['Task lighting', 'Zone control', 'Schedule automation'],
            specs: { lumens: '1000lm', cri: '95+', temp: '2700K-6500K' },
            preview: '/images/pendant-4-preview.jpg'
          }
        ],
        interaction: {
          type: 'selection',
          feedback: 'You\'ve activated {pendantName}',
          iframeMessage: { type: 'SELECT_PENDANT', payload: '{pendantId}' }
        },
        messages: [
          'system:universal',
          'cable_0:system_base_7',
          'system:universal',
          'cable_1:system_base_7',
          'system:universal',
          'cable_2:system_base_7'
        ]
      }
    },
    {
      id: 'systems',
      stage: 'systems',
      height: '120vh',
      background: '#292929', // Charleston Green
      content: {
        eyebrow: "SYSTEM MODULES",
        headline: "Expand without limits.",
        subheadline: "Modular Intelligence",
        description: "System modules extend your base's capabilities. From climate control to security integration, each module adds new dimensions to your intelligent environment.",
        systems: [
          {
            id: 'climate-system',
            name: 'Climate Intelligence',
            category: 'Environmental',
            features: ['Temperature optimization', 'Humidity control', 'Air quality monitoring'],
            integration: ['HVAC systems', 'Smart thermostats', 'Air purifiers'],
            benefits: ['30% energy savings', 'Improved air quality', 'Predictive comfort']
          },
          {
            id: 'security-system',
            name: 'Security Network',
            category: 'Safety',
            features: ['Perimeter monitoring', 'Intrusion detection', 'Emergency response'],
            integration: ['Door locks', 'Camera systems', 'Alarm networks'],
            benefits: ['24/7 monitoring', 'Instant alerts', 'Automated responses']
          },
          {
            id: 'wellness-system',
            name: 'Wellness Optimization',
            category: 'Health',
            features: ['Sleep tracking', 'Activity monitoring', 'Stress detection'],
            integration: ['Wearable devices', 'Health apps', 'Medical systems'],
            benefits: ['Better sleep quality', 'Health insights', 'Wellness coaching']
          },
          {
            id: 'productivity-system',
            name: 'Productivity Suite',
            category: 'Work',
            features: ['Focus optimization', 'Meeting assistance', 'Workflow automation'],
            integration: ['Calendar systems', 'Video conferencing', 'Task management'],
            benefits: ['Increased focus', 'Meeting efficiency', 'Automated workflows']
          }
        ],
        interaction: {
          type: 'multi-select',
          feedback: 'System {systemName} integrated',
          iframeMessage: { type: 'ADD_SYSTEM', payload: '{systemId}' }
        },
        messages: [
          'system:universal',
          'cable_0:system_base_8',
          'system:universal',
          'cable_1:system_base_8',
          'system:universal',
          'cable_2:system_base_8'
        ]
      }
    },
    {
      id: 'sensors',
      stage: 'sensors',
      height: '120vh',
      background: '#54bb74', // Emerald
      content: {
        eyebrow: "SENSOR ACTIVATION",
        headline: "Now your world listens, feels, and adapts.",
        subheadline: "Environmental Intelligence",
        description: "Activate sensors to give your space the ability to perceive and respond. Each sensor type adds a new dimension of environmental awareness.",
        sensors: [
          {
            id: 'motion-sensor',
            name: 'Motion Intelligence',
            icon: 'HiUserGroup',
            capabilities: ['Presence detection', 'Movement patterns', 'Occupancy analytics'],
            applications: ['Automatic lighting', 'Energy optimization', 'Security monitoring'],
            technology: 'PIR + mmWave radar',
            range: '8m radius, 360°',
            privacy: 'Anonymous detection only'
          },
          {
            id: 'sound-sensor',
            name: 'Audio Awareness',
            icon: 'HiSpeakerWave',
            capabilities: ['Sound level monitoring', 'Voice commands', 'Audio events'],
            applications: ['Noise management', 'Voice control', 'Emergency detection'],
            technology: 'MEMS microphone array',
            range: '5m optimal, 360°',
            privacy: 'Local processing, no recording'
          },
          {
            id: 'temperature-sensor',
            name: 'Climate Sensing',
            icon: 'HiSun',
            capabilities: ['Temperature monitoring', 'Humidity tracking', 'Air quality'],
            applications: ['Climate control', 'Comfort optimization', 'Health monitoring'],
            technology: 'Multi-sensor environmental',
            range: 'Room-wide coverage',
            privacy: 'Anonymous environmental data'
          },
          {
            id: 'light-sensor',
            name: 'Illumination Intelligence',
            icon: 'HiLightBulb',
            capabilities: ['Ambient light detection', 'Color temperature', 'Circadian tracking'],
            applications: ['Automatic dimming', 'Circadian lighting', 'Energy efficiency'],
            technology: 'RGB + IR light sensor',
            range: '360° light detection',
            privacy: 'Light levels only'
          }
        ],
        interaction: {
          type: 'activation',
          feedback: '{sensorName} activated - {capability}',
          visualFeedback: 'Pulsing glow animation',
          iframeMessage: { type: 'ACTIVATE_SENSOR', payload: '{sensorId}' }
        },
        messages: [
          'system:universal',
          'cable_0:system_base_9',
          'system:universal',
          'cable_1:system_base_9',
          'system:universal',
          'cable_2:system_base_9'
        ]
      }
    },
    {
      id: 'finale',
      stage: 'finale',
      height: '100vh',
      background: 'linear-gradient(135deg, #0d6efd 0%, #6f42c1 50%, #e83e8c 100%)',
      content: {
        eyebrow: "ECOSYSTEM COMPLETE",
        headline: "Your intelligent environment is alive.",
        subheadline: "The Future is Now",
        description: "Witness your complete Limi ecosystem in action—base, pendants, systems, and sensors working in harmony to create an environment that thinks, learns, and evolves with you.",
        achievements: [
          { metric: "Intelligence Level", value: "Fully Activated" },
          { metric: "Response Time", value: "< 10ms" },
          { metric: "Privacy Score", value: "100% Local" },
          { metric: "Adaptability", value: "Continuous Learning" }
        ],
        experience: {
          title: "Your Space Now:",
          features: [
            "Automatically adjusts lighting based on time and activity",
            "Optimizes climate for comfort and energy efficiency", 
            "Responds to voice commands and gestures",
            "Learns your patterns and preferences",
            "Provides insights into space usage and wellness",
            "Integrates seamlessly with existing smart devices"
          ]
        },
        cta: {
          primary: {
            text: "Experience Limi",
            action: "Open configurator",
            style: "gradient-primary"
          },
          secondary: {
            text: "Build Your Own Ecosystem", 
            action: "Start customization",
            style: "outline-white"
          }
        },
        iframeMessage: { type: 'SHOW_COMPLETE_ECOSYSTEM', stage: 'finale' },
        messages: [
          'system:universal',
          'cable_0:system_base_10',
          'system:universal',
          'cable_1:system_base_10',
          'system:universal',
          'cable_2:system_base_10'
        ]
      }
    }
  ]
};
