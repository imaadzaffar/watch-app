import AnalogHands from './AnalogHands';

const SIZE = 290;
const CENTER = SIZE / 2;
const CASE_RADIUS = SIZE / 2;
const DIAL_INSET = 18;
const DIAL_RADIUS = CASE_RADIUS - DIAL_INSET;
const MARKER_RADIUS = DIAL_RADIUS - 14;

function degToRad(deg) {
  return (deg - 90) * (Math.PI / 180);
}

export default function SeikoWatch({ time }) {
  // Hour markers
  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = degToRad(i * 30);
    const x = CENTER + MARKER_RADIUS * Math.cos(angle);
    const y = CENTER + MARKER_RADIUS * Math.sin(angle);
    return { i, x, y, angle };
  });

  // Minute dots (skip hour positions)
  const minuteDots = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null;
    const angle = degToRad(i * 6);
    const r = DIAL_RADIUS - 10;
    return {
      x: CENTER + r * Math.cos(angle),
      y: CENTER + r * Math.sin(angle),
    };
  }).filter(Boolean);

  // Sunburst lines radiating from center
  const sunburstLines = Array.from({ length: 60 }, (_, i) => {
    const angle = degToRad(i * 6);
    return {
      x1: CENTER,
      y1: CENTER,
      x2: CENTER + DIAL_RADIUS * Math.cos(angle),
      y2: CENTER + DIAL_RADIUS * Math.sin(angle),
    };
  });

  // Date window position (~3 o'clock, offset inward)
  const dateAngle = degToRad(7); // slightly past 3 o'clock
  const dateDist = MARKER_RADIUS - 10;
  const dateX = CENTER + dateDist * Math.cos(dateAngle);
  const dateY = CENTER + dateDist * Math.sin(dateAngle);
  const currentDate = time ? new Date(time).getDate() : new Date().getDate();

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE, userSelect: 'none' }}>
      {/* Outer case — silver/steel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'linear-gradient(135deg, #b0b0b0 0%, #e8e8e8 25%, #d0d0d0 50%, #a8a8a8 75%, #c0c0c0 100%)',
          boxShadow:
            '0 0 0 2px #808080, 0 10px 50px rgba(0,0,0,0.65), inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -2px 3px rgba(0,0,0,0.25)',
        }}
      />

      {/* Dial — deep emerald green */}
      <div
        style={{
          position: 'absolute',
          inset: DIAL_INSET,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, #174d30 0%, #1a5c38 50%, #123f28 100%)',
          boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}
      />

      {/* SVG layer — sunburst, markers, text, date */}
      <svg
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        {/* Clip path for dial */}
        <defs>
          <clipPath id="dial-clip">
            <circle cx={CENTER} cy={CENTER} r={DIAL_RADIUS} />
          </clipPath>
        </defs>

        {/* Sunburst lines */}
        <g clipPath="url(#dial-clip)">
          {sunburstLines.map(({ x1, y1, x2, y2 }, i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth={0.8}
            />
          ))}
        </g>

        {/* Minute dots */}
        {minuteDots.map(({ x, y }, i) => (
          <circle key={i} cx={x} cy={y} r={1.2} fill="rgba(220,220,220,0.5)" />
        ))}

        {/* Hour markers — all baton indices, no numerals */}
        {hourMarkers.map(({ i, x, y }) => {
          const isMain = i % 3 === 0; // 12, 3, 6, 9 are larger
          const tickLen = isMain ? 13 : 9;
          const tickW = isMain ? 3 : 2;
          const angleDeg = i * 30;
          return (
            <rect
              key={i}
              x={x - tickW / 2}
              y={y - tickLen / 2}
              width={tickW}
              height={tickLen}
              rx={0.5}
              fill="#e0e0e0"
              opacity={0.9}
              transform={`rotate(${angleDeg}, ${x}, ${y})`}
            />
          );
        })}

        {/* Brand */}
        <text
          x={CENTER}
          y={CENTER - 48}
          textAnchor="middle"
          fontSize={10}
          fontFamily="Georgia, serif"
          fontWeight="bold"
          fill="rgba(255,255,255,0.9)"
          letterSpacing={4}
        >
          SEIKO
        </text>
        <text
          x={CENTER}
          y={CENTER - 34}
          textAnchor="middle"
          fontSize={7}
          fontFamily="Georgia, serif"
          fill="rgba(255,255,255,0.7)"
          letterSpacing={3}
        >
          PRESAGE
        </text>
        <text
          x={CENTER}
          y={CENTER + 52}
          textAnchor="middle"
          fontSize={6}
          fontFamily="Georgia, serif"
          fill="rgba(255,255,255,0.55)"
          letterSpacing={2}
        >
          AUTOMATIC
        </text>

        {/* Date window */}
        <rect
          x={dateX - 11}
          y={dateY - 9}
          width={22}
          height={16}
          rx={1.5}
          fill="white"
          stroke="#a0a0a0"
          strokeWidth={0.8}
        />
        <text
          x={dateX}
          y={dateY + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={9}
          fontWeight="600"
          fontFamily="Arial, sans-serif"
          fill="#111"
        >
          {currentDate}
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
            hourWidth: 7,
            hourLength: '30%',
            hourColor: '#d8d8d8',
            minuteWidth: 5,
            minuteLength: '40%',
            minuteColor: '#d8d8d8',
            secondWidth: 2,
            secondLength: '44%',
            secondColor: '#c8a030',
            capSize: 11,
            capColor: '#d0d0d0',
            capBorder: '#a0a0a0',
            handShadow: '1px 1px 4px rgba(0,0,0,0.5)',
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
            'linear-gradient(130deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 40%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Crown — silver */}
      <div
        style={{
          position: 'absolute',
          right: -10,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 13,
          height: 22,
          background:
            'linear-gradient(90deg, #a0a0a0, #e0e0e0, #b8b8b8, #d8d8d8, #a0a0a0)',
          borderRadius: 3,
          boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
        }}
      />
    </div>
  );
}
