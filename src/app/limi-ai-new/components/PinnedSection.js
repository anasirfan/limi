export default function PinnedSection() {
  return (
    <section className="pinned-section relative h-[200vh] bg-white">
      <div className="pinned-text sticky top-0 h-screen flex items-center justify-center">
        <div className="text-center text-black">
          <h2 className="text-7xl font-bold mb-8">
            <span className="text-emerald-500">Adaptive</span> Intelligence
          </h2>
          <p className="text-2xl max-w-3xl mx-auto leading-relaxed">
            LIMI AI senses, learns, and evolves — creating an environment that changes with you.
          </p>
        </div>
      </div>
    </section>
  );
}
