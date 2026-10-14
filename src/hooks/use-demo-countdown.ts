import { useEffect, useState } from "react";

export const DEMO_DURATION_MS = 60 * 60 * 1000;

export function countdownSeconds(deadline: number, now: number) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}

export function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function useDemoCountdown() {
  const [seconds, setSeconds] = useState(DEMO_DURATION_MS / 1000);
  useEffect(() => {
    const deadline = Date.now() + DEMO_DURATION_MS;
    const timer = window.setInterval(() => {
      const remaining = countdownSeconds(deadline, Date.now());
      setSeconds(remaining);
      if (remaining === 0) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return seconds;
}