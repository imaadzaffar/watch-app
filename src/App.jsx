import { useState, useEffect, useRef } from 'react';
import CasioWatch from './components/CasioWatch';
import SeikoWatch from './components/SeikoWatch';
import TissotWatch from './components/TissotWatch';

const WATCHES = [
  { name: 'Casio F-91W', Component: CasioWatch },
  { name: 'Seiko Presage', Component: SeikoWatch },
  { name: 'Tissot Seastar', Component: TissotWatch },
];

export default function App() {
  const [time, setTime] = useState(new Date());
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);
  const [hovering, setHovering] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  function goTo(index) {
    if (transitioning || index === current) return;
    setDirection(index > current ? 1 : -1);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 400);
  }

  function prev() {
    goTo((current - 1 + WATCHES.length) % WATCHES.length);
  }

  function next() {
    goTo((current + 1) % WATCHES.length);
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
  }

  const { Component } = WATCHES[current];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #07070f 0%, #10101e 50%, #07070f 100%)',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Watch label */}
      <div
        className="mb-8 text-xs tracking-widest uppercase font-medium"
        style={{
          fontFamily: 'Georgia, serif',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.25em',
          transition: 'opacity 400ms',
          opacity: transitioning ? 0 : 1,
        }}
      >
        {WATCHES[current].name}
      </div>

      {/* Carousel container */}
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous watch"
          style={{
            position: 'absolute',
            left: -64,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'white',
            fontSize: 22,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            opacity: hovering ? 1 : 0,
            transform: hovering ? 'translateX(0)' : 'translateX(8px)',
            transition: 'opacity 200ms, transform 200ms',
          }}
        >
          ‹
        </button>

        {/* Watch face */}
        <div
          style={{
            transition: 'opacity 400ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1)',
            opacity: transitioning ? 0 : 1,
            transform: transitioning
              ? `translateX(${direction * -40}px) scale(0.95)`
              : 'translateX(0) scale(1)',
          }}
        >
          <Component time={time} />
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next watch"
          style={{
            position: 'absolute',
            right: -64,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'white',
            fontSize: 22,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
            opacity: hovering ? 1 : 0,
            transform: hovering ? 'translateX(0)' : 'translateX(-8px)',
            transition: 'opacity 200ms, transform 200ms',
          }}
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2 mt-10">
        {WATCHES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${WATCHES[i].name}`}
            style={{
              height: 8,
              width: i === current ? 24 : 8,
              borderRadius: 4,
              background:
                i === current
                  ? 'rgba(255,255,255,0.85)'
                  : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
