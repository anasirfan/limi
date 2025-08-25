export default function PinnedSection() {
  return (
    <section className="pinned-section relative h-[200vh] bg-[#021B23]">
      <div className="pinned-text sticky top-0 h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-7xl font-bold mb-8 text-[#F6F6F6]">
            <span className="text-[#0AB6BC] drop-shadow-[0_0_15px_rgba(10,182,188,0.5)]">Adaptive</span> Intelligence
          </h2>
          <p className="text-2xl max-w-3xl mx-auto leading-relaxed text-[#F6F6F6]">
            LIMI AI senses, learns, and evolves — creating an environment that changes with you.
          </p>
        </div>
      </div>
    </section>
  );
}
