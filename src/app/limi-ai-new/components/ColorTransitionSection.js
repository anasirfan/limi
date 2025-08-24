export default function ColorTransitionSection() {
  return (
    <section className="color-transition-section py-32 bg-black">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-6xl font-bold mb-16 text-[#F6F6F6] drop-shadow-[0_0_15px_rgba(10,182,188,0.4)]">
          Seamless Adaptation
        </h2>
        <p className="text-2xl text-[#F6F6F6] max-w-3xl mx-auto">
          Just like colors blending in motion, LIMI AI smoothly adjusts to match your environment and mood.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {['black', '#0AB6BC', '#F6F6F6', '#021B23'].map((color, i) => (
            <div key={i} className="magnetic-element h-32 rounded-lg flex items-center justify-center font-bold text-xl border-2 border-[#0AB6BC] shadow-[0_0_15px_rgba(10,182,188,0.3)] hover:shadow-[0_0_25px_rgba(10,182,188,0.5)] transition-all duration-300" 
                 style={{
                   backgroundColor: color,
                   color: color === '#F6F6F6' ? 'black' : color === 'black' ? '#F6F6F6' : color === '#021B23' ? '#F6F6F6' : 'white'
                 }}>
              {i === 0 ? 'Black' : i === 1 ? 'Teal' : i === 2 ? 'Light' : 'Navy'}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
