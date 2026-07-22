"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function Spin({
  children,
  className,
  duration = 14,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}
