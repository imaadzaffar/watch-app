const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function CasioWatch({ time }) {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const day = DAYS[time.getDay()];
  const date = time.getDate();
  const month = MONTHS[time.getMonth()];
  const hours12 = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return (
    <div
      style={{
        width: 260,
        background: 'linear-gradient(160deg, #2e2e2e 0%, #1a1a1a 50%, #252525 100%)',
        borderRadius: 14,
        padding: '18px 16px 14px',
        boxShadow:
          '0 0 0 3px #111, 0 0 0 5px #3a3a3a, 0 0 0 7px #111, 0 12px 40px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        fontFamily: '"Courier New", Courier, monospace',
        userSelect: 'none',
      }}
    >
      {/* Brand */}
      <div
        style={{
          color: '#bbb',
          fontSize: 10,
          letterSpacing: 5,
          fontWeight: 700,
          textTransform: 'uppercase',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        CASIO
      </div>

      {/* LCD screen */}
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(145deg, #8fa870 0%, #7d9660 40%, #6b8450 100%)',
          borderRadius: 6,
          padding: '10px 12px 12px',
          boxShadow:
            'inset 0 3px 10px rgba(0,0,0,0.55), inset 0 0 0 2px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: 0.85,
          }}
        >
          <span style={{ fontSize: 11, color: '#1e2e10', fontWeight: 900, letterSpacing: 2 }}>
            {day}
          </span>
          <span style={{ fontSize: 11, color: '#1e2e10', fontWeight: 900, letterSpacing: 1 }}>
            {pad(date)}-{month}
          </span>
        </div>

        {/* Main time */}
        <div
          style={{
            textAlign: 'center',
            fontSize: 56,
            fontWeight: 900,
            color: '#182210',
            letterSpacing: 2,
            lineHeight: 1,
            textShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }}
        >
          {pad(hours12)}:{pad(minutes)}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            opacity: 0.85,
          }}
        >
          <span style={{ fontSize: 20, color: '#1e2e10', fontWeight: 900, letterSpacing: 1 }}>
            {pad(seconds)}
          </span>
          <span style={{ fontSize: 11, color: '#1e2e10', fontWeight: 900, letterSpacing: 3 }}>
            {ampm}
          </span>
        </div>
      </div>

      {/* Buttons row */}
      <div style={{ display: 'flex', gap: 6, width: '100%' }}>
        {['MODE', 'ALARM', 'LIGHT'].map((label) => (
          <div
            key={label}
            style={{
              flex: 1,
              background: 'linear-gradient(145deg, #303030, #1c1c1c)',
              borderRadius: 4,
              padding: '5px 4px',
              textAlign: 'center',
              fontSize: 7.5,
              color: '#555',
              letterSpacing: 1,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.04)',
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
