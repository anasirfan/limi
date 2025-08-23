export default function ParallaxSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="parallax-bg absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-emerald-600/20" />
      <div className="parallax-bg absolute inset-0 bg-gradient-to-l from-emerald-400/20 to-emerald-500/30 opacity-70" />
      <div className="parallax-bg absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-50" />
      
      <div className="relative z-10 text-center text-white">
        <h2 className="reveal-scale text-6xl font-bold mb-8">Technology with Depth</h2>
        <p className="reveal-left text-xl max-w-3xl mx-auto">
          Like layered intelligence working in harmony, LIMI AI adapts to every situation — comfort, creativity, security, and beyond.
        </p>
      </div>
    </section>
  );
}
