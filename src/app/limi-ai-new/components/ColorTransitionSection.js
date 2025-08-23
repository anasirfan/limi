export default function ColorTransitionSection() {
  return (
    <section className="color-transition-section py-32 bg-black">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-6xl font-bold mb-16 text-white">
          Seamless Adaptation
        </h2>
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
          Just like colors blending in motion, LIMI AI smoothly adjusts to match your environment and mood.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {['black', '#10b981', 'white', 'black'].map((color, i) => (
            <div key={i} className="magnetic-element h-32 rounded-lg flex items-center justify-center font-bold text-xl border-2 border-emerald-500" 
                 style={{
                   backgroundColor: color,
                   color: color === 'white' ? 'black' : color === 'black' ? 'white' : 'white'
                 }}>
              {i === 0 ? 'Black' : i === 1 ? 'Emerald' : i === 2 ? 'White' : 'Black'}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
