import Image from "next/image";
export function Sculpture({
  kind = "core",
  className = "",
  priority = false,
}: {
  kind?: "core" | "lock";
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`sculpture sculpture-${kind} ${className}`}
      aria-hidden="true"
    >
      <Image
        src={`/images/security-${kind}.webp`}
        alt=""
        fill
        sizes="(max-width: 760px) 95vw, 60vw"
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
      />
    </div>
  );
}
export function Structure({ className = "" }: { className?: string }) {
  const tiles = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div className={`structure-art ${className}`} aria-hidden="true">
      <div className="structure-cube">
        {["front", "right", "top"].map((side) => (
          <div className={`cube-face cube-${side}`} key={side}>
            {tiles.map((i) => (
              <span
                key={i}
                className={i === 5 ? "tile-red" : i === 10 ? "tile-blue" : ""}
              >
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export function WaveField() {
  return (
    <svg
      className="wave-field"
      viewBox="0 0 1440 650"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wave-ink">
          <stop stopColor="#E53935" />
          <stop offset=".48" stopColor="#b4c4df" />
          <stop offset="1" stopColor="#266EEB" />
        </linearGradient>
      </defs>
      {Array.from({ length: 45 }, (_, i) => (
        <path
          key={i}
          d={`M-100 ${i * 15 - 100} C250 ${i * 13 + 600}, 500 ${i * 8 - 250}, 800 ${i * 12 + 190} S1200 ${i * 15 - 250},1550 ${i * 10 + 60}`}
          stroke="url(#wave-ink)"
          strokeWidth="1.2"
          opacity={0.18 + (i % 5) * 0.09}
        />
      ))}
    </svg>
  );
}
