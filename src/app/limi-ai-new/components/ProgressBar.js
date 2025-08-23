export default function ProgressBar({ scrollProgress }) {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-black z-50">
      <div 
        className="h-full bg-emerald-500 transition-all duration-300"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
}
