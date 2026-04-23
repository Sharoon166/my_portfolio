"use client";

import { useRef, useEffect } from "react";

interface CircularTextProps {
  text?: string;
  radius?: number;
  spin?: boolean;
  autoSpin?: boolean;
  children?: React.ReactNode;
}

export default function CircularText({
  text = "PRIVATE REPO · BUILT AT SYNCTOM ·",
  radius = 50,
  spin = false,
  autoSpin = false,
  children,
}: CircularTextProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);
  const angleRef = useRef(0);
  const size = (radius + 20) * 2;
  const cx = size / 2;
  const pathId = `circle-${radius}`;
  const d = `M ${cx},${cx} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  const startSpin = () => {
    const tick = () => {
      angleRef.current += 0.4;
      if (svgRef.current) svgRef.current.style.transform = `rotate(${angleRef.current}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };
  const stopSpin = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  };

  useEffect(() => {
    if (autoSpin) {
      startSpin();
      return stopSpin;
    }
  }, [autoSpin]);

  return (
    <div
      style={{ width: size, height: size, position: "relative", cursor: "pointer" }}
      onMouseEnter={spin ? startSpin : undefined}
      onMouseLeave={spin ? stopSpin : undefined}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute", transformOrigin: `${cx}px ${cx}px` }}
      >
        <defs>
          <path id={pathId} d={d} />
        </defs>
        <text fontSize="9" fill="currentColor" letterSpacing="1.5" fontWeight="500">
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
