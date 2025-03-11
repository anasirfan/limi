import { useEffect, useRef } from "react";
import { particlesCursor } from "threejs-toys";

const CursorParticles = () => {
  const appRef = useRef(null);

  useEffect(() => {
    if (appRef.current) {
      particlesCursor({
        el: appRef.current,
        gpgpuSize: 512,
        colors: [0x00fffc, 0x0000ff],
        color: 0x0000ff,
        coordScale: 0.15,
      });
    }
  }, []);

  return <div ref={appRef} className=" fixed inset-0 pointer-events-none -z-10 " />;
};

export default CursorParticles;
