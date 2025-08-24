export default function ParallaxSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Triple-layer parallax gradients with teal theme */}
      <div className="parallax-bg absolute inset-0 bg-gradient-to-r from-[#0AB6BC]/30 to-[#045C43]/20" />
      <div className="parallax-bg absolute inset-0 bg-gradient-to-l from-[#045C43]/20 to-[#0AB6BC]/30 opacity-70" />
      <div className="parallax-bg absolute inset-0 bg-gradient-to-t from-[#021B23]/40 to-transparent opacity-60" />
      
      <div className="relative z-10 text-center">
        <h2 className="reveal-scale text-6xl font-bold mb-8 text-[#F6F6F6] drop-shadow-[0_0_15px_rgba(10,182,188,0.4)]">
          Technology with <span className="text-[#0AB6BC] underline decoration-[#0AB6BC] decoration-2 underline-offset-4 drop-shadow-[0_0_10px_rgba(10,182,188,0.6)]">Depth</span>
        </h2>
        <p className="reveal-left text-xl max-w-3xl mx-auto text-[#F6F6F6] leading-relaxed">
          Like layered intelligence working in harmony, LIMI AI adapts to every situation — comfort, creativity, security, and beyond.
        </p>
      </div>
    </section>
  );
}
