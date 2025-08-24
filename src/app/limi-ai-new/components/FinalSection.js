export default function FinalSection() {
  return (
    <section className="final-section relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Emerald gradient nebula background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0AB6BC]/15 via-[#045C43]/8 to-transparent" />
      {/* Star particles pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230AB6BC' fill-opacity='0.05'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="relative z-10 text-center">
        <h2 className="final-text text-5xl font-bold mb-12 opacity-0 scale-75 text-[#F6F6F6] drop-shadow-[0_0_25px_rgba(10,182,188,0.5)]">
          LIMI AI — <span className="text-[#0AB6BC] drop-shadow-[0_0_20px_rgba(10,182,188,0.7)]">Lighting Made Limitless.</span>
        </h2>
        <div className="completion-badge w-40 h-40 bg-gradient-to-br from-[#0AB6BC] to-[#045C43] rounded-full mx-auto flex items-center justify-center opacity-0 scale-0 mb-8 shadow-[0_0_30px_rgba(10,182,188,0.6)]">
          <span className="text-white font-bold text-lg">AI That Adapts</span>
        </div>
        <p className="char-reveal text-2xl mt-8 opacity-80 max-w-4xl mx-auto leading-relaxed text-[#F6F6F6]">
          Welcome to the future where intelligence feels human.
        </p>
      </div>
    </section>
  );
}
