import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [paragraphVisible, setParagraphVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setTitleVisible(true), 500);
    const timer2 = setTimeout(() => setSubtitleVisible(true), 1500);
    const timer3 = setTimeout(() => setParagraphVisible(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent" />
      <div className="parallax-bg absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2310b981%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
      
      <div className="hero-title text-center text-white">
        <h1 className={`text-8xl md:text-9xl font-bold leading-none mb-6 transition-all duration-1000 ${
          titleVisible ? 'opacity-100 blur-0 transform translate-y-0' : 'opacity-0 blur-sm transform translate-y-8'
        }`}>
          <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            LIMI AI
          </span>
        </h1>
        <h2 className={`text-4xl md:text-5xl font-semibold mb-8 transition-all duration-1000 delay-300 ${
          subtitleVisible ? 'opacity-100 blur-0 transform translate-y-0' : 'opacity-0 blur-sm transform translate-y-8'
        }`}>
          The AI that adapts to you.
        </h2>
        <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
          paragraphVisible ? 'opacity-90 blur-0 transform translate-y-0' : 'opacity-0 blur-sm transform translate-y-8'
        }`}>
          Lighting Made Limitless — experience intelligence that blends seamlessly into everyday life.
        </p>
      </div>
    </section>
  );
}
