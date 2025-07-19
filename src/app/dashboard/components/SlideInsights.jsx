import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

/**
 * SlideInsights
 * @param {Object} props
 * @param {Object[]} props.slideTimes - Array of { slideId, slideTitle, seconds }
 * @param {Object[]} props.sessions - Array of { sessionStart, sessionEnd, durationSeconds }
 */
export default function SlideInsights({ slideTimes = [], sessions = [] }) {
  const [hoveredSlideIndex, setHoveredSlideIndex] = React.useState(null);
  const [hoveredSessionIndex, setHoveredSessionIndex] = React.useState(null);

  // Custom shape for bar with glow on hover
  const CustomBar = (props) => {
    const { x, y, width, height, fill, index, isHovered } = props;
    return (
      <g>
        {/* Glow effect */}
        {isHovered && (
          <rect x={x - 4} y={y - 8} width={width + 8} height={height + 16} rx={12} fill={fill} opacity={0.25} filter="url(#glow)" />
        )}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={8}
          fill={fill}
          style={{
            opacity: isHovered ? 1 : 0.6,
            filter: isHovered ? 'drop-shadow(0 0 8px #54bb74)' : 'none',
            transition: 'opacity 0.2s, filter 0.2s',
          }}
        />
      </g>
    );
  };

  return (
    <div className="bg-[#1e1e1e] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-[#93cfa2] mb-6">Slide Insights</h2>
      <div className="mb-8">
        <h3 className="text-xl text-[#54bb74] mb-2">Time Spent Per Slide</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={slideTimes} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#54bb74" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#292929" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="slideTitle" interval={0} angle={-20} textAnchor="end" height={60} tick={{ fill: '#93cfa2', fontWeight: 500 }} />
            <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft', fill: '#93cfa2' }} tick={{ fill: '#93cfa2' }} />
            <Tooltip formatter={s => `${s.toFixed(2)} s`} contentStyle={{ background: '#232323', border: 'none', color: '#54bb74' }} />
            <Legend iconType="circle" />
            <Bar
              dataKey="seconds"
              fill="url(#colorTime)"
              name="Time (s)"
              radius={[8, 8, 0, 0]}
              label={{ position: 'top', fill: '#fff', fontWeight: 600, formatter: v => v > 0 ? v.toFixed(1) : '' }}
              shape={barProps => (
                <CustomBar {...barProps} isHovered={hoveredSlideIndex === barProps.index} />
              )}
              onMouseOver={(_, idx) => setHoveredSlideIndex(idx)}
              onMouseOut={() => setHoveredSlideIndex(null)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-xl text-[#54bb74] mb-2">Session Durations</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sessions} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorSession" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#93cfa2" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#232323" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sessionStart" tickFormatter={v => new Date(v).toLocaleTimeString()} tick={{ fill: '#93cfa2', fontWeight: 500 }} />
            <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft', fill: '#93cfa2' }} tick={{ fill: '#93cfa2' }} />
            <Tooltip formatter={s => `${s.toFixed(2)} s`} labelFormatter={v => new Date(v).toLocaleString()} contentStyle={{ background: '#232323', border: 'none', color: '#93cfa2' }} />
            <Legend
              iconType="circle"
              onMouseEnter={e => {
                if (e && e.dataKey) {
                  const bars = document.querySelectorAll(`.recharts-bar-rect-${e.dataKey}`);
                  bars.forEach(bar => bar.style.opacity = 0.5);
                }
              }}
              onMouseLeave={e => {
                if (e && e.dataKey) {
                  const bars = document.querySelectorAll(`.recharts-bar-rect-${e.dataKey}`);
                  bars.forEach(bar => bar.style.opacity = 1);
                }
              }}
            />
            <Bar
              dataKey="durationSeconds"
              fill="url(#colorSession)"
              name="Session Duration (s)"
              className="recharts-bar-rect-durationSeconds"
              radius={[8, 8, 0, 0]}
              label={{ position: 'top', fill: '#fff', fontWeight: 600, formatter: v => v > 0 ? v.toFixed(1) : '' }}
              shape={barProps => (
                <CustomBar {...barProps} isHovered={hoveredSessionIndex === barProps.index} />
              )}
              onMouseOver={(_, idx) => setHoveredSessionIndex(idx)}
              onMouseOut={() => setHoveredSessionIndex(null)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
