export default function TextMorphingSection() {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-8 text-center">
        <h2 className="morph-text text-5xl font-bold mb-16 text-white" style={{perspective: '700px'}}>
          Comfort → <span className="text-emerald-500">Security</span> → Creativity → <span className="text-emerald-500">Efficiency</span> → You
        </h2>
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
          Everything adapts around you, and always returns to the most important focus: You.
        </p>
      </div>
    </section>
  );
}
