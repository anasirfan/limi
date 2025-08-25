export default function ProgressBar({ scrollProgress }) {
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-black z-50">
      <div 
        className="h-full bg-gradient-to-r from-[#0AB6BC] to-[#045C43] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(10,182,188,0.5)]"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
}
