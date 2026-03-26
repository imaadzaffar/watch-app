import AnalogHands from './AnalogHands';

const SIZE = 300;
const CENTER = SIZE / 2;
const BEZEL_RADIUS = SIZE / 2 - 1;
const DIAL_INSET = 22;
const DIAL_RADIUS = SIZE / 2 - DIAL_INSET;
const MARKER_RADIUS = DIAL_RADIUS - 16;

function degToRad(deg) {
  return (deg - 90) * (Math.PI / 180);
}

export default function TissotWatch({ time }) {
  const mainIndices = new Set([0, 3, 6, 9]);

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE, userSelect: 'none' }}>
      {/* Bezel ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'linear-gradient(135deg, #2a2a2a 0%, #505050 20%, #1e1e1e 40%, #484848 60%, #222 80%, #505050 100%)',
          boxShadow:
            '0 12px 50px rgba(0,0,0,0.85), inset 0 2px 3px rgba(255,255,255,0.08), inset 0 -2px 4px rgba(0,0,0,0.6)',
        }}
      />

      {/* Bezel SVG — 60 ticks + gold triangle */}
      <svg
        style={{ position: 'absolute', inset: 0 }}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        {Array.from({ length: 60 }, (_, i) => {
          const angle = degToRad(i * 6);
          const isMajor = i % 5 === 0;
          const r1 = BEZEL_RADIUS - 1;
          const r2 = isMajor ? r1 - 12 : r1 - 6;
          return (
            <line
              key={i}
              x1={CENTER + r2 * Math.cos(angle)}
              y1={CENTER + r2 * Math.sin(angle)}
              x2={CENTER + r1 * Math.cos(angle)}
              y2={CENTER + r1 * Math.sin(angle)}
              stroke={isMajor ? '#aaa' : '#666'}
              strokeWidth={isMajor ? 2 : 1}
              opacity={0.9}
            />
          );
        })}
        {/* Gold triangle at 12 */}
        <polygon
          points={`${CENTER},6 ${CENTER - 6},20 ${CENTER + 6},20`}
          fill="#d4a820"
        />
        {/* Bezel minute numbers at 5-min intervals */}
        {[0, 10, 20, 30, 40, 50].map((n, i) => {
          const angle = degToRad(i * 60);
          const r = BEZEL_RADIUS - 22;
          const x = CENTER + r * Math.cos(angle);
          const y = CENTER + r * Math.sin(angle);
          return (
            <text
              key={n}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={8}
              fill="#888"
              fontFamily="Arial, sans-serif"
              fontWeight="600"
            >
              {n === 0 ? '60' : n}
            </text>
          );
        })}
      </svg>

      {/* Inner case ring */}
      <div
        style={{
          position: 'absolute',
          inset: 14,
          borderRadius: '50%',
          background:
            'linear-gradient(135deg, #444 0%, #888 35%, #3a3a3a 65%, #777 100%)',
          boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.6)',
        }}
      />

      {/* Dial */}
      <div
        style={{
          position: 'absolute',
          inset: DIAL_INSET,
          borderRadius: '50%',
          background:
            'linear-gradient(150deg, #0c1d34 0%, #0e2240 55%, #081528 100%)',
          boxShadow: 'inset 0 5px 15px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle sunburst texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at 38% 28%, rgba(80,120,200,0.1) 0%, transparent 55%)',
          }}
        />
      </div>

      {/* SVG — dial markers, text */}
      <svg
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        {/* Hour indices */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = degToRad(i * 30);
          const x = CENTER + MARKER_RADIUS * Math.cos(angle);
          const y = CENTER + MARKER_RADIUS * Math.sin(angle);
          const isMain = mainIndices.has(i);
          const w = isMain ? 10 : 7;
          const h = isMain ? 20 : 14;
          const angleDeg = i * 30;

          return (
            <g key={i} transform={`rotate(${angleDeg}, ${x}, ${y})`}>
              {/* Outline */}
              <rect
                x={x - w / 2}
                y={y - h / 2}
                width={w}
                height={h}
                rx={1}
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={0.8}
              />
              {/* Fill */}
              <rect
                x={x - (w - 2) / 2}
                y={y - (h - 2) / 2}
                width={w - 2}
                height={h - 2}
                rx={0.5}
                fill="rgba(255,255,255,0.92)"
              />
            </g>
          );
        })}

        {/* Minute dots */}
        {Array.from({ length: 60 }, (_, i) => {
          if (i % 5 === 0) return null;
          const angle = degToRad(i * 6);
          const r = DIAL_RADIUS - 10;
          return (
            <circle
              key={i}
              cx={CENTER + r * Math.cos(angle)}
              cy={CENTER + r * Math.sin(angle)}
              r={1.5}
              fill="rgba(255,255,255,0.45)"
            />
          );
        })}

        {/* Brand text */}
        <text
          x={CENTER}
          y={CENTER - 52}
          textAnchor="middle"
          fontSize={11}
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="bold"
          fill="rgba(255,255,255,0.92)"
          letterSpacing={4}
        >
          TISSOT
        </text>
        <text
          x={CENTER}
          y={CENTER - 38}
          textAnchor="middle"
          fontSize={7}
          fontFamily="Arial, sans-serif"
          fill="rgba(255,255,255,0.5)"
          letterSpacing={3}
        >
          1853
        </text>
        <text
          x={CENTER}
          y={CENTER + 52}
          textAnchor="middle"
          fontSize={8}
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="rgba(255,255,255,0.6)"
          letterSpacing={3}
        >
          SEASTAR
        </text>
        <text
          x={CENTER}
          y={CENTER + 65}
          textAnchor="middle"
          fontSize={6.5}
          fontFamily="Arial, sans-serif"
          fill="rgba(255,255,255,0.3)"
          letterSpacing={1}
        >
          300M / 1000FT
        </text>
      </svg>

      {/* Hands */}
      <div
        style={{
          position: 'absolute',
          inset: DIAL_INSET,
          borderRadius: '50%',
          overflow: 'visible',
        }}
      >
        <AnalogHands
          time={time}
          style={{
            hourWidth: 10,
            hourLength: '28%',
            hourColor: '#e8e8e8',
            minuteWidth: 7,
            minuteLength: '38%',
            minuteColor: '#e8e8e8',
            secondWidth: 3,
            secondLength: '44%',
            secondColor: '#e03820',
            capSize: 14,
            capColor: '#d0d0d0',
            capBorder: '#888',
            handShadow: '0 2px 8px rgba(0,0,0,0.7)',
          }}
        />
      </div>

      {/* Crystal glare */}
      <div
        style={{
          position: 'absolute',
          inset: DIAL_INSET,
          borderRadius: '50%',
          background:
            'linear-gradient(130deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 40%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Crown */}
      <div
        style={{
          position: 'absolute',
          right: -14,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 18,
          height: 30,
          background:
            'linear-gradient(90deg, #3a3a3a, #888, #4a4a4a, #999, #3a3a3a)',
          borderRadius: 4,
          boxShadow: '3px 0 8px rgba(0,0,0,0.6)',
          overflow: 'hidden',
        }}
      >
        {/* Ridges */}
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: 1,
              background: 'rgba(0,0,0,0.4)',
              top: `${15 + i * 14}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
