"use client";
import Image from "next/image";

function HeroSection() {
  return (
    <>
      <div
        className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden
        "
      >
        {/* //  bg-gradient-to-br from-[#292929] via-[#2d3d33] to-[#54bb74]/20 */}
        {/* Background Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#292929]/40 to-[#54bb74]/10"></div> */}
        {/* Glow effect container */}
        {/* <div className="absolute w-full h-full overflow-hidden"> */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        >
          <source src="/videos/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          {/* White glow for shell */}
          {/* <div className="absolute inset-0 bg-white opacity-40 blur-[100px] animate-pulse" />
            <div className="absolute inset-0 bg-white opacity-30 blur-[150px] animate-pulse delay-100" /> */}

          {/* Warm color overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-500 opacity-30 blur-[120px] animate-pulse delay-200" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-600 opacity-20 blur-[180px] animate-pulse delay-300" /> */}

          {/* Additional ambient reflection */}
          {/* <div className="absolute inset-0 bg-white/40 mix-blend-overlay blur-[80px] animate-pulse" />
            <div className="absolute inset-0 bg-yellow-400/20 mix-blend-screen blur-[100px] animate-pulse delay-150" /> */}
          {/* </div> */}
        </div>
        {/* Main Content */}
        <div className="container mx-auto px-4 hero-content relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Heading */}
            <div className="text-white self-end -mb-6 max-sm:-mb-12">
              <h1 className="text-3xl md:text-6xl max-sm:text-2xl font-bold mb-6">
                From Standard to Smart
              </h1>
            </div>
            {/* Right Side - Description and CTA */}
            <div className="text-white/80">
              <p className="hero-description text-lg max-sm:text-sm mb-8 leading-relaxed">
                Experience the future of lighting with our innovative smart
                solutions. Our intelligent design seamlessly adapts to your
                needs, putting modular innovation and intuitive control at your
                fingertips. Join us in revolutionizing modern illumination
                technology and transform your space into something
                extraordinary.
              </p>

              <button className="cta-button px-8 py-4 bg-[#54bb74] text-white rounded-full text-lg font-bold transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#54bb74]/30 hover:bg-[#93cfa2] focus:outline-none focus:ring-2 focus:ring-[#54bb74] focus:ring-opacity-50">
                Explore Smart Lighting
              </button>
            </div>
          </div>
        </div>

        {/* Logo at Bottom */}
        <div className="hero-logo mt-20 w-full max-w-5xl mx-auto px-4 relative z-20">
          <Image
            src="/images/svgLogos/__Primary_Logo_Black.svg"
            alt="Limi Logo"
            width={400}
            height={200}
            className="w-full h-auto invert opacity-80"
            priority
          />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
