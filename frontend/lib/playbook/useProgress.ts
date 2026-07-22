"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "nhi-guardian-playbook-progress";

// Tracks which checklist items are done, persisted to localStorage so a
// visitor's progress against their own program survives a page reload.
// Items are keyed as `${phaseKey}:activity:${index}` /
// `${phaseKey}:deliverable:${index}` — stable across language switches
// since they never depend on the (translated) item text.
export function usePlaybookProgress() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setChecked(JSON.parse(stored));
    } catch {
      // ignore malformed localStorage content
    }
    setHydrated(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setChecked({});
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isChecked = useCallback((id: string) => Boolean(checked[id]), [checked]);

  const countChecked = useCallback(
    (ids: string[]) => ids.reduce((sum, id) => sum + (checked[id] ? 1 : 0), 0),
    [checked]
  );

  return { hydrated, isChecked, toggle, reset, countChecked };
}
