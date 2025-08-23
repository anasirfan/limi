export default function HorizontalScrollSection() {
  const slides = [
    {
      id: 'ai-in-action',
      title: 'AI in Action',
      layout: 'intro-bento',
      blocks: [
        {
          type: 'video-main',
          content: 'AI Demo Video',
          description: 'Looping AI demo: robot writing, AI brain pulse, data streams',
          className: 'col-span-2 row-span-2',
          bg: 'bg-black border-2 border-emerald-500',
          videoPlaceholder: true
        },
        {
          type: 'heading',
          content: 'See Intelligence in Motion',
          className: 'col-span-1 row-span-1',
          bg: 'bg-gray-900 border border-emerald-500'
        },
        {
          type: 'text',
          content: 'From vision to voice, LIMI AI adapts to every challenge in real time.',
          className: 'col-span-1 row-span-1',
          bg: 'bg-emerald-500'
        }
      ]
    },
    {
      id: 'creative-ai',
      title: 'Creative AI',
      layout: 'dynamic-split',
      blocks: [
        {
          type: 'video-wide',
          content: 'AI Creating Art',
          description: 'Short video: AI generating art/code/design',
          className: 'col-span-3 row-span-1',
          bg: 'bg-black border-2 border-emerald-500',
          videoPlaceholder: true
        },
        {
          type: 'glitch-text',
          content: 'AI that Creates',
          className: 'col-span-1 row-span-1',
          bg: 'bg-gray-900 border border-emerald-500'
        },
        {
          type: 'image',
          content: 'AI Art Example',
          description: 'AI art example, futuristic UI design',
          className: 'col-span-2 row-span-1',
          bg: 'bg-gradient-to-r from-purple-600 to-pink-600 border border-emerald-500'
        }
      ]
    },
    {
      id: 'ai-power',
      title: 'AI Power',
      layout: 'data-grid',
      blocks: [
        {
          type: 'chart',
          content: 'Predictive Power',
          description: 'Animated chart showing AI predictions',
          className: 'col-span-1 row-span-1',
          bg: 'bg-gray-900 border-2 border-emerald-500'
        },
        {
          type: 'image',
          content: 'Futuristic City',
          description: 'AI-generated futuristic city image',
          className: 'col-span-1 row-span-1',
          bg: 'bg-gradient-to-br from-blue-600 to-cyan-500 border-2 border-emerald-500'
        },
        {
          type: 'stat',
          content: '1000x Faster Decisions',
          className: 'col-span-1 row-span-1',
          bg: 'bg-emerald-500 border-2 border-white'
        },
        {
          type: 'animation',
          content: 'Circuit Glow',
          description: 'Looping micro-animation: circuit glowing',
          className: 'col-span-1 row-span-1',
          bg: 'bg-black border-2 border-emerald-500'
        }
      ]
    },
    {
      id: 'human-ai',
      title: 'Human + AI',
      layout: 'focus-grid',
      blocks: [
        {
          type: 'video-tall',
          content: 'Human + AI Overlay',
          description: 'Person with holographic AI overlay',
          className: 'col-span-2 row-span-3',
          bg: 'bg-black border-2 border-emerald-500',
          videoPlaceholder: true
        },
        {
          type: 'heading',
          content: 'Adaptive to You',
          className: 'col-span-1 row-span-1',
          bg: 'bg-emerald-500'
        },
        {
          type: 'morph',
          content: 'Human ↔ AI',
          description: 'AI-generated face morph animation',
          className: 'col-span-1 row-span-1',
          bg: 'bg-gradient-to-r from-purple-600 to-blue-600 border border-emerald-500'
        },
        {
          type: 'text',
          content: 'Augmenting human creativity, not replacing it.',
          className: 'col-span-1 row-span-1',
          bg: 'bg-gray-900 border border-emerald-500'
        }
      ]
    },
    {
      id: 'future-vision',
      title: 'Future Vision',
      layout: 'celebration-grid',
      blocks: [
        {
          type: 'animated-text',
          content: 'Lighting Made Limitless',
          description: 'Animated text morph with particles',
          className: 'col-span-3 row-span-1',
          bg: 'bg-gradient-to-r from-emerald-500 to-green-400 border-2 border-white'
        },
        {
          type: 'video',
          content: 'Future City',
          description: 'AI futuristic cityscape video',
          className: 'col-span-1 row-span-1',
          bg: 'bg-black border-2 border-emerald-500',
          videoPlaceholder: true
        },
        {
          type: 'cta',
          content: 'Experience the Future →',
          className: 'col-span-2 row-span-1',
          bg: 'bg-emerald-500 border-2 border-white hover:shadow-emerald-500/50'
        }
      ]
    }
  ];

  const renderBlock = (block, slideIndex) => {
    const baseClasses = `${block.className} ${block.bg} p-6 flex items-center justify-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20`;
    
    switch (block.type) {
      case 'video-main':
      case 'video-wide':
      case 'video-tall':
      case 'video':
        return (
          <div key={block.content} className={baseClasses}>
            <div className="text-white">
              <div className="w-16 h-16 bg-emerald-500 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">{block.content}</h4>
              <p className="text-sm opacity-80">{block.description}</p>
            </div>
          </div>
        );
      
      case 'heading':
        return (
          <div key={block.content} className={baseClasses}>
            <h3 className="text-2xl font-bold text-emerald-400">{block.content}</h3>
          </div>
        );
      
      case 'glitch-text':
        return (
          <div key={block.content} className={baseClasses}>
            <h3 className="text-2xl font-bold text-emerald-400 animate-pulse">{block.content}</h3>
          </div>
        );
      
      case 'animated-text':
        return (
          <div key={block.content} className={baseClasses}>
            <h2 className="text-4xl font-bold text-white animate-pulse">{block.content}</h2>
          </div>
        );
      
      case 'text':
        return (
          <div key={block.content} className={baseClasses}>
            <p className="text-white text-lg leading-relaxed">{block.content}</p>
          </div>
        );
      
      case 'image':
        return (
          <div key={block.content} className={baseClasses}>
            <div className="text-white">
              <div className="w-12 h-12 bg-white/20 mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-sm font-semibold">{block.content}</h4>
            </div>
          </div>
        );
      
      case 'chart':
        return (
          <div key={block.content} className={baseClasses}>
            <div className="text-emerald-400">
              <div className="w-12 h-12 border-2 border-emerald-500 mx-auto mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-emerald-500 animate-pulse"></div>
              </div>
              <h4 className="text-lg font-bold">{block.content}</h4>
            </div>
          </div>
        );
      
      case 'stat':
        return (
          <div key={block.content} className={baseClasses}>
            <h3 className="text-2xl font-bold text-white">{block.content}</h3>
          </div>
        );
      
      case 'animation':
        return (
          <div key={block.content} className={baseClasses}>
            <div className="text-emerald-400">
              <div className="w-16 h-16 border border-emerald-500 mx-auto mb-2 flex items-center justify-center animate-pulse">
                <div className="w-8 h-8 bg-emerald-500/50"></div>
              </div>
              <p className="text-sm">{block.content}</p>
            </div>
          </div>
        );
      
      case 'morph':
        return (
          <div key={block.content} className={baseClasses}>
            <div className="text-white">
              <div className="text-3xl mb-2 animate-bounce">🤖</div>
              <h4 className="text-lg font-bold">{block.content}</h4>
            </div>
          </div>
        );
      
      case 'cta':
        return (
          <div key={block.content} className={`${baseClasses} cursor-pointer hover:bg-emerald-400`}>
            <h3 className="text-2xl font-bold text-white">{block.content}</h3>
          </div>
        );
      
      default:
        return (
          <div key={block.content} className={baseClasses}>
            <p className="text-white">{block.content}</p>
          </div>
        );
    }
  };

  const getGridLayout = (layout) => {
    switch (layout) {
      case 'intro-bento':
        return 'grid-cols-3 grid-rows-2';
      case 'dynamic-split':
        return 'grid-cols-3 grid-rows-2';
      case 'data-grid':
        return 'grid-cols-2 grid-rows-2';
      case 'focus-grid':
        return 'grid-cols-3 grid-rows-3';
      case 'celebration-grid':
        return 'grid-cols-3 grid-rows-2';
      default:
        return 'grid-cols-2 grid-rows-2';
    }
  };

  return (
    <section className="horizontal-scroll overflow-hidden bg-black">
      {/* Parallax Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent animate-pulse"></div>
      </div>
      
      <div className="flex h-screen">
        {slides.map((slide, slideIndex) => (
          <div key={slide.id} className="scroll-card flex-shrink-0 w-screen h-full flex items-center justify-center relative p-8">
            {/* Slide Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5"></div>
            
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              {/* Slide Title */}
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-white mb-4">{slide.title}</h2>
                <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
              </div>

              {/* Dynamic Bento Grid */}
              <div className={`grid ${getGridLayout(slide.layout)} gap-4 h-[600px]`}>
                {slide.blocks.map((block) => renderBlock(block, slideIndex))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
