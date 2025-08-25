export default function TextMorphingSection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[rgba(10,182,188,0.1)] via-transparent to-transparent opacity-50"></div>
      <div className="container mx-auto px-8 text-center relative z-10">
        <h2 className="morph-text text-5xl font-bold mb-16 text-[#F6F6F6] drop-shadow-[0_0_20px_rgba(10,182,188,0.4)]" style={{perspective: '700px'}}>
          Comfort → <span className="text-[#0AB6BC] drop-shadow-[0_0_15px_rgba(10,182,188,0.6)]">Security</span> → Creativity → <span className="text-[#0AB6BC] drop-shadow-[0_0_15px_rgba(10,182,188,0.6)]">Efficiency</span> → You
        </h2>
        <p className="text-2xl text-[#F6F6F6] max-w-3xl mx-auto">
          Everything adapts around you, and always returns to the most important focus: You.
        </p>
      </div>
    </section>
  );
}
