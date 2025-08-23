export default function SpeedControlSections() {
  return (
    <>
      {/* Fast Section */}
      <section className="fast-section py-32 bg-gradient-to-r from-emerald-500 to-emerald-600">
        <div className="container mx-auto px-8 text-center text-white">
          <h2 className="reveal-scale text-6xl font-bold mb-8">Smart Home, Instantly.</h2>
          <p className="reveal-left text-2xl max-w-3xl mx-auto">
            LIMI AI reacts at lightning speed — because comfort shouldn't wait.
          </p>
        </div>
      </section>

      {/* Slow Section */}
      <section className="slow-section py-32 bg-black">
        <div className="container mx-auto px-8 text-center text-white">
          <h2 className="reveal-scale text-6xl font-bold mb-8 text-emerald-500">Effortless Living.</h2>
          <p className="reveal-right text-2xl max-w-3xl mx-auto">
            Life sometimes needs to slow down. LIMI AI adapts to your pace, bringing calm and balance.
          </p>
        </div>
      </section>
    </>
  );
}
