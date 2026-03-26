export default function AnalogHands({ time, style = {} }) {
  const h = time.getHours() % 12;
  const m = time.getMinutes();
  const s = time.getSeconds();

  const hourDeg = h * 30 + m * 0.5 + s / 120;
  const minuteDeg = m * 6 + s * 0.1;
  const secondDeg = s * 6;

  const handEasing = 'cubic-bezier(0.4, 2.08, 0.55, 0.44)';

  return (
    <>
      {/* Hour hand */}
      <div
        style={{
          position: 'absolute',
          bottom: '50%',
          left: '50%',
          width: style.hourWidth ?? 7,
          height: style.hourLength ?? '28%',
          background: style.hourColor ?? '#1a1a1a',
          borderRadius: '3px 3px 1px 1px',
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) rotate(${hourDeg}deg)`,
          transition: `transform 1s ${handEasing}`,
          zIndex: 10,
          boxShadow: style.handShadow ?? '1px 1px 4px rgba(0,0,0,0.4)',
        }}
      />

      {/* Minute hand */}
      <div
        style={{
          position: 'absolute',
          bottom: '50%',
          left: '50%',
          width: style.minuteWidth ?? 5,
          height: style.minuteLength ?? '38%',
          background: style.minuteColor ?? '#1a1a1a',
          borderRadius: '3px 3px 1px 1px',
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
          transition: `transform 1s ${handEasing}`,
          zIndex: 10,
          boxShadow: style.handShadow ?? '1px 1px 4px rgba(0,0,0,0.4)',
        }}
      />

      {/* Second hand */}
      <div
        style={{
          position: 'absolute',
          bottom: '50%',
          left: '50%',
          width: style.secondWidth ?? 2,
          height: style.secondLength ?? '44%',
          background: style.secondColor ?? '#cc2200',
          borderRadius: '2px 2px 0 0',
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) rotate(${secondDeg}deg)`,
          transition: `transform 0.5s ${handEasing}`,
          zIndex: 11,
        }}
      >
        {/* Counterweight tail */}
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: (style.secondWidth ?? 2) * 1.5,
            height: '25%',
            background: style.secondColor ?? '#cc2200',
            borderRadius: '0 0 2px 2px',
          }}
        />
      </div>

      {/* Center cap */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: style.capSize ?? 10,
          height: style.capSize ?? 10,
          background: style.capColor ?? '#333',
          border: `2px solid ${style.capBorder ?? '#666'}`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 12,
          boxShadow: '0 0 4px rgba(0,0,0,0.5)',
        }}
      />
    </>
  );
}
