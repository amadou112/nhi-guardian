"use client";

import createGlobe, { COBEOptions, Marker, Arc } from "cobe";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { AttackEvent } from "@/lib/threatMapEngine";

const ACCENT: [number, number, number] = [0.36, 0.43, 0.96];
const CRITICAL: [number, number, number] = [0.95, 0.29, 0.36];

type GlobeTheme = Pick<
  COBEOptions,
  "dark" | "baseColor" | "markerColor" | "glowColor" | "mapBrightness" | "diffuse"
>;

// Same dark/light split as CoverageGlobe — a globe tuned for a dark card
// reads as a solid black circle on a light background without this.
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

const MAX_ACTIVE_ARCS = 6;

export function AttackGlobe({ events }: { events: AttackEvent[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visualsRef = useRef<{ markers: Marker[]; arcs: Arc[] }>({ markers: [], arcs: [] });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const theme = mounted && resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    const active = events.slice(0, MAX_ACTIVE_ARCS);
    visualsRef.current = {
      markers: active.flatMap((e) => [
        { location: [e.source.lat, e.source.lng] as [number, number], size: 0.045, color: CRITICAL },
        { location: [e.target.lat, e.target.lng] as [number, number], size: 0.05, color: ACCENT },
      ]),
      arcs: active.map((e) => ({
        from: [e.source.lat, e.source.lng] as [number, number],
        to: [e.target.lat, e.target.lng] as [number, number],
        color: e.severity === "Critical" || e.severity === "High" ? CRITICAL : ACCENT,
      })),
    };
  }, [events]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let width = canvas.offsetWidth || canvas.parentElement?.getBoundingClientRect().width || 320;
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
      theta: 0.28,
      mapSamples: 16000,
      markers: [],
      arcs: [],
      arcColor: CRITICAL,
      arcWidth: 2,
      arcHeight: 0.4,
      ...THEME_CONFIG[theme],
    });

    const animate = () => {
      phi += 0.0022;
      globe?.update({
        phi,
        width: width * 2,
        height: width * 2,
        markers: visualsRef.current.markers,
        arcs: visualsRef.current.arcs,
      });
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
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", contain: "layout paint size" }} />
    </div>
  );
}
