export default function CharacterRevealSection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[rgba(10,182,188,0.08)] via-transparent to-transparent opacity-60"></div>
      <div className="container mx-auto px-8 text-center relative z-10">
        <h2 className="char-reveal text-6xl font-bold mb-16 text-[#F6F6F6] drop-shadow-[0_0_20px_rgba(10,182,188,0.4)]">
          LIMI AI is not just smart. It's <span className="text-[#0AB6BC] drop-shadow-[0_0_15px_rgba(10,182,188,0.6)]">limitless</span>.
        </h2>
        {/* Neon cursor effect */}
        <div className="inline-block w-1 h-16 bg-[#0AB6BC] animate-pulse shadow-[0_0_10px_rgba(10,182,188,0.8)] ml-2"></div>
      </div>
    </section>
  );
}
