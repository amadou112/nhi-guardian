"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({ value, duration = 1.1 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const reduceMotion = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (started.current) return;
    started.current = true;

    const controls = animate(0, value, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, duration, reduceMotion]);

  return <>{display}</>;
}
