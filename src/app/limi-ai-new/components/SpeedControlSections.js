export default function SpeedControlSections() {
  return (
    <>
      {/* Fast Section */}
      <section className="fast-section py-32 bg-gradient-to-r from-[#0AB6BC] to-[#045C43] shadow-[0_0_50px_rgba(10,182,188,0.3)]">
        <div className="container mx-auto px-8 text-center text-white">
          <h2 className="reveal-scale text-6xl font-bold mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Smart Home, Instantly.</h2>
          <p className="reveal-left text-2xl max-w-3xl mx-auto text-white/90">
            LIMI AI reacts at lightning speed — because comfort shouldn't wait.
          </p>
        </div>
      </section>

      {/* Slow Section */}
      <section className="slow-section py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0AB6BC]/10 via-transparent to-[#045C43]/10 animate-pulse"></div>
        <div className="container mx-auto px-8 text-center relative z-10">
          <h2 className="reveal-scale text-6xl font-bold mb-8 text-[#0AB6BC] drop-shadow-[0_0_20px_rgba(10,182,188,0.5)]">Effortless Living.</h2>
          <p className="reveal-right text-2xl max-w-3xl mx-auto text-[#F6F6F6]">
            Life sometimes needs to slow down. LIMI AI adapts to your pace, bringing calm and balance.
          </p>
        </div>
      </section>
    </>
  );
}
