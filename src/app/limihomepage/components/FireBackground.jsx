import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const FireBackground = ({
  intensity = 1.0,
  speed = 1.0,
  mouseInteractive = true,
  ...props
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uIntensity;
      uniform float uSpeed;
      varying vec2 vUv;

      // LIMI brand colors
      vec3 emerald = vec3(0.314, 0.784, 0.471);
      vec3 etonBlue = vec3(0.529, 0.812, 0.671);
      vec3 charleston = vec3(0.169, 0.176, 0.184);

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 0.0;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 st = vUv;
        vec2 pos = st;
        
        // Mouse interaction
        vec2 mouseInfluence = (uMouse - 0.5) * 0.3;
        pos += mouseInfluence * length(st - uMouse) * 0.1;
        
        // Create fire-like movement
        float time = uTime * uSpeed;
        pos.y += time * 0.1;
        pos.x += sin(pos.y * 3.0 + time) * 0.1;
        
        // Generate noise layers for fire effect
        float n1 = fbm(pos * 3.0 + time * 0.5);
        float n2 = fbm(pos * 6.0 + time * 0.8);
        float n3 = fbm(pos * 12.0 + time * 1.2);
        
        // Combine noise layers
        float fire = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
        
        // Create fire shape (stronger at bottom, weaker at top)
        float fireShape = smoothstep(0.0, 0.3, 1.0 - st.y) * smoothstep(0.0, 0.1, st.y);
        fire *= fireShape;
        
        // Add some turbulence
        fire += sin(st.x * 10.0 + time * 2.0) * sin(st.y * 8.0 + time * 1.5) * 0.1;
        
        // Create color gradient using LIMI colors
        vec3 color = mix(charleston, emerald, smoothstep(0.2, 0.6, fire));
        color = mix(color, etonBlue, smoothstep(0.6, 0.9, fire));
        
        // Add some brightness variation
        float brightness = 0.3 + fire * uIntensity;
        color *= brightness;
        
        // Add glow effect
        float glow = smoothstep(0.0, 0.5, fire) * 0.5;
        color += emerald * glow;
        
        // Fade edges
        float vignette = smoothstep(0.0, 0.3, st.x) * smoothstep(1.0, 0.7, st.x) * 
                        smoothstep(0.0, 0.2, st.y) * smoothstep(1.0, 0.8, st.y);
        
        gl_FragColor = vec4(color * vignette, fire * vignette);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Float32Array([1, 1]) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uIntensity: { value: intensity },
        uSpeed: { value: speed },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.uResolution.value[0] = clientWidth;
      program.uniforms.uResolution.value[1] = clientHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    function handleMouseMove(e) {
      if (!mouseInteractive) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouse = [x, y];
    }

    function handleMouseLeave() {
      targetMouse = [0.5, 0.5];
    }

    if (mouseInteractive) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    let animationId;
    function update(t) {
      if (mouseInteractive) {
        const smoothing = 0.05;
        currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      }
      
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uIntensity.value = intensity;
      program.uniforms.uSpeed.value = speed;

      renderer.render({ scene: mesh });
      animationId = requestAnimationFrame(update);
    }
    animationId = requestAnimationFrame(update);

    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      if (mouseInteractive) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [intensity, speed, mouseInteractive]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      {...props}
    />
  );
};

export default FireBackground;
