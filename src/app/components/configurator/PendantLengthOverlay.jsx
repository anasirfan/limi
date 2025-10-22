import React from 'react';

const PendantLengthOverlay = ({ isVisible = true, onClose }) => {
  if (!isVisible) return null;

  
return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        role="application"
        aria-label="Adjust pendant length"
        aria-describedby="pendant-instructions"
      >
        <defs>
          {/* Backdrop blur filter */}
          <filter id="backdropBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="24" result="blur" />
          </filter>

          {/* Shadow filters */}
          <filter id="mountShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="rgba(0,0,0,0.35)" />
          </filter>

          <filter id="handShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.2)" />
          </filter>

          {/* Glass blur */}
          <filter id="glassBlur">
            <feGaussianBlur stdDeviation="1" />
          </filter>

    
          {/* Radial gradient for vignette */}
          <radialGradient id="vignetteGrad" cx="50%" cy="42%" r="58%">
            <stop offset="0%" stopColor="rgba(22,24,28,0.85)" />
            <stop offset="60%" stopColor="rgba(22,24,28,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.0)" />
          </radialGradient>

          {/* Pendant clip path */}
          <clipPath id="pendantClip">
            <path d="M 0 5 L 25 30 L 0 55 L -25 30 Z" />
          </clipPath>

          {/* Glow gradient */}
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <style>
          {`
            .pendant-overlay {
              font-family: Inter, ui-sans-serif, system-ui;
            }
            .pendant-sway {
              animation: pendantSway 3000ms ease-in-out infinite alternate;
            }
            .glow-breath {
              animation: glowBreath 2000ms ease-in-out infinite alternate;
    
              }
            @keyframes pendantSway {
              0% { transform: rotate(2deg); }
              100% { transform: rotate(-2deg); }
            }
            @keyframes glowBreath {
              0% { opacity: 0.6; }
              100% { opacity: 0.9; }
            }
            .fade-out {
              animation: fadeOut 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            @keyframes fadeOut {
              to { opacity: 0; }
            }
          `}
        </style>

        {/* Clean light background */}
        <rect
          width="100%"
          height="100%"
          fill="#f5f5f5"
          id="backdrop"
        />

        {/* Mount */}
        <ellipse
          cx="400"
          cy="120"
          rx="30"
          ry="14"
          fill="#0E0F12"
          filter="url(#mountShadow)"
        />

        {/* Cable */}
        <line
          id="cable"
          x1="400"
          y1="134"
          x2="400"
          y2="280"
          stroke="#1C1D21"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Pendant group - positioned at cable end */}
        <g
          id="pendantGroup"
          className="pendant-sway"
          style={{ cursor: 'grab' }}
          tabIndex="0"
          role="slider"
          aria-label="Pendant length adjuster"
          aria-valuemin="90"
          aria-valuemax="360"
          aria-valuenow="220"
          aria-describedby="pendant-instructions"
        >

          {/* Pendant glass - clean white fill */}
          <path
            id="pendantGlass"
            d="M 400 285 L 425 310 L 400 335 L 375 310 Z"
            fill="rgba(255,255,255,0.9)"
          />

          {/* Pendant frame - gold/yellow border */}
          <path
            id="pendantFrame"
            d="M 400 285 L 425 310 L 400 335 L 375 310 Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </g>

        {/* Instructions text */}
        <g id="instructionsText">
          <text
            x="680"
            y="100"
            fill="#333333"
            fontSize="16"
            fontWeight="600"
            textAnchor="end"
            className="pendant-overlay"
          >
            Adjust Pendant Length
          </text>
          <text
            x="680"
            y="120"
            fill="#666666"
            fontSize="12"
            fontWeight="400"
            textAnchor="end"
            className="pendant-overlay"
            id="pendant-instructions"
          >
            Drag the pendant up or down
          </text>
        </g>

        {/* Close button */}
        {onClose && (
          <g
            id="closeButton"
            style={{ cursor: 'pointer' }}
            onClick={onClose}
          >
            <circle cx="750" cy="50" r="18" fill="rgba(0,0,0,0.1)" stroke="#999" strokeWidth="1" />
            <path
              d="M 742 42 L 758 58 M 758 42 L 742 58"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}

        <script>
          {`
            (function() {
              const TOKENS = {
                colors: {
                  bgDim: "rgba(10,11,14,0.55)",
                  mount: "#0E0F12",
                  cable: "#1C1D21",
                  frame: "#A1A800",
                  glass: "rgba(255,255,255,0.08)",
                  glow: "rgba(255,255,255,0.45)",
                  hint: "#7EE0FF",
                  hintWeak: "rgba(126,224,255,0.25)",
                  text: "#E9EDF2",
                  textWeak: "rgba(233,237,242,0.75)"
                },
                sizes: {
                  mountRadius: 30,
                  mountHeight: 14,
                  cableWidth: 3,
                  pendantOuter: 86,
                  pendantStroke: 5,
                  handSize: 34,
                  dragArrowGap: 18,
                  dragArrowLength: 36,
                  blurMax: 24,
                  blurMin: 6
                },
                motion: {
                  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
                  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
                  durations: { intro: 700, pulse: 1400, handLoop: 2600, hintFade: 400 },
                  cableMin: 90,
                  cableMax: 360,
                  tiltMax: 16,
                  restTilt: 12
                }
              };

              let state = {
                cable: 220,
                target: 220,
                dragging: false,
                lastY: 0,
                vy: 0,
                tilt: 0,
                glow: 0.8
              };

              const elements = {
                cable: document.getElementById('cable'),
                pendantGroup: document.getElementById('pendantGroup')
              };

              function clamp(v, a, b) {
                return Math.max(a, Math.min(b, v));
              }

              function map(value, inMin, inMax, outMin, outMax) {
                return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
              }

              function getPointerY(e) {
                return e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
              }

              function updateCable(length) {
                const cableEndY = 134 + length;
                
                // Update cable end position
                if (elements.cable) {
                  elements.cable.setAttribute('y2', cableEndY);
                }
                
                // Update pendant positions to follow cable end
                if (elements.pendantGroup) {
                  const pendantOffset = cableEndY - 280; // Original cable end was at 280
                  
                  // Update glass position
                  const glass = elements.pendantGroup.querySelector('#pendantGlass');
                  if (glass) {
                    const newPath = \`M 400 \${285 + pendantOffset} L 425 \${310 + pendantOffset} L 400 \${335 + pendantOffset} L 375 \${310 + pendantOffset} Z\`;
                    glass.setAttribute('d', newPath);
                  }
                  
                  // Update frame position
                  const frame = elements.pendantGroup.querySelector('#pendantFrame');
                  if (frame) {
                    const newPath = \`M 400 \${285 + pendantOffset} L 425 \${310 + pendantOffset} L 400 \${335 + pendantOffset} L 375 \${310 + pendantOffset} Z\`;
                    frame.setAttribute('d', newPath);
                  }
                  
                  // Apply tilt rotation around pendant center
                  elements.pendantGroup.style.transform = \`rotate(\${state.tilt}deg)\`;
                  elements.pendantGroup.style.transformOrigin = \`400px \${310 + pendantOffset}px\`;
                }
              }

              function updateTilt(tilt) {
                state.tilt = tilt;
              }


              function showPressed(pressed) {
                if (elements.pendantGroup) {
                  elements.pendantGroup.style.cursor = pressed ? 'grabbing' : 'grab';
                  elements.pendantGroup.style.transform += pressed ? ' scale(0.98)' : '';
                }
              }

              function onPointerDown(e) {
                e.preventDefault();
                state.dragging = true;
                state.lastY = getPointerY(e);
                
                if (elements.pendantGroup && elements.pendantGroup.setPointerCapture) {
                  elements.pendantGroup.setPointerCapture(e.pointerId);
                }
                
                showPressed(true);
              }

              function onPointerMove(e) {
                if (!state.dragging) return;
                e.preventDefault();
                
                const y = getPointerY(e);
                const dy = y - state.lastY;
                state.lastY = y;
                state.target = clamp(state.target + dy, TOKENS.motion.cableMin, TOKENS.motion.cableMax);
                state.vy = dy;
              }

              function onPointerUp(e) {
                e.preventDefault();
                state.dragging = false;
                showPressed(false);
              }

              function onKeyDown(e) {
                if (e.target === elements.pendantGroup) {
                  let delta = 0;
                  if (e.key === 'ArrowUp') {
                    delta = -8;
                    e.preventDefault();
                  } else if (e.key === 'ArrowDown') {
                    delta = 8;
                    e.preventDefault();
                  }
                  
                  if (delta !== 0) {
                    state.target = clamp(state.target + delta, TOKENS.motion.cableMin, TOKENS.motion.cableMax);
                  }
                }
              }

              function tick() {
                // Smooth approach to target
                const k = 0.15;
                const d = 0.25;
                const diff = state.target - state.cable;
                state.cable += diff * k;
                state.vy *= (1 - d);

                // Update visuals
                updateCable(state.cable);
                updateTilt(clamp(state.vy * 0.5, -5, 5)); // Subtle tilt based on movement

                // Update aria-valuenow
                if (elements.pendantGroup) {
                  elements.pendantGroup.setAttribute('aria-valuenow', Math.round(state.cable));
                }

                requestAnimationFrame(tick);
              }

              // Event listeners
              if (elements.pendantGroup) {
                elements.pendantGroup.addEventListener('pointerdown', onPointerDown);
                elements.pendantGroup.addEventListener('pointermove', onPointerMove);
                elements.pendantGroup.addEventListener('pointerup', onPointerUp);
                elements.pendantGroup.addEventListener('pointercancel', onPointerUp);
                elements.pendantGroup.addEventListener('keydown', onKeyDown);
                
                // Touch events for better mobile support
                elements.pendantGroup.addEventListener('touchstart', onPointerDown, { passive: false });
                elements.pendantGroup.addEventListener('touchmove', onPointerMove, { passive: false });
                elements.pendantGroup.addEventListener('touchend', onPointerUp, { passive: false });
              }

              // Start animation loop
              requestAnimationFrame(tick);
            })();
          `}
        </script>
      </svg>
    </div>
  );
};

export default PendantLengthOverlay;
