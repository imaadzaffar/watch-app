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

  const mainNumerals = { 0: '12', 3: '3', 6: '6', 9: '9' };

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE, userSelect: 'none' }}>
      {/* Outer case */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background:
            'linear-gradient(135deg, #c0a870 0%, #e8d098 25%, #d4b878 50%, #b89050 75%, #caa870 100%)',
          boxShadow:
            '0 0 0 2px #7a6030, 0 10px 50px rgba(0,0,0,0.65), inset 0 2px 3px rgba(255,255,255,0.5), inset 0 -2px 3px rgba(0,0,0,0.3)',
        }}
      />

      {/* Dial */}
      <div
        style={{
          position: 'absolute',
          inset: DIAL_INSET,
          borderRadius: '50%',
          background:
            'linear-gradient(145deg, #faf6ec 0%, #f4edd8 50%, #ede0c0 100%)',
          boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.12)',
        }}
      >
        {/* Subtle radial sheen */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.35) 0%, transparent 55%)',
          }}
        />
      </div>

      {/* SVG layer — markers, text */}
      <svg
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        {/* Minute dots */}
        {minuteDots.map(({ x, y }, i) => (
          <circle key={i} cx={x} cy={y} r={1.2} fill="#9a8a78" opacity={0.55} />
        ))}

        {/* Hour markers */}
        {hourMarkers.map(({ i, x, y }) => {
          if (mainNumerals[i] !== undefined) {
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={15}
                fontWeight="600"
                fontFamily="Georgia, 'Times New Roman', serif"
                fill="#2e1e0e"
                opacity={0.88}
              >
                {mainNumerals[i]}
              </text>
            );
          }
          // Thin rectangular tick
          const tickLen = 10;
          const tickW = 2;
          const angleDeg = i * 30;
          return (
            <rect
              key={i}
              x={x - tickW / 2}
              y={y - tickLen / 2}
              width={tickW}
              height={tickLen}
              rx={0.5}
              fill="#5a4a36"
              opacity={0.7}
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
          fill="#4a3828"
          letterSpacing={4}
          opacity={0.8}
        >
          SEIKO
        </text>
        <text
          x={CENTER}
          y={CENTER - 34}
          textAnchor="middle"
          fontSize={7}
          fontFamily="Georgia, serif"
          fill="#7a6858"
          letterSpacing={3}
          opacity={0.7}
        >
          PRESAGE
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
            hourColor: '#22120a',
            minuteWidth: 5,
            minuteLength: '40%',
            minuteColor: '#22120a',
            secondWidth: 2,
            secondLength: '44%',
            secondColor: '#c82a00',
            capSize: 11,
            capColor: '#22120a',
            capBorder: '#8a6a4a',
            handShadow: '1px 1px 4px rgba(0,0,0,0.3)',
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
            'linear-gradient(130deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Crown */}
      <div
        style={{
          position: 'absolute',
          right: -10,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 13,
          height: 22,
          background:
            'linear-gradient(90deg, #b89050, #e8d098, #c4a060, #e0c888, #b89050)',
          borderRadius: 3,
          boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
        }}
      />
    </div>
  );
}
