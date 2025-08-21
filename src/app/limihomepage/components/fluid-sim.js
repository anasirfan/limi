// fluid-sim.js
// This file should export a default function that takes a canvas and starts the simulation.
// You should paste the shader + simulation logic here, replacing any document.querySelector('canvas') with the passed-in canvas.

export default function startSimulation(canvas) {
  if (!canvas) return;

  const gl = canvas.getContext("webgl2", { alpha: true });
  if (!gl) {
    alert("WebGL2 not supported");
    return;
  }

  // 👉 paste the shader + simulation logic here
  // just replace `document.querySelector('canvas')` with `canvas`
}
