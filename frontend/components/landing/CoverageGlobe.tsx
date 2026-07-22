"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const ACCENT: [number, number, number] = [0.36, 0.43, 0.96];
const CRITICAL: [number, number, number] = [0.95, 0.29, 0.36];

type GlobeTheme = Pick<
  COBEOptions,
  "dark" | "baseColor" | "markerColor" | "glowColor" | "mapBrightness" | "diffuse"
>;

// Dark mode keeps the original moody, low-contrast sphere; light mode needs
// a much brighter base and glow or the globe reads as a solid black circle
// against a light card background.
const THEME_CONFIG: Record<"dark" | "light", GlobeTheme> = {
  dark: {
    dark: 1,
    baseColor: [0.11, 0.1, 0.16],
    markerColor: ACCENT,
    glowColor: [0.32, 0.26, 0.55],
    mapBrightness: 4.5,
    diffuse: 1.1,
  },
  light: {
    dark: 0,
    baseColor: [0.85, 0.86, 0.95],
    markerColor: ACCENT,
    glowColor: [0.75, 0.77, 0.93],
    mapBrightness: 6,
    diffuse: 0.9,
  },
};

// Approximate coordinates of major cloud/CI regions NHI Guardian
// monitors identities across — grounds the globe in the actual
// subject (distributed non-human identities) rather than decoration.
// Two markers are flagged critical to echo the live risk data.
const MARKERS = [
  { location: [39.0438, -77.4874] as [number, number], size: 0.05, color: CRITICAL }, // AWS us-east-1
  { location: [45.5946, -121.1787] as [number, number], size: 0.04, color: ACCENT }, // AWS us-west-2
  { location: [53.3498, -6.2603] as [number, number], size: 0.04, color: ACCENT }, // eu-west-1
  { location: [50.1109, 8.6821] as [number, number], size: 0.04, color: ACCENT }, // eu-central
  { location: [1.3521, 103.8198] as [number, number], size: 0.04, color: ACCENT }, // ap-southeast-1
  { location: [35.6762, 139.6503] as [number, number], size: 0.04, color: ACCENT }, // ap-northeast-1
  { location: [-33.8688, 151.2093] as [number, number], size: 0.03, color: ACCENT }, // ap-southeast-2
  { location: [37.7749, -122.4194] as [number, number], size: 0.05, color: CRITICAL }, // GitHub CI, us-west
];

export function CoverageGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const theme = mounted && resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let width = canvas.offsetWidth || canvas.parentElement?.getBoundingClientRect().width || 240;
    let frame: number;
    let globe: ReturnType<typeof createGlobe> | null = null;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const newWidth = entry.contentRect.width;
      if (newWidth > 0) {
        width = newWidth;
        globe?.update({ width: width * 2, height: width * 2 });
      }
    });
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      mapSamples: 14000,
      markers: MARKERS,
      ...THEME_CONFIG[theme],
    });

    const animate = () => {
      phi += 0.0028;
      globe?.update({ phi, width: width * 2, height: width * 2 });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      globe?.destroy();
      resizeObserver.disconnect();
    };
  }, [theme]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[280px]">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", contain: "layout paint size" }}
      />
    </div>
  );
}
