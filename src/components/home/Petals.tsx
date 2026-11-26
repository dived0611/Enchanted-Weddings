/*
  Rose-gold petals that drift down over the hero (animated in HomeMotion.tsx).
  Sizes are fixed here (no random values during render, to keep server and
  browser HTML identical); positions and paths are randomised by GSAP.
*/
const sizes = [14, 18, 11, 22, 16, 12, 20, 15, 10, 19, 13, 17];

export default function Petals() {
  return (
    <div aria-hidden="true" data-petals className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {sizes.map((s, i) => (
        <svg
          key={i}
          data-petal
          width={s}
          height={s * 1.4}
          viewBox="0 0 20 28"
          className="invisible absolute left-0 top-0"
        >
          <defs>
            <linearGradient id={`petal-${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f3d9cb" />
              <stop offset="100%" stopColor={i % 3 === 0 ? "#d6a58c" : "#c3937c"} />
            </linearGradient>
          </defs>
          <path d="M10 0C17 6 19 15 10 28C1 15 3 6 10 0Z" fill={`url(#petal-${i})`} />
          <path d="M10 3V24" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.6" />
        </svg>
      ))}
    </div>
  );
}
