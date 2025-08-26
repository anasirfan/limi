export default function PinnedSection() {
  return (
    <section className="pinned-section relative h-[200vh] bg-gradient-to-br from-[#021B23] via-[#0A2A35] to-[#1A3B47] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-radial from-[#0AB6BC]/30 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-radial from-[#50C878]/20 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-[#87CEAB]/15 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Flowing lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0AB6BC]/40 to-transparent animate-pulse"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#50C878]/30 to-transparent animate-pulse delay-500"></div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20stroke%3D%22%230AB6BC%22%20stroke-opacity%3D%220.05%22%20stroke-width%3D%221%22%3E%3Cpath%20d%3D%22M0%2020h40M20%200v40%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      <div className="pinned-text  top-0 h-screen flex items-center justify-center relative z-10">
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
